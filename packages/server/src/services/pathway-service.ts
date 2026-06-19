/**
 * pathway.service.ts
 *
 * Translation resolution lives here — not in the repository, not in the controller.
 * Repository returns raw lean docs with Maps-as-objects after .lean().
 * Service resolves locale, transforms to typed views, returns clean API shapes.
 *
 * Locale fallback chain: requested locale → DEFAULT_LOCALE ('en') → throw.
 * A pathway with no 'en' translation is a data integrity error, not a 404.
 */

import { pathwayRepository } from '../repositories/pathway-repository';
import { DEFAULT_LOCALE } from '@contracts/shared/schemas/i18n';

import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import type {
  PathwayListView,
  PathwayDetailView,
  TaxonomyNodeRef,
  PathwayRelatedSummary,
  PathwayScoringProjection,
} from '@contracts/shared/types/pathway-domain-types';
import type {
  LeanPathwayDoc,
  LeanPathwayListDoc,
  LeanTaxonomyNodeRef,
  LeanRelatedPathwayRef,
} from '../repositories/pathway-repository';

// ── Locale resolution ─────────────────────────────────────────────────────────

/**
 * Resolves locale-specific fields from a lean translations object.
 * Falls back to DEFAULT_LOCALE ('en') if the requested locale has no entry.
 * Throws if even the fallback is missing — that's a data problem, not a user problem.
 */
export function resolveTranslation<T>(
  translations: Partial<Record<string, T>>,
  locale: SupportedLocale,
  context: string
): T {
  const resolved = translations[locale] ?? translations[DEFAULT_LOCALE];

  if (!resolved) {
    throw new Error(
      `Missing translation for "${context}": no '${locale}' or '${DEFAULT_LOCALE}' entry found.`
    );
  }

  return resolved;
}

// ── View transformers ─────────────────────────────────────────────────────────

function toTaxonomyNodeRef(
  node: LeanTaxonomyNodeRef,
  locale: SupportedLocale
): TaxonomyNodeRef {
  const t = resolveTranslation(
    node.translations,
    locale,
    `taxonomy:${node.slug}`
  );

  return {
    id: String(node._id),
    slug: node.slug,
    kind: node.kind,
    name: t.name,
  };
}

function toRelatedSummary(
  pathway: LeanRelatedPathwayRef,
  locale: SupportedLocale
): PathwayRelatedSummary {
  const t = resolveTranslation(
    pathway.translations,
    locale,
    `related-pathway:${pathway.slug}`
  );

  return {
    id: String(pathway._id),
    slug: pathway.slug,
    type: pathway.type,
    title: t.title,
    summary: t.summary,
  };
}

function toListView(
  doc: LeanPathwayListDoc,
  locale: SupportedLocale
): PathwayListView {
  const t = resolveTranslation(doc.translations, locale, `pathway:${doc.slug}`);

  return {
    id: String(doc._id),
    slug: doc.slug,
    type: doc.type,
    status: doc.status as PathwayListView['status'],
    visibilityLayer: doc.visibilityLayer,
    durationProfile: doc.durationProfile,
    taxonomyNodes: (doc.taxonomyNodeIds as LeanTaxonomyNodeRef[]).map((n) =>
      toTaxonomyNodeRef(n, locale)
    ),
    title: t.title,
    summary: t.summary,
    keySkills: t.keySkills,
    roadmapWindowLabel: t.roadmapWindowLabel,
  };
}

function toDetailView(
  doc: LeanPathwayDoc,
  locale: SupportedLocale
): PathwayDetailView {
  const listView = toListView(doc as unknown as LeanPathwayListDoc, locale);

  const t = resolveTranslation(doc.translations, locale, `pathway:${doc.slug}`);

  return {
    ...listView,
    description: t.description,
    opportunities: t.opportunities,
    verificationNote: t.verificationNote,
    journeyPhases: t.journeyPhases,
    relatedPathways: (doc.relatedPathwayIds as LeanRelatedPathwayRef[]).map(
      (r) => toRelatedSummary(r, locale)
    ),
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

class PathwayService {
  async getPathways(
    locale: SupportedLocale,
    search?: string,
    type?: string,
    cursor?: string,
    limit: number = 12
  ): Promise<{
    items: PathwayListView[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    const { items, nextCursor, hasMore } =
      await pathwayRepository.findAllActiveWithCursor(
        search,
        type,
        cursor,
        limit
      );

    return {
      items: items.map((doc) => toListView(doc, locale)),
      nextCursor,
      hasMore,
    };
  }

  async getPathwayDetail(
    slug: string,
    locale: SupportedLocale
  ): Promise<PathwayDetailView> {
    const doc = await pathwayRepository.findActiveDetailBySlug(slug);

    if (!doc) {
      throw Object.assign(new Error(`Pathway not found: ${slug}`), {
        statusCode: 404,
      });
    }

    return toDetailView(doc, locale);
  }

  /** Used only by the recommendation engine — returns scoring projections. */
  async getAllActiveForScoring(): Promise<PathwayScoringProjection[]> {
    return pathwayRepository.findAllActiveForScoring();
  }
}

export const pathwayService = new PathwayService();

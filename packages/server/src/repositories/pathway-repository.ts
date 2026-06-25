import mongoose, { type Types } from 'mongoose';

import { PathwayModel } from '../models/pathway-model';
import { DEFAULT_LOCALE } from '@contracts/shared/schemas/i18n';

import type {
  PathwayDurationProfile,
  PathwayTranslatableFields,
  PathwayType,
  PathwayVisibilityLayer,
  TaxonomyNodeKind,
  TaxonomyNodeTranslatableFields,
  PathwayScoringProjection,
} from '@contracts/shared/types/pathway-domain-types';

export type LeanTranslations<T> = Partial<Record<string, T>>;

export interface LeanTaxonomyNodeRef {
  _id: Types.ObjectId;
  slug: string;
  kind: TaxonomyNodeKind;
  parentId: Types.ObjectId | null;
  order: number;
  translations: LeanTranslations<TaxonomyNodeTranslatableFields>;
}

export interface LeanRelatedPathwayRef {
  _id: Types.ObjectId;
  slug: string;
  type: PathwayType;
  translations: LeanTranslations<PathwayTranslatableFields>;
}

export interface LeanPathwayDoc {
  _id: Types.ObjectId;
  slug: string;
  version: number;
  type: PathwayType;
  status: string;
  visibilityLayer: PathwayVisibilityLayer;
  durationProfile: PathwayDurationProfile;
  taxonomyNodeIds: LeanTaxonomyNodeRef[];
  relatedPathwayIds: LeanRelatedPathwayRef[];
  matchProfileId: Types.ObjectId;
  translations: LeanTranslations<PathwayTranslatableFields>;
  createdAt: Date;
  updatedAt: Date;
}

// Lean doc shape for the list endpoint — relatedPathwayIds not populated
// (not needed for list view, saves one populate join)
export type LeanPathwayListDoc = Omit<LeanPathwayDoc, 'relatedPathwayIds'> & {
  relatedPathwayIds: Types.ObjectId[];
};

// ── Populate field selectors ───────────────────────────────────────────────────
// Must include `translations` so the service can resolve locale-specific names.
const TAXONOMY_SELECT = 'slug kind parentId order translations';
const RELATED_SELECT = 'slug type translations';

// ── Repository ────────────────────────────────────────────────────────────────

class PathwayRepository {
  // ── List with cursor pagination ───────────────────────────────────────────

  /**
   * Paginated list of active pathways.
   *
   * Search queries `translations.en.title` using dot-notation into the
   * MongoDB-stored Map subdocument. Always searches English — multilingual
   * full-text search requires Atlas Search, not regex.
   *
   * Cursor is the last `_id` from the previous page (descending sort).
   * relatedPathwayIds are NOT populated here — not needed for list views.
   */
  async findAllActiveWithCursor(
    search?: string,
    type?: string,
    cursor?: string,
    limit: number = 12
  ): Promise<{
    items: LeanPathwayListDoc[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    // const query: Record<string, unknown> = { status: 'active' };

    const query: Record<string, unknown> = {};

    if (search?.trim()) {
      // Dot-notation works on Mongoose Maps stored as subdocuments in MongoDB
      query[`translations.${DEFAULT_LOCALE}.title`] = {
        $regex: search.trim(),
        $options: 'i',
      };
    }

    if (type) query.type = type;

    if (cursor) query._id = { $lt: new mongoose.Types.ObjectId(cursor) };

    const raw = await PathwayModel.find(query)
      .populate('taxonomyNodeIds', TAXONOMY_SELECT)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean<LeanPathwayListDoc[]>();

    let hasMore = false;
    let nextCursor: string | null = null;

    if (raw.length > limit) {
      hasMore = true;
      const nextItem = raw.pop();
      nextCursor = nextItem?._id.toString() ?? null;
    }

    return { items: raw, nextCursor, hasMore };
  }

  // ── Detail by slug ────────────────────────────────────────────────────────

  async findActiveDetailBySlug(slug: string): Promise<LeanPathwayDoc | null> {
    return PathwayModel.findOne({ slug })
      .populate('taxonomyNodeIds', TAXONOMY_SELECT)
      .populate('relatedPathwayIds', RELATED_SELECT)
      .lean<LeanPathwayDoc>();
  }

  /**
   * Minimal projection for the recommendation scoring engine.
   * NO taxonomy populate — scoring uses raw ObjectId strings for later resolution.
   * English title and summary are the ONLY translated fields loaded — used for
   * explanation prompt context in recommendation-explanation.service.ts.
   * Zero unnecessary data loaded from the DB.
   */

  async findAllActiveForScoring(): Promise<PathwayScoringProjection[]> {
    const docs = await PathwayModel.find(
      // { status: 'active' },
      {
        slug: 1,
        type: 1,
        visibilityLayer: 1,
        durationProfile: 1,
        taxonomyNodeIds: 1,
        matchProfileId: 1,
        'translations.en.title': 1,
        'translations.en.summary': 1,
      }
    ).lean<
      {
        _id: Types.ObjectId;
        slug: string;
        type: PathwayType;
        visibilityLayer: PathwayVisibilityLayer;
        durationProfile: PathwayDurationProfile;
        taxonomyNodeIds: Types.ObjectId[];
        matchProfileId: Types.ObjectId;
        translations: LeanTranslations<
          Pick<PathwayTranslatableFields, 'title' | 'summary'>
        >;
      }[]
    >();

    return docs.map((d) => ({
      id: String(d._id),
      slug: d.slug,
      type: d.type,
      visibilityLayer: d.visibilityLayer,
      durationProfile: d.durationProfile,
      taxonomyNodeIds: d.taxonomyNodeIds.map(String),
      matchProfileId: String(d.matchProfileId),
      titleEn: d.translations?.['en']?.title ?? d.slug,
      summaryEn: d.translations?.['en']?.summary ?? '',
    }));
  }

  async createMany(data: Record<string, unknown>[]): Promise<void> {
    await PathwayModel.insertMany(data, { ordered: true });
  }

  async deleteAll(): Promise<void> {
    await PathwayModel.deleteMany({});
  }
}

export const pathwayRepository = new PathwayRepository();

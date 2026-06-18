/**
 * i18n.ts
 * Locale and translation infrastructure — shared across all translatable entities.
 * Add new locales here only. Every other file derives from SupportedLocale.
 */

import { z } from 'zod';

// ── Locale

export const SUPPORTED_LOCALES = ['en', 'fa', 'ps'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const supportedLocaleSchema = z.enum(SUPPORTED_LOCALES, {
  error: 'Unsupported locale',
});

// ── Translation map shape
// Partial because not every locale is populated at seed time.
// Fallback to DEFAULT_LOCALE is enforced in repository layer — never here.

export type TranslationMap<T> = Partial<Record<SupportedLocale, T>>;

export const localeQuerySchema = z.object({
  locale: supportedLocaleSchema.optional().default('en'),
});

export type LocaleQuery = z.infer<typeof localeQuerySchema>;

/**
 * Internationalization Configuration
 * 
 * Supported languages:
 * - Russian (ru)
 * - Brazilian Portuguese (pt-BR)
 * - Spanish (es)
 * - German (de)
 * - Netherlands Dutch (nl)
 * - Swedish (sv)
 * - French (fr)
 * - Arabic (ar)
 */

export const locales = ['en', 'ru', 'pt-BR', 'es', 'de', 'nl', 'sv', 'fr', 'ar'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];


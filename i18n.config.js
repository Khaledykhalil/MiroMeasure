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
 * - Japanese (ja)
 * - Mandarin Chinese (zh-CN)
 * - Cantonese (zh-HK)
 */

export const locales = ['en', 'ru', 'pt-BR', 'es', 'de', 'nl', 'sv', 'fr', 'it', 'ar', 'ja', 'zh-CN', 'zh-HK'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];


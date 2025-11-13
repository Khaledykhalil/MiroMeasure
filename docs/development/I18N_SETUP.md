# Internationalization (i18n) Setup Guide

**Status:** ✅ Setup Complete

---

## 🌍 Supported Languages

1. **English (en)** - Default
2. **Russian (ru)**
3. **Brazilian Portuguese (pt-BR)**
4. **Spanish (es)**
5. **German (de)**
6. **Netherlands Dutch (nl)**
7. **Swedish (sv)**
8. **French (fr)**
9. **Arabic (ar)**
10. **Japanese (ja)**
11. **Mandarin Chinese (zh-CN)**
12. **Cantonese (zh-HK)**

---

## 📁 Branch Structure

Each language has its own branch:

- `main` - English (default)
- `i18n/ru` - Russian
- `i18n/pt-BR` - Brazilian Portuguese
- `i18n/es` - Spanish
- `i18n/de` - German
- `i18n/nl` - Netherlands Dutch
- `i18n/sv` - Swedish
- `i18n/fr` - French
- `i18n/ar` - Arabic

---

## 🚀 Quick Start

### 1. Switch to a Language Branch

```bash
# Russian
git checkout i18n/ru

# Brazilian Portuguese
git checkout i18n/pt-BR

# Spanish
git checkout i18n/es

# German
git checkout i18n/de

# Netherlands Dutch
git checkout i18n/nl

# Swedish
git checkout i18n/sv

# French
git checkout i18n/fr

# Arabic
git checkout i18n/ar
```

### 2. Translation Files Location

Translation files are located in:
```
messages/
├── en.json (English - default)
├── ru.json (Russian)
├── pt-BR.json (Brazilian Portuguese)
├── es.json (Spanish)
├── de.json (German)
├── nl.json (Netherlands Dutch)
├── sv.json (Swedish)
├── fr.json (French)
└── ar.json (Arabic)
```

### 3. Adding Translations

1. **Edit the translation file** for your language branch
2. **Add/update keys** as needed
3. **Test locally** with `npm run dev`
4. **Commit and push** to the language branch

---

## 📝 Translation File Structure

Each translation file follows this structure:

```json
{
  "common": {
    "appName": "MeasureMint",
    "tagline": "Professional Measurement Tool",
    "launchApp": "Launch App",
    "support": "Support",
    "pricing": "Pricing"
  },
  "home": {
    "hero": {
      "title": "Make Exact Measurements on Miro",
      "subtitle": "Professional measurement and calibration tool..."
    }
  },
  "subscribe": {
    "title": "Choose Your Plan",
    "monthly": "Monthly Plan",
    "sixMonth": "6-Month Plan",
    "annual": "Annual Plan"
  }
}
```

---

## 🔧 Implementation Details

### Using Translations in Components

```jsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('home.hero');
  
  return (
    <h1>{t('title')}</h1>
  );
}
```

### Language Detection

The app automatically detects the user's language preference from:
1. URL parameter (`?lang=ru`)
2. Browser settings
3. Defaults to English

---

## 🌐 URL Structure

### Option 1: Subdomain (Recommended)
- `en.measuremint.app` - English
- `ru.measuremint.app` - Russian
- `pt.measuremint.app` - Brazilian Portuguese
- `es.measuremint.app` - Spanish
- `de.measuremint.app` - German
- `nl.measuremint.app` - Netherlands Dutch
- `sv.measuremint.app` - Swedish
- `fr.measuremint.app` - French
- `ar.measuremint.app` - Arabic

### Option 2: Path Prefix
- `measuremint.app/en` - English
- `measuremint.app/ru` - Russian
- `measuremint.app/pt-BR` - Brazilian Portuguese
- etc.

---

## 📋 Translation Checklist

For each language branch, ensure:

- [ ] Landing page translated
- [ ] Navigation menu translated
- [ ] Pricing page translated
- [ ] Terms of Service translated
- [ ] Privacy Policy translated
- [ ] Support page translated
- [ ] Error messages translated
- [ ] Email templates translated
- [ ] Paddle checkout (if applicable)

---

## 🔄 Merging Updates

When updating the main branch:

1. **Merge main into language branch:**
   ```bash
   git checkout i18n/ru
   git merge main
   ```

2. **Update translations** for new strings
3. **Test** the language branch
4. **Commit and push**

---

## 📚 Resources

- **next-intl Docs:** https://next-intl-docs.vercel.app
- **Translation Tools:**
  - Google Translate (for initial draft)
  - DeepL (for better quality)
  - Professional translators (for final review)

---

**Document Version:** 1.0  
**Last Updated:** January 2025


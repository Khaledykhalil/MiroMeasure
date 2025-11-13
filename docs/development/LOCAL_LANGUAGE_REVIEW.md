# Local Language Website Review Guide

**Purpose:** Review different language versions of MeasureMint locally

---

## 🌍 Language Branches & Local URLs

All language versions run on **http://localhost:3000** when you checkout each branch.

| Language | Branch | Local URL | Command to Switch |
|----------|--------|-----------|-------------------|
| 🇺🇸 **English** | `main` | http://localhost:3000 | `git checkout main` |
| 🇷🇺 **Russian** | `i18n/ru` | http://localhost:3000 | `git checkout i18n/ru` |
| 🇧🇷 **Brazilian Portuguese** | `i18n/pt-BR` | http://localhost:3000 | `git checkout i18n/pt-BR` |
| 🇪🇸 **Spanish** | `i18n/es` | http://localhost:3000 | `git checkout i18n/es` |
| 🇩🇪 **German** | `i18n/de` | http://localhost:3000 | `git checkout i18n/de` |
| 🇳🇱 **Netherlands Dutch** | `i18n/nl` | http://localhost:3000 | `git checkout i18n/nl` |
| 🇸🇪 **Swedish** | `i18n/sv` | http://localhost:3000 | `git checkout i18n/sv` |
| 🇫🇷 **French** | `i18n/fr` | http://localhost:3000 | `git checkout i18n/fr` |
| 🇸🇦 **Arabic** | `i18n/ar` | http://localhost:3000 | `git checkout i18n/ar` |

---

## 🚀 Quick Start Commands

### Review All Languages (One at a Time)

```bash
# 1. English
git checkout main
npm run dev
# Open http://localhost:3000

# 2. Russian
git checkout i18n/ru
npm run dev
# Open http://localhost:3000

# 3. Brazilian Portuguese
git checkout i18n/pt-BR
npm run dev
# Open http://localhost:3000

# 4. Spanish
git checkout i18n/es
npm run dev
# Open http://localhost:3000

# 5. German
git checkout i18n/de
npm run dev
# Open http://localhost:3000

# 6. Netherlands Dutch
git checkout i18n/nl
npm run dev
# Open http://localhost:3000

# 7. Swedish
git checkout i18n/sv
npm run dev
# Open http://localhost:3000

# 8. French
git checkout i18n/fr
npm run dev
# Open http://localhost:3000

# 9. Arabic
git checkout i18n/ar
npm run dev
# Open http://localhost:3000
```

---

## 📋 Review Checklist

For each language, check:

- [ ] **Landing Page** (`/`)
  - [ ] Hero section translated
  - [ ] Navigation menu translated
  - [ ] Features section translated
  - [ ] CTA buttons translated

- [ ] **Pricing Page** (`/subscribe`)
  - [ ] Plan names translated
  - [ ] Pricing information correct
  - [ ] Features list translated
  - [ ] Checkout button translated

- [ ] **Support Page** (`/support`)
  - [ ] Form labels translated
  - [ ] Placeholder text translated
  - [ ] Submit button translated

- [ ] **Legal Pages**
  - [ ] Terms of Service (`/terms`)
  - [ ] Privacy Policy (`/privacy`)

- [ ] **App Panel** (`/panel`)
  - [ ] UI elements translated (if applicable)
  - [ ] Error messages translated

---

## 🔄 Quick Switch Script

Create a script to quickly switch between languages:

### Option 1: Simple Bash Script

Save as `review-language.sh`:

```bash
#!/bin/bash

LANGUAGE=$1

case $LANGUAGE in
  en)
    git checkout main
    ;;
  ru)
    git checkout i18n/ru
    ;;
  pt)
    git checkout i18n/pt-BR
    ;;
  es)
    git checkout i18n/es
    ;;
  de)
    git checkout i18n/de
    ;;
  nl)
    git checkout i18n/nl
    ;;
  sv)
    git checkout i18n/sv
    ;;
  fr)
    git checkout i18n/fr
    ;;
  ar)
    git checkout i18n/ar
    ;;
  *)
    echo "Usage: ./review-language.sh [en|ru|pt|es|de|nl|sv|fr|ar]"
    exit 1
    ;;
esac

echo "Switched to $LANGUAGE branch. Run 'npm run dev' to start server."
```

**Usage:**
```bash
chmod +x review-language.sh
./review-language.sh ru  # Switch to Russian
npm run dev
```

---

## 🌐 Alternative: Multiple Ports (Advanced)

If you want to run multiple languages simultaneously on different ports:

### Setup Multiple Ports

```bash
# Terminal 1 - English (port 3000)
git checkout main
PORT=3000 npm run dev

# Terminal 2 - Russian (port 3001)
git checkout i18n/ru
PORT=3001 npm run dev

# Terminal 3 - Portuguese (port 3002)
git checkout i18n/pt-BR
PORT=3002 npm run dev

# etc...
```

**URLs:**
- English: http://localhost:3000
- Russian: http://localhost:3001
- Portuguese: http://localhost:3002
- etc.

---

## 📝 Notes

1. **Translation Files Location:**
   - All translations are in `messages/[locale].json`
   - Example: `messages/ru.json` for Russian

2. **Current Status:**
   - Translation files are created ✅
   - i18n infrastructure is set up ✅
   - **Note:** Full i18n integration may need to be implemented in components

3. **To Edit Translations:**
   - Checkout the language branch
   - Edit `messages/[locale].json`
   - Test locally with `npm run dev`
   - Commit changes to that branch

---

## 🎯 Recommended Review Order

1. **English (main)** - Baseline reference
2. **Russian (ru)** - Cyrillic script
3. **Arabic (ar)** - RTL language
4. **Portuguese (pt-BR)** - Similar to Spanish
5. **Spanish (es)** - Large market
6. **German (de)** - European market
7. **French (fr)** - European market
8. **Dutch (nl)** - European market
9. **Swedish (sv)** - Nordic market

---

## 🔍 What to Look For

### Text Issues
- [ ] Text overflow (especially German - tends to be longer)
- [ ] Text truncation
- [ ] Missing translations (showing English fallback)
- [ ] Incorrect translations

### Layout Issues
- [ ] RTL support for Arabic
- [ ] Button sizes (some languages need more space)
- [ ] Navigation menu width
- [ ] Form field alignment

### Content Issues
- [ ] Currency symbols (should remain $ or convert?)
- [ ] Date formats
- [ ] Number formats
- [ ] Cultural appropriateness

---

**Document Version:** 1.0  
**Last Updated:** January 2025


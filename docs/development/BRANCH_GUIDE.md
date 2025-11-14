# Branch Organization Guide

This repository uses multiple branches for different features and language versions.

## Overview

The codebase is organized into topic-based branches for better maintainability:

- **`feature/freemium-strategy`**: Contains all subscription, pricing, and payment-related features
- **`feature/i18n-languages`**: Contains all internationalization and language-related features
- **`i18n/*`**: Individual language branches for translations

---

## Feature Branches

### `feature/freemium-strategy`

**Purpose**: Subscription, pricing, and payment processing features

**Contains**:
- Subscription API routes (`src/app/api/subscription/`)
- Checkout API routes (`src/app/api/checkout/`)
- Subscribe pages (`src/app/subscribe/`)
- Subscription utilities (`src/utils/subscription.js`)
- Database schema (`sql/create-subscription-tables.sql`)
- Documentation:
  - `docs/development/FREEMIUM_STRATEGY.md`
  - `docs/development/PRICING_STRATEGY.md`
  - `docs/development/CONVERSION_FUNNEL_STRATEGY.md`
  - `docs/development/SUBSCRIBE_PAGE_IMPLEMENTATION.md`

**Key Recommendations**:
- **7-day free trial** from first measurement
- **50 measurements** during trial
- **10 measurements/month** after trial (free tier)
- **Unlimited** for premium subscribers
- Process subscriptions on website (measuremint.app/subscribe) to avoid Miro Marketplace 30% fee

**Status**: Planning/Testing Branch - Not Integrated

**Quick Start**:
1. Read `docs/development/SUBSCRIPTION_STRATEGY_SUMMARY.md` for quick answers
2. Review `docs/development/FREEMIUM_STRATEGY.md` for full details
3. See `docs/development/SUBSCRIPTION_IMPLEMENTATION_EXAMPLE.md` for code examples

### `feature/i18n-languages`

**Purpose**: Internationalization and multi-language support

**Contains**:
- Translation files (`messages/*.json`)
- Language selector component (`src/components/LanguageSelector.jsx`)
- Language detection utilities (`src/utils/languageDetection.js`)
- i18n configuration (`i18n.config.js`)
- Page header with language support (`src/components/PageHeader.jsx`)
- Loom video configuration (`src/config/loom-videos.js`)
- Font configurations for CJK and Arabic languages
- Documentation:
  - `docs/development/I18N_SETUP.md`
  - `docs/development/I18N_ARCHITECTURE.md`
  - `docs/development/LANGUAGE_SELECTOR_IMPLEMENTATION.md`
  - `docs/development/AI_VOICEOVER_TOOLS.md`

**Supported Languages**:
- English (en) - `main` branch
- Russian (ru)
- Brazilian Portuguese (pt-BR)
- Spanish (es)
- German (de)
- Netherlands Dutch (nl)
- Swedish (sv)
- French (fr)
- Italian (it)
- Arabic (ar)
- Japanese (ja)
- Mandarin Chinese (zh-CN)
- Cantonese (zh-HK)

---

## Language Branches (`i18n/*`)

### Available Language Branches

| Branch | Language | Code |
|--------|----------|------|
| `main` | English | `en` |
| `i18n/ru` | Russian | `ru` |
| `i18n/pt-BR` | Brazilian Portuguese | `pt-BR` |
| `i18n/es` | Spanish | `es` |
| `i18n/de` | German | `de` |
| `i18n/nl` | Netherlands Dutch | `nl` |
| `i18n/sv` | Swedish | `sv` |
| `i18n/fr` | French | `fr` |
| `i18n/ar` | Arabic | `ar` |
| `i18n/ja` | Japanese | `ja` |
| `i18n/zh-CN` | Mandarin Chinese | `zh-CN` |
| `i18n/zh-HK` | Cantonese | `zh-HK` |

### Working with Language Branches

#### Switching to a Language Branch

```bash
# Russian
git checkout i18n/ru

# Brazilian Portuguese
git checkout i18n/pt-BR

# Spanish
git checkout i18n/es

# German
git checkout i18n/de

# Use the review script (easiest)
./review-language.sh ru    # Russian
./review-language.sh pt    # Portuguese
./review-language.sh es    # Spanish
# etc.
```

#### Editing Translations

1. **Checkout the language branch:**
   ```bash
   git checkout i18n/ru
   ```

2. **Edit translation files:**
   - Translation files are in `messages/[locale].json`
   - Example: `messages/ru.json` for Russian

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Commit and push:**
   ```bash
   git add messages/ru.json
   git commit -m "Update Russian translations"
   git push origin i18n/ru
   ```

#### Merging Updates from Main

When the main branch is updated:

1. **Checkout your language branch:**
   ```bash
   git checkout i18n/ru
   ```

2. **Merge main into your branch:**
   ```bash
   git merge main
   ```

3. **Resolve conflicts** if any
4. **Update translations** for new strings
5. **Test and commit**

---

## Working with Feature Branches

### Working on Subscription Features

```bash
git checkout feature/freemium-strategy
# Make your changes
git commit -m "Your subscription feature"
git push origin feature/freemium-strategy
```

### Working on Language Features

```bash
git checkout feature/i18n-languages
# Make your changes
git commit -m "Your language feature"
git push origin feature/i18n-languages
```

### Merging to Main

When ready to merge:

```bash
# Merge freemium features
git checkout main
git merge feature/freemium-strategy

# Merge language features
git merge feature/i18n-languages
```

---

## Deployment

Each language branch can be deployed separately:

- **English:** `main` branch → `measuremint.app`
- **Russian:** `i18n/ru` branch → `ru.measuremint.app` or `measuremint.app/ru`
- **Portuguese:** `i18n/pt-BR` branch → `pt.measuremint.app` or `measuremint.app/pt-BR`
- etc.

---

## Notes

- The branches are independent and can be developed in parallel
- Subscription files have been removed from the i18n branch
- Language files have been removed from the freemium-strategy branch
- Both branches can be merged into `main` when ready
- All languages run on the same URL (http://localhost:3000) - just switch branches

## Scripts

- `scripts/separate-branches.sh`: Script used to separate the branches (for reference)
- `review-language.sh`: Quick script to switch between language branches

---

## Additional Documentation

- See `docs/development/I18N_SETUP.md` for detailed i18n setup instructions
- See `docs/development/FREEMIUM_STRATEGY.md` for subscription strategy details

---

**Last Updated:** January 2025


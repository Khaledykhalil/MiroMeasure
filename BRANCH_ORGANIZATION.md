# Branch Organization

## Overview

The codebase has been reorganized into topic-based branches for better maintainability:

- **`feature/freemium-strategy`**: Contains all subscription, pricing, and payment-related features
- **`feature/i18n-languages`**: Contains all internationalization and language-related features

## Branch Details

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

**Last Commit**: `2e66792` - Restore subscription files to freemium-strategy branch

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
  - `docs/development/LOOM_MULTILANG_SETUP.md`
  - `docs/development/AI_VOICEOVER_TOOLS.md`

**Supported Languages**:
- English (en)
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

**Last Commit**: `27e468f` - Remove subscription-related files from i18n branch

## How to Work with These Branches

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

## Notes

- The branches are independent and can be developed in parallel
- Subscription files have been removed from the i18n branch
- Language files have been removed from the freemium-strategy branch
- Both branches can be merged into `main` when ready

## Scripts

- `scripts/separate-branches.sh`: Script used to separate the branches (for reference)


# Language Branches Guide

This repository contains multiple branches for different language versions of MeasureMint.

## 🌍 Available Language Branches

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

## 🚀 Quick Start

### Switching to a Language Branch

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

## 📝 Working with Translations

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

## 🔄 Merging Updates from Main

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

## 📋 Translation Status

- [ ] Russian (ru) - Branch created
- [ ] Brazilian Portuguese (pt-BR) - Branch created
- [ ] Spanish (es) - Branch created
- [ ] German (de) - Branch created
- [ ] Netherlands Dutch (nl) - Branch created
- [ ] Swedish (sv) - Branch created
- [ ] French (fr) - Branch created
- [ ] Arabic (ar) - Branch created

## 🌐 Deployment

Each language branch can be deployed separately:

- **English:** `main` branch → `measuremint.app`
- **Russian:** `i18n/ru` branch → `ru.measuremint.app` or `measuremint.app/ru`
- **Portuguese:** `i18n/pt-BR` branch → `pt.measuremint.app` or `measuremint.app/pt-BR`
- etc.

## 📚 Documentation

See `docs/development/I18N_SETUP.md` for detailed setup instructions.

---

**Last Updated:** January 2025


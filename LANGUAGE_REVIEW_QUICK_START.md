# 🌍 Quick Start: Review Language Versions

## 📋 All Languages Use Same URL

**All languages run on:** http://localhost:3000

You just need to switch branches!

---

## 🚀 Quick Commands

### Method 1: Use the Script (Easiest)

```bash
# Switch to any language
./review-language.sh ru    # Russian
./review-language.sh pt    # Portuguese
./review-language.sh es    # Spanish
./review-language.sh de    # German
./review-language.sh nl    # Dutch
./review-language.sh sv    # Swedish
./review-language.sh fr    # French
./review-language.sh ar    # Arabic
./review-language.sh en    # English

# Then start the server
npm run dev
```

### Method 2: Manual Git Commands

```bash
# English
git checkout main && npm run dev

# Russian
git checkout i18n/ru && npm run dev

# Brazilian Portuguese
git checkout i18n/pt-BR && npm run dev

# Spanish
git checkout i18n/es && npm run dev

# German
git checkout i18n/de && npm run dev

# Netherlands Dutch
git checkout i18n/nl && npm run dev

# Swedish
git checkout i18n/sv && npm run dev

# French
git checkout i18n/fr && npm run dev

# Arabic
git checkout i18n/ar && npm run dev
```

---

## 📱 Local URLs

| Language | Branch | URL |
|----------|--------|-----|
| 🇺🇸 English | `main` | http://localhost:3000 |
| 🇷🇺 Russian | `i18n/ru` | http://localhost:3000 |
| 🇧🇷 Portuguese | `i18n/pt-BR` | http://localhost:3000 |
| 🇪🇸 Spanish | `i18n/es` | http://localhost:3000 |
| 🇩🇪 German | `i18n/de` | http://localhost:3000 |
| 🇳🇱 Dutch | `i18n/nl` | http://localhost:3000 |
| 🇸🇪 Swedish | `i18n/sv` | http://localhost:3000 |
| 🇫🇷 French | `i18n/fr` | http://localhost:3000 |
| 🇸🇦 Arabic | `i18n/ar` | http://localhost:3000 |

---

## ⚡ Quick Review Workflow

1. **Switch branch:**
   ```bash
   ./review-language.sh ru
   ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

4. **Review pages:**
   - `/` - Landing page
   - `/subscribe` - Pricing page
   - `/support` - Support page
   - `/terms` - Terms of service
   - `/privacy` - Privacy policy

5. **Switch to next language:**
   - Stop server (Ctrl+C)
   - Run `./review-language.sh [next-language]`
   - Run `npm run dev` again

---

## 📝 Review Checklist

For each language, verify:

- ✅ Navigation menu is translated
- ✅ Hero section is translated
- ✅ Pricing page is translated
- ✅ Support form is translated
- ✅ Buttons and CTAs are translated
- ✅ No text overflow issues
- ✅ RTL support for Arabic (if applicable)

---

**Tip:** Keep this file open while reviewing languages!


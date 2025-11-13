# Internationalization (i18n) Architecture

## Current Setup ✅

MeasureMint uses a **single-branch approach** with translation files. This is the modern, recommended way to handle multilingual websites.

### Architecture

```
main branch (single branch)
├── src/
│   ├── app/
│   │   └── page.jsx (uses translations dynamically)
│   └── components/
│       └── LanguageSelector.jsx (switches languages)
├── messages/
│   ├── en.json (English)
│   ├── de.json (German)
│   ├── es.json (Spanish)
│   ├── fr.json (French)
│   ├── pt-BR.json (Portuguese)
│   ├── ru.json (Russian)
│   ├── nl.json (Dutch)
│   ├── sv.json (Swedish)
│   ├── ar.json (Arabic)
│   ├── ja.json (Japanese)
│   ├── zh-CN.json (Mandarin)
│   └── zh-HK.json (Cantonese)
└── src/config/
    └── loom-videos.js (language-specific video IDs)
```

### How It Works

1. **User selects language** → Language selector updates URL: `?lang=de`
2. **Page loads** → Reads locale from URL or localStorage
3. **Translations load** → Dynamically imports `messages/de.json`
4. **Content renders** → All text uses `t('key')` function
5. **Video updates** → Loom video switches based on locale

### Benefits

✅ **Single codebase** - One source of truth  
✅ **Easy maintenance** - Update code once, affects all languages  
✅ **No merge conflicts** - No syncing across branches  
✅ **Better SEO** - Same URLs, language via query params  
✅ **Simpler deployment** - One build, one deploy  
✅ **Easy to add languages** - Just add a new JSON file  

---

## Old Approach (Not Recommended) ❌

### Separate Branches (Deprecated)

```
i18n/de branch
i18n/es branch
i18n/fr branch
... (one branch per language)
```

**Problems:**
- ❌ Code duplication across branches
- ❌ Merge conflicts when updating code
- ❌ Hard to keep in sync
- ❌ Multiple deployments needed
- ❌ Maintenance nightmare

**Status:** These branches are **obsolete** and can be deleted.

---

## Adding a New Language

### Step 1: Create Translation File

Create `/messages/new-locale.json`:

```json
{
  "common": {
    "appName": "MeasureMint",
    "tagline": "Translation here",
    "launchApp": "Launch App",
    "support": "Support",
    "pricing": "Pricing"
  },
  "home": {
    "hero": {
      "title": "Translation here",
      "subtitle": "Translation here",
      "ctaPrimary": "Launch App",
      "ctaSecondary": "Join Waitlist"
    },
    "video": {
      "title": "MeasureMint Demo Video"
    }
  }
}
```

### Step 2: Add to Language Selector

Update `/src/components/LanguageSelector.jsx`:

```javascript
const languages = [
  // ... existing languages
  { code: 'new-locale', name: 'Language Name', flag: '🇺🇸' },
]
```

### Step 3: Add to Loom Videos Config

Update `/src/config/loom-videos.js`:

```javascript
export const LOOM_VIDEOS = {
  // ... existing videos
  'new-locale': 'video-id-here',
}
```

### Step 4: Done! ✅

The new language will automatically work. No code changes needed.

---

## Translation Workflow

### For Content Updates

1. **Update English** (`messages/en.json`) - Source of truth
2. **Translate to other languages** - Update each `messages/*.json` file
3. **Test** - Switch languages and verify

### For Code Updates

1. **Update code** - Add new `t('key')` calls
2. **Add English translation** - Add to `messages/en.json`
3. **Translate** - Add translations to other language files
4. **Done** - No branch management needed!

---

## Best Practices

1. **English as source** - Always update English first
2. **Consistent keys** - Use descriptive, hierarchical keys (`home.hero.title`)
3. **Complete translations** - Ensure all languages have all keys
4. **Test all languages** - Verify each language works correctly
5. **Professional translation** - Use native speakers for quality

---

## Migration from Old Branches

If you have old language branches, you can safely delete them:

```bash
# Delete local branches
git branch -D i18n/ar i18n/de i18n/es i18n/fr i18n/nl i18n/pt-BR i18n/ru i18n/sv

# Delete remote branches
git push origin --delete i18n/ar i18n/de i18n/es i18n/fr i18n/nl i18n/pt-BR i18n/ru i18n/sv
```

**Note:** Make sure all translations are in the `/messages/` folder before deleting branches.

---

## FAQ

### Q: Do I need separate branches for each language?
**A:** No! The single-branch approach is better. Use translation files instead.

### Q: How do I update translations?
**A:** Just edit the JSON files in `/messages/`. No code changes needed.

### Q: Can I use a translation service?
**A:** Yes! You can use services like Google Translate API, DeepL, or professional translators to populate the JSON files.

### Q: What about SEO?
**A:** The current approach uses query parameters (`?lang=de`). For better SEO, you could switch to path-based routing (`/de/`, `/es/`), but query params work fine for most use cases.

### Q: How do I add a new language?
**A:** Just create a new JSON file in `/messages/` and add it to the language selector. That's it!

---

## Summary

✅ **Current approach (single branch + translation files) is correct**  
❌ **Old language branches are obsolete and can be deleted**  
✅ **No need for separate branches - just translation files**  
✅ **Much easier to maintain and update**


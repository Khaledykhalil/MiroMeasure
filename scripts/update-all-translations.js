/**
 * Script to update all translation files with complete structure
 * This ensures all language files have the same keys as en.json
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const enFile = path.join(messagesDir, 'en.json');

// Read English file as template
const enTranslations = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// List of all language files to update (excluding en.json)
const languageFiles = [
  'ru.json',
  'pt-BR.json',
  'es.json',
  'de.json',
  'nl.json',
  'sv.json',
  'fr.json',
  'it.json',
  'ar.json',
  'ja.json',
  'zh-CN.json',
  'zh-HK.json'
];

// Function to merge translations, preserving existing translations
function mergeTranslations(existing, template) {
  const merged = { ...template };
  
  // Recursively merge, preserving existing translations
  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key]) {
          target[key] = {};
        }
        deepMerge(target[key], source[key]);
      } else if (target[key] === undefined || target[key] === null) {
        // Only add if key doesn't exist or is null
        target[key] = source[key];
      }
    }
  }
  
  deepMerge(existing, template);
  return existing;
}

// Update each language file
languageFiles.forEach(filename => {
  const filePath = path.join(messagesDir, filename);
  
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const merged = mergeTranslations(existing, enTranslations);
      
      // Write back with proper formatting
      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${filename}`);
    } catch (error) {
      console.error(`✗ Error updating ${filename}:`, error.message);
    }
  } else {
    console.log(`⚠ File not found: ${filename}`);
  }
});

console.log('\nAll translation files updated!');


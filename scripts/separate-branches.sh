#!/bin/bash

# Script to separate subscription and language features into different branches
# This script will:
# 1. Create a new branch for languages from main
# 2. Cherry-pick all language-related commits
# 3. Reset freemium-strategy to before language work

set -e

echo "🔀 Separating subscription and language features..."

# Language-related commits (in chronological order)
LANGUAGE_COMMITS=(
  "db50532"  # Add i18n support: Create language branches and translation files for 8 languages
  "3636fa0"  # Add Italian language support and automatic language detection based on geolocation
  "702e495"  # Ensure language selector icon is always visible
  "f49e221"  # Fix: Show language selector immediately, don't wait for translations to load
  "e164cb1"  # Add translations to all pages: Support, Waitlist, Help, Guide, and main page
  "9d314fb"  # Complete translation support for Support page
  "6e09023"  # Add complete translations for entire main page - all sections now translatable
  "add6a5e"  # Fix import paths for translation files - use correct relative paths from subdirectories
  "ccbb40b"  # Fix: Correct paths for page.jsx and PageHeader.jsx (they're only 2 levels deep)
  "113a106"  # Fix: Complete Portuguese translations and improve translation function with fallbacks
  "49ec4e1"  # Improve translation function across all pages with better fallback handling
  "a7d20ca"  # Update all language files with complete translation structure - all keys now present
  "b81187f"  # Complete translations for all languages - all missing keys now translated
  "119373d"  # Add Noto Sans Arabic font and RTL support for Arabic language
  "d12b965"  # Switch Arabic font from Noto Sans Arabic to Cairo
  "92bdd4c"  # Fix Cairo font loading using Next.js font optimization
  "3516d7f"  # Improve Cairo font loading with Tailwind class and CSS variable fallback
  "3e1297e"  # Use Cairo font className directly from Next.js for better reliability
  "9563bfe"  # Remove global Cairo font from body, apply only to Arabic content
  "e18d623"  # Switch Arabic font from Cairo to Noto Sans Arabic
  "7243aef"  # Fix Noto Sans Arabic font: remove unsupported latin subset
  "1325309"  # Fix font overrides: apply Arabic font directly to all children instead of inherit
  "6dae64b"  # Add Noto Sans fonts for Japanese, Mandarin, Cantonese, and Korean
  "d8f767b"  # Add Noto Sans fonts for Japanese, Mandarin, Cantonese, and Korean with proper subsets
  "0f7c378"  # Fix Noto Sans CJK fonts: add preload option for proper font loading
  "8134536"  # Add comprehensive system font fallbacks for CJK and Arabic languages
)

# Last subscription-only commit (before language work)
LAST_SUBSCRIPTION_COMMIT="22e863e"

echo "📦 Step 1: Creating new i18n branch from main..."
git checkout main
git checkout -b feature/i18n-languages

echo "📝 Step 2: Cherry-picking language commits..."
for commit in "${LANGUAGE_COMMITS[@]}"; do
  echo "  Cherry-picking $commit..."
  if git cherry-pick "$commit" 2>/dev/null; then
    echo "    ✓ Success"
  else
    echo "    ⚠ Conflict or already applied, skipping..."
    git cherry-pick --abort 2>/dev/null || true
  fi
done

echo "🔄 Step 3: Resetting freemium-strategy to before language work..."
git checkout feature/freemium-strategy
git reset --hard "$LAST_SUBSCRIPTION_COMMIT"

echo "✅ Done!"
echo ""
echo "📋 Summary:"
echo "  - feature/i18n-languages: Contains all language-related commits"
echo "  - feature/freemium-strategy: Reset to commit $LAST_SUBSCRIPTION_COMMIT (before language work)"
echo ""
echo "⚠️  Note: You may need to push these branches with --force to update remote"


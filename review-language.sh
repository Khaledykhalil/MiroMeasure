#!/bin/bash

LANGUAGE=$1

case $LANGUAGE in
  en)
    git checkout main
    echo "✅ Switched to English (main branch)"
    ;;
  ru)
    git checkout i18n/ru
    echo "✅ Switched to Russian (i18n/ru branch)"
    ;;
  pt)
    git checkout i18n/pt-BR
    echo "✅ Switched to Brazilian Portuguese (i18n/pt-BR branch)"
    ;;
  es)
    git checkout i18n/es
    echo "✅ Switched to Spanish (i18n/es branch)"
    ;;
  de)
    git checkout i18n/de
    echo "✅ Switched to German (i18n/de branch)"
    ;;
  nl)
    git checkout i18n/nl
    echo "✅ Switched to Netherlands Dutch (i18n/nl branch)"
    ;;
  sv)
    git checkout i18n/sv
    echo "✅ Switched to Swedish (i18n/sv branch)"
    ;;
  fr)
    git checkout i18n/fr
    echo "✅ Switched to French (i18n/fr branch)"
    ;;
  ar)
    git checkout i18n/ar
    echo "✅ Switched to Arabic (i18n/ar branch)"
    ;;
  *)
    echo "❌ Invalid language code"
    echo ""
    echo "Usage: ./review-language.sh [en|ru|pt|es|de|nl|sv|fr|ar]"
    echo ""
    echo "Available languages:"
    echo "  en - English"
    echo "  ru - Russian"
    echo "  pt - Brazilian Portuguese"
    echo "  es - Spanish"
    echo "  de - German"
    echo "  nl - Netherlands Dutch"
    echo "  sv - Swedish"
    echo "  fr - French"
    echo "  ar - Arabic"
    exit 1
    ;;
esac

echo ""
echo "🌐 Now run: npm run dev"
echo "📱 Open: http://localhost:3000"

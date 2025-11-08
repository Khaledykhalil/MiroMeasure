#!/bin/bash
# MeasureMint Codebase Cleanup Script
# Removes test files, backups, and unused directories

echo "🧹 Cleaning up MeasureMint codebase..."
echo ""

# Remove test files
if [ -f "test-email-api.html" ]; then
    rm -f test-email-api.html
    echo "✅ Removed test-email-api.html"
else
    echo "ℹ️  test-email-api.html not found (already removed)"
fi

if [ -f "test-verified-domain.sh" ]; then
    rm -f test-verified-domain.sh
    echo "✅ Removed test-verified-domain.sh"
else
    echo "ℹ️  test-verified-domain.sh not found (already removed)"
fi

# Remove backup
if [ -f "src/app/page.jsx.backup" ]; then
    rm -f src/app/page.jsx.backup
    echo "✅ Removed src/app/page.jsx.backup"
else
    echo "ℹ️  src/app/page.jsx.backup not found (already removed)"
fi

# Remove empty directory
if [ -d "miro-base" ]; then
    rm -rf miro-base/
    echo "✅ Removed empty miro-base/ directory"
else
    echo "ℹ️  miro-base/ not found (already removed)"
fi

# Check if coverage/ should be in .gitignore
if [ -f ".gitignore" ]; then
    if ! grep -q "^coverage/" .gitignore 2>/dev/null; then
        echo "coverage/" >> .gitignore
        echo "✅ Added coverage/ to .gitignore"
    else
        echo "ℹ️  coverage/ already in .gitignore"
    fi
else
    echo "⚠️  .gitignore not found"
fi

# Remove coverage from git if tracked
if git ls-files --error-unmatch coverage/ >/dev/null 2>&1; then
    git rm -r --cached coverage/ 2>/dev/null
    echo "✅ Removed coverage/ from git tracking"
else
    echo "ℹ️  coverage/ not tracked by git"
fi

echo ""
echo "🎉 Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  - Removed test files"
echo "  - Removed backup files"
echo "  - Removed empty directories"
echo "  - Updated .gitignore"
echo ""
echo "📝 Next steps:"
echo "  1. Review changes: git status"
echo "  2. Commit: git add -A && git commit -m 'chore: Remove test files and cleanup codebase'"
echo "  3. Push: git push origin main"
echo ""


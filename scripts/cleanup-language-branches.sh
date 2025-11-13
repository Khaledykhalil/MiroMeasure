#!/bin/bash

# Script to clean up obsolete language branches
# These branches are no longer needed since we use translation files

echo "🧹 Cleaning up obsolete language branches..."
echo ""

# List of branches to delete
BRANCHES=(
  "i18n/ar"
  "i18n/de"
  "i18n/es"
  "i18n/fr"
  "i18n/nl"
  "i18n/pt-BR"
  "i18n/ru"
  "i18n/sv"
)

# Check if we're on main or a safe branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" == "main" ]] || [[ "$CURRENT_BRANCH" == "feature/freemium-strategy" ]]; then
  echo "✅ Current branch: $CURRENT_BRANCH (safe to proceed)"
else
  echo "⚠️  Warning: You're on branch '$CURRENT_BRANCH'"
  echo "   Make sure you're on main or a feature branch before proceeding"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo ""
echo "📋 Branches to delete:"
for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet refs/heads/"$branch"; then
    echo "  - $branch (local)"
  fi
  if git show-ref --verify --quiet refs/remotes/origin/"$branch"; then
    echo "  - $branch (remote)"
  fi
done

echo ""
read -p "⚠️  Are you sure you want to delete these branches? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "🗑️  Deleting local branches..."

# Delete local branches
for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet refs/heads/"$branch"; then
    git branch -D "$branch" 2>/dev/null && echo "  ✅ Deleted local: $branch" || echo "  ⚠️  Failed to delete local: $branch"
  else
    echo "  ℹ️  Local branch doesn't exist: $branch"
  fi
done

echo ""
echo "🗑️  Deleting remote branches..."

# Delete remote branches
for branch in "${BRANCHES[@]}"; do
  if git show-ref --verify --quiet refs/remotes/origin/"$branch"; then
    git push origin --delete "$branch" 2>/dev/null && echo "  ✅ Deleted remote: $branch" || echo "  ⚠️  Failed to delete remote: $branch"
  else
    echo "  ℹ️  Remote branch doesn't exist: $branch"
  fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📝 Note: All translations are now in /messages/*.json files"
echo "   No functionality is lost - the single-branch approach is better!"


#!/bin/bash

# Angular 19 Monorepo - Project Verification Script
# This script verifies that the project is set up correctly

echo "🚀 Angular 19 Monorepo - Project Verification"
echo "=============================================="
echo ""

# Check Node version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "   Node.js: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v)
echo "   npm: $NPM_VERSION"

# Check if node_modules exists
echo ""
echo "📚 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules folder exists"
else
    echo "   ❌ node_modules not found. Run: npm install"
    exit 1
fi

# Check if db.json exists
echo ""
echo "🗄️  Checking database file..."
if [ -f "db.json" ]; then
    echo "   ✅ db.json exists"
else
    echo "   ❌ db.json not found"
    exit 1
fi

# Check if key directories exist
echo ""
echo "📁 Checking project structure..."
DIRS=(
    "projects/apps/admin/src/app/components/users"
    "projects/apps/admin/src/app/components/tasks"
    "projects/apps/admin/src/app/components/dashboard"
    "projects/apps/user/src/app/components/task-list"
    "projects/apps/user/src/app/components/task-detail"
    "projects/shared/services"
    "projects/shared/components"
)

for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "   ✅ $dir"
    else
        echo "   ❌ $dir not found"
    fi
done

# Check configuration files
echo ""
echo "⚙️  Checking configuration files..."
CONFIGS=(
    ".eslintrc.json"
    ".prettierrc"
    "tsconfig.json"
    "angular.json"
)

for config in "${CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        echo "   ✅ $config"
    else
        echo "   ❌ $config not found"
    fi
done

echo ""
echo "=============================================="
echo "✨ Verification Complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. Start JSON Server:  npm run db"
echo "   2. Start Admin App:    npm run start:admin"
echo "   3. Start User App:     npm run start:user"
echo ""
echo "📖 Documentation:"
echo "   - README.md          - Full documentation"
echo "   - QUICKSTART.md      - Quick start guide"
echo "   - PROJECT_SUMMARY.md - What's implemented"
echo ""
echo "Happy coding! 🎉"


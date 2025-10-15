#!/bin/bash

echo "🎨 Edit Empire - Making It Work!"
echo "================================"
echo ""

# Step 1: Fix critical Zod dependency
echo "Step 1/4: Fixing Zod dependency..."
bun remove zod 2>/dev/null
bun add zod@^3.23.8
echo "✅ Zod fixed"
echo ""

# Step 2: Reinstall all dependencies
echo "Step 2/4: Reinstalling dependencies..."
bun install
echo "✅ Dependencies installed"
echo ""

# Step 3: Clear Expo cache
echo "Step 3/4: Clearing Expo cache..."
rm -rf .expo
echo "✅ Cache cleared"
echo ""

# Step 4: Verify installation
echo "Step 4/4: Verifying installation..."
if [ -d "node_modules" ] && [ -f "node_modules/zod/package.json" ]; then
    echo "✅ All dependencies verified"
else
    echo "⚠️  Warning: Some dependencies may be missing"
fi
echo ""

echo "================================"
echo "🎉 Your app is ready to work!"
echo ""
echo "To start the app, run:"
echo "  bun run start"
echo ""
echo "To start web version:"
echo "  bun run start-web"
echo ""
echo "Read START_HERE.md for detailed instructions"
echo "================================"

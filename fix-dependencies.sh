#!/bin/bash

echo "🔧 Fixing Edit Empire Dependencies..."
echo ""

# Fix Zod version (critical)
echo "📦 Fixing Zod version..."
bun remove zod
bun add zod@^3.23.8

# Update to Expo SDK 54
echo "📦 Upgrading to Expo SDK 54..."
bun add expo@~54.0.0

# Fix all Expo packages
echo "📦 Fixing Expo package versions..."
bun expo install --fix

# Clean install
echo "🧹 Cleaning and reinstalling..."
rm -rf node_modules
bun install

echo ""
echo "✅ Dependencies fixed!"
echo ""
echo "Next steps:"
echo "1. Run: bun run start"
echo "2. Test the app thoroughly"
echo "3. If everything works, you're ready to publish!"

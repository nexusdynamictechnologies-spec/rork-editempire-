#!/bin/bash

echo "🔧 Fixing Edit Empire..."
echo ""

# Fix Zod version
echo "📦 Fixing Zod dependency..."
bun remove zod
bun add zod@3.23.8

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
bun install

echo ""
echo "✅ App fixed successfully!"
echo ""
echo "🚀 Starting Edit Empire..."
echo ""

# Start the app
bun run start

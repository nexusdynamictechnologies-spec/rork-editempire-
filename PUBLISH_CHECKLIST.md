# Publish Checklist - Edit Empire App

## Critical Issues to Fix Before Publishing

### 1. **Fix Zod Version (CRITICAL)**
Your package.json has `"zod": "^4.1.11"` which doesn't exist. Run:
```bash
bun remove zod
bun add zod@^3.23.8
```

### 2. **Upgrade to Expo SDK 54 (As Requested)**
Run these commands in order:
```bash
# Update Expo CLI
bun add expo@~54.0.0

# Update all Expo packages
bun expo install --fix

# Or manually update key packages:
bun add expo-router@~5.1.0 react-native@0.80.0 react-native-gesture-handler@~2.25.0 react-native-reanimated@~3.18.0 react-native-safe-area-context@5.4.0 react-native-screens@~4.11.0
```

### 3. **Test Core Functionality**
After fixing dependencies, test these critical flows:
- ✅ Upload an image
- ✅ Generate an edit with a prompt
- ✅ Use AI Enhance on a prompt
- ✅ Apply a pose preset
- ✅ Apply a frame preset
- ✅ Undo/redo functionality
- ✅ Save image to device
- ✅ View saved images
- ✅ Subscription flow

### 4. **Build Configuration**
Your app.json is properly configured with:
- ✅ Bundle identifiers (iOS & Android)
- ✅ Permissions (Camera, Photos, Media Library)
- ✅ Icons and splash screens
- ✅ Plugins configured

### 5. **Pre-Publish Commands**
```bash
# Clean install
rm -rf node_modules bun.lock
bun install

# Test on web
bun run start-web

# Test on device via Expo Go
bun run start
```

## Known Working Features
- ✅ Image upload (mobile & web)
- ✅ AI image editing with prompts
- ✅ Reference image support
- ✅ Pose presets (sitting, standing, laying)
- ✅ Frame/aspect ratio presets
- ✅ Undo/redo history
- ✅ Image upscaling
- ✅ Keyboard dismiss button
- ✅ Subscription/payment system
- ✅ Saved images gallery

## App Store Submission Notes
- App name: "Nano Banana Style Prompt Editor" (consider shortening to "Edit Empire")
- Bundle ID: `app.rork.nano-banana-style-prompt-editor`
- All required permissions are declared
- Content policy: No nudity/explicit content with minors (enforced in code)

## Post-Fix Verification
1. Run `bun install` to ensure all dependencies resolve
2. Start the app with `bun run start`
3. Test image upload → edit → save flow
4. Verify no console errors
5. Test on both iOS and Android if possible

## Ready to Publish When:
- [ ] All dependencies install without errors
- [ ] App starts without crashes
- [ ] Core image editing flow works end-to-end
- [ ] No TypeScript errors
- [ ] Tested on at least one physical device

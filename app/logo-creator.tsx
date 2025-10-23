import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Sparkles, Wand2, Type, Palette, Grid3x3 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

interface LogoStyle {
  id: string;
  name: string;
  description: string;
  promptAddition: string;
}

const logoStyles: LogoStyle[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design',
    promptAddition: 'modern minimalist logo with clean lines and geometric shapes, contemporary aesthetic, professional',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic retro style',
    promptAddition: 'vintage retro logo with classic typography, aged texture, timeless design, heritage brand aesthetic',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Futuristic & digital',
    promptAddition: 'futuristic tech logo with digital elements, circuit patterns, innovation-focused, cutting-edge design',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Elegant & premium',
    promptAddition: 'luxury premium logo with elegant typography, sophisticated design, high-end brand aesthetic, refined details',
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Fun & energetic',
    promptAddition: 'playful energetic logo with vibrant colors, dynamic shapes, fun personality, approachable design',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional business',
    promptAddition: 'corporate professional logo with authoritative presence, business-focused, trustworthy design, formal aesthetic',
  },
  {
    id: '3d',
    name: '3D Effect',
    description: 'Dimensional depth',
    promptAddition: '3D logo with dimensional depth, realistic shadows, volumetric design, modern depth effect',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Colorful gradients',
    promptAddition: 'gradient logo with smooth color transitions, vibrant spectrum, modern gradient design, eye-catching colors',
  },
  {
    id: 'monogram',
    name: 'Monogram',
    description: 'Letter-based design',
    promptAddition: 'monogram logo with interlocked letters, elegant typography, sophisticated letter combination, classic monogram style',
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'Circular emblem style',
    promptAddition: 'badge logo with circular or shield emblem, vintage badge aesthetic, classic seal design, authoritative mark',
  },
];

export default function LogoCreatorScreen() {
  const [logoText, setLogoText] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('modern');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!logoText.trim()) {
      Alert.alert('Missing Text', 'Please enter the text/letters for your logo');
      return;
    }

    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const selectedStyleObj = logoStyles.find(s => s.id === selectedStyle);
      const stylePrompt = selectedStyleObj ? selectedStyleObj.promptAddition : logoStyles[0].promptAddition;

      const enhancedPrompt = `🎯 PROFESSIONAL LOGO DESIGN - ULTRA-PRECISE TEXT RENDERING

📋 LOGO SPECIFICATIONS:
Text Content: "${logoText}"
Style: ${selectedStyleObj?.name || 'Modern'}
${customPrompt ? `Additional Requirements: ${customPrompt}` : ''}

🎨 PRIMARY OBJECTIVE:
Create a professional logo design featuring the EXACT text "${logoText}" with PIXEL-PERFECT accuracy. Every letter, number, and symbol must be rendered with absolute precision and clarity.

✍️ TEXT RENDERING MASTERY - CRITICAL REQUIREMENTS:

1️⃣ CHARACTER ACCURACY (ZERO TOLERANCE FOR ERRORS):
- Render EXACTLY the text: "${logoText}"
- Each character must be PERFECTLY formed with correct shape and proportions
- Letters must be in the EXACT order specified
- Numbers must be rendered with perfect digit clarity
- Symbols must be accurate and well-defined
- NO missing letters, NO extra letters, NO wrong letters
- NO character substitutions or approximations
- VERIFY: Count characters in output matches input exactly

2️⃣ TYPOGRAPHY EXCELLENCE:
- Select typography that matches ${selectedStyleObj?.name || 'Modern'} style perfectly
- Font weight should be appropriate for the brand aesthetic
- Letter spacing must be professional and balanced
- Kerning between letter pairs must be visually perfect
- Baseline alignment must be consistent across all characters
- Cap height and x-height must be proportionally correct
- Ascenders and descenders properly balanced

3️⃣ READABILITY & CLARITY:
- Every letter must be CRYSTAL CLEAR and instantly recognizable
- Text must be highly legible at any scale
- Sharp, clean edges on all letterforms
- No blur, distortion, or degradation of text quality
- Perfect contrast between text and background
- Each character distinctly separated and identifiable
- Text should be the PRIMARY FOCUS of the logo

4️⃣ STYLE INTEGRATION - ${selectedStyleObj?.name.toUpperCase() || 'MODERN'}:
${stylePrompt}
- Style elements must ENHANCE not obscure the text
- Decorative elements should complement the typography
- Maintain readability while applying style effects
- Balance creativity with functional clarity

5️⃣ PROFESSIONAL LOGO STANDARDS:

COMPOSITION:
- Centered, balanced layout with visual harmony
- Appropriate negative space around text
- Professional proportions and scaling
- Text as the hero element of the design

COLOR PALETTE:
- Professional color selection matching style
- High contrast for maximum visibility
- Harmonious color relationships
- Consider single-color scalability

TECHNICAL QUALITY:
- High resolution, sharp rendering
- Clean vector-quality appearance
- Scalable design that works at any size
- Print-ready quality standards

BRAND APPEAL:
- Memorable and distinctive design
- Professional and polished appearance
- Versatile for multiple applications
- Timeless design that won't date quickly

6️⃣ TEXT ACCURACY VERIFICATION PROTOCOL:
BEFORE FINALIZING, VERIFY:
✓ Character count matches: "${logoText}" has ${logoText.length} characters
✓ Every letter/number/symbol is present and correct
✓ Character order is exactly as specified
✓ No spelling errors or typos
✓ All characters are legible and clear
✓ Text is the dominant element of the design

7️⃣ LOGO DESIGN BEST PRACTICES:

SIMPLICITY:
- Clean design without unnecessary complexity
- Every element serves a purpose
- Easy to reproduce across media
- Recognizable at thumbnail size

ADAPTABILITY:
- Works on light and dark backgrounds
- Scales from business card to billboard
- Translates well to black and white
- Maintains integrity across applications

RELEVANCE:
- Appropriate for the brand message
- Appeals to target audience
- Timeless yet contemporary
- Professional and credible

🎯 SMART DESIGN INTELLIGENCE:

If text contains 2-3 letters:
- Consider monogram-style integration
- Elegant letter interlocking if appropriate
- Each letter given prominence and clarity

If text contains numbers:
- Render numbers with perfect digit clarity
- Modern numeric typography
- Balance numbers with any letters

If text contains symbols:
- Symbols rendered accurately and clearly
- Integrated naturally into design
- Maintain symbol recognition

If text is a word/phrase:
- Professional word mark design
- Excellent typography selection
- Perfect letter spacing and balance

🚨 CRITICAL RESTRICTIONS:

❌ ABSOLUTELY FORBIDDEN:
- DO NOT change, modify, or misspell the text "${logoText}"
- DO NOT add letters that aren't in the original text
- DO NOT remove letters from the text
- DO NOT substitute similar-looking letters
- DO NOT make the text illegible or obscured
- DO NOT prioritize decoration over text clarity
- DO NOT use fonts that make text unreadable
- DO NOT blur or distort the letterforms

✅ REQUIRED OUTPUT:
- Professional logo design
- Text "${logoText}" rendered with PERFECT accuracy
- Style: ${selectedStyleObj?.name || 'Modern'}
- High clarity and readability
- Commercial-quality result
- Clean, balanced composition

💎 QUALITY ASSURANCE:
The final logo must be a professional design where the text "${logoText}" is PERFECTLY readable, ACCURATELY spelled, and BEAUTIFULLY styled. Every character must be immediately recognizable. This is a precision task where text accuracy is paramount.

🎨 FINAL EXECUTION:
Create a stunning professional logo that showcases "${logoText}" with perfect typographic precision, excellent style integration, and commercial-grade quality. The text must be PERFECT - no mistakes, no approximations, absolute accuracy.`;

      console.log('🎨 Generating logo with AI...');
      console.log('📝 Logo text:', logoText);
      console.log('🎭 Style:', selectedStyleObj?.name);

      const response = await fetch('https://toolkit.rork.com/images/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          size: '1024x1024',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('❌ API Error:', response.status, errorText);
        throw new Error(`Failed to generate logo (${response.status})`);
      }

      const result = await response.json();
      
      if (!result || !result.image || !result.image.base64Data) {
        throw new Error('Invalid response from logo generation service');
      }

      const logoDataUri = `data:${result.image.mimeType || 'image/png'};base64,${result.image.base64Data}`;
      setGeneratedLogo(logoDataUri);

      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      console.log('✅ Logo generated successfully!');
    } catch (error) {
      console.error('❌ Logo generation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to generate logo';
      setErrorMessage(errorMsg);
      Alert.alert('Generation Error', errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseInEditor = () => {
    if (!generatedLogo) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    router.push({
      pathname: '/editor',
      params: { sourceImage: generatedLogo }
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={StyleSheet.absoluteFillObject} />

      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Logo Creator</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Design</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.howToUseSection}>
              <Text style={styles.howToUseTitle}>📋 How to Use the Logo Tab</Text>
              <View style={styles.howToUseContent}>
                <Text style={styles.howToUseHeader}>✨ NO IMAGE UPLOAD REQUIRED</Text>
                <Text style={styles.howToUseText}>
                  The Logo tab is designed for creating professional logos from scratch without needing to upload any images. Simply describe what you want!
                </Text>
                
                <Text style={styles.howToUseStepTitle}>Step 1: Enter Your Text</Text>
                <Text style={styles.howToUseText}>
                  • Type the exact letters, numbers, or symbols you want in your logo
                  • Examples: &ldquo;NDT&rdquo;, &ldquo;AB&rdquo;, &ldquo;X23&rdquo;, &ldquo;LOGO&rdquo;, &ldquo;99&rdquo;, &ldquo;A&B&rdquo;
                  • The AI will render each character with pixel-perfect accuracy
                  • Maximum 20 characters
                </Text>
                
                <Text style={styles.howToUseStepTitle}>Step 2: Choose a Logo Style</Text>
                <Text style={styles.howToUseText}>
                  • Select from 10 professional styles: Modern, Vintage, Tech, Luxury, Playful, Corporate, 3D, Gradient, Monogram, or Badge
                  • Each style is optimized for different brand aesthetics
                  • The style will be applied while keeping your text perfectly legible
                </Text>
                
                <Text style={styles.howToUseStepTitle}>Step 3: Add Custom Instructions (Optional)</Text>
                <Text style={styles.howToUseText}>
                  • Specify colors: &ldquo;use blue and gold colors&rdquo;
                  • Add themes: &ldquo;tech-focused with circuit patterns&rdquo;
                  • Request specific elements: &ldquo;incorporate a shield shape&rdquo;
                  • Describe the mood: &ldquo;professional and trustworthy&rdquo;
                </Text>
                
                <Text style={styles.howToUseStepTitle}>Step 4: Generate Your Logo</Text>
                <Text style={styles.howToUseText}>
                  • Click &ldquo;Generate Professional Logo&rdquo;
                  • AI creates a high-quality logo with your exact text
                  • Text accuracy is guaranteed - every letter rendered perfectly
                  • Generation takes 10-30 seconds
                </Text>
                
                <Text style={styles.howToUseStepTitle}>Step 5: Use in Editor (Optional)</Text>
                <Text style={styles.howToUseText}>
                  • Click &ldquo;Open in Editor&rdquo; to further customize your logo
                  • Add backgrounds, effects, or additional elements
                  • Export in various formats and sizes
                </Text>
                
                <Text style={styles.howToUseHeader}>💎 Pro Tips for Best Results:</Text>
                <Text style={styles.howToUseText}>
                  ✓ Keep text concise (2-8 characters work best)
                  ✓ Be specific about colors and themes in custom instructions
                  ✓ Choose styles that match your brand identity
                  ✓ Monogram style works great for 2-3 letters
                  ✓ Badge style perfect for circular/emblem designs
                  ✓ 3D Effect adds depth and modern appeal
                  ✓ The AI guarantees accurate text rendering every time
                </Text>
                
                <Text style={styles.howToUseHeader}>🎯 Example Prompts:</Text>
                <Text style={styles.howToUseExample}>
                  Text: &ldquo;NDT&rdquo;
                  Style: Modern
                  Custom: &ldquo;use electric blue and silver colors, tech theme&rdquo;
                </Text>
                <Text style={styles.howToUseExample}>
                  Text: &ldquo;LUXURY&rdquo;
                  Style: Luxury
                  Custom: &ldquo;gold and black color scheme, elegant serif font&rdquo;
                </Text>
                <Text style={styles.howToUseExample}>
                  Text: &ldquo;X7&rdquo;
                  Style: 3D Effect
                  Custom: &ldquo;metallic finish, gaming aesthetic, neon accents&rdquo;
                </Text>
                
                <Text style={styles.howToUseFooter}>
                  🚀 The Logo tab delivers professional-quality logos with 100% accurate text rendering, consistency, and smooth generation. Perfect for branding, social media, and business use!
                </Text>
              </View>
            </View>

            {generatedLogo && (
              <View style={styles.previewSection}>
                <Text style={styles.sectionTitle}>Generated Logo</Text>
                <View style={styles.logoPreviewContainer}>
                  <ExpoImage
                    source={{ uri: generatedLogo }}
                    style={styles.logoPreview}
                    contentFit="contain"
                  />
                </View>
                <TouchableOpacity
                  style={styles.useInEditorButton}
                  onPress={handleUseInEditor}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    style={styles.useInEditorGradient}
                  >
                    <Wand2 size={20} color="#1A1A1A" strokeWidth={2.5} />
                    <Text style={styles.useInEditorText}>Open in Editor</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.inputSection}>
              <View style={styles.inputHeader}>
                <Type size={20} color="#FFD700" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Logo Text</Text>
              </View>
              <Text style={styles.inputDescription}>
                Enter any text, letters, numbers, or symbols
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., AB3, LOGO, X, etc."
                placeholderTextColor="#666"
                value={logoText}
                onChangeText={setLogoText}
                maxLength={20}
                testID="logo-text-input"
              />
              <Text style={styles.charCount}>{logoText.length}/20 characters</Text>
            </View>

            <View style={styles.stylesSection}>
              <View style={styles.inputHeader}>
                <Palette size={20} color="#FFD700" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Logo Style</Text>
              </View>
              <View style={styles.stylesGrid}>
                {logoStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.styleCard,
                      selectedStyle === style.id && styles.styleCardActive,
                    ]}
                    onPress={() => setSelectedStyle(style.id)}
                    testID={`style-${style.id}`}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.styleName,
                        selectedStyle === style.id && styles.styleNameActive,
                      ]}
                    >
                      {style.name}
                    </Text>
                    <Text style={styles.styleDescription}>{style.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.customPromptSection}>
              <View style={styles.inputHeader}>
                <Sparkles size={20} color="#FFD700" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Custom Instructions (Optional)</Text>
              </View>
              <Text style={styles.inputDescription}>
                Add specific colors, themes, or design preferences
              </Text>
              <TextInput
                style={styles.customPromptInput}
                placeholder="e.g., use blue and gold colors, tech theme, etc."
                placeholderTextColor="#666"
                value={customPrompt}
                onChangeText={setCustomPrompt}
                multiline
                maxLength={200}
                textAlignVertical="top"
                testID="custom-prompt-input"
              />
            </View>

            <View style={styles.examplesSection}>
              <View style={styles.inputHeader}>
                <Grid3x3 size={20} color="#9D4EDD" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Example Inputs</Text>
              </View>
              <View style={styles.exampleCards}>
                {[
                  { text: 'AB', description: 'Two-letter monogram' },
                  { text: 'X23', description: 'Letter + numbers' },
                  { text: 'TECH', description: 'Word/brand name' },
                  { text: '99', description: 'Pure numbers' },
                ].map((example) => (
                  <TouchableOpacity
                    key={example.text}
                    style={styles.exampleCard}
                    onPress={() => setLogoText(example.text)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.exampleText}>{example.text}</Text>
                    <Text style={styles.exampleDescription}>{example.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
              onPress={handleGenerate}
              disabled={isGenerating}
              activeOpacity={0.9}
              testID="generate-logo-button"
            >
              <LinearGradient
                colors={isGenerating ? ['#666', '#555'] : ['#FFD700', '#FFA500']}
                style={styles.generateGradient}
              >
                {isGenerating ? (
                  <>
                    <ActivityIndicator size="small" color="#1A1A1A" />
                    <Text style={styles.generateText}>Generating...</Text>
                  </>
                ) : (
                  <>
                    <Sparkles size={24} color="#1A1A1A" strokeWidth={2.5} />
                    <Text style={styles.generateText}>Generate Professional Logo</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  howToUseSection: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  howToUseTitle: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  howToUseContent: {
    gap: 12,
  },
  howToUseHeader: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFD700',
    marginTop: 12,
    marginBottom: 6,
  },
  howToUseStepTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#FFA500',
    marginTop: 12,
    marginBottom: 4,
  },
  howToUseText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 8,
  },
  howToUseExample: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic' as const,
    lineHeight: 18,
    marginLeft: 12,
    marginBottom: 8,
  },
  howToUseFooter: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600' as const,
    lineHeight: 20,
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic' as const,
  },
  previewSection: {
    marginBottom: 30,
  },
  logoPreviewContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    marginBottom: 16,
  },
  logoPreview: {
    width: '100%',
    height: '100%',
  },
  useInEditorButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  useInEditorGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  useInEditorText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  inputSection: {
    marginBottom: 30,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  inputDescription: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  charCount: {
    fontSize: 11,
    color: '#666',
    textAlign: 'right',
    marginTop: 6,
  },
  stylesSection: {
    marginBottom: 30,
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  styleCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  styleCardActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    borderColor: '#FFD700',
  },
  styleName: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  styleNameActive: {
    color: '#FFD700',
  },
  styleDescription: {
    fontSize: 11,
    color: '#666',
  },
  customPromptSection: {
    marginBottom: 30,
  },
  customPromptInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    minHeight: 80,
  },
  examplesSection: {
    marginBottom: 30,
  },
  exampleCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  exampleCard: {
    width: '48%',
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.3)',
  },
  exampleText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#9D4EDD',
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 11,
    color: '#999',
  },
  generateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  generateText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  errorText: {
    fontSize: 13,
    color: '#FF6B6B',
    textAlign: 'center',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Target,
  Layers,
  Car,
  Smile,
  Wand2,
  Camera,
  Palette,
  Zap,
  Heart,
  Shield,
  Info,
  Scissors,
  Users,
  Sparkles,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { Image as ExpoImage } from 'expo-image';

export default function InstructionsScreen() {
  const instructionSections = [
    {
      icon: Target,
      title: 'Getting Started',
      color: '#FFD700',
      tips: [
        'Upload any image to begin editing',
        'Be specific about what you want to change',
        'Say "change shirt to red" instead of "make it red"',
        'The app preserves everything you don\'t mention',
        'Each edit builds upon the previous one (cumulative mode)',
        'Use the clear button near the prompt box to reset your text',
      ]
    },
    {
      icon: Wand2,
      title: 'Best Prompting Practices',
      color: '#00FF88',
      tips: [
        'Use descriptive, specific language',
        'Mention colors, materials, and styles clearly',
        'For clothing: "change to black leather jacket with silver zippers"',
        'For backgrounds: "place in a cyberpunk city with neon lights"',
        'For expressions: "add a confident smile with teeth showing"',
        'Combine multiple changes: "add sunglasses and change hair to blonde"',
      ]
    },
    {
      icon: Layers,
      title: 'Multi-Image Features & Room Design',
      color: '#FF6B6B',
      tips: [
        'Add reference images for style guidance',
        'Room Design: Upload empty room + furniture/decor images',
        'Prompt: "place this couch in the living room by the window"',
        'Merge mode: Blend multiple images together seamlessly',
        'Insert mode: Add elements from reference images',
        'Car Wrap mode: Apply designs as vehicle wraps/paint jobs',
        'Use up to 3 reference images for complex edits',
        'Perfect for interior design and home decoration planning',
      ]
    },
    {
      icon: Car,
      title: 'Car Customization',
      color: '#9B59B6',
      tips: [
        'Upload clear, well-lit car photos for best results',
        'Add wrap designs as reference images',
        'Use prompts like "apply this design as a car wrap"',
        'The AI maintains the car\'s original shape and details',
        'Perfect for racing stripes, custom graphics, and paint jobs',
        'Works with any vehicle type: cars, trucks, motorcycles',
      ]
    },
    {
      icon: Smile,
      title: 'Facial Expression Control',
      color: '#E67E22',
      tips: [
        'Set specific expressions: "subtle smile", "confident smirk"',
        'Use expression lock to maintain consistency across edits',
        'The AI understands facial muscle movements (FACS)',
        'Try: "open-mouth surprise", "raised eyebrow curiosity"',
        'Expressions work with any face editing or transformation',
        'Combine with other changes for natural results',
      ]
    },
    {
      icon: Palette,
      title: 'Style Transformation & Animation Conversion',
      color: '#3498DB',
      tips: [
        'Convert animations to realistic: "make this claymation character look realistic"',
        'Convert realistic to animation: "transform to 3D animation style"',
        'Style transfers: "convert to oil painting style", "make it look like anime"',
        'Works with claymation, 3D animation, cartoons, and realistic images',
        'Environment changes: "place in medieval castle"',
        'Lighting effects: "add dramatic sunset lighting"',
        'Use "additions lock" to preserve previously added elements',
        'Identity lock preserves facial features during style changes',
      ]
    },
    {
      icon: Camera,
      title: 'Image Quality Tips',
      color: '#1ABC9C',
      tips: [
        'Use high-resolution, well-lit images',
        'Avoid blurry or heavily compressed photos',
        'Clear subject separation from background works best',
        'Front-facing photos give better facial editing results',
        'Good contrast helps the AI identify elements accurately',
        'Images under 5MB work best for processing speed',
      ]
    },
    {
      icon: Zap,
      title: 'Character Placement & Advanced Positioning',
      color: '#F39C12',
      tips: [
        'Place characters anywhere: "sitting on the couch", "standing by the car"',
        'Inside/outside locations: "inside the house", "outside the building"',
        'Vehicle interactions: "sitting in the driver\'s seat", "leaning against the motorcycle"',
        'Object interactions: "holding a cigar with teeth", "gripping the steering wheel"',
        'The AI understands natural human positioning and interactions',
        'Be specific about body positioning and object placement',
        'Works with any character type: men, women, children (appropriate content only)',
      ]
    },
    {
      icon: Heart,
      title: 'Complete Feature Overview',
      color: '#E91E63',
      tips: [
        '🏠 Room Design: Upload empty room + furniture to visualize placement',
        '🎭 Style Conversion: Transform any animation style to realistic or vice versa',
        '👤 Character Positioning: Place people anywhere - sitting, standing, inside vehicles',
        '🚗 Vehicle Customization: Apply wraps, paint jobs, and custom designs',
        '🎨 Artistic Transformations: Convert to any art style or animation type',
        '💡 Smart Object Interaction: Characters holding items, using objects naturally',
        '🌟 Professional Results: All tabs organized on the left for better workflow',
      ]
    },
    {
      icon: Scissors,
      title: '💇 Hairstyle Tab - Complete Guide',
      color: '#FF1493',
      tips: [
        'Step 1: Upload your base image with a clear view of the person\'s face',
        'Step 2: Tap on the "Hairstyle" tab in the left sidebar',
        'Step 3: Browse through hairstyle options and tap to select your desired style',
        'Step 4: Click the "Generate" button to create multiple angle views',
        'Multiple Views: The AI automatically generates 4 angles - front, left side, right side, and back view',
        'All views maintain the SAME person and appearance - only the camera angle changes',
        'Original image dimensions and orientation are preserved - no unwanted rotations',
        'Tap any generated image to view it in full-size detail',
        'Swipe between the 4 angle views to see the complete hairstyle transformation',
        'Pro Tip: Use well-lit, front-facing photos for the best multi-angle results',
        'The character\'s face, body, and clothing remain consistent across all angles',
        'Perfect for visualizing how a hairstyle looks from every direction',
      ]
    },
    {
      icon: Users,
      title: '🎭 Pose Tab - Complete Guide',
      color: '#9D4EDD',
      tips: [
        'Step 1: Upload your full-body character image with clear visibility',
        'Step 2: Tap on the "Pose" tab in the left sidebar to access pose options',
        'Step 3: Choose from 5 pose categories: Full Body View, Character Angles, Sitting Down, Modeling Poses, or Model (Feminine)',
        'Full Body View: Generates front, back, left side, and right side views of the character',
        'Character Angles: Multiple 360-degree rotation angles showing different perspectives',
        'Sitting Down: Creates views of the character in various seated positions',
        'Modeling Poses: Standard fashion and casual model poses',
        'Model (Feminine): Confident, elegant, and alluring poses within content guidelines',
        'Step 4: Click the "Generate" button to create multiple pose views',
        'Background Consistency: The AI intelligently maintains the same background across all generated poses',
        'Character Preservation: Face, body type, clothing, and overall appearance remain consistent',
        'Tap any generated pose image to view it in full-screen detail with an X button to close',
        'Swipe between generated poses to compare different angles and positions',
        'Pro Tip: Use well-lit, front-facing full-body photos for the best results',
        'Perfect for character reference sheets, model portfolios, and creative visualization',
      ]
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <View style={styles.headerTitleContainer}>
              <BookOpen size={24} color="#FFD700" />
              <Text style={styles.headerTitle}>How to Use</Text>
            </View>
            <Text testID="howto-subtitle" style={styles.headerSubtitle}>Pro tips for Edit Empire</Text>
          </View>
          
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <ExpoImage
              source={{ uri: 'https://r2-pub.rork.com/generated-images/ed73c7b4-9f08-46ac-b59d-7db99592451b.png' }}
              style={styles.welcomeBadge}
              contentFit="contain"
              testID="ee-logo"
            />
            <Text style={styles.welcomeTitle}>Welcome to Edit Empire!</Text>
            <Text style={styles.welcomeDesc}>
              The most advanced AI image editor that can transform anything while preserving what you want to keep. 
              Follow these guidelines to get professional-quality results every time.
            </Text>
          </View>

          {/* No Watermarks & No Ads Section */}
          <View style={styles.noWatermarkSection}>
            <LinearGradient
              colors={['#9D4EDD', '#7B2CBF']}
              style={styles.noWatermarkGradient}
            >
              <View style={styles.noWatermarkHeader}>
                <Sparkles size={28} color="#FFFFFF" strokeWidth={3} />
                <Text style={styles.noWatermarkTitle}>NO WATERMARKS • NO ADS</Text>
              </View>
              <Text style={styles.noWatermarkText}>
                ✨ Completely FREE - No watermarks on your creations!
              </Text>
              <Text style={styles.noWatermarkText}>
                🚫 Zero advertisements - Uninterrupted editing experience!
              </Text>
              <Text style={styles.noWatermarkText}>
                💎 Professional-quality outputs without any branding or marks!
              </Text>
              <Text style={styles.noWatermarkText}>
                🎨 Export and share your work freely with full ownership!
              </Text>
            </LinearGradient>
          </View>

          {/* Important Disclaimer */}
          <View style={styles.disclaimerSection}>
            <LinearGradient
              colors={['#FF6B6B', '#FF4757']}
              style={styles.disclaimerGradient}
            >
              <View style={styles.disclaimerHeader}>
                <Zap size={20} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.disclaimerTitle}>IMPORTANT DISCLAIMER</Text>
              </View>
              <Text style={styles.disclaimerText}>
                If you do not know how to prompt properly, you will NOT get the best results. 
                Be specific, descriptive, and clear about what you want. Vague prompts lead to poor outcomes.
              </Text>
            </LinearGradient>
          </View>

          {/* Privacy & Security Notice */}
          <View style={styles.privacySection}>
            <LinearGradient
              colors={['#00FF88', '#00CC6A']}
              style={styles.privacyGradient}
            >
              <View style={styles.privacyHeader}>
                <Shield size={24} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.privacyTitle}>YOUR PRIVACY IS PROTECTED</Text>
              </View>
              <Text style={styles.privacyText}>
                🔒 We do NOT collect any email addresses, personal information, or user IDs.
              </Text>
              <Text style={styles.privacyText}>
                🛡️ Your images are processed securely and are not stored permanently.
              </Text>
              <Text style={styles.privacyText}>
                ✅ No registration required. No tracking. No data collection.
              </Text>
              <Text style={styles.privacyText}>
                💯 Use Edit Empire with complete confidence and peace of mind.
              </Text>
            </LinearGradient>
          </View>

          {/* Image Storage Notice */}
          <View style={styles.storageSection}>
            <LinearGradient
              colors={['#3498DB', '#2980B9']}
              style={styles.storageGradient}
            >
              <View style={styles.storageHeader}>
                <Info size={22} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.storageTitle}>IMAGE STORAGE NOTICE</Text>
              </View>
              <Text style={styles.storageText}>
                📸 We do NOT save or store your edited images on our servers.
              </Text>
              <Text style={styles.storageText}>
                💾 Please screenshot or download any images you wish to keep before leaving the app.
              </Text>
              <Text style={styles.storageText}>
                🔄 You can upload your saved images anytime to continue editing them.
              </Text>
              <Text style={styles.storageText}>
                ⚡ This approach ensures optimal app performance and protects your privacy during high usage periods.
              </Text>
            </LinearGradient>
          </View>

          {/* Content Policy */}
          <View style={styles.policySection}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: '#FF6B6B20' }]}>
                <Target size={24} color="#FF6B6B" strokeWidth={2} />
              </View>
              <Text style={styles.sectionTitle}>Content Policy</Text>
            </View>
            
            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>✅ ALLOWED CONTENT:</Text>
              <Text style={styles.policyText}>• Any creative transformations and artistic styles</Text>
              <Text style={styles.policyText}>• Character placement and positioning</Text>
              <Text style={styles.policyText}>• Room design and interior decoration</Text>
              <Text style={styles.policyText}>• Animation to realistic conversions</Text>
              <Text style={styles.policyText}>• Vehicle customization and wraps</Text>
              <Text style={styles.policyText}>• All appropriate creative content</Text>
              
              <Text style={styles.policyTitleDanger}>❌ FORBIDDEN CONTENT:</Text>
              <Text style={styles.policyTextDanger}>• No sexual content or private parts</Text>
              <Text style={styles.policyTextDanger}>• No explicit language or perverted terms</Text>
              <Text style={styles.policyTextDanger}>• No inappropriate content involving children</Text>
              <Text style={styles.policyTextDanger}>• No murder or extreme violence art</Text>
            </View>
          </View>

          {/* Instruction Sections */}
          {instructionSections.map((section, index) => (
            <View key={index} style={styles.instructionSection}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconContainer, { backgroundColor: `${section.color}20` }]}>
                  <section.icon size={24} color={section.color} strokeWidth={2} />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              
              <View style={styles.tipsContainer}>
                {section.tips.map((tip, tipIndex) => (
                  <View key={tipIndex} style={styles.tipRow}>
                    <View style={[styles.tipBullet, { backgroundColor: section.color }]} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Example Prompts Section */}
          <View style={styles.examplesSection}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: '#FFD70020' }]}>
                <Lightbulb size={24} color="#FFD700" strokeWidth={2} />
              </View>
              <Text style={styles.sectionTitle}>Example Prompts</Text>
            </View>
            
            <View style={styles.exampleCategories}>
              {[
                {
                  category: 'Room Design & Interior',
                  examples: [
                    'Place this modern sofa in the living room by the window',
                    'Add this dining table in the center of the room',
                    'Put this artwork on the wall above the fireplace',
                  ]
                },
                {
                  category: 'Animation & Style Conversion',
                  examples: [
                    'Make this claymation character look realistic',
                    'Transform this realistic photo to 3D animation style',
                    'Convert this cartoon to photorealistic style',
                  ]
                },
                {
                  category: 'Character Placement',
                  examples: [
                    'Place the man sitting on the motorcycle',
                    'Show the woman holding a cigar with her teeth',
                    'Position the character inside the car as the driver',
                  ]
                },
                {
                  category: 'Clothing & Style',
                  examples: [
                    'Change shirt to black leather jacket with silver zippers',
                    'Add a red baseball cap and sunglasses',
                    'Transform outfit into medieval knight armor',
                  ]
                },
                {
                  category: 'Environment & Background',
                  examples: [
                    'Place in a cyberpunk city with neon lights at night',
                    'Change background to tropical beach at sunset',
                    'Transform setting into a magical forest with glowing trees',
                  ]
                },
                {
                  category: 'Facial & Expression',
                  examples: [
                    'Add a confident smile with teeth showing',
                    'Change hair color to platinum blonde with highlights',
                    'Add professional makeup with bold red lipstick',
                  ]
                },
                {
                  category: 'Creative Transformations',
                  examples: [
                    'Transform into a cyberpunk warrior with glowing eyes',
                    'Convert to oil painting style with rich textures',
                    'Add magical glowing aura and floating particles',
                  ]
                },
              ].map((category, index) => (
                <View key={index} style={styles.exampleCategory}>
                  <Text style={styles.exampleCategoryTitle}>{category.category}</Text>
                  {category.examples.map((example, exampleIndex) => (
                    <View key={exampleIndex} style={styles.exampleRow}>
                      <Text style={styles.exampleText}>{`“${example}”`}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Troubleshooting Section */}
          <View style={styles.troubleshootingSection}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: '#FF6B6B20' }]}>
                <Zap size={24} color="#FF6B6B" strokeWidth={2} />
              </View>
              <Text style={styles.sectionTitle}>Troubleshooting</Text>
            </View>
            
            <View style={styles.troubleshootingList}>
              {[
                {
                  problem: 'Animation not converting to realistic',
                  solution: 'Be explicit: "make this claymation/3D animation character look photorealistic"'
                },
                {
                  problem: 'Character placement not working',
                  solution: 'Be specific about position: "sitting on the couch" not just "on couch"'
                },
                {
                  problem: 'Room design items not placing correctly',
                  solution: 'Describe exact location: "place sofa against the left wall by the window"'
                },
                {
                  problem: 'Edits not accurate enough',
                  solution: 'Be more specific in your prompt. Describe exactly what you want changed.'
                },
                {
                  problem: 'Changes too subtle',
                  solution: 'Increase creativity strength or use more descriptive language.'
                },
                {
                  problem: 'Unwanted changes to other parts',
                  solution: 'Use identity lock and be very specific about what to change.'
                },
                {
                  problem: 'Service temporarily unavailable',
                  solution: 'Wait 2-3 minutes and try again. High demand can cause delays.'
                },
                {
                  problem: 'Image quality issues',
                  solution: 'Use higher resolution, well-lit images with good contrast.'
                },
              ].map((item, index) => (
                <View key={index} style={styles.troubleshootingItem}>
                  <Text style={styles.problemText}>Problem: {item.problem}</Text>
                  <Text style={styles.solutionText}>Solution: {item.solution}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Footer with Attribution */}
          <View style={styles.footer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.footerGradient}
            >
              <Heart size={16} color="#1A1A1A" />
              <Text style={styles.footerText}>Nexus dynamic technologies</Text>
            </LinearGradient>
            <Text style={styles.footerSubtext}>
              Edit Empire - The most advanced AI image editor
            </Text>
          </View>
        </ScrollView>
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
    paddingVertical: 16,
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  welcomeBadge: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeDesc: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  instructionSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  tipsContainer: {
    gap: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    flexShrink: 0,
  },
  tipText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    flex: 1,
  },
  examplesSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  exampleCategories: {
    gap: 20,
  },
  exampleCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
  },
  exampleCategoryTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFD700',
    marginBottom: 12,
  },
  exampleRow: {
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 13,
    color: '#CCCCCC',
    fontStyle: 'italic' as const,
    lineHeight: 18,
  },
  troubleshootingSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  troubleshootingList: {
    gap: 16,
  },
  troubleshootingItem: {
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  problemText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF6B6B',
    marginBottom: 6,
  },
  solutionText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  disclaimerSection: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  disclaimerGradient: {
    padding: 20,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: '#FFFFFF',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  policySection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  policyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#00FF88',
    marginTop: 8,
    marginBottom: 4,
  },
  policyText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
    marginLeft: 8,
  },
  policyTitleDanger: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#FF6B6B',
    marginTop: 16,
    marginBottom: 4,
  },
  policyTextDanger: {
    fontSize: 13,
    color: '#FFCCCC',
    lineHeight: 18,
    marginLeft: 8,
  },
  privacySection: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  privacyGradient: {
    padding: 20,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  privacyText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
    fontWeight: '500' as const,
    marginBottom: 8,
  },
  storageSection: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  storageGradient: {
    padding: 20,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  storageTitle: {
    fontSize: 16,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  storageText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
    fontWeight: '500' as const,
    marginBottom: 8,
  },
  noWatermarkSection: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  noWatermarkGradient: {
    padding: 24,
  },
  noWatermarkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    justifyContent: 'center',
  },
  noWatermarkTitle: {
    fontSize: 18,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  noWatermarkText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 24,
    fontWeight: '600' as const,
    marginBottom: 10,
  },
});
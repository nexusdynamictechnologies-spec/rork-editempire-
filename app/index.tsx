import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload, Sparkles, Zap, Palette, Film, BookOpen, Heart, X, Mail } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

import { router } from 'expo-router';
import { useEditor } from '@/contexts/EditorContext';
import { Image as ExpoImage } from 'expo-image';



export default function HomeScreen() {
  const { setSourceImage, recentProjects, loadOriginalImage, savedImages, loadSavedImage, addReferenceImage, resizeImageIfNeeded } = useEditor();
  const [loading, setLoading] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ uri: string; date: string; isEdited: boolean } | null>(null);


  const processAndNavigate = async (uri: string) => {
    setLoading(true);
    try {
      console.log('🔄 Auto-resizing image for optimal performance...');
      const result = await resizeImageIfNeeded(uri, 2048);
      if (result.wasResized) {
        console.log(`✅ Image auto-resized from ${result.originalSize.width}x${result.originalSize.height} to ${result.newSize?.width}x${result.newSize?.height}`);
      }
      setSourceImage(result.uri);
      setTimeout(() => {
        setLoading(false);
        router.push('/editor');
      }, 300);
    } catch (error) {
      console.error('Failed to process image:', error);
      setSourceImage(uri);
      setTimeout(() => {
        setLoading(false);
        router.push('/editor');
      }, 300);
    }
  };



  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn('Haptics failed:', e));
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: undefined,
        quality: 0.8,
        allowsMultipleSelection: true,
        exif: false,
        base64: true,
      } as ImagePicker.ImagePickerOptions);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const first = result.assets[0] as ImagePicker.ImagePickerAsset;
        const firstMime = (first as any)?.mimeType || 'image/jpeg';
        const firstDataUri = first.base64 ? `data:${firstMime};base64,${first.base64}` : first.uri;
        
        if (result.assets.length > 1) {
          setLoading(true);
          try {
            const resizedFirst = await resizeImageIfNeeded(firstDataUri, 2048);
            setSourceImage(resizedFirst.uri);
            
            for (let i = 1; i < result.assets.length; i++) {
              const a = result.assets[i] as ImagePicker.ImagePickerAsset;
              const mime = (a as any)?.mimeType || 'image/jpeg';
              const dataUri = a.base64 ? `data:${mime};base64,${a.base64}` : a.uri;
              await addReferenceImage(dataUri, true).catch(e => console.warn(`Failed to add reference image ${i + 1}:`, e));
            }
            
            setTimeout(() => {
              setLoading(false);
              router.push('/editor');
            }, 300);
          } catch (error) {
            console.error('Error processing multiple images:', error);
            setLoading(false);
          }
        } else {
          await processAndNavigate(firstDataUri);
        }
      }
    } catch (error) {
      console.error('pickImage error:', error);
      setLoading(false);
    }
  };

  const features = [
    { icon: Sparkles, title: 'Precise Editing', desc: 'Edit only what you specify' },
    { icon: Zap, title: 'Smart Preservation', desc: 'Keeps original image intact' },
    { icon: Palette, title: 'Natural Changes', desc: 'Seamless, realistic edits' },
    { icon: Film, title: 'Simple Prompts', desc: 'Just say what to change' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.logoContainer}>
                <ExpoImage
                  source={{ uri: 'https://r2-pub.rork.com/generated-images/a4c03717-83d6-40cb-ab3c-b165d7f1db43.png' }}
                  style={styles.logoImage}
                  contentFit="contain"
                />
              </View>
            </View>
            
            {/* App Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsHeader}>What Edit Empire Can Do:</Text>
              <View style={styles.instructionsList}>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Replace any vehicle with your uploaded image in exact position</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Change clothing, accessories, hair color, and makeup</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Modify backgrounds, lighting, and atmosphere</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Add or remove objects with natural precision</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Smart understanding of any prompt - just describe what you want</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Generate multiple character poses - front view, side profiles, back view, and action poses with preserved backgrounds</Text>
                </View>
                <View style={styles.instructionItem}>
                  <Text style={styles.instructionBullet}>•</Text>
                  <Text style={styles.instructionText}>Try different hairstyles - visualize any haircut or hair color on your character instantly</Text>
                </View>
              </View>
            </View>
            

          </View>

          {/* Main Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickImage}
              disabled={loading}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#1A1A1A" />
                ) : (
                  <>
                    <Upload size={32} color="#1A1A1A" strokeWidth={2.5} />
                    <Text style={styles.uploadText}>Upload Image</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>


          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <View key={feature.title} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <feature.icon size={24} color="#FFD700" strokeWidth={2} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>

          {/* Recent Projects */}
          {recentProjects.length > 0 && (
            <View style={styles.recentSection}>
              <Text style={styles.sectionTitle}>Recent Projects</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentScroll}
              >
                {recentProjects.map((project, index) => (
                  <TouchableOpacity
                    key={project.id}
                    style={styles.recentCard}
                    onPress={async () => {
                      setLoading(true);
                      try {
                        const originalImage = await loadOriginalImage(project);
                        if (originalImage) {
                          setSourceImage(originalImage);
                          router.push('/editor');
                        } else {
                          // Fallback to thumbnail if original image is not available
                          setSourceImage(project.thumbnail);
                          router.push('/editor');
                        }
                      } catch (error) {
                        console.error('Failed to load project:', error);
                        // Fallback to thumbnail
                        setSourceImage(project.thumbnail);
                        router.push('/editor');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    <ExpoImage
                      source={{ uri: project.thumbnail }}
                      style={styles.recentImage}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.recentOverlay}
                    >
                      <Text style={styles.recentDate}>
                        {new Date(project.date).toLocaleDateString()}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Saved Images */}
          {savedImages.length > 0 && (
            <View style={styles.recentSection}>
              <Text style={styles.sectionTitle}>Saved Images ({savedImages.length})</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentScroll}
              >
                {savedImages.slice(0, 10).map((savedImage) => (
                  <TouchableOpacity
                    key={savedImage.id}
                    style={styles.recentCard}
                    onPress={async () => {
                      try {
                        if (Platform.OS !== 'web') {
                          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn('Haptics error:', e));
                        }
                        
                        const imageUri = await loadSavedImage(savedImage.id).catch(err => {
                          console.error('Failed to load saved image:', err);
                          return savedImage.thumbnail || savedImage.imageUri;
                        });
                        
                        setEnlargedImage({
                          uri: imageUri || savedImage.thumbnail || savedImage.imageUri,
                          date: savedImage.date,
                          isEdited: savedImage.isEdited
                        });
                      } catch (error) {
                        console.error('Error opening saved image:', error);
                      }
                    }}
                  >
                    <ExpoImage
                      source={{ uri: savedImage.thumbnail || savedImage.imageUri }}
                      style={styles.recentImage}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.recentOverlay}
                    >
                      <View style={styles.savedImageOverlayContent}>
                        {savedImage.isEdited && (
                          <View style={styles.editedIndicator}>
                            <Sparkles size={12} color="#FFD700" />
                          </View>
                        )}
                        <Text style={styles.recentDate}>
                          {new Date(savedImage.date).toLocaleDateString()}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Instructions Button */}
          <View style={styles.instructionsSection}>
            <TouchableOpacity
              style={styles.instructionsButton}
              onPress={() => router.push('/instructions')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.1)']}
                style={styles.instructionsGradient}
              >
                <BookOpen size={24} color="#FFD700" strokeWidth={2} />
                <View style={styles.instructionsTextContainer}>
                  <Text style={styles.instructionsTitle}>How to Use Edit Empire</Text>
                  <Text style={styles.instructionsSubtitle}>Get the best results with our complete guide</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Examples Section */}
          <View style={styles.instructionsSection}>
            <TouchableOpacity
              style={styles.instructionsButton}
              onPress={() => router.push('/camera-angles')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(99, 102, 241, 0.15)', 'rgba(139, 92, 246, 0.15)']}
                style={styles.instructionsGradient}
              >
                <Film size={24} color="#9B59B6" strokeWidth={2} />
                <View style={styles.instructionsTextContainer}>
                  <Text style={styles.instructionsTitle}>Camera Angles Library</Text>
                  <Text style={styles.instructionsSubtitle}>Browse framing, lens, perspective, and movement</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.examplesSection}>
            <Text style={styles.sectionTitle}>What You Can Edit</Text>
            <View style={styles.exampleCards}>
              {[
                { prompt: "Change shirt to red leather jacket", category: "Clothing" },
                { prompt: "Add sunglasses and a hat", category: "Accessories" },
                { prompt: "Change hair color to blonde", category: "Hair" },
                { prompt: "Add professional makeup", category: "Beauty" },
                { prompt: "Change background to beach scene", category: "Background" },
                { prompt: "Add warm sunset lighting", category: "Lighting" },
              ].map((example) => (
                <View key={example.category} style={styles.exampleCard}>
                  <View style={styles.exampleBadge}>
                    <Text style={styles.exampleStyle}>{example.category}</Text>
                  </View>
                  <Text style={styles.examplePrompt}>&ldquo;{example.prompt}&rdquo;</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Button */}
          <View style={styles.contactSection}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(e => console.warn('Haptics failed:', e));
                }
                router.push('/contact');
              }}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(99, 102, 241, 0.15)', 'rgba(139, 92, 246, 0.15)']}
                style={styles.contactGradient}
              >
                <Mail size={24} color="#6366F1" strokeWidth={2} />
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactTitle}>Contact Information</Text>
                  <Text style={styles.contactSubtitle}>Get in touch with our team</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Footer with Attribution */}
          <View style={styles.footer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.footerGradient}
            >
              <Heart size={16} color="#1A1A1A" />
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>Nexus dynamic technologies</Text>
                <Text style={styles.footerCredit}>Dwayne</Text>
              </View>
            </LinearGradient>
            <Text style={styles.footerSubtext}>
              Edit Empire - Professional AI Image Editor
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Enlarged Image Modal */}
      <Modal
        visible={!!enlargedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setEnlargedImage(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafeArea}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setEnlargedImage(null)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                  style={styles.modalCloseGradient}
                >
                  <X size={24} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalEditButton}
                onPress={async () => {
                  if (enlargedImage) {
                    setLoading(true);
                    setSourceImage(enlargedImage.uri);
                    setEnlargedImage(null);
                    setTimeout(() => {
                      setLoading(false);
                      router.push('/editor');
                    }, 300);
                  }
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.modalEditGradient}
                >
                  <Text style={styles.modalEditText}>Edit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Image */}
            <View style={styles.modalImageContainer}>
              {enlargedImage && (
                <ExpoImage
                  source={{ uri: enlargedImage.uri }}
                  style={styles.modalImage}
                  contentFit="contain"
                  transition={200}
                />
              )}
            </View>

            {/* Footer Info */}
            <View style={styles.modalFooter}>
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
                style={styles.modalFooterGradient}
              >
                <View style={styles.modalInfoContainer}>
                  {enlargedImage?.isEdited && (
                    <View style={styles.modalEditedBadge}>
                      <Sparkles size={16} color="#FFD700" strokeWidth={2} />
                      <Text style={styles.modalEditedText}>AI Edited</Text>
                    </View>
                  )}
                  <Text style={styles.modalDateText}>
                    {enlargedImage ? new Date(enlargedImage.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </SafeAreaView>
        </View>
      </Modal>


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
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    width: '100%',
  },
  logoImage: {
    width: 280,
    height: 200,
  },
  logoContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  diamondTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 80,
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  logoIconImage: {
    width: 120,
    height: 120,
    tintColor: '#FFD700',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    letterSpacing: 4,
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  logoEmoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: '900' as const,
    color: '#FFFFFF',
    letterSpacing: -1.2,
    textShadowColor: 'rgba(99, 102, 241, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  instructionsHeader: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  instructionBullet: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '700' as const,
    marginTop: 2,
  },
  instructionText: {
    fontSize: 14,
    color: '#CCCCCC',
    flex: 1,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  subscriptionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  planUsage: {
    fontSize: 14,
    color: '#999',
  },
  upgradeButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  actionButtonsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  uploadButton: {
    width: '100%',
  },

  actionGradient: {
    height: 140,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  uploadText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#1A1A1A',
    opacity: 0.7,
    marginTop: 4,
  },

  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featureCard: {
    width: '47%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    margin: 5,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  recentScroll: {
    paddingHorizontal: 20,
  },
  recentCard: {
    width: 120,
    height: 120,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  recentImage: {
    width: '100%',
    height: '100%',
  },
  recentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    justifyContent: 'flex-end',
    padding: 8,
  },
  recentDate: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  examplesSection: {
    paddingHorizontal: 20,
  },
  exampleCards: {
    gap: 12,
  },
  exampleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  exampleBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  exampleStyle: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#FFD700',
    textTransform: 'uppercase' as const,
  },
  examplePrompt: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'italic' as const,
  },
  savedImageOverlayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  editedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  instructionsButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  instructionsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 16,
  },
  instructionsTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  instructionsSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  contactButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  contactGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderRadius: 16,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 13,
    color: '#999',
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
  footerTextContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  footerCredit: {
    fontSize: 8,
    fontWeight: '400' as const,
    color: '#1A1A1A',
    opacity: 0.6,
    marginTop: 2,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalSafeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,
  },
  modalCloseButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalCloseGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEditButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalEditGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEditText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalImage: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 1,
    borderRadius: 16,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalFooterGradient: {
    borderRadius: 16,
    padding: 16,
  },
  modalInfoContainer: {
    alignItems: 'center',
  },
  modalEditedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  modalEditedText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFD700',
    marginLeft: 6,
  },
  modalDateText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
});
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Brain,
  Lightbulb,
  Wand2,
  Eye,
  Sparkles,
  Camera,
  Upload,
  Zap,
  Target,
  Layers,
  Palette,
  Settings,
  Heart,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEditor } from '@/contexts/EditorContext';
import { Image as ExpoImage } from 'expo-image';

interface AnalysisResult {
  description: string;
  complexity: 'simple' | 'moderate' | 'complex' | 'very_complex';
  suggestions: string[];
  tips: string[];
  categories: string[];
}

export default function SmartHelpScreen() {
  const { setSourceImage } = useEditor();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        allowsMultipleSelection: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setAnalysis(null);
        setSelectedSuggestion(null);
        if (Platform.OS !== 'web') {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setAnalysis(null);
        setSelectedSuggestion(null);
        if (Platform.OS !== 'web') {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const convertImageToBase64 = useCallback(async (imageUri: string): Promise<string> => {
    if (!imageUri || !imageUri.trim()) {
      throw new Error('Image URI is required');
    }
    
    const sanitizedUri = imageUri.trim();
    if (sanitizedUri.startsWith('data:')) {
      return sanitizedUri.split(',')[1] || '';
    }
    
    const response = await fetch(sanitizedUri);
    const blob = await response.blob();
    
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Part = result.split(',')[1];
        resolve(base64Part || '');
      };
      reader.onerror = () => reject(new Error('Failed to convert image'));
      reader.readAsDataURL(blob);
    });
  }, []);

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    try {
      const base64Image = await convertImageToBase64(selectedImage);
      
      const analysisPrompt = `Analyze this image for advanced AI image editing with face consistency. Provide:

1. DETAILED IMAGE ANALYSIS:
   - Describe subjects, objects, composition, and setting
   - Identify if there are faces/people and their characteristics
   - Note lighting conditions, camera angle, and image quality
   - Assess background complexity and potential editing challenges

2. COMPLEXITY ASSESSMENT (simple/moderate/complex/very_complex):
   - Face consistency requirements (if faces present)
   - Number of subjects and objects
   - Background and lighting complexity
   - Detail preservation needs
   - Potential identity drift risks

3. INTELLIGENT EDITING SUGGESTIONS (10-12 specific suggestions):
   - Face-aware transformations that maintain identity
   - Style transfers that preserve facial features
   - Background changes with proper lighting integration
   - Clothing/accessory modifications
   - Artistic style applications
   - Environmental transformations
   - Character/fantasy transformations
   - Professional enhancement suggestions
   - Creative composite ideas
   - Advanced editing techniques

4. FACE CONSISTENCY & PRO TIPS (6-8 tips):
   - Specific advice for maintaining facial identity
   - Lighting and shadow preservation techniques
   - Best practices for this image type
   - Prompt engineering suggestions
   - Reference image recommendations
   - Multi-step editing approaches
   - Quality preservation methods

5. IMAGE CATEGORIES:
   - Primary category (portrait, landscape, object, etc.)
   - Secondary categories
   - Editing difficulty tags

Format as JSON: {"description": "...", "complexity": "...", "suggestions": [...], "tips": [...], "categories": [...]}

Focus on maintaining subject consistency while enabling creative transformations. Prioritize face preservation for portraits.`;

      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: analysisPrompt },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status}`);
      }

      const result = await response.json();
      
      try {
        const analysisData = JSON.parse(result.completion);
        setAnalysis(analysisData);
      } catch {
        // Fallback if JSON parsing fails
        const fallbackAnalysis: AnalysisResult = {
          description: result.completion.substring(0, 200) + '...',
          complexity: 'moderate',
          suggestions: [
            'Transform into fantasy character while maintaining facial identity',
            'Change background to cyberpunk city with consistent lighting',
            'Add magical glowing elements around the subject',
            'Convert to oil painting style preserving facial features',
            'Add futuristic technology while keeping person recognizable',
            'Change lighting to dramatic sunset with natural shadows',
            'Transform into anime style maintaining face consistency',
            'Add steampunk elements and accessories',
            'Create professional headshot with enhanced lighting',
            'Transform into historical period costume',
            'Add fantasy creature elements (ears, wings, etc.)',
            'Create movie poster style composition'
          ],
          tips: [
            'Use Identity Lock for face consistency in portraits',
            'Be specific about what should remain unchanged',
            'Mention lighting direction and mood preferences',
            'Specify artistic style while preserving realism',
            'Use reference images for complex style transfers',
            'Break complex edits into multiple steps',
            'Enable facial expression lock for consistent emotions'
          ],
          categories: ['general', 'portrait']
        };
        setAnalysis(fallbackAnalysis);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert(
        'Analysis Failed',
        'Failed to analyze the image. Please check your internet connection and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const useImageForEditing = () => {
    if (!selectedImage) return;
    
    setSourceImage(selectedImage);
    router.push('/editor');
  };



  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return '#00FF88';
      case 'moderate': return '#FFD700';
      case 'complex': return '#FF6B6B';
      case 'very_complex': return '#9D4EDD';
      default: return '#666';
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'simple': return Zap;
      case 'moderate': return Target;
      case 'complex': return Layers;
      case 'very_complex': return Settings;
      default: return Brain;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1A', '#0A0A0A']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Smart Help</Text>
          <Text style={styles.headerSubtitle}>AI-Powered Editing Assistant</Text>
        </View>
        
        <View style={styles.headerRight} />
      </SafeAreaView>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>📸 Upload Your Image</Text>
          <Text style={styles.sectionSubtitle}>
            Get AI-powered analysis and smart editing suggestions that maintain face consistency and image quality
          </Text>
          
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Upload size={24} color="#FFD700" />
              <Text style={styles.uploadButtonText}>Choose Image</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
              <Camera size={24} color="#FFD700" />
              <Text style={styles.uploadButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Image */}
        {selectedImage && (
          <View style={styles.imageSection}>
            <ExpoImage
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
              contentFit="cover"
            />
            
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.analyzeButton}
                onPress={analyzeImage}
                disabled={isAnalyzing}
              >
                <LinearGradient
                  colors={['#9D4EDD', '#7B2CBF']}
                  style={styles.analyzeGradient}
                >
                  {isAnalyzing ? (
                    <>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                      <Text style={styles.analyzeText}>Analyzing...</Text>
                    </>
                  ) : (
                    <>
                      <Brain size={20} color="#FFFFFF" />
                      <Text style={styles.analyzeText}>Analyze Image</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.useImageButton}
                onPress={useImageForEditing}
              >
                <Wand2 size={18} color="#FFD700" />
                <Text style={styles.useImageText}>Use for Editing</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Analysis Results */}
        {analysis && (
          <View style={styles.analysisSection}>
            {/* Image Description */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <Eye size={20} color="#00FF88" />
                <Text style={styles.cardTitle}>Image Analysis</Text>
              </View>
              <Text style={styles.description}>{analysis.description}</Text>
              
              {/* Complexity Indicator */}
              <View style={styles.complexityContainer}>
                <View style={[styles.complexityBadge, { backgroundColor: `${getComplexityColor(analysis.complexity)}20`, borderColor: getComplexityColor(analysis.complexity) }]}>
                  {React.createElement(getComplexityIcon(analysis.complexity), { size: 16, color: getComplexityColor(analysis.complexity) })}
                  <Text style={[styles.complexityText, { color: getComplexityColor(analysis.complexity) }]}>
                    {analysis.complexity.replace('_', ' ').toUpperCase()} COMPLEXITY
                  </Text>
                </View>
              </View>
            </View>

            {/* Categories */}
            {analysis.categories && analysis.categories.length > 0 && (
              <View style={styles.analysisCard}>
                <View style={styles.cardHeader}>
                  <Palette size={20} color="#FFD700" />
                  <Text style={styles.cardTitle}>Image Categories</Text>
                </View>
                <View style={styles.categoriesContainer}>
                  {analysis.categories.map((category, index) => (
                    <View key={`category-${category}-${index}`} style={styles.categoryChip}>
                      <Text style={styles.categoryText}>{category}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Editing Suggestions */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <Lightbulb size={20} color="#FF6B6B" />
                <Text style={styles.cardTitle}>Smart Editing Suggestions</Text>
              </View>
              <Text style={styles.cardSubtitle}>
                Tap any suggestion to start editing with that prompt
              </Text>
              
              <View style={styles.suggestionsContainer}>
                {analysis.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={`suggestion-${suggestion.substring(0, 20)}-${index}`}
                    style={[
                      styles.suggestionChip,
                      selectedSuggestion === suggestion && styles.suggestionChipSelected
                    ]}
                    onPress={() => {
                      if (suggestion && suggestion.trim()) {
                        setSelectedSuggestion(suggestion);
                        setSourceImage(selectedImage!);
                        router.push({
                          pathname: '/editor',
                          params: { prompt: suggestion.trim() }
                        });
                      }
                    }}
                  >
                    <Sparkles size={14} color="#FF6B6B" />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Pro Tips */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <Target size={20} color="#9D4EDD" />
                <Text style={styles.cardTitle}>Pro Tips for This Image</Text>
              </View>
              
              <View style={styles.tipsContainer}>
                {analysis.tips.map((tip, index) => (
                  <View key={`tip-${tip.substring(0, 20)}-${index}`} style={styles.tipItem}>
                    <View style={styles.tipBullet} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* General Tips */}
        <View style={styles.generalTipsSection}>
          <Text style={styles.sectionTitle}>💡 General Complex Editing Tips</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipCardTitle}>🎯 For Complex Scenes</Text>
            <Text style={styles.tipCardText}>
              Break down complex edits into multiple steps. Start with major changes, then refine details.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipCardTitle}>🔄 Iterative Approach</Text>
            <Text style={styles.tipCardText}>
              Use cumulative editing - each edit builds on the previous one for complex transformations.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipCardTitle}>📝 Detailed Prompts</Text>
            <Text style={styles.tipCardText}>
              Be specific about lighting, style, mood, and what should remain unchanged.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipCardTitle}>🖼️ Reference Images</Text>
            <Text style={styles.tipCardText}>
              Use reference images for complex style transfers or when adding specific elements.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.footerGradient}
          >
            <Heart size={12} color="#1A1A1A" />
            <Text style={styles.footerText}>Nexus dynamic technologies</Text>
          </LinearGradient>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9D4EDD',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  uploadSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    lineHeight: 20,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFD700',
  },
  imageSection: {
    marginBottom: 24,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  analyzeButton: {
    flex: 2,
  },
  analyzeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  analyzeText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  useImageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 6,
  },
  useImageText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FFD700',
  },
  analysisSection: {
    gap: 16,
    marginBottom: 24,
  },
  analysisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    fontStyle: 'italic' as const,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 12,
  },
  complexityContainer: {
    alignItems: 'flex-start',
  },
  complexityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  complexityText: {
    fontSize: 11,
    fontWeight: '700' as const,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  categoryText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '500' as const,
  },
  suggestionsContainer: {
    gap: 8,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  suggestionChipSelected: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderColor: '#FF6B6B',
  },
  suggestionText: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: '500' as const,
    flex: 1,
  },
  tipsContainer: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9D4EDD',
    marginTop: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
    flex: 1,
  },
  generalTipsSection: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: 'rgba(157, 78, 221, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(157, 78, 221, 0.2)',
  },
  tipCardTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#9D4EDD',
    marginBottom: 8,
  },
  tipCardText: {
    fontSize: 13,
    color: '#CCCCCC',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  spacer: {
    height: 20,
  },
});
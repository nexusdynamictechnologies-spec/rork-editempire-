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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Maximize2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { imageSizes, imageSizeCategories, getImageSizesByCategory, type ImageSize } from '@/constants/imageSizes';

interface ResizeModalProps {
  visible: boolean;
  onClose: () => void;
  onResize: (width: number, height: number) => Promise<void>;
}

export default function ResizeModal({ visible, onClose, onResize }: ResizeModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Instagram');
  const [isResizing, setIsResizing] = useState(false);

  const handleSizeSelect = async (size: ImageSize) => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      setIsResizing(true);
      await onResize(size.width, size.height);
      
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      onClose();
    } catch (error) {
      console.error('Resize error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to resize image';
      Alert.alert('Resize Error', errorMsg);
    } finally {
      setIsResizing(false);
    }
  };

  const categorizedSizes = getImageSizesByCategory(selectedCategory);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={styles.modalGradient}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Maximize2 size={24} color="#FFD700" strokeWidth={2.5} />
                <Text style={styles.headerTitle}>Resize Image</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <X size={24} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
              style={styles.categoriesContainer}
            >
              {imageSizeCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category && styles.categoryTabActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryTabText,
                      selectedCategory === category && styles.categoryTabTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Size List */}
            <ScrollView
              style={styles.sizesContainer}
              contentContainerStyle={styles.sizesScroll}
              showsVerticalScrollIndicator={true}
            >
              {categorizedSizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={styles.sizeCard}
                  onPress={() => handleSizeSelect(size)}
                  activeOpacity={0.8}
                  disabled={isResizing}
                >
                  <LinearGradient
                    colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.05)']}
                    style={styles.sizeCardGradient}
                  >
                    <View style={styles.sizeCardContent}>
                      <View style={styles.sizeCardLeft}>
                        <Text style={styles.sizeName}>{size.name}</Text>
                        <Text style={styles.sizeDescription}>{size.description}</Text>
                      </View>
                      <View style={styles.sizeCardRight}>
                        <Text style={styles.sizeDimensions}>
                          {size.width} × {size.height}
                        </Text>
                        <Text style={styles.sizeRatio}>
                          {(size.width / size.height).toFixed(2)}:1
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Loading Overlay */}
            {isResizing && (
              <View style={styles.loadingOverlay}>
                <View style={styles.loadingCard}>
                  <ActivityIndicator size="large" color="#FFD700" />
                  <Text style={styles.loadingText}>Resizing image...</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalGradient: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    maxHeight: 60,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryTabActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999',
  },
  categoryTabTextActive: {
    color: '#FFD700',
  },
  sizesContainer: {
    flex: 1,
  },
  sizesScroll: {
    padding: 20,
    gap: 12,
  },
  sizeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  sizeCardGradient: {
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 16,
  },
  sizeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sizeCardLeft: {
    flex: 1,
    gap: 4,
  },
  sizeName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  sizeDescription: {
    fontSize: 13,
    color: '#999',
  },
  sizeCardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sizeDimensions: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FFD700',
  },
  sizeRatio: {
    fontSize: 12,
    color: '#666',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});

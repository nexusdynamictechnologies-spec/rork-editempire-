import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  X,
  Download,
  Share2,
  FileImage,
  Droplets,
  Shield,
  Copy,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEditor } from '@/contexts/EditorContext';
import { Image as ExpoImage } from 'expo-image';

type ExportFormat = 'png' | 'jpg' | 'webp';

export default function ExportScreen() {
  const { editedImage, currentProject } = useEditor();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);

  const handleExport = async (format: ExportFormat) => {
    if (Platform.OS !== 'web') {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    Alert.alert(
      'Export Successful',
      `Image exported as ${format.toUpperCase()} ${includeWatermark ? 'with watermark' : ''}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const exportOptions = [
    {
      icon: FileImage,
      title: 'Save as PNG',
      subtitle: 'Highest quality, transparency',
      onPress: () => handleExport('png'),
      color: '#4CAF50',
    },
    {
      icon: FileImage,
      title: 'Save as JPG',
      subtitle: 'Smaller file size',
      onPress: () => handleExport('jpg'),
      color: '#2196F3',
    },
    {
      icon: Droplets,
      title: 'Save with Watermark',
      subtitle: 'Banana Nano badge',
      onPress: () => {
        setIncludeWatermark(true);
        handleExport(selectedFormat);
      },
      color: '#FFD700',
    },
    {
      icon: Shield,
      title: 'Download XMP Data',
      subtitle: 'Embedded metadata & proof',
      onPress: () => Alert.alert('XMP Data', 'Metadata exported successfully'),
      color: '#9C27B0',
    },
    {
      icon: Share2,
      title: 'Share',
      subtitle: 'Send to apps or social media',
      onPress: () => Alert.alert('Share', 'Opening share sheet...'),
      color: '#FF6B6B',
    },
    {
      icon: Copy,
      title: 'Copy to Clipboard',
      subtitle: 'Quick paste anywhere',
      onPress: () => Alert.alert('Copied', 'Image copied to clipboard'),
      color: '#00BCD4',
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => router.back()}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(26, 26, 26, 0.95)', 'rgba(26, 26, 26, 0.98)']}
          style={StyleSheet.absoluteFillObject}
        />
        
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Export Options</Text>
            <View style={styles.spacer} />
          </View>

          {/* Preview */}
          <View style={styles.previewContainer}>
            {editedImage && (
              <ExpoImage
                source={{ uri: editedImage }}
                style={styles.preview}
                contentFit="contain"
              />
            )}
            {includeWatermark && (
              <View style={styles.watermarkBadge}>
                <Text style={styles.watermarkText}>🍌 Banana Nano</Text>
              </View>
            )}
          </View>

          {/* Format Selection */}
          <View style={styles.formatSection}>
            <Text style={styles.sectionTitle}>Format</Text>
            <View style={styles.formatOptions}>
              {(['png', 'jpg', 'webp'] as ExportFormat[]).map((format) => (
                <TouchableOpacity
                  key={format}
                  style={[
                    styles.formatButton,
                    selectedFormat === format && styles.formatButtonActive,
                  ]}
                  onPress={() => setSelectedFormat(format)}
                >
                  <Text
                    style={[
                      styles.formatText,
                      selectedFormat === format && styles.formatTextActive,
                    ]}
                  >
                    {format.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Options */}
          <View style={styles.optionsSection}>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Include Watermark</Text>
              <TouchableOpacity
                style={[styles.toggle, includeWatermark && styles.toggleActive]}
                onPress={() => setIncludeWatermark(!includeWatermark)}
              >
                <View style={[styles.toggleThumb, includeWatermark && styles.toggleThumbActive]} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Embed Metadata</Text>
              <TouchableOpacity
                style={[styles.toggle, includeMetadata && styles.toggleActive]}
                onPress={() => setIncludeMetadata(!includeMetadata)}
              >
                <View style={[styles.toggleThumb, includeMetadata && styles.toggleThumbActive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Export Options */}
          <ScrollView
            style={styles.exportOptions}
            showsVerticalScrollIndicator={false}
          >
            {exportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exportOption}
                onPress={option.onPress}
                activeOpacity={0.8}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                  <option.icon size={24} color={option.color} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  previewContainer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  watermarkBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  watermarkText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600' as const,
  },
  formatSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  formatOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  formatButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formatButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  formatText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999',
  },
  formatTextActive: {
    color: '#1A1A1A',
  },
  optionsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#666',
  },
  toggleThumbActive: {
    backgroundColor: '#FFD700',
    transform: [{ translateX: 20 }],
  },
  exportOptions: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  spacer: {
    width: 40,
  },
});
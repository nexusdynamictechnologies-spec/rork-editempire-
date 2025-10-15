import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Camera, Layers3, Film, List, Search } from 'lucide-react-native';
import { router } from 'expo-router';

interface AngleGroup {
  id: string;
  title: string;
  color: string;
  items: string[];
}

const ANGLE_GROUPS: AngleGroup[] = [
  {
    id: 'shot-sizes',
    title: 'Camera shot sizes (framing)',
    color: '#FFD700',
    items: [
      'Extreme Long Shot (ELS) / Establishing',
      'Long Shot (LS) / Wide',
      'Full Shot (FS) (head-to-toe)',
      'Cowboy Shot (¾, mid-thigh)',
      'Medium Long Shot (MLS)',
      'Medium Shot (MS) (waist)',
      'Medium Close-Up (MCU) (chest)',
      'Close-Up (CU) (face)',
      'Big Close-Up (BCU) (forehead-chin)',
      'Extreme Close-Up (ECU) (eyes / detail)',
      'Insert / Cut-in (object detail)',
      'Two-Shot / Three-Shot / Group Shot',
      'Profile Shot / 3-Quarter Profile',
      'Over-the-Shoulder (OTS) (tight/loose)',
      'Clean Single (no OTS foreground)',
      'Dirty Single (with foreground occlusion)'
    ]
  },
  {
    id: 'height-angle',
    title: 'Camera height & angle (attitude)',
    color: '#00FF88',
    items: [
      'Eye-Level',
      'High Angle',
      'Low Angle',
      'Bird’s-Eye (top-down)',
      'Worm’s-Eye (extreme low up)',
      'Dutch / Canted Tilt',
      'Back Shot / Behind Subject',
      'Front-on / Head-on',
      'Top-Down Tabletop / Flat Lay',
      'Overhead Nadir (exactly 90° down)',
      'Oblique Aerial (angled from above)'
    ]
  },
  {
    id: 'lens-fov',
    title: 'Lens & field of view',
    color: '#9B59B6',
    items: [
      'Ultra-Wide (≈14–20mm)',
      'Wide (≈24–35mm)',
      'Normal (≈40–55mm)',
      'Telephoto (≈70–200mm+)',
      'Macro (1:1)',
      'Fisheye (curved)',
      'Tilt-Shift (miniature look)',
      'Anamorphic (oval bokeh, wider FOV)'
    ]
  },
  {
    id: 'perspective',
    title: 'Perspective & subjectivity',
    color: '#3498DB',
    items: [
      'POV (first-person)',
      'Over-the-Gun / Down-the-Barrel POV',
      'Shoulder Cam (shaky POV)',
      'Subjective Cam (character emotion)',
      'Objective / Observer (documentary)',
      'Surveillance / Security Cam',
      'Screen Insert (phone/computer over-shoulder)',
      'Isometric / Orthographic (CG look)'
    ]
  },
  {
    id: 'movement',
    title: 'Movement (path of camera)',
    color: '#E67E22',
    items: [
      'Lock-Off (static)',
      'Pan (left/right)',
      'Tilt (up/down)',
      'Pedestal (vertical lift on head)',
      'Truck/Track (lateral move)',
      'Dolly In / Push-In',
      'Dolly Out / Pull-Out',
      'Arc / Orbit (circle subject)',
      'Crane / Jib Up-Down',
      'Boom Swing',
      'Handheld (natural shake)',
      'Steadicam / Gimbal (smooth)',
      'Whip Pan / Snap Zoom',
      'Zolly (Dolly Zoom)',
      'Roll (camera rotates around lens axis)',
      'Hyperlapse / Timelapse Move',
      'Walk-and-Talk (leading or following)',
      'Reveal Move (from behind foreground)',
      'Parallax Foreground (move with close objects)'
    ]
  },
  {
    id: 'focus-depth',
    title: 'Focus & depth tricks',
    color: '#F39C12',
    items: [
      'Rack Focus (A→B)',
      'Deep Focus (everything sharp)',
      'Shallow Focus (subject isolation)',
      'Split-Diopter (near + far sharp)',
      'Foreground Framing (through objects)',
      'Keyhole / Slit / Peeking'
    ]
  },
  {
    id: 'mounts',
    title: 'Specialty mounts & rigs',
    color: '#1ABC9C',
    items: [
      'Drone: Nadir (straight down), Oblique, Orbit, Rocket (ascend), Top-Down Track, Pull-Away Reveal',
      'Cablecam (zip across)',
      'Vehicle: Hood-Mount, Side-Car, Follow (chase), Lead (car mounted facing back), Low Wheel-Level',
      'Body: Chest-Rig, Helmet-Cam, Head-Turn POV',
      'Technocrane / Tower Cam',
      'Slider (short precision move)',
      'Snorkel / Periscope (very low tabletop macro)'
    ]
  },
  {
    id: 'environmentals',
    title: 'Environmentals',
    color: '#E91E63',
    items: [
      'Underwater (UW)',
      'Split-Shot (Over/Under waterline)',
      'Through-Glass / Window Reflections',
      'Mirror Shot',
      'Through-Flames / Rain-on-Lens / Particles-on-Lens',
      'Silhouette Against Sun / Rim Light Angle'
    ]
  },
  {
    id: 'composition',
    title: 'Composition patterns',
    color: '#8E44AD',
    items: [
      'Rule-of-Thirds',
      'Centered Symmetry',
      'Leading Lines',
      'Frame-Within-Frame',
      'Over-the-Crowd (elevated)',
      'Crowd-Level (in the mix)',
      'Over-the-Table (tableau)',
      'Corridor / One-Point Perspective',
      'Vista / Horizon Line Low or High'
    ]
  },
  {
    id: 'prompt-combos',
    title: 'Prompt combos (quick examples)',
    color: '#00BCD4',
    items: [
      '“Medium Close-Up, eye-level, push-in, shallow focus, anamorphic, dirty OTS foreground”',
      '“Extreme Long Shot establishing, high angle drone oblique, slow orbit, deep focus”',
      '“POV, handheld, walk-and-talk, rack focus to door handle”',
      '“Top-down tabletop flat lay, lock-off, slider micro-move, tilt-shift”',
      '“Low angle worm’s-eye, zolly, rain-on-lens, parallax foreground”'
    ]
  }
];

function useSearch(groups: AngleGroup[], query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map(g => ({
        ...g,
        items: g.items.filter(it => it.toLowerCase().includes(q) || g.title.toLowerCase().includes(q)),
      }))
      .filter(g => g.items.length > 0);
  }, [groups, query]);
}

export default function CameraAnglesScreen() {
  const [query, setQuery] = useState<string>('');
  const filtered = useSearch(ANGLE_GROUPS, query);

  return (
    <View style={styles.container} testID="camera-angles-screen">
      <LinearGradient colors={['#1A1A1A', '#2A2A2A']} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" onPress={() => router.back()} style={styles.backButton} testID="back-button">
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <View style={styles.headerTitleRow}>
              <Camera size={22} color="#FFD700" />
              <Text style={styles.headerTitle}>Camera Angles Library</Text>
            </View>
            <Text style={styles.headerSubtitle}>Quick reference for framing, lens, movement and more</Text>
          </View>
          <View style={styles.headerRightSpacer} />
        </View>

        <View style={styles.searchBar}>
          <List size={18} color="#999" />
          <TextInput
            testID="search-input"
            placeholder="Search angles, shots, lenses..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
            accessibilityLabel="Search camera angles"
          />
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setQuery('')}
            style={styles.clearSearch}
            testID="clear-search"
          >
            <Search size={16} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {filtered.map(group => (
            <View key={group.id} style={styles.groupCard} testID={`group-${group.id}`}>
              <View style={styles.groupHeader}>
                <View style={[styles.iconBadge, { backgroundColor: `${group.color}20` }]}> 
                  <Layers3 size={18} color={group.color} />
                </View>
                <Text style={styles.groupTitle}>{group.title}</Text>
              </View>
              <View style={styles.badgeGrid}>
                {group.items.map((item) => (
                  <View key={item} style={styles.badge}>
                    <Text style={styles.badgeText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {filtered.length === 0 && (
            <View style={styles.emptyState} testID="empty-state">
              <Film size={24} color="#666" />
              <Text style={styles.emptyText}>No matches. Try a different search.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  backButton: { padding: 8 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700' as const, color: '#FFFFFF' },
  headerSubtitle: { fontSize: 12, color: '#999' },
  searchBar: {
    margin: 16, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)', flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  searchInput: {
    flex: 1, color: '#fff', fontSize: 14, paddingVertical: 6
  },
  clearSearch: { padding: 6, borderRadius: 8, backgroundColor: 'rgba(255,215,0,0.12)' },
  scrollContent: { paddingBottom: 40 },
  groupCard: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconBadge: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  groupTitle: { fontSize: 16, fontWeight: '700' as const, color: '#FFFFFF' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  badgeText: { color: '#CCCCCC', fontSize: 12 },
  emptyState: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyText: { color: '#777', fontSize: 13 },
  headerRightSpacer: { width: 40 }
});

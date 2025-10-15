export type CineItem = { key: string; label: string };
export type CineCategory = { key: string; title: string; items: CineItem[] };

const toItems = (labels: string[]): CineItem[] => labels.map((l) => ({ key: l.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: l }));

export const cineCategories: CineCategory[] = [
  {
    key: 'shot-sizes',
    title: 'Camera Shot Sizes (Framing)',
    items: toItems([
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
      'Two-Shot',
      'Three-Shot',
      'Group Shot',
      'Profile Shot',
      '3-Quarter Profile',
      'Over-the-Shoulder (OTS) (tight)',
      'Over-the-Shoulder (OTS) (loose)',
      'Clean Single (no OTS foreground)',
      'Dirty Single (with foreground occlusion)'
    ])
  },
  {
    key: 'camera-height-angle',
    title: 'Camera Height & Angle (Attitude)',
    items: toItems([
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
    ])
  },
  {
    key: 'lens-fov',
    title: 'Lens & Field of View',
    items: toItems([
      'Ultra-Wide (≈14–20mm)',
      'Wide (≈24–35mm)',
      'Normal (≈40–55mm)',
      'Telephoto (≈70–200mm+)',
      'Macro (1:1)',
      'Fisheye (curved)',
      'Tilt-Shift (miniature look)',
      'Anamorphic (oval bokeh, wider FOV)'
    ])
  },
  {
    key: 'perspective',
    title: 'Perspective & Subjectivity',
    items: toItems([
      'POV (first-person)',
      'Over-the-Gun / Down-the-Barrel POV',
      'Shoulder Cam (shaky POV)',
      'Subjective Cam (character emotion)',
      'Objective / Observer (documentary)',
      'Surveillance / Security Cam',
      'Screen Insert (phone/computer over-shoulder)',
      'Isometric / Orthographic (CG look)'
    ])
  },
  {
    key: 'movement',
    title: 'Movement (Path of Camera)',
    items: toItems([
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
    ])
  },
  {
    key: 'focus-depth',
    title: 'Focus & Depth Tricks',
    items: toItems([
      'Rack Focus (A→B)',
      'Deep Focus (everything sharp)',
      'Shallow Focus (subject isolation)',
      'Split-Diopter (near + far sharp)',
      'Foreground Framing (through objects)',
      'Keyhole / Slit / Peeking'
    ])
  },
  {
    key: 'specialty-mounts',
    title: 'Specialty Mounts & Rigs',
    items: toItems([
      'Drone: Nadir (straight down)',
      'Drone: Oblique',
      'Drone: Orbit',
      'Drone: Rocket (ascend)',
      'Drone: Top-Down Track',
      'Drone: Pull-Away Reveal',
      'Cablecam (zip across)',
      'Vehicle: Hood-Mount',
      'Vehicle: Side-Car',
      'Vehicle: Follow (chase)',
      'Vehicle: Lead (car mounted facing back)',
      'Vehicle: Low Wheel-Level',
      'Body: Chest-Rig',
      'Body: Helmet-Cam',
      'Body: Head-Turn POV',
      'Technocrane / Tower Cam',
      'Slider (short precision move)',
      'Snorkel / Periscope (very low tabletop macro)'
    ])
  },
  {
    key: 'environmentals',
    title: 'Environmentals',
    items: toItems([
      'Underwater (UW)',
      'Split-Shot (Over/Under waterline)',
      'Through-Glass / Window Reflections',
      'Mirror Shot',
      'Through-Flames',
      'Rain-on-Lens',
      'Particles-on-Lens',
      'Silhouette Against Sun',
      'Rim Light Angle'
    ])
  },
  {
    key: 'composition',
    title: 'Composition Patterns',
    items: toItems([
      'Rule-of-Thirds',
      'Centered Symmetry',
      'Leading Lines',
      'Frame-Within-Frame',
      'Over-the-Crowd (elevated)',
      'Crowd-Level (in the mix)',
      'Over-the-Table (tableau)',
      'Corridor / One-Point Perspective',
      'Vista / Horizon Line Low',
      'Vista / Horizon Line High'
    ])
  },
  {
    key: 'prompt-combos',
    title: 'Prompt Combos',
    items: toItems([
      'Medium Close-Up, eye-level, push-in, shallow focus, anamorphic, dirty OTS foreground',
      'Extreme Long Shot establishing, high angle drone oblique, slow orbit, deep focus',
      'POV, handheld, walk-and-talk, rack focus to door handle',
      'Top-down tabletop flat lay, lock-off, slider micro-move, tilt-shift',
      'Low angle worm’s-eye, zolly, rain-on-lens, parallax foreground'
    ])
  }
];

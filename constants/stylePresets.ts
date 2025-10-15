export const stylePresets = {
  none: {
    name: 'None',
    gradient: ['#666666', '#999999'] as const,
  },
  toon: {
    name: 'Toon',
    gradient: ['#FF6B6B', '#FFE66D'] as const,
  },
  claymation: {
    name: 'Claymation',
    gradient: ['#8B4513', '#DEB887'] as const,
  },
  cinematic: {
    name: 'Cinematic',
    gradient: ['#1A237E', '#3949AB'] as const,
  },
  retro90s: {
    name: 'Retro 90s',
    gradient: ['#FF1493', '#00CED1'] as const,
  },
  'fashion-editorial': {
    name: 'Fashion',
    gradient: ['#000000', '#FFD700'] as const,
  },
};

export const positionPresets = {
  sitting: {
    name: 'Sitting',
    prompts: [
      'sitting on a chair',
      'sitting cross-legged on the floor',
      'sitting on a bench',
      'sitting on the ground',
      'sitting in a relaxed position',
      'sitting upright with good posture',
      'sitting casually with legs apart',
      'sitting with legs to one side'
    ],
    icon: '🪑',
    gradient: ['#4A90E2', '#7BB3F0'] as const,
  },
  laying: {
    name: 'Laying',
    prompts: [
      'laying down on their back',
      'laying on their side',
      'laying on their stomach',
      'laying down relaxed',
      'laying in a comfortable position',
      'laying down with arms behind head',
      'laying down casually',
      'laying down peacefully'
    ],
    icon: '🛏️',
    gradient: ['#9B59B6', '#C39BD3'] as const,
  },
  standing: {
    name: 'Standing',
    prompts: [
      'standing upright',
      'standing with arms crossed',
      'standing with hands on hips',
      'standing casually',
      'standing with one leg forward',
      'standing in a confident pose',
      'standing with weight on one leg',
      'standing with arms at sides'
    ],
    icon: '🧍',
    gradient: ['#E74C3C', '#F1948A'] as const,
  },
  sittingOn: {
    name: 'Sitting On',
    prompts: [
      'sitting on a couch',
      'sitting on a bed',
      'sitting on stairs',
      'sitting on a table',
      'sitting on a rock',
      'sitting on a fence',
      'sitting on a ledge',
      'sitting on a windowsill',
      'sitting on a car hood',
      'sitting on a tree branch'
    ],
    icon: '🛋️',
    gradient: ['#F39C12', '#F8C471'] as const,
  },
  layingOn: {
    name: 'Laying On',
    prompts: [
      'laying on a bed',
      'laying on a couch',
      'laying on grass',
      'laying on sand',
      'laying on a blanket',
      'laying on a yoga mat',
      'laying on a bench',
      'laying on a hammock',
      'laying on a pool float',
      'laying on a picnic blanket'
    ],
    icon: '🏖️',
    gradient: ['#27AE60', '#58D68D'] as const,
  },
  inside: {
    name: 'Inside Objects',
    prompts: [
      'sitting inside a car',
      'sitting inside a bathtub',
      'sitting inside a large box',
      'sitting inside a tent',
      'sitting inside a boat',
      'sitting inside a shopping cart',
      'sitting inside a giant cup',
      'sitting inside a tire swing',
      'sitting inside a barrel',
      'sitting inside a hammock'
    ],
    icon: '📦',
    gradient: ['#8E44AD', '#BB8FCE'] as const,
  },
};

export const handGesturePresets = {
  pointing: {
    name: 'Pointing',
    prompts: [
      'pointing forward with index finger',
      'pointing up to the sky',
      'pointing to the side',
      'pointing down',
      'pointing at the camera',
      'pointing with both hands',
      'pointing dramatically',
      'pointing casually'
    ],
    icon: '👉',
    gradient: ['#FF6B6B', '#FFE66D'] as const,
  },
  waving: {
    name: 'Waving',
    prompts: [
      'waving hello with one hand',
      'waving goodbye',
      'waving with both hands',
      'waving enthusiastically',
      'giving a small wave',
      'waving above their head',
      'waving casually',
      'waving with a big smile'
    ],
    icon: '👋',
    gradient: ['#3498DB', '#85C1E9'] as const,
  },
  thumbsUp: {
    name: 'Thumbs Up',
    prompts: [
      'giving a thumbs up',
      'double thumbs up',
      'thumbs up with a smile',
      'enthusiastic thumbs up',
      'casual thumbs up',
      'thumbs up to the camera',
      'confident thumbs up',
      'happy thumbs up gesture'
    ],
    icon: '👍',
    gradient: ['#2ECC71', '#7DCEA0'] as const,
  },
  peace: {
    name: 'Peace Sign',
    prompts: [
      'making a peace sign with fingers',
      'peace sign with both hands',
      'peace sign near their face',
      'casual peace sign',
      'double peace signs',
      'peace sign with a wink',
      'peace sign gesture',
      'playful peace sign'
    ],
    icon: '✌️',
    gradient: ['#E67E22', '#F8C471'] as const,
  },
  crossed: {
    name: 'Arms Crossed',
    prompts: [
      'arms crossed over chest',
      'arms crossed confidently',
      'arms crossed casually',
      'arms crossed with attitude',
      'arms crossed defensively',
      'arms crossed while smiling',
      'arms crossed in a relaxed way',
      'arms crossed looking serious'
    ],
    icon: '🤞',
    gradient: ['#9B59B6', '#C39BD3'] as const,
  },
  handsOnHips: {
    name: 'Hands on Hips',
    prompts: [
      'hands on hips confidently',
      'hands on hips in a power pose',
      'hands on hips casually',
      'hands on hips with attitude',
      'hands on hips while standing',
      'hands on hips looking determined',
      'hands on hips in a superhero pose',
      'hands on hips with a smile'
    ],
    icon: '🦸',
    gradient: ['#E74C3C', '#F1948A'] as const,
  },
  reaching: {
    name: 'Reaching',
    prompts: [
      'reaching up high',
      'reaching out to grab something',
      'reaching towards the camera',
      'reaching to the side',
      'reaching down',
      'reaching with both arms',
      'reaching dramatically',
      'reaching for the sky'
    ],
    icon: '🙌',
    gradient: ['#F39C12', '#F8C471'] as const,
  },
  holding: {
    name: 'Holding Objects',
    prompts: [
      'holding a cup of coffee',
      'holding a book',
      'holding a phone',
      'holding flowers',
      'holding a ball',
      'holding a sign',
      'holding a camera',
      'holding something precious',
      'holding hands together',
      'holding an object up'
    ],
    icon: '🤲',
    gradient: ['#1ABC9C', '#76D7C4'] as const,
  },
};

export type FramePresetItem = { key: string; label: string; ratio: number };
export type FramePresetCategory = { items: FramePresetItem[] };

export const frameSizePresets: Record<'Social' | 'Photo' | 'Print' | 'Video' | 'Cover', FramePresetCategory> = {
  Social: {
    items: [
      { key: 'ig-square', label: 'Instagram Square 1:1', ratio: 1 / 1 },
      { key: 'ig-portrait', label: 'Instagram Portrait 4:5', ratio: 4 / 5 },
      { key: 'ig-landscape', label: 'Instagram Landscape 1.91:1', ratio: 1.91 / 1 },
      { key: 'stories', label: 'Stories/Reel 9:16', ratio: 9 / 16 },
      { key: 'tiktok', label: 'TikTok 9:16', ratio: 9 / 16 },
      { key: 'yt-shorts', label: 'YouTube Shorts 9:16', ratio: 9 / 16 },
    ],
  },
  Photo: {
    items: [
      { key: 'square', label: 'Square 1:1', ratio: 1 / 1 },
      { key: 'classic-35', label: 'Classic 3:2', ratio: 3 / 2 },
      { key: 'portrait-23', label: 'Portrait 2:3', ratio: 2 / 3 },
      { key: 'portrait-34', label: 'Portrait 3:4', ratio: 3 / 4 },
      { key: 'landscape-43', label: 'Landscape 4:3', ratio: 4 / 3 },
      { key: 'landscape-169', label: 'Landscape 16:9', ratio: 16 / 9 },
    ],
  },
  Print: {
    items: [
      { key: 'a1', label: 'A1 594x841 (1:1.414)', ratio: 594 / 841 },
      { key: 'a2', label: 'A2 420x594 (1:1.414)', ratio: 420 / 594 },
      { key: 'a3', label: 'A3 297x420 (1:1.414)', ratio: 297 / 420 },
      { key: 'a4', label: 'A4 210x297 (1:1.414)', ratio: 210 / 297 },
      { key: 'letter', label: 'US Letter 8.5x11 (1:1.294)', ratio: 8.5 / 11 },
      { key: 'tabloid', label: 'US Tabloid 11x17 (1:1.545)', ratio: 11 / 17 },
    ],
  },
  Video: {
    items: [
      { key: 'hd-169', label: 'HD 16:9', ratio: 16 / 9 },
      { key: 'cinema-239', label: 'CinemaScope 2.39:1', ratio: 2.39 / 1 },
      { key: 'ultra-wide-32', label: 'Ultra Wide 3:2', ratio: 3 / 2 },
      { key: 'vertical-916', label: 'Vertical 9:16', ratio: 9 / 16 },
      { key: 'square-11', label: 'Square 1:1', ratio: 1 / 1 },
    ],
  },
  Cover: {
    items: [
      { key: 'yt-thumb', label: 'YouTube Thumbnail 16:9', ratio: 16 / 9 },
      { key: 'fb-cover', label: 'Facebook Cover ~820x312 (2.63:1)', ratio: 820 / 312 },
      { key: 'tw-banner', label: 'Twitter/X Banner 3:1', ratio: 3 / 1 },
      { key: 'ig-post', label: 'IG Post 4:5', ratio: 4 / 5 },
      { key: 'linkedin-hero', label: 'LinkedIn Hero ~1584x396 (4:1)', ratio: 1584 / 396 },
    ],
  },
};

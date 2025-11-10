export type PoseCategoryKey = 'Standing' | 'Action' | 'Seated' | 'Dynamic' | 'Model';

export interface PosePresetItem {
  key: string;
  label: string;
  emoji: string;
  prompt: string;
}

export interface PoseCategory {
  label: string;
  items: PosePresetItem[];
}

export const PRECISION_POSE_SYSTEM_PROMPT = `🎯 POSE GENERATION SYSTEM:

Generate the character in the specified pose from the requested camera angle.

✅ PRESERVE:
- Character identity (same face, body, clothing, hair)
- Background environment and lighting
- Natural appearance and realism

⚡ POSE EXECUTION:
- Apply the specified pose naturally
- Show full body from head to feet
- Maintain anatomically correct positioning
- Natural clothing drape and hair flow

📸 CAMERA ANGLE:
- Match the requested viewing perspective precisely
- Maintain photorealistic quality`;

export const posePresets: Record<PoseCategoryKey, PoseCategory> = {
  Standing: {
    label: 'Standing',
    items: [
      {
        key: 'stand-neutral',
        label: 'Neutral Stand',
        emoji: '🧍',
        prompt: 'Standing upright, feet shoulder-width apart, arms relaxed at sides',
      },
      {
        key: 'stand-confident',
        label: 'Confident',
        emoji: '💪',
        prompt: 'Arms crossed over chest, confident stance, feet apart',
      },
      {
        key: 'stand-hands-hips',
        label: 'Hands on Hips',
        emoji: '🙌',
        prompt: 'Hands on hips, elbows out, chest forward, power pose',
      },
      {
        key: 'stand-casual',
        label: 'Casual',
        emoji: '🧥',
        prompt: 'Hands in pockets, relaxed posture, weight on one leg',
      },
    ],
  },
  Action: {
    label: 'Action',
    items: [
      {
        key: 'action-running',
        label: 'Running',
        emoji: '🏃',
        prompt: 'Dynamic running: one leg forward, other back, arms pumping, forward lean',
      },
      {
        key: 'action-jumping',
        label: 'Jumping',
        emoji: '🤸',
        prompt: 'Mid-jump: both feet off ground, arms extended for balance, airborne',
      },
      {
        key: 'action-fighting',
        label: 'Fighting Stance',
        emoji: '🥊',
        prompt: 'Combat stance: feet staggered, fists raised, ready position',
      },
      {
        key: 'action-hero-landing',
        label: 'Hero Landing',
        emoji: '🦸',
        prompt: 'Superhero landing: one knee down, fist on ground, powerful pose',
      },
    ],
  },
  Seated: {
    label: 'Seated',
    items: [
      {
        key: 'sit-chair',
        label: 'On Chair',
        emoji: '🪑',
        prompt: 'Sitting on chair: back straight, feet flat on floor, hands on thighs',
      },
      {
        key: 'sit-crosslegged',
        label: 'Cross-Legged',
        emoji: '🧘',
        prompt: 'Sitting cross-legged on floor: back straight, hands on knees',
      },
      {
        key: 'sit-edge',
        label: 'Edge Sitting',
        emoji: '🏗️',
        prompt: 'Sitting on edge: legs dangling, casual relaxed posture',
      },
      {
        key: 'sit-one-knee-up',
        label: 'One Knee Up',
        emoji: '🦵',
        prompt: 'Sitting with one leg extended, other knee up near chest',
      },
      {
        key: 'crouch-squat',
        label: 'Squatting',
        emoji: '🦆',
        prompt: 'Deep squat: knees bent fully, feet flat, balanced posture',
      },
      {
        key: 'crouch-one-knee',
        label: 'Kneeling',
        emoji: '🤴',
        prompt: 'Kneeling on one knee: other foot flat, upright torso',
      },
    ],
  },
  Dynamic: {
    label: 'Dynamic',
    items: [
      {
        key: 'dynamic-reaching',
        label: 'Reaching Up',
        emoji: '🙋',
        prompt: 'Reaching upward: arms extended overhead, body stretched tall',
      },
      {
        key: 'dynamic-pointing',
        label: 'Pointing',
        emoji: '👉',
        prompt: 'Pointing forward: arm extended, confident stance',
      },
      {
        key: 'dynamic-victory',
        label: 'Victory',
        emoji: '🎉',
        prompt: 'Victory celebration: both arms raised high in V-shape',
      },
      {
        key: 'dynamic-beckoning',
        label: 'Beckoning',
        emoji: '👋',
        prompt: 'Beckoning or waving: one arm raised, welcoming gesture',
      },
      {
        key: 'dynamic-looking-back',
        label: 'Looking Back',
        emoji: '👀',
        prompt: 'Looking back over shoulder: body facing away, head turned back',
      },
    ],
  },
  Model: {
    label: 'Model',
    items: [
      {
        key: 'model-power-stance',
        label: 'Power Stance',
        emoji: '💃',
        prompt: 'Confident power stance: feet apart, one hip forward, chin up, strong eye contact, commanding presence',
      },
      {
        key: 'model-over-shoulder',
        label: 'Over Shoulder',
        emoji: '💋',
        prompt: 'Sultry over-shoulder look: body angled away, head turned back, intense gaze over shoulder, graceful neck line',
      },
      {
        key: 'model-s-curve',
        label: 'S-Curve',
        emoji: '🎀',
        prompt: 'Classic S-curve pose: weight on one leg, opposite hip out, torso curved, arms positioned elegantly',
      },
      {
        key: 'model-runway-walk',
        label: 'Runway Walk',
        emoji: '👠',
        prompt: 'Confident runway walk: one foot forward, straight posture, head high, powerful stride, fierce expression',
      },
      {
        key: 'model-hand-on-hip',
        label: 'Hand on Hip',
        emoji: '💅',
        prompt: 'Confident hand-on-hip pose: one hand on hip, body angled, head tilted, strong eye contact, poised stance',
      },
      {
        key: 'model-seated-cross',
        label: 'Seated Cross',
        emoji: '💺',
        prompt: 'Elegant seated pose: legs crossed gracefully, back arched, one arm draped, confident gaze, refined posture',
      },
      {
        key: 'model-leaning',
        label: 'Leaning Pose',
        emoji: '🌟',
        prompt: 'Casual leaning pose: body weight shifted, relaxed confidence, head tilted, alluring expression',
      },
      {
        key: 'model-profile',
        label: 'Profile Shot',
        emoji: '📸',
        prompt: 'Strong profile stance: body in profile, chin up, elongated neck, elegant posture, confident silhouette',
      },
    ],
  },
};

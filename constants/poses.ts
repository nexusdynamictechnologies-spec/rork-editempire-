export type PoseCategoryKey = 'Sitting' | 'Standing' | 'Laying';

export interface PosePresetItem {
  key: string;
  label: string;
  prompt: string;
}

export interface PoseCategory {
  label: string;
  items: PosePresetItem[];
}

export const posePresets: Record<PoseCategoryKey, PoseCategory> = {
  Sitting: {
    label: 'Sitting',
    items: [
      {
        key: 'sit-relaxed-chair-45',
        label: 'Relaxed on chair (45°)',
        prompt:
          'Subject sitting relaxed on a chair at a 45-degree angle to camera, one leg crossed over the other, shoulders relaxed, natural posture, hands gently resting',
      },
      {
        key: 'sit-straight-stool-front',
        label: 'Straight on stool (front)',
        prompt:
          'Subject seated upright on a stool facing camera, neutral posture, feet flat, spine aligned, hands on thighs, confident but approachable',
      },
      {
        key: 'sit-lean-forward-table',
        label: 'Lean forward (table)',
        prompt:
          'Subject seated at a table leaning slightly forward, elbows lightly on tabletop, engaged expression, subtle perspective depth',
      },
      {
        key: 'sit-floor-crossleg',
        label: 'Floor cross‑legged',
        prompt:
          'Subject sitting cross-legged on the floor, relaxed shoulders, slight head tilt, hands loosely clasped, cozy casual vibe',
      },
    ],
  },
  Standing: {
    label: 'Standing',
    items: [
      {
        key: 'stand-contrapposto-3q',
        label: 'Contrapposto (3/4)',
        prompt:
          'Subject standing in contrapposto pose at three-quarter angle, weight on back leg, front knee soft, hips and shoulders gently opposing, elegant silhouette',
      },
      {
        key: 'stand-arms-crossed-front',
        label: 'Arms crossed (front)',
        prompt:
          'Subject standing facing camera with arms crossed, relaxed shoulders, confident stance, feet shoulder-width',
      },
      {
        key: 'stand-hands-pockets-urban',
        label: 'Hands in pockets',
        prompt:
          'Subject standing casual with hands in pockets, slight lean, natural posture, candid lifestyle feel',
      },
      {
        key: 'stand-look-back-over-shoulder',
        label: 'Over-shoulder look back',
        prompt:
          'Subject standing and looking back over shoulder, subtle torso twist, playful expression, hair movement emphasized',
      },
    ],
  },
  Laying: {
    label: 'Laying',
    items: [
      {
        key: 'lay-supine-relaxed',
        label: 'On back relaxed',
        prompt:
          'Subject lying on back, relaxed limbs, gentle head turn to camera, serene mood, soft lines',
      },
      {
        key: 'lay-prone-chin-hands',
        label: 'On stomach, chin in hands',
        prompt:
          'Subject lying prone with chin resting in hands, elbows forward, playful gaze to camera, cozy composition',
      },
      {
        key: 'lay-side-classic',
        label: 'Side pose classic',
        prompt:
          'Subject lying on side with upper body slightly raised by forearm, elegant lines, gentle S-curve, relaxed legs',
      },
      {
        key: 'lay-curled-cozy',
        label: 'Curled cozy',
        prompt:
          'Subject in curled, cozy laying pose, soft body language, intimate and relaxed atmosphere',
      },
    ],
  },
};

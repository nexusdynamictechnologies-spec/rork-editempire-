export type BodyStyleCategoryKey = 'Build' | 'Posture' | 'Proportions';

export interface BodyStylePresetItem {
  key: string;
  label: string;
  prompt: string;
}

export interface BodyStyleCategory {
  label: string;
  items: BodyStylePresetItem[];
}

export const bodyStylePresets: Record<BodyStyleCategoryKey, BodyStyleCategory> = {
  Build: {
    label: 'Build',
    items: [
      {
        key: 'athletic-toned',
        label: 'Athletic Toned',
        prompt: 'Athletic toned physique with defined muscles visible through clothing, lean body composition, visible muscle definition in arms and legs, fit and healthy appearance, natural athletic proportions. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to athletic toned',
      },
      {
        key: 'muscular-strong',
        label: 'Muscular Strong',
        prompt: 'Muscular strong build with prominent muscle mass visible through clothing, broad shoulders, defined chest and arms showing through fabric, powerful physique, bodybuilder-like proportions. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to muscular strong',
      },
      {
        key: 'slim-lean',
        label: 'Slim Lean',
        prompt: 'Slim lean body type with slender frame visible through clothing, minimal body fat, elongated proportions, graceful silhouette, model-like physique. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to slim lean',
      },
      {
        key: 'curvy-voluptuous',
        label: 'Curvy Voluptuous',
        prompt: 'Curvy voluptuous figure with pronounced curves visible through clothing, fuller bust and hips, defined waist, hourglass proportions, feminine silhouette. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to curvy voluptuous',
      },
      {
        key: 'average-balanced',
        label: 'Average Balanced',
        prompt: 'Average balanced body type with natural proportions, moderate build, healthy appearance, realistic everyday physique. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to average balanced',
      },
      {
        key: 'petite-compact',
        label: 'Petite Compact',
        prompt: 'Petite compact frame with smaller stature, delicate proportions, graceful features, refined silhouette. The clothing must remain exactly as it is - same garment type, same fit, same style, same fabric, same colors. Only the body shape underneath changes to petite compact',
      },
    ],
  },
  Posture: {
    label: 'Posture',
    items: [
      {
        key: 'confident-upright',
        label: 'Confident Upright',
        prompt: 'Confident upright posture with straight spine, shoulders back, chest open, head held high, commanding presence. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
      {
        key: 'relaxed-casual',
        label: 'Relaxed Casual',
        prompt: 'Relaxed casual posture with natural stance, slight hip shift, comfortable body language, approachable demeanor. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
      {
        key: 'dynamic-action',
        label: 'Dynamic Action',
        prompt: 'Dynamic action posture with body in motion, weight shifted, engaged muscles, energetic stance. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
      {
        key: 'elegant-poised',
        label: 'Elegant Poised',
        prompt: 'Elegant poised posture with graceful alignment, refined positioning, balanced weight distribution, sophisticated bearing. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
      {
        key: 'powerful-dominant',
        label: 'Powerful Dominant',
        prompt: 'Powerful dominant posture with wide stance, expanded chest, assertive positioning, authoritative presence. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
      {
        key: 'shy-reserved',
        label: 'Shy Reserved',
        prompt: 'Shy reserved posture with slightly hunched shoulders, inward body language, protective stance, modest demeanor. Keep the exact same clothing, outfit, and body type - only adjust the posture and stance',
      },
    ],
  },
  Proportions: {
    label: 'Proportions',
    items: [
      {
        key: 'tall-elongated',
        label: 'Tall Elongated',
        prompt: 'Tall elongated proportions with extended limbs, longer torso, statuesque height, runway model proportions',
      },
      {
        key: 'short-compact',
        label: 'Short Compact',
        prompt: 'Short compact proportions with shorter limbs, balanced torso-to-leg ratio, grounded appearance',
      },
      {
        key: 'long-legs',
        label: 'Long Legs',
        prompt: 'Long-legged proportions with extended leg length, shorter torso, leggy silhouette, fashion-forward proportions',
      },
      {
        key: 'broad-shoulders',
        label: 'Broad Shoulders',
        prompt: 'Broad-shouldered proportions with wide shoulder span, athletic V-taper, strong upper body presence',
      },
      {
        key: 'narrow-waist',
        label: 'Narrow Waist',
        prompt: 'Narrow waist proportions with cinched midsection, defined waistline, hourglass or V-shape emphasis',
      },
      {
        key: 'balanced-classic',
        label: 'Balanced Classic',
        prompt: 'Balanced classic proportions with harmonious body ratios, natural symmetry, timeless physique',
      },
    ],
  },
};

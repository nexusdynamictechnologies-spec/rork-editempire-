export type HairstyleCategoryKey = 'Female' | 'Male';

export interface HairstylePresetItem {
  key: string;
  label: string;
  prompt: string;
}

export interface HairstyleCategory {
  label: string;
  items: HairstylePresetItem[];
}

export const hairstylePresets: Record<HairstyleCategoryKey, HairstyleCategory> = {
  Female: {
    label: 'Female',
    items: [
      {
        key: 'long-straight',
        label: 'Long Straight',
        prompt: 'Long straight hair flowing down past shoulders, sleek and smooth texture, natural shine, center or side part, healthy appearance',
      },
      {
        key: 'long-wavy',
        label: 'Long Wavy',
        prompt: 'Long wavy hair with soft flowing waves cascading down, voluminous texture, natural movement, beachy waves style',
      },
      {
        key: 'long-curly',
        label: 'Long Curly',
        prompt: 'Long curly hair with defined spiral curls, bouncy volume, natural curl pattern, full-bodied texture',
      },
      {
        key: 'bob-classic',
        label: 'Classic Bob',
        prompt: 'Classic bob haircut at chin or jaw length, blunt cut ends, sleek and polished, straight or slightly curved under',
      },
      {
        key: 'pixie-short',
        label: 'Pixie Cut',
        prompt: 'Short pixie cut with cropped sides and back, slightly longer on top, textured layers, edgy and modern style',
      },
      {
        key: 'shoulder-length',
        label: 'Shoulder Length',
        prompt: 'Shoulder-length hair with layers, versatile styling, natural volume, face-framing pieces, medium length',
      },
      {
        key: 'updo-elegant',
        label: 'Elegant Updo',
        prompt: 'Elegant updo hairstyle with hair swept up and secured, sophisticated bun or chignon, polished formal style',
      },
      {
        key: 'ponytail-high',
        label: 'High Ponytail',
        prompt: 'High ponytail with hair pulled up and secured at crown, sleek or voluminous, long flowing tail',
      },
      {
        key: 'braided-style',
        label: 'Braided',
        prompt: 'Braided hairstyle with intricate braiding pattern, side braid, crown braid, or french braid, detailed weaving',
      },
      {
        key: 'messy-bun',
        label: 'Messy Bun',
        prompt: 'Messy bun with loose textured styling, effortless casual look, wispy strands framing face, relaxed updo',
      },
      {
        key: 'bangs-fringe',
        label: 'With Bangs',
        prompt: 'Hairstyle with bangs or fringe across forehead, straight-cut or side-swept, face-framing front section',
      },
      {
        key: 'half-up',
        label: 'Half-Up Half-Down',
        prompt: 'Half-up half-down hairstyle with top section pulled back, bottom section flowing down, romantic versatile style',
      },
    ],
  },
  Male: {
    label: 'Male',
    items: [
      {
        key: 'short-crew',
        label: 'Crew Cut',
        prompt: 'Short crew cut with closely cropped sides and back, slightly longer on top, clean military-style haircut',
      },
      {
        key: 'buzz-cut',
        label: 'Buzz Cut',
        prompt: 'Buzz cut with uniform short length all over, clipped close to scalp, low-maintenance style',
      },
      {
        key: 'undercut-modern',
        label: 'Modern Undercut',
        prompt: 'Modern undercut with shaved or very short sides and back, longer styled top, sharp contrast between lengths',
      },
      {
        key: 'pompadour',
        label: 'Pompadour',
        prompt: 'Pompadour hairstyle with volume swept up and back from forehead, classic retro style, polished and structured',
      },
      {
        key: 'quiff-textured',
        label: 'Textured Quiff',
        prompt: 'Textured quiff with hair styled up and forward, messy texture, modern casual style, volume at front',
      },
      {
        key: 'side-part',
        label: 'Side Part',
        prompt: 'Classic side part hairstyle with clean defined part, combed to side, professional polished look',
      },
      {
        key: 'slicked-back',
        label: 'Slicked Back',
        prompt: 'Slicked back hair with all hair combed straight back, sleek and smooth, sophisticated formal style',
      },
      {
        key: 'messy-textured',
        label: 'Messy Textured',
        prompt: 'Messy textured hairstyle with tousled appearance, natural movement, casual effortless style, piece-y texture',
      },
      {
        key: 'fade-taper',
        label: 'Fade/Taper',
        prompt: 'Fade or taper haircut with gradual length transition from short sides to longer top, clean modern cut',
      },
      {
        key: 'long-flowing',
        label: 'Long Flowing',
        prompt: 'Long flowing hair past shoulders, natural texture, loose and free-flowing, masculine long hair style',
      },
      {
        key: 'man-bun',
        label: 'Man Bun',
        prompt: 'Man bun with long hair pulled back and tied into bun at crown or back of head, modern masculine style',
      },
      {
        key: 'mohawk-faux',
        label: 'Faux Hawk',
        prompt: 'Faux hawk with center strip of hair styled upward, shorter sides, edgy modern style without full mohawk commitment',
      },
    ],
  },
};

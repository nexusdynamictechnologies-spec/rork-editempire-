export interface Weapon {
  id: string;
  name: string;
  aliases: string[];
  promptDirective: string;
}

export const weaponsCatalog: Weapon[] = [
  {
    id: 'rpg7',
    name: 'RPG-7 launcher',
    aliases: ['rpg', 'rpg7', 'rpg-7', 'rocket propelled grenade'],
    promptDirective:
      'Insert a Soviet RPG-7 shoulder-fired rocket-propelled grenade launcher with wood foregrip, cylindrical launcher tube, iron sights, and conical warhead. Correct shoulder mount and two-hand grip, realistic scale, matte-phosphate metal, worn wood texture, carbon scoring, safety pin details, shadowing and occlusion with arms. Do not change subject identity.',
  },
  {
    id: 'javelin',
    name: 'FGM-148 Javelin',
    aliases: ['javelin', 'fgm-148', 'fgm148', 'fgm 148'],
    promptDirective:
      'Insert an FGM-148 Javelin anti-tank missile system CLU and launch tube. Black polymer surfaces, rubber eyecup, labels, serial stencils, tripod socket, correct two-hand carry or firing stance on shoulder, accurate scale and perspective with contact shadows. Keep background intact.',
  },
  {
    id: 'at4',
    name: 'M136 AT4',
    aliases: ['at4', 'm136', 'm136 at4', 'm 136'],
    promptDirective:
      'Insert an M136 AT4 disposable anti-armor launcher, tan/olive tube with hazard labels and flip-up sights. One-hand rear, front support hand, proper shoulder placement, realistic wear and decals, crisp edges, no deformation of subject.',
  },
  {
    id: 'rpg26',
    name: 'RPG-26 Aglen',
    aliases: ['rpg-26', 'rpg26', 'aglen'],
    promptDirective:
      'Insert an RPG-26 Aglen single-use launcher, compact green tube with protective caps and stencil markings, correct grip and scale, natural lighting and occlusion, preserve pose and clothing.',
  },
  {
    id: 'matador',
    name: 'RGW 90 MATADOR',
    aliases: ['matador', 'rgw 90', 'rgw90', 'rgw-90'],
    promptDirective:
      'Insert an RGW 90 MATADOR recoilless launcher, modern tan/green tube with optic and labeling, authentic textures, correct perspective, shoulder-fired stance, maintain scene integrity.',
  },
];

export function expandWeaponTerms(text: string): { text: string; matched: Weapon[] } {
  try {
    const lower = text.toLowerCase();
    const matched: Weapon[] = [];
    for (const w of weaponsCatalog) {
      if (w.aliases.some(a => lower.includes(a))) {
        matched.push(w);
      }
    }
    if (matched.length === 0) {
      return { text, matched };
    }
    const baseDirectives = matched.map(w => w.promptDirective).join(' ');
    const aimingProtocol = 'WEAPON HANDLING AND AIMING PROTOCOL: Place the weapon naturally in the subject\'s hands with correct, safe grip. If the prompt specifies aiming at the camera or viewer, orient the barrel axis directly toward the camera with strong foreshortening, muzzle centered or as composed, proper stance, shoulder mount if applicable, and realistic arm positioning. Respect direction instructions precisely (left/right/up/down/low/high/45° tilt). Keep finger position as requested (on trigger or off the trigger indexed along the frame). Ensure iron sights/optics alignment, correct bore axis, consistent perspective, accurate contact shadows, and occlusion by hands. Do not change facial identity or outfit; keep background intact unless requested.';

    const dirLower = lower;
    let directionText = '';
    const directionPhrases: Array<{ re: RegExp; text: string }> = [
      { re: /(aim|point|direct|level)\s+(it|the\s*gun|weapon|rifle|pistol|launcher)?\s*(at|toward?s?)\s+(the\s*)?(camera|viewer|lens)/i, text: 'Aim the weapon directly at the camera lens with strong foreshortening. Align bore axis precisely to viewer.' },
      { re: /(aim|point)\s+(up\s*left|upper\s*left|left\s*up|\bUL\b)/i, text: 'Orient barrel to upper-left at a 45° tilt from camera perspective.' },
      { re: /(aim|point)\s+(up\s*right|upper\s*right|right\s*up|\bUR\b)/i, text: 'Orient barrel to upper-right at a 45° tilt from camera perspective.' },
      { re: /(aim|point)\s+(down\s*left|lower\s*left|left\s*down|\bDL\b)/i, text: 'Orient barrel to lower-left at a 45° tilt from camera perspective.' },
      { re: /(aim|point)\s+(down\s*right|lower\s*right|right\s*down|\bDR\b)/i, text: 'Orient barrel to lower-right at a 45° tilt from camera perspective.' },
      { re: /(aim|point)\s+left(\b|[^a-z])/i, text: 'Point the weapon to the left of frame, slight yaw left with correct perspective.' },
      { re: /(aim|point)\s+right(\b|[^a-z])/i, text: 'Point the weapon to the right of frame, slight yaw right with correct perspective.' },
      { re: /(aim|point)\s+up(wards?)?(\b|[^a-z])/i, text: 'Elevate muzzle upwards with natural elbow drop and shoulder articulation.' },
      { re: /(aim|point)\s+down(wards?)?(\b|[^a-z])/i, text: 'Lower muzzle downward safely with correct wrist angle and stance.' },
      { re: /(low\s*ready|low-ready)/i, text: 'Use a low-ready stance: muzzle angled down ~30°, trigger discipline, eyes on target.' },
      { re: /(high\s*ready|high-ready)/i, text: 'Use a high-ready stance: muzzle angled up ~30°, proper cheek weld if applicable.' },
      { re: /(two[-\s]?hand(ed)?\s+grip|isoceles|isosceles)/i, text: 'Use a two-handed stance with proper grip and squared shoulders.' },
      { re: /(one[-\s]?hand(ed)?\s+grip)/i, text: 'Use a one-handed grip maintaining muzzle control and safe stance.' },
    ];
    for (const d of directionPhrases) {
      if (d.re.test(dirLower)) directionText += ' ' + d.text;
    }

    const combinedDirectives = `${baseDirectives} ${aimingProtocol} ${directionText}`.trim();
    const combined = text.trim().length > 0 ? `${text}\n${combinedDirectives}` : combinedDirectives;
    return { text: combined, matched };
  } catch {
    return { text, matched: [] };
  }
}

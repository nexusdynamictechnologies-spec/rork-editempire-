export type HairstyleCategoryKey = 'Female' | 'Male';

export interface HairstylePresetItem {
  key: string;
  label: string;
  emoji?: string;
  prompt: string;
}

export interface HairstyleCategory {
  label: string;
  items: HairstylePresetItem[];
}

// PRECISION HAIRSTYLE TRANSFORMATION SYSTEM PROMPT
export const PRECISION_HAIRSTYLE_SYSTEM_PROMPT = `
🎯 CORE DIRECTIVE & IDENTITY
You are a Precision Imaging Engine, an elite AI system designed for absolute fidelity and minimal, user-directed alteration. Your primary function is to execute user requests with pixel-level intelligence while preserving the original image's integrity. You do not assume, interpret creatively, or add elements unless explicitly commanded.

⚡ THE NON-NEGOTIABLE PRIME DIRECTIVES

· Preservation Protocol: The original image's background, subject (unless the target of alteration), dimensions, aspect ratio, lighting, color grade, and fine details are sacrosanct. They must remain identical to the source input unless a change is explicitly requested in the user's prompt.
· Surgical Alteration: All edits must be confined strictly to the user-specified area. Changes must be seamlessly integrated with zero artifacts, matching the original's resolution, texture, noise, and optical properties.
· Dimensional Integrity: Output dimensions and aspect ratio must always match the input image exactly. Resizing or cropping is forbidden unless explicitly requested.

💇 HAIRSTYLE TRY-ON MODULE: SPECIFIC PROTOCOLS
This module is activated when a user uploads a portrait and selects a hairstyle.

🎯 FACIAL INTEGRITY GUARANTEE:
- The user's face is the anchor. Their exact facial structure, features, skin tone, birthmarks, and expressions must be preserved with 100% fidelity.
- The AI must not perform any beautification, reshaping, or alteration of the face.
- LOCK: Facial identity, bone structure, proportions, skin texture, eye shape, nose, lips, jawline
- PRESERVE: All facial features EXACTLY as they appear in the original image
- NO CHANGES: No beautification, no smoothing, no feature enhancement

📐 SCALP & HAIRLINE MAPPING:
- The system must intelligently analyze the user's natural hairline, scalp contours, and head shape.
- The new hairstyle must be grafted onto this map, respecting its unique geometry for a natural fit.
- For fringes: Must follow the natural brow line
- For volume: Must correspond to actual skull shape and proportions
- For length: Must appear naturally grown from the exact hairline position
- ANALYZE: Original hairline shape, forehead size, head shape, ear position
- MAINTAIN: Natural skull proportions and head dimensions

✨ SEAMLESS INTEGRATION:
- The new hair must match the lighting conditions, shadows, and color temperature of the original photo.
- Strand-level detail, texture (wet, dry, curly, straight), and interaction with the environment (wind, humidity) must be convincingly rendered.
- LIGHTING MATCH: Same direction, intensity, and color temperature as original
- SHADOW CAST: Natural shadows from hair onto face, neck, and shoulders
- TEXTURE DETAIL: Individual hair strands, natural shine, realistic highlights
- ENVIRONMENTAL INTEGRATION: Hair responds naturally to lighting and atmosphere

🔒 ULTRA-CRITICAL RESTRICTIONS:

❌ ABSOLUTELY FORBIDDEN:
- DO NOT change facial features, expressions, or identity
- DO NOT alter face shape, proportions, or bone structure
- DO NOT modify skin tone, texture, or complexion
- DO NOT change eye shape, color, or characteristics
- DO NOT alter nose, lips, or any facial features
- DO NOT beautify, smooth, or enhance the face
- DO NOT change the background, clothing (except where hair naturally overlaps), or body position
- DO NOT modify the pose, head angle, or body positioning
- DO NOT change lighting direction or color temperature
- DO NOT alter image dimensions or crop the photo
- DO NOT add makeup, accessories, or any elements not related to hair

✅ REQUIRED ACTIONS:
- ONLY change the hair/hairstyle as specified
- PRESERVE everything else with 100% fidelity
- MAINTAIN photorealistic quality
- ENSURE natural integration at hairline and edges
- MATCH lighting and shadows perfectly
- KEEP facial identity absolutely unchanged

🎨 HAIRSTYLE EXECUTION PROTOCOL:

When changing hairstyle:
1. ANALYZE the original image:
   - Note exact facial features and structure
   - Identify natural hairline and head shape
   - Observe lighting direction and intensity
   - Detect environment and background

2. PRESERVE with absolute fidelity:
   - Lock all facial features (eyes, nose, mouth, jawline, cheeks)
   - Maintain exact skin tone and texture
   - Keep facial expression identical
   - Preserve head position and angle
   - Lock background completely unchanged
   - Maintain body and clothing (except natural hair overlap)

3. APPLY new hairstyle:
   - Map hairstyle to natural hairline contours
   - Match hair color appropriately (or as specified)
   - Apply texture and strand detail matching photo quality
   - Integrate lighting and shadows naturally
   - Ensure realistic volume and physics
   - Create seamless blend at hairline edges

4. QUALITY ASSURANCE:
   - Verify face is 100% unchanged
   - Check hairline integration is seamless
   - Confirm lighting matches perfectly
   - Validate photorealistic appearance
   - Ensure no artifacts or unnatural elements

💎 TECHNICAL REQUIREMENTS:

🔬 PHOTOREALISTIC RENDERING:
- Individual hair strand definition with natural variation
- Realistic light reflection and absorption
- Natural hair texture (fine, medium, coarse)
- Authentic color depth with highlights and undertones
- Proper subsurface scattering where applicable
- Natural hair physics and drape

🎯 PRECISION EDGE WORK:
- Hairline must blend seamlessly with forehead
- Individual wisps and flyaways for realism
- Soft, natural edges (no hard cutouts)
- Proper transparency and fine detail at edges
- Natural transition where hair meets skin

🌟 LIGHTING INTEGRATION:
- Match source direction of original photo
- Apply same intensity and color temperature
- Cast appropriate shadows on face/neck
- Reflect environment lighting naturally
- Maintain consistent atmospheric conditions

📊 QUALITY STANDARDS:
- Maintain original image resolution and quality
- No visible artifacts, seams, or compositing errors
- Photorealistic integration that looks like a single photograph
- Professional-grade hair rendering
- Natural, believable final result

🎬 EXECUTION SUMMARY:

For EVERY hairstyle transformation:
1. Preserve face with 100% fidelity (zero changes)
2. Map new hairstyle to natural head shape and hairline
3. Match lighting, shadows, and color temperature exactly
4. Render hair with photorealistic detail and texture
5. Integrate seamlessly with natural edge work
6. Maintain background, clothing, and pose completely unchanged
7. Ensure final result looks like original photography

The user should be able to confidently show the result to anyone and have them believe this is how they would look with that exact hairstyle in real life. The transformation must be so natural and precise that it appears to be the original photograph, just with different hair.
`;

export const hairstylePresets: Record<HairstyleCategoryKey, HairstyleCategory> = {
  Female: {
    label: 'Female',
    items: [
      {
        key: 'long-straight',
        label: 'Long Straight',
        emoji: '💁‍♀️',
        prompt: 'Transform to long straight hair flowing down past shoulders with sleek smooth texture, natural healthy shine, center or side part. Apply strand-level detail with individual hair definition. Maintain natural hairline following skull contours.',
      },
      {
        key: 'long-wavy',
        label: 'Long Wavy',
        emoji: '🌊',
        prompt: 'Transform to long wavy hair with soft flowing waves cascading down past shoulders, voluminous natural texture, beachy wave movement. Render individual wave patterns with dimensional depth and natural variation.',
      },
      {
        key: 'long-curly',
        label: 'Long Curly',
        emoji: '🦱',
        prompt: 'Transform to long curly hair with defined spiral curls, bouncy natural volume, authentic curl pattern throughout. Render curls with proper physics, natural spring, and dimensional curl definition.',
      },
      {
        key: 'bob-classic',
        label: 'Classic Bob',
        emoji: '💇‍♀️',
        prompt: 'Transform to classic bob haircut at chin or jaw length, blunt precision cut ends, sleek polished finish. Render with straight or slightly curved under style, professional salon-quality appearance.',
      },
      {
        key: 'pixie-short',
        label: 'Pixie Cut',
        emoji: '✂️',
        prompt: 'Transform to short pixie cut with closely cropped sides and back, slightly longer textured top with piece-y layers. Modern edgy styling with natural movement and dimensional texture.',
      },
      {
        key: 'shoulder-length',
        label: 'Shoulder Length',
        emoji: '💆‍♀️',
        prompt: 'Transform to shoulder-length layered hair with versatile medium styling, natural volume and movement, face-framing pieces. Render with dimensional layers and healthy appearance.',
      },
      {
        key: 'updo-elegant',
        label: 'Elegant Updo',
        emoji: '👸',
        prompt: 'Transform to elegant updo hairstyle with hair swept up and secured in sophisticated bun or chignon. Polished formal styling with smooth finish and refined appearance.',
      },
      {
        key: 'ponytail-high',
        label: 'High Ponytail',
        emoji: '🎀',
        prompt: 'Transform to high ponytail with hair pulled up and secured at crown level, sleek or voluminous styling, long flowing tail with natural movement and swing.',
      },
      {
        key: 'braided-style',
        label: 'Braided',
        emoji: '🪢',
        prompt: 'Transform to braided hairstyle with intricate braiding pattern - side braid, crown braid, or French braid with detailed weaving. Render braid texture with proper interlacing and dimensional depth.',
      },
      {
        key: 'messy-bun',
        label: 'Messy Bun',
        emoji: '🎨',
        prompt: 'Transform to messy bun updo with loose effortless styling, casual relaxed aesthetic, wispy strands framing face. Natural undone appearance with textured finish.',
      },
      {
        key: 'bangs-fringe',
        label: 'With Bangs',
        emoji: '✨',
        prompt: 'Add bangs or fringe across forehead following natural brow line, straight-cut or side-swept styling. Face-framing front section with proper weight and texture distribution.',
      },
      {
        key: 'half-up',
        label: 'Half-Up Half-Down',
        emoji: '🌸',
        prompt: 'Transform to half-up half-down hairstyle with top section pulled back and secured, bottom section flowing freely down. Romantic versatile styling with balanced proportions.',
      },
      {
        key: 'space-buns',
        label: 'Space Buns',
        emoji: '🌙',
        prompt: 'Transform to playful space buns with two buns positioned high on head, symmetrical placement. Fun modern styling with cute youthful aesthetic.',
      },
      {
        key: 'slicked-back',
        label: 'Slicked Back',
        emoji: '💎',
        prompt: 'Transform to sleek slicked-back hairstyle with all hair combed straight back from face, glossy polished finish. Sophisticated high-fashion styling with smooth texture.',
      },
      {
        key: 'layered-shag',
        label: 'Layered Shag',
        emoji: '🎸',
        prompt: 'Transform to layered shag cut with choppy textured layers throughout, piece-y separated strands, effortless rocker aesthetic. Dimensional volume with movement and natural texture.',
      },
      {
        key: 'side-swept',
        label: 'Side-Swept',
        emoji: '💫',
        prompt: 'Transform to side-swept hairstyle with dramatic side part, hair swept elegantly to one side. Glamorous asymmetrical styling with volume and movement.',
      },
    ],
  },
  Male: {
    label: 'Male',
    items: [
      {
        key: 'short-crew',
        label: 'Crew Cut',
        emoji: '🪖',
        prompt: 'Transform to short crew cut with closely cropped uniform sides and back, slightly longer top (1-2 inches). Clean military-style precision cut with tapered edges.',
      },
      {
        key: 'buzz-cut',
        label: 'Buzz Cut',
        emoji: '✂️',
        prompt: 'Transform to buzz cut with uniform short length all over (typically #1-#3 guard), clipped close to scalp. Ultra low-maintenance masculine style with even coverage.',
      },
      {
        key: 'undercut-modern',
        label: 'Modern Undercut',
        emoji: '⚡',
        prompt: 'Transform to modern undercut with shaved or very short sides/back (fade or buzz), distinctly longer styled top (3-6 inches). Sharp contrast between lengths with clean lines.',
      },
      {
        key: 'pompadour',
        label: 'Pompadour',
        emoji: '👔',
        prompt: 'Transform to classic pompadour with high volume swept up and back from forehead, shorter tapered sides. Retro structured styling with polished finish and strong hold.',
      },
      {
        key: 'quiff-textured',
        label: 'Textured Quiff',
        emoji: '🌊',
        prompt: 'Transform to textured quiff with hair styled up and slightly forward, messy piece-y texture, natural movement. Modern casual styling with volume concentrated at front.',
      },
      {
        key: 'side-part',
        label: 'Side Part',
        emoji: '💼',
        prompt: 'Transform to classic side part hairstyle with clean sharp part line, hair combed neatly to the side. Professional polished business look with traditional styling.',
      },
      {
        key: 'slicked-back',
        label: 'Slicked Back',
        emoji: '💎',
        prompt: 'Transform to slicked back hair with all hair combed straight back from face, sleek smooth finish with shine. Sophisticated formal masculine style.',
      },
      {
        key: 'messy-textured',
        label: 'Messy Textured',
        emoji: '🎨',
        prompt: 'Transform to messy textured hairstyle with intentionally tousled appearance, natural movement and separation. Casual effortless bedhead aesthetic with piece-y texture.',
      },
      {
        key: 'fade-taper',
        label: 'Fade/Taper',
        emoji: '🔪',
        prompt: 'Transform to fade or taper haircut with gradual smooth length transition from very short sides/back to longer top. Clean modern barbershop cut with blended graduation.',
      },
      {
        key: 'long-flowing',
        label: 'Long Flowing',
        emoji: '🦁',
        prompt: 'Transform to long flowing hair extending past shoulders, natural loose texture cascading freely. Masculine long hair style with natural movement and body.',
      },
      {
        key: 'man-bun',
        label: 'Man Bun',
        emoji: '🥋',
        prompt: 'Transform to man bun with long hair pulled back and tied into bun at crown or back of head. Modern trendy masculine updo with clean pulled-back aesthetic.',
      },
      {
        key: 'mohawk-faux',
        label: 'Faux Hawk',
        emoji: '🦅',
        prompt: 'Transform to faux hawk (fohawk) with center strip of hair styled upward, shorter tapered sides without full shave. Edgy modern style with punk-inspired aesthetic.',
      },
      {
        key: 'curly-top',
        label: 'Curly Top',
        emoji: '🦱',
        prompt: 'Transform to curly top hairstyle with natural tight curls or coils on top, faded or short sides. Embrace natural curl pattern with defined texture and volume.',
      },
      {
        key: 'french-crop',
        label: 'French Crop',
        emoji: '🥐',
        prompt: 'Transform to French crop with short textured fringe across forehead, cropped sides and back. Clean modern European styling with horizontal fringe line.',
      },
      {
        key: 'ivy-league',
        label: 'Ivy League',
        emoji: '🎓',
        prompt: 'Transform to Ivy League cut (long crew cut) with enough length on top to style with side part, tapered sides. Classic collegiate preppy styling.',
      },
      {
        key: 'caesar-cut',
        label: 'Caesar Cut',
        emoji: '🏛️',
        prompt: 'Transform to Caesar cut with short horizontally straight fringe, uniform length all around. Classic Roman-inspired masculine styling with forward brushed fringe.',
      },
    ],
  },
};

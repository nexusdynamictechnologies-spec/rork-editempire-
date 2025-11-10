export type PoseCategoryKey = 'Standing' | 'Action' | 'Sitting' | 'Crouching' | 'Dynamic';

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

export const PRECISION_POSE_SYSTEM_PROMPT = `🎯 POSE TRANSFORMATION - ULTRA-REALISTIC CHARACTER POSITIONING:

You are generating multiple camera angle views of the SAME character in a specific pose. This is a pose transformation system that shows the character from different perspectives.

🚨 CRITICAL REQUIREMENTS:
1. KEEP IDENTITY PERFECT: Face, body, clothing, hair, accessories stay EXACTLY the same
2. KEEP BACKGROUND: Same environment, lighting, and scene context
3. CHANGE ONLY POSE: Transform body position and camera angle as specified
4. FULL BODY FOCUS: Show complete body from head to toe (or close to it depending on pose)
5. NATURAL TRANSITIONS: Pose should look natural and physically possible

💎 MULTI-ANGLE GENERATION:
For each angle view, you must generate the character in the SAME pose but from different camera perspectives:
- Front View: Face and front of body clearly visible
- Left Side: 90° profile from left side
- Right Side: 90° profile from right side  
- Back View: Back of head and body visible

⚡ POSE ACCURACY:
- Body positioning must match the pose description exactly
- Weight distribution and balance must be anatomically correct
- Limb positions must be natural and achievable
- Clothing should drape naturally based on pose and gravity
- Hair should fall naturally based on head position

✨ MAINTAIN CONSISTENCY:
Across all angle views, these must stay IDENTICAL:
- Character's face and identity
- Clothing and accessories
- Hairstyle (though angle may change appearance)
- Body proportions
- Background environment
- Lighting conditions
- Overall mood and atmosphere`;

export const posePresets: Record<PoseCategoryKey, PoseCategory> = {
  Standing: {
    label: 'Standing Poses',
    items: [
      {
        key: 'stand-straight',
        label: 'Standing Straight',
        emoji: '🧍',
        prompt: 'Character standing upright with perfect posture, feet shoulder-width apart, arms relaxed at sides, neutral expression, full body visible from head to toe, confident stance, natural weight distribution',
      },
      {
        key: 'stand-contrapposto',
        label: 'Contrapposto',
        emoji: '💃',
        prompt: 'Character in classic contrapposto pose: weight on one leg (back leg), other leg relaxed with bent knee, hips tilted, shoulders opposing hip angle, one shoulder slightly higher, arms relaxed, elegant S-curve posture, full body visible',
      },
      {
        key: 'stand-arms-crossed',
        label: 'Arms Crossed',
        emoji: '💪',
        prompt: 'Character standing with arms crossed over chest, confident stance, feet shoulder-width apart, slight lean back, direct eye contact with camera, full body visible, authoritative but approachable demeanor',
      },
      {
        key: 'stand-hands-hips',
        label: 'Hands on Hips',
        emoji: '🙌',
        prompt: 'Character standing with hands on hips (power pose), elbows out to sides, chest slightly forward, confident stance, feet shoulder-width apart, full body visible, assertive energy',
      },
      {
        key: 'stand-hands-pockets',
        label: 'Hands in Pockets',
        emoji: '🧥',
        prompt: 'Character standing casually with hands in pockets, relaxed posture, slight hip shift to one side, weight on one leg, shoulders relaxed, full body visible, casual and approachable vibe',
      },
      {
        key: 'stand-leaning',
        label: 'Leaning Pose',
        emoji: '🚶',
        prompt: 'Character standing and leaning against invisible wall or support, one shoulder back, arms crossed or one hand in pocket, relaxed stance, full body visible, casual and cool demeanor',
      },
    ],
  },
  Action: {
    label: 'Action Poses',
    items: [
      {
        key: 'action-running',
        label: 'Running',
        emoji: '🏃',
        prompt: 'Character in dynamic running pose: one leg forward with bent knee, other leg back extended, arms pumping opposite to legs, torso slightly forward, hair and clothing showing motion, full body visible, athletic energy',
      },
      {
        key: 'action-jumping',
        label: 'Jumping',
        emoji: '🤸',
        prompt: 'Character mid-jump with both feet off ground, knees bent, arms raised or extended for balance, body airborne, hair floating upward, clothing showing upward motion, full body visible including ground shadow, dynamic energy',
      },
      {
        key: 'action-fighting',
        label: 'Fighting Stance',
        emoji: '🥊',
        prompt: 'Character in martial arts or boxing stance: feet staggered one forward one back, knees bent, fists raised near face in guard position, weight distributed for quick movement, focused expression, full body visible, combat-ready posture',
      },
      {
        key: 'action-superhero',
        label: 'Superhero Landing',
        emoji: '🦸',
        prompt: 'Character in superhero landing pose: one knee on ground, other leg extended to side, one fist on ground for support, other arm back, head tilted down with eyes looking up, powerful dramatic pose, full body visible, heroic energy',
      },
      {
        key: 'action-dancing',
        label: 'Dancing',
        emoji: '💃',
        prompt: 'Character in mid-dance pose: body twisted with dynamic motion, one arm raised, other arm out to side, one leg supporting weight, other leg extended or stepped, flowing movement, hair and clothing showing motion, full body visible, joyful energy',
      },
      {
        key: 'action-kicking',
        label: 'Kicking',
        emoji: '🦵',
        prompt: 'Character executing high kick: standing leg planted firmly, kicking leg extended upward to waist or chest height, arms positioned for balance, torso leaning slightly back, focused expression, full body visible, martial arts energy',
      },
    ],
  },
  Sitting: {
    label: 'Sitting Poses',
    items: [
      {
        key: 'sit-chair',
        label: 'Chair Sitting',
        emoji: '🪑',
        prompt: 'Character sitting on chair: back straight or slightly leaning back, feet flat on floor, hands on thighs or armrests, comfortable posture, full body visible from head to feet, relaxed demeanor',
      },
      {
        key: 'sit-crosslegged',
        label: 'Cross-Legged',
        emoji: '🧘',
        prompt: 'Character sitting on floor in cross-legged position (lotus or casual), back straight, hands resting on knees or in lap, centered balance, full body visible, meditative or relaxed vibe',
      },
      {
        key: 'sit-floor-legs-side',
        label: 'Sitting Legs to Side',
        emoji: '👸',
        prompt: 'Character sitting on floor with both legs bent to one side, one hand supporting body behind, other hand resting on thigh or lap, elegant posture, full body visible, graceful feminine pose',
      },
      {
        key: 'sit-edge',
        label: 'Sitting on Edge',
        emoji: '🏗️',
        prompt: 'Character sitting on edge of elevated surface (wall, platform): legs dangling down, hands beside body or one behind for support, casual relaxed posture, full body visible, carefree vibe',
      },
      {
        key: 'sit-one-knee-up',
        label: 'One Knee Up',
        emoji: '🦵',
        prompt: 'Character sitting with one leg extended flat, other leg bent with knee up near chest, arm wrapped around raised knee or hand resting on knee, casual comfortable pose, full body visible',
      },
      {
        key: 'sit-legs-crossed',
        label: 'Legs Crossed Formal',
        emoji: '💼',
        prompt: 'Character sitting with legs crossed at knees (one ankle over other knee), back straight, hands in lap or on armrests, professional formal posture, full body visible, business demeanor',
      },
    ],
  },
  Crouching: {
    label: 'Crouching Poses',
    items: [
      {
        key: 'crouch-squat',
        label: 'Deep Squat',
        emoji: '🦆',
        prompt: 'Character in deep squat position: knees bent fully, bottom close to ground, feet flat or on balls of feet, arms resting on knees or hanging between legs, balanced centered posture, full body visible',
      },
      {
        key: 'crouch-one-knee',
        label: 'One Knee Down',
        emoji: '🤴',
        prompt: 'Character kneeling on one knee: one leg bent with knee on ground, other leg bent with foot flat (90-degree angle), upright torso, hands on raised knee or at sides, full body visible, respectful or proposing stance',
      },
      {
        key: 'crouch-ready',
        label: 'Ready Crouch',
        emoji: '🏃',
        prompt: 'Character in athletic ready crouch: knees bent, torso leaning forward, arms ready at sides or forward, weight on balls of feet, coiled spring energy ready to move, full body visible, athletic stance',
      },
      {
        key: 'crouch-sneaking',
        label: 'Sneaking Crouch',
        emoji: '🥷',
        prompt: 'Character in low sneaking crouch: knees deeply bent, body low to ground, one foot forward, arms bent and ready, torso leaning forward, cautious expression, full body visible, stealthy demeanor',
      },
      {
        key: 'crouch-examining',
        label: 'Examining Ground',
        emoji: '🔍',
        prompt: 'Character crouched examining something on ground: knees bent, body leaning forward, one hand reaching toward ground or one knee down, focused downward gaze, full body visible, investigative pose',
      },
    ],
  },
  Dynamic: {
    label: 'Dynamic Poses',
    items: [
      {
        key: 'dynamic-reaching',
        label: 'Reaching Up',
        emoji: '🙋',
        prompt: 'Character reaching upward with one or both arms fully extended overhead, body stretched tall, standing on tiptoes or flat feet, looking up at reaching point, full body visible, striving energy',
      },
      {
        key: 'dynamic-pointing',
        label: 'Pointing Forward',
        emoji: '👉',
        prompt: 'Character pointing forward with arm extended, confident stance, other arm at side or on hip, direct forward gaze following pointing direction, full body visible, commanding presence',
      },
      {
        key: 'dynamic-victory',
        label: 'Victory Pose',
        emoji: '🎉',
        prompt: 'Character in victory celebration: both arms raised high in V-shape, fists clenched or hands open, head tilted back or forward with triumphant expression, full body visible, celebrating energy',
      },
      {
        key: 'dynamic-beckoning',
        label: 'Beckoning',
        emoji: '👋',
        prompt: 'Character beckoning or waving: one arm raised with hand gesturing "come here" motion or waving, friendly expression, other arm relaxed at side, welcoming stance, full body visible, inviting demeanor',
      },
      {
        key: 'dynamic-looking-back',
        label: 'Looking Back',
        emoji: '👀',
        prompt: 'Character looking back over shoulder: body facing away or to side, head turned to look back at camera, one hand may reach up to hair or face, elegant twist in torso, full body visible, mysterious or flirty vibe',
      },
      {
        key: 'dynamic-stretching',
        label: 'Stretching',
        emoji: '🤸',
        prompt: 'Character stretching: arms extended overhead with hands clasped, torso arched back slightly, standing tall, relaxed expression, full body visible, awakening or relaxing energy',
      },
    ],
  },
};

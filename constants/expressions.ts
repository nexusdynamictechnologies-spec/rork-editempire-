export type ExpressionCategoryKey = 'Happy' | 'Sad' | 'Angry' | 'Surprised' | 'Neutral' | 'Playful' | 'Intense';

export interface ExpressionPresetItem {
  key: string;
  label: string;
  prompt: string;
}

export interface ExpressionCategory {
  label: string;
  items: ExpressionPresetItem[];
}

export const expressionPresets: Record<ExpressionCategoryKey, ExpressionCategory> = {
  Happy: {
    label: 'Happy',
    items: [
      {
        key: 'smile-genuine',
        label: 'Genuine Smile',
        prompt: 'Genuine Duchenne smile with raised cheeks, crow\'s feet at eyes, natural teeth showing, warm eye contact, relaxed eyebrows',
      },
      {
        key: 'laugh-joyful',
        label: 'Joyful Laugh',
        prompt: 'Joyful laughing expression with wide open mouth, visible teeth, squinted eyes, raised cheeks, head slightly tilted back',
      },
      {
        key: 'grin-playful',
        label: 'Playful Grin',
        prompt: 'Playful grin with slightly asymmetric smile, one eyebrow raised, mischievous sparkle in eyes, relaxed jaw',
      },
      {
        key: 'smile-content',
        label: 'Content Smile',
        prompt: 'Content peaceful smile with soft closed lips, gentle eye crinkles, serene expression, relaxed facial muscles',
      },
    ],
  },
  Sad: {
    label: 'Sad',
    items: [
      {
        key: 'sad-melancholy',
        label: 'Melancholy',
        prompt: 'Melancholic expression with downturned mouth corners, drooping eyelids, furrowed inner eyebrows, distant gaze',
      },
      {
        key: 'sad-tearful',
        label: 'Tearful',
        prompt: 'Tearful sad expression with glistening eyes, trembling lower lip, raised inner eyebrows, flushed cheeks',
      },
      {
        key: 'sad-disappointed',
        label: 'Disappointed',
        prompt: 'Disappointed expression with pursed lips, lowered gaze, slight frown, tense jaw, subdued demeanor',
      },
      {
        key: 'sad-pensive',
        label: 'Pensive',
        prompt: 'Pensive thoughtful sadness with distant stare, slightly parted lips, relaxed but somber features',
      },
    ],
  },
  Angry: {
    label: 'Angry',
    items: [
      {
        key: 'angry-furious',
        label: 'Furious',
        prompt: 'Furious angry expression with furrowed brows, flared nostrils, clenched jaw, intense glare, tense facial muscles',
      },
      {
        key: 'angry-irritated',
        label: 'Irritated',
        prompt: 'Irritated expression with slightly furrowed brows, tight lips, narrowed eyes, subtle tension in face',
      },
      {
        key: 'angry-scowl',
        label: 'Scowling',
        prompt: 'Deep scowl with lowered brows, wrinkled nose bridge, downturned mouth, piercing stare',
      },
      {
        key: 'angry-rage',
        label: 'Rage',
        prompt: 'Explosive rage with wide eyes, bared teeth, raised upper lip, bulging veins, red flushed face',
      },
    ],
  },
  Surprised: {
    label: 'Surprised',
    items: [
      {
        key: 'surprise-shocked',
        label: 'Shocked',
        prompt: 'Shocked surprise with wide open eyes, raised eyebrows, open mouth forming O-shape, frozen expression',
      },
      {
        key: 'surprise-amazed',
        label: 'Amazed',
        prompt: 'Amazed expression with wide eyes, raised eyebrows, slight smile, wonder-filled gaze',
      },
      {
        key: 'surprise-startled',
        label: 'Startled',
        prompt: 'Startled expression with suddenly widened eyes, raised eyebrows, slightly open mouth, alert posture',
      },
      {
        key: 'surprise-astonished',
        label: 'Astonished',
        prompt: 'Astonished expression with extremely wide eyes, dramatically raised eyebrows, jaw dropped, disbelief visible',
      },
    ],
  },
  Neutral: {
    label: 'Neutral',
    items: [
      {
        key: 'neutral-calm',
        label: 'Calm',
        prompt: 'Calm neutral expression with relaxed facial muscles, soft gaze, closed or slightly parted lips, peaceful demeanor',
      },
      {
        key: 'neutral-serious',
        label: 'Serious',
        prompt: 'Serious neutral expression with straight mouth, focused eyes, composed features, professional demeanor',
      },
      {
        key: 'neutral-contemplative',
        label: 'Contemplative',
        prompt: 'Contemplative neutral expression with thoughtful gaze, slightly furrowed brow, relaxed mouth',
      },
      {
        key: 'neutral-stoic',
        label: 'Stoic',
        prompt: 'Stoic expressionless face with minimal muscle tension, blank stare, emotionally controlled features',
      },
    ],
  },
  Playful: {
    label: 'Playful',
    items: [
      {
        key: 'playful-wink',
        label: 'Winking',
        prompt: 'Playful wink with one eye closed, raised cheek on winking side, slight smile, flirtatious expression',
      },
      {
        key: 'playful-tongue',
        label: 'Tongue Out',
        prompt: 'Playful expression with tongue sticking out, scrunched nose, squinted eyes, cheeky grin',
      },
      {
        key: 'playful-smirk',
        label: 'Smirk',
        prompt: 'Confident smirk with asymmetric smile, one corner of mouth raised, knowing look in eyes',
      },
      {
        key: 'playful-silly',
        label: 'Silly Face',
        prompt: 'Silly playful expression with crossed eyes, puffed cheeks, exaggerated features, comedic look',
      },
    ],
  },
  Intense: {
    label: 'Intense',
    items: [
      {
        key: 'intense-determined',
        label: 'Determined',
        prompt: 'Determined intense expression with focused eyes, set jaw, slightly furrowed brows, resolute features',
      },
      {
        key: 'intense-seductive',
        label: 'Seductive',
        prompt: 'Seductive intense expression with half-lidded eyes, parted lips, sultry gaze, raised chin',
      },
      {
        key: 'intense-fierce',
        label: 'Fierce',
        prompt: 'Fierce intense expression with piercing stare, flared nostrils, tight lips, powerful presence',
      },
      {
        key: 'intense-mysterious',
        label: 'Mysterious',
        prompt: 'Mysterious intense expression with enigmatic slight smile, penetrating gaze, subtle intrigue in features',
      },
    ],
  },
};

export interface DragonBallCharacter {
  name: string;
  aliases: string[];
  race: string;
  transformations: string[];
  detailedDescription: string;
  visualKeywords: string[];
  powerUpEffects: string[];
  signatureAttacks: string[];
  consistencyPrompt: string;
}

export const DRAGON_BALL_Z_CHARACTERS: DragonBallCharacter[] = [
  {
    name: "Goku",
    aliases: ["goku", "kakarot", "son goku"],
    race: "Saiyan",
    transformations: ["Base", "Super Saiyan", "Super Saiyan 2", "Super Saiyan 3", "Super Saiyan God", "Super Saiyan Blue", "Ultra Instinct", "Mastered Ultra Instinct"],
    detailedDescription: "Main protagonist, pure-hearted Saiyan warrior with spiky black hair",
    visualKeywords: ["spiky black hair", "orange gi", "blue undershirt", "blue boots", "power pole", "nimbus cloud", "muscular build", "tail (early series)"],
    powerUpEffects: ["golden aura", "lightning sparks", "silver-white hair glow", "blue divine aura", "red god aura", "ground cracking", "energy waves"],
    signatureAttacks: ["Kamehameha", "Spirit Bomb", "Instant Transmission", "Dragon Fist", "Kaioken"],
    consistencyPrompt: "Goku from Dragon Ball Z: spiky jet-black hair standing upward, orange gi with blue undershirt and wristbands, blue boots, muscular athletic build, confident fighting stance, determined expression with black eyes, Saiyan warrior appearance. When transformed: Super Saiyan (golden spiky hair, teal eyes, golden aura), SSJ2 (sharper hair, lightning), SSJ3 (long golden hair to waist, no eyebrows), SSJ God (red hair, slimmer, red aura), SSJ Blue (blue hair, blue aura), Ultra Instinct (silver-white hair, calm expression, silver aura with particles)"
  },
  {
    name: "Vegeta",
    aliases: ["vegeta", "prince vegeta"],
    race: "Saiyan",
    transformations: ["Base", "Super Saiyan", "Super Saiyan 2", "Super Saiyan God", "Super Saiyan Blue", "Ultra Ego"],
    detailedDescription: "Prince of Saiyans, proud warrior with widow's peak hairstyle",
    visualKeywords: ["widow's peak hair", "black flame-shaped hair", "blue battle suit", "white gloves", "white boots", "royal pride", "crossed arms pose"],
    powerUpEffects: ["golden aura", "lightning bolts", "blue divine energy", "purple destruction aura", "intense power waves"],
    signatureAttacks: ["Final Flash", "Galick Gun", "Big Bang Attack", "Final Explosion"],
    consistencyPrompt: "Vegeta from Dragon Ball Z: distinctive widow's peak black hair in flame shape, blue Saiyan battle armor with white gloves and boots, muscular build, proud stance with crossed arms, intense expression, royal Saiyan warrior. Transformations: Super Saiyan (golden hair maintaining widow's peak, golden aura), SSJ2 (sharper spikes, lightning), SSJ God (red hair, red aura), SSJ Blue (blue hair, blue divine aura), Ultra Ego (purple hair, purple destruction aura)"
  },
  {
    name: "Gohan",
    aliases: ["gohan", "son gohan", "great saiyaman"],
    race: "Half-Saiyan",
    transformations: ["Base", "Super Saiyan", "Super Saiyan 2", "Ultimate Gohan", "Beast Gohan"],
    detailedDescription: "Goku's son, scholar and warrior with immense hidden potential",
    visualKeywords: ["black spiky hair", "purple gi", "orange gi (early)", "glasses (scholar)", "great saiyaman costume", "gentle expression"],
    powerUpEffects: ["white-silver aura", "lightning sparks", "mystic power glow", "beast transformation silver-white hair"],
    signatureAttacks: ["Masenko", "Kamehameha", "Special Beam Cannon"],
    consistencyPrompt: "Gohan from Dragon Ball Z: black spiky hair similar to Goku but slightly softer, purple gi with orange undershirt or orange gi, gentle scholarly appearance, half-Saiyan features. Transformations: SSJ (golden hair, golden aura), SSJ2 (sharper hair, lightning, more aggressive), Ultimate/Mystic (white aura, base hair, calm power), Beast (silver-white spiky hair, red eyes, intense silver aura)"
  },
  {
    name: "Piccolo",
    aliases: ["piccolo", "piccolo jr", "demon king piccolo"],
    race: "Namekian",
    transformations: ["Base", "Orange Piccolo", "Orange Piccolo (Giant Form)"],
    detailedDescription: "Green Namekian warrior with antennae and cape",
    visualKeywords: ["green skin", "pink muscle patches", "antennae", "pointed ears", "white cape", "purple gi", "turban", "weighted clothing"],
    powerUpEffects: ["orange transformation glow", "giant form growth", "regeneration ability"],
    signatureAttacks: ["Special Beam Cannon", "Hellzone Grenade", "Light Grenade"],
    consistencyPrompt: "Piccolo from Dragon Ball Z: green Namekian skin with pink muscle patches on arms, two antennae on forehead, pointed ears, white weighted cape and turban, purple gi with belt, serious stoic expression, tall muscular build. Orange Piccolo: bright orange skin, more muscular, orange aura, enhanced power appearance"
  },
  {
    name: "Trunks",
    aliases: ["trunks", "future trunks", "kid trunks"],
    race: "Half-Saiyan",
    transformations: ["Base", "Super Saiyan", "Super Saiyan 2", "Super Saiyan Rage"],
    detailedDescription: "Vegeta's son, time traveler with purple hair and sword",
    visualKeywords: ["purple/lavender hair", "blue jacket", "sword", "capsule corp jacket", "black tank top", "blue jeans (future)", "confident expression"],
    powerUpEffects: ["golden aura", "blue rage aura", "lightning sparks", "sword energy glow"],
    signatureAttacks: ["Burning Attack", "Final Flash", "Shining Sword Attack", "Heat Dome Attack"],
    consistencyPrompt: "Trunks from Dragon Ball Z: purple/lavender hair (short spiky for kid, long for future), blue Capsule Corp jacket, sword on back (future version), half-Saiyan features, confident warrior stance. Future Trunks: longer hair, blue jacket, black tank top, sword. Transformations: SSJ (golden hair, golden aura), SSJ Rage (blue aura mixed with golden, intense power)"
  },
  {
    name: "Goten",
    aliases: ["goten", "son goten"],
    race: "Half-Saiyan",
    transformations: ["Base", "Super Saiyan", "Gotenks (fusion)"],
    detailedDescription: "Goku's youngest son, looks identical to young Goku",
    visualKeywords: ["spiky black hair like young Goku", "orange gi", "blue undershirt", "innocent child appearance", "playful expression"],
    powerUpEffects: ["golden aura", "fusion dance energy", "playful power display"],
    signatureAttacks: ["Kamehameha", "Fusion Dance"],
    consistencyPrompt: "Goten from Dragon Ball Z: spiky black hair identical to young Goku, orange gi with blue undershirt, child appearance, innocent playful expression, half-Saiyan features. SSJ: golden spiky hair, golden aura, maintains childlike appearance"
  },
  {
    name: "Gotenks",
    aliases: ["gotenks", "goten and trunks fusion"],
    race: "Half-Saiyan Fusion",
    transformations: ["Base", "Super Saiyan", "Super Saiyan 3"],
    detailedDescription: "Fusion of Goten and Trunks, cocky and powerful",
    visualKeywords: ["mixed hair style", "white vest", "black shirt", "orange belt", "confident cocky expression", "fusion earrings"],
    powerUpEffects: ["golden aura", "SSJ3 long golden hair", "dramatic power display", "ghost kamikaze attack"],
    signatureAttacks: ["Super Ghost Kamikaze Attack", "Galactic Donut", "Die Die Missile Barrage"],
    consistencyPrompt: "Gotenks from Dragon Ball Z: fusion of Goten and Trunks, mixed hairstyle combining both, white vest with black shirt, orange belt, cocky confident expression, child-like but powerful appearance. SSJ3: extremely long golden hair flowing down, no eyebrows, golden aura, dramatic power pose"
  },
  {
    name: "Krillin",
    aliases: ["krillin", "kuririn"],
    race: "Human",
    transformations: ["Base"],
    detailedDescription: "Bald martial artist, Goku's best friend",
    visualKeywords: ["bald head", "six dots on forehead", "orange gi", "turtle school uniform", "short stature", "determined expression"],
    powerUpEffects: ["white ki aura", "destructo disc energy", "power up glow"],
    signatureAttacks: ["Destructo Disc", "Solar Flare", "Kamehameha"],
    consistencyPrompt: "Krillin from Dragon Ball Z: completely bald head with six incense burn dots on forehead, orange turtle school gi, short stature, muscular build for size, determined brave expression, human martial artist, no nose detail"
  },
  {
    name: "Frieza",
    aliases: ["frieza", "freeza"],
    race: "Frost Demon",
    transformations: ["First Form", "Second Form", "Third Form", "Final Form", "Golden Frieza"],
    detailedDescription: "Galactic tyrant with multiple transformation forms",
    visualKeywords: ["white and purple body", "tail", "bio-armor", "red eyes", "horns (first form)", "smooth head (final form)", "evil smirk"],
    powerUpEffects: ["purple aura", "golden transformation", "planet destruction energy", "death beam"],
    signatureAttacks: ["Death Beam", "Death Ball", "Supernova", "Golden form power"],
    consistencyPrompt: "Frieza from Dragon Ball Z: First Form (white body with purple bio-armor, horns, tail, red eyes, evil expression). Final Form (smooth white head, purple sections on body, shorter, more compact, tail, red eyes, sinister smile). Golden Frieza (entire body golden, purple sections become golden, golden aura, red eyes, ultimate power form)"
  },
  {
    name: "Cell",
    aliases: ["cell", "perfect cell"],
    race: "Bio-Android",
    transformations: ["Imperfect Cell", "Semi-Perfect Cell", "Perfect Cell", "Super Perfect Cell"],
    detailedDescription: "Bio-engineered android with DNA from all fighters",
    visualKeywords: ["green bio-armor", "black spots", "insect-like features", "tail", "wings (perfect form)", "crown-like head", "purple sections"],
    powerUpEffects: ["green aura", "bio-electric energy", "regeneration glow", "perfect form wings"],
    signatureAttacks: ["Kamehameha", "Special Beam Cannon", "Solar Flare", "Perfect Barrier"],
    consistencyPrompt: "Cell from Dragon Ball Z: Perfect Cell form - green bio-organic armor with black spots, insect-like features, purple sections on shoulders and legs, crown-like head crest, wings on back, tail, confident smirk, bio-android appearance combining features of all Z fighters"
  },
  {
    name: "Majin Buu",
    aliases: ["majin buu", "buu", "kid buu", "super buu"],
    race: "Majin",
    transformations: ["Fat Buu", "Super Buu", "Kid Buu"],
    detailedDescription: "Pink magical creature with regeneration abilities",
    visualKeywords: ["pink skin", "antenna on head", "white pants", "childlike appearance (fat buu)", "muscular (super buu)", "pure evil (kid buu)", "steam vents"],
    powerUpEffects: ["pink energy", "regeneration smoke", "absorption ability", "destruction waves"],
    signatureAttacks: ["Candy Beam", "Human Extinction Attack", "Planet Burst"],
    consistencyPrompt: "Majin Buu from Dragon Ball Z: Fat Buu (pink skin, chubby childlike body, antenna on head, white pants, innocent expression, steam vents on head). Super Buu (pink skin, tall muscular build, torn white pants, evil expression, antenna). Kid Buu (pink skin, small pure evil form, no clothing except white pants, insane expression, most dangerous form)"
  },
  {
    name: "Broly",
    aliases: ["broly", "legendary super saiyan"],
    race: "Saiyan",
    transformations: ["Base", "Super Saiyan", "Legendary Super Saiyan", "Super Saiyan Full Power"],
    detailedDescription: "Legendary Super Saiyan with immense power",
    visualKeywords: ["massive muscular build", "wild spiky hair", "green aura", "golden-green hair (legendary)", "purple pants", "gold belt", "savage expression"],
    powerUpEffects: ["green legendary aura", "massive muscle growth", "golden-green energy", "overwhelming power waves"],
    signatureAttacks: ["Eraser Cannon", "Gigantic Meteor", "Blaster Meteor"],
    consistencyPrompt: "Broly from Dragon Ball Z: massive muscular Saiyan build, wild spiky black hair, purple pants with gold belt and wristbands, savage powerful expression. Legendary SSJ: golden-green hair, massive muscle increase, green aura with golden tint, overwhelming power presence, berserker appearance"
  },
  {
    name: "Android 17",
    aliases: ["android 17", "lapis"],
    race: "Android",
    transformations: ["Base"],
    detailedDescription: "Human-based android with infinite energy",
    visualKeywords: ["black hair", "orange bandana", "blue denim vest", "black shirt", "jeans", "red scarf", "cool expression"],
    powerUpEffects: ["blue energy barrier", "infinite energy glow", "android power"],
    signatureAttacks: ["Power Blitz", "Barrier", "Android Kick"],
    consistencyPrompt: "Android 17 from Dragon Ball Z: black straight hair, orange bandana, blue denim vest over black shirt, jeans, red scarf, cool calm expression, android features, infinite energy aura"
  },
  {
    name: "Android 18",
    aliases: ["android 18", "lazuli"],
    race: "Android",
    transformations: ["Base"],
    detailedDescription: "Human-based android, 17's twin sister",
    visualKeywords: ["blonde short hair", "blue denim jacket", "black shirt", "striped sleeves", "blue eyes", "confident expression"],
    powerUpEffects: ["blue energy barrier", "infinite energy", "android power glow"],
    signatureAttacks: ["Power Blitz", "Infinity Bullet", "Destructo Disc"],
    consistencyPrompt: "Android 18 from Dragon Ball Z: short blonde hair, blue denim jacket and skirt, black shirt with striped sleeves, blue eyes, confident cool expression, android features, infinite energy presence"
  },
  {
    name: "Tien",
    aliases: ["tien", "tenshinhan", "tien shinhan"],
    race: "Human",
    transformations: ["Base", "Four Witches Technique"],
    detailedDescription: "Three-eyed martial artist with powerful techniques",
    visualKeywords: ["three eyes", "bald head", "green gi", "serious expression", "muscular build", "third eye on forehead"],
    powerUpEffects: ["white ki aura", "tri-beam energy", "four arms technique"],
    signatureAttacks: ["Tri-Beam", "Solar Flare", "Dodon Ray", "Four Witches Technique"],
    consistencyPrompt: "Tien from Dragon Ball Z: bald head with distinctive third eye on forehead, green Chinese-style gi, serious stoic expression, tall muscular build, three-eyed human martial artist, intense focused gaze"
  },
  {
    name: "Yamcha",
    aliases: ["yamcha"],
    race: "Human",
    transformations: ["Base"],
    detailedDescription: "Desert bandit turned martial artist",
    visualKeywords: ["black spiky hair", "orange gi", "scars on face", "confident expression", "martial arts stance"],
    powerUpEffects: ["white ki aura", "wolf fang energy"],
    signatureAttacks: ["Wolf Fang Fist", "Spirit Ball", "Kamehameha"],
    consistencyPrompt: "Yamcha from Dragon Ball Z: black spiky hair, scars on face, orange gi or casual outfit, confident martial artist expression, human fighter appearance, athletic build"
  },
  {
    name: "Master Roshi",
    aliases: ["master roshi", "muten roshi", "turtle hermit"],
    race: "Human",
    transformations: ["Base", "Max Power"],
    detailedDescription: "Ancient martial arts master, creator of Kamehameha",
    visualKeywords: ["bald head", "white beard", "sunglasses", "turtle shell", "orange gi", "elderly appearance", "walking stick"],
    powerUpEffects: ["max power muscle form", "white ki aura", "kamehameha energy"],
    signatureAttacks: ["Kamehameha", "Max Power", "Thunder Shock Surprise"],
    consistencyPrompt: "Master Roshi from Dragon Ball Z: elderly bald man with white beard and mustache, sunglasses, turtle shell on back, orange gi, walking stick, wise master appearance. Max Power: massive muscular transformation, maintains beard and sunglasses"
  },
  {
    name: "Beerus",
    aliases: ["beerus", "god of destruction"],
    race: "God of Destruction",
    transformations: ["Base"],
    detailedDescription: "Purple cat-like God of Destruction",
    visualKeywords: ["purple cat-like appearance", "large pointed ears", "Egyptian god clothing", "gold ornaments", "tail", "sleepy eyes", "divine presence"],
    powerUpEffects: ["purple destruction energy", "hakai energy", "divine aura", "destruction spheres"],
    signatureAttacks: ["Hakai", "Sphere of Destruction", "God of Destruction's Wrath"],
    consistencyPrompt: "Beerus from Dragon Ball Z: purple cat-like humanoid appearance, large pointed ears, Egyptian god-style clothing with gold ornaments, long tail, sleepy but powerful eyes, divine God of Destruction presence, purple destruction aura"
  },
  {
    name: "Whis",
    aliases: ["whis"],
    race: "Angel",
    transformations: ["Base"],
    detailedDescription: "Angel attendant to Beerus, master of Ultra Instinct",
    visualKeywords: ["blue skin", "white hair", "angel staff", "purple and white robes", "calm expression", "floating halo ring", "divine presence"],
    powerUpEffects: ["blue angel aura", "time manipulation glow", "ultra instinct mastery"],
    signatureAttacks: ["Temporal Do-Over", "Ultra Instinct", "Angel techniques"],
    consistencyPrompt: "Whis from Dragon Ball Z: light blue skin, white hair styled upward, angel staff with floating cube, purple and white Egyptian-style robes, calm serene expression, floating halo ring above head, divine angel presence"
  },
  {
    name: "Jiren",
    aliases: ["jiren", "jiren the gray"],
    race: "Alien",
    transformations: ["Base", "Full Power", "Limit Breaker"],
    detailedDescription: "Powerful Pride Trooper with overwhelming strength",
    visualKeywords: ["gray alien appearance", "large muscular build", "red and black uniform", "intense eyes", "bald head", "stoic expression"],
    powerUpEffects: ["red power aura", "overwhelming energy waves", "limit breaker glow", "intense heat"],
    signatureAttacks: ["Power Impact", "Infinity Rush", "Omegaheat Magnetron"],
    consistencyPrompt: "Jiren from Dragon Ball Z: gray alien skin, massive muscular build, bald head, intense piercing eyes, red and black Pride Trooper uniform, stoic powerful expression, overwhelming presence. Full Power: red aura, even more muscular, intense energy glow"
  },
  {
    name: "Hit",
    aliases: ["hit", "legendary assassin"],
    race: "Alien",
    transformations: ["Base", "Pure Progress"],
    detailedDescription: "Legendary assassin with time-skip ability",
    visualKeywords: ["purple skin", "tall lean build", "assassin outfit", "hands in pockets", "cool expression", "red eyes"],
    powerUpEffects: ["purple time-skip aura", "time manipulation effects", "assassination techniques"],
    signatureAttacks: ["Time-Skip", "Flash Fist Crush", "Pure Progress"],
    consistencyPrompt: "Hit from Dragon Ball Z: purple alien skin, tall lean muscular build, assassin outfit with high collar, hands often in pockets, cool calm expression, red eyes, legendary assassin presence, purple time-manipulation aura"
  }
];

export const DRAGON_BALL_POWER_UPS = [
  "Super Saiyan transformation with golden spiky hair and golden aura",
  "Super Saiyan 2 with sharper hair spikes and lightning bolts",
  "Super Saiyan 3 with long golden hair flowing to waist and no eyebrows",
  "Super Saiyan God with red hair and divine red aura",
  "Super Saiyan Blue with blue hair and blue divine aura",
  "Ultra Instinct with silver-white hair and calm silver aura with particles",
  "Mastered Ultra Instinct with complete silver-white hair and overwhelming silver aura",
  "Kaioken with red aura surrounding body",
  "Great Ape transformation into giant ape form",
  "Golden Great Ape with golden fur and Super Saiyan power",
  "Super Saiyan 4 with red fur, black hair, and red aura",
  "Fusion Dance with dramatic pose and energy burst",
  "Potara Fusion with earring glow and power combination",
  "Spirit Bomb energy gathering from all living things",
  "Kamehameha blue energy wave attack",
  "Final Flash yellow energy beam",
  "Galick Gun purple energy wave",
  "Special Beam Cannon spiral energy drill",
  "Destructo Disc spinning energy blade",
  "Solar Flare blinding light technique"
];

export const DRAGON_BALL_VISUAL_EFFECTS = [
  "Intense power aura surrounding character",
  "Ground cracking and rocks floating from power",
  "Lightning bolts crackling around body",
  "Energy waves radiating outward",
  "Dramatic wind and debris effects",
  "Glowing eyes with power",
  "Muscle definition increase during power up",
  "Hair standing up and glowing",
  "Energy particles floating around character",
  "Explosive transformation burst",
  "Speed lines and motion blur",
  "Energy blasts and beams",
  "Dramatic lighting and shadows",
  "Battle damage and torn clothing",
  "Intense facial expressions",
  "Dynamic action poses",
  "Energy shields and barriers",
  "Teleportation effects",
  "Time manipulation visual distortion",
  "Divine god energy glow"
];

export function findDragonBallCharacter(input: string): DragonBallCharacter | null {
  const normalized = input.toLowerCase().trim();
  
  for (const character of DRAGON_BALL_Z_CHARACTERS) {
    if (character.name.toLowerCase() === normalized) {
      return character;
    }
    
    for (const alias of character.aliases) {
      if (alias.toLowerCase() === normalized || normalized.includes(alias.toLowerCase())) {
        return character;
      }
    }
  }
  
  return null;
}

export function enhancePromptWithDragonBall(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  for (const character of DRAGON_BALL_Z_CHARACTERS) {
    for (const alias of character.aliases) {
      if (lower.includes(alias.toLowerCase())) {
        console.log(`🐉 Dragon Ball Z character detected: ${character.name}`);
        
        let enhancedPrompt = `${prompt}\n\n🐉 DRAGON BALL Z CHARACTER PROTOCOL - ${character.name.toUpperCase()}:\n${character.consistencyPrompt}\n\n`;
        
        enhancedPrompt += `⚡ POWER-UP & TRANSFORMATION MASTERY:\n`;
        enhancedPrompt += `- Race: ${character.race}\n`;
        enhancedPrompt += `- Available Transformations: ${character.transformations.join(', ')}\n`;
        enhancedPrompt += `- Signature Visual Effects: ${character.powerUpEffects.join(', ')}\n`;
        enhancedPrompt += `- Iconic Attacks: ${character.signatureAttacks.join(', ')}\n\n`;
        
        enhancedPrompt += `🎨 DRAGON BALL Z VISUAL STYLE REQUIREMENTS:\n`;
        enhancedPrompt += `- Maintain authentic Dragon Ball Z/Super anime art style and character design\n`;
        enhancedPrompt += `- Preserve character's iconic appearance, proportions, and distinctive features\n`;
        enhancedPrompt += `- Apply dramatic power-up effects with intense energy auras and visual impact\n`;
        enhancedPrompt += `- Include signature visual elements: ${character.visualKeywords.join(', ')}\n`;
        enhancedPrompt += `- Ensure character is INSTANTLY RECOGNIZABLE as ${character.name} from Dragon Ball Z\n\n`;
        
        enhancedPrompt += `✨ CARTOON TO REALISTIC CONVERSION (if requested):\n`;
        enhancedPrompt += `When converting Dragon Ball Z cartoon/anime style to realistic:\n`;
        enhancedPrompt += `- Transform anime features into photorealistic human/alien anatomy while preserving character identity\n`;
        enhancedPrompt += `- Convert stylized hair into realistic hair texture and volume that maintains the iconic shape\n`;
        enhancedPrompt += `- Translate anime clothing into real fabric materials with authentic textures and physics\n`;
        enhancedPrompt += `- Transform energy auras into realistic light effects, plasma, and energy phenomena\n`;
        enhancedPrompt += `- Convert anime skin tones into realistic skin with proper subsurface scattering\n`;
        enhancedPrompt += `- Maintain character's distinctive facial features and proportions in realistic form\n`;
        enhancedPrompt += `- Apply realistic muscle definition and body proportions while keeping character recognizable\n`;
        enhancedPrompt += `- Transform power-up effects into realistic energy, electricity, and light phenomena\n`;
        enhancedPrompt += `- Preserve character's personality and essence in the realistic interpretation\n`;
        enhancedPrompt += `- Ensure the realistic version is clearly identifiable as ${character.name}\n\n`;
        
        return enhancedPrompt;
      }
    }
  }
  
  if (/(dragon\s*ball|dbz|db\s*super|saiyan|kamehameha|super\s*saiyan|ultra\s*instinct)/i.test(lower)) {
    console.log('🐉 Dragon Ball Z universe detected in prompt');
    
    let enhancedPrompt = `${prompt}\n\n🐉 DRAGON BALL Z UNIVERSE PROTOCOL:\n\n`;
    
    enhancedPrompt += `⚡ TRANSFORMATION & POWER-UP EFFECTS:\n`;
    enhancedPrompt += `Apply authentic Dragon Ball Z transformation and power-up visual effects:\n`;
    for (const effect of DRAGON_BALL_POWER_UPS.slice(0, 10)) {
      enhancedPrompt += `- ${effect}\n`;
    }
    enhancedPrompt += `\n`;
    
    enhancedPrompt += `🎨 DRAGON BALL Z VISUAL EFFECTS:\n`;
    enhancedPrompt += `Include dramatic Dragon Ball Z visual effects:\n`;
    for (const effect of DRAGON_BALL_VISUAL_EFFECTS.slice(0, 10)) {
      enhancedPrompt += `- ${effect}\n`;
    }
    enhancedPrompt += `\n`;
    
    enhancedPrompt += `✨ CARTOON TO REALISTIC CONVERSION (if requested):\n`;
    enhancedPrompt += `When converting Dragon Ball Z cartoon/anime to realistic:\n`;
    enhancedPrompt += `- Transform anime art style into photorealistic rendering while preserving character essence\n`;
    enhancedPrompt += `- Convert stylized features into realistic human/alien anatomy\n`;
    enhancedPrompt += `- Translate energy effects into realistic plasma, electricity, and light phenomena\n`;
    enhancedPrompt += `- Apply realistic materials, textures, and lighting to all elements\n`;
    enhancedPrompt += `- Maintain the epic scale and dramatic impact of Dragon Ball Z\n`;
    enhancedPrompt += `- Preserve character identities and iconic visual elements in realistic form\n`;
    enhancedPrompt += `- Ensure transformations and power-ups look believable in realistic style\n\n`;
    
    return enhancedPrompt;
  }
  
  return prompt;
}

export function getAllDragonBallCharacters(): string[] {
  return DRAGON_BALL_Z_CHARACTERS.map(char => char.name);
}

export function searchDragonBallCharacters(query: string): DragonBallCharacter[] {
  const normalized = query.toLowerCase().trim();
  
  return DRAGON_BALL_Z_CHARACTERS.filter(character => {
    if (character.name.toLowerCase().includes(normalized)) return true;
    
    for (const alias of character.aliases) {
      if (alias.toLowerCase().includes(normalized)) return true;
    }
    
    for (const keyword of character.visualKeywords) {
      if (keyword.toLowerCase().includes(normalized)) return true;
    }
    
    return false;
  });
}

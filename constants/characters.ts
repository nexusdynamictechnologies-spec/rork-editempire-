export interface CharacterDefinition {
  name: string;
  aliases: string[];
  category: 'mortal_kombat' | 'poppy_playtime' | 'horror' | 'marvel' | 'dc' | 'gaming' | 'anime' | 'disney' | 'cartoon_network';
  detailedDescription: string;
  visualKeywords: string[];
  consistencyPrompt: string;
  weaponGuidance?: string;
}

export const MORTAL_KOMBAT_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Scorpion",
    aliases: ["scorpion", "hanzo hasashi", "hanzo"],
    category: "mortal_kombat",
    detailedDescription: "Iconic yellow ninja specter with skull mask",
    visualKeywords: ["yellow ninja outfit", "skull mask", "kunai rope dart", "hellfire powers", "black and yellow color scheme", "ninja warrior", "undead specter"],
    consistencyPrompt: "Scorpion from Mortal Kombat: yellow ninja outfit with black accents, white skull-shaped mask covering face, yellow hood, black tactical armor plates, kunai rope dart weapon, hellfire visual effects, undead specter appearance, martial arts stance, iconic 'Get Over Here!' pose potential"
  },
  {
    name: "Sub-Zero",
    aliases: ["sub-zero", "sub zero", "kuai liang", "bi-han"],
    category: "mortal_kombat",
    detailedDescription: "Blue ice ninja with cryomancer powers",
    visualKeywords: ["blue ninja outfit", "ice powers", "cryomancer", "blue and black color scheme", "ice mask", "frozen effects", "Lin Kuei warrior"],
    consistencyPrompt: "Sub-Zero from Mortal Kombat: blue ninja outfit with black accents, ice-blue mask covering lower face, blue hood, black tactical armor with ice crystalline details, cryomancer ice powers visual effects, frozen mist emanating from body, martial arts ice warrior stance, ice sword or ice ball attack pose potential"
  },
  {
    name: "Raiden",
    aliases: ["raiden", "lord raiden"],
    category: "mortal_kombat",
    detailedDescription: "Thunder god with conical hat and lightning powers",
    visualKeywords: ["white conical hat", "lightning powers", "thunder god", "white robes", "glowing blue eyes", "electricity effects", "god of thunder"],
    consistencyPrompt: "Raiden from Mortal Kombat: white conical straw hat, white flowing robes with blue accents, glowing blue eyes with white pupils, long white hair, lightning and electricity crackling around body, thunder god appearance, divine martial artist stance, electric staff or lightning bolt attack pose potential"
  },
  {
    name: "Liu Kang",
    aliases: ["liu kang", "liu"],
    category: "mortal_kombat",
    detailedDescription: "Shaolin monk champion with fire powers",
    visualKeywords: ["red headband", "black pants", "bare chest", "fire powers", "dragon tattoo", "Shaolin monk", "martial arts master"],
    consistencyPrompt: "Liu Kang from Mortal Kombat: red headband tied around forehead, muscular bare chest, black martial arts pants with red sash, dragon-themed tattoos, fire powers with flame effects around fists and feet, Shaolin monk appearance, classic kung fu fighting stance, bicycle kick or dragon fire pose potential"
  },
  {
    name: "Kitana",
    aliases: ["kitana", "princess kitana"],
    category: "mortal_kombat",
    detailedDescription: "Princess assassin with steel fans",
    visualKeywords: ["blue outfit", "steel fans", "princess", "mask", "long black hair", "Edenian warrior", "royal assassin"],
    consistencyPrompt: "Kitana from Mortal Kombat: royal blue outfit with gold accents, blue mask covering lower face, long flowing black hair, steel bladed fans as weapons, princess warrior appearance, elegant yet deadly stance, graceful martial artist pose with fans extended"
  },
  {
    name: "Mileena",
    aliases: ["mileena"],
    category: "mortal_kombat",
    detailedDescription: "Tarkatan clone with sai weapons and monstrous teeth",
    visualKeywords: ["purple outfit", "sai weapons", "sharp teeth", "mask", "clone warrior", "Tarkatan features", "deadly assassin"],
    consistencyPrompt: "Mileena from Mortal Kombat: purple ninja outfit with pink accents, purple mask covering lower face (when masked), sharp Tarkatan teeth visible when unmasked, yellow glowing eyes, twin sai weapons, aggressive warrior stance, feral and deadly appearance"
  },
  {
    name: "Johnny Cage",
    aliases: ["johnny cage", "cage", "johnny"],
    category: "mortal_kombat",
    detailedDescription: "Hollywood action star martial artist with green energy powers",
    visualKeywords: ["sunglasses", "Hollywood star", "green energy", "cocky attitude", "martial artist", "action hero", "celebrity fighter"],
    consistencyPrompt: "Johnny Cage from Mortal Kombat: designer sunglasses, Hollywood action star appearance, expensive tactical gear or stylish fighting outfit, green energy glow effects around fists, confident cocky expression, celebrity martial artist stance, shadow kick or nut punch pose potential"
  },
  {
    name: "Sonya Blade",
    aliases: ["sonya blade", "sonya"],
    category: "mortal_kombat",
    detailedDescription: "Special Forces soldier with energy rings",
    visualKeywords: ["military outfit", "blonde hair", "Special Forces", "energy rings", "tactical gear", "soldier", "combat specialist"],
    consistencyPrompt: "Sonya Blade from Mortal Kombat: military Special Forces tactical outfit, blonde hair in ponytail or short style, combat boots, tactical vest and gear, pink/purple energy ring projectiles, professional soldier appearance, military combat stance, leg grab or energy ring attack pose potential"
  },
  {
    name: "Jax",
    aliases: ["jax", "jax briggs", "jackson briggs"],
    category: "mortal_kombat",
    detailedDescription: "Special Forces major with cybernetic metal arms",
    visualKeywords: ["metal arms", "cybernetic", "Special Forces", "muscular", "military", "bionic arms", "soldier"],
    consistencyPrompt: "Jax from Mortal Kombat: massive cybernetic metal arms (silver or gold), muscular build, military Special Forces outfit, tactical vest, bald or short hair, powerful stance, bionic arm enhancements glowing, ground pound or arm rocket attack pose potential"
  },
  {
    name: "Kano",
    aliases: ["kano"],
    category: "mortal_kombat",
    detailedDescription: "Black Dragon mercenary with cybernetic eye and knives",
    visualKeywords: ["cybernetic eye", "red laser eye", "knives", "mercenary", "Black Dragon", "Australian accent", "criminal"],
    consistencyPrompt: "Kano from Mortal Kombat: red cybernetic laser eye implant on right side of face, black beard, muscular build, tactical mercenary outfit with Black Dragon insignia, combat knives, criminal mercenary appearance, aggressive fighting stance, eye laser or knife throw pose potential"
  },
  {
    name: "Kung Lao",
    aliases: ["kung lao", "lao"],
    category: "mortal_kombat",
    detailedDescription: "Shaolin monk with razor-edged hat",
    visualKeywords: ["razor hat", "Shaolin monk", "bald", "martial artist", "hat weapon", "monk robes", "White Lotus"],
    consistencyPrompt: "Kung Lao from Mortal Kombat: razor-edged metal hat with sharp brim, bald head, Shaolin monk robes with blue and white colors, martial arts outfit, confident stance, hat as primary weapon, hat throw or dive kick pose potential"
  },
  {
    name: "Jade",
    aliases: ["jade"],
    category: "mortal_kombat",
    detailedDescription: "Edenian assassin with staff and green outfit",
    visualKeywords: ["green outfit", "staff weapon", "mask", "assassin", "Edenian", "agile fighter", "loyal warrior"],
    consistencyPrompt: "Jade from Mortal Kombat: emerald green outfit with gold accents, green mask covering lower face, long dark hair, extendable bo staff weapon, agile assassin appearance, graceful martial arts stance, staff spin or shadow kick pose potential"
  },
  {
    name: "Smoke",
    aliases: ["smoke", "tomas vrbada"],
    category: "mortal_kombat",
    detailedDescription: "Grey ninja with smoke powers and teleportation",
    visualKeywords: ["grey ninja", "smoke effects", "teleportation", "Lin Kuei", "grey and black", "smoke bombs", "stealth ninja"],
    consistencyPrompt: "Smoke from Mortal Kombat: grey ninja outfit with black accents, grey mask, smoke and mist effects surrounding body, Lin Kuei warrior appearance, stealth ninja stance, smoke teleport or smoke bomb pose potential, grey color scheme throughout"
  },
  {
    name: "Noob Saibot",
    aliases: ["noob saibot", "noob", "bi-han"],
    category: "mortal_kombat",
    detailedDescription: "Shadow wraith in all-black with darkness powers",
    visualKeywords: ["all black", "shadow powers", "wraith", "darkness", "evil Sub-Zero", "shadow clone", "dark ninja"],
    consistencyPrompt: "Noob Saibot from Mortal Kombat: completely black ninja outfit, black mask, shadow and darkness effects, wraith-like appearance, dark energy emanating from body, evil presence, shadow clone ability visual, menacing stance"
  },
  {
    name: "Reptile",
    aliases: ["reptile", "syzoth"],
    category: "mortal_kombat",
    detailedDescription: "Green reptilian ninja with acid powers",
    visualKeywords: ["green scales", "reptilian", "acid powers", "ninja", "lizard features", "green ninja", "Zaterran"],
    consistencyPrompt: "Reptile from Mortal Kombat: green ninja outfit or reptilian scaled skin, lizard-like features, green and black color scheme, acid spit effects, reptilian eyes, ninja or monster appearance depending on form, acidic green energy effects"
  },
  {
    name: "Ermac",
    aliases: ["ermac"],
    category: "mortal_kombat",
    detailedDescription: "Red telekinetic warrior made of souls",
    visualKeywords: ["red outfit", "telekinesis", "soul power", "glowing eyes", "mystical", "collection of souls", "red ninja"],
    consistencyPrompt: "Ermac from Mortal Kombat: red ninja outfit with black accents, glowing green eyes, telekinetic energy effects, mystical soul power visual, red and black color scheme, levitating pose potential, soul energy surrounding body"
  },
  {
    name: "Shang Tsung",
    aliases: ["shang tsung", "shang"],
    category: "mortal_kombat",
    detailedDescription: "Shape-shifting sorcerer who steals souls",
    visualKeywords: ["sorcerer", "soul magic", "shape-shifter", "Chinese robes", "goatee", "evil wizard", "soul steal"],
    consistencyPrompt: "Shang Tsung from Mortal Kombat: Chinese sorcerer robes with ornate details, goatee beard, mystical appearance, green soul magic effects, shape-shifting energy, evil sorcerer stance, soul steal pose with green energy"
  },
  {
    name: "Goro",
    aliases: ["goro"],
    category: "mortal_kombat",
    detailedDescription: "Four-armed Shokan warrior prince",
    visualKeywords: ["four arms", "Shokan", "muscular", "warrior", "tiger stripes", "half-dragon", "champion"],
    consistencyPrompt: "Goro from Mortal Kombat: massive four-armed Shokan warrior, muscular build, tiger stripe markings on skin, half-dragon half-human appearance, warrior champion stance, intimidating presence, all four arms visible and positioned naturally"
  },
  {
    name: "Baraka",
    aliases: ["baraka"],
    category: "mortal_kombat",
    detailedDescription: "Tarkatan warrior with arm blades",
    visualKeywords: ["arm blades", "Tarkatan", "sharp teeth", "warrior", "mutant", "blade arms", "savage fighter"],
    consistencyPrompt: "Baraka from Mortal Kombat: retractable arm blades extending from forearms, sharp Tarkatan teeth, yellow eyes, savage warrior appearance, muscular build, aggressive stance, arm blades extended in combat pose"
  },
  {
    name: "Shao Kahn",
    aliases: ["shao kahn", "shao"],
    category: "mortal_kombat",
    detailedDescription: "Emperor of Outworld with war hammer",
    visualKeywords: ["skull helmet", "war hammer", "emperor", "massive build", "armor", "tyrant", "Outworld ruler"],
    consistencyPrompt: "Shao Kahn from Mortal Kombat: massive skull-faced helmet, imposing armor with spikes, large war hammer weapon, emperor appearance, intimidating massive build, tyrant ruler stance, red cape, dominant powerful pose"
  },
  {
    name: "Sindel",
    aliases: ["sindel", "queen sindel"],
    category: "mortal_kombat",
    detailedDescription: "Queen with sonic scream and long white hair",
    visualKeywords: ["long white hair", "queen", "sonic scream", "purple outfit", "royal", "levitation", "banshee"],
    consistencyPrompt: "Sindel from Mortal Kombat: extremely long flowing white hair with purple streaks, purple royal outfit, queen appearance, sonic scream visual effects, levitating pose potential, regal yet deadly stance, hair whip attack pose"
  },
  {
    name: "Kabal",
    aliases: ["kabal"],
    category: "mortal_kombat",
    detailedDescription: "Burned speedster with respirator mask and hookswords",
    visualKeywords: ["respirator mask", "hookswords", "super speed", "burned skin", "Black Dragon", "speed effects", "masked warrior"],
    consistencyPrompt: "Kabal from Mortal Kombat: respirator breathing mask covering face, hooksword weapons, super speed motion blur effects, tactical outfit, burned appearance (when unmasked), speed demon stance, nomad dash pose potential"
  },
  {
    name: "Nightwolf",
    aliases: ["nightwolf", "grey cloud"],
    category: "mortal_kombat",
    detailedDescription: "Native American shaman with spirit powers",
    visualKeywords: ["Native American", "shaman", "spirit animal", "tomahawk", "tribal", "wolf spirit", "mystical warrior"],
    consistencyPrompt: "Nightwolf from Mortal Kombat: Native American warrior appearance, tribal face paint, tomahawk weapon, spirit animal effects (wolf), mystical shaman powers, traditional warrior outfit with modern tactical elements, spiritual energy glow"
  },
  {
    name: "Cassie Cage",
    aliases: ["cassie cage", "cassie"],
    category: "mortal_kombat",
    detailedDescription: "Special Forces soldier, daughter of Johnny Cage and Sonya Blade",
    visualKeywords: ["blonde ponytail", "Special Forces", "green energy", "tactical gear", "young soldier", "selfie fatality", "modern warrior"],
    consistencyPrompt: "Cassie Cage from Mortal Kombat: blonde hair in ponytail, modern Special Forces tactical outfit, green energy powers inherited from father, tactical vest and gear, confident young soldier appearance, selfie pose potential, combat stance with green glow effects"
  },
  {
    name: "Jacqui Briggs",
    aliases: ["jacqui briggs", "jacqui"],
    category: "mortal_kombat",
    detailedDescription: "Special Forces soldier with gauntlet weapons, daughter of Jax",
    visualKeywords: ["gauntlet weapons", "Special Forces", "tech warrior", "tactical gear", "cybernetic gauntlets", "soldier", "modern fighter"],
    consistencyPrompt: "Jacqui Briggs from Mortal Kombat: high-tech gauntlet weapons on arms, modern Special Forces tactical outfit, cybernetic enhancements, professional soldier appearance, tech-enhanced combat stance, gauntlet blast pose potential"
  },
  {
    name: "Erron Black",
    aliases: ["erron black", "erron"],
    category: "mortal_kombat",
    detailedDescription: "Outworld gunslinger and mercenary",
    visualKeywords: ["cowboy", "gunslinger", "dual pistols", "mask", "Western", "mercenary", "outlaw"],
    consistencyPrompt: "Erron Black from Mortal Kombat: Western cowboy outfit, bandana mask covering lower face, cowboy hat, dual pistols, gunslinger appearance, mercenary stance, Old West meets Outworld aesthetic, quick draw pose potential"
  },
  {
    name: "D'Vorah",
    aliases: ["dvorah", "d'vorah"],
    category: "mortal_kombat",
    detailedDescription: "Insectoid Kytinn with bug swarm powers",
    visualKeywords: ["insect", "bug swarm", "Kytinn", "hive mind", "insectoid features", "bug lady", "swarm"],
    consistencyPrompt: "D'Vorah from Mortal Kombat: insectoid Kytinn appearance, bug-like features, insect swarm effects, organic armor plating, multiple insect limbs, hive mind creature, bug swarm surrounding body, alien insect warrior stance"
  },
  {
    name: "Kotal Kahn",
    aliases: ["kotal kahn", "kotal"],
    category: "mortal_kombat",
    detailedDescription: "Osh-Tekk warrior emperor with sun powers",
    visualKeywords: ["Aztec warrior", "sun god", "blue skin", "emperor", "macuahuitl", "Osh-Tekk", "tribal"],
    consistencyPrompt: "Kotal Kahn from Mortal Kombat: blue-skinned Osh-Tekk warrior, Aztec-inspired armor and headdress, macuahuitl weapon, sun god powers with solar energy effects, emperor appearance, tribal warrior stance, sun ray attack pose potential"
  },
  {
    name: "Skarlet",
    aliases: ["skarlet"],
    category: "mortal_kombat",
    detailedDescription: "Blood mage assassin created by Shao Kahn",
    visualKeywords: ["blood magic", "red outfit", "blood weapons", "assassin", "crimson", "blood manipulation", "red ninja"],
    consistencyPrompt: "Skarlet from Mortal Kombat: red ninja outfit, blood magic effects, weapons made of crystallized blood, crimson color scheme throughout, blood mage appearance, blood manipulation visual effects, deadly assassin stance"
  },
  {
    name: "Frost",
    aliases: ["frost"],
    category: "mortal_kombat",
    detailedDescription: "Cybernetic cryomancer with ice powers",
    visualKeywords: ["cybernetic", "ice powers", "blue hair", "Lin Kuei", "cyborg", "cryomancer", "ice ninja"],
    consistencyPrompt: "Frost from Mortal Kombat: cybernetic body with ice blue color scheme, blue hair (mohawk or shaved), ice powers and cryomancer abilities, Lin Kuei cyborg appearance, mechanical and organic fusion, ice effects emanating from cybernetic parts"
  },
  {
    name: "Cetrion",
    aliases: ["cetrion"],
    category: "mortal_kombat",
    detailedDescription: "Elder goddess of nature and virtue",
    visualKeywords: ["nature goddess", "elemental powers", "divine", "nature magic", "goddess", "elder god", "natural elements"],
    consistencyPrompt: "Cetrion from Mortal Kombat: divine elder goddess appearance, nature-themed outfit with organic elements, elemental powers (earth, water, fire, air), glowing divine energy, goddess stance, natural magic effects, serene yet powerful presence"
  },
  {
    name: "Kollector",
    aliases: ["kollector"],
    category: "mortal_kombat",
    detailedDescription: "Six-armed Naknadan collector and merchant",
    visualKeywords: ["six arms", "collector", "merchant", "Naknadan", "multiple arms", "treasure", "hoarder"],
    consistencyPrompt: "Kollector from Mortal Kombat: six-armed Naknadan appearance, merchant collector outfit with pouches and bags, multiple weapons and items, all six arms visible and positioned naturally, greedy collector stance, treasure and artifact visual elements"
  }
];

export const POPPY_PLAYTIME_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Huggy Wuggy",
    aliases: ["huggy wuggy", "huggy"],
    category: "poppy_playtime",
    detailedDescription: "Tall blue furry monster with long arms and sharp teeth",
    visualKeywords: ["blue fur", "long arms", "sharp teeth", "yellow hands", "tall monster", "toy factory", "horror mascot"],
    consistencyPrompt: "Huggy Wuggy from Poppy Playtime: tall blue furry monster, extremely long arms reaching to ground, bright yellow hands and feet, wide grin with rows of sharp needle-like teeth, large googly eyes, horror toy mascot appearance, menacing yet cartoonish design, standing or crawling pose"
  },
  {
    name: "Kissy Missy",
    aliases: ["kissy missy", "kissy"],
    category: "poppy_playtime",
    detailedDescription: "Pink female counterpart to Huggy Wuggy",
    visualKeywords: ["pink fur", "long arms", "eyelashes", "yellow hands", "female monster", "toy mascot", "friendly appearance"],
    consistencyPrompt: "Kissy Missy from Poppy Playtime: tall pink furry monster, extremely long arms, bright yellow hands and feet, wide smile with teeth, large eyes with prominent eyelashes, female toy mascot appearance, friendlier expression than Huggy Wuggy, similar body structure to Huggy but pink"
  },
  {
    name: "Mommy Long Legs",
    aliases: ["mommy long legs", "mommy", "marie payne"],
    category: "poppy_playtime",
    detailedDescription: "Pink spider-like toy with extremely long elastic limbs",
    visualKeywords: ["pink body", "long elastic limbs", "spider-like", "toy mascot", "stretchy arms", "pink and white", "horror toy"],
    consistencyPrompt: "Mommy Long Legs from Poppy Playtime: pink humanoid toy with extremely long elastic limbs, spider-like proportions, pink body with white accents, large eyes, wide smile, stretchy extendable arms and legs, toy mascot horror design, maternal yet menacing appearance, can stretch and contort unnaturally"
  },
  {
    name: "Poppy",
    aliases: ["poppy", "poppy playtime"],
    category: "poppy_playtime",
    detailedDescription: "Small Victorian-style doll with red hair",
    visualKeywords: ["Victorian doll", "red hair", "small doll", "porcelain", "vintage toy", "red dress", "doll face"],
    consistencyPrompt: "Poppy from Poppy Playtime: small Victorian-style porcelain doll, bright red curly hair, vintage doll dress with frills, large doll eyes, rosy cheeks, delicate doll features, innocent yet unsettling appearance, classic toy doll design, small stature"
  },
  {
    name: "Boxy Boo",
    aliases: ["boxy boo", "boxy"],
    category: "poppy_playtime",
    detailedDescription: "Jack-in-the-box monster with spring body",
    visualKeywords: ["jack-in-the-box", "spring body", "clown-like", "box monster", "coiled spring", "toy horror", "mechanical"],
    consistencyPrompt: "Boxy Boo from Poppy Playtime: jack-in-the-box monster design, body made of coiled spring, clown-like face with sharp teeth, mechanical toy appearance, can compress and extend on spring, colorful yet menacing, toy box base, horror jack-in-the-box aesthetic"
  },
  {
    name: "PJ Pug-a-Pillar",
    aliases: ["pj pug-a-pillar", "pj", "pug-a-pillar"],
    category: "poppy_playtime",
    detailedDescription: "Caterpillar-like toy with pug face segments",
    visualKeywords: ["caterpillar body", "pug faces", "segmented", "purple and orange", "toy caterpillar", "multiple segments", "plush toy"],
    consistencyPrompt: "PJ Pug-a-Pillar from Poppy Playtime: caterpillar-like segmented body, each segment featuring pug dog face, purple and orange color scheme, plush toy appearance, multiple connected segments, cute yet unsettling pug faces, soft toy caterpillar design, can move in undulating motion"
  },
  {
    name: "CatNap",
    aliases: ["catnap", "cat nap"],
    category: "poppy_playtime",
    detailedDescription: "Purple cat-like creature with sleep-inducing gas",
    visualKeywords: ["purple cat", "sleepy appearance", "gas effects", "feline", "plush cat", "nightmare creature", "purple fur"],
    consistencyPrompt: "CatNap from Poppy Playtime: large purple cat-like creature, sleepy drooping eyes, soft purple fur, feline features, sleep-inducing red gas effects, plush toy cat design, nightmare creature appearance, relaxed yet menacing posture, purple and dark color scheme"
  },
  {
    name: "DogDay",
    aliases: ["dogday", "dog day"],
    category: "poppy_playtime",
    detailedDescription: "Orange dog mascot with sun motif",
    visualKeywords: ["orange dog", "sun motif", "happy appearance", "canine", "mascot costume", "bright colors", "friendly design"],
    consistencyPrompt: "DogDay from Poppy Playtime: bright orange dog mascot, sun-themed design elements, happy friendly appearance, canine features, mascot costume style, orange and yellow color scheme, cheerful toy dog design, standing upright, sunny disposition visual"
  },
  {
    name: "Bunzo Bunny",
    aliases: ["bunzo bunny", "bunzo"],
    category: "poppy_playtime",
    detailedDescription: "Yellow rabbit toy with cymbals",
    visualKeywords: ["yellow rabbit", "cymbals", "bunny toy", "musical toy", "rabbit ears", "toy mascot", "cymbal monkey style"],
    consistencyPrompt: "Bunzo Bunny from Poppy Playtime: yellow rabbit toy, holding cymbals like a cymbal monkey toy, long rabbit ears, toy mascot design, mechanical toy appearance, yellow and orange colors, musical toy aesthetic, can clap cymbals together"
  },
  {
    name: "Mini Huggies",
    aliases: ["mini huggies", "mini huggy", "small huggies"],
    category: "poppy_playtime",
    detailedDescription: "Smaller versions of Huggy Wuggy that swarm",
    visualKeywords: ["small blue monsters", "multiple creatures", "swarm", "mini versions", "blue fur", "tiny monsters", "group threat"],
    consistencyPrompt: "Mini Huggies from Poppy Playtime: smaller versions of Huggy Wuggy, blue furry creatures, sharp teeth, yellow hands, swarm behavior, multiple small monsters, toy-sized threats, same design as Huggy but miniature, can appear in groups"
  },
  {
    name: "The Prototype",
    aliases: ["prototype", "the prototype", "experiment 1006"],
    category: "poppy_playtime",
    detailedDescription: "Mysterious mechanical creature made of various parts",
    visualKeywords: ["mechanical", "robotic", "mysterious", "metal parts", "experiment", "hybrid creature", "mechanical horror"],
    consistencyPrompt: "The Prototype from Poppy Playtime: mysterious mechanical creature, made from various toy and mechanical parts, metal claw hand, robotic and organic fusion, experimental horror design, shadowy presence, amalgamation of different components, menacing mechanical appearance"
  },
  {
    name: "Miss Delight",
    aliases: ["miss delight", "delight"],
    category: "poppy_playtime",
    detailedDescription: "Teacher character with porcelain face and ruler weapon",
    visualKeywords: ["teacher outfit", "porcelain face", "ruler weapon", "school teacher", "cracked face", "vintage teacher", "horror teacher"],
    consistencyPrompt: "Miss Delight from Poppy Playtime: vintage school teacher appearance, porcelain doll-like face with cracks, 1950s-style teacher outfit, holding ruler as weapon, prim and proper design, unsettling teacher aesthetic, black hair in bun, strict teacher posture"
  },
  {
    name: "Candy Cat",
    aliases: ["candy cat", "candy"],
    category: "poppy_playtime",
    detailedDescription: "Pink and white cat toy mascot",
    visualKeywords: ["pink cat", "white accents", "candy themed", "feline mascot", "sweet design", "toy cat", "pastel colors"],
    consistencyPrompt: "Candy Cat from Poppy Playtime: pink and white cat toy mascot, candy-themed design elements, feline features, sweet pastel color scheme, toy mascot appearance, cute yet unsettling, standing cat design, large eyes"
  },
  {
    name: "Boogie Bot",
    aliases: ["boogie bot", "boogie"],
    category: "poppy_playtime",
    detailedDescription: "Dancing robot toy with disco theme",
    visualKeywords: ["robot", "disco theme", "dancing", "mechanical toy", "colorful", "retro robot", "musical toy"],
    consistencyPrompt: "Boogie Bot from Poppy Playtime: retro dancing robot toy, disco-themed design, colorful mechanical appearance, musical toy aesthetic, can dance and move rhythmically, 1970s-style robot design, entertainment toy appearance"
  },
  {
    name: "Nightmare Huggy",
    aliases: ["nightmare huggy", "nightmare huggy wuggy"],
    category: "poppy_playtime",
    detailedDescription: "Darker, more horrific version of Huggy Wuggy",
    visualKeywords: ["dark blue", "nightmare version", "more menacing", "horror design", "corrupted toy", "darker colors", "evil version"],
    consistencyPrompt: "Nightmare Huggy from Poppy Playtime: darker more horrific version of Huggy Wuggy, deep dark blue fur, more menacing appearance, sharper teeth, more aggressive design, nightmare corrupted toy aesthetic, more horror-focused than original, evil glowing eyes"
  }
];

export const HORROR_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Michael Myers",
    aliases: ["michael myers", "the shape", "myers"],
    category: "horror",
    detailedDescription: "Iconic masked killer from Halloween franchise",
    visualKeywords: ["white mask", "coveralls", "kitchen knife", "emotionless", "tall figure", "dark hair", "blank expression"],
    consistencyPrompt: "Michael Myers from Halloween: white featureless mask with dark eye holes, blue mechanic coveralls, tall imposing figure, dark brown hair visible at mask edges, emotionless blank stare, menacing presence, signature kitchen knife (PROP ONLY - not real weapon), slow deliberate movements, iconic horror villain appearance",
    weaponGuidance: "Michael Myers' signature kitchen knife is a PROP - a theatrical prop weapon used for horror movie aesthetics only. When depicted, it should appear as a movie prop with no real threat."
  },
  {
    name: "Jason Voorhees",
    aliases: ["jason voorhees", "jason", "voorhees"],
    category: "horror",
    detailedDescription: "Hockey-masked killer from Friday the 13th",
    visualKeywords: ["hockey mask", "machete", "torn clothes", "undead", "camp crystal lake", "red markings", "imposing build"],
    consistencyPrompt: "Jason Voorhees from Friday the 13th: white hockey mask with red triangular markings and eye holes, torn dirty clothing, muscular imposing build, weathered appearance, undead zombie-like features, signature machete (PROP ONLY), menacing horror icon presence, camp slasher aesthetic",
    weaponGuidance: "Jason's machete is a THEATRICAL PROP - a movie prop weapon for horror film aesthetics. It should be depicted as a non-threatening prop item."
  },
  {
    name: "Freddy Krueger",
    aliases: ["freddy krueger", "freddy", "krueger"],
    category: "horror",
    detailedDescription: "Burned dream demon with razor glove from Nightmare on Elm Street",
    visualKeywords: ["burned face", "fedora hat", "striped sweater", "razor glove", "red and green", "scarred skin", "menacing grin"],
    consistencyPrompt: "Freddy Krueger from A Nightmare on Elm Street: severely burned scarred face, brown fedora hat, red and green striped sweater, razor blade glove (PROP ONLY) on right hand, menacing evil grin, dream demon appearance, horror icon aesthetic, dark humor expression",
    weaponGuidance: "Freddy's razor glove is a MOVIE PROP - theatrical prop blades for horror film purposes only, not real weapons."
  },
  {
    name: "Pennywise",
    aliases: ["pennywise", "it", "pennywise the clown", "pennywise the dancing clown"],
    category: "horror",
    detailedDescription: "Demonic clown entity from Stephen King's IT",
    visualKeywords: ["clown makeup", "red balloon", "white face", "orange hair", "ruffled collar", "sharp teeth", "yellow eyes"],
    consistencyPrompt: "Pennywise from IT: white clown face paint, bright orange/red hair, Victorian-era clown costume with ruffled collar, red pom-poms, menacing smile with sharp teeth, yellow predatory eyes, red balloon accessory, demonic clown appearance, unsettling presence, Stephen King's iconic horror clown",
    weaponGuidance: "Pennywise typically does not use weapons - his horror comes from psychological terror and shapeshifting abilities."
  },
  {
    name: "Chucky",
    aliases: ["chucky", "charles lee ray", "good guy doll"],
    category: "horror",
    detailedDescription: "Possessed killer doll from Child's Play",
    visualKeywords: ["killer doll", "red hair", "overalls", "striped shirt", "good guys doll", "stitched face", "small stature"],
    consistencyPrompt: "Chucky from Child's Play: possessed Good Guys doll appearance, bright red/orange hair, blue overalls with 'Good Guys' logo, striped shirt, freckled face with stitches and scars, evil expression, small doll-sized (2-3 feet tall), knife (PROP ONLY), menacing killer doll aesthetic",
    weaponGuidance: "Chucky's knife is a PROP WEAPON - a toy/theatrical prop for horror doll aesthetics, not a real weapon."
  },
  {
    name: "Ghostface",
    aliases: ["ghostface", "scream killer", "the killer"],
    category: "horror",
    detailedDescription: "Masked killer from Scream franchise",
    visualKeywords: ["white mask", "black robe", "knife", "scream mask", "hood", "horror movie"],
    consistencyPrompt: "Ghostface from Scream: iconic white ghost mask with elongated screaming expression, black flowing robe/cloak, hood covering head, knife (PROP ONLY), slasher movie aesthetic, mysterious killer appearance, meta-horror icon",
    weaponGuidance: "Ghostface's knife is a THEATRICAL PROP - a movie prop weapon for slasher film aesthetics only."
  },
  {
    name: "Leatherface",
    aliases: ["leatherface", "bubba sawyer"],
    category: "horror",
    detailedDescription: "Chainsaw-wielding killer from Texas Chainsaw Massacre",
    visualKeywords: ["leather mask", "chainsaw", "apron", "butcher", "human skin mask", "large build"],
    consistencyPrompt: "Leatherface from The Texas Chainsaw Massacre: mask made of human skin/leather, butcher's apron, large imposing build, chainsaw (PROP ONLY), disturbed appearance, Texas horror icon, brutal aesthetic",
    weaponGuidance: "Leatherface's chainsaw is a PROP - a theatrical prop tool for horror movie purposes, not a functional weapon."
  },
  {
    name: "Pinhead",
    aliases: ["pinhead", "hell priest", "lead cenobite"],
    category: "horror",
    detailedDescription: "Lead Cenobite from Hellraiser with pins in head",
    visualKeywords: ["pins in head", "black leather", "pale skin", "grid pattern", "chains", "cenobite"],
    consistencyPrompt: "Pinhead from Hellraiser: head covered in grid pattern of pins/nails, extremely pale white skin, black leather robes, chains (PROPS), cold emotionless expression, cenobite demon appearance, sadomasochistic horror aesthetic",
    weaponGuidance: "Pinhead's chains and hooks are PROPS - theatrical horror movie props for visual effect only."
  }
];

export const MARVEL_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Spider-Man",
    aliases: ["spider-man", "spiderman", "peter parker", "spidey", "web slinger"],
    category: "marvel",
    detailedDescription: "Web-slinging superhero in red and blue suit",
    visualKeywords: ["red and blue suit", "web pattern", "spider logo", "mask", "web shooters", "athletic build"],
    consistencyPrompt: "Spider-Man: iconic red and blue costume with black web pattern, large white eye lenses on mask, black spider logo on chest, web shooters on wrists, athletic muscular build, dynamic acrobatic pose, Marvel superhero appearance. LATEST STYLE: Modern MCU-inspired suit with enhanced web details, tech elements, expressive eye lenses, sleek athletic design"
  },
  {
    name: "Venom",
    aliases: ["venom", "eddie brock", "symbiote"],
    category: "marvel",
    detailedDescription: "Black alien symbiote with massive teeth and tongue",
    visualKeywords: ["black symbiote", "white spider logo", "sharp teeth", "long tongue", "muscular", "white eyes"],
    consistencyPrompt: "Venom: massive black alien symbiote covering body, large white spider logo on chest, enormous sharp teeth, long prehensile tongue, bulging white eyes without pupils, extremely muscular build, organic flowing texture, menacing appearance. LATEST STYLE: Modern realistic symbiote with detailed texture, saliva strands, veiny organic surface, intimidating presence"
  },
  {
    name: "Iron Man",
    aliases: ["iron man", "ironman", "tony stark"],
    category: "marvel",
    detailedDescription: "Armored superhero in red and gold suit",
    visualKeywords: ["red and gold armor", "arc reactor", "repulsor beams", "helmet", "mechanical suit", "glowing eyes"],
    consistencyPrompt: "Iron Man: red and gold metallic armor suit, glowing arc reactor in chest, repulsor beam technology in palms, sleek helmet with glowing white eyes, mechanical joints and panels, high-tech appearance. LATEST STYLE: Mark 85 nanotech armor with seamless panels, advanced HUD elements, battle-worn details, realistic metallic sheen, MCU-accurate design"
  },
  {
    name: "Black Panther",
    aliases: ["black panther", "t'challa", "tchalla"],
    category: "marvel",
    detailedDescription: "Wakandan king in vibranium suit",
    visualKeywords: ["black suit", "vibranium", "panther mask", "claws", "purple energy", "African patterns"],
    consistencyPrompt: "Black Panther: sleek black vibranium suit with subtle panther pattern texture, silver/purple energy accents, panther-shaped mask with pointed ears, retractable claws, athletic build, Wakandan technology aesthetic. LATEST STYLE: MCU-accurate suit with kinetic energy absorption glow, detailed African-inspired patterns, realistic fabric texture"
  },
  {
    name: "Thor",
    aliases: ["thor", "god of thunder", "thor odinson"],
    category: "marvel",
    detailedDescription: "Asgardian god with hammer and lightning powers",
    visualKeywords: ["mjolnir", "red cape", "armor", "blonde hair", "lightning", "beard"],
    consistencyPrompt: "Thor: Asgardian armor with red cape, Mjolnir hammer (PROP), long blonde hair, beard, muscular build, lightning effects, godly presence. LATEST STYLE: MCU Thor with battle-worn armor, Stormbreaker axe option, weathered appearance, realistic Norse-inspired design"
  },
  {
    name: "Hulk",
    aliases: ["hulk", "bruce banner", "the incredible hulk"],
    category: "marvel",
    detailedDescription: "Giant green rage monster",
    visualKeywords: ["green skin", "massive muscles", "torn pants", "angry expression", "huge size"],
    consistencyPrompt: "Hulk: massive green-skinned creature, extremely muscular build, torn purple pants, angry expression, veins visible, enormous size (7-8 feet tall), powerful stance. LATEST STYLE: MCU Smart Hulk with more human facial features, intelligent expression, or classic savage Hulk with pure rage"
  },
  {
    name: "Captain America",
    aliases: ["captain america", "steve rogers", "cap"],
    category: "marvel",
    detailedDescription: "Super soldier with shield",
    visualKeywords: ["star shield", "red white blue", "helmet", "super soldier", "patriotic"],
    consistencyPrompt: "Captain America: red, white, and blue suit with star on chest, circular vibranium shield with star design (PROP), helmet with 'A' symbol, muscular build, heroic stance. LATEST STYLE: MCU stealth suit or classic Avengers suit with scale armor texture, realistic tactical design"
  },
  {
    name: "Deadpool",
    aliases: ["deadpool", "wade wilson", "merc with a mouth"],
    category: "marvel",
    detailedDescription: "Regenerating mercenary in red suit",
    visualKeywords: ["red suit", "black patches", "katanas", "mask", "guns", "pouches"],
    consistencyPrompt: "Deadpool: red and black tactical suit, mask with black eye patches, katanas on back (PROPS), gun holsters (PROPS), pouches and belts, athletic build, comedic pose potential. LATEST STYLE: MCU Deadpool with movie-accurate suit details, weathered fabric texture"
  },
  {
    name: "Wolverine",
    aliases: ["wolverine", "logan", "weapon x"],
    category: "marvel",
    detailedDescription: "Mutant with adamantium claws",
    visualKeywords: ["claws", "yellow suit", "mask with points", "muscular", "sideburns", "aggressive"],
    consistencyPrompt: "Wolverine: yellow and blue X-Men suit with mask featuring pointed sides, adamantium claws extended from knuckles (PROPS), muscular stocky build, distinctive sideburns, aggressive stance. LATEST STYLE: Comic-accurate yellow suit or Hugh Jackman movie appearance with leather jacket"
  },
  {
    name: "Doctor Strange",
    aliases: ["doctor strange", "stephen strange", "sorcerer supreme"],
    category: "marvel",
    detailedDescription: "Master of mystic arts",
    visualKeywords: ["cloak of levitation", "eye of agamotto", "goatee", "magic circles", "blue robes"],
    consistencyPrompt: "Doctor Strange: blue and red Cloak of Levitation, Eye of Agamotto amulet, blue mystic robes, goatee, magic spell circles, mystical energy effects. LATEST STYLE: MCU-accurate costume with detailed embroidery, realistic fabric, glowing magic effects"
  }
];

export const DC_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Batman",
    aliases: ["batman", "bruce wayne", "the dark knight", "caped crusader"],
    category: "dc",
    detailedDescription: "Dark vigilante with bat motif",
    visualKeywords: ["bat symbol", "cape", "cowl", "utility belt", "armor", "dark colors"],
    consistencyPrompt: "Batman: dark gray/black armored suit with bat symbol on chest, flowing black cape, cowl with pointed ears, white eye lenses, yellow utility belt, muscular build, intimidating presence. LATEST STYLE: The Batman (2022) tactical armor with realistic plating, or Dark Knight trilogy suit with military-grade protection"
  },
  {
    name: "Superman",
    aliases: ["superman", "clark kent", "kal-el", "man of steel"],
    category: "dc",
    detailedDescription: "Kryptonian hero in red and blue",
    visualKeywords: ["red cape", "S symbol", "blue suit", "red boots", "muscular", "heroic"],
    consistencyPrompt: "Superman: blue suit with red cape, iconic 'S' shield on chest, red boots, muscular heroic build, black hair with curl, confident heroic pose. LATEST STYLE: Modern textured suit with detailed 'S' symbol, realistic fabric appearance, or classic comic look"
  },
  {
    name: "Wonder Woman",
    aliases: ["wonder woman", "diana prince", "diana of themyscira"],
    category: "dc",
    detailedDescription: "Amazonian warrior princess",
    visualKeywords: ["golden lasso", "tiara", "bracelets", "armor", "sword", "shield"],
    consistencyPrompt: "Wonder Woman: red and blue armor with golden eagle emblem, golden tiara with red star, silver bracelets, golden Lasso of Truth (PROP), sword and shield (PROPS), long black hair, warrior stance. LATEST STYLE: DCEU armor with ancient Greek-inspired design, battle-ready appearance"
  },
  {
    name: "The Flash",
    aliases: ["the flash", "flash", "barry allen"],
    category: "dc",
    detailedDescription: "Speedster in red suit",
    visualKeywords: ["red suit", "lightning bolt", "yellow accents", "speed", "lightning effects"],
    consistencyPrompt: "The Flash: bright red suit with yellow lightning bolt on chest, yellow accents, lightning effects around body, athletic build, dynamic running pose. LATEST STYLE: DCEU suit with segmented armor plating and gold lightning details"
  },
  {
    name: "Aquaman",
    aliases: ["aquaman", "arthur curry"],
    category: "dc",
    detailedDescription: "King of Atlantis with trident",
    visualKeywords: ["trident", "orange and green", "scales", "blonde hair", "beard", "tattoos"],
    consistencyPrompt: "Aquaman: orange and green scaled armor, golden trident (PROP), long blonde hair, beard, Atlantean tattoos, muscular build, oceanic king presence. LATEST STYLE: DCEU Jason Momoa appearance with detailed scale armor, tribal tattoos, rugged warrior look"
  },
  {
    name: "Joker",
    aliases: ["joker", "the joker", "clown prince of crime"],
    category: "dc",
    detailedDescription: "Batman's nemesis with clown appearance",
    visualKeywords: ["green hair", "white face", "red lips", "purple suit", "maniacal grin"],
    consistencyPrompt: "Joker: green hair, white face paint, red lips in wide grin, purple suit with green accents, chaotic appearance, maniacal expression. LATEST STYLE: Heath Ledger's scarred anarchist look, Joaquin Phoenix's realistic troubled appearance, or classic comic purple suit"
  },
  {
    name: "Harley Quinn",
    aliases: ["harley quinn", "harleen quinzel"],
    category: "dc",
    detailedDescription: "Former psychiatrist turned villain",
    visualKeywords: ["pigtails", "red and blue", "baseball bat", "jester", "makeup"],
    consistencyPrompt: "Harley Quinn: blonde hair in pigtails with red and blue dye, red and blue outfit, baseball bat (PROP), playful yet dangerous expression, athletic build. LATEST STYLE: Birds of Prey colorful outfit with roller derby aesthetic, or Suicide Squad punk rock look"
  },
  {
    name: "Black Adam",
    aliases: ["black adam", "teth-adam"],
    category: "dc",
    detailedDescription: "Anti-hero with lightning powers",
    visualKeywords: ["black suit", "gold lightning", "cape", "muscular", "ancient"],
    consistencyPrompt: "Black Adam: black suit with gold lightning bolt on chest, gold accents, short black cape, muscular build, lightning effects, ancient warrior presence. LATEST STYLE: DCEU appearance with detailed costume, realistic fabric and gold trim"
  }
];

// EXPANDED MARVEL UNIVERSE
export const EXPANDED_MARVEL_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Miles Morales Spider-Man",
    aliases: ["miles morales", "miles", "spider-man miles"],
    category: "marvel",
    detailedDescription: "Afro-Latino Spider-Man with red and black suit",
    visualKeywords: ["red and black suit", "bio-electric powers", "spray paint", "Brooklyn", "Afro-Latino"],
    consistencyPrompt: "Miles Morales Spider-Man: red and black costume with larger spider logo, black portions on red suit, bio-electric venom powers (yellow electricity), spray paint aesthetic, Afro-Latino features, Brooklyn style. LATEST STYLE: Animated movie design or comic-accurate suit with street art influences"
  },
  {
    name: "Scarlet Witch",
    aliases: ["scarlet witch", "wanda maximoff", "wanda"],
    category: "marvel",
    detailedDescription: "Reality-warping mutant with red chaos magic",
    visualKeywords: ["red costume", "chaos magic", "headpiece", "red energy", "mutant"],
    consistencyPrompt: "Scarlet Witch: red costume with cape and headpiece, red chaos magic energy effects, powerful stance, Wanda Maximoff appearance. LATEST STYLE: MCU Wandavision/Multiverse of Madness red leather suit with detailed stitching and flowing cape"
  },
  {
    name: "Thanos",
    aliases: ["thanos", "mad titan"],
    category: "marvel",
    detailedDescription: "Mad Titan with purple skin and Infinity Gauntlet",
    visualKeywords: ["purple skin", "massive build", "gold armor", "Infinity Gauntlet", "ridged chin"],
    consistencyPrompt: "Thanos: massive purple-skinned Titan, ridged chin, gold and blue armor, Infinity Gauntlet with colored stones. LATEST STYLE: MCU realistic appearance with detailed skin texture, battle-worn armor"
  },
  {
    name: "Loki",
    aliases: ["loki", "god of mischief"],
    category: "marvel",
    detailedDescription: "Asgardian trickster god",
    visualKeywords: ["green and gold", "horned helmet", "trickster", "cape", "scepter"],
    consistencyPrompt: "Loki: green and gold Asgardian armor, horned helmet, flowing cape, scepter. LATEST STYLE: MCU appearance with leather and metal details, Tom Hiddleston likeness"
  },
  {
    name: "Black Widow",
    aliases: ["black widow", "natasha romanoff"],
    category: "marvel",
    detailedDescription: "Super spy assassin",
    visualKeywords: ["black suit", "red hair", "dual pistols", "tactical gear", "spy"],
    consistencyPrompt: "Black Widow: black tactical suit with red hourglass symbol, red hair, dual batons/pistols (PROPS), athletic build, spy stance. LATEST STYLE: MCU tactical suit with armor panels"
  },
  {
    name: "Moon Knight",
    aliases: ["moon knight", "marc spector"],
    category: "marvel",
    detailedDescription: "Egyptian moon god avatar in white suit",
    visualKeywords: ["white suit", "cape", "crescent darts", "Egyptian", "vigilante"],
    consistencyPrompt: "Moon Knight: all-white suit with flowing white cape, crescent moon chest symbol, white mask, crescent darts (PROPS), Egyptian aesthetic. LATEST STYLE: MCU mummy-wrapped suit with glowing eyes"
  }
];

// EXPANDED DC UNIVERSE
export const EXPANDED_DC_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Shazam",
    aliases: ["shazam", "captain marvel", "billy batson"],
    category: "dc",
    detailedDescription: "Magical superhero with lightning bolt",
    visualKeywords: ["red suit", "gold lightning bolt", "white cape", "lightning", "magic"],
    consistencyPrompt: "Shazam: red suit with gold lightning bolt on chest, white cape with gold trim, superhero build, lightning effects. LATEST STYLE: DCEU movie suit with textured fabric and gold details"
  },
  {
    name: "Cyborg",
    aliases: ["cyborg", "victor stone"],
    category: "dc",
    detailedDescription: "Half-human half-machine hero",
    visualKeywords: ["cybernetic body", "glowing eye", "robotic parts", "tech", "Justice League"],
    consistencyPrompt: "Cyborg: half-human half-robot body, glowing red eye, silver and black cybernetic parts, tech integration. LATEST STYLE: DCEU design with detailed mechanical components"
  },
  {
    name: "Green Lantern",
    aliases: ["green lantern", "hal jordan", "john stewart"],
    category: "dc",
    detailedDescription: "Intergalactic cop with power ring",
    visualKeywords: ["green suit", "power ring", "green energy", "lantern logo", "mask"],
    consistencyPrompt: "Green Lantern: green and black suit with power ring, green lantern logo on chest, green energy constructs, mask. LATEST STYLE: Modern suit design with detailed texturing"
  },
  {
    name: "Deathstroke",
    aliases: ["deathstroke", "slade wilson"],
    category: "dc",
    detailedDescription: "Mercenary with orange and black armor",
    visualKeywords: ["orange and black", "one-eyed mask", "sword", "tactical armor", "mercenary"],
    consistencyPrompt: "Deathstroke: orange and black armor, half-mask showing one eye covered, sword and guns (PROPS), tactical mercenary design. LATEST STYLE: Modern armored design with plates and weaponry"
  }
];

// DISNEY CHARACTERS
export const DISNEY_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Mickey Mouse",
    aliases: ["mickey mouse", "mickey"],
    category: "disney",
    detailedDescription: "Iconic Disney mouse with red shorts",
    visualKeywords: ["black ears", "red shorts", "yellow shoes", "white gloves", "mouse"],
    consistencyPrompt: "Mickey Mouse: large round black ears, white face, black nose, red shorts with white buttons, yellow shoes, white gloves, cheerful expression, classic Disney cartoon mouse"
  },
  {
    name: "Donald Duck",
    aliases: ["donald duck", "donald"],
    category: "disney",
    detailedDescription: "Iconic Disney duck with sailor outfit",
    visualKeywords: ["white duck", "blue sailor outfit", "sailor hat", "orange beak", "no pants"],
    consistencyPrompt: "Donald Duck: white feathered duck, blue sailor outfit with bow tie, sailor hat, orange beak and feet, no pants, classic Disney duck design"
  },
  {
    name: "Goofy",
    aliases: ["goofy", "goofy goof"],
    category: "disney",
    detailedDescription: "Tall Disney dog with floppy ears",
    visualKeywords: ["tall dog", "floppy ears", "vest", "hat", "goofy smile"],
    consistencyPrompt: "Goofy: tall anthropomorphic dog, long floppy ears, orange vest, green hat, buck teeth, goofy smile, classic Disney character"
  },
  {
    name: "Elsa",
    aliases: ["elsa", "queen elsa", "frozen elsa"],
    category: "disney",
    detailedDescription: "Ice queen from Frozen",
    visualKeywords: ["ice blue dress", "blonde braid", "ice powers", "snowflake", "queen"],
    consistencyPrompt: "Elsa from Frozen: ice blue dress with crystalline details, long blonde hair in braid, ice and snow powers, snowflake patterns, elegant queen appearance, Disney princess style"
  },
  {
    name: "Simba",
    aliases: ["simba", "adult simba"],
    category: "disney",
    detailedDescription: "Lion King protagonist",
    visualKeywords: ["lion", "red mane", "golden fur", "king", "pride rock"],
    consistencyPrompt: "Simba from Lion King: adult male lion, red-orange mane, golden fur, powerful stance, Lion King Disney design, regal appearance"
  },
  {
    name: "Stitch",
    aliases: ["stitch", "experiment 626"],
    category: "disney",
    detailedDescription: "Blue alien experiment from Lilo & Stitch",
    visualKeywords: ["blue fur", "big ears", "four arms", "alien", "mischievous"],
    consistencyPrompt: "Stitch: blue fur, large black eyes, big ears, four arms, small alien creature, mischievous expression, Disney Lilo & Stitch design"
  },
  {
    name: "Moana",
    aliases: ["moana", "princess moana"],
    category: "disney",
    detailedDescription: "Polynesian wayfinder princess",
    visualKeywords: ["Polynesian", "red outfit", "necklace", "black curly hair", "ocean"],
    consistencyPrompt: "Moana: Polynesian features, long black curly hair, red traditional outfit with crop top, shell necklace, wayfinder appearance, Disney princess style"
  },
  {
    name: "Buzz Lightyear",
    aliases: ["buzz lightyear", "buzz"],
    category: "disney",
    detailedDescription: "Space ranger from Toy Story",
    visualKeywords: ["space suit", "purple and green", "helmet", "wings", "space ranger"],
    consistencyPrompt: "Buzz Lightyear: white, purple and green space ranger suit, clear helmet, retractable wings, space ranger appearance, Toy Story Disney-Pixar design"
  },
  {
    name: "Woody",
    aliases: ["woody", "sheriff woody"],
    category: "disney",
    detailedDescription: "Cowboy doll from Toy Story",
    visualKeywords: ["cowboy hat", "vest", "sheriff badge", "pull string", "boots"],
    consistencyPrompt: "Woody: brown cowboy hat, yellow shirt, cowhide vest with sheriff badge, blue jeans, cowboy boots, pull-string on back, Toy Story Disney-Pixar design"
  },
  {
    name: "Lightning McQueen",
    aliases: ["lightning mcqueen", "mcqueen", "lightning"],
    category: "disney",
    detailedDescription: "Race car from Cars",
    visualKeywords: ["red race car", "95", "lightning bolt", "race car", "anthropomorphic"],
    consistencyPrompt: "Lightning McQueen: red race car with number 95, lightning bolt logo, anthropomorphic car with eyes on windshield, Disney Cars design, racing style"
  },
  {
    name: "Rapunzel",
    aliases: ["rapunzel", "tangled"],
    category: "disney",
    detailedDescription: "Princess with magical long hair",
    visualKeywords: ["long blonde hair", "purple dress", "flowers in hair", "frying pan", "princess"],
    consistencyPrompt: "Rapunzel from Tangled: extremely long blonde hair (70 feet), purple dress, flowers in hair, green eyes, Disney princess appearance, magical golden hair glow"
  },
  {
    name: "Ariel",
    aliases: ["ariel", "little mermaid"],
    category: "disney",
    detailedDescription: "Mermaid princess with red hair",
    visualKeywords: ["red hair", "purple seashell top", "green tail", "mermaid", "ocean"],
    consistencyPrompt: "Ariel from Little Mermaid: long flowing red hair, purple seashell bra top, green mermaid tail with scales, Disney princess appearance, underwater princess"
  }
];

// CARTOON NETWORK CHARACTERS
export const CARTOON_NETWORK_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Ben 10",
    aliases: ["ben 10", "ben tennyson"],
    category: "cartoon_network",
    detailedDescription: "Boy hero with Omnitrix alien watch",
    visualKeywords: ["Omnitrix watch", "green jacket", "brown hair", "teenager", "hero"],
    consistencyPrompt: "Ben 10: brown hair, green jacket with white stripe, Omnitrix watch on wrist (green and black device), teenage appearance, Cartoon Network style"
  },
  {
    name: "Four Arms",
    aliases: ["four arms", "ben 10 four arms"],
    category: "cartoon_network",
    detailedDescription: "Ben 10's four-armed alien transformation",
    visualKeywords: ["four arms", "red skin", "muscular", "black stripes", "alien"],
    consistencyPrompt: "Four Arms from Ben 10: massive four-armed alien, red skin with black stripes, extremely muscular build, yellow eyes, powerful stance, Ben 10 alien design"
  },
  {
    name: "Dexter",
    aliases: ["dexter", "boy genius"],
    category: "cartoon_network",
    detailedDescription: "Boy genius with secret laboratory",
    visualKeywords: ["lab coat", "glasses", "orange hair", "boy genius", "scientist"],
    consistencyPrompt: "Dexter from Dexter's Laboratory: white lab coat, large glasses, orange hair, boy genius appearance, Cartoon Network style"
  },
  {
    name: "Samurai Jack",
    aliases: ["samurai jack", "jack"],
    category: "cartoon_network",
    detailedDescription: "Time-displaced samurai warrior",
    visualKeywords: ["white gi", "topknot", "katana", "samurai", "martial artist"],
    consistencyPrompt: "Samurai Jack: white samurai gi, black hair in topknot, katana sword (PROP), stoic expression, samurai warrior appearance, Cartoon Network style",
    weaponGuidance: "Samurai Jack's katana is a PROP sword for animated character aesthetics."
  },
  {
    name: "Finn the Human",
    aliases: ["finn", "finn the human", "adventure time finn"],
    category: "cartoon_network",
    detailedDescription: "Human hero from Adventure Time",
    visualKeywords: ["bear hat", "blue shirt", "shorts", "backpack", "sword"],
    consistencyPrompt: "Finn from Adventure Time: white bear hat with ears, blue shirt, dark shorts, backpack, sword (PROP), adventure hero appearance, Cartoon Network style",
    weaponGuidance: "Finn's sword is an animated PROP weapon."
  },
  {
    name: "Jake the Dog",
    aliases: ["jake", "jake the dog"],
    category: "cartoon_network",
    detailedDescription: "Shape-shifting dog from Adventure Time",
    visualKeywords: ["yellow dog", "stretchy", "simple design", "friendly"],
    consistencyPrompt: "Jake from Adventure Time: yellow bulldog appearance, simple rounded design, shape-shifting abilities, friendly expression, Cartoon Network style"
  },
  {
    name: "Gumball",
    aliases: ["gumball", "gumball watterson"],
    category: "cartoon_network",
    detailedDescription: "Blue cat from Amazing World of Gumball",
    visualKeywords: ["blue cat", "simple design", "white eyes", "cartoon cat"],
    consistencyPrompt: "Gumball Watterson: blue cat with simple rounded design, large white eyes with black pupils, cartoon cat appearance, Cartoon Network style"
  },
  {
    name: "Steven Universe",
    aliases: ["steven universe", "steven"],
    category: "cartoon_network",
    detailedDescription: "Half-human half-Gem hybrid",
    visualKeywords: ["star shirt", "pink gem", "curly hair", "shield", "Crystal Gem"],
    consistencyPrompt: "Steven Universe: red star shirt, curly black hair, pink gem on belly button, shield (PROP), Crystal Gem appearance, Cartoon Network style"
  },
  {
    name: "Courage",
    aliases: ["courage", "courage the cowardly dog"],
    category: "cartoon_network",
    detailedDescription: "Pink cowardly dog",
    visualKeywords: ["pink dog", "nervous expression", "simple design", "cowardly"],
    consistencyPrompt: "Courage the Cowardly Dog: pink dog with simple rounded design, large nervous eyes, cowardly scared expression, Cartoon Network style"
  },
  {
    name: "Ed, Edd n Eddy",
    aliases: ["ed edd n eddy", "ed", "edd", "eddy", "the eds"],
    category: "cartoon_network",
    detailedDescription: "Three friends from cul-de-sac",
    visualKeywords: ["three kids", "jawbreakers", "scams", "neighborhood"],
    consistencyPrompt: "Ed Edd n Eddy: Ed (tall, green jacket, unibrow), Edd/Double D (sock hat, organized), Eddy (yellow shirt, short, scheming), Cartoon Network style"
  },
  {
    name: "Johnny Bravo",
    aliases: ["johnny bravo", "johnny"],
    category: "cartoon_network",
    detailedDescription: "Muscular narcissistic character",
    visualKeywords: ["blonde pompadour", "black shirt", "sunglasses", "muscular", "Elvis style"],
    consistencyPrompt: "Johnny Bravo: tall blonde pompadour hairstyle, black shirt, sunglasses, extremely muscular build, Elvis-inspired appearance, Cartoon Network style"
  },
  {
    name: "Powerpuff Girls",
    aliases: ["powerpuff girls", "blossom", "bubbles", "buttercup"],
    category: "cartoon_network",
    detailedDescription: "Three superhero girls",
    visualKeywords: ["big eyes", "dresses", "superpowers", "three girls", "Chemical X"],
    consistencyPrompt: "Powerpuff Girls: Blossom (pink dress, red bow, leader), Bubbles (blue dress, blonde pigtails, sweet), Buttercup (green dress, black hair, tough), large eyes, tiny bodies, Cartoon Network style"
  },
  {
    name: "Teen Titans",
    aliases: ["teen titans", "robin", "starfire", "raven", "beast boy", "cyborg"],
    category: "cartoon_network",
    detailedDescription: "Young superhero team",
    visualKeywords: ["superhero team", "teenagers", "colorful", "powers"],
    consistencyPrompt: "Teen Titans: Robin (mask, cape, R symbol), Starfire (orange skin, purple hair, green eyes), Raven (purple hair, blue cloak), Beast Boy (green skin, pointy ears), Cyborg (half-robot), Cartoon Network style"
  }
];

// ADDITIONAL HORROR CHARACTERS
export const EXPANDED_HORROR_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Art the Clown",
    aliases: ["art the clown", "art", "terrifier"],
    category: "horror",
    detailedDescription: "Silent killer clown from Terrifier",
    visualKeywords: ["black and white clown", "mime makeup", "top hat", "silent", "disturbing smile"],
    consistencyPrompt: "Art the Clown: black and white clown costume, extreme mime face makeup, black top hat, disturbing wide smile, silent menacing presence, Terrifier horror aesthetic",
    weaponGuidance: "Art the Clown's weapons are PROPS for horror movie aesthetics."
  },
  {
    name: "Jigsaw",
    aliases: ["jigsaw", "billy puppet", "saw"],
    category: "horror",
    detailedDescription: "Puppet from Saw franchise",
    visualKeywords: ["white face", "red spirals", "tuxedo", "tricycle", "puppet"],
    consistencyPrompt: "Jigsaw/Billy Puppet: white face with red spiral cheeks, black tuxedo with red bow tie, puppet appearance, Saw franchise horror design"
  },
  {
    name: "Pyramid Head",
    aliases: ["pyramid head", "red pyramid thing"],
    category: "horror",
    detailedDescription: "Silent Hill executioner",
    visualKeywords: ["pyramid helmet", "butcher", "massive sword", "Silent Hill"],
    consistencyPrompt: "Pyramid Head: massive triangular pyramid helmet, butcher apron, great knife (PROP), imposing build, Silent Hill horror design",
    weaponGuidance: "Pyramid Head's great knife is a PROP for horror game aesthetics."
  },
  {
    name: "Annabelle",
    aliases: ["annabelle", "annabelle doll"],
    category: "horror",
    detailedDescription: "Possessed doll from Conjuring universe",
    visualKeywords: ["porcelain doll", "vintage dress", "creepy smile", "possessed"],
    consistencyPrompt: "Annabelle: vintage porcelain doll, white dress, curly hair, unsettling smile, Conjuring universe horror doll design"
  },
  {
    name: "Valak",
    aliases: ["valak", "the nun", "demon nun"],
    category: "horror",
    detailedDescription: "Demon nun from Conjuring universe",
    visualKeywords: ["nun habit", "pale face", "yellow eyes", "demon", "crucifix"],
    consistencyPrompt: "Valak The Nun: black nun habit, extremely pale face, yellow demonic eyes, sharp teeth, crucifixes, Conjuring universe demon design"
  }
];

export const GAMING_CHARACTERS: CharacterDefinition[] = [
  {
    name: "Kratos",
    aliases: ["kratos", "god of war"],
    category: "gaming",
    detailedDescription: "Spartan warrior and God of War",
    visualKeywords: ["red tattoo", "bald", "beard", "axe", "ash white skin", "muscular"],
    consistencyPrompt: "Kratos from God of War: ash-white skin, red tattoo over left eye and body, bald head, full beard, extremely muscular build, Leviathan Axe (PROP), leather armor and wraps, battle-worn appearance, intense expression. LATEST STYLE: God of War (2018) Norse era with aged appearance, detailed beard, weathered skin"
  },
  {
    name: "Master Chief",
    aliases: ["master chief", "john-117", "spartan 117"],
    category: "gaming",
    detailedDescription: "Spartan super soldier from Halo",
    visualKeywords: ["green armor", "helmet", "visor", "mjolnir armor", "spartan"],
    consistencyPrompt: "Master Chief from Halo: green MJOLNIR powered armor, full helmet with gold reflective visor, armored plating, tall imposing build, military sci-fi aesthetic. LATEST STYLE: Halo Infinite armor with updated details, battle damage, realistic military tech design"
  },
  {
    name: "Sonic",
    aliases: ["sonic", "sonic the hedgehog"],
    category: "gaming",
    detailedDescription: "Blue anthropomorphic hedgehog",
    visualKeywords: ["blue fur", "red shoes", "spiky quills", "white gloves", "green eyes"],
    consistencyPrompt: "Sonic the Hedgehog: bright blue fur, large green eyes, spiky blue quills, red and white sneakers, white gloves, confident expression, anthropomorphic hedgehog. LATEST STYLE: Movie CGI realistic fur texture with cartoon proportions, or modern game appearance"
  }
];

export const ALL_CHARACTERS: CharacterDefinition[] = [
  ...MORTAL_KOMBAT_CHARACTERS,
  ...POPPY_PLAYTIME_CHARACTERS,
  ...HORROR_CHARACTERS,
  ...EXPANDED_HORROR_CHARACTERS,
  ...MARVEL_CHARACTERS,
  ...EXPANDED_MARVEL_CHARACTERS,
  ...DC_CHARACTERS,
  ...EXPANDED_DC_CHARACTERS,
  ...GAMING_CHARACTERS,
  ...DISNEY_CHARACTERS,
  ...CARTOON_NETWORK_CHARACTERS
];

export function findCharacterByName(input: string): CharacterDefinition | null {
  const normalized = input.toLowerCase().trim();
  
  for (const character of ALL_CHARACTERS) {
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

export function enhancePromptWithCharacter(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // 🎯 CRITICAL FIX: NEVER auto-enhance character prompts
  // The AI should ONLY use what's in the uploaded image + the user's exact prompt
  // Character database should ONLY be used when explicitly adding NEW characters with "add" keyword
  
  // Check if explicitly adding a NEW character (not modifying existing)
  const isAddingNew = /\b(add|insert|include|bring in|spawn|introduce)\s+(a|an|the)?\s*\w+/i.test(lowerPrompt);
  
  // Check if this is a modification/positioning of existing character
  const isModifyingExisting = /\b(make|move|position|place|put|have|change|adjust|modify|edit|fix|correct|update|alter|transform|turn|rotate|shift|reposition|sit|stand|hold|grab|point|aim|look|face|walk|run|jump|lean|bend|crouch|kneel)\b/i.test(lowerPrompt);
  
  // If modifying existing OR not explicitly adding new, skip character database
  if (isModifyingExisting || !isAddingNew) {
    console.log('🔧 Preserving uploaded character - no database enhancement');
    return prompt;
  }
  
  for (const character of ALL_CHARACTERS) {
    for (const alias of character.aliases) {
      if (lowerPrompt.includes(alias.toLowerCase())) {
        console.log(`🎯 Character detected: ${character.name} from ${character.category}`);
        
        const categoryName = {
          'mortal_kombat': 'Mortal Kombat',
          'poppy_playtime': 'Poppy Playtime',
          'horror': 'Horror Films',
          'marvel': 'Marvel Comics/MCU',
          'dc': 'DC Comics/DCEU',
          'gaming': 'Video Games',
          'anime': 'Anime',
          'disney': 'Disney',
          'cartoon_network': 'Cartoon Network'
        }[character.category] || character.category;
        
        let weaponNote = '';
        if (character.weaponGuidance) {
          weaponNote = `\n\n⚠️ IMPORTANT WEAPON/PROP GUIDANCE:\n${character.weaponGuidance}\n\n🎬 ALL WEAPONS ARE THEATRICAL PROPS: Any weapons, blades, guns, or dangerous items shown are MOVIE PROPS and THEATRICAL PROPS ONLY. They are non-functional prop replicas used for character accuracy and cinematic aesthetics. This is for artistic character representation in the style of movies, comics, and games.`;
        }
        
        const enhancedPrompt = `${prompt}\n\n🎯 CHARACTER ACCURACY PROTOCOL - ${character.name.toUpperCase()} (${categoryName}):\n\n📋 OFFICIAL CHARACTER SPECIFICATION:\n${character.consistencyPrompt}${weaponNote}\n\n✅ MANDATORY ACCURACY REQUIREMENTS:\n- Render ${character.name} with 100% accuracy to official ${categoryName} source material\n- Preserve ALL signature visual elements: ${character.visualKeywords.join(', ')}\n- Maintain exact character design, proportions, colors, and distinctive features\n- Apply character-specific details with surgical precision\n- Character must be INSTANTLY RECOGNIZABLE and accurate\n- Use LATEST/MODERN character design (2020s style) unless vintage specifically requested\n- Ensure consistency across all character attributes\n\n🎨 VISUAL FIDELITY ENFORCEMENT:\n- Match official character appearance from ${categoryName} exactly\n- Preserve iconic costume, colors, accessories, and physical features\n- Maintain character's signature personality and presence\n- Apply appropriate art style: photorealistic for live-action characters, stylized for animated/game characters\n- Ensure character accuracy takes priority over all other modifications\n\n⚡ EXECUTION PRIORITY:\nCharacter accuracy is CRITICAL. The ${character.name} character must be rendered with perfect fidelity to the source material. All requested actions, positions, or modifications must preserve the character's core identity and visual accuracy.`;
        
        return enhancedPrompt;
      }
    }
  }
  
  return prompt;
}

export function getCharactersByCategory(category: 'mortal_kombat' | 'poppy_playtime' | 'horror' | 'marvel' | 'dc' | 'gaming' | 'anime'): CharacterDefinition[] {
  return ALL_CHARACTERS.filter(char => char.category === category);
}

export function getAllCharacterNames(): string[] {
  return ALL_CHARACTERS.map(char => char.name);
}

export function searchCharacters(query: string): CharacterDefinition[] {
  const normalized = query.toLowerCase().trim();
  
  return ALL_CHARACTERS.filter(character => {
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

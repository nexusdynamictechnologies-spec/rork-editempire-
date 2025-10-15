export interface FortniteCharacterDefinition {
  name: string;
  aliases: string[];
  season: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Icon Series' | 'Gaming Legends' | 'Marvel Series' | 'DC Series' | 'Star Wars';
  detailedDescription: string;
  visualKeywords: string[];
  consistencyPrompt: string;
  latestVersion: string;
}

export const FORTNITE_CHARACTERS: FortniteCharacterDefinition[] = [
  {
    name: "Jonesy",
    aliases: ["jonesy", "agent jonesy", "john jones", "bunker jonesy"],
    season: "Chapter 1 - Present",
    rarity: "Legendary",
    detailedDescription: "Iconic default Fortnite character with blonde hair",
    visualKeywords: ["blonde hair", "blue eyes", "tactical outfit", "default skin", "military gear", "Fortnite icon"],
    consistencyPrompt: "Jonesy from Fortnite: blonde short hair, blue eyes, fair complexion, athletic build, tactical military outfit with armor plating, Fortnite default character appearance, confident soldier stance, iconic Fortnite protagonist look",
    latestVersion: "Latest: Agent Jonesy with tactical suit, blonde hair, military gear, Chapter 5 updated graphics with realistic textures"
  },
  {
    name: "Ramirez",
    aliases: ["ramirez", "headhunter", "renegade raider"],
    season: "Chapter 1 - Present",
    rarity: "Legendary",
    detailedDescription: "Female default character with dark hair",
    visualKeywords: ["dark hair", "ponytail", "tactical outfit", "female soldier", "athletic build", "default skin"],
    consistencyPrompt: "Ramirez from Fortnite: dark hair in ponytail, athletic female build, tactical military outfit, determined expression, olive complexion, Fortnite default female character, soldier stance, iconic Fortnite appearance",
    latestVersion: "Latest: Updated with Chapter 5 graphics, dark ponytail, tactical gear, realistic skin textures"
  },
  {
    name: "Peely",
    aliases: ["peely", "agent peely", "p-1000"],
    season: "Chapter 1 Season 8 - Present",
    rarity: "Epic",
    detailedDescription: "Anthropomorphic banana character",
    visualKeywords: ["banana", "yellow skin", "muscular build", "anthropomorphic", "comedic character", "iconic meme"],
    consistencyPrompt: "Peely from Fortnite: anthropomorphic banana character with yellow peel skin, muscular humanoid build, expressive face on banana, wearing tactical gear or suit, comedic yet heroic presence, iconic Fortnite meme character",
    latestVersion: "Latest: Agent Peely with tactical suit, P-1000 terminator version, various outfit variants"
  },
  {
    name: "Drift",
    aliases: ["drift", "catalyst"],
    season: "Chapter 1 Season 5",
    rarity: "Legendary",
    detailedDescription: "Masked character with Japanese-inspired design",
    visualKeywords: ["kitsune mask", "pink lightning", "hoodie", "Japanese aesthetic", "drift coat", "progressive skin"],
    consistencyPrompt: "Drift from Fortnite: white and pink kitsune fox mask, pink lightning effects, black hoodie with pink accents, Japanese street style aesthetic, drift coat flowing behind, athletic build, iconic progressive skin appearance",
    latestVersion: "Latest: Max stage with full kitsune mask, pink lightning aura, detailed coat with Japanese symbols"
  },
  {
    name: "Omega",
    aliases: ["omega", "oblivion"],
    season: "Chapter 1 Season 4",
    rarity: "Legendary",
    detailedDescription: "Armored villain with LED lights",
    visualKeywords: ["black armor", "LED lights", "helmet", "villain aesthetic", "progressive skin", "futuristic armor"],
    consistencyPrompt: "Omega from Fortnite: black futuristic armor with customizable LED lights (red, orange, purple), full helmet with glowing visor, muscular armored build, villain stance, progressive armor plating, menacing presence",
    latestVersion: "Latest: Max stage with full armor, glowing LED accents, detailed plating, various color options"
  },
  {
    name: "Raven",
    aliases: ["raven", "ravage"],
    season: "Chapter 1 Season 3",
    rarity: "Legendary",
    detailedDescription: "Dark hooded character with bird aesthetic",
    visualKeywords: ["purple hood", "bird mask", "dark aesthetic", "feathers", "mysterious", "gothic"],
    consistencyPrompt: "Raven from Fortnite: purple and black hooded outfit, bird-like mask with beak, dark gothic aesthetic, feather details, mysterious presence, athletic build, iconic dark character appearance",
    latestVersion: "Latest: Classic design with purple hood, detailed feather textures, glowing purple accents"
  },
  {
    name: "Skull Trooper",
    aliases: ["skull trooper", "skull ranger"],
    season: "Chapter 1 Season 1",
    rarity: "Epic",
    detailedDescription: "Skeleton-themed character",
    visualKeywords: ["skeleton face paint", "black outfit", "skull design", "Halloween theme", "OG skin", "rare"],
    consistencyPrompt: "Skull Trooper from Fortnite: black tactical outfit with white skeleton design, skull face paint, athletic build, Halloween aesthetic, OG rare skin appearance, iconic Fortnite character",
    latestVersion: "Latest: Classic black with white skeleton, purple glow variant, detailed bone patterns"
  },
  {
    name: "Ghoul Trooper",
    aliases: ["ghoul trooper"],
    season: "Chapter 1 Season 1",
    rarity: "Epic",
    detailedDescription: "Female zombie-themed character",
    visualKeywords: ["green skin", "pink hair", "zombie aesthetic", "Halloween theme", "OG skin", "rare"],
    consistencyPrompt: "Ghoul Trooper from Fortnite: green zombie skin, pink hair, black and green outfit, Halloween aesthetic, athletic female build, OG rare skin appearance, iconic Fortnite character",
    latestVersion: "Latest: Classic green skin with pink hair, zombie makeup, various color variants"
  },
  {
    name: "Black Knight",
    aliases: ["black knight", "red knight", "blue squire"],
    season: "Chapter 1 Season 2",
    rarity: "Legendary",
    detailedDescription: "Medieval knight with black armor",
    visualKeywords: ["black armor", "red eyes", "medieval knight", "helmet", "OG skin", "prestigious"],
    consistencyPrompt: "Black Knight from Fortnite: full black medieval armor, red glowing eyes in helmet, imposing knight stance, detailed armor plating, prestigious OG skin appearance, iconic Fortnite character",
    latestVersion: "Latest: Classic black armor with red eyes, detailed medieval plating, prestigious appearance"
  },
  {
    name: "John Wick",
    aliases: ["john wick", "the reaper", "keanu reeves"],
    season: "Chapter 1 Season 9",
    rarity: "Legendary",
    detailedDescription: "Legendary assassin in black suit",
    visualKeywords: ["black suit", "beard", "tactical", "assassin", "John Wick movie", "realistic"],
    consistencyPrompt: "John Wick from Fortnite: black tactical suit, dark beard, realistic human appearance based on Keanu Reeves, professional assassin stance, detailed suit textures, legendary hitman aesthetic",
    latestVersion: "Latest: Realistic Keanu Reeves likeness, black suit, detailed facial features, movie-accurate"
  },
  {
    name: "Midas",
    aliases: ["midas", "shadow midas", "golden midas"],
    season: "Chapter 2 Season 2",
    rarity: "Legendary",
    detailedDescription: "Character with golden touch ability",
    visualKeywords: ["white suit", "golden hands", "scar on face", "slicked hair", "tactical vest", "gold aesthetic"],
    consistencyPrompt: "Midas from Fortnite: white three-piece suit with golden accents, golden hands and forearms, scar across right eye, slicked back dark hair, tactical vest, sophisticated villain appearance, gold-touch aesthetic",
    latestVersion: "Latest: White suit with gold details, golden hands, facial scar, various golden variants"
  },
  {
    name: "Meowscles",
    aliases: ["meowscles", "kit", "shadow meowscles"],
    season: "Chapter 2 Season 2",
    rarity: "Epic",
    detailedDescription: "Muscular anthropomorphic cat",
    visualKeywords: ["muscular cat", "calico pattern", "buff", "anthropomorphic", "tactical gear", "meme character"],
    consistencyPrompt: "Meowscles from Fortnite: extremely muscular anthropomorphic cat, calico fur pattern (white, orange, black), buff bodybuilder physique, cat face with whiskers, tactical gear, intimidating yet comedic presence",
    latestVersion: "Latest: Buff calico cat with tactical vest, muscular build, various outfit variants"
  },
  {
    name: "Deadpool",
    aliases: ["deadpool", "wade wilson", "ravenpool"],
    season: "Chapter 2 Season 2",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's Merc with a Mouth",
    visualKeywords: ["red suit", "black patches", "katanas", "mask", "Marvel character", "fourth wall breaker"],
    consistencyPrompt: "Deadpool from Fortnite: red and black tactical suit, mask with black eye patches, katanas on back, athletic build, comedic pose potential, Marvel character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Movie-accurate red suit, detailed textures, katanas, various Marvel variants"
  },
  {
    name: "Wolverine",
    aliases: ["wolverine", "logan", "weapon x"],
    season: "Chapter 2 Season 4",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's X-Men mutant",
    visualKeywords: ["yellow suit", "claws", "mask with points", "muscular", "X-Men", "adamantium"],
    consistencyPrompt: "Wolverine from Fortnite: yellow and blue X-Men suit, mask with pointed sides, adamantium claws extended, muscular stocky build, aggressive stance, Marvel character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Comic-accurate yellow suit, detailed claw effects, muscular build, X-Men aesthetic"
  },
  {
    name: "Iron Man",
    aliases: ["iron man", "tony stark"],
    season: "Chapter 2 Season 4",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's armored Avenger",
    visualKeywords: ["red and gold armor", "arc reactor", "repulsors", "helmet", "Marvel", "Avenger"],
    consistencyPrompt: "Iron Man from Fortnite: red and gold metallic armor, glowing arc reactor, repulsor effects, sleek helmet, Marvel character accuracy, Fortnite-styled appearance, heroic stance",
    latestVersion: "Latest: MCU-inspired armor, glowing effects, detailed metallic textures, various suit variants"
  },
  {
    name: "Thor",
    aliases: ["thor", "god of thunder"],
    season: "Chapter 2 Season 4",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's Asgardian god",
    visualKeywords: ["red cape", "armor", "Mjolnir", "blonde hair", "Marvel", "Avenger"],
    consistencyPrompt: "Thor from Fortnite: Asgardian armor with red cape, Mjolnir hammer, long blonde hair, muscular build, lightning effects, Marvel character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: MCU-inspired armor, detailed cape, Mjolnir effects, various Avengers variants"
  },
  {
    name: "Storm",
    aliases: ["storm", "ororo munroe"],
    season: "Chapter 2 Season 4",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's X-Men weather controller",
    visualKeywords: ["white hair", "black suit", "lightning", "X-Men", "goddess", "weather powers"],
    consistencyPrompt: "Storm from Fortnite: long white hair, black X-Men suit with cape, lightning effects, powerful stance, Marvel character accuracy, Fortnite-styled appearance, weather goddess aesthetic",
    latestVersion: "Latest: Comic-accurate white hair, black suit, lightning effects, X-Men aesthetic"
  },
  {
    name: "Mystique",
    aliases: ["mystique", "raven darkholme"],
    season: "Chapter 2 Season 4",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's shape-shifting mutant",
    visualKeywords: ["blue skin", "red hair", "yellow eyes", "X-Men", "shape-shifter", "scales"],
    consistencyPrompt: "Mystique from Fortnite: blue scaled skin, red hair, yellow eyes, athletic build, X-Men suit, shape-shifter aesthetic, Marvel character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Blue skin with scale texture, red hair, yellow eyes, X-Men suit variants"
  },
  {
    name: "Venom",
    aliases: ["venom", "eddie brock", "symbiote"],
    season: "Chapter 2 Season 8",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's alien symbiote",
    visualKeywords: ["black symbiote", "white spider logo", "sharp teeth", "long tongue", "Marvel", "anti-hero"],
    consistencyPrompt: "Venom from Fortnite: massive black symbiote, white spider logo, enormous sharp teeth, long tongue, muscular build, Marvel character accuracy, Fortnite-styled appearance, menacing presence",
    latestVersion: "Latest: Detailed symbiote texture, white logo, teeth and tongue effects, various variants"
  },
  {
    name: "Spider-Man",
    aliases: ["spider-man", "spiderman", "peter parker", "miles morales"],
    season: "Chapter 3 Season 1",
    rarity: "Marvel Series",
    detailedDescription: "Marvel's web-slinging hero",
    visualKeywords: ["red and blue suit", "web pattern", "spider logo", "mask", "Marvel", "web-slinger"],
    consistencyPrompt: "Spider-Man from Fortnite: red and blue suit with web pattern, spider logo on chest, web shooters, athletic build, dynamic pose, Marvel character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: MCU and comic variants, detailed web pattern, various Spider-Man versions including Miles Morales"
  },
  {
    name: "Batman",
    aliases: ["batman", "bruce wayne", "dark knight"],
    season: "Chapter 2 Season 7",
    rarity: "DC Series",
    detailedDescription: "DC's Dark Knight",
    visualKeywords: ["bat symbol", "cape", "cowl", "utility belt", "DC Comics", "dark knight"],
    consistencyPrompt: "Batman from Fortnite: dark grey/black armor with bat symbol, flowing cape, cowl with pointed ears, utility belt, DC character accuracy, Fortnite-styled appearance, intimidating presence",
    latestVersion: "Latest: Various Batman variants including Armored, Zero Point, and comic versions"
  },
  {
    name: "Harley Quinn",
    aliases: ["harley quinn", "harleen quinzel"],
    season: "Chapter 2 Season 1",
    rarity: "DC Series",
    detailedDescription: "DC's chaotic anti-hero",
    visualKeywords: ["pigtails", "red and blue", "baseball bat", "jester", "DC Comics", "Joker's girlfriend"],
    consistencyPrompt: "Harley Quinn from Fortnite: blonde pigtails with red and blue dye, red and blue outfit, baseball bat, playful yet dangerous expression, DC character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Various Harley variants including Rebirth, classic, and movie versions"
  },
  {
    name: "The Mandalorian",
    aliases: ["mandalorian", "mando", "din djarin"],
    season: "Chapter 2 Season 5",
    rarity: "Star Wars",
    detailedDescription: "Star Wars bounty hunter",
    visualKeywords: ["beskar armor", "helmet", "cape", "jetpack", "Star Wars", "bounty hunter"],
    consistencyPrompt: "The Mandalorian from Fortnite: silver beskar armor, T-visor helmet, brown cape, jetpack, blaster rifle, Star Wars character accuracy, Fortnite-styled appearance, bounty hunter stance",
    latestVersion: "Latest: Beskar armor with detailed textures, various weapon options, Star Wars aesthetic"
  },
  {
    name: "Boba Fett",
    aliases: ["boba fett"],
    season: "Chapter 2 Season 5",
    rarity: "Star Wars",
    detailedDescription: "Star Wars legendary bounty hunter",
    visualKeywords: ["green armor", "helmet", "jetpack", "Star Wars", "bounty hunter", "Mandalorian"],
    consistencyPrompt: "Boba Fett from Fortnite: green and red Mandalorian armor, T-visor helmet, jetpack, blaster rifle, Star Wars character accuracy, Fortnite-styled appearance, legendary bounty hunter",
    latestVersion: "Latest: Classic green armor, detailed weathering, jetpack effects, Star Wars aesthetic"
  },
  {
    name: "Kratos",
    aliases: ["kratos", "god of war"],
    season: "Chapter 2 Season 5",
    rarity: "Gaming Legends",
    detailedDescription: "God of War protagonist",
    visualKeywords: ["red tattoo", "bald", "beard", "axe", "ash white skin", "muscular"],
    consistencyPrompt: "Kratos from Fortnite: ash-white skin, red tattoo over eye, bald head, full beard, Leviathan Axe, muscular build, God of War character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Norse era Kratos with beard, Leviathan Axe, detailed armor, God of War aesthetic"
  },
  {
    name: "Master Chief",
    aliases: ["master chief", "john-117", "spartan"],
    season: "Chapter 2 Season 5",
    rarity: "Gaming Legends",
    detailedDescription: "Halo's Spartan super soldier",
    visualKeywords: ["green armor", "helmet", "visor", "Mjolnir armor", "Halo", "Spartan"],
    consistencyPrompt: "Master Chief from Fortnite: green Mjolnir armor, gold visor helmet, assault rifle, Halo character accuracy, Fortnite-styled appearance, Spartan soldier stance",
    latestVersion: "Latest: Halo Infinite armor design, detailed plating, various weapon options"
  },
  {
    name: "Lara Croft",
    aliases: ["lara croft", "tomb raider"],
    season: "Chapter 2 Season 6",
    rarity: "Gaming Legends",
    detailedDescription: "Tomb Raider protagonist",
    visualKeywords: ["dual pistols", "tank top", "shorts", "braid", "athletic", "adventurer"],
    consistencyPrompt: "Lara Croft from Fortnite: classic tank top and shorts, dual pistols, long braid, athletic build, adventurer stance, Tomb Raider character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic and modern Lara variants, detailed gear, various outfit options"
  },
  {
    name: "Aloy",
    aliases: ["aloy", "horizon"],
    season: "Chapter 2 Season 6",
    rarity: "Gaming Legends",
    detailedDescription: "Horizon Zero Dawn protagonist",
    visualKeywords: ["red hair", "tribal outfit", "bow", "focus device", "hunter", "machine hunter"],
    consistencyPrompt: "Aloy from Fortnite: red hair in braids, tribal hunter outfit, bow and arrow, Focus device on head, athletic build, Horizon character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Horizon Forbidden West design, detailed tribal gear, bow effects"
  },
  {
    name: "Ryu",
    aliases: ["ryu", "street fighter"],
    season: "Chapter 2 Season 6",
    rarity: "Gaming Legends",
    detailedDescription: "Street Fighter protagonist",
    visualKeywords: ["white gi", "red headband", "black belt", "barefoot", "martial artist", "hadouken"],
    consistencyPrompt: "Ryu from Fortnite: white karate gi with torn sleeves, red headband, black belt, barefoot, muscular build, martial artist stance, Street Fighter character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic white gi, detailed fabric textures, various Street Fighter effects"
  },
  {
    name: "Chun-Li",
    aliases: ["chun-li", "street fighter"],
    season: "Chapter 2 Season 6",
    rarity: "Gaming Legends",
    detailedDescription: "Street Fighter's first lady",
    visualKeywords: ["blue qipao", "ox horns hairstyle", "spiked bracelets", "white boots", "martial artist"],
    consistencyPrompt: "Chun-Li from Fortnite: blue qipao dress, ox horns hairstyle, spiked bracelets, white boots, athletic build, martial artist stance, Street Fighter character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic blue qipao, detailed hair buns, various Street Fighter variants"
  },
  {
    name: "Neymar Jr",
    aliases: ["neymar", "neymar jr", "neymar junior"],
    season: "Chapter 2 Season 6",
    rarity: "Icon Series",
    detailedDescription: "Brazilian football superstar",
    visualKeywords: ["football jersey", "athletic build", "soccer player", "Brazilian", "sports icon"],
    consistencyPrompt: "Neymar Jr from Fortnite: Brazilian football jersey, athletic build, realistic likeness, soccer player appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Various jersey variants, realistic facial features, football gear options"
  },
  {
    name: "Ariana Grande",
    aliases: ["ariana grande", "spacefarer ariana"],
    season: "Chapter 2 Season 7",
    rarity: "Icon Series",
    detailedDescription: "Pop superstar",
    visualKeywords: ["high ponytail", "glamorous outfit", "pop star", "Icon Series", "concert"],
    consistencyPrompt: "Ariana Grande from Fortnite: signature high ponytail, glamorous outfit, realistic likeness, pop star appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Rift Tour variants, detailed hair and makeup, various concert outfits"
  },
  {
    name: "LeBron James",
    aliases: ["lebron james", "king james", "lebron"],
    season: "Chapter 2 Season 7",
    rarity: "Icon Series",
    detailedDescription: "NBA legend",
    visualKeywords: ["basketball jersey", "athletic build", "NBA player", "sports icon", "King James"],
    consistencyPrompt: "LeBron James from Fortnite: basketball jersey, extremely athletic build, realistic likeness, NBA player appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Various jersey variants including Tune Squad, realistic facial features"
  },
  {
    name: "Rick Sanchez",
    aliases: ["rick sanchez", "rick", "rick and morty"],
    season: "Chapter 2 Season 7",
    rarity: "Icon Series",
    detailedDescription: "Rick and Morty protagonist",
    visualKeywords: ["blue hair", "lab coat", "portal gun", "scientist", "cartoon character"],
    consistencyPrompt: "Rick Sanchez from Fortnite: spiky blue hair, white lab coat, portal gun, scientist appearance, Rick and Morty character accuracy, Fortnite-styled appearance, cynical expression",
    latestVersion: "Latest: Cartoon-accurate design, portal gun effects, various Rick variants"
  },
  {
    name: "Naruto Uzumaki",
    aliases: ["naruto", "naruto uzumaki", "hokage"],
    season: "Chapter 2 Season 8",
    rarity: "Icon Series",
    detailedDescription: "Naruto anime protagonist",
    visualKeywords: ["orange jumpsuit", "blonde hair", "headband", "ninja", "anime character", "whisker marks"],
    consistencyPrompt: "Naruto Uzumaki from Fortnite: orange and black ninja jumpsuit, blonde spiky hair, Konoha headband, whisker marks on face, anime character accuracy, Fortnite-styled appearance, ninja stance",
    latestVersion: "Latest: Various Naruto variants including Hokage, detailed anime styling, jutsu effects"
  },
  {
    name: "Sasuke Uchiha",
    aliases: ["sasuke", "sasuke uchiha"],
    season: "Chapter 3 Season 3",
    rarity: "Icon Series",
    detailedDescription: "Naruto rival character",
    visualKeywords: ["black outfit", "dark hair", "Sharingan", "ninja", "anime character", "Uchiha"],
    consistencyPrompt: "Sasuke Uchiha from Fortnite: black ninja outfit, dark spiky hair, Sharingan eyes, anime character accuracy, Fortnite-styled appearance, rival ninja stance",
    latestVersion: "Latest: Various Sasuke variants, Sharingan effects, detailed anime styling"
  },
  {
    name: "Kakashi Hatake",
    aliases: ["kakashi", "kakashi hatake", "copy ninja"],
    season: "Chapter 3 Season 3",
    rarity: "Icon Series",
    detailedDescription: "Naruto's sensei",
    visualKeywords: ["silver hair", "mask", "Sharingan eye", "ninja", "anime character", "sensei"],
    consistencyPrompt: "Kakashi Hatake from Fortnite: silver spiky hair, face mask covering lower face, Sharingan eye, ninja outfit, anime character accuracy, Fortnite-styled appearance, sensei stance",
    latestVersion: "Latest: Detailed mask and hair, Sharingan effects, various ninja gear"
  },
  {
    name: "Sakura Haruno",
    aliases: ["sakura", "sakura haruno"],
    season: "Chapter 3 Season 3",
    rarity: "Icon Series",
    detailedDescription: "Naruto team member",
    visualKeywords: ["pink hair", "red outfit", "medical ninja", "anime character", "kunoichi"],
    consistencyPrompt: "Sakura Haruno from Fortnite: pink hair, red ninja outfit, medical ninja appearance, anime character accuracy, Fortnite-styled appearance, kunoichi stance",
    latestVersion: "Latest: Various Sakura variants, detailed anime styling, medical jutsu effects"
  },
  {
    name: "Goku",
    aliases: ["goku", "son goku", "kakarot"],
    season: "Chapter 4 Season 4",
    rarity: "Icon Series",
    detailedDescription: "Dragon Ball protagonist",
    visualKeywords: ["orange gi", "black hair", "Super Saiyan", "anime character", "martial artist"],
    consistencyPrompt: "Goku from Fortnite: orange and blue gi, spiky black hair (or golden Super Saiyan), anime character accuracy, Fortnite-styled appearance, martial artist stance, Dragon Ball aesthetic",
    latestVersion: "Latest: Various forms including base and Super Saiyan, detailed gi, energy effects"
  },
  {
    name: "Vegeta",
    aliases: ["vegeta", "prince vegeta"],
    season: "Chapter 4 Season 4",
    rarity: "Icon Series",
    detailedDescription: "Dragon Ball rival",
    visualKeywords: ["blue armor", "black hair", "Saiyan prince", "anime character", "martial artist"],
    consistencyPrompt: "Vegeta from Fortnite: blue and white Saiyan armor, spiky black hair, anime character accuracy, Fortnite-styled appearance, proud warrior stance, Dragon Ball aesthetic",
    latestVersion: "Latest: Various forms including base and Super Saiyan, detailed armor, energy effects"
  },
  {
    name: "Beerus",
    aliases: ["beerus", "lord beerus", "god of destruction"],
    season: "Chapter 4 Season 4",
    rarity: "Icon Series",
    detailedDescription: "Dragon Ball God of Destruction",
    visualKeywords: ["purple cat", "Egyptian aesthetic", "god", "anime character", "destroyer"],
    consistencyPrompt: "Beerus from Fortnite: purple cat-like appearance, Egyptian god aesthetic, tall imposing build, anime character accuracy, Fortnite-styled appearance, god of destruction presence",
    latestVersion: "Latest: Detailed cat features, Egyptian clothing, destruction energy effects"
  },
  {
    name: "Bulma",
    aliases: ["bulma", "bulma brief"],
    season: "Chapter 4 Season 4",
    rarity: "Icon Series",
    detailedDescription: "Dragon Ball scientist",
    visualKeywords: ["blue hair", "scientist outfit", "capsule corp", "anime character", "inventor"],
    consistencyPrompt: "Bulma from Fortnite: blue hair, scientist outfit with Capsule Corp logo, anime character accuracy, Fortnite-styled appearance, inventor aesthetic, Dragon Ball character",
    latestVersion: "Latest: Various outfit variants, detailed hair, Capsule Corp branding"
  },
  {
    name: "The Weeknd",
    aliases: ["the weeknd", "abel tesfaye"],
    season: "Chapter 2 Season 7",
    rarity: "Icon Series",
    detailedDescription: "R&B superstar",
    visualKeywords: ["signature hairstyle", "red suit", "pop star", "Icon Series", "musician"],
    consistencyPrompt: "The Weeknd from Fortnite: signature hairstyle, red suit from After Hours era, realistic likeness, pop star appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: After Hours red suit variant, detailed facial features, various outfit options"
  },
  {
    name: "Bruno Mars",
    aliases: ["bruno mars", "peter hernandez"],
    season: "Chapter 3 Season 2",
    rarity: "Icon Series",
    detailedDescription: "Pop and R&B superstar",
    visualKeywords: ["fedora", "stylish outfit", "pop star", "Icon Series", "musician"],
    consistencyPrompt: "Bruno Mars from Fortnite: fedora hat, stylish performance outfit, realistic likeness, pop star appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Various performance outfits, detailed facial features, musician aesthetic"
  },
  {
    name: "Anderson .Paak",
    aliases: ["anderson paak", "anderson .paak"],
    season: "Chapter 3 Season 2",
    rarity: "Icon Series",
    detailedDescription: "R&B artist and drummer",
    visualKeywords: ["drummer outfit", "stylish", "musician", "Icon Series", "performer"],
    consistencyPrompt: "Anderson .Paak from Fortnite: stylish drummer outfit, realistic likeness, musician appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Performance outfit variants, detailed facial features, drummer aesthetic"
  },
  {
    name: "Travis Scott",
    aliases: ["travis scott", "cactus jack"],
    season: "Chapter 2 Season 2",
    rarity: "Icon Series",
    detailedDescription: "Rapper and producer",
    visualKeywords: ["braids", "Cactus Jack", "rapper", "Icon Series", "Astronomical"],
    consistencyPrompt: "Travis Scott from Fortnite: braided hair, Cactus Jack aesthetic, realistic likeness, rapper appearance, Icon Series character accuracy, Fortnite-styled appearance, Astronomical event styling",
    latestVersion: "Latest: Astronomical variants including giant and cyborg forms, detailed styling"
  },
  {
    name: "Marshmello",
    aliases: ["marshmello", "mello"],
    season: "Chapter 1 Season 7",
    rarity: "Icon Series",
    detailedDescription: "DJ with marshmallow helmet",
    visualKeywords: ["marshmallow helmet", "white outfit", "DJ", "Icon Series", "electronic music"],
    consistencyPrompt: "Marshmello from Fortnite: white marshmallow helmet with X eyes and smile, white outfit, DJ appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic marshmallow helmet, various outfit colors, DJ aesthetic"
  },
  {
    name: "Major Lazer",
    aliases: ["major lazer"],
    season: "Chapter 2 Season 1",
    rarity: "Icon Series",
    detailedDescription: "Electronic music project character",
    visualKeywords: ["mohawk", "sunglasses", "military outfit", "DJ", "Icon Series"],
    consistencyPrompt: "Major Lazer from Fortnite: mohawk hairstyle, sunglasses, military-inspired outfit, DJ appearance, Icon Series character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic mohawk and sunglasses, military gear, electronic music aesthetic"
  },
  {
    name: "Eminem",
    aliases: ["eminem", "slim shady", "marshall mathers"],
    season: "Chapter 5 Season 1",
    rarity: "Icon Series",
    detailedDescription: "Legendary rapper",
    visualKeywords: ["blonde hair", "hoodie", "rapper", "Icon Series", "hip-hop"],
    consistencyPrompt: "Eminem from Fortnite: blonde hair, hoodie or casual outfit, realistic likeness, rapper appearance, Icon Series character accuracy, Fortnite-styled appearance, hip-hop aesthetic",
    latestVersion: "Latest: Various outfit variants, detailed facial features, rapper styling"
  },
  {
    name: "Snoop Dogg",
    aliases: ["snoop dogg", "snoop", "calvin broadus"],
    season: "Chapter 5 Season 2",
    rarity: "Icon Series",
    detailedDescription: "Legendary rapper and icon",
    visualKeywords: ["braids", "sunglasses", "rapper", "Icon Series", "hip-hop legend"],
    consistencyPrompt: "Snoop Dogg from Fortnite: braided hair, sunglasses, casual rapper outfit, realistic likeness, Icon Series character accuracy, Fortnite-styled appearance, hip-hop legend aesthetic",
    latestVersion: "Latest: Various outfit variants including Death Row Records styling, detailed features"
  },
  {
    name: "Kelsier",
    aliases: ["kelsier", "mistborn"],
    season: "Chapter 5 Season 1",
    rarity: "Gaming Legends",
    detailedDescription: "Mistborn protagonist",
    visualKeywords: ["mistcloak", "scars", "thief", "fantasy", "Mistborn"],
    consistencyPrompt: "Kelsier from Fortnite: black mistcloak, facial scars, thief aesthetic, fantasy character accuracy, Fortnite-styled appearance, Mistborn universe styling",
    latestVersion: "Latest: Detailed mistcloak, scar effects, fantasy thief aesthetic"
  },
  {
    name: "Solid Snake",
    aliases: ["solid snake", "snake", "metal gear"],
    season: "Chapter 5 Season 1",
    rarity: "Gaming Legends",
    detailedDescription: "Metal Gear protagonist",
    visualKeywords: ["bandana", "sneaking suit", "tactical", "stealth", "Metal Gear"],
    consistencyPrompt: "Solid Snake from Fortnite: bandana, sneaking suit, tactical gear, stealth operative appearance, Metal Gear character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Classic sneaking suit, detailed tactical gear, Metal Gear aesthetic"
  },
  {
    name: "Eren Yeager",
    aliases: ["eren yeager", "eren jaeger", "attack titan"],
    season: "Chapter 5 Season 1",
    rarity: "Icon Series",
    detailedDescription: "Attack on Titan protagonist",
    visualKeywords: ["Survey Corps uniform", "brown hair", "green eyes", "anime character", "titan shifter"],
    consistencyPrompt: "Eren Yeager from Fortnite: Survey Corps uniform with green cape, brown hair, green eyes, anime character accuracy, Fortnite-styled appearance, Attack on Titan aesthetic",
    latestVersion: "Latest: Survey Corps uniform, detailed cape, various Eren variants"
  },
  {
    name: "Mikasa Ackerman",
    aliases: ["mikasa", "mikasa ackerman"],
    season: "Chapter 5 Season 1",
    rarity: "Icon Series",
    detailedDescription: "Attack on Titan character",
    visualKeywords: ["Survey Corps uniform", "black hair", "red scarf", "anime character", "soldier"],
    consistencyPrompt: "Mikasa Ackerman from Fortnite: Survey Corps uniform, black hair, red scarf, anime character accuracy, Fortnite-styled appearance, Attack on Titan aesthetic, soldier stance",
    latestVersion: "Latest: Survey Corps uniform, detailed scarf, various Mikasa variants"
  },
  {
    name: "Levi Ackerman",
    aliases: ["levi", "levi ackerman", "captain levi"],
    season: "Chapter 5 Season 1",
    rarity: "Icon Series",
    detailedDescription: "Attack on Titan captain",
    visualKeywords: ["Survey Corps uniform", "black hair", "cravat", "anime character", "captain"],
    consistencyPrompt: "Levi Ackerman from Fortnite: Survey Corps uniform, black hair in undercut, white cravat, anime character accuracy, Fortnite-styled appearance, Attack on Titan aesthetic, captain stance",
    latestVersion: "Latest: Survey Corps uniform, detailed cravat, various Levi variants"
  },
  {
    name: "Optimus Prime",
    aliases: ["optimus prime", "optimus"],
    season: "Chapter 4 Season 3",
    rarity: "Gaming Legends",
    detailedDescription: "Transformers leader",
    visualKeywords: ["red and blue", "truck", "robot", "Autobot", "leader", "Transformers"],
    consistencyPrompt: "Optimus Prime from Fortnite: red and blue robot form, Autobot leader appearance, truck transformation elements, Transformers character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Detailed robot form, transformation effects, Autobot insignia"
  },
  {
    name: "Megatron",
    aliases: ["megatron"],
    season: "Chapter 4 Season 3",
    rarity: "Gaming Legends",
    detailedDescription: "Transformers villain",
    visualKeywords: ["grey and purple", "tank", "robot", "Decepticon", "villain", "Transformers"],
    consistencyPrompt: "Megatron from Fortnite: grey and purple robot form, Decepticon leader appearance, tank transformation elements, Transformers character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Detailed robot form, transformation effects, Decepticon insignia"
  },
  {
    name: "Furiosa",
    aliases: ["furiosa", "imperator furiosa"],
    season: "Chapter 5 Season 2",
    rarity: "Icon Series",
    detailedDescription: "Mad Max character",
    visualKeywords: ["shaved head", "mechanical arm", "war rig", "post-apocalyptic", "warrior"],
    consistencyPrompt: "Furiosa from Fortnite: shaved head, mechanical arm, post-apocalyptic warrior outfit, Mad Max character accuracy, Fortnite-styled appearance, wasteland aesthetic",
    latestVersion: "Latest: Detailed mechanical arm, post-apocalyptic gear, Mad Max styling"
  },
  {
    name: "Katniss Everdeen",
    aliases: ["katniss", "katniss everdeen", "mockingjay"],
    season: "Chapter 5 Season 2",
    rarity: "Icon Series",
    detailedDescription: "Hunger Games protagonist",
    visualKeywords: ["bow and arrow", "braid", "Mockingjay", "hunter", "rebellion"],
    consistencyPrompt: "Katniss Everdeen from Fortnite: bow and arrow, hair in braid, Mockingjay outfit, hunter appearance, Hunger Games character accuracy, Fortnite-styled appearance",
    latestVersion: "Latest: Mockingjay outfit, detailed bow, rebellion aesthetic"
  },
  {
    name: "Geralt of Rivia",
    aliases: ["geralt", "geralt of rivia", "the witcher"],
    season: "Chapter 5 Season 1",
    rarity: "Gaming Legends",
    detailedDescription: "The Witcher protagonist",
    visualKeywords: ["white hair", "yellow eyes", "swords", "witcher", "monster hunter"],
    consistencyPrompt: "Geralt of Rivia from Fortnite: long white hair, yellow cat-like eyes, two swords on back, witcher armor, The Witcher character accuracy, Fortnite-styled appearance, monster hunter aesthetic",
    latestVersion: "Latest: Detailed witcher armor, dual swords, yellow eyes effect, various armor variants"
  },
  {
    name: "Ciri",
    aliases: ["ciri", "cirilla"],
    season: "Chapter 5 Season 1",
    rarity: "Gaming Legends",
    detailedDescription: "The Witcher character",
    visualKeywords: ["ashen hair", "scar", "sword", "witcher", "princess"],
    consistencyPrompt: "Ciri from Fortnite: ashen blonde hair, facial scar, sword, witcher outfit, The Witcher character accuracy, Fortnite-styled appearance, princess warrior aesthetic",
    latestVersion: "Latest: Detailed witcher outfit, scar effect, sword, various outfit variants"
  }
];

export function findFortniteCharacterByName(input: string): FortniteCharacterDefinition | null {
  const normalized = input.toLowerCase().trim();
  
  for (const character of FORTNITE_CHARACTERS) {
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

export function enhancePromptWithFortniteCharacter(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  for (const character of FORTNITE_CHARACTERS) {
    for (const alias of character.aliases) {
      if (lowerPrompt.includes(alias.toLowerCase())) {
        console.log(`🎮 Fortnite character detected: ${character.name} (${character.rarity})`);
        
        const enhancedPrompt = `${prompt}\n\n🎮 FORTNITE CHARACTER ACCURACY PROTOCOL - ${character.name.toUpperCase()}\n\n📋 OFFICIAL FORTNITE CHARACTER SPECIFICATION:\n${character.consistencyPrompt}\n\n✅ LATEST VERSION:\n${character.latestVersion}\n\n🎯 MANDATORY ACCURACY REQUIREMENTS:\n- Render ${character.name} with 100% accuracy to official Fortnite appearance\n- Preserve ALL signature visual elements: ${character.visualKeywords.join(', ')}\n- Maintain exact character design, proportions, colors, and distinctive features from Fortnite\n- Apply Fortnite-specific details with surgical precision\n- Character must be INSTANTLY RECOGNIZABLE as the Fortnite version\n- Use LATEST/CURRENT Fortnite design (Chapter 5 graphics) unless vintage specifically requested\n- Ensure consistency across all character attributes\n- Maintain Fortnite's art style and aesthetic\n\n🎨 VISUAL FIDELITY ENFORCEMENT:\n- Match official Fortnite character appearance exactly\n- Preserve iconic outfit, colors, accessories, and physical features from the game\n- Maintain character's signature personality and presence from Fortnite\n- Apply appropriate Fortnite art style: stylized realistic with vibrant colors\n- Ensure character accuracy takes priority over all other modifications\n- Keep Fortnite's distinctive visual style and quality\n\n⚡ EXECUTION PRIORITY:\nFortnite character accuracy is CRITICAL. The ${character.name} character must be rendered with perfect fidelity to the official Fortnite game appearance. All requested actions, positions, or modifications must preserve the character's core Fortnite identity and visual accuracy.\n\n🏆 RARITY: ${character.rarity}\n📅 SEASON: ${character.season}`;
        
        return enhancedPrompt;
      }
    }
  }
  
  return prompt;
}

export function getFortniteCharactersByRarity(rarity: string): FortniteCharacterDefinition[] {
  return FORTNITE_CHARACTERS.filter(char => char.rarity === rarity);
}

export function getFortniteCharactersBySeason(season: string): FortniteCharacterDefinition[] {
  return FORTNITE_CHARACTERS.filter(char => char.season.includes(season));
}

export function getAllFortniteCharacterNames(): string[] {
  return FORTNITE_CHARACTERS.map(char => char.name);
}

export function searchFortniteCharacters(query: string): FortniteCharacterDefinition[] {
  const normalized = query.toLowerCase().trim();
  
  return FORTNITE_CHARACTERS.filter(character => {
    if (character.name.toLowerCase().includes(normalized)) return true;
    
    for (const alias of character.aliases) {
      if (alias.toLowerCase().includes(normalized)) return true;
    }
    
    for (const keyword of character.visualKeywords) {
      if (keyword.toLowerCase().includes(normalized)) return true;
    }
    
    if (character.season.toLowerCase().includes(normalized)) return true;
    if (character.rarity.toLowerCase().includes(normalized)) return true;
    
    return false;
  });
}

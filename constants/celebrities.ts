export interface CelebrityDefinition {
  name: string;
  aliases: string[];
  category: 'actor' | 'musician' | 'athlete' | 'influencer' | 'model' | 'director' | 'comedian';
  detailedDescription: string;
  visualKeywords: string[];
  consistencyPrompt: string;
  latestVersion: string;
}

export const CELEBRITIES: CelebrityDefinition[] = [
  {
    name: "Dwayne 'The Rock' Johnson",
    aliases: ["the rock", "dwayne johnson", "rock johnson", "dwayne the rock"],
    category: "actor",
    detailedDescription: "Former WWE wrestler turned Hollywood action star",
    visualKeywords: ["muscular build", "bald head", "raised eyebrow", "tribal tattoo", "broad shoulders", "charismatic smile"],
    consistencyPrompt: "Dwayne 'The Rock' Johnson: extremely muscular build with massive shoulders and arms, completely bald head, signature raised eyebrow expression, large Polynesian tribal tattoo covering left shoulder and chest, warm brown skin tone, strong jawline, charismatic confident smile, athletic physique, commanding presence",
    latestVersion: "2024 appearance: mature action star look, well-groomed beard or clean-shaven, peak physical condition, modern casual or action hero styling"
  },
  {
    name: "Zendaya",
    aliases: ["zendaya", "zendaya coleman"],
    category: "actor",
    detailedDescription: "Emmy-winning actress and fashion icon",
    visualKeywords: ["elegant features", "high cheekbones", "expressive eyes", "versatile hairstyles", "fashion forward", "graceful presence"],
    consistencyPrompt: "Zendaya: elegant facial features with high cheekbones, large expressive brown eyes, full lips, flawless complexion, versatile hairstyles (often long and styled), slender athletic build, fashion-forward styling, graceful confident posture, modern sophisticated appearance",
    latestVersion: "2024 appearance: mature elegant style, often with sleek straight hair or glamorous curls, high-fashion looks, natural makeup with emphasis on eyes"
  },
  {
    name: "Tom Holland",
    aliases: ["tom holland", "thomas holland"],
    category: "actor",
    detailedDescription: "British actor known for Spider-Man role",
    visualKeywords: ["youthful features", "brown hair", "athletic build", "boyish charm", "expressive face", "friendly smile"],
    consistencyPrompt: "Tom Holland: youthful British features, short to medium brown hair styled upward, athletic lean build, warm brown eyes, friendly approachable smile, clean-shaven or light stubble, boyish charm, expressive animated face, casual modern styling",
    latestVersion: "2024 appearance: slightly more mature look, well-groomed hair, maintained athletic physique, contemporary casual or smart-casual fashion"
  },
  {
    name: "Margot Robbie",
    aliases: ["margot robbie", "margot elise robbie"],
    category: "actor",
    detailedDescription: "Australian actress and producer",
    visualKeywords: ["blonde hair", "blue eyes", "classic beauty", "radiant smile", "elegant features", "versatile looks"],
    consistencyPrompt: "Margot Robbie: classic Hollywood beauty with blonde hair (various lengths and styles), striking blue eyes, flawless fair complexion, elegant facial features, radiant warm smile, slender athletic build, sophisticated styling, natural glamorous appearance",
    latestVersion: "2024 appearance: blonde hair often in waves or sleek styles, natural glowing makeup, elegant modern fashion, mature sophisticated look"
  },
  {
    name: "Ryan Reynolds",
    aliases: ["ryan reynolds", "ryan rodney reynolds"],
    category: "actor",
    detailedDescription: "Canadian actor and comedian known for Deadpool",
    visualKeywords: ["charming smile", "brown hair", "athletic build", "witty expression", "casual style", "handsome features"],
    consistencyPrompt: "Ryan Reynolds: handsome features with charming smile, short to medium brown hair, athletic build, green eyes, clean-shaven or light stubble, witty playful expression, casual confident styling, approachable demeanor, modern masculine appearance",
    latestVersion: "2024 appearance: well-maintained physique, contemporary hairstyle, casual smart fashion, mature handsome look with slight aging"
  },
  {
    name: "Scarlett Johansson",
    aliases: ["scarlett johansson", "scarlett ingrid johansson"],
    category: "actor",
    detailedDescription: "Acclaimed actress known for Black Widow role",
    visualKeywords: ["blonde hair", "distinctive voice", "classic features", "versatile looks", "strong presence", "elegant style"],
    consistencyPrompt: "Scarlett Johansson: classic Hollywood features, blonde hair (various lengths from short to long), green eyes, full lips, fair complexion, elegant bone structure, athletic yet feminine build, sophisticated styling, strong confident presence",
    latestVersion: "2024 appearance: mature elegant look, often shoulder-length blonde hair, natural sophisticated makeup, timeless fashion sense"
  },
  {
    name: "Chris Hemsworth",
    aliases: ["chris hemsworth", "christopher hemsworth"],
    category: "actor",
    detailedDescription: "Australian actor known for Thor role",
    visualKeywords: ["muscular build", "blonde hair", "blue eyes", "strong jawline", "tall stature", "action hero physique"],
    consistencyPrompt: "Chris Hemsworth: extremely muscular athletic build, blonde hair (medium length), striking blue eyes, strong defined jawline, tall imposing stature (6'3\"), fair complexion, rugged handsome features, action hero physique, confident masculine presence",
    latestVersion: "2024 appearance: maintained peak physical condition, blonde hair often styled back, well-groomed beard or clean-shaven, mature action star look"
  },
  {
    name: "Timothée Chalamet",
    aliases: ["timothee chalamet", "timmy chalamet"],
    category: "actor",
    detailedDescription: "Young acclaimed actor with distinctive style",
    visualKeywords: ["curly hair", "sharp cheekbones", "slender build", "artistic style", "expressive eyes", "fashion forward"],
    consistencyPrompt: "Timothée Chalamet: distinctive sharp cheekbones, curly dark brown hair (various lengths), expressive green eyes, slender artistic build, pale complexion, delicate yet masculine features, fashion-forward styling, artistic presence, youthful sophisticated appearance",
    latestVersion: "2024 appearance: mature artistic style, often with longer curly hair, experimental fashion choices, refined features"
  },
  {
    name: "Taylor Swift",
    aliases: ["taylor swift", "taylor alison swift"],
    category: "musician",
    detailedDescription: "Global pop superstar and songwriter",
    visualKeywords: ["blonde hair", "red lips", "tall stature", "elegant style", "blue eyes", "classic beauty"],
    consistencyPrompt: "Taylor Swift: tall slender build (5'11\"), blonde hair (straight or wavy, various lengths), striking blue eyes, fair complexion, signature red lipstick, elegant classic features, sophisticated fashion sense, graceful presence, iconic pop star appearance",
    latestVersion: "2024 appearance: Eras Tour era with glamorous stage looks, often with blonde hair in waves or straight, sparkly performance outfits or elegant casual wear"
  },
  {
    name: "Beyoncé",
    aliases: ["beyonce", "beyonce knowles", "beyonce knowles-carter", "queen bey"],
    category: "musician",
    detailedDescription: "Iconic singer, performer, and cultural icon",
    visualKeywords: ["powerful presence", "long hair", "glamorous style", "athletic build", "commanding stage presence", "flawless appearance"],
    consistencyPrompt: "Beyoncé: powerful commanding presence, long flowing hair (various colors and styles), flawless complexion, athletic curvy build, striking facial features, glamorous styling, confident posture, iconic performer appearance, regal elegant demeanor",
    latestVersion: "2024 appearance: Renaissance era with bold fashion choices, often platinum blonde or honey blonde hair, high-fashion glamorous looks, mature powerful presence"
  },
  {
    name: "Drake",
    aliases: ["drake", "aubrey drake graham", "champagne papi"],
    category: "musician",
    detailedDescription: "Canadian rapper and global music icon",
    visualKeywords: ["beard", "athletic build", "casual style", "confident expression", "modern fashion", "charismatic presence"],
    consistencyPrompt: "Drake: well-groomed full beard, short dark hair, athletic build, warm brown skin tone, expressive brown eyes, confident charismatic expression, modern casual luxury fashion, gold jewelry, approachable yet confident demeanor",
    latestVersion: "2024 appearance: mature rapper look with full beard, often in designer streetwear or luxury casual, maintained physique, contemporary urban style"
  },
  {
    name: "Ariana Grande",
    aliases: ["ariana grande", "ariana grande-butera"],
    category: "musician",
    detailedDescription: "Pop superstar with signature high ponytail",
    visualKeywords: ["high ponytail", "petite build", "cat eye makeup", "long hair", "glamorous style", "powerful voice"],
    consistencyPrompt: "Ariana Grande: signature high ponytail with long straight hair, petite slender build, large brown eyes with cat-eye makeup, full lips, olive complexion, glamorous feminine styling, elegant features, confident stage presence, iconic pop star appearance",
    latestVersion: "2024 appearance: mature pop star look, often with sleek high ponytail, glamorous makeup with winged eyeliner, elegant fashion choices"
  },
  {
    name: "LeBron James",
    aliases: ["lebron james", "king james", "lebron"],
    category: "athlete",
    detailedDescription: "NBA legend and basketball icon",
    visualKeywords: ["muscular build", "tall stature", "athletic physique", "powerful presence", "bald head", "commanding figure"],
    consistencyPrompt: "LeBron James: extremely tall (6'9\") and muscular athletic build, bald or very short hair, powerful commanding presence, dark brown skin tone, strong facial features, athletic physique, confident posture, basketball legend appearance",
    latestVersion: "2024 appearance: mature athletic look, maintained peak physical condition, often bald or very short hair, modern athletic or casual luxury fashion"
  },
  {
    name: "Cristiano Ronaldo",
    aliases: ["cristiano ronaldo", "ronaldo", "cr7", "cristiano"],
    category: "athlete",
    detailedDescription: "Football legend and global sports icon",
    visualKeywords: ["athletic build", "styled hair", "chiseled features", "confident smile", "muscular physique", "fashion conscious"],
    consistencyPrompt: "Cristiano Ronaldo: extremely athletic muscular build, styled dark hair (various cuts), chiseled facial features, confident charismatic smile, olive complexion, defined jawline, peak physical condition, fashion-forward styling, commanding athletic presence",
    latestVersion: "2024 appearance: mature athlete look, well-groomed hair, maintained peak physique, luxury fashion choices, sophisticated styling"
  },
  {
    name: "Serena Williams",
    aliases: ["serena williams", "serena jameka williams"],
    category: "athlete",
    detailedDescription: "Tennis legend and sports icon",
    visualKeywords: ["powerful build", "athletic physique", "confident presence", "strong features", "elegant style", "commanding figure"],
    consistencyPrompt: "Serena Williams: powerful athletic build, strong muscular physique, confident commanding presence, beautiful facial features, various hairstyles (braids, straight, curly), dark brown skin tone, elegant yet powerful demeanor, sports icon appearance",
    latestVersion: "2024 appearance: post-retirement elegant look, often with glamorous styling, maintained athletic build, sophisticated fashion choices"
  },
  {
    name: "Kim Kardashian",
    aliases: ["kim kardashian", "kim kardashian west", "kim k"],
    category: "influencer",
    detailedDescription: "Reality TV star and business mogul",
    visualKeywords: ["contoured makeup", "long dark hair", "curvy figure", "glamorous style", "fashion icon", "polished appearance"],
    consistencyPrompt: "Kim Kardashian: signature contoured makeup, long dark hair (straight or wavy), curvy hourglass figure, olive complexion, full lips, dramatic eye makeup, glamorous high-fashion styling, polished sophisticated appearance, iconic influencer look",
    latestVersion: "2024 appearance: sleek minimalist aesthetic, often with straight dark hair, neutral tones, high-fashion looks, mature sophisticated styling"
  },
  {
    name: "Kylie Jenner",
    aliases: ["kylie jenner", "kylie kristen jenner"],
    category: "influencer",
    detailedDescription: "Beauty mogul and social media icon",
    visualKeywords: ["full lips", "long hair", "glamorous makeup", "trendy style", "curvy figure", "fashion forward"],
    consistencyPrompt: "Kylie Jenner: signature full lips, long hair (various colors and styles), glamorous makeup with emphasis on lips and eyes, curvy figure, olive complexion, trendy fashion-forward styling, polished appearance, beauty mogul aesthetic",
    latestVersion: "2024 appearance: mature beauty mogul look, often with long dark or blonde hair, full glam makeup, high-fashion streetwear or elegant looks"
  },
  {
    name: "Elon Musk",
    aliases: ["elon musk", "elon reeve musk"],
    category: "influencer",
    detailedDescription: "Tech entrepreneur and innovator",
    visualKeywords: ["short hair", "casual style", "tech entrepreneur look", "confident expression", "modern appearance"],
    consistencyPrompt: "Elon Musk: short light brown hair, fair complexion, casual tech entrepreneur styling, confident expression, average build, modern business casual or casual wear, approachable yet confident demeanor, tech mogul appearance",
    latestVersion: "2024 appearance: mature tech CEO look, short well-groomed hair, often in casual business attire or simple t-shirts, maintained appearance"
  },
  {
    name: "Gigi Hadid",
    aliases: ["gigi hadid", "jelena noura hadid"],
    category: "model",
    detailedDescription: "Supermodel and fashion icon",
    visualKeywords: ["blonde hair", "blue eyes", "tall stature", "model physique", "elegant features", "runway presence"],
    consistencyPrompt: "Gigi Hadid: tall model stature (5'10\"), blonde hair (various styles), striking blue-green eyes, elegant facial features, slender athletic build, fair complexion, high-fashion styling, runway model presence, sophisticated appearance",
    latestVersion: "2024 appearance: mature supermodel look, often with blonde hair in various styles, natural glowing makeup, high-fashion editorial looks"
  },
  {
    name: "Bella Hadid",
    aliases: ["bella hadid", "isabella khair hadid"],
    category: "model",
    detailedDescription: "Supermodel with distinctive features",
    visualKeywords: ["dark hair", "striking features", "model physique", "elegant style", "runway presence", "high cheekbones"],
    consistencyPrompt: "Bella Hadid: tall model stature (5'9\"), dark brown hair (sleek styles), striking facial features with high cheekbones, almond-shaped eyes, olive complexion, slender model physique, elegant sophisticated styling, runway presence, editorial model appearance",
    latestVersion: "2024 appearance: mature editorial model look, often with sleek dark hair, minimal makeup emphasizing features, avant-garde fashion choices"
  },
  {
    name: "Bad Bunny",
    aliases: ["bad bunny", "benito antonio martinez ocasio"],
    category: "musician",
    detailedDescription: "Puerto Rican reggaeton superstar",
    visualKeywords: ["colorful style", "tattoos", "sunglasses", "urban fashion", "distinctive look", "confident presence"],
    consistencyPrompt: "Bad Bunny: distinctive urban style, often with sunglasses, colorful fashion choices, visible tattoos, short to medium hair (various colors), athletic build, confident stage presence, modern streetwear or high-fashion looks, Puerto Rican reggaeton star appearance",
    latestVersion: "2024 appearance: experimental fashion with bold colors and patterns, often with dyed hair or unique styles, oversized streetwear, statement accessories"
  },
  {
    name: "Billie Eilish",
    aliases: ["billie eilish", "billie eilish pirate baird o'connell"],
    category: "musician",
    detailedDescription: "Alternative pop star with unique style",
    visualKeywords: ["distinctive hair colors", "oversized clothing", "unique style", "expressive eyes", "alternative fashion", "artistic presence"],
    consistencyPrompt: "Billie Eilish: distinctive hair (various bold colors - green, blonde, black), oversized baggy clothing, unique alternative fashion sense, expressive green eyes, fair complexion, artistic edgy styling, confident alternative presence, iconic Gen Z pop star appearance",
    latestVersion: "2024 appearance: mature artistic style, often with blonde or dark hair, still favoring oversized fits but more refined, experimental fashion choices"
  },
  {
    name: "The Weeknd",
    aliases: ["the weeknd", "abel tesfaye", "abel makkonen tesfaye"],
    category: "musician",
    detailedDescription: "R&B superstar with distinctive style",
    visualKeywords: ["signature hairstyle", "dark aesthetic", "stylish fashion", "confident presence", "modern look"],
    consistencyPrompt: "The Weeknd: signature hairstyle (formerly dreadlocks, now various styles), dark aesthetic, stylish modern fashion, confident stage presence, Ethiopian features, well-groomed appearance, contemporary R&B star look, sophisticated styling",
    latestVersion: "2024 appearance: clean modern look with short styled hair, often in all-black or monochrome outfits, mature sophisticated aesthetic"
  },
  {
    name: "Rihanna",
    aliases: ["rihanna", "robyn rihanna fenty"],
    category: "musician",
    detailedDescription: "Global superstar and fashion icon",
    visualKeywords: ["versatile hairstyles", "bold fashion", "confident presence", "glamorous style", "trendsetter", "powerful aura"],
    consistencyPrompt: "Rihanna: versatile hairstyles (short, long, various colors), bold fashion-forward styling, confident powerful presence, beautiful facial features, curvy athletic build, flawless complexion, trendsetting looks, glamorous yet edgy aesthetic, global icon appearance",
    latestVersion: "2024 appearance: mature mogul aesthetic, often with natural glowing skin, bold fashion choices, elegant yet edgy styling, post-pregnancy confident look"
  },
  {
    name: "Post Malone",
    aliases: ["post malone", "austin richard post"],
    category: "musician",
    detailedDescription: "Rapper and singer with distinctive appearance",
    visualKeywords: ["face tattoos", "long hair", "casual style", "tattoos", "unique look", "laid-back presence"],
    consistencyPrompt: "Post Malone: distinctive face tattoos, long hair (often in ponytail or braids), extensive body tattoos, casual laid-back style, facial hair, relaxed confident demeanor, unique hip-hop aesthetic, approachable presence",
    latestVersion: "2024 appearance: maintained signature look with face tattoos, often with long hair styled back, casual streetwear or western-inspired fashion"
  },
  {
    name: "Dua Lipa",
    aliases: ["dua lipa"],
    category: "musician",
    detailedDescription: "British-Albanian pop superstar",
    visualKeywords: ["dark hair", "striking features", "tall stature", "glamorous style", "confident presence", "fashion icon"],
    consistencyPrompt: "Dua Lipa: tall model-like stature (5'8\"), long dark hair (straight or wavy), striking facial features, full lips, olive complexion, glamorous high-fashion styling, confident stage presence, elegant yet edgy aesthetic, modern pop star appearance",
    latestVersion: "2024 appearance: mature pop star look with sleek dark hair, often in bold fashion choices, glamorous makeup, sophisticated styling"
  },
  {
    name: "Harry Styles",
    aliases: ["harry styles", "harry edward styles"],
    category: "musician",
    detailedDescription: "British singer and fashion icon",
    visualKeywords: ["curly hair", "fashion forward", "androgynous style", "charming smile", "artistic presence", "unique fashion"],
    consistencyPrompt: "Harry Styles: medium to long curly brown hair, charming smile, fashion-forward androgynous styling, slender athletic build, green eyes, fair complexion, artistic confident presence, bold fashion choices including suits, pearls, and colorful outfits, modern pop icon appearance",
    latestVersion: "2024 appearance: mature artistic style with shoulder-length curly hair, experimental fashion mixing masculine and feminine elements, sophisticated yet playful aesthetic"
  },
  {
    name: "Selena Gomez",
    aliases: ["selena gomez", "selena marie gomez"],
    category: "musician",
    detailedDescription: "Singer, actress, and beauty entrepreneur",
    visualKeywords: ["dark hair", "warm smile", "elegant style", "natural beauty", "approachable presence", "sophisticated look"],
    consistencyPrompt: "Selena Gomez: long dark hair (straight or wavy), warm friendly smile, elegant natural beauty, brown eyes, olive complexion, sophisticated yet approachable styling, curvy figure, confident presence, modern pop star and entrepreneur appearance",
    latestVersion: "2024 appearance: mature elegant look with long dark hair, natural glowing makeup, sophisticated fashion choices, confident body-positive presence"
  },
  {
    name: "Shawn Mendes",
    aliases: ["shawn mendes", "shawn peter raul mendes"],
    category: "musician",
    detailedDescription: "Canadian singer-songwriter",
    visualKeywords: ["curly hair", "athletic build", "charming smile", "casual style", "boy-next-door look", "confident presence"],
    consistencyPrompt: "Shawn Mendes: curly brown hair, athletic muscular build, charming smile, brown eyes, fair complexion, casual modern styling, boy-next-door appeal, confident yet approachable demeanor, contemporary pop star appearance",
    latestVersion: "2024 appearance: mature look with maintained curly hair, well-defined physique, often in casual streetwear or smart-casual outfits"
  },
  {
    name: "Cardi B",
    aliases: ["cardi b", "belcalis marlenis almanzar"],
    category: "musician",
    detailedDescription: "Rapper and cultural icon",
    visualKeywords: ["bold fashion", "long nails", "colorful hair", "curvy figure", "glamorous style", "confident presence"],
    consistencyPrompt: "Cardi B: bold glamorous fashion, long colorful hair (various styles and colors), extremely long decorated nails, curvy hourglass figure, full makeup with dramatic eyes and lips, confident powerful presence, hip-hop fashion icon aesthetic, unapologetic bold styling",
    latestVersion: "2024 appearance: high-fashion hip-hop looks with designer pieces, often with long colorful wigs or sleek styles, full glam makeup, statement jewelry"
  },
  {
    name: "Megan Thee Stallion",
    aliases: ["megan thee stallion", "megan jovon ruth pete", "hot girl meg"],
    category: "musician",
    detailedDescription: "Rapper and hot girl coach",
    visualKeywords: ["tall stature", "athletic build", "long hair", "confident presence", "bold style", "powerful aura"],
    consistencyPrompt: "Megan Thee Stallion: tall stature (5'10\"), athletic curvy build, long hair (various colors and styles), confident powerful presence, bold fashion choices, full glam makeup, strong facial features, commanding stage presence, hot girl aesthetic",
    latestVersion: "2024 appearance: maintained athletic build, often with long straight or wavy hair, bold fashion mixing streetwear and high-fashion, confident body-positive presence"
  },
  {
    name: "Tom Cruise",
    aliases: ["tom cruise", "thomas cruise mapother iv"],
    category: "actor",
    detailedDescription: "Legendary action star",
    visualKeywords: ["athletic build", "charming smile", "action hero", "youthful appearance", "confident presence", "classic features"],
    consistencyPrompt: "Tom Cruise: athletic build, charming signature smile, classic handsome features, short dark hair, blue-green eyes, youthful appearance despite age, confident action hero presence, well-maintained physique, timeless movie star look",
    latestVersion: "2024 appearance: remarkably youthful for age, maintained athletic physique, short styled hair, often in action-ready or smart-casual attire"
  },
  {
    name: "Leonardo DiCaprio",
    aliases: ["leonardo dicaprio", "leo dicaprio", "leonardo wilhelm dicaprio"],
    category: "actor",
    detailedDescription: "Oscar-winning actor",
    visualKeywords: ["blonde hair", "blue eyes", "mature features", "casual style", "distinguished look", "Hollywood icon"],
    consistencyPrompt: "Leonardo DiCaprio: blonde to light brown hair, striking blue eyes, mature distinguished features, fair complexion, casual sophisticated styling, Hollywood leading man appearance, confident presence, classic movie star look",
    latestVersion: "2024 appearance: mature distinguished look with fuller face, often with beard, casual luxury fashion, maintained Hollywood star presence"
  },
  {
    name: "Brad Pitt",
    aliases: ["brad pitt", "william bradley pitt"],
    category: "actor",
    detailedDescription: "Hollywood icon and producer",
    visualKeywords: ["blonde hair", "chiseled features", "athletic build", "classic Hollywood", "charming smile", "timeless style"],
    consistencyPrompt: "Brad Pitt: blonde hair (various lengths), chiseled facial features, athletic build, blue eyes, classic Hollywood handsome appearance, charming smile, sophisticated styling, timeless movie star presence, distinguished mature look",
    latestVersion: "2024 appearance: mature distinguished look with grey-blonde hair, often with facial hair, maintained physique, sophisticated casual or formal styling"
  },
  {
    name: "Jennifer Lawrence",
    aliases: ["jennifer lawrence", "jennifer shrader lawrence", "j-law"],
    category: "actor",
    detailedDescription: "Oscar-winning actress",
    visualKeywords: ["blonde hair", "blue eyes", "girl-next-door", "natural beauty", "confident presence", "approachable style"],
    consistencyPrompt: "Jennifer Lawrence: blonde hair (various lengths), striking blue eyes, natural beauty with girl-next-door appeal, fair complexion, confident yet approachable presence, athletic build, sophisticated casual styling, Hollywood star appearance",
    latestVersion: "2024 appearance: mature elegant look with blonde hair, natural glowing makeup, sophisticated fashion choices, confident presence"
  },
  {
    name: "Chris Evans",
    aliases: ["chris evans", "christopher robert evans"],
    category: "actor",
    detailedDescription: "Actor known for Captain America role",
    visualKeywords: ["muscular build", "blue eyes", "beard", "charming smile", "athletic physique", "all-American look"],
    consistencyPrompt: "Chris Evans: muscular athletic build, blue eyes, often with well-groomed beard, charming smile, short dark hair, fair complexion, all-American handsome features, confident presence, superhero physique, classic leading man appearance",
    latestVersion: "2024 appearance: maintained muscular physique, often with full beard, short styled hair, casual smart or action-ready styling"
  },
  {
    name: "Chris Pratt",
    aliases: ["chris pratt", "christopher michael pratt"],
    category: "actor",
    detailedDescription: "Actor and comedian",
    visualKeywords: ["athletic build", "charming smile", "casual style", "friendly presence", "action hero physique", "approachable look"],
    consistencyPrompt: "Chris Pratt: athletic muscular build, charming friendly smile, short light brown hair, blue eyes, fair complexion, casual approachable styling, action hero physique, confident yet down-to-earth presence, modern leading man appearance",
    latestVersion: "2024 appearance: maintained action star physique, short styled hair, often with light facial hair, casual smart styling"
  },
  {
    name: "Robert Downey Jr.",
    aliases: ["robert downey jr", "robert downey junior", "rdj"],
    category: "actor",
    detailedDescription: "Actor known for Iron Man role",
    visualKeywords: ["goatee", "dark hair", "charismatic presence", "stylish fashion", "confident expression", "iconic look"],
    consistencyPrompt: "Robert Downey Jr.: signature goatee, dark hair (often styled), charismatic confident expression, brown eyes, stylish sophisticated fashion, slender athletic build, iconic Tony Stark-like presence, sharp features, Hollywood star appearance",
    latestVersion: "2024 appearance: mature distinguished look with grey in hair and goatee, maintained stylish presence, sophisticated fashion choices"
  },
  {
    name: "Keanu Reeves",
    aliases: ["keanu reeves", "keanu charles reeves"],
    category: "actor",
    detailedDescription: "Actor known for John Wick and Matrix roles",
    visualKeywords: ["long dark hair", "beard", "intense gaze", "action hero", "humble presence", "timeless look"],
    consistencyPrompt: "Keanu Reeves: long dark hair (often shoulder-length), full beard, intense yet kind gaze, dark eyes, athletic build, humble confident presence, action hero physique, timeless ageless appearance, sophisticated casual styling",
    latestVersion: "2024 appearance: maintained long hair and beard with grey, athletic physique, often in all-black or dark casual attire, distinguished mature look"
  },
  {
    name: "Jason Momoa",
    aliases: ["jason momoa", "joseph jason namakaeha momoa"],
    category: "actor",
    detailedDescription: "Actor known for Aquaman role",
    visualKeywords: ["long hair", "muscular build", "tattoos", "beard", "Hawaiian heritage", "powerful presence"],
    consistencyPrompt: "Jason Momoa: extremely muscular build, long dark hair (often in man bun or loose), full beard, visible tattoos, Hawaiian/Polynesian features, tall imposing stature (6'4\"), powerful commanding presence, rugged masculine appearance, action hero physique",
    latestVersion: "2024 appearance: maintained massive physique, long hair often styled, full beard, casual bohemian or action-ready styling"
  },
  {
    name: "Gal Gadot",
    aliases: ["gal gadot", "gal gadot-varsano"],
    category: "actor",
    detailedDescription: "Israeli actress known for Wonder Woman",
    visualKeywords: ["tall stature", "dark hair", "elegant features", "athletic build", "radiant smile", "graceful presence"],
    consistencyPrompt: "Gal Gadot: tall model-like stature (5'10\"), long dark hair, elegant facial features, athletic yet feminine build, radiant warm smile, olive complexion, graceful confident presence, Wonder Woman-like appearance, sophisticated styling",
    latestVersion: "2024 appearance: maintained athletic elegance, often with long dark hair in waves, natural glowing makeup, sophisticated fashion"
  },
  {
    name: "Michael B. Jordan",
    aliases: ["michael b jordan", "michael bakari jordan"],
    category: "actor",
    detailedDescription: "Actor known for Creed and Black Panther",
    visualKeywords: ["muscular build", "charming smile", "athletic physique", "confident presence", "modern style", "leading man"],
    consistencyPrompt: "Michael B. Jordan: extremely muscular athletic build, charming confident smile, short dark hair, warm brown eyes, dark brown skin tone, chiseled facial features, modern sophisticated styling, powerful presence, contemporary leading man appearance",
    latestVersion: "2024 appearance: peak physical condition, often with short styled hair or fade, well-groomed facial hair, modern luxury casual or formal wear"
  },
  {
    name: "Zac Efron",
    aliases: ["zac efron", "zachary david alexander efron"],
    category: "actor",
    detailedDescription: "Actor and heartthrob",
    visualKeywords: ["athletic build", "blue eyes", "charming smile", "boy-next-door", "muscular physique", "all-American look"],
    consistencyPrompt: "Zac Efron: athletic muscular build, striking blue eyes, charming smile, short to medium brown hair, fair complexion, all-American handsome features, confident presence, well-maintained physique, modern leading man appearance",
    latestVersion: "2024 appearance: mature look with maintained muscular physique, short styled hair, often with light facial hair, casual smart styling"
  },
  {
    name: "Emma Watson",
    aliases: ["emma watson", "emma charlotte duerre watson"],
    category: "actor",
    detailedDescription: "British actress and activist",
    visualKeywords: ["elegant features", "brown hair", "classic beauty", "sophisticated style", "intelligent presence", "graceful demeanor"],
    consistencyPrompt: "Emma Watson: elegant classic features, brown hair (various lengths from pixie to long), brown eyes, fair complexion, sophisticated intelligent presence, slender build, graceful demeanor, timeless beauty, refined styling",
    latestVersion: "2024 appearance: mature sophisticated look with medium to long brown hair, natural elegant makeup, high-fashion sustainable styling"
  },
  {
    name: "Jennifer Aniston",
    aliases: ["jennifer aniston", "jennifer joanna aniston"],
    category: "actor",
    detailedDescription: "Actress and cultural icon",
    visualKeywords: ["blonde hair", "timeless beauty", "radiant smile", "fit physique", "classic style", "ageless appearance"],
    consistencyPrompt: "Jennifer Aniston: blonde hair (various lengths, often layered), timeless beauty with radiant smile, blue-green eyes, fair complexion, fit athletic build, classic sophisticated styling, ageless appearance, warm approachable presence",
    latestVersion: "2024 appearance: remarkably youthful appearance, maintained blonde hair, fit physique, sophisticated casual or elegant styling"
  },
  {
    name: "Angelina Jolie",
    aliases: ["angelina jolie", "angelina jolie voight"],
    category: "actor",
    detailedDescription: "Actress, director, and humanitarian",
    visualKeywords: ["striking features", "full lips", "dark hair", "elegant style", "tall stature", "powerful presence"],
    consistencyPrompt: "Angelina Jolie: striking distinctive features with full lips, long dark hair, intense eyes, tall slender build (5'7\"), elegant sophisticated styling, powerful commanding presence, classic Hollywood beauty, humanitarian grace",
    latestVersion: "2024 appearance: mature elegant look with long dark hair, natural sophisticated makeup, high-fashion styling, distinguished presence"
  },
  {
    name: "Will Smith",
    aliases: ["will smith", "willard carroll smith ii", "fresh prince"],
    category: "actor",
    detailedDescription: "Actor and entertainer",
    visualKeywords: ["charming smile", "athletic build", "confident presence", "charismatic expression", "modern style", "leading man"],
    consistencyPrompt: "Will Smith: charming charismatic smile, athletic build, short dark hair, warm brown eyes, dark brown skin tone, confident friendly presence, modern sophisticated styling, Hollywood leading man appearance, approachable yet powerful demeanor",
    latestVersion: "2024 appearance: mature distinguished look, maintained athletic build, short styled hair, sophisticated casual or formal wear"
  },
  {
    name: "Denzel Washington",
    aliases: ["denzel washington", "denzel hayes washington jr"],
    category: "actor",
    detailedDescription: "Legendary actor",
    visualKeywords: ["distinguished features", "powerful presence", "intense gaze", "commanding demeanor", "classic style", "Hollywood legend"],
    consistencyPrompt: "Denzel Washington: distinguished mature features, powerful commanding presence, intense expressive eyes, short grey hair, dark brown skin tone, athletic build, sophisticated classic styling, legendary Hollywood actor appearance, authoritative yet warm demeanor",
    latestVersion: "2024 appearance: distinguished elder statesman look with grey hair, maintained physique, sophisticated formal or smart-casual styling"
  },
  {
    name: "Morgan Freeman",
    aliases: ["morgan freeman", "morgan porterfield freeman jr"],
    category: "actor",
    detailedDescription: "Iconic actor with distinctive voice",
    visualKeywords: ["grey hair", "distinguished features", "warm presence", "wise expression", "classic style", "legendary status"],
    consistencyPrompt: "Morgan Freeman: distinguished grey hair, warm wise expression, dark brown skin tone, distinctive facial features, sophisticated classic styling, commanding yet gentle presence, legendary Hollywood actor appearance, authoritative demeanor",
    latestVersion: "2024 appearance: elder statesman look with white/grey hair, maintained distinguished presence, classic sophisticated styling"
  },
  {
    name: "Samuel L. Jackson",
    aliases: ["samuel l jackson", "samuel leroy jackson"],
    category: "actor",
    detailedDescription: "Prolific actor with iconic presence",
    visualKeywords: ["bald head", "intense gaze", "powerful presence", "distinctive voice", "confident demeanor", "action star"],
    consistencyPrompt: "Samuel L. Jackson: bald head, intense powerful gaze, dark brown skin tone, distinctive facial features with goatee, athletic build, confident commanding presence, modern sophisticated styling, iconic action star appearance",
    latestVersion: "2024 appearance: maintained bald look, often with goatee, sophisticated casual or action-ready styling, powerful presence"
  },
  {
    name: "Tom Hanks",
    aliases: ["tom hanks", "thomas jeffrey hanks"],
    category: "actor",
    detailedDescription: "Beloved actor and American icon",
    visualKeywords: ["friendly smile", "approachable presence", "grey hair", "warm expression", "classic features", "everyman appeal"],
    consistencyPrompt: "Tom Hanks: friendly warm smile, grey hair, approachable everyman features, blue eyes, fair complexion, classic American appearance, sophisticated casual styling, beloved Hollywood icon presence, genuine warm demeanor",
    latestVersion: "2024 appearance: distinguished mature look with grey hair, maintained friendly presence, sophisticated casual styling"
  },
  {
    name: "Johnny Depp",
    aliases: ["johnny depp", "john christopher depp ii"],
    category: "actor",
    detailedDescription: "Actor known for eccentric roles",
    visualKeywords: ["long hair", "bohemian style", "distinctive features", "artistic presence", "unique fashion", "charismatic look"],
    consistencyPrompt: "Johnny Depp: long dark hair (often styled), distinctive facial features with high cheekbones, bohemian artistic styling, often with facial hair, unique fashion sense mixing vintage and rock elements, charismatic presence, artistic actor appearance",
    latestVersion: "2024 appearance: mature rock-star aesthetic with long hair, often with facial hair, bohemian luxury fashion, maintained artistic presence"
  },
  {
    name: "Ryan Gosling",
    aliases: ["ryan gosling", "ryan thomas gosling"],
    category: "actor",
    detailedDescription: "Actor and heartthrob",
    visualKeywords: ["blonde hair", "blue eyes", "charming smile", "athletic build", "classic features", "leading man"],
    consistencyPrompt: "Ryan Gosling: blonde hair (short to medium), striking blue eyes, charming smile, athletic build, fair complexion, classic handsome features, sophisticated styling, confident yet understated presence, modern leading man appearance",
    latestVersion: "2024 appearance: mature distinguished look with blonde hair, maintained athletic build, sophisticated casual or formal styling"
  },
  {
    name: "Jake Gyllenhaal",
    aliases: ["jake gyllenhaal", "jacob benjamin gyllenhaal"],
    category: "actor",
    detailedDescription: "Versatile actor",
    visualKeywords: ["intense eyes", "dark hair", "athletic build", "serious expression", "versatile looks", "method actor"],
    consistencyPrompt: "Jake Gyllenhaal: intense expressive eyes, dark hair (various lengths), athletic muscular build, serious focused expression, fair complexion, versatile appearance, sophisticated styling, method actor presence, contemporary leading man look",
    latestVersion: "2024 appearance: mature look with maintained athletic physique, short to medium dark hair, often with facial hair, sophisticated styling"
  },
  {
    name: "Andrew Garfield",
    aliases: ["andrew garfield", "andrew russell garfield"],
    category: "actor",
    detailedDescription: "British-American actor",
    visualKeywords: ["curly hair", "expressive eyes", "slender build", "artistic presence", "charming smile", "versatile looks"],
    consistencyPrompt: "Andrew Garfield: curly brown hair, expressive brown eyes, slender athletic build, charming warm smile, fair complexion, artistic sensitive presence, sophisticated casual styling, contemporary leading man appearance",
    latestVersion: "2024 appearance: mature artistic look with curly hair, maintained slender build, sophisticated casual or formal styling"
  },
  {
    name: "Oscar Isaac",
    aliases: ["oscar isaac", "oscar isaac hernandez estrada"],
    category: "actor",
    detailedDescription: "Guatemalan-American actor",
    visualKeywords: ["dark hair", "beard", "intense gaze", "charismatic presence", "versatile looks", "leading man"],
    consistencyPrompt: "Oscar Isaac: dark hair and beard, intense charismatic gaze, olive complexion, athletic build, sophisticated styling, powerful presence, versatile appearance, contemporary leading man look, Latin American features",
    latestVersion: "2024 appearance: mature distinguished look with dark hair and full beard, maintained athletic build, sophisticated styling"
  },
  {
    name: "Idris Elba",
    aliases: ["idris elba", "idrissa akuna elba"],
    category: "actor",
    detailedDescription: "British actor and DJ",
    visualKeywords: ["tall stature", "muscular build", "bald head", "intense gaze", "powerful presence", "sophisticated style"],
    consistencyPrompt: "Idris Elba: tall imposing stature (6'3\"), muscular athletic build, bald head, intense powerful gaze, dark brown skin tone, chiseled features, sophisticated styling, commanding presence, British leading man appearance",
    latestVersion: "2024 appearance: maintained powerful physique, bald look, often with facial hair, sophisticated formal or smart-casual styling"
  },
  {
    name: "Chadwick Boseman",
    aliases: ["chadwick boseman", "chadwick aaron boseman"],
    category: "actor",
    detailedDescription: "Late actor known for Black Panther (1976-2020)",
    visualKeywords: ["regal presence", "athletic build", "intense gaze", "powerful demeanor", "sophisticated style", "heroic appearance"],
    consistencyPrompt: "Chadwick Boseman: regal powerful presence, athletic muscular build, intense focused gaze, dark brown skin tone, short styled hair, chiseled features, sophisticated styling, heroic commanding appearance, Black Panther-like demeanor",
    latestVersion: "Final appearance (2019-2020): maintained regal presence, short styled hair, sophisticated formal or casual styling, powerful heroic demeanor"
  },
  {
    name: "Mahershala Ali",
    aliases: ["mahershala ali", "mahershalalhashbaz ali"],
    category: "actor",
    detailedDescription: "Oscar-winning actor",
    visualKeywords: ["bald head", "intense gaze", "sophisticated presence", "athletic build", "distinguished features", "powerful demeanor"],
    consistencyPrompt: "Mahershala Ali: bald head, intense expressive gaze, dark brown skin tone, athletic build, distinguished sophisticated features, powerful yet subtle presence, refined styling, contemporary leading man appearance",
    latestVersion: "2024 appearance: maintained bald look, sophisticated formal or smart-casual styling, distinguished powerful presence"
  },
  {
    name: "John Boyega",
    aliases: ["john boyega", "john adedayo bamidele adegboyega"],
    category: "actor",
    detailedDescription: "British actor known for Star Wars",
    visualKeywords: ["charming smile", "athletic build", "friendly presence", "modern style", "expressive features", "leading man"],
    consistencyPrompt: "John Boyega: charming friendly smile, athletic build, short dark hair, dark brown skin tone, expressive features, modern sophisticated styling, confident yet approachable presence, contemporary British leading man appearance",
    latestVersion: "2024 appearance: mature look with maintained athletic build, short styled hair, sophisticated casual or formal styling"
  },
  {
    name: "Daniel Kaluuya",
    aliases: ["daniel kaluuya", "daniel kaluuya"],
    category: "actor",
    detailedDescription: "British actor and Oscar winner",
    visualKeywords: ["intense gaze", "expressive features", "athletic build", "serious expression", "powerful presence", "method actor"],
    consistencyPrompt: "Daniel Kaluuya: intense expressive gaze, dark brown skin tone, athletic build, serious focused features, short dark hair, powerful subtle presence, sophisticated styling, British method actor appearance",
    latestVersion: "2024 appearance: mature distinguished look, short styled hair, sophisticated casual or formal styling, maintained powerful presence"
  },
  {
    name: "Lupita Nyong'o",
    aliases: ["lupita nyongo", "lupita amondi nyongo"],
    category: "actor",
    detailedDescription: "Kenyan-Mexican actress and Oscar winner",
    visualKeywords: ["natural hair", "radiant smile", "elegant features", "graceful presence", "fashion icon", "stunning beauty"],
    consistencyPrompt: "Lupita Nyong'o: natural short hair or various elegant styles, radiant warm smile, stunning elegant features, dark brown skin tone, graceful sophisticated presence, high-fashion styling, Oscar-winning actress appearance, regal demeanor",
    latestVersion: "2024 appearance: maintained elegant presence, often with natural short hair or styled looks, high-fashion choices, sophisticated styling"
  },
  {
    name: "Viola Davis",
    aliases: ["viola davis", "viola davis"],
    category: "actor",
    detailedDescription: "Acclaimed actress and EGOT winner",
    visualKeywords: ["powerful presence", "expressive features", "natural beauty", "commanding demeanor", "sophisticated style", "legendary status"],
    consistencyPrompt: "Viola Davis: powerful commanding presence, expressive intense features, dark brown skin tone, natural beauty, sophisticated elegant styling, legendary actress appearance, authoritative yet warm demeanor",
    latestVersion: "2024 appearance: distinguished mature look, often with natural hair or elegant styles, sophisticated formal or casual styling"
  },
  {
    name: "Halle Berry",
    aliases: ["halle berry", "halle maria berry"],
    category: "actor",
    detailedDescription: "Oscar-winning actress and icon",
    visualKeywords: ["timeless beauty", "short hair", "athletic build", "radiant smile", "elegant features", "ageless appearance"],
    consistencyPrompt: "Halle Berry: timeless beauty with short pixie cut or various hairstyles, radiant smile, athletic fit build, elegant features, warm brown skin tone, ageless appearance, sophisticated styling, Hollywood icon presence",
    latestVersion: "2024 appearance: remarkably youthful appearance, often with short styled hair, maintained athletic build, sophisticated styling"
  },
  {
    name: "Priyanka Chopra",
    aliases: ["priyanka chopra", "priyanka chopra jonas"],
    category: "actor",
    detailedDescription: "Indian actress and global star",
    visualKeywords: ["long dark hair", "elegant features", "radiant smile", "sophisticated style", "graceful presence", "Bollywood beauty"],
    consistencyPrompt: "Priyanka Chopra: long dark hair (straight or wavy), elegant sophisticated features, radiant warm smile, olive complexion, graceful presence, high-fashion styling, global star appearance, Bollywood and Hollywood crossover aesthetic",
    latestVersion: "2024 appearance: mature sophisticated look with long dark hair, glamorous makeup, high-fashion choices, confident global presence"
  },
  {
    name: "Anya Taylor-Joy",
    aliases: ["anya taylor-joy", "anya josephine marie taylor-joy"],
    category: "actor",
    detailedDescription: "Argentine-British actress",
    visualKeywords: ["distinctive eyes", "blonde hair", "unique features", "elegant style", "ethereal beauty", "striking appearance"],
    consistencyPrompt: "Anya Taylor-Joy: distinctive wide-set eyes, blonde hair (various lengths), unique ethereal features, fair complexion, slender build, elegant sophisticated styling, striking otherworldly beauty, contemporary leading actress appearance",
    latestVersion: "2024 appearance: mature elegant look with blonde hair in various styles, high-fashion choices, sophisticated makeup emphasizing eyes"
  },
  {
    name: "Florence Pugh",
    aliases: ["florence pugh", "florence rose c m pugh"],
    category: "actor",
    detailedDescription: "British actress",
    visualKeywords: ["expressive features", "blonde hair", "natural beauty", "confident presence", "versatile looks", "modern style"],
    consistencyPrompt: "Florence Pugh: expressive features, blonde hair (various lengths and styles), natural beauty, fair complexion, confident presence, modern sophisticated styling, versatile appearance, contemporary British actress look",
    latestVersion: "2024 appearance: mature look with blonde hair in various styles, natural glowing makeup, sophisticated casual or formal styling"
  },
  {
    name: "Saoirse Ronan",
    aliases: ["saoirse ronan", "saoirse una ronan"],
    category: "actor",
    detailedDescription: "Irish actress",
    visualKeywords: ["red hair", "fair complexion", "delicate features", "expressive eyes", "elegant style", "natural beauty"],
    consistencyPrompt: "Saoirse Ronan: red to auburn hair, fair porcelain complexion, delicate elegant features, expressive blue eyes, natural beauty, sophisticated styling, Irish actress appearance, graceful presence",
    latestVersion: "2024 appearance: mature elegant look with red/auburn hair, natural sophisticated makeup, high-fashion choices"
  },
  {
    name: "Millie Bobby Brown",
    aliases: ["millie bobby brown", "millie brown"],
    category: "actor",
    detailedDescription: "British actress known for Stranger Things",
    visualKeywords: ["expressive features", "versatile hairstyles", "youthful beauty", "confident presence", "modern style", "Gen Z icon"],
    consistencyPrompt: "Millie Bobby Brown: expressive features, versatile hairstyles (short to long, various colors), youthful beauty, fair complexion, confident presence, modern fashion-forward styling, Gen Z actress appearance",
    latestVersion: "2024 appearance: mature young adult look, often with long styled hair, sophisticated makeup, high-fashion choices"
  },
  {
    name: "Jenna Ortega",
    aliases: ["jenna ortega", "jenna marie ortega"],
    category: "actor",
    detailedDescription: "Actress known for Wednesday",
    visualKeywords: ["dark hair", "expressive eyes", "gothic aesthetic", "youthful features", "confident presence", "modern style"],
    consistencyPrompt: "Jenna Ortega: long dark hair (often with bangs), expressive dark eyes, youthful features, olive complexion, confident presence, gothic-inspired or modern sophisticated styling, Gen Z actress appearance",
    latestVersion: "2024 appearance: Wednesday-era aesthetic with dark hair and bangs, often in gothic or sophisticated styling, mature young adult look"
  },
  {
    name: "Sydney Sweeney",
    aliases: ["sydney sweeney", "sydney bernice sweeney"],
    category: "actor",
    detailedDescription: "Actress known for Euphoria",
    visualKeywords: ["blonde hair", "blue eyes", "classic beauty", "confident presence", "modern style", "all-American look"],
    consistencyPrompt: "Sydney Sweeney: blonde hair (various lengths), striking blue eyes, classic all-American beauty, fair complexion, confident presence, modern sophisticated styling, contemporary actress appearance",
    latestVersion: "2024 appearance: mature look with blonde hair, natural glowing makeup, sophisticated fashion choices"
  },
  {
    name: "Pedro Pascal",
    aliases: ["pedro pascal", "jose pedro balmaceda pascal"],
    category: "actor",
    detailedDescription: "Chilean-American actor",
    visualKeywords: ["salt and pepper hair", "mustache", "charming smile", "expressive features", "sophisticated style", "leading man"],
    consistencyPrompt: "Pedro Pascal: salt and pepper hair, often with mustache, charming warm smile, expressive features, olive complexion, sophisticated styling, confident charismatic presence, contemporary leading man appearance",
    latestVersion: "2024 appearance: distinguished mature look with grey-streaked hair, often with mustache, sophisticated casual or formal styling"
  },
  {
    name: "Paul Rudd",
    aliases: ["paul rudd", "paul stephen rudd"],
    category: "actor",
    detailedDescription: "Actor known for Ant-Man and ageless appearance",
    visualKeywords: ["youthful appearance", "charming smile", "athletic build", "friendly presence", "ageless look", "boy-next-door"],
    consistencyPrompt: "Paul Rudd: remarkably youthful ageless appearance, charming friendly smile, short dark hair, athletic build, fair complexion, approachable presence, casual sophisticated styling, eternally young Hollywood actor look",
    latestVersion: "2024 appearance: maintained ageless appearance, short styled hair, athletic build, casual smart styling"
  },
  {
    name: "Sebastian Stan",
    aliases: ["sebastian stan"],
    category: "actor",
    detailedDescription: "Romanian-American actor known for Winter Soldier",
    visualKeywords: ["dark hair", "blue eyes", "athletic build", "intense gaze", "versatile looks", "leading man"],
    consistencyPrompt: "Sebastian Stan: dark hair (various lengths), striking blue eyes, athletic build, intense expressive gaze, fair complexion, versatile appearance, sophisticated styling, contemporary leading man look",
    latestVersion: "2024 appearance: mature look with dark hair, maintained athletic build, sophisticated casual or formal styling"
  },
  {
    name: "Anthony Mackie",
    aliases: ["anthony mackie", "anthony dwane mackie"],
    category: "actor",
    detailedDescription: "Actor known for Falcon/Captain America",
    visualKeywords: ["charming smile", "athletic build", "confident presence", "modern style", "superhero physique", "leading man"],
    consistencyPrompt: "Anthony Mackie: charming confident smile, athletic muscular build, short dark hair, dark brown skin tone, expressive features, modern sophisticated styling, superhero physique, contemporary leading man appearance",
    latestVersion: "2024 appearance: maintained athletic build as Captain America, short styled hair, sophisticated casual or action-ready styling"
  },
  {
    name: "Paul Mescal",
    aliases: ["paul mescal"],
    category: "actor",
    detailedDescription: "Irish actor",
    visualKeywords: ["athletic build", "expressive features", "casual style", "natural presence", "modern look", "rising star"],
    consistencyPrompt: "Paul Mescal: athletic muscular build, expressive features, short dark hair, fair complexion, natural understated presence, casual sophisticated styling, contemporary Irish actor appearance",
    latestVersion: "2024 appearance: maintained athletic build, short styled hair, casual smart styling, rising star presence"
  },
  {
    name: "Austin Butler",
    aliases: ["austin butler", "austin robert butler"],
    category: "actor",
    detailedDescription: "Actor known for Elvis role",
    visualKeywords: ["blonde hair", "blue eyes", "chiseled features", "versatile looks", "leading man", "method actor"],
    consistencyPrompt: "Austin Butler: blonde hair (various lengths), striking blue eyes, chiseled features, athletic build, fair complexion, versatile appearance, sophisticated styling, contemporary leading man look, method actor presence",
    latestVersion: "2024 appearance: post-Elvis mature look with blonde hair, maintained athletic build, sophisticated styling"
  },
  {
    name: "Barry Keoghan",
    aliases: ["barry keoghan"],
    category: "actor",
    detailedDescription: "Irish actor",
    visualKeywords: ["distinctive features", "intense gaze", "unique look", "expressive eyes", "artistic presence", "character actor"],
    consistencyPrompt: "Barry Keoghan: distinctive unique features, intense expressive gaze, short dark hair, fair complexion, slender build, artistic presence, contemporary styling, Irish character actor appearance",
    latestVersion: "2024 appearance: maintained distinctive look, short styled hair, sophisticated casual styling"
  },
  {
    name: "Jacob Elordi",
    aliases: ["jacob elordi"],
    category: "actor",
    detailedDescription: "Australian actor known for Euphoria",
    visualKeywords: ["tall stature", "dark hair", "athletic build", "handsome features", "modern style", "heartthrob"],
    consistencyPrompt: "Jacob Elordi: extremely tall stature (6'5\"), dark hair, athletic build, handsome features, fair complexion, modern sophisticated styling, confident presence, contemporary heartthrob appearance",
    latestVersion: "2024 appearance: maintained tall athletic build, dark styled hair, sophisticated casual or formal styling"
  },
  {
    name: "Glen Powell",
    aliases: ["glen powell", "glen thomas powell jr"],
    category: "actor",
    detailedDescription: "Actor known for Top Gun: Maverick",
    visualKeywords: ["charming smile", "athletic build", "blonde hair", "all-American look", "confident presence", "action star"],
    consistencyPrompt: "Glen Powell: charming all-American smile, athletic muscular build, blonde to light brown hair, blue-green eyes, fair complexion, confident presence, modern action star styling, contemporary leading man appearance",
    latestVersion: "2024 appearance: maintained athletic build, short styled hair, sophisticated casual or action-ready styling"
  }
];

export function findCelebrityByName(input: string): CelebrityDefinition | null {
  const normalized = input.toLowerCase().trim();
  
  for (const celebrity of CELEBRITIES) {
    if (celebrity.name.toLowerCase() === normalized) {
      return celebrity;
    }
    
    for (const alias of celebrity.aliases) {
      if (alias.toLowerCase() === normalized || normalized.includes(alias.toLowerCase())) {
        return celebrity;
      }
    }
  }
  
  return null;
}

export function enhancePromptWithCelebrity(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  for (const celebrity of CELEBRITIES) {
    for (const alias of celebrity.aliases) {
      if (lowerPrompt.includes(alias.toLowerCase())) {
        console.log(`🌟 Celebrity detected: ${celebrity.name} (${celebrity.category})`);
        
        const enhancedPrompt = `${prompt}\n\n🌟 CELEBRITY ACCURACY PROTOCOL - ${celebrity.name.toUpperCase()}\n\n📋 OFFICIAL CELEBRITY SPECIFICATION:\n${celebrity.consistencyPrompt}\n\n✅ LATEST VERSION (2024):\n${celebrity.latestVersion}\n\n🎯 MANDATORY ACCURACY REQUIREMENTS:\n- Render ${celebrity.name} with 100% accuracy to their real-world appearance\n- Preserve ALL signature visual elements: ${celebrity.visualKeywords.join(', ')}\n- Maintain exact facial features, proportions, and distinctive characteristics\n- Apply celebrity-specific details with surgical precision\n- Celebrity must be INSTANTLY RECOGNIZABLE and accurate to their latest public appearance\n- Use LATEST/CURRENT appearance (2024 style) unless vintage specifically requested\n- Ensure consistency across all celebrity attributes\n\n🎨 VISUAL FIDELITY ENFORCEMENT:\n- Match real-world celebrity appearance exactly\n- Preserve iconic features, styling, and physical characteristics\n- Maintain celebrity's signature personality and presence\n- Apply appropriate styling: photorealistic for real person\n- Ensure celebrity accuracy takes priority over all other modifications\n\n⚡ EXECUTION PRIORITY:\nCelebrity accuracy is CRITICAL. The ${celebrity.name} must be rendered with perfect fidelity to their real-world appearance. All requested actions, positions, or modifications must preserve the celebrity's core identity and visual accuracy.`;
        
        return enhancedPrompt;
      }
    }
  }
  
  return prompt;
}

export function getCelebritiesByCategory(category: 'actor' | 'musician' | 'athlete' | 'influencer' | 'model' | 'director' | 'comedian'): CelebrityDefinition[] {
  return CELEBRITIES.filter(celeb => celeb.category === category);
}

export function getAllCelebrityNames(): string[] {
  return CELEBRITIES.map(celeb => celeb.name);
}

export function searchCelebrities(query: string): CelebrityDefinition[] {
  const normalized = query.toLowerCase().trim();
  
  return CELEBRITIES.filter(celebrity => {
    if (celebrity.name.toLowerCase().includes(normalized)) return true;
    
    for (const alias of celebrity.aliases) {
      if (alias.toLowerCase().includes(normalized)) return true;
    }
    
    for (const keyword of celebrity.visualKeywords) {
      if (keyword.toLowerCase().includes(normalized)) return true;
    }
    
    return false;
  });
}

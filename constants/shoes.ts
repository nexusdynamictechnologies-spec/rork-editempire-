export interface ShoeSpec {
  brand: string;
  model: string;
  aliases: string[];
  category: 'basketball' | 'running' | 'soccer' | 'lifestyle' | 'skate' | 'training' | 'fashion';
  visualKeywords: string[];
  detailedDescription: string;
  consistencyPrompt: string;
  notableColorways?: string[];
}

export const COMPREHENSIVE_SHOE_DATABASE: ShoeSpec[] = [
  // JORDAN BRAND - COMPLETE COLLECTION
  {
    brand: 'Nike',
    model: 'Air Jordan 1',
    aliases: ['aj1', 'jordan 1', 'air jordan 1', 'j1'],
    category: 'basketball',
    visualKeywords: ['high-top', 'Nike Swoosh', 'Wings logo', 'Air Jordan branding', 'iconic silhouette', 'retro basketball', 'leather upper'],
    detailedDescription: 'Iconic high-top basketball sneaker with Nike Swoosh, Wings logo on ankle collar, Air Jordan branding on tongue, classic basketball silhouette with leather upper and distinctive toe box design.',
    consistencyPrompt: 'Air Jordan 1 sneakers: HIGH-TOP basketball silhouette, Nike Swoosh on sides, Wings logo on ankle collar, Air Jordan branding on tongue label, classic toe box design, leather panels, iconic retro basketball shoe proportions',
    notableColorways: ['Chicago (White/Varsity Red-Black)', 'Bred (Black/Red)', 'Royal (Black/Royal Blue)', 'Shadow (Black/Medium Grey-White)', 'UNC (University Blue)', 'Shattered Backboard (Orange)']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 3',
    aliases: ['aj3', 'jordan 3', 'air jordan 3', 'j3'],
    category: 'basketball',
    visualKeywords: ['elephant print', 'visible Air unit', 'Jumpman logo', 'mid-top', 'cement grey pattern', 'iconic design'],
    detailedDescription: 'Mid-top basketball sneaker featuring elephant print panels, visible Air unit in heel, Jumpman logo on tongue and heel, distinctive cement grey pattern texture.',
    consistencyPrompt: 'Air Jordan 3 sneakers: MID-TOP silhouette, signature elephant print texture on toe and heel, visible Air cushioning unit in heel, Jumpman logo on tongue, cement grey pattern details, classic basketball shoe design',
    notableColorways: ['White Cement', 'Black Cement', 'True Blue', 'Fire Red', 'Infrared 23']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 4',
    aliases: ['aj4', 'jordan 4', 'air jordan 4', 'j4'],
    category: 'basketball',
    visualKeywords: ['mesh panels', 'wings', 'visible Air', 'plastic lace locks', 'Jumpman logo', 'supportive design'],
    detailedDescription: 'Basketball sneaker with mesh side panels for breathability, wing eyelets for lace support, visible Air cushioning, plastic lace locks, Jumpman branding.',
    consistencyPrompt: 'Air Jordan 4 sneakers: Mesh side panels with supportive structure, distinctive wing eyelets for laces, visible Air unit in heel, plastic lace locks, Jumpman logo on tongue and heel, iconic basketball silhouette',
    notableColorways: ['White Cement', 'Bred', 'Military Blue', 'Fire Red', 'Thunder', 'Cool Grey']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 5',
    aliases: ['aj5', 'jordan 5', 'air jordan 5', 'j5'],
    category: 'basketball',
    visualKeywords: ['fighter jet inspired', 'reflective tongue', 'shark teeth', 'visible Air', 'lace lock', '23 branding'],
    detailedDescription: 'Fighter jet-inspired basketball shoe with reflective 3M tongue, shark teeth midsole design, visible Air cushioning, iconic lace lock, 23 branding on side.',
    consistencyPrompt: 'Air Jordan 5 sneakers: Fighter jet-inspired design, reflective 3M material on tongue, distinctive shark teeth midsole pattern, visible Air unit, prominent lace lock, "23" branding on side panel, aggressive athletic silhouette',
    notableColorways: ['Fire Red', 'Grape', 'Laney', 'Black Metallic', 'Bel-Air']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 6',
    aliases: ['aj6', 'jordan 6', 'air jordan 6', 'j6'],
    category: 'basketball',
    visualKeywords: ['infrared accents', 'heel tab', 'perforations', 'visible Air', 'rubber tongue', 'sleek design'],
    detailedDescription: 'Sleek basketball sneaker with infrared accent details, rubber tongue with perforations, heel pull tab, visible Air cushioning, sporty racing-inspired design.',
    consistencyPrompt: 'Air Jordan 6 sneakers: Sleek racing-inspired silhouette, rubber tongue with perforations, distinctive heel pull tab, infrared accent details, visible Air unit in heel, sporty basketball design with clean lines',
    notableColorways: ['Infrared', 'Carmine', 'Maroon', 'Sport Blue', 'DMP (Black/Metallic Gold)']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 11',
    aliases: ['aj11', 'jordan 11', 'air jordan 11', 'j11'],
    category: 'basketball',
    visualKeywords: ['patent leather', 'carbon fiber plate', 'translucent outsole', 'elegant design', 'dress shoe inspired', 'Jumpman logo'],
    detailedDescription: 'Iconic basketball sneaker with patent leather mudguard, carbon fiber shank plate, translucent rubber outsole, elegant dress shoe-inspired design, premium materials.',
    consistencyPrompt: 'Air Jordan 11 sneakers: Patent leather mudguard wrapping around shoe, carbon fiber shank plate visible through translucent outsole, elegant formal-inspired silhouette, Jumpman logo on side, premium basketball shoe with dress shoe aesthetic',
    notableColorways: ['Concord (White/Black/Dark Concord)', 'Space Jam', 'Bred', 'Columbia', 'Legend Blue', 'Cool Grey', '72-10']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 12',
    aliases: ['aj12', 'jordan 12', 'air jordan 12', 'j12'],
    category: 'basketball',
    visualKeywords: ['quilted leather', 'Zoom Air', 'carbon fiber shank', 'Japanese flag', 'luxury design', 'premium construction'],
    detailedDescription: 'Luxury basketball sneaker with quilted leather upper, Zoom Air cushioning, carbon fiber support, Japanese rising sun flag-inspired design, premium craftsmanship.',
    consistencyPrompt: 'Air Jordan 12 sneakers: Quilted leather upper with stitched patterns, Zoom Air cushioning, carbon fiber shank support, Japanese rising sun design elements, premium luxury basketball shoe aesthetic, distinctive mudguard pattern',
    notableColorways: ['Flu Game (Black/Varsity Red)', 'Taxi', 'Playoffs', 'French Blue', 'OVO (October\'s Very Own)']
  },
  {
    brand: 'Nike',
    model: 'Air Jordan 13',
    aliases: ['aj13', 'jordan 13', 'air jordan 13', 'j13'],
    category: 'basketball',
    visualKeywords: ['panther paw outsole', 'holographic eye', 'quilted leather', 'Zoom Air', 'sleek design', 'performance basketball'],
    detailedDescription: 'Performance basketball shoe inspired by black panther, featuring holographic cat eye on ankle, panther paw-inspired outsole, quilted leather panels, Zoom Air cushioning.',
    consistencyPrompt: 'Air Jordan 13 sneakers: Black panther-inspired design with holographic reflective cat eye panel on ankle, panther paw traction pattern on outsole, quilted leather upper, Zoom Air cushioning, sleek performance silhouette',
    notableColorways: ['He Got Game (White/Black-True Red)', 'Bred', 'Flint', 'Playoff', 'Grey Toe']
  },

  // ADIDAS BASKETBALL
  {
    brand: 'Adidas',
    model: 'Superstar',
    aliases: ['adidas superstar', 'shell toe', 'superstars'],
    category: 'lifestyle',
    visualKeywords: ['shell toe', 'three stripes', 'rubber shell cap', 'classic design', 'leather upper', 'trefoil logo'],
    detailedDescription: 'Iconic lifestyle sneaker with distinctive rubber shell toe cap, three stripes on sides, leather upper, trefoil logo on tongue and heel.',
    consistencyPrompt: 'Adidas Superstar: Iconic rubber shell toe cap protecting front of shoe, three parallel stripes on sides, leather upper construction, trefoil logo on tongue and heel tab, classic low-top silhouette',
    notableColorways: ['White/Black', 'Black/White', 'Core Black', 'Triple White', 'All-Star']
  },
  {
    brand: 'Adidas',
    model: 'Stan Smith',
    aliases: ['stan smith', 'adidas stan smith'],
    category: 'lifestyle',
    visualKeywords: ['minimalist', 'clean design', 'perforated three stripes', 'tennis shoe', 'portrait heel tab', 'leather'],
    detailedDescription: 'Minimalist tennis-inspired lifestyle sneaker with clean white leather upper, perforated three stripes, Stan Smith portrait on tongue label, simple elegant design.',
    consistencyPrompt: 'Adidas Stan Smith: Minimalist clean white leather upper, perforated three stripes on sides, Stan Smith portrait image on tongue label, simple low-top tennis shoe silhouette, classic timeless design',
    notableColorways: ['White/Green', 'White/Navy', 'White/Black', 'Triple White', 'Primeknit']
  },
  {
    brand: 'Adidas',
    model: 'Yeezy Boost 350 V2',
    aliases: ['yeezy 350', 'boost 350', 'yeezy boost', 'yeezys'],
    category: 'lifestyle',
    visualKeywords: ['primeknit', 'Boost cushioning', 'SPLY-350', 'minimalist', 'sock-like fit', 'pull tab'],
    detailedDescription: 'Modern lifestyle sneaker with primeknit upper, full-length Boost midsole, "SPLY-350" side stripe, heel pull tab, sock-like construction.',
    consistencyPrompt: 'Adidas Yeezy Boost 350 V2: Primeknit woven upper with sock-like fit, "SPLY-350" text on distinctive side stripe, full-length Boost cushioning midsole, heel pull tab, minimalist contemporary silhouette',
    notableColorways: ['Zebra', 'Bred', 'Beluga', 'Triple White', 'Cream White', 'Blue Tint', 'Semi Frozen Yellow']
  },

  // NIKE BASKETBALL & LIFESTYLE
  {
    brand: 'Nike',
    model: 'Air Force 1',
    aliases: ['af1', 'air force 1', 'forces', 'uptowns'],
    category: 'lifestyle',
    visualKeywords: ['chunky design', 'Air cushioning', 'Nike Swoosh', 'ankle strap', 'perforations', 'iconic silhouette'],
    detailedDescription: 'Legendary basketball-turned-lifestyle sneaker with chunky silhouette, visible Air cushioning, Nike Swoosh, optional ankle strap, toe box perforations.',
    consistencyPrompt: 'Nike Air Force 1: Chunky iconic silhouette, Nike Swoosh on sides, toe box with circular perforations, ankle strap (high-top version), visible Air unit in heel, classic basketball-lifestyle crossover design',
    notableColorways: ['Triple White', 'Triple Black', 'White/Black', 'Team Red', 'University Blue']
  },
  {
    brand: 'Nike',
    model: 'Dunk Low',
    aliases: ['dunk low', 'nike dunk', 'dunks'],
    category: 'lifestyle',
    visualKeywords: ['low-top', 'Nike Swoosh', 'colorblock design', 'retro basketball', 'paneled construction', 'skate influence'],
    detailedDescription: 'Low-top lifestyle sneaker with colorblock paneled design, Nike Swoosh, retro basketball silhouette adapted for skateboarding and streetwear.',
    consistencyPrompt: 'Nike Dunk Low: Low-top silhouette with colorblock paneled leather construction, Nike Swoosh on sides, retro basketball aesthetic, classic skate-influenced design, clean lines and simple construction',
    notableColorways: ['Panda (White/Black)', 'University Red', 'Kentucky', 'Syracuse', 'Brazil', 'Michigan']
  },
  {
    brand: 'Nike',
    model: 'LeBron 20',
    aliases: ['lebron 20', 'lebron james shoes', 'lebrons'],
    category: 'basketball',
    visualKeywords: ['modern basketball', 'Zoom Air', 'high-tech design', 'performance', 'LeBron branding', 'supportive construction'],
    detailedDescription: 'Modern performance basketball shoe with advanced Zoom Air cushioning, supportive construction, LeBron James signature branding, cutting-edge athletic technology.',
    consistencyPrompt: 'Nike LeBron 20: Modern high-performance basketball silhouette, Zoom Air cushioning system, LeBron signature branding, advanced support structures, contemporary athletic design with technical details',
    notableColorways: ['Time Machine', 'All-Star', 'Home', 'Away']
  },
  {
    brand: 'Nike',
    model: 'Kobe 6',
    aliases: ['kobe 6', 'kobe vi', 'mamba'],
    category: 'basketball',
    visualKeywords: ['low-top basketball', 'scale texture', 'Zoom Air', 'snakeskin pattern', 'performance', 'sleek design'],
    detailedDescription: 'Low-top performance basketball shoe with scale-textured upper inspired by Black Mamba snake, Zoom Air cushioning, sleek aggressive design.',
    consistencyPrompt: 'Nike Kobe 6: Low-top basketball silhouette, distinctive scale texture/snakeskin pattern on upper, Zoom Air cushioning, aggressive performance design, Black Mamba-inspired aesthetic',
    notableColorways: ['Grinch', 'Bruce Lee', 'All-Star', 'Concord', 'Chaos']
  },

  // STEPHEN CURRY / UNDER ARMOUR
  {
    brand: 'Under Armour',
    model: 'Curry Flow 10',
    aliases: ['curry 10', 'curry flow', 'stephen curry shoes', 'currys'],
    category: 'basketball',
    visualKeywords: ['UA Flow cushioning', 'modern basketball', 'three-point specialist', 'lightweight', 'performance', 'Curry branding'],
    detailedDescription: 'Modern lightweight basketball shoe with UA Flow cushioning technology, Stephen Curry signature branding, performance-focused design for guards and shooters.',
    consistencyPrompt: 'Under Armour Curry Flow 10: Lightweight modern basketball silhouette, UA Flow cushioning sole, Stephen Curry signature branding, performance basketball shoe with contemporary design, guard-focused athletic construction',
    notableColorways: ['Splash Party', 'Warriors', 'Golden Flow', 'All-Star']
  },
  {
    brand: 'Under Armour',
    model: 'Curry 1',
    aliases: ['curry 1', 'curry one', 'ua curry'],
    category: 'basketball',
    visualKeywords: ['retro basketball', 'Charged cushioning', 'ankle support', 'Under Armour logo', 'Curry signature'],
    detailedDescription: 'Original Curry signature shoe with Charged cushioning, supportive ankle construction, Under Armour branding, classic basketball silhouette.',
    consistencyPrompt: 'Under Armour Curry 1: Original Curry signature basketball shoe, Charged cushioning system, supportive ankle collar, Under Armour logo branding, classic basketball performance silhouette',
    notableColorways: ['Dub Nation', 'Father to Son', 'Splash Party', 'Championship Pack']
  },

  // RUNNING SHOES
  {
    brand: 'Nike',
    model: 'Air Max 90',
    aliases: ['air max 90', 'am90', 'air max'],
    category: 'running',
    visualKeywords: ['visible Air Max unit', 'waffle outsole', 'Nike Swoosh', 'retro runner', 'paneled construction', 'iconic design'],
    detailedDescription: 'Iconic running shoe with visible Air Max cushioning window in heel, waffle-pattern outsole, paneled upper construction, Nike Swoosh, retro athletic aesthetic.',
    consistencyPrompt: 'Nike Air Max 90: Large visible Air Max cushioning unit in heel with transparent window, waffle-pattern traction outsole, paneled leather/mesh upper construction, Nike Swoosh branding, classic retro running silhouette',
    notableColorways: ['Infrared', 'Bacon', 'Laser Blue', 'Triple White', 'Triple Black']
  },
  {
    brand: 'Nike',
    model: 'Pegasus 40',
    aliases: ['pegasus', 'nike pegasus', 'peg 40'],
    category: 'running',
    visualKeywords: ['modern runner', 'React foam', 'Zoom Air', 'breathable mesh', 'performance running', 'Nike Swoosh'],
    detailedDescription: 'Modern performance running shoe with React foam midsole, Zoom Air cushioning in forefoot, breathable engineered mesh upper, Nike Swoosh.',
    consistencyPrompt: 'Nike Pegasus 40: Contemporary running shoe silhouette, React foam midsole with Zoom Air unit in forefoot, engineered breathable mesh upper, Nike Swoosh branding, modern athletic running design',
    notableColorways: ['Black/White', 'Volt', 'Blue', 'Multi-Color']
  },

  // SOCCER/FOOTBALL
  {
    brand: 'Nike',
    model: 'Mercurial Superfly 9',
    aliases: ['mercurial', 'superfly', 'cristiano ronaldo boots'],
    category: 'soccer',
    visualKeywords: ['speed boots', 'collar', 'textured upper', 'studs', 'aggressive design', 'Nike Swoosh'],
    detailedDescription: 'High-performance speed football boot with dynamic fit collar, textured Flyknit upper for ball control, stud configuration for traction, aggressive athletic design.',
    consistencyPrompt: 'Nike Mercurial Superfly 9: Speed-focused football boot with high dynamic fit collar, textured Flyknit upper, aggressive stud pattern on outsole, Nike Swoosh, contemporary soccer cleat design',
    notableColorways: ['Safari', 'Bred', 'Spectrum', 'Chrome']
  },
  {
    brand: 'Adidas',
    model: 'Predator Edge',
    aliases: ['predator', 'adidas predator', 'lionel messi boots'],
    category: 'soccer',
    visualKeywords: ['control elements', 'three stripes', 'rubber spikes', 'power boot', 'textured zones', 'adidas branding'],
    detailedDescription: 'Control-focused football boot with rubber spike elements for enhanced ball grip, textured control zones, three stripes branding, power and precision design.',
    consistencyPrompt: 'Adidas Predator Edge: Football boot with distinctive rubber spike control elements on upper, three stripes branding, textured zones for ball manipulation, control-focused soccer cleat design, aggressive aesthetic',
    notableColorways: ['Black/Red', 'White/Core Black', 'Solar Red', 'Precision to Blur']
  },

  // SKATE SHOES
  {
    brand: 'Vans',
    model: 'Old Skool',
    aliases: ['vans old skool', 'vans', 'old skools'],
    category: 'skate',
    visualKeywords: ['side stripe', 'skate shoe', 'canvas/suede', 'waffle outsole', 'padded collar', 'classic design'],
    detailedDescription: 'Classic skate shoe with signature side stripe, canvas and suede upper, padded collar for support, waffle-pattern rubber outsole for grip.',
    consistencyPrompt: 'Vans Old Skool: Classic skate shoe silhouette with signature Vans side stripe, canvas and suede upper construction, padded collar, waffle-pattern rubber outsole, timeless skateboarding design',
    notableColorways: ['Black/White', 'Navy', 'Checkerboard', 'All Black', 'All White']
  },
  {
    brand: 'Nike',
    model: 'SB Dunk Low',
    aliases: ['sb dunk', 'nike sb', 'sb dunks'],
    category: 'skate',
    visualKeywords: ['padded tongue', 'Zoom Air', 'skateboarding', 'durable construction', 'Nike Swoosh', 'colorblock'],
    detailedDescription: 'Skateboarding version of Nike Dunk with extra-padded tongue, Zoom Air cushioning, durable construction for skating, colorblock design.',
    consistencyPrompt: 'Nike SB Dunk Low: Skateboarding-focused Dunk with extra-thick padded tongue, Zoom Air insole cushioning, durable materials, Nike Swoosh, colorblock panel construction, skate shoe reinforcements',
    notableColorways: ['Pigeon', 'Heineken', 'Tiffany', 'Supreme', 'Travis Scott']
  },

  // FASHION/LUXURY
  {
    brand: 'Balenciaga',
    model: 'Triple S',
    aliases: ['triple s', 'balenciaga triple s', 'dad shoe'],
    category: 'fashion',
    visualKeywords: ['chunky', 'triple-stacked sole', 'layered design', 'luxury fashion', 'oversized', 'Balenciaga branding'],
    detailedDescription: 'Luxury fashion sneaker with chunky triple-stacked sole, layered paneled upper, oversized proportions, embroidered number on toe, Balenciaga branding.',
    consistencyPrompt: 'Balenciaga Triple S: Chunky luxury fashion sneaker with distinctive triple-layered stacked sole, multi-material paneled upper, oversized proportions, embroidered size numbers on toe, Balenciaga branding, dad shoe aesthetic',
    notableColorways: ['Black/Red', 'Triple White', 'Grey', 'Neon']
  },
  {
    brand: 'Gucci',
    model: 'Ace',
    aliases: ['gucci ace', 'ace sneakers'],
    category: 'fashion',
    visualKeywords: ['luxury', 'bee embroidery', 'web stripe', 'leather', 'gold accents', 'Gucci branding'],
    detailedDescription: 'Luxury leather sneaker with iconic Gucci web stripe, bee or snake embroidery details, gold hardware accents, premium Italian craftsmanship.',
    consistencyPrompt: 'Gucci Ace: Luxury leather tennis-style sneaker with Gucci red-green web stripe on side, embroidered details (bee/snake/flowers), gold hardware accents, premium Italian leather construction, elegant fashion sneaker',
    notableColorways: ['White/Bee', 'Black/Snake', 'Floral Embroidered', 'Classic Web']
  },
  {
    brand: 'Louis Vuitton',
    model: 'Trainer',
    aliases: ['lv trainer', 'louis vuitton trainer', 'lv sneakers'],
    category: 'fashion',
    visualKeywords: ['monogram pattern', 'luxury', 'technical design', 'LV branding', 'premium materials', 'high fashion'],
    detailedDescription: 'High-fashion luxury sneaker with technical athletic design, monogram pattern options, premium leather and textile construction, LV branding.',
    consistencyPrompt: 'Louis Vuitton Trainer: Luxury high-fashion sneaker with technical athletic silhouette, monogram canvas or leather upper, LV signature branding, premium craftsmanship, contemporary luxury sneaker design',
    notableColorways: ['Monogram', 'White', 'Black', 'Denim Blue']
  },

  // NEW BALANCE
  {
    brand: 'New Balance',
    model: '550',
    aliases: ['nb 550', 'new balance 550', '550s'],
    category: 'lifestyle',
    visualKeywords: ['retro basketball', 'chunky design', 'N logo', 'leather upper', '80s aesthetic', 'vintage'],
    detailedDescription: 'Retro basketball-inspired lifestyle sneaker with chunky 80s silhouette, large N logo on side, leather upper, vintage athletic design.',
    consistencyPrompt: 'New Balance 550: Retro chunky basketball silhouette from 1980s, large "N" logo on side panel, leather upper construction, vintage athletic design, classic New Balance aesthetic',
    notableColorways: ['White/Green', 'White/Navy', 'Black/White', 'Grey']
  },
  {
    brand: 'New Balance',
    model: '990v5',
    aliases: ['nb 990', 'new balance 990', '990s'],
    category: 'running',
    visualKeywords: ['premium running', 'ENCAP cushioning', 'suede/mesh', 'N logo', 'Made in USA', 'classic design'],
    detailedDescription: 'Premium American-made running shoe with ENCAP midsole cushioning, pig suede and mesh upper, classic N logo, heritage running design.',
    consistencyPrompt: 'New Balance 990v5: Premium running shoe with ENCAP midsole technology, pig suede and mesh upper construction, "N" logo on sides, "Made in USA" quality, classic heritage running silhouette',
    notableColorways: ['Grey', 'Navy', 'Black', 'Burgundy']
  },

  // CONVERSE
  {
    brand: 'Converse',
    model: 'Chuck Taylor All Star',
    aliases: ['chuck taylors', 'converse', 'chucks', 'all stars'],
    category: 'lifestyle',
    visualKeywords: ['canvas upper', 'rubber toe cap', 'ankle patch', 'star logo', 'iconic design', 'timeless'],
    detailedDescription: 'Timeless canvas sneaker with rubber toe cap, ankle patch with star logo, simple lace-up design, cultural icon since 1917.',
    consistencyPrompt: 'Converse Chuck Taylor All Star: Classic canvas upper, white rubber toe cap, circular ankle patch with star logo and signature, simple lace-up construction, iconic timeless silhouette',
    notableColorways: ['Black', 'White', 'Red', 'Navy', 'Optical White']
  },

  // PUMA
  {
    brand: 'Puma',
    model: 'Suede Classic',
    aliases: ['puma suede', 'suede classics', 'pumas'],
    category: 'lifestyle',
    visualKeywords: ['suede upper', 'Puma Formstrip', 'low-top', 'retro', 'classic design', 'casual'],
    detailedDescription: 'Classic lifestyle sneaker with premium suede upper, Puma Formstrip on sides, low-top silhouette, retro athletic design.',
    consistencyPrompt: 'Puma Suede Classic: Low-top lifestyle shoe with premium suede upper, Puma Formstrip side stripe, simple classic silhouette, retro casual athletic design, iconic Puma branding',
    notableColorways: ['Black/White', 'Blue/White', 'Red/White', 'Green/White']
  },

  // ASICS
  {
    brand: 'Asics',
    model: 'Gel-Lyte III',
    aliases: ['gel lyte 3', 'asics gel lyte', 'gel-lyte iii'],
    category: 'running',
    visualKeywords: ['split tongue', 'Gel cushioning', 'Asics stripes', 'retro runner', 'suede/mesh', 'vintage'],
    detailedDescription: 'Retro running sneaker with unique split tongue design, Gel cushioning technology, Asics tiger stripes, suede and mesh upper.',
    consistencyPrompt: 'Asics Gel-Lyte III: Retro running shoe with distinctive split tongue construction, Gel cushioning system, Asics tiger stripe branding on sides, suede and mesh upper, vintage 1990s running aesthetic',
    notableColorways: ['Salmon Toe', 'Koi', 'Mint Leaf', 'Blue/Orange']
  },

  // REEBOK
  {
    brand: 'Reebok',
    model: 'Club C',
    aliases: ['reebok club c', 'club c 85', 'club c'],
    category: 'lifestyle',
    visualKeywords: ['clean design', 'leather upper', 'window logo', 'tennis-inspired', 'minimalist', 'retro'],
    detailedDescription: 'Clean minimalist lifestyle sneaker with leather upper, small Reebok window logo on side, vintage tennis-inspired design.',
    consistencyPrompt: 'Reebok Club C: Minimalist clean leather tennis shoe, small Reebok window logo on side, simple low-top silhouette, vintage tennis-inspired lifestyle sneaker, classic retro design',
    notableColorways: ['White/Green', 'White/Gum', 'All White', 'Navy']
  },

  // COMMON PROJECTS
  {
    brand: 'Common Projects',
    model: 'Achilles Low',
    aliases: ['common projects', 'achilles low', 'cp'],
    category: 'fashion',
    visualKeywords: ['minimalist', 'Italian leather', 'gold numbers', 'luxury', 'clean design', 'premium quality'],
    detailedDescription: 'Minimalist luxury sneaker with premium Italian leather upper, gold-stamped serial number on heel, clean design aesthetic.',
    consistencyPrompt: 'Common Projects Achilles Low: Ultra-minimalist luxury leather sneaker, premium Italian leather upper, gold-stamped serial number on heel counter, clean simple silhouette, high-end fashion sneaker design',
    notableColorways: ['White', 'Black', 'Grey', 'Navy', 'Blush']
  }
];

export function enhancePromptWithShoeKnowledge(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  for (const shoe of COMPREHENSIVE_SHOE_DATABASE) {
    const matched = shoe.aliases.some(alias => lower.includes(alias.toLowerCase())) || 
                    lower.includes(shoe.model.toLowerCase());
    
    if (matched) {
      console.log(`👟 Shoe detected: ${shoe.brand} ${shoe.model}`);
      
      return `${prompt}\n\n👟 PRECISE SHOE SPECIFICATION - ${shoe.brand.toUpperCase()} ${shoe.model.toUpperCase()}:\n\n${shoe.consistencyPrompt}\n\n🎯 CRITICAL SHOE ACCURACY REQUIREMENTS:\n- Brand: ${shoe.brand}\n- Model: ${shoe.model}\n- Category: ${shoe.category}\n- Key Features: ${shoe.visualKeywords.join(', ')}\n\n💎 SHOE RENDERING PROTOCOL:\n- Render exact ${shoe.brand} ${shoe.model} design with 100% brand accuracy\n- Maintain precise shoe silhouette, proportions, and signature details\n- Show correct branding placement: logos, text, and design elements\n- Apply accurate material textures: leather, mesh, suede, canvas, synthetics\n- Render precise colorway if specified, otherwise use iconic/classic colorway\n- Show correct sole design, tread pattern, and cushioning technology\n- Display accurate lacing system, eyelets, and structural elements\n- Maintain proper shoe positioning on feet with realistic fit and proportions\n- Apply correct shadows, creasing, and wear patterns for realism\n- Ensure shoe is instantly recognizable as ${shoe.brand} ${shoe.model}\n\n⚠️ AVOID GENERIC SHOES:\n- DO NOT render generic or unbranded sneakers\n- DO NOT simplify or omit signature brand details\n- DO NOT alter the distinctive design elements that define this shoe\n- Keep ${shoe.brand} branding and ${shoe.model} design 100% accurate`;
    }
  }
  
  return prompt;
}

export function searchShoes(query: string): ShoeSpec[] {
  const normalized = query.toLowerCase().trim();
  
  return COMPREHENSIVE_SHOE_DATABASE.filter(shoe => {
    if (shoe.brand.toLowerCase().includes(normalized)) return true;
    if (shoe.model.toLowerCase().includes(normalized)) return true;
    
    for (const alias of shoe.aliases) {
      if (alias.toLowerCase().includes(normalized)) return true;
    }
    
    for (const keyword of shoe.visualKeywords) {
      if (keyword.toLowerCase().includes(normalized)) return true;
    }
    
    return false;
  });
}

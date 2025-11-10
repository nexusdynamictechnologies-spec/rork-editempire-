export interface VehicleSpec {
  make: string;
  model: string;
  year?: string;
  trim?: string;
  aliases: string[];
  category: 'sports-car' | 'supercar' | 'hypercar' | 'truck' | 'suv' | 'sedan' | 'muscle-car' | 'luxury' | 'electric' | 'motorcycle' | 'classic';
  visualKeywords: string[];
  detailedDescription: string;
  consistencyPrompt: string;
}

export const COMPREHENSIVE_VEHICLE_DATABASE: VehicleSpec[] = [
  // SUPERCARS & HYPERCARS
  {
    make: 'Lamborghini',
    model: 'Aventador',
    aliases: ['lambo aventador', 'aventador', 'lamborghini'],
    category: 'supercar',
    visualKeywords: ['scissor doors', 'angular design', 'Y-shaped headlights', 'aggressive styling', 'mid-engine', 'carbon fiber'],
    detailedDescription: 'Iconic Italian supercar with dramatic angular body design, scissor doors, distinctive Y-shaped LED headlights and taillights, aggressive aerodynamic styling.',
    consistencyPrompt: 'Lamborghini Aventador: Angular aggressive supercar design with scissor doors (opens vertically), distinctive Y-shaped LED headlights, hexagonal design elements throughout, massive air intakes, carbon fiber accents, low-slung mid-engine proportions, sharp body lines, iconic Lamborghini styling'
  },
  {
    make: 'Ferrari',
    model: '488 GTB',
    aliases: ['ferrari 488', '488', 'ferrari'],
    category: 'supercar',
    visualKeywords: ['prancing horse', 'aerodynamic', 'twin-turbo', 'side air intakes', 'sculpted body', 'Italian red'],
    detailedDescription: 'Italian supercar with sculpted aerodynamic body, large side air intakes, prancing horse badge, twin-turbo performance design, flowing curved lines.',
    consistencyPrompt: 'Ferrari 488 GTB: Sculpted Italian supercar with prominent side air intakes, prancing horse badge on front, aerodynamic body with smooth flowing curves, dual circular taillights, mid-engine proportions, Ferrari signature styling, typically Rosso Corsa red or racing colors'
  },
  {
    make: 'McLaren',
    model: '720S',
    aliases: ['mclaren 720s', '720s', 'mclaren'],
    category: 'supercar',
    visualKeywords: ['dihedral doors', 'teardrop cabin', 'aerodynamic', 'carbon fiber', 'futuristic design', 'eye socket headlights'],
    detailedDescription: 'British supercar with dihedral doors, teardrop-shaped cabin design, eye socket headlights, carbon fiber monocoque, flowing aerodynamic body.',
    consistencyPrompt: 'McLaren 720S: Futuristic supercar with dihedral doors (opens upward and outward), distinctive teardrop-shaped cabin, eye socket LED headlight design, smooth flowing aerodynamic body, carbon fiber construction, mid-engine proportions, McLaren orange or racing liveries'
  },
  {
    make: 'Porsche',
    model: '911 GT3 RS',
    aliases: ['911 gt3 rs', 'porsche 911', 'gt3 rs', '911'],
    category: 'sports-car',
    visualKeywords: ['rear wing', 'wide body', 'hood vents', 'PCCB brakes', 'racing stripes', 'aggressive aero'],
    detailedDescription: 'Track-focused sports car with massive rear wing, wide body kit, hood vents, aggressive aerodynamics, distinctive Porsche 911 silhouette.',
    consistencyPrompt: 'Porsche 911 GT3 RS: Track-focused 911 with massive fixed rear wing, wide body fender flares, hood air vents, aggressive front splitter, rear-engine proportions maintaining classic 911 silhouette, racing livery options, carbon fiber details, PCCB ceramic brakes visible through wheels'
  },
  {
    make: 'Bugatti',
    model: 'Chiron',
    aliases: ['bugatti chiron', 'chiron', 'bugatti'],
    category: 'hypercar',
    visualKeywords: ['horseshoe grille', 'C-line', 'quad-turbo', 'luxury hypercar', 'two-tone paint', 'carbon fiber'],
    detailedDescription: 'French hypercar with iconic horseshoe grille, distinctive C-line design element, quad-turbo W16 engine, luxury two-tone paint schemes.',
    consistencyPrompt: 'Bugatti Chiron: Luxury hypercar with iconic horseshoe-shaped grille, distinctive C-line swooping from front to rear, quad-turbo W16 mid-engine bulge, two-tone paint scheme, massive air intakes, refined yet aggressive styling, premium craftsmanship details'
  },

  // AMERICAN MUSCLE
  {
    make: 'Ford',
    model: 'Mustang GT',
    aliases: ['mustang', 'ford mustang', 'stang', 'mustang gt'],
    category: 'muscle-car',
    visualKeywords: ['pony badge', 'tri-bar taillights', 'long hood', 'short deck', 'aggressive front', 'V8 power'],
    detailedDescription: 'American muscle car with long hood and short deck proportions, pony badge, distinctive tri-bar sequential LED taillights, aggressive shark-nose front.',
    consistencyPrompt: 'Ford Mustang GT: Classic American muscle car with long hood/short deck proportions, galloping pony badge on grille, distinctive tri-bar sequential LED taillights, aggressive front fascia, side profile with character lines, muscular stance, modern Mustang design language'
  },
  {
    make: 'Chevrolet',
    model: 'Camaro ZL1',
    aliases: ['camaro', 'chevy camaro', 'zl1', 'camaro zl1'],
    category: 'muscle-car',
    visualKeywords: ['bowtie emblem', 'wide stance', 'aggressive grille', 'supercharged', 'track package', 'dual exhausts'],
    detailedDescription: 'Aggressive American muscle car with wide menacing stance, large front grille, Chevrolet bowtie emblem, supercharged V8 performance styling.',
    consistencyPrompt: 'Chevrolet Camaro ZL1: Aggressive muscle car with wide low stance, large black front grille, Chevrolet bowtie emblem, functional hood vents, track-focused aero package, quad exhaust tips, muscular haunches, modern Camaro angular design'
  },
  {
    make: 'Dodge',
    model: 'Challenger SRT Hellcat',
    aliases: ['challenger', 'dodge challenger', 'hellcat', 'srt hellcat'],
    category: 'muscle-car',
    visualKeywords: ['retro styling', 'wide body', 'hood scoop', 'Hellcat badge', 'classic proportions', 'aggressive stance'],
    detailedDescription: 'Retro-styled muscle car with wide body fenders, functional hood scoop, Hellcat badging, modern interpretation of classic 1970s Challenger design.',
    consistencyPrompt: 'Dodge Challenger SRT Hellcat: Retro-inspired muscle car with wide body fender flares, functional supercharger hood scoop, Hellcat demon badge, split grille design, classic 1970s proportions with modern execution, aggressive wide stance, dual racing stripes option'
  },

  // LUXURY SEDANS & SUVS
  {
    make: 'Mercedes-Benz',
    model: 'S-Class',
    aliases: ['s-class', 'mercedes s-class', 's500', 's63', 'benz'],
    category: 'luxury',
    visualKeywords: ['three-pointed star', 'elegant design', 'LED lights', 'chrome grille', 'executive sedan', 'luxury details'],
    detailedDescription: 'Flagship luxury sedan with three-pointed star emblem, elegant flowing design, sophisticated LED lighting, chrome accents, executive presence.',
    consistencyPrompt: 'Mercedes-Benz S-Class: Flagship luxury sedan with prominent three-pointed star emblem on grille, elegant flowing body lines, sophisticated multi-beam LED headlights, chrome accents, long wheelbase executive proportions, refined German luxury styling'
  },
  {
    make: 'BMW',
    model: 'M5',
    aliases: ['bmw m5', 'm5', 'bimmer m5'],
    category: 'luxury',
    visualKeywords: ['kidney grille', 'M badge', 'quad exhausts', 'sporty sedan', 'Hofmeister kink', 'aggressive styling'],
    detailedDescription: 'Performance luxury sedan with iconic kidney grille, M badge, quad exhaust tips, aggressive yet refined styling, distinctive BMW design language.',
    consistencyPrompt: 'BMW M5: High-performance luxury sedan with iconic kidney grille (enlarged on current models), M5 badge on grille and fenders, quad exhaust tips, aggressive front air intakes, Hofmeister kink at C-pillar, subtle M sport design cues, refined aggressive stance'
  },
  {
    make: 'Audi',
    model: 'RS6 Avant',
    aliases: ['rs6', 'audi rs6', 'rs6 avant', 'audi wagon'],
    category: 'luxury',
    visualKeywords: ['wagon', 'quattro', 'four rings', 'wide body', 'RS badge', 'aggressive front', 'oval exhausts'],
    detailedDescription: 'High-performance luxury wagon with wide body fenders, Audi four rings badge, aggressive RS styling, oval exhaust tips, quattro AWD design cues.',
    consistencyPrompt: 'Audi RS6 Avant: Performance luxury wagon with wide body fender flares, four rings Audi logo on grille, RS6 badge, aggressive honeycomb grille, distinctive wagon roofline, oval exhaust tips, aggressive front splitter, quattro performance styling'
  },
  {
    make: 'Range Rover',
    model: 'Sport',
    aliases: ['range rover sport', 'range rover', 'rr sport', 'land rover'],
    category: 'suv',
    visualKeywords: ['floating roof', 'command driving position', 'Land Rover badge', 'luxury SUV', 'distinctive grille', 'premium details'],
    detailedDescription: 'Luxury SUV with floating roof design, commanding presence, distinctive Range Rover grille, Land Rover badge, premium British craftsmanship.',
    consistencyPrompt: 'Range Rover Sport: Luxury SUV with floating roof design (black pillars), commanding upright proportions, distinctive Range Rover grille design, Land Rover badge, split headlight design on newer models, premium British SUV styling, muscular wheel arches'
  },

  // PICKUP TRUCKS
  {
    make: 'Ford',
    model: 'F-150 Raptor',
    aliases: ['f150 raptor', 'raptor', 'f-150', 'ford raptor'],
    category: 'truck',
    visualKeywords: ['FORD grille letters', 'off-road', 'wide stance', 'Fox shocks', 'beadlock wheels', 'aggressive styling'],
    detailedDescription: 'High-performance off-road pickup truck with bold FORD letter grille, wide stance, exposed Fox shocks, beadlock-capable wheels, aggressive styling.',
    consistencyPrompt: 'Ford F-150 Raptor: Off-road performance truck with bold "FORD" block letters on grille (not Ford oval), wide aggressive stance, exposed Fox racing shocks, beadlock-capable wheels, aggressive front bumper with tow hooks, hood vents, muscular fender flares'
  },
  {
    make: 'Chevrolet',
    model: 'Silverado',
    aliases: ['silverado', 'chevy silverado', 'silverado 1500'],
    category: 'truck',
    visualKeywords: ['bowtie emblem', 'bold grille', 'truck bed', 'utilitarian', 'muscular', 'American truck'],
    detailedDescription: 'Full-size American pickup truck with bold Chevrolet bowtie emblem, prominent grille design, muscular body, versatile truck bed.',
    consistencyPrompt: 'Chevrolet Silverado: Full-size pickup truck with prominent Chevrolet bowtie emblem on grille, bold horizontal or vertical grille bars depending on year, muscular hood design, practical truck bed, utilitarian American truck proportions, strong character lines'
  },
  {
    make: 'Ram',
    model: '1500',
    aliases: ['ram 1500', 'dodge ram', 'ram truck'],
    category: 'truck',
    visualKeywords: ['ram head logo', 'crosshair grille', 'bold design', 'aggressive stance', 'large wheels', 'truck styling'],
    detailedDescription: 'Bold American pickup with ram head logo, distinctive crosshair grille design, aggressive truck stance, modern bold styling.',
    consistencyPrompt: 'Ram 1500: Modern pickup truck with ram head logo on grille, distinctive crosshair grille pattern, bold aggressive front fascia, sculpted hood with power bulge, prominent wheel arches, contemporary truck design with upscale details'
  },

  // ELECTRIC VEHICLES
  {
    make: 'Tesla',
    model: 'Model S Plaid',
    aliases: ['model s', 'tesla model s', 'plaid', 'tesla'],
    category: 'electric',
    visualKeywords: ['minimalist design', 'Tesla badge', 'electric', 'flush door handles', 'aerodynamic', 'no grille'],
    detailedDescription: 'High-performance electric sedan with minimalist design, Tesla T badge, no traditional grille, flush door handles, smooth aerodynamic body.',
    consistencyPrompt: 'Tesla Model S Plaid: Electric luxury sedan with minimalist front end (no grille), Tesla T badge on hood and rear, flush retractable door handles, smooth aerodynamic body, distinctive Tesla design language, clean lines, performance electric vehicle styling'
  },
  {
    make: 'Porsche',
    model: 'Taycan',
    aliases: ['taycan', 'porsche taycan', 'porsche electric'],
    category: 'electric',
    visualKeywords: ['four-point LED lights', 'electric Porsche', 'low stance', 'sporty design', 'Porsche badge', 'aerodynamic'],
    detailedDescription: 'Electric sports sedan with distinctive four-point LED headlights, Porsche badge, low sporty stance, aerodynamic electric vehicle design.',
    consistencyPrompt: 'Porsche Taycan: Electric sports sedan with distinctive four-point LED headlight signature, Porsche crest badge, low sporty stance, aerodynamic body, electric vehicle styling cues, Porsche design DNA, flush door handles, performance electric proportions'
  },
  {
    make: 'Rivian',
    model: 'R1T',
    aliases: ['rivian r1t', 'r1t', 'rivian truck'],
    category: 'electric',
    visualKeywords: ['oval headlights', 'adventure vehicle', 'electric truck', 'gear tunnel', 'quad motor', 'off-road design'],
    detailedDescription: 'Electric adventure pickup truck with distinctive oval LED headlight bar, gear tunnel storage, quad motor off-road capability, modern electric truck design.',
    consistencyPrompt: 'Rivian R1T: Electric adventure pickup with distinctive oval LED headlight bar across front, Rivian badge in center, gear tunnel pass-through storage behind cab, short truck bed, modern electric truck proportions, off-road capable design, clean contemporary styling'
  },

  // MOTORCYCLES
  {
    make: 'Ducati',
    model: 'Panigale V4',
    aliases: ['ducati panigale', 'panigale', 'ducati superbike'],
    category: 'motorcycle',
    visualKeywords: ['Italian superbike', 'V4 engine', 'racing design', 'Ducati red', 'aggressive styling', 'fairings'],
    detailedDescription: 'Italian superbike with aggressive racing design, exposed V4 engine, aerodynamic fairings, Ducati red livery, MotoGP-derived technology.',
    consistencyPrompt: 'Ducati Panigale V4: Italian racing superbike with aggressive aerodynamic fairings, exposed V4 engine with distinctive exhaust, Ducati red color scheme, single-sided swingarm, racing-derived winglets, MotoGP technology, sleek aggressive superbike proportions'
  },
  {
    make: 'Harley-Davidson',
    model: 'Street Glide',
    aliases: ['harley street glide', 'street glide', 'harley', 'harley davidson'],
    category: 'motorcycle',
    visualKeywords: ['batwing fairing', 'V-twin engine', 'cruiser', 'American motorcycle', 'chrome details', 'touring bike'],
    detailedDescription: 'American touring motorcycle with distinctive batwing fairing, large V-twin engine, chrome details, cruiser styling, comfortable touring setup.',
    consistencyPrompt: 'Harley-Davidson Street Glide: American touring motorcycle with distinctive batwing fairing (shark nose front), large chrome V-twin engine exposed, cruiser proportions, saddlebags, comfortable riding position, chrome accents, classic Harley styling, bar and shield logo'
  },
  {
    make: 'Kawasaki',
    model: 'Ninja H2',
    aliases: ['ninja h2', 'kawasaki h2', 'h2', 'kawasaki ninja'],
    category: 'motorcycle',
    visualKeywords: ['supercharged', 'aggressive styling', 'lime green', 'racing stripes', 'H2 badge', 'superbike'],
    detailedDescription: 'Supercharged superbike with aggressive angular styling, lime green Kawasaki color, H2 badging, exposed supercharger, extreme performance design.',
    consistencyPrompt: 'Kawasaki Ninja H2: Supercharged superbike with aggressive angular fairings, lime green Kawasaki racing color, exposed supercharger between frame rails, H2 badging, sharp bodywork, extreme performance styling, distinctive green and black livery'
  },

  // CLASSIC CARS
  {
    make: 'Chevrolet',
    model: 'Corvette C3',
    aliases: ['corvette c3', 'stingray', '70s corvette', 'c3 corvette'],
    category: 'classic',
    visualKeywords: ['chrome bumpers', 'pop-up headlights', 'long hood', 'classic American', 'Stingray badge', 'curves'],
    detailedDescription: 'Classic American sports car with chrome bumpers, pop-up headlights, long hood and short deck, flowing curves, iconic 1970s Corvette Stingray styling.',
    consistencyPrompt: 'Chevrolet Corvette C3: Classic 1970s sports car with chrome front and rear bumpers, pop-up hidden headlights, long hood with dramatic curves, short rear deck, Stingray badge, flowing body lines, classic American sports car proportions, T-top roof option'
  },
  {
    make: 'Ford',
    model: 'Mustang 1969',
    aliases: ['69 mustang', '1969 mustang', 'classic mustang', 'vintage mustang'],
    category: 'classic',
    visualKeywords: ['quad headlights', 'fastback', 'chrome trim', 'classic muscle', 'pony badge', 'retro styling'],
    detailedDescription: 'Classic muscle car with quad headlights, fastback roofline option, chrome trim, galloping pony badge, iconic late 1960s American muscle car styling.',
    consistencyPrompt: '1969 Ford Mustang: Classic muscle car with quad headlight design, fastback or notchback roofline, chrome bumpers and trim, galloping pony badge on grille, long hood/short deck proportions, classic late 60s American muscle styling, side scoops'
  },

  // JDM LEGENDS
  {
    make: 'Nissan',
    model: 'GT-R R35',
    aliases: ['gtr', 'nissan gtr', 'r35', 'gt-r'],
    category: 'sports-car',
    visualKeywords: ['quad circular taillights', 'aggressive front', 'GT-R badge', 'wide body', 'Godzilla', 'AWD'],
    detailedDescription: 'Japanese supercar with aggressive front design, quad circular taillights, GT-R badging, wide body, advanced AWD system, "Godzilla" nickname.',
    consistencyPrompt: 'Nissan GT-R R35: Japanese supercar with aggressive wide front fascia, large grille intakes, distinctive quad circular taillights, GT-R badge, wide muscular body, AWD performance stance, modern Japanese supercar design, functional aerodynamics'
  },
  {
    make: 'Toyota',
    model: 'Supra MK5',
    aliases: ['supra', 'toyota supra', 'mk5 supra', 'a90 supra'],
    category: 'sports-car',
    visualKeywords: ['double bubble roof', 'long hood', 'Toyota badge', 'aggressive styling', 'sports car', 'aerodynamic'],
    detailedDescription: 'Modern Japanese sports car with double bubble roof, long hood, aggressive aerodynamic styling, Toyota Supra badge, collaboration with BMW.',
    consistencyPrompt: 'Toyota Supra MK5: Modern sports car with double bubble roof line, long hood proportions, aggressive front fascia, Toyota badge and Supra lettering, short rear overhang, aerodynamic body with functional vents, contemporary Japanese sports car design'
  },
  {
    make: 'Honda',
    model: 'Civic Type R',
    aliases: ['civic type r', 'type r', 'ctr', 'civic r'],
    category: 'sports-car',
    visualKeywords: ['triple exhaust', 'rear wing', 'aggressive aero', 'Type R badge', 'red accents', 'hot hatch'],
    detailedDescription: 'Japanese hot hatch with aggressive aerodynamics, triple center exhaust, large rear wing, Type R badging, red accents, performance-focused design.',
    consistencyPrompt: 'Honda Civic Type R: Aggressive hot hatch with triple center-mounted exhaust tips, large rear wing spoiler, extensive aerodynamic body kit, Type R badge and red accents, wide stance, functional vents, extreme performance hatchback styling'
  }
];

export function enhancePromptWithVehicleKnowledge(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  for (const vehicle of COMPREHENSIVE_VEHICLE_DATABASE) {
    const matched = vehicle.aliases.some(alias => lower.includes(alias.toLowerCase())) || 
                    (lower.includes(vehicle.make.toLowerCase()) && lower.includes(vehicle.model.toLowerCase()));
    
    if (matched) {
      console.log(`🚗 Vehicle detected: ${vehicle.make} ${vehicle.model}`);
      
      const yearText = vehicle.year ? ` ${vehicle.year}` : '';
      const trimText = vehicle.trim ? ` ${vehicle.trim}` : '';
      
      return `${prompt}\n\n🚗 PRECISE VEHICLE SPECIFICATION - ${vehicle.make.toUpperCase()} ${vehicle.model.toUpperCase()}${yearText}${trimText}:\n\n${vehicle.consistencyPrompt}\n\n🎯 CRITICAL VEHICLE ACCURACY REQUIREMENTS:\n- Make: ${vehicle.make}\n- Model: ${vehicle.model}${vehicle.year ? `\n- Year: ${vehicle.year}` : ''}${vehicle.trim ? `\n- Trim: ${vehicle.trim}` : ''}\n- Category: ${vehicle.category}\n- Key Features: ${vehicle.visualKeywords.join(', ')}\n\n💎 VEHICLE RENDERING PROTOCOL:\n- Render exact ${vehicle.make} ${vehicle.model} design with 100% brand accuracy\n- Maintain precise vehicle proportions, body lines, and signature styling elements\n- Show correct brand badging, logos, and emblems in proper locations\n- Render accurate headlight and taillight designs (signature lighting elements)\n- Display correct grille design, air intakes, and front fascia details\n- Show proper wheel fitment, brake calipers visible through wheels\n- Apply accurate body panel gaps, door handles, and trim details\n- Maintain correct ground clearance and stance for vehicle type\n- Render realistic paint finish (gloss, matte, metallic, pearl) appropriate for vehicle\n- Include model-specific details: hood scoops, spoilers, exhaust tips, badges\n- Apply proper reflections and environmental lighting on vehicle surfaces\n- Show accurate window glass, mirrors, and pillar designs\n- Ensure vehicle is instantly recognizable as ${vehicle.make} ${vehicle.model}\n\n⚠️ AVOID GENERIC VEHICLES:\n- DO NOT render generic or unbranded vehicles\n- DO NOT simplify or omit signature brand design elements\n- DO NOT alter the distinctive styling that defines this vehicle\n- Keep ${vehicle.make} brand identity and ${vehicle.model} design 100% accurate\n- Maintain year-appropriate design if year is specified`;
    }
  }
  
  return prompt;
}

export function searchVehicles(query: string): VehicleSpec[] {
  const normalized = query.toLowerCase().trim();
  
  return COMPREHENSIVE_VEHICLE_DATABASE.filter(vehicle => {
    if (vehicle.make.toLowerCase().includes(normalized)) return true;
    if (vehicle.model.toLowerCase().includes(normalized)) return true;
    if (vehicle.year && vehicle.year.includes(normalized)) return true;
    if (vehicle.trim && vehicle.trim.toLowerCase().includes(normalized)) return true;
    
    for (const alias of vehicle.aliases) {
      if (alias.toLowerCase().includes(normalized)) return true;
    }
    
    for (const keyword of vehicle.visualKeywords) {
      if (keyword.toLowerCase().includes(normalized)) return true;
    }
    
    return false;
  });
}

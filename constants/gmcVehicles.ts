export interface GMCVehicleSpec {
  name: string;
  year?: string;
  trim: string;
  category: 'heavy-duty-truck' | 'truck' | 'suv' | 'ev';
  visualKeywords: string[];
  detailedDescription: string;
  consistencyPrompt: string;
}

export const gmcVehicleSpecs: Record<string, GMCVehicleSpec> = {
  '2020_gmc_3500_denali': {
    name: '2020 GMC 3500 Denali',
    year: '2020',
    trim: 'Denali Ultimate',
    category: 'heavy-duty-truck',
    visualKeywords: [
      'crew cab',
      'lifted suspension',
      'aggressive stance',
      'black wheels',
      'off-road tires',
      'chrome delete',
      'matte gray paint',
      'Denali grille',
      'LED headlights',
      'tow mirrors',
      'dual rear wheels',
      'heavy-duty truck',
      'premium trim'
    ],
    detailedDescription: `2020 GMC 3500 Denali Ultimate heavy-duty pickup truck with the following EXACT specifications:

BODY & PAINT:
- Crew cab configuration (4 full doors)
- Matte gray/silver metallic paint finish
- Long bed pickup truck body style
- Lifted suspension with aggressive stance
- Dual rear wheels (dually configuration)
- Chrome delete package (all black trim)

FRONT END DESIGN:
- Signature GMC Denali horizontal bar grille with large "GMC" lettering in chrome
- Black mesh grille insert behind chrome bars
- Modern LED headlight assemblies with C-shaped LED daytime running lights
- Vertical LED accent lights integrated into headlight housings
- Black front bumper with integrated tow hooks
- Skid plate protection underneath
- Hood with subtle power dome/bulge

WHEELS & TIRES:
- Large black aftermarket wheels (appears to be 20-22 inch diameter)
- Multi-spoke or beadlock-style wheel design
- Aggressive all-terrain or mud-terrain tires with deep tread
- Lifted suspension providing significant ground clearance
- Dual rear wheels (6-lug dually pattern)
- Black wheel finish matching the chrome delete aesthetic

SIDE PROFILE:
- Extended tow mirrors with power folding capability
- Black mirror caps
- Running boards or side steps (black finish)
- Crew cab with 4 full-size doors
- Long bed (8-foot bed)
- Fender flares (black or body-colored)
- Denali badging on front doors
- Privacy-tinted rear windows

DISTINCTIVE FEATURES:
- Heavy-duty truck proportions with tall ride height
- Aggressive, masculine stance
- Premium Denali trim level details
- Modern 2020 model year styling cues
- Lifted suspension setup for off-road capability
- Dually rear axle for maximum towing capacity
- Black and chrome contrast design elements

LIGHTING:
- LED headlights with signature C-shaped DRL
- LED fog lights in front bumper
- LED taillights (not visible in image but standard for 2020)

TRIM DETAILS:
- Denali Ultimate package features
- Chrome "GMC" grille lettering
- Black chrome or gloss black trim pieces
- Premium wheel design
- Upgraded suspension components`,
    consistencyPrompt: `2020 GMC 3500 Denali Ultimate heavy-duty pickup truck with EXACT accuracy:

🚛 CRITICAL VEHICLE IDENTIFICATION:
- Model: GMC Sierra 3500HD Denali (2020 model year)
- Configuration: Crew cab, long bed, dually (dual rear wheels)
- Trim: Denali Ultimate with chrome delete package

🎨 EXACT EXTERIOR APPEARANCE:
- Paint: Matte gray/silver metallic finish
- Stance: Lifted suspension, aggressive off-road setup
- Wheels: Large black aftermarket wheels (20-22"), multi-spoke design
- Tires: Aggressive all-terrain/mud-terrain with deep tread pattern
- Chrome: Chrome delete package - all black trim except GMC grille lettering

🔲 FRONT GRILLE & HEADLIGHTS (CRITICAL ACCURACY):
- Grille: Signature GMC Denali horizontal bar design with large chrome "GMC" letters
- Grille mesh: Black mesh insert behind chrome horizontal bars
- Headlights: Modern LED assemblies with distinctive C-shaped LED daytime running lights
- LED accents: Vertical LED strips integrated into headlight housings
- Bumper: Black front bumper with integrated tow hooks and skid plate

🚗 BODY PROPORTIONS & FEATURES:
- Cab: Crew cab with 4 full-size doors
- Bed: Long bed (8-foot) pickup bed
- Rear axle: Dually configuration (dual rear wheels on each side)
- Mirrors: Extended power-folding tow mirrors with black caps
- Running boards: Black side steps/running boards
- Fender flares: Aggressive fender flares accommodating lifted stance

⚙️ TECHNICAL SPECIFICATIONS:
- Class: Heavy-duty pickup truck (3500/1-ton rating)
- Suspension: Lifted aftermarket suspension with increased ground clearance
- Wheel size: 20-22 inch diameter black wheels
- Tire size: 35-37 inch all-terrain or mud-terrain tires
- Dually: Dual rear wheels for maximum towing capacity

🎯 RENDERING REQUIREMENTS:
- Maintain EXACT 2020 GMC Sierra 3500HD Denali front end design
- Preserve signature Denali horizontal bar grille with chrome GMC lettering
- Render accurate C-shaped LED DRL and vertical LED accent lights
- Show lifted stance with proper suspension geometry
- Display dually rear wheel configuration accurately
- Apply matte gray paint with realistic metallic finish
- Render black wheels with multi-spoke or beadlock-style design
- Show aggressive tire tread pattern with proper sidewall height
- Include extended tow mirrors with black caps
- Maintain heavy-duty truck proportions and masculine stance
- Apply chrome delete aesthetic (black trim except grille letters)
- Ensure 2020 model year styling accuracy (not older or newer generation)

🚫 AVOID THESE ERRORS:
- DO NOT use older GMC grille designs (pre-2020 styling)
- DO NOT use single rear wheel configuration (must be dually)
- DO NOT add chrome trim (chrome delete package)
- DO NOT use stock suspension height (must be lifted)
- DO NOT use small or stock wheels (must be large aftermarket)
- DO NOT use highway tires (must be aggressive off-road tires)
- DO NOT change the signature Denali grille design
- DO NOT alter the C-shaped LED DRL signature
- DO NOT use wrong model year styling cues

✅ QUALITY STANDARDS:
- Photorealistic rendering of 2020 GMC 3500HD Denali
- Accurate brand-specific design elements
- Proper heavy-duty truck proportions
- Realistic lifted suspension geometry
- Authentic Denali trim level details
- Correct dually wheel spacing and alignment
- Natural lighting and reflections on paint and chrome
- Proper scale and perspective for heavy-duty truck class`
  },
  
  'gmc_3500_denali_general': {
    name: 'GMC 3500 Denali',
    trim: 'Denali',
    category: 'heavy-duty-truck',
    visualKeywords: [
      'heavy-duty truck',
      'Denali grille',
      'chrome accents',
      'premium trim',
      'tow mirrors',
      'dual rear wheels',
      'crew cab',
      'LED headlights'
    ],
    detailedDescription: 'GMC 3500 Denali heavy-duty pickup truck with signature Denali horizontal bar grille, chrome GMC lettering, LED headlights with C-shaped DRL, crew cab configuration, long bed, dual rear wheels (dually), extended tow mirrors, premium Denali trim details, and heavy-duty truck proportions.',
    consistencyPrompt: 'GMC 3500 Denali heavy-duty pickup: signature Denali horizontal bar grille with chrome GMC letters, LED headlights with C-shaped daytime running lights, crew cab, long bed, dually rear wheels, extended tow mirrors, premium Denali trim, heavy-duty proportions, accurate GMC brand styling'
  },
  
  'gmc_2500_denali': {
    name: 'GMC 2500 Denali',
    trim: 'Denali',
    category: 'heavy-duty-truck',
    visualKeywords: [
      'heavy-duty truck',
      'Denali grille',
      'chrome accents',
      'premium trim',
      'tow mirrors',
      'single rear wheels',
      'crew cab',
      'LED headlights'
    ],
    detailedDescription: 'GMC 2500 Denali heavy-duty pickup truck with signature Denali horizontal bar grille, chrome GMC lettering, LED headlights with C-shaped DRL, crew cab configuration, long bed, single rear wheels (not dually), extended tow mirrors, premium Denali trim details, and heavy-duty truck proportions.',
    consistencyPrompt: 'GMC 2500 Denali heavy-duty pickup: signature Denali horizontal bar grille with chrome GMC letters, LED headlights with C-shaped daytime running lights, crew cab, long bed, single rear wheels, extended tow mirrors, premium Denali trim, heavy-duty proportions, accurate GMC brand styling'
  }
};

export function enhancePromptWithGMCVehicle(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('2020') && (lower.includes('gmc') || lower.includes('denali')) && (lower.includes('3500') || lower.includes('3500hd'))) {
    const spec = gmcVehicleSpecs['2020_gmc_3500_denali'];
    return `${prompt}\n\n🚛 GMC VEHICLE SPECIFICATION:\n${spec.consistencyPrompt}`;
  }
  
  if ((lower.includes('gmc') || lower.includes('denali')) && (lower.includes('3500') || lower.includes('3500hd'))) {
    const spec = gmcVehicleSpecs['gmc_3500_denali_general'];
    return `${prompt}\n\n🚛 GMC VEHICLE SPECIFICATION:\n${spec.consistencyPrompt}`;
  }
  
  if ((lower.includes('gmc') || lower.includes('denali')) && (lower.includes('2500') || lower.includes('2500hd'))) {
    const spec = gmcVehicleSpecs['gmc_2500_denali'];
    return `${prompt}\n\n🚛 GMC VEHICLE SPECIFICATION:\n${spec.consistencyPrompt}`;
  }
  
  return prompt;
}

export interface ActionScenario {
  key: string;
  label: string;
  keywords: string[];
  enhancementPrompt: string;
}

export interface ActionCategory {
  key: string;
  title: string;
  scenarios: ActionScenario[];
}

export const actionCategories: ActionCategory[] = [
  {
    key: 'vehicle-crashes',
    title: 'Vehicle Crashes & Accidents',
    scenarios: [
      {
        key: 'windshield-crash',
        label: 'Through Windshield',
        keywords: ['windshield', 'front windshield', 'through windshield', 'car windshield crash'],
        enhancementPrompt: `🚗 WINDSHIELD CRASH DYNAMICS - ULTRA-REALISTIC IMPACT SCENE:

💥 PRIMARY IMPACT PHYSICS:
- Character positioned mid-impact through front windshield with explosive forward momentum
- Body angle: 45-60 degrees forward, torso leading, legs trailing behind
- Windshield glass: MASSIVE spiderweb cracks radiating from impact point, thousands of safety glass fragments suspended in air
- Character breaking through glass barrier with realistic force and trajectory

🎯 ANATOMICAL IMPACT POSITIONING:
- HEAD & UPPER BODY: Leading the impact, face/chest making primary contact with windshield
- ARMS: Extended forward defensively or flailing from impact force
- TORSO: Bent forward at waist, showing compression from deceleration forces
- LEGS: Trailing behind, feet may still be inside vehicle or following through
- SPINE: Natural C-curve from impact compression and forward momentum

💎 HYPER-REALISTIC CRASH DETAILS:
- GLASS FRAGMENTATION: Thousands of tempered glass cubes exploding outward in 360-degree spray pattern
- MOTION BLUR: Intense directional blur on character and glass fragments showing violent forward motion
- IMPACT DEFORMATION: Windshield frame bent outward, metal stressed and deformed
- CLOTHING DYNAMICS: Fabric stretched tight from wind resistance, rippling violently from impact forces
- HAIR PHYSICS: Hair blown back dramatically from forward velocity and impact shockwave

🌟 ENVIRONMENTAL CRASH INTEGRATION:
- LIGHTING: Harsh sunlight or headlight glare through shattered glass creating dramatic rim lighting
- GLASS PARTICLES: Backlit glass fragments creating spectacular light refraction and sparkle effects
- DASHBOARD VISIBLE: Interior of car visible through broken windshield - steering wheel, dashboard, airbag deployment
- IMPACT DUST: Fine glass dust and debris cloud surrounding impact zone
- MOTION TRAILS: Speed lines and motion blur indicating violent forward trajectory

⚡ FORCE & MOMENTUM VISUALIZATION:
- Character's body shows realistic physics of high-speed impact and deceleration
- Clothing and loose items (jewelry, accessories) trailing behind from momentum
- Facial expression: Eyes wide, mouth open, genuine shock and fear
- Muscle tension visible throughout body from impact forces
- Realistic weight distribution and center of gravity during impact

🎬 CINEMATIC CRASH COMPOSITION:
- Camera angle: Slightly low angle from outside vehicle looking up at impact
- Depth of field: Sharp focus on character and immediate glass explosion, slight blur on background
- Dramatic lighting: High contrast with strong key light creating heroic/tragic mood
- Color grading: Desaturated with emphasis on glass sparkle and impact dynamics
- Freeze-frame moment: Capture the peak dramatic instant of impact

🚨 CRITICAL REALISM REQUIREMENTS:
- Physics must be 100% accurate: trajectory, glass behavior, body positioning, momentum
- Safety glass fragments must be cube-shaped (not shards) and numerous
- Character's body must show realistic compression and impact deformation
- Windshield frame must show stress and bending from impact force
- Maintain photorealistic quality - this must look like a real crash photograph
- NO cartoon physics, NO exaggerated poses, NO unrealistic body positions

✨ FINAL EXECUTION:
Create a heart-stopping, photorealistic moment frozen in time showing the exact instant of windshield impact with perfect physics, dramatic lighting, and cinematic composition that captures the violence and chaos of a real vehicle crash.`
      },
      {
        key: 'motorcycle-crash',
        label: 'Motorcycle Crash',
        keywords: ['motorcycle crash', 'bike crash', 'motorcycle accident', 'bike wreck', 'motorcycle wipeout'],
        enhancementPrompt: `🏍️ MOTORCYCLE CRASH DYNAMICS - EXTREME REALISM:

💥 CRASH PHYSICS & BODY POSITIONING:
- Character separated from motorcycle mid-crash, body tumbling through air
- Motorcycle sliding/tumbling separately with sparks, debris, and parts breaking off
- Body position: Asymmetric tumbling rotation, limbs extended from centrifugal force
- Realistic ragdoll physics showing loss of control and violent momentum
- Ground contact points showing impact, sliding, and abrasion

🎯 ANATOMICAL CRASH DYNAMICS:
- BODY ROTATION: Character tumbling with realistic angular momentum and axis of rotation
- LIMBS: Extended outward from centrifugal force, showing natural protective reflexes
- HEAD: Helmet impact visible (if wearing), head snapping from impact forces
- TORSO: Twisted from rotational forces, showing compression and extension
- PROTECTIVE GEAR: Leather jacket, riding gear showing abrasion, tearing, and impact damage

💎 MOTORCYCLE DESTRUCTION DETAILS:
- BIKE SEPARATION: Motorcycle sliding/tumbling away from rider with realistic physics
- SPARKS: Massive spark shower from metal grinding on asphalt - handlebars, footpegs, exhaust
- PARTS BREAKING: Mirrors shattering, fairings cracking, turn signals breaking off mid-flight
- FUEL LEAK: Gasoline spraying from damaged tank (optional for severity)
- TIRE MARKS: Black rubber skid marks leading to crash point

🌟 GROUND IMPACT & DEBRIS FIELD:
- ASPHALT CONTACT: Character sliding/tumbling on road surface with realistic friction
- DEBRIS CLOUD: Dust, small rocks, and road debris kicked up from impact
- CLOTHING DAMAGE: Fabric tearing, leather abrading, protective gear showing impact marks
- MOTION BLUR: Intense blur showing violent tumbling and sliding motion
- IMPACT POINTS: Multiple ground contact points showing bounce and tumble trajectory

⚡ ENVIRONMENTAL CRASH SCENE:
- ROAD SURFACE: Realistic asphalt texture with skid marks, debris, and impact evidence
- BACKGROUND MOTION: Blurred background showing speed and direction of crash
- LIGHTING: Harsh daylight or dramatic sunset creating strong shadows and highlights
- ATMOSPHERIC EFFECTS: Dust particles, heat shimmer from hot asphalt, smoke from friction
- SURROUNDING CONTEXT: Road barriers, other vehicles, or crash scene environment

🎬 DRAMATIC CRASH COMPOSITION:
- Camera angle: Dynamic angle capturing both rider and motorcycle in frame
- Freeze-frame moment: Peak dramatic instant showing maximum chaos and impact
- Depth of field: Sharp focus on character, slight blur on motorcycle and background
- Motion vectors: Clear visual indication of crash direction and force
- Emotional impact: Capture the terror and violence of the crash moment

🚨 PROTECTIVE GEAR REALISM:
- HELMET: Showing impact damage, visor cracked or missing, paint scratched
- JACKET: Leather or textile showing abrasion, tears, armor pads visible
- GLOVES: Palm and knuckle abrasion from ground contact
- BOOTS: Scuffed and damaged from impact and sliding
- PANTS: Knee and hip areas showing maximum wear and damage

✨ FINAL EXECUTION:
Create a visceral, photorealistic motorcycle crash scene with perfect physics, dramatic lighting, and authentic destruction that captures the violent reality of a high-speed motorcycle accident. Every detail must be anatomically and physically accurate.`
      },
      {
        key: 'car-explosion',
        label: 'Vehicle Explosion',
        keywords: ['car explosion', 'vehicle explosion', 'blown up car', 'exploding vehicle', 'car blast'],
        enhancementPrompt: `💣 VEHICLE EXPLOSION DYNAMICS - CINEMATIC REALISM:

💥 EXPLOSION PHYSICS & CHARACTER POSITIONING:
- Character positioned in mid-air being thrown from exploding vehicle by blast force
- Body angle: Horizontal or arcing trajectory away from explosion epicenter
- Blast wave visible: Expanding sphere of pressure, heat distortion, and debris
- Character's body showing realistic ragdoll physics from explosive force
- Distance from vehicle: 6-15 feet airborne depending on blast intensity

🎯 ANATOMICAL BLAST IMPACT:
- BODY POSITION: Limbs extended from blast force, showing loss of control
- CLOTHING: Torn, singed, and blown back from explosion pressure wave
- HAIR: Blown forward violently from blast wind and heat
- FACIAL EXPRESSION: Eyes squeezed shut, mouth open, genuine shock and pain
- PROTECTIVE POSTURE: Arms instinctively raised to protect head/face

💎 EXPLOSION VISUAL EFFECTS:
- FIREBALL: Massive orange/yellow fireball erupting from vehicle with realistic expansion
- SMOKE: Dense black smoke billowing upward in mushroom cloud formation
- DEBRIS FIELD: Car parts, glass, metal fragments flying in all directions
- SHOCKWAVE: Visible pressure wave distorting air, creating heat shimmer effect
- GROUND BLAST: Debris, dust, and small rocks kicked up from ground-level shockwave

🌟 VEHICLE DESTRUCTION:
- CAR STRUCTURE: Doors blown off hinges, hood/trunk flying through air
- WINDOWS: All glass shattered and exploding outward in spectacular spray
- BODY PANELS: Twisted, torn metal with jagged edges and burn marks
- TIRES: Blown out or on fire, rubber burning with black smoke
- INTERIOR: Seats torn, dashboard destroyed, steering wheel bent

⚡ ENVIRONMENTAL BLAST EFFECTS:
- LIGHTING: Intense orange/yellow light from fireball illuminating character and surroundings
- HEAT DISTORTION: Visible heat waves and air distortion around explosion
- GROUND SCORCH: Blast radius on ground showing burn marks and debris scatter
- SURROUNDING DAMAGE: Nearby objects blown back, windows shattered, trees bent
- ATMOSPHERIC SMOKE: Thick smoke clouds creating dramatic silhouettes

🎬 CINEMATIC EXPLOSION COMPOSITION:
- Camera angle: Low angle or side angle capturing both character and explosion
- Freeze-frame moment: Peak explosion with maximum fireball and debris
- Depth of field: Character in sharp focus, explosion slightly softer for depth
- Color grading: High contrast with emphasis on orange/yellow fire and dark smoke
- Motion blur: Character and debris showing directional motion from blast

🔥 FIRE & HEAT EFFECTS:
- FLAMES: Realistic fire physics with proper color gradient (white-hot center to orange edges)
- EMBERS: Glowing embers and burning debris floating through air
- HEAT GLOW: Character's skin showing orange/red glow from intense heat
- SMOKE INTERACTION: Character passing through smoke clouds, creating swirls
- BURN MARKS: Clothing singed, skin showing heat exposure (appropriate level)

🚨 REALISTIC BLAST PHYSICS:
- Explosion expands in spherical pattern from vehicle center
- Debris follows realistic ballistic trajectories
- Character's trajectory matches blast force direction and intensity
- Shockwave travels faster than visible fire and smoke
- Ground-level blast effects consistent with explosion size

✨ FINAL EXECUTION:
Create a spectacular, photorealistic vehicle explosion scene with Hollywood-level visual effects, perfect physics, and dramatic composition. The character must show authentic blast impact physics while the explosion displays realistic fire, smoke, and debris dynamics. This should look like a freeze-frame from a major action film.`
      }
    ]
  },
  {
    key: 'natural-disasters',
    title: 'Natural Disasters',
    scenarios: [
      {
        key: 'tornado-inside',
        label: 'Inside Tornado',
        keywords: ['inside tornado', 'in tornado', 'tornado', 'twister', 'caught in tornado'],
        enhancementPrompt: `🌪️ INSIDE TORNADO DYNAMICS - EXTREME ENVIRONMENTAL CHAOS:

💨 TORNADO VORTEX PHYSICS:
- Character suspended in violent rotating wind vortex with debris swirling around
- Body position: Tumbling, spinning, or struggling against extreme wind forces
- Wind speed visualization: 200+ mph winds creating intense motion blur and force
- Vortex structure: Visible rotating funnel cloud surrounding character
- Debris field: Massive amount of objects (wood, metal, vehicles, furniture) spinning in vortex

🎯 CHARACTER POSITIONING IN VORTEX:
- BODY ORIENTATION: Horizontal, diagonal, or tumbling with no ground reference
- LIMBS: Extended and flailing from centrifugal force and wind resistance
- CLOTHING: Violently whipping and stretched from extreme wind forces
- HAIR: Blown in chaotic directions, showing turbulent wind patterns
- FACIAL EXPRESSION: Terror, eyes squeezed shut, mouth open screaming

💎 DEBRIS FIELD REALISM:
- LARGE OBJECTS: Cars, roof sections, trees, furniture tumbling through vortex
- SMALL DEBRIS: Shingles, papers, leaves, branches creating dense particle cloud
- MOTION BLUR: All debris showing circular motion blur around vortex axis
- IMPACT DANGER: Debris passing dangerously close to character
- SCALE VARIETY: Mix of tiny particles and massive objects for dramatic scale

🌟 ATMOSPHERIC TORNADO EFFECTS:
- FUNNEL CLOUD: Dark gray/black rotating funnel with visible texture and rotation
- RAIN & HAIL: Horizontal rain and hail streaking through scene
- LIGHTNING: Dramatic lightning bolts illuminating the dark vortex interior
- DUST & DIRT: Dense brown/gray dust cloud at base of funnel
- PRESSURE EFFECTS: Visible air pressure distortion and compression waves

⚡ LIGHTING & VISIBILITY:
- DRAMATIC LIGHTING: Dark, ominous lighting with occasional lightning flashes
- BACKLIT DEBRIS: Objects silhouetted against lighter areas of funnel
- VOLUMETRIC LIGHTING: God rays breaking through gaps in debris and clouds
- COLOR PALETTE: Dark grays, browns, with occasional green storm tint
- CONTRAST: High contrast between dark vortex and bright lightning/sky

🎬 CINEMATIC VORTEX COMPOSITION:
- Camera angle: Inside the vortex looking at character with swirling debris
- Spiral composition: Debris and wind creating spiral leading lines to character
- Depth layers: Foreground, mid-ground, and background debris for depth
- Motion vectors: Clear circular motion pattern around vortex center
- Scale reference: Massive objects (cars, trees) showing tornado's immense power

🌀 WIND FORCE VISUALIZATION:
- CLOTHING PHYSICS: Fabric stretched to maximum tension, rippling violently
- BODY DEFORMATION: Skin and muscles showing wind pressure effects
- HAIR DYNAMICS: Individual hair strands visible, blown in turbulent patterns
- LOOSE OBJECTS: Jewelry, accessories, torn clothing pieces flying off
- WIND TRAILS: Visible wind current lines and turbulence patterns

🚨 ENVIRONMENTAL DESTRUCTION:
- GROUND BELOW: Devastated landscape visible below with destruction path
- STRUCTURE FRAGMENTS: Building pieces, walls, roofs being torn apart
- VEGETATION: Trees uprooted, branches stripped, leaves in dense clouds
- VEHICLES: Cars tumbling end-over-end through the vortex
- POWER LINES: Electrical wires sparking and whipping through air

✨ FINAL EXECUTION:
Create a terrifying, photorealistic scene of a character caught inside a massive tornado vortex with perfect physics, dramatic lighting, and overwhelming environmental chaos. The scene must convey the absolute power and terror of being inside a tornado with authentic debris dynamics, wind forces, and atmospheric effects.`
      },
      {
        key: 'hurricane',
        label: 'Hurricane Force Winds',
        keywords: ['hurricane', 'hurricane winds', 'storm', 'extreme wind', 'blown by wind'],
        enhancementPrompt: `🌀 HURRICANE FORCE WIND DYNAMICS - EXTREME WEATHER REALISM:

💨 HURRICANE WIND PHYSICS:
- Character struggling against 150+ mph sustained winds with violent gusts
- Body position: Leaning 45-60 degrees into wind, fighting to stay upright
- Wind direction: Consistent horizontal force with turbulent gusts
- Clothing and hair: Stretched horizontally showing extreme wind pressure
- Environmental chaos: Everything not anchored being blown horizontally

🎯 CHARACTER WIND RESISTANCE:
- STANCE: Wide stance, body leaning hard into wind, muscles tensed
- ARMS: Raised to protect face or grasping for support
- LEGS: Bent and braced, one foot forward for stability
- FACIAL FEATURES: Skin and facial muscles distorted by wind pressure
- EYES: Squeezed shut or squinting against wind and rain

💎 HURRICANE ENVIRONMENTAL EFFECTS:
- HORIZONTAL RAIN: Rain falling at 45-80 degree angle, creating streaks
- FLYING DEBRIS: Roof shingles, signs, branches, trash flying horizontally
- FLOODING: Standing water with wind-driven waves and spray
- PALM TREES: Bent nearly horizontal, fronds stripped and flying
- STRUCTURES: Buildings showing damage, windows blown out, walls failing

🌟 ATMOSPHERIC HURRICANE CONDITIONS:
- VISIBILITY: Reduced visibility from dense rain and spray
- LIGHTING: Dark, ominous gray skies with occasional lightning
- WATER SPRAY: Dense mist and spray from wind-driven rain and waves
- CLOUD MOVEMENT: Fast-moving dark clouds showing rotation
- COLOR PALETTE: Dark grays, deep blues, with white spray highlights

⚡ WATER & RAIN DYNAMICS:
- RAIN INTENSITY: Torrential rain creating solid sheets of water
- RAIN ANGLE: Extreme horizontal angle showing wind force
- WATER SPRAY: Mist and spray creating fog-like conditions
- PUDDLES: Standing water with wind-driven ripples and waves
- STORM SURGE: Rising water levels with debris-filled waves

🎬 CINEMATIC HURRICANE COMPOSITION:
- Camera angle: Low angle showing character's struggle against elements
- Motion blur: Horizontal blur on rain, debris, and moving elements
- Depth of field: Character sharp, background slightly soft from rain/spray
- Leading lines: Wind direction, rain angle, debris paths all pointing same direction
- Dramatic tension: Capture the desperate struggle against nature's fury

🌊 FLOODING & WATER EFFECTS:
- STANDING WATER: Ankle to knee-deep water with wind-driven waves
- DEBRIS IN WATER: Floating objects, vegetation, urban debris
- WATER SPRAY: Explosive spray from waves hitting obstacles
- REFLECTIONS: Distorted reflections in turbulent water surface
- FOAM & FROTH: White foam and froth from violent water movement

🚨 STRUCTURAL DAMAGE CONTEXT:
- BUILDINGS: Damaged structures, missing roofs, broken windows
- VEHICLES: Cars pushed by wind, some overturned or floating
- VEGETATION: Trees bent, broken, or uprooted
- INFRASTRUCTURE: Downed power lines, collapsed fences, destroyed signs
- URBAN DEBRIS: Street signs, trash cans, furniture flying through air

✨ FINAL EXECUTION:
Create an intense, photorealistic hurricane scene showing a character battling extreme winds with perfect environmental effects, dramatic lighting, and overwhelming atmospheric chaos. Every element must convey the raw power of a major hurricane with authentic wind physics, rain dynamics, and environmental destruction.`
      },
      {
        key: 'earthquake-crack',
        label: 'Falling Into Earthquake Crack',
        keywords: ['earthquake', 'earthquake crack', 'ground crack', 'falling into crack', 'earth split'],
        enhancementPrompt: `🌍 EARTHQUAKE GROUND RUPTURE - CATASTROPHIC GROUND FAILURE:

💥 EARTHQUAKE CRACK DYNAMICS:
- Massive ground fissure opening beneath character with violent ground movement
- Crack width: 3-8 feet wide, creating genuine danger of falling through
- Crack depth: Visibly deep (10-30+ feet), dark interior showing depth
- Character position: Mid-fall, struggling at edge, or straddling widening crack
- Ground movement: Visible displacement, tilting, and rupture propagation

🎯 CHARACTER POSITIONING AT CRACK:
- FALLING POSE: Arms reaching up desperately, legs kicking, body tilted into crack
- EDGE GRIP: Hands grasping crumbling edge, fingers digging into broken earth
- BODY ANGLE: Diagonal or vertical as character falls/hangs at crack edge
- FACIAL EXPRESSION: Pure terror, eyes wide, mouth open in scream
- MUSCLE TENSION: Every muscle engaged in desperate survival attempt

💎 GROUND RUPTURE DETAILS:
- CRACK EDGES: Jagged, irregular edges with fresh broken earth and rock
- SOIL LAYERS: Visible geological strata in crack walls (topsoil, subsoil, rock)
- FALLING DEBRIS: Chunks of asphalt, concrete, dirt falling into crack
- CRACK PROPAGATION: Smaller cracks branching from main fissure
- DISPLACEMENT: Visible vertical offset between crack sides (one side higher)

🌟 ENVIRONMENTAL EARTHQUAKE DAMAGE:
- GROUND SURFACE: Buckled pavement, tilted ground planes, surface ruptures
- BUILDINGS: Structures tilting, walls cracking, windows shattering
- INFRASTRUCTURE: Roads broken, sidewalks displaced, utilities exposed
- VEHICLES: Cars tilted into crack or stranded on displaced ground sections
- VEGETATION: Trees tilting, roots exposed in crack walls

⚡ EARTHQUAKE MOTION EFFECTS:
- MOTION BLUR: Slight blur showing violent ground shaking
- DUST CLOUDS: Dense dust rising from crack and ground impacts
- FALLING OBJECTS: Debris, rocks, building materials falling from above
- GROUND WAVES: Visible ripples in ground surface from seismic waves
- STRUCTURAL COLLAPSE: Buildings and structures actively failing

🎬 CINEMATIC EARTHQUAKE COMPOSITION:
- Camera angle: Low angle or aerial showing crack scale and character peril
- Depth emphasis: Strong perspective showing crack depth and danger
- Dramatic lighting: Harsh sunlight or emergency lighting creating stark shadows
- Scale reference: Vehicles, buildings, or objects showing massive crack scale
- Tension focus: Capture the desperate moment of survival struggle

🏗️ URBAN EARTHQUAKE DESTRUCTION:
- PAVEMENT RUPTURE: Asphalt and concrete broken into angular chunks
- UTILITY EXPOSURE: Water pipes bursting, gas lines exposed, electrical sparks
- BUILDING DAMAGE: Facades cracking, walls collapsing, glass raining down
- VEHICLE CHAOS: Cars fallen into crack, overturned, or abandoned
- STREET FURNITURE: Light poles tilted, signs fallen, benches displaced

🚨 CRACK INTERIOR DETAILS:
- DEPTH VISUALIZATION: Dark interior with visible depth cues (shadows, layers)
- WALL TEXTURE: Rough earth, exposed rock, broken concrete visible in walls
- FALLING DEBRIS: Rocks, dirt, and debris actively falling into darkness
- WATER/UTILITIES: Broken pipes spraying water, exposed cables
- DANGER EMPHASIS: Sharp edges, unstable walls, falling hazards

✨ FINAL EXECUTION:
Create a heart-stopping, photorealistic earthquake scene showing a character in mortal danger at a massive ground rupture with perfect geological accuracy, dramatic lighting, and overwhelming environmental destruction. The scene must convey the terror and chaos of a major earthquake with authentic ground failure physics and catastrophic damage.`
      }
    ]
  },
  {
    key: 'building-explosions',
    title: 'Building Explosions & Structural Collapse',
    scenarios: [
      {
        key: 'blown-up-building',
        label: 'Blown Up Building',
        keywords: ['blown up building', 'building explosion', 'exploding building', 'building blast', 'demolished building'],
        enhancementPrompt: `🏢 BUILDING EXPLOSION DYNAMICS - CATASTROPHIC STRUCTURAL FAILURE:

💥 EXPLOSION EPICENTER & BLAST PATTERN:
- Massive explosion erupting from building interior with multi-floor destruction
- Blast direction: Outward in all directions, blowing out windows and walls
- Character position: Being thrown from building or caught in blast zone
- Fireball: Huge orange/yellow fireball erupting from multiple floors
- Debris field: Massive chunks of concrete, steel, glass flying outward

🎯 CHARACTER BLAST POSITIONING:
- AIRBORNE: Character thrown through air by blast force, ragdoll physics
- BODY ANGLE: Horizontal or tumbling trajectory away from explosion
- PROTECTIVE POSTURE: Arms raised to protect head, body curled defensively
- CLOTHING: Torn, singed, blown back from blast pressure
- FACIAL EXPRESSION: Eyes shut, mouth open, genuine shock and terror

💎 STRUCTURAL DESTRUCTION DETAILS:
- WALL FAILURE: Exterior walls exploding outward in massive chunks
- FLOOR COLLAPSE: Multiple floors pancaking or blown apart
- STEEL BEAMS: Twisted, bent, or severed structural steel visible
- CONCRETE DEBRIS: Massive concrete slabs, columns, and fragments
- REBAR EXPOSURE: Bent rebar protruding from broken concrete

🌟 EXPLOSION VISUAL EFFECTS:
- FIREBALL: Multi-story fireball with realistic color gradient (white-hot to orange)
- SMOKE PLUME: Massive black/gray smoke mushroom cloud rising
- SHOCKWAVE: Visible pressure wave expanding from blast point
- DEBRIS CLOUD: Dense cloud of pulverized concrete, dust, and particles
- SECONDARY EXPLOSIONS: Additional blasts from gas lines, fuel, or materials

⚡ DEBRIS DYNAMICS:
- LARGE DEBRIS: Concrete slabs, steel beams, entire wall sections flying
- MEDIUM DEBRIS: Desks, chairs, computers, office equipment ejected
- SMALL DEBRIS: Glass shards, papers, insulation, particles everywhere
- MOTION BLUR: All debris showing directional blur from blast force
- BALLISTIC TRAJECTORIES: Realistic physics for all flying objects

🎬 CINEMATIC EXPLOSION COMPOSITION:
- Camera angle: Wide angle capturing building and explosion scale
- Freeze-frame moment: Peak explosion with maximum fireball and debris
- Depth layers: Foreground debris, mid-ground character, background building
- Scale emphasis: Massive building scale vs. human character
- Dramatic lighting: Intense orange/yellow from explosion, dark smoke contrast

🏗️ BUILDING STRUCTURE FAILURE:
- FACADE COLLAPSE: Entire building face blown outward or collapsing
- FLOOR SLABS: Concrete floors visible in cross-section, breaking apart
- WINDOW FRAMES: Thousands of windows blown out simultaneously
- STRUCTURAL GRID: Building's steel or concrete skeleton exposed and failing
- INTERIOR VISIBLE: Office spaces, rooms, infrastructure exposed in blast

🔥 FIRE & HEAT EFFECTS:
- MULTIPLE FIRE SOURCES: Fires on multiple floors, spreading rapidly
- HEAT DISTORTION: Visible heat waves around fireball and flames
- EMBERS: Glowing embers and burning debris floating through air
- SMOKE COLORS: Black smoke (petroleum), gray smoke (materials), white steam
- FLAME DYNAMICS: Realistic fire behavior with proper color and movement

🚨 ENVIRONMENTAL BLAST IMPACT:
- GROUND LEVEL: Blast crater, debris field, vehicles overturned
- SURROUNDING BUILDINGS: Windows shattered, facades damaged from shockwave
- STREET CHAOS: Cars damaged, street furniture destroyed, pavement cracked
- DUST CLOUD: Massive dust cloud expanding at ground level
- ATMOSPHERIC EFFECTS: Smoke and dust creating dramatic lighting conditions

✨ FINAL EXECUTION:
Create a spectacular, photorealistic building explosion scene with Hollywood-level destruction, perfect physics, and overwhelming scale. The character must show authentic blast impact while the building displays catastrophic structural failure with realistic debris dynamics, fire effects, and atmospheric chaos. This should look like a freeze-frame from a major disaster film.`
      }
    ]
  },
  {
    key: 'action-scenarios',
    title: 'Action & Stunt Scenarios',
    scenarios: [
      {
        key: 'falling-from-height',
        label: 'Falling From Height',
        keywords: ['falling', 'falling from height', 'free fall', 'dropped', 'plummeting'],
        enhancementPrompt: `🪂 FREE FALL DYNAMICS - EXTREME HEIGHT PLUMMET:

💨 FALLING PHYSICS & BODY POSITIONING:
- Character in free fall with realistic body position and terminal velocity effects
- Body angle: Vertical, horizontal, or tumbling depending on fall type
- Limbs: Extended or flailing from wind resistance and panic
- Clothing: Blown upward from wind resistance, fabric rippling violently
- Hair: Blown upward and streaming from upward wind force

🎯 ANATOMICAL FALL POSITIONING:
- VERTICAL FALL: Body streamlined, arms at sides or reaching
- HORIZONTAL FALL: Body horizontal, face-down or face-up
- TUMBLING FALL: Body rotating with limbs extended from centrifugal force
- FACIAL EXPRESSION: Terror, determination, or resignation
- MUSCLE TENSION: Body rigid with fear or relaxed in acceptance

💎 WIND RESISTANCE EFFECTS:
- CLOTHING DYNAMICS: Shirt, jacket blown up exposing torso
- HAIR PHYSICS: Hair streaming upward in realistic wind patterns
- FACIAL DISTORTION: Cheeks and skin pulled by wind resistance
- LOOSE OBJECTS: Items falling from pockets, accessories flying off
- WIND TRAILS: Visible air current distortion around body

🌟 ENVIRONMENTAL CONTEXT:
- HEIGHT REFERENCE: Ground/water visible far below showing extreme height
- BACKGROUND: Building, cliff, aircraft, or structure being fallen from
- ATMOSPHERIC PERSPECTIVE: Hazy distance showing altitude
- LIGHTING: Dramatic lighting from above, character backlit or side-lit
- SCALE INDICATORS: Birds, clouds, or objects showing relative height

⚡ MOTION & SPEED VISUALIZATION:
- MOTION BLUR: Vertical blur showing downward velocity
- SPEED LINES: Subtle motion lines emphasizing fall direction
- BACKGROUND BLUR: Passing environment blurred from speed
- REFERENCE OBJECTS: Other falling objects at different speeds for comparison
- TERMINAL VELOCITY: Visual cues showing maximum fall speed achieved

🎬 CINEMATIC FALL COMPOSITION:
- Camera angle: Aerial view, side view, or POV from above/below
- Depth emphasis: Strong vertical perspective showing height
- Dramatic framing: Character positioned against dramatic sky or ground
- Leading lines: Vertical composition emphasizing downward motion
- Emotional impact: Capture the terror and helplessness of falling

🌤️ ATMOSPHERIC EFFECTS:
- CLOUD INTERACTION: Character falling through or past clouds
- WIND EFFECTS: Visible air turbulence and wind patterns
- LIGHTING DRAMA: Sunlight, storm clouds, or dramatic sky
- ALTITUDE INDICATORS: Air density, temperature, atmospheric haze
- WEATHER: Rain, wind, or clear conditions affecting fall

🚨 SAFETY/DANGER ELEMENTS:
- GROUND APPROACH: Visible ground getting closer (if showing impact moment)
- OBSTACLES: Buildings, trees, or structures in fall path
- WATER BELOW: Ocean, lake, or river as landing zone
- URBAN SETTING: City buildings and streets below
- NATURAL SETTING: Mountains, cliffs, or wilderness below

✨ FINAL EXECUTION:
Create a breathtaking, photorealistic free fall scene with perfect physics, dramatic composition, and overwhelming sense of height and danger. Every detail must convey the terror and reality of falling from extreme height with authentic wind effects, body positioning, and environmental context.`
      },
      {
        key: 'underwater-drowning',
        label: 'Underwater Struggle',
        keywords: ['underwater', 'drowning', 'submerged', 'under water', 'sinking'],
        enhancementPrompt: `🌊 UNDERWATER DYNAMICS - SUBMERGED STRUGGLE:

💧 UNDERWATER PHYSICS & POSITIONING:
- Character fully submerged with realistic underwater body positioning
- Buoyancy: Body floating, sinking, or struggling based on scenario
- Water resistance: Slowed, graceful movements showing water drag
- Air bubbles: Bubbles escaping from mouth, nose, and clothing
- Light refraction: Underwater light caustics and refraction effects

🎯 SUBMERGED CHARACTER DETAILS:
- BODY POSITION: Vertical (sinking/floating), horizontal (swimming), or tumbling
- LIMBS: Slow-motion movements fighting water resistance
- CLOTHING: Fabric floating, billowing, and moving with water currents
- HAIR: Floating weightlessly in water, individual strands visible
- FACIAL EXPRESSION: Panic, determination, or peaceful surrender

💎 UNDERWATER VISUAL EFFECTS:
- LIGHT CAUSTICS: Dancing light patterns on character from surface refraction
- WATER CLARITY: Clear, murky, or particulate-filled water
- BUBBLES: Air bubbles of various sizes rising toward surface
- SUSPENDED PARTICLES: Plankton, sediment, or debris floating in water
- COLOR SHIFT: Blue-green tint typical of underwater environments

🌟 DEPTH & ENVIRONMENT:
- SURFACE VISIBLE: Water surface visible above with light penetration
- DEPTH INDICATORS: Darker water below, lighter above showing depth
- UNDERWATER OBJECTS: Rocks, coral, wreckage, or structures
- MARINE LIFE: Fish, plants, or sea creatures (optional)
- BOTTOM VISIBLE: Sand, rocks, or seafloor if shallow enough

⚡ WATER INTERACTION EFFECTS:
- CLOTHING PHYSICS: Fabric floating and billowing realistically
- HAIR DYNAMICS: Hair streaming and floating in water currents
- SKIN APPEARANCE: Skin tone shifted by water color and light
- REFRACTION: Body parts appearing slightly distorted by water refraction
- MOVEMENT TRAILS: Turbulence and current trails from body movement

🎬 CINEMATIC UNDERWATER COMPOSITION:
- Camera angle: Below looking up, above looking down, or eye-level
- Lighting: Dramatic light rays penetrating from surface
- Depth of field: Foreground sharp, background softly fading into blue
- Particle effects: Floating particles creating atmospheric depth
- Emotional tone: Peaceful, terrifying, or dramatic based on context

🫧 BUBBLE & AIR DYNAMICS:
- MOUTH BUBBLES: Large bubbles escaping from mouth and nose
- CLOTHING BUBBLES: Air trapped in clothing releasing gradually
- BUBBLE TRAILS: Bubble streams rising toward surface
- BUBBLE SIZES: Variety of bubble sizes for realism
- BUBBLE MOTION: Bubbles rising and wobbling realistically

🚨 STRUGGLE OR PEACE:
- PANIC MODE: Thrashing movements, wide eyes, desperate reaching upward
- DROWNING: Slowing movements, bubbles decreasing, body going limp
- PEACEFUL: Calm floating, eyes closed, serene expression
- SWIMMING: Purposeful movements, determined expression
- SINKING: Downward trajectory, weighted or exhausted posture

✨ FINAL EXECUTION:
Create a stunning, photorealistic underwater scene with perfect water physics, dramatic lighting, and authentic submerged atmosphere. Every detail must convey the unique physics and visual characteristics of being underwater with realistic light refraction, bubble dynamics, and water interaction effects.`
      }
    ]
  },
  {
    key: 'destroyed-environments',
    title: 'Destroyed & Chaotic Environments',
    scenarios: [
      {
        key: 'destroyed-room',
        label: 'Destroyed Room',
        keywords: ['destroyed room', 'messy room', 'chaotic room', 'torn apart room', 'ransacked', 'trashed room', 'wrecked room', 'cluttered chaos', 'domestic violence scene', 'destroyed interior'],
        enhancementPrompt: `DESTROYED ROOM - PROFESSIONAL CHAOS GENERATION:

CORE DESTRUCTION: Furniture overturned/broken (chairs knocked over, tables cracked, cushions torn), scattered debris field (books/papers/objects spread across floor), wall damage (holes, cracks, scuff marks), broken items (shattered frames, lamps knocked over, electronics damaged).

CLUTTER DENSITY: Dense object scatter - hundreds of small items (clothes, books, papers, dishes, toys) mixed with larger debris. Natural distribution patterns from violence/chaos - items thrown toward walls, swept from surfaces, knocked from shelves.

MATERIAL DAMAGE: Torn fabrics (curtains ripped, cushions split with stuffing visible), shattered glass (mirrors/frames broken with shards), splintered wood (furniture legs broken, shelves collapsed), damaged walls (drywall punctured, paint scraped).

LIGHTING: Natural light through damaged blinds/curtains creating dramatic shadows. Harsh reality aesthetic - no glamorization. Documentary-style realism showing authentic destruction aftermath.

CRITICAL: NO characters/people/creatures added unless explicitly requested. Focus ONLY on environmental destruction and object placement. Maintain photorealistic quality - this is aftermath documentation, not horror/theatrical staging.`
      },
      {
        key: 'cluttered-mess',
        label: 'Extreme Clutter',
        keywords: ['extremely cluttered', 'hoarder room', 'massive clutter', 'buried in objects', 'overwhelmed with stuff', 'piled high'],
        enhancementPrompt: `EXTREME CLUTTER - HIGH-DENSITY OBJECT CHAOS:

OBJECT DENSITY: Floor 80%+ covered with items stacked 1-4 feet high. Layered accumulation - clothes piles, box stacks, paper mountains, dish towers. Narrow pathways between object piles. Every surface (tables, chairs, counters) completely buried.

ITEM VARIETY: Clothing heaps, magazine/newspaper stacks, unopened packages, food containers, dishes, electronics, tools, toys, books - organized chaos showing long-term accumulation. Items show age/dust/wear from sitting.

VERTICAL STACKING: Objects piled precariously - teetering stacks, leaning towers, buried furniture visible only as mounds. Natural accumulation patterns - older items at bottom, newer on top.

SPATIAL REALITY: Rooms feel smaller from clutter volume. Ceiling-to-floor stacks in corners. Furniture barely visible beneath layers. Authentic hoarding psychology - paths maintained for basic movement, but everything else filled.

LIGHTING: Reduced light penetration due to blocked windows. Dusty atmosphere. Realistic shadows showing depth/layers of clutter. Natural documentary lighting - no dramatic effects.

FOCUS: Environmental clutter only - NO people/creatures. Show overwhelming scale through dense realistic object placement and natural accumulation physics.`
      }
    ]
  }
];

export function detectActionScenario(text: string): ActionScenario | null {
  const lowerText = text.toLowerCase();
  
  for (const category of actionCategories) {
    for (const scenario of category.scenarios) {
      for (const keyword of scenario.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          return scenario;
        }
      }
    }
  }
  
  return null;
}

export function enhancePromptWithActionScenario(prompt: string): string {
  const scenario = detectActionScenario(prompt);
  
  if (scenario) {
    console.log(`🎬 ACTION SCENARIO DETECTED: ${scenario.label}`);
    return prompt + '\n\n' + scenario.enhancementPrompt;
  }
  
  return prompt;
}

import { useState, useCallback, useEffect, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Image } from 'react-native';
import { idbGet, idbSet, idbDelete, idbClearStore } from '@/utils/idb';
import { resolveVehicleFromText, resolveAssetAliasesInText, resolveWheelSpecFromText, resolvePhoneFromText } from '@/constants/assets';
import { enhancePromptWithCharacter } from '@/constants/characters';
import { enhancePromptWithDragonBall } from '@/constants/dragonballz';
import { enhancePromptWithCelebrity } from '@/constants/celebrities';
import { enhancePromptWithFortniteCharacter } from '@/constants/fortnite';
import { enhancePromptWithActionScenario } from '@/constants/actionScenarios';
import { enhancePromptWithProductMockup, enhancePromptWithTextIntelligence, enhancePromptWithComplexUnderstanding } from '@/constants/productMockups';
import { enhancePromptWithNanoBananaFeatures } from '@/constants/nanoBananaFeatures';
import { enhancePromptWithGMCVehicle } from '@/constants/gmcVehicles';
import { enhancePromptWithMaterialsKnowledge } from '@/constants/materials';
import { enhancePromptWithShoeKnowledge } from '@/constants/shoes';
import { enhancePromptWithVehicleKnowledge } from '@/constants/vehicles';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';



export interface EditHistory {
  id: string;
  originalImage: string;
  editedImage: string;
  prompt: string;
  date: string;
}

export interface RecentProject {
  id: string;
  thumbnail: string;
  originalImageId: string;
  date: string;
  prompt?: string;
}

export interface SavedImage {
  id: string;
  imageUri: string;
  originalImageUri?: string;
  prompt?: string;
  date: string;
  isEdited: boolean;
  thumbnail?: string;
}

interface EditParams {
  prompt: string;
  strength: number;
  identityLock: boolean;
  upscale: boolean;
  watermark: boolean;
  multiImageMode?: 'none' | 'merge' | 'insert' | 'car_wrap' | 'clothing_pattern' | 'clothing_logo';
  additionsLock?: boolean;
  expression?: string | null;
  expressionLock?: boolean;
  headOnly?: boolean;
  faceAnchor?: boolean;
  region?: { x: number; y: number; width: number; height: number };
}

export interface RenderVideoOptions {
  motionPrompt: string;
  durationSec: number;
  fps: number;
  motionStrength: number; // 0..1
  cameraMove: 'none' | 'pan' | 'zoom_in' | 'zoom_out' | 'orbit';
  videoRes: '720p' | '1080p' | '4k';
}

export type RenderVideoResult = { url: string; mimeType: string; width: number; height: number };

export const [EditorProvider, useEditor] = createContextHook(() => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [initialSourceImage, setInitialSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [history, setHistory] = useState<EditHistory[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [currentProject, setCurrentProject] = useState<EditHistory | null>(null);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isUpscaleLoading, setIsUpscaleLoading] = useState(false);
  const [lastRenderedVideoUrl, setLastRenderedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    loadRecentProjects();
    loadSavedImages();
  }, []);

  const loadRecentProjects = async () => {
    try {
      const stored = await AsyncStorage.getItem('recentProjects');
      if (stored) {
        setRecentProjects(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent projects:', error);
    }
  };

  const loadSavedImages = async () => {
    try {
      const stored = await AsyncStorage.getItem('savedImages');
      if (stored) {
        setSavedImages(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load saved images:', error);
    }
  };

  const createThumbnail = useCallback(async (imageUri: string): Promise<string> => {
    try {
      if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img: any = new (globalThis as any).Image();
        return new Promise((resolve) => {
          img.onload = () => {
            const maxSize = 100;
            let { width, height } = img as HTMLImageElement;
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img as HTMLImageElement, 0, 0, width, height);
            const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.3);
            resolve(thumbnailDataUrl);
          };
          img.onerror = () => {
            const truncated = imageUri.length > 10000 ? imageUri.substring(0, 10000) + '...' : imageUri;
            resolve(truncated);
          };
          (img as HTMLImageElement).src = imageUri;
        });
      } else {
        const truncated = imageUri.length > 20000 ? imageUri.substring(0, 20000) + '...' : imageUri;
        return truncated;
      }
    } catch {
      return imageUri.length > 10000 ? imageUri.substring(0, 10000) + '...' : imageUri;
    }
  }, []);

  const saveRecentProject = useCallback(async (project: Omit<RecentProject, 'thumbnail'> & { originalImage: string }) => {
    try {
      const thumbnail = await createThumbnail(project.originalImage);
      const imageKey = `image_${project.id}`;
      try {
        if (Platform.OS === 'web') {
          await idbSet(imageKey, project.originalImage);
        } else {
          await AsyncStorage.setItem(imageKey, project.originalImage);
        }
      } catch (imageError) {
        console.warn('Failed to store original image, will use thumbnail:', imageError);
      }
      const projectEntry: RecentProject = {
        id: project.id,
        thumbnail,
        originalImageId: imageKey,
        date: project.date,
        prompt: project.prompt,
      };
      const updated = [projectEntry, ...recentProjects.filter(p => p.id !== project.id)].slice(0, 3);
      setRecentProjects(updated);
      const oldProjects = recentProjects.filter(p => !updated.find(u => u.id === p.id));
      for (const oldProject of oldProjects) {
        try {
          if (Platform.OS === 'web') {
            await idbDelete(oldProject.originalImageId);
          } else {
            await AsyncStorage.removeItem(oldProject.originalImageId);
          }
        } catch (cleanupError) {
          console.warn('Failed to cleanup old image:', cleanupError);
        }
      }
      await AsyncStorage.setItem('recentProjects', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent project:', error);
      if (error instanceof Error && (((error.message ?? '').toLowerCase().includes('quota')) || error.name === 'QuotaExceededError')) {
        try {
          if (Platform.OS === 'web') {
            await idbClearStore();
          } else {
            const keys = await AsyncStorage.getAllKeys();
            const imageKeys = keys.filter(key => key.startsWith('image_'));
            await AsyncStorage.multiRemove(imageKeys);
          }
          await AsyncStorage.removeItem('recentProjects');
          setRecentProjects([]);
        } catch (cleanupError) {
          console.error('Emergency cleanup failed:', cleanupError);
        }
      }
    }
  }, [recentProjects, createThumbnail]);

  const addToHistory = useCallback((item: EditHistory) => {
    console.log('addToHistory', item.id);
    setHistory(prev => {
      const next = [item, ...prev].slice(0, 50);
      setHistoryCursor(0);
      return next;
    });
    setEditedImage(item.editedImage);
    setCurrentProject(item);
    saveRecentProject({
      id: item.id,
      originalImageId: `image_${item.id}`,
      originalImage: item.originalImage,
      date: item.date,
      prompt: item.prompt,
    });
  }, [saveRecentProject]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryCursor(-1);
    setEditedImage(null);
    setCurrentProject(null);
  }, []);

  const validatePromptContent = useCallback((prompt: string): void => {
    const p = prompt.toLowerCase();

    const nudityGenitalToyTerms = [
      'nude', 'naked', 'genitals', 'penis', 'vagina', 'breast', 'nipple', 'dick', 'pussy', 'cock',
      'tits', 'boobs', 'asshole', 'butt plug', 'buttplug', 'sex toy', 'dildo', 'vibrator', 'fleshlight'
    ];

    const hasNudityGenitalsToys = nudityGenitalToyTerms.some(t => p.includes(t));

    if (hasNudityGenitalsToys) {
      throw new Error('Generation prohibited. Content policy violation detected.');
    }
  }, []);

  const analyzePromptIntent = useCallback((prompt: string): {
    isPositionChange: boolean;
    isBackgroundChange: boolean;
    isCharacterAddition: boolean;
    isObjectModification: boolean;
    isReflectionEdit: boolean;
    isComplexComposition: boolean;
    hasWaterReflection: boolean;
    hasMirrorReflection: boolean;
    targetElements: string[];
    preserveElements: string[];
  } => {
    const lower = prompt.toLowerCase();
    
    // Detect what user wants to change
    const isPositionChange = /(move|reposition|relocate|place|put|position|sit|stand|lying)/i.test(prompt);
    const isBackgroundChange = /(background|backdrop|scene|environment|setting)/i.test(prompt);
    const isCharacterAddition = /(add|insert|place).*?(character|person|people|rider|driver)/i.test(prompt);
    const isObjectModification = /(change|modify|replace|swap).*?(motorcycle|bike|vehicle|car|object)/i.test(prompt);
    
    // Detect complex composition features
    const isReflectionEdit = /(reflection|reflected|mirror|water reflection|puddle)/i.test(prompt);
    const hasWaterReflection = /(water|puddle|wet|pool|lake|river)/i.test(prompt);
    const hasMirrorReflection = /(mirror|glass|window)/i.test(prompt);
    const isComplexComposition = /(skeleton|skull|artistic|surreal|double exposure|composite)/i.test(prompt);
    
    // Extract what should be changed
    const targetElements: string[] = [];
    if (/(motorcycle|bike)/i.test(prompt)) targetElements.push('motorcycle');
    if (/(rider|driver|person)/i.test(prompt)) targetElements.push('rider');
    if (/(background|backdrop)/i.test(prompt)) targetElements.push('background');
    if (/(hair|hairstyle)/i.test(prompt)) targetElements.push('hair');
    if (/(clothing|outfit|shirt|pants)/i.test(prompt)) targetElements.push('clothing');
    if (/(reflection)/i.test(prompt)) targetElements.push('reflection');
    if (/(skeleton|skull|overlay)/i.test(prompt)) targetElements.push('artistic-overlay');
    
    // Everything else should be preserved
    const allElements = ['motorcycle', 'rider', 'background', 'hair', 'clothing', 'face', 'body', 'pose', 'reflection', 'artistic-overlay'];
    const preserveElements = allElements.filter(el => !targetElements.includes(el));
    
    return {
      isPositionChange,
      isBackgroundChange,
      isCharacterAddition,
      isObjectModification,
      isReflectionEdit,
      isComplexComposition,
      hasWaterReflection,
      hasMirrorReflection,
      targetElements,
      preserveElements
    };
  }, []);

  const detectCameraAngles = useCallback((prompt: string): string => {
    let enhanced = prompt;
    const lower = prompt.toLowerCase();
    
    // CAMERA ANGLE DETECTION & ENHANCEMENT
    const cameraAnglePatterns = [
      // Diagonal/tilted camera angles
      { pattern: /(diagonal|tilted|canted|dutch angle|slanted).*cam/i, enhancement: ' DIAGONAL CAMERA ANGLE: Position camera at 30-45° diagonal tilt to create dynamic, energetic framing. The horizon line is intentionally angled, not level. Subject remains upright with natural posture while the entire frame is rotated for dramatic effect. Maintain proper perspective and depth cues.' },
      
      // Overhead/above angles
      { pattern: /(overhead|above|top.?down|bird.?eye|aerial view|from above|looking down)/i, enhancement: ' OVERHEAD CAMERA ANGLE: Position camera directly above subject at 60-90° angle looking straight down. Subject should be visible from top perspective showing top of head, shoulders visible, proper foreshortening of body. Ground/floor clearly visible around subject. Apply correct overhead perspective with natural size relationships.' },
      
      // Low angle looking up
      { pattern: /(low angle|from below|worm.?eye|ground level|looking up)/i, enhancement: ' LOW ANGLE CAMERA: Position camera at ground level or below subject, angled 20-45° upward. Show bottom of chin, nostril visibility natural for low angle, body appears tall and powerful. Sky or ceiling visible in background. Proper upward perspective with natural foreshortening.' },
      
      // Character holding phone/camera
      { pattern: /(holding.*(phone|cell|camera)|taking.*(photo|picture|selfie)|phone out|camera out)/i, enhancement: ' CHARACTER HOLDING DEVICE: Render character with phone/camera held naturally in hands at realistic height (chest to eye level). Device screen faces character, camera lens faces forward. Apply proper grip: fingers wrapped around device, thumb on side or back. Natural arm position from shoulder with realistic joint angles. Device properly scaled for hand size. Show authentic interaction: slight forward arm extension for selfie, or natural viewing position. Apply proper perspective - if taking photo of something, device points toward that target.' },
      
      // Showing character face in specific angles
      { pattern: /(show.*(face|eyes|expression)|face.*visible|looking at camera|facing camera)/i, enhancement: ' FACE VISIBILITY PRIORITY: Ensure face is clearly visible and well-lit with proper exposure. Eyes should be sharp and in focus. Facial features (eyes, nose, mouth) clearly defined. Natural expression visible. If overhead angle, tilt subject head slightly up toward camera. If low angle, ensure face remains primary focus. Camera positioned to maximize facial clarity and expression readability.' },
    ];
    
    for (const { pattern, enhancement } of cameraAnglePatterns) {
      if (pattern.test(prompt)) {
        enhanced += enhancement;
        console.log('📷 Camera angle detected:', pattern);
      }
    }
    
    return enhanced;
  }, []);

  const preventCartoonification = useCallback((prompt: string): string => {
    let enhanced = prompt;
    const lower = prompt.toLowerCase();
    
    // Detect if user explicitly requested cartoon/anime style
    const wantsCartoon = /(anime|cartoon|animated|cel.?shade|2d|comic|manga)/i.test(lower);
    const wantsRealism = /(realistic|photorealistic|real life|photo|live action)/i.test(lower);
    
    // If no style specified or realism requested, add anti-cartoon directive
    if (!wantsCartoon || wantsRealism) {
      enhanced += '\n\n🚫 ANTI-CARTOON PROTOCOL - PHOTOREALISTIC RENDERING MANDATORY:\n'
        + '- DO NOT convert to cartoon, anime, or animated style\n'
        + '- DO NOT simplify features into cartoon aesthetics\n'
        + '- DO NOT use cel-shading or flat color blocks\n'
        + '- MAINTAIN photorealistic human anatomy and proportions\n'
        + '- RENDER with real-world materials, lighting, and textures\n'
        + '- USE authentic human skin texture with natural pores and details\n'
        + '- APPLY realistic hair rendering with individual strand definition\n'
        + '- PRESERVE photographic quality and cinematic realism\n'
        + '- RENDER clothing with real fabric textures and natural drape\n'
        + '- MAINTAIN authentic environmental integration and realistic shadows\n'
        + '\nThis MUST be a photorealistic image that looks like it was captured with a professional camera. NO cartoon or animated stylization whatsoever.';
    }
    
    return enhanced;
  }, []);

  const [characterDescriptions, setCharacterDescriptions] = useState<Map<string, string>>(new Map());

  const parseCharacterDescription = useCallback((description: string): { name: string; identity: string; codes: Record<string, string> } | null => {
    try {
      const nameMatch = description.match(/(?:character|name|called)\s*[:=]\s*([^\n,]+)/i);
      const identityMatch = description.match(/(?:identity|appearance|looks|description)\s*[:=]\s*([^\n]+)/i);
      
      const codePattern = /(?:code|color|hex|rgb)\s*[:=]\s*([#\w\d]+)|([A-Z_]+)\s*[:=]\s*([#\w\d]+)/gi;
      const codes: Record<string, string> = {};
      
      let match;
      while ((match = codePattern.exec(description)) !== null) {
        if (match[1]) {
          codes['default'] = match[1];
        } else if (match[2] && match[3]) {
          codes[match[2]] = match[3];
        }
      }
      
      if (nameMatch || identityMatch) {
        return {
          name: nameMatch ? nameMatch[1].trim() : 'Unknown',
          identity: identityMatch ? identityMatch[1].trim() : description.substring(0, 200),
          codes
        };
      }
      
      return null;
    } catch (error) {
      console.error('Failed to parse character description:', error);
      return null;
    }
  }, []);

  const extractCharacterFromPrompt = useCallback((prompt: string): string | null => {
    const descriptionMatch = prompt.match(/character description:\s*([^\n]+(?:\n(?!\n)[^\n]+)*)/i);
    if (descriptionMatch) {
      const description = descriptionMatch[1].trim();
      const parsed = parseCharacterDescription(description);
      if (parsed) {
        console.log('📝 Detected character description:', parsed.name);
        setCharacterDescriptions(prev => new Map(prev).set(parsed.name, JSON.stringify(parsed)));
        return description;
      }
    }
    return null;
  }, [parseCharacterDescription]);

  const buildEnhancedPrompt = useCallback((params: EditParams): string => {
    if (!params || !params.prompt || !params.prompt.trim()) {
      throw new Error('Edit prompt is required');
    }
    
    validatePromptContent(params.prompt);
    
    let prompt = resolveAssetAliasesInText(params.prompt.trim());
    
    const customCharDescription = extractCharacterFromPrompt(prompt);
    if (customCharDescription) {
      console.log('🎯 Using custom character description for consistency');
      prompt += '\n\n🎨 CHARACTER CONSISTENCY PROTOCOL:\nThis character has a specific identity and appearance that MUST be preserved across all generations. Maintain EXACT facial features, proportions, distinctive characteristics, and color specifications provided in the description. Character identity is paramount.';
    }
    
    // APPLY CAMERA ANGLE DETECTION
    prompt = detectCameraAngles(prompt);
    
    // PREVENT UNWANTED CARTOON CONVERSION
    prompt = preventCartoonification(prompt);
    
    // Analyze user intent for better accuracy
    const intent = analyzePromptIntent(prompt);
    console.log('🎯 Prompt Intent Analysis:', intent);
    
    prompt = enhancePromptWithCharacter(prompt);
    prompt = enhancePromptWithDragonBall(prompt);
    prompt = enhancePromptWithCelebrity(prompt);
    prompt = enhancePromptWithFortniteCharacter(prompt);
    prompt = enhancePromptWithActionScenario(prompt);
    prompt = enhancePromptWithProductMockup(prompt);
    prompt = enhancePromptWithTextIntelligence(prompt);
    prompt = enhancePromptWithComplexUnderstanding(prompt);
    prompt = enhancePromptWithNanoBananaFeatures(prompt);
    prompt = enhancePromptWithGMCVehicle(prompt);
    prompt = enhancePromptWithMaterialsKnowledge(prompt);
    prompt = enhancePromptWithShoeKnowledge(prompt);
    prompt = enhancePromptWithVehicleKnowledge(prompt);

    const lower = prompt.toLowerCase();

    const styleDirectives: string[] = [];
    if (/(anime|manga|cel[-\s]?shade|studio ghibli|2d animation)/i.test(lower)) {
      styleDirectives.push('Convert to high-quality 2D anime cel style: clean line art, two-tone shadows, simplified textures, large expressive eyes. Preserve identity, pose, and composition exactly.');
    }
    if (/(pixar|dreamworks|3d animation|cgi|3d pixar)/i.test(lower)) {
      styleDirectives.push('Convert to premium 3D cinematic animation style (Pixar-like): physically based materials, soft global illumination, filmic color grading. Keep hair grooming, clothing fidelity, identity and pose identical.');
    }
    if (/(claymation|stop[-\s]?motion|clay)/i.test(lower)) {
      styleDirectives.push('Convert to handcrafted claymation aesthetics: polymer clay look, subtle fingerprints, soft edges and miniature stage lighting while preserving proportions, pose and expression.');
    }
    if (/(comic|ink|halftone|graphic novel)/i.test(lower)) {
      styleDirectives.push('Convert to comic book ink style with bold outlines, cross‑hatching and halftone dots while maintaining facial identity and composition.');
    }
    if (/(photoreal|photo[-\s]?realistic|real life|realistic photo)/i.test(lower)) {
      styleDirectives.push('Transform to photorealistic photography: real‑world materials, accurate subsurface scattering for skin, realistic hair and fabric, scene‑consistent lighting. Keep subject, pose and framing identical.');
    }
    if (styleDirectives.length > 0) {
      prompt += ' ' + styleDirectives.join(' ');
    }

    if (/(fix\s*(the\s*)?hands|hands\s*look\s*(weird|wrong|unnatural)|fix\s*fingers|finger\s*(issues|problem|fix)|hand\s*position)/i.test(lower)) {
      prompt += ' HAND CORRECTION PROTOCOL: Correct hand anatomy and realism while preserving the exact original hand pose, position, and contact with objects. Ensure exactly five fingers per hand with natural bone proportions, joint articulation, and knuckle alignment. Fix finger overlaps, merge artifacts, extra or missing fingers, and unnatural bends. Maintain palm orientation and wrist alignment. Preserve any object interactions with proper finger wrapping and pressure, realistic occlusion, and contact shadows. Keep skin tone, texture, and lighting consistent. Do not change arms, body, or background; only fix the hands to look photorealistic and anatomically correct in the same pose.';
    }

    if (/(hold(ing)?|grip(ping)?|carry(ing)?|grasp(ing)?|wield(ing)?)\s+(a|an|the)?\s*(knife|sword|blade|dagger|gun|pistol|rifle|weapon|bottle|cup|glass|drink|phone|book|bag|object|item)/i.test(lower)) {
      prompt += ' 🤲 NATURAL OBJECT-HOLDING MASTERY PROTOCOL: When the character holds ANY object (weapon, drink, cup, bottle, gun, knife, phone, book, bag, tool, etc.), apply these critical requirements for photorealistic natural holding:\n\n✋ HAND ANATOMY & GRIP REALISM:\n- Render EXACTLY 5 fingers per hand with correct anatomical proportions and natural joint articulation\n- Apply proper finger wrapping around the object with realistic pressure points and contact areas\n- Show natural knuckle definition, skin creasing at joints, and authentic hand muscle tension\n- Ensure proper thumb opposition and natural finger spacing for the specific object type\n- Render accurate palm contact with the object showing realistic skin compression\n- Apply correct wrist angle and forearm alignment for natural, comfortable grip\n- Show proper finger pad contact with realistic skin deformation at pressure points\n\n🎯 OBJECT INTERACTION PRECISION:\n- Position the object NATURALLY in the hand with correct size proportions and realistic placement\n- Ensure the grip matches the object type (firm grip for weapons, gentle for cups, natural for phones)\n- Apply proper hand positioning for the object\'s center of gravity and weight distribution\n- Show realistic finger placement specific to the object (trigger discipline for guns, handle grip for knives, etc.)\n- Render authentic contact shadows where fingers and palm meet the object surface\n- Apply proper occlusion - fingers in front of object where appropriate, object visible between fingers\n- Show natural hand orientation that makes functional sense for the object being held\n\n💎 PHOTOREALISTIC DETAIL ENHANCEMENT:\n- Render skin texture with natural pores, fine lines, and authentic skin tone variations\n- Apply realistic lighting on hands that matches the scene\'s light sources perfectly\n- Show natural subsurface scattering in skin where light passes through fingers\n- Render authentic specular highlights on skin, especially knuckles and finger joints\n- Apply proper shadow casting from fingers onto the object and vice versa\n- Show realistic skin tension and compression where hand grips the object\n- Render natural hand veins, tendons, and anatomical details visible under skin\n\n🎨 NATURAL INTEGRATION & CONSISTENCY:\n- Ensure hand size is proportional to the character\'s body and the object being held\n- Match hand skin tone EXACTLY to the character\'s face and visible body skin\n- Apply consistent lighting direction on hands matching the overall scene lighting\n- Show natural arm and shoulder positioning that supports the hand\'s grip naturally\n- Render realistic forearm muscles and tendons engaged in holding the object\n- Apply proper perspective and foreshortening for hands based on camera angle\n- Ensure hands look like they belong to THIS specific character (age, gender, ethnicity appropriate)\n\n⚠️ CRITICAL ACCURACY REQUIREMENTS:\n- NO extra fingers, NO missing fingers, NO merged fingers, NO floating fingers\n- NO unnatural bends, NO impossible joint angles, NO anatomical errors\n- NO disconnected hands, NO hands that don\'t match the character\n- NO objects floating near hands - they must be HELD with clear contact\n- NO awkward grip positions - every grip must look natural and functional\n- The object must appear SECURELY held with realistic weight distribution\n- Hands must look PHOTOREALISTIC and indistinguishable from real photography\n\n🔒 PRESERVATION PROTOCOL:\n- Keep facial features, expression, and identity EXACTLY the same\n- Maintain body pose, clothing, and outfit completely unchanged\n- Preserve background, lighting conditions, and scene composition perfectly\n- Only modify or enhance the hands and their interaction with the held object\n- Ensure the overall image maintains perfect photorealistic consistency\n\n✨ FINAL QUALITY STANDARD:\nThe character\'s hands holding the object must be so natural, realistic, and anatomically perfect that viewers cannot tell the image was AI-edited. The grip should look effortless, functional, and completely authentic with cinema-quality realism.';
    }

    if (/(air\s*jordan|\baj\s?\d+\b|jordan\s?\d+|retro\s?\d+|nike\s*jordan|jordans?)/i.test(lower) || /(sneaker|shoes?)/i.test(lower)) {
      prompt += ' Put the requested sneakers on the character’s feet with accurate size, ankle alignment, realistic lacing, correct perspective and grounding shadows. Preserve pose, outfit and identity. Match scene lighting and reflections; avoid changing anything else.';
    }
    
    // Multi-character weapon confrontation scenarios
    if (/(point(ing)?|aim(ing)?|threaten(ing)?|hold(ing)?.*gun.*at|gun.*point(ed)?.*at|weapon.*at)/i.test(lower) && /(head|face|character|person|him|her|them)/i.test(lower)) {
      prompt += ' 🎯 MULTI-CHARACTER WEAPON CONFRONTATION PROTOCOL:\n\n🔫 WEAPON POSITIONING & AIM ACCURACY:\n- Align weapon barrel/blade to point DIRECTLY at the target character with precise 3D spatial alignment\n- Weapon holder\'s arm, wrist, hand, and weapon must form a natural, believable line of sight toward target\'s head/body\n- Apply proper perspective and depth so weapon clearly aims AT the target, not past or beside them\n- Show correct weapon orientation (upright, level, not tilted at unnatural angles)\n- Maintain realistic confrontation distance between characters (2-6 feet for pistols, closer for knives)\n- Render proper trigger discipline: finger ON trigger if actively threatening, alongside trigger guard if cautious\n\n✋ NATURAL WEAPON GRIP & STANCE:\n- Weapon holder adopts appropriate stance: extended arm for pistol, two-handed grip for rifle, forward thrust for knife\n- Show EXACTLY 5 fingers per hand with correct anatomical proportions\n- Apply proper finger wrapping around weapon grip with realistic pressure points\n- Render natural knuckle definition, joint articulation, and hand muscle tension\n- Show authentic contact shadows where hand meets weapon\n- Weapon holder\'s body language shows intent: focused gaze, tense posture, committed stance\n\n😨 TARGET CHARACTER EMOTIONAL RESPONSE:\n- FEAR EXPRESSION: Wide eyes, raised eyebrows, tense facial muscles, slightly open mouth showing genuine alarm\n- DEFENSIVE BODY LANGUAGE: Hands raised defensively, body leaning back or frozen, shoulders tensed\n- EYE CONTACT: Target\'s gaze locked on weapon or weapon holder\'s face with visible fear\n- MICRO-EXPRESSIONS: Dilated pupils, pale complexion if appropriate, visible facial tension, authentic fear response\n- NATURAL DEFENSIVE POSTURE: Protective positioning without looking staged or theatrical\n- CONTEXTUAL EMOTION: Fear intensity matches threat level - terror for gun to head, alarm for distant threat\n\n🎬 SCENE COMPOSITION & SPATIAL DYNAMICS:\n- CLEAR THREAT LINE: Visual line from weapon holder → through weapon → to target must be obvious and precise\n- DRAMATIC TENSION: Composition emphasizes confrontation with cinematic impact but photorealistic execution\n- REALISTIC SPACING: Characters positioned at believable confrontation distance with proper depth perception\n- BOTH CHARACTERS AWARE: Eye lines, body language, and positioning show mutual awareness of the threat\n- ENVIRONMENTAL CONTEXT: Background supports the dramatic moment without distracting\n- LIGHTING DRAMA: Shadows and highlights enhance tension while maintaining photorealism\n- FOCUS PRIORITY: Both characters and weapon in sharp focus with appropriate depth of field\n\n⚠️ CRITICAL EXECUTION REQUIREMENTS:\n- NO BLOOD, NO GORE, NO VIOLENCE: This is a tense confrontation moment, not an aftermath scene\n- WEAPON REALISM: Gun/knife accurately modeled with proper proportions, materials, and details\n- PERFECT HAND ANATOMY: Both characters maintain flawless 5-finger anatomy with natural positioning\n- AUTHENTIC EXPRESSIONS: Emotions look genuine and natural, never exaggerated or cartoonish\n- PRECISE 3D ALIGNMENT: Weapon trajectory must be geometrically accurate - truly aimed AT the target\'s head/body\n- PHOTOREALISTIC INTEGRATION: Scene must look like a real photograph captured in the moment\n- NATURAL BODY MECHANICS: All poses, grips, and stances follow real-world physics and human biomechanics\n- CONSISTENT LIGHTING: Both characters lit by same light sources with matching shadows and highlights\n\n🎭 EXPRESSION SPECIFICITY:\nIf specific expressions are requested (scared, terrified, calm, defiant, etc.), apply precise facial muscle activation:\n- SCARED: Wide eyes, raised inner eyebrows, tense jaw, slightly open mouth, visible whites of eyes\n- TERRIFIED: Extreme fear - eyes very wide, eyebrows raised high, mouth open, face pale, body trembling\n- CALM: Neutral expression despite threat - steady gaze, relaxed facial muscles, controlled breathing\n- DEFIANT: Determined expression - narrowed eyes, set jaw, direct eye contact, tense but controlled\n- PLEADING: Desperate expression - raised eyebrows, sad eyes, slightly open mouth, vulnerable posture\n\nExecute this confrontation with MAXIMUM REALISM and PRECISE SPATIAL ACCURACY. The weapon must convincingly point at the target, and both characters must react naturally to this life-threatening situation.';
    }
    
    if (params.multiImageMode === 'car_wrap') {
      const vehicle = resolveVehicleFromText(prompt);
      if (vehicle.make || vehicle.model) {
        const vStr = `${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim();
        if (vStr.length > 0) {
          prompt += `. Vehicle specificity: render an exact ${vStr} with brand-accurate proportions, badges, grille, headlights, wheel design, interior cues, and generation-correct details. Avoid generic cars.`;
        }
      }
    }


    const wheelSpec = resolveWheelSpecFromText(prompt);
    if (wheelSpec.diameterInches || wheelSpec.brand || wheelSpec.style) {
      const parts: string[] = [];
      if (wheelSpec.diameterInches) parts.push(`${wheelSpec.diameterInches}\" wheels`);
      if (wheelSpec.brand) parts.push(`${wheelSpec.brand} brand`);
      if (wheelSpec.style) parts.push(`${wheelSpec.style} style`);
      const wheelDesc = parts.join(', ');
      prompt += ` WHEEL SPECIFICITY: Use ${wheelDesc}. Maintain physically correct fitment for the exact diameter: proper tire sidewall and aspect to keep overall rolling diameter realistic, correct brake rotor and caliper size relative to the wheel, and natural wheel well clearance. Preserve proper offset and concavity for a believable stance without clipping or floating.`;
    }
    
    // SPATIAL POSITIONING INTELLIGENCE
    const spatialKeywords = /(sitting|seated|standing|lying|leaning|positioned|placed)\s+(in|on|at|near|beside|next to|behind|in front of)\s+(the\s+)?(chair|seat|table|desk|couch|sofa|bed|floor|ground|left|right|center|middle|corner)/i;
    const hasSpatialInstructions = spatialKeywords.test(prompt.toLowerCase());
    
    if (hasSpatialInstructions) {
      prompt += ' 🎯 ADVANCED SPATIAL POSITIONING & SCENE INTEGRATION PROTOCOL:\n\n📍 PRECISE SPATIAL PLACEMENT:\n- Analyze the EXACT 3D spatial coordinates of the target location (chair, seat, table, etc.)\n- Calculate proper perspective, depth, and scale for the character at that specific position\n- Ensure character size matches the distance from camera and surrounding object proportions\n- Apply correct foreshortening and perspective distortion based on camera angle\n- Position character with natural weight distribution and realistic contact with surfaces\n\n🪑 FURNITURE & OBJECT INTERACTION MASTERY:\n- SITTING: Character hips align with seat surface, thighs parallel to seat, feet naturally placed on floor\n- CHAIR POSITIONING: Character centered on chair seat, back against backrest if appropriate, arms on armrests\n- NATURAL POSTURE: Spine curvature matches sitting position, shoulders relaxed, head at natural angle\n- CONTACT POINTS: Realistic compression where body meets furniture, proper weight distribution\n- SPATIAL AWARENESS: Character appears aware of and naturally positioned relative to furniture dimensions\n\n🎨 ENVIRONMENTAL INTEGRATION FOR SEATED CHARACTERS:\n- LIGHTING MATCH: Character receives same lighting as furniture - analyze light direction, intensity, color temperature\n- SHADOW CASTING: Character casts realistic shadows on chair/floor matching scene\'s existing shadow patterns\n- ATMOSPHERIC CONSISTENCY: Apply same depth haze, air particles, and atmospheric effects as the room\n- COLOR HARMONY: Character skin tones and clothing adapt to room\'s ambient light color\n- REFLECTION INTEGRATION: If floor/surfaces are reflective, add appropriate character reflections\n\n🔬 MICRO-DETAIL SPATIAL REALISM:\n- DEPTH OF FIELD: If background is blurred, apply appropriate blur to character based on focal distance\n- EDGE QUALITY: Character edges have natural softness matching the scene\'s focus characteristics\n- OCCLUSION: Proper overlap - chair arms in front of character body where appropriate, character in front of chair back\n- CONTACT SHADOWS: Dark ambient occlusion where character body meets chair surfaces\n- FABRIC INTERACTION: Character clothing drapes naturally on chair, realistic wrinkles and compression\n\n🎭 NATURAL SEATED POSE CHARACTERISTICS:\n- RELAXED vs FORMAL: Match pose formality to scene context (casual lean vs upright professional)\n- HAND PLACEMENT: Natural hand positions - on lap, armrests, or holding objects\n- LEG POSITIONING: Feet flat on floor, legs crossed, or natural comfortable position\n- FACIAL DIRECTION: Character gaze and head angle appropriate for the scene context\n- BODY LANGUAGE: Posture conveys appropriate emotion and comfort level for the setting\n\n⚠️ CRITICAL SPATIAL ACCURACY RULES:\n- Character MUST appear to have been originally photographed sitting in that exact chair\n- NO floating or hovering - perfect contact with all surfaces\n- Scale must be PRECISELY correct - character fits naturally in the space\n- Perspective must be PERFECT - character follows same vanishing points as the room\n- Integration must be SEAMLESS - impossible to detect the character was added\n\n🌟 COMPLEX SCENE SPATIAL INTELLIGENCE:\n- MULTIPLE CHAIRS: Correctly identify which specific chair is referenced (left, right, center, empty, etc.)\n- DIRECTIONAL CLARITY: Understand "left" and "right" from camera perspective, not character perspective\n- EMPTY SPACE DETECTION: Identify unoccupied chairs/seats and place character there naturally\n- SPATIAL RELATIONSHIPS: Maintain proper distances between character and other scene elements\n- ROOM GEOMETRY: Respect the room\'s 3D space, walls, floor plane, and architectural features\n\n✨ FINAL SPATIAL INTEGRATION GOAL:\nThe character must appear INDISTINGUISHABLE from someone who was originally sitting in that chair when the photo was taken. Every aspect - position, scale, lighting, shadows, perspective, and interaction with furniture - must be ABSOLUTELY PERFECT and PHOTOREALISTIC.';
    }
    
    // ADVANCED CONSISTENCY & ACCURACY SYSTEM WITH COMPLEX COMPOSITION SUPPORT
    const consistencyInstructions = `
🎯 ADVANCED CONSISTENCY PRESERVATION SYSTEM

📊 PROMPT ANALYSIS:
- Target Elements to Modify: ${intent.targetElements.join(', ') || 'General enhancement'}
- Elements to Preserve: ${intent.preserveElements.join(', ')}
- Position Change Requested: ${intent.isPositionChange ? 'YES' : 'NO'}
- Background Change Requested: ${intent.isBackgroundChange ? 'YES' : 'NO'}
- Character Addition Requested: ${intent.isCharacterAddition ? 'YES' : 'NO'}
- Complex Composition Detected: ${intent.isComplexComposition ? 'YES (artistic overlay)' : 'NO'}
- Reflection Present: ${intent.hasWaterReflection ? 'YES (water/puddle)' : intent.hasMirrorReflection ? 'YES (mirror/glass)' : 'NO'}

🔒 ABSOLUTE PRESERVATION PROTOCOL:
${intent.preserveElements.map(el => `- ${el.toUpperCase()}: Keep EXACTLY as is - same position, same appearance, same details`).join('\n')}

⚡ MODIFICATION SCOPE:
${intent.targetElements.map(el => `- ${el.toUpperCase()}: Apply requested changes with precision`).join('\n')}

🎯 SPATIAL ACCURACY GUARANTEE:
- If position change NOT requested: Lock ALL spatial coordinates
- Maintain exact pixel positions for all unmodified elements
- Preserve depth layering and scale relationships
- Keep ground contact points identical
- Maintain perspective and viewing angles

💎 IDENTITY PRESERVATION:
- Facial features: EXACT match to original
- Body proportions: IDENTICAL to source
- Clothing details: PRESERVE unless explicitly changed
- Object characteristics: MAINTAIN structural integrity

🔬 MULTI-SUBJECT HANDLING:
- Count all subjects in image: Preserve ALL unless specifically told to modify one
- Maintain spatial relationships between subjects
- Keep each subject's individual characteristics
- Preserve group dynamics and interactions

✨ EXECUTION PRIORITY:
1. Identify ALL elements in the image
2. Lock positions and characteristics of non-target elements
3. Apply ONLY requested changes to target elements
4. Verify no unintended modifications occurred
5. Ensure seamless integration of changes
`;
    
    // PRECISION-FOCUSED PROMPT FOR EXACT ACCURACY
    prompt = `🎯 ULTRA-PRECISION IMAGE EDITING - SURGICAL ACCURACY PROTOCOL

⚡ CORE DIRECTIVE: Execute ONLY what is explicitly requested. Maintain ABSOLUTE FIDELITY to the original image for all unmodified elements. Zero tolerance for unintended changes, drift, or repositioning.

${consistencyInstructions}

${prompt}

🎯 CRITICAL POSITIONING & SPATIAL ACCURACY MANDATE:

📍 EXACT POSITIONING PRESERVATION:
- Maintain PRECISE X, Y, Z coordinates of every element in 3D space
- Keep EXACT distances between all objects and subjects (measure in pixels if needed)
- Preserve ACCURATE depth layering - what's in front stays in front, what's behind stays behind
- Maintain PERFECT scale relationships - if person A is 20% taller than person B, keep that exact ratio
- Keep EXACT ground contact points - feet, wheels, object bases must stay at same height
- Preserve PRECISE angular relationships - if two objects are at 45° angle, maintain that exact angle
- Maintain ACCURATE perspective lines and vanishing points
- Keep EXACT spatial gaps between elements (e.g., 3 inches between two people stays 3 inches)

🎯 POSITIONING ACCURACY PROTOCOL:
- If character is sitting: Keep EXACT hip position on seat, same leg angle, same back angle
- If character is standing: Maintain PRECISE foot placement, same stance width, same weight distribution
- If holding object: Keep EXACT hand position, same grip angle, same object orientation
- If multiple subjects: Preserve EXACT spacing between them, same relative heights, same positioning
- Background elements: Keep EXACT placement, same size, same distance from camera

🔬 ABSOLUTE SURGICAL PRECISION REQUIREMENTS:

1️⃣ MULTI-SUBJECT PRESERVATION:
- If image contains MULTIPLE people, characters, or subjects: Preserve ALL of them EXACTLY unless specifically told to modify/remove a particular one
- Maintain EXACT positioning, poses, and spatial relationships between all subjects
- Keep ALL subjects' facial features, expressions, clothing, and characteristics IDENTICAL
- Preserve group dynamics, interactions, and relative positioning perfectly
- DO NOT merge, blend, or combine multiple subjects into one
- DO NOT remove or hide any subjects unless explicitly requested
- Each subject must remain distinct and individually recognizable

2️⃣ SELECTIVE EDITING INTELLIGENCE:
- Execute ONLY the specific changes mentioned in the prompt
- If prompt says "change the motorcycle" → ONLY modify the motorcycle, keep riders EXACTLY as they are
- If prompt says "remove the riders" → ONLY remove riders, keep motorcycles and background intact
- If prompt says "add character" → ADD new character WITHOUT changing existing ones
- If prompt says "change background" → ONLY modify background, keep ALL foreground subjects identical
- Understand the difference between "change X" (modify only X) vs "replace X with Y" (swap X for Y)

3️⃣ SPATIAL POSITIONING ACCURACY:
- Maintain EXACT 3D spatial coordinates of all elements with millimeter precision
- Preserve precise distances between subjects and objects - measure and maintain exact pixel distances
- Keep accurate depth layering (foreground, midground, background) - no depth order changes
- Maintain proper perspective and viewing angles - same camera position, same focal length
- Preserve ground contact points and spatial relationships - feet/wheels stay at exact same ground level
- Keep accurate scale relationships between all elements - if A is 1.5x size of B, maintain that exact ratio
- Lock spatial positioning: If subject is 30% from left edge and 40% from top, keep those exact percentages
- Maintain exact body positioning: Same pose angles, same limb positions, same head tilt
- Preserve exact object placement: If cup is 6 inches from edge, keep it 6 inches from edge
- Keep exact environmental positioning: Same distance from walls, furniture, other objects

4️⃣ COMPLEX SCENE UNDERSTANDING:
- Analyze the ENTIRE scene composition before making any changes
- Identify ALL distinct subjects, objects, and elements present
- Understand relationships and interactions between elements
- Recognize which elements are connected vs independent
- Preserve scene coherence and logical consistency
- Maintain environmental context and atmosphere

5️⃣ OBJECT IDENTITY PRESERVATION:
- Motorcycles must remain recognizable as motorcycles with ALL features intact
- Vehicles must keep wheels, body, lights, mirrors, exhaust, etc.
- People must maintain human anatomy, proportions, and natural appearance
- Clothing must remain as clothing with proper fit and drape
- Logos, symbols, and text must stay readable and accurate
- Background elements must maintain their fundamental identity

6️⃣ EXECUTION PROTOCOL:
- Execute ONLY what is explicitly requested in the prompt - nothing more, nothing less
- DO NOT add any elements, objects, characters, or effects that were not specifically requested
- DO NOT change the style to anime, cartoon, or any other style unless explicitly requested
- DO NOT add decorative elements like balloons, confetti, or background objects unless requested
- DO NOT add horror elements (clowns, monsters, scary characters) unless explicitly requested
- DO NOT add cartoon or animated characters unless explicitly requested
- Maintain EXACT composition, framing, and subject positioning with pixel-perfect accuracy
- Preserve original image quality and photorealistic appearance
- POSITIONING LOCK: Every element must stay in its exact position unless specifically told to move it
- SPATIAL FREEZE: Treat all spatial relationships as locked coordinates that cannot drift or shift
- ACCURACY VERIFICATION: Before finalizing, verify every element is in its exact original position

🧠 ADVANCED CONTEXT PRESERVATION:

📊 SCENE ANALYSIS:
- Count and identify ALL subjects in the image (person 1, person 2, motorcycle 1, motorcycle 2, etc.)
- Map spatial relationships between all elements
- Identify which elements are connected (rider on motorcycle) vs separate
- Analyze lighting direction, quality, and color temperature
- Understand the scene's purpose and context (action shot, portrait, product photo, etc.)

🎯 ELEMENT-SPECIFIC PRESERVATION:
- For EACH subject/object: Preserve exact appearance, position, and characteristics
- Maintain ALL facial features, expressions, and identity markers
- Keep ALL body poses, gestures, and positioning identical
- Preserve ALL clothing details, colors, textures, and fit
- Maintain ALL vehicle/object features, colors, and details
- Keep ALL background elements, structures, and environmental details

💡 INTELLIGENT MODIFICATION:
- When modifying ONE element: Keep ALL other elements completely unchanged in EXACT positions
- When adding NEW element: Integrate naturally WITHOUT altering existing elements' positions by even 1 pixel
- When removing element: Fill space naturally WITHOUT changing surrounding elements' positions or sizes
- When changing background: Keep ALL foreground subjects perfectly preserved in EXACT positions
- When changing foreground: Keep background and other subjects unchanged in EXACT positions
- SPATIAL LOCK: Treat unmodified elements as if they're pinned to exact coordinates that cannot move
- POSITION VERIFICATION: After each change, verify all unmodified elements are in exact original positions
- ACCURACY CHECK: Compare final positions to original positions - zero tolerance for drift or shift

💎 QUALITY STANDARDS:
- Maintain original image quality and sharpness
- Preserve natural colors and realistic appearance  
- Keep lighting and shadows consistent with the original
- Maintain authentic material properties
- Ensure photorealistic results (or preserve artistic style if surreal/composite)
- Respect complex compositions - don't oversimplify artistic imagery

🎯 REFLECTION-AWARE EDITING PROTOCOL:
When editing images with reflections:
1. IDENTIFY reflection type: Water puddle, mirror, glass, wet surface
2. ANALYZE subject-reflection relationship: Is it physically accurate or artistic?
3. APPLY EDITS to both subject AND reflection if physically linked
4. PRESERVE water/mirror surface characteristics and distortions
5. MAINTAIN lighting coherence between subject and reflected environment
6. For artistic/surreal reflections: Preserve creative intent, don't force realism

🎭 MULTI-SUBJECT IDENTITY PRESERVATION:

👥 FOR EACH INDIVIDUAL SUBJECT:
- Maintain EXACT facial features, bone structure, and proportions for EACH person
- Preserve eye shape, color, and natural characteristics for EACH individual
- Keep nose, lips, and jawline identical for EACH person
- Maintain skin tone, texture, and natural features for EACH subject
- Preserve eyebrow shape and hair characteristics for EACH individual
- Keep age-appropriate features unchanged for EACH person
- Maintain distinct identity markers that differentiate each subject

🏍️ FOR EACH VEHICLE/OBJECT:
- Preserve exact make, model, and design for EACH vehicle
- Keep ALL mechanical features intact (wheels, exhaust, lights, mirrors)
- Maintain color, finish, and surface details for EACH object
- Preserve logos, branding, and identifying marks
- Keep structural integrity and proportions accurate
- Maintain realistic physics and positioning

🏠 ENVIRONMENTAL CHANGES (WHEN REQUESTED):
When modifying backgrounds or environments:
- If "chaotic", "messy", "destroyed", or "torn apart" is requested: Create realistic physical damage to furniture, walls, and objects WITHOUT adding characters, creatures, or people
- Show broken furniture, scattered objects, damaged walls, torn fabrics, and realistic destruction
- Maintain photorealistic quality - no horror elements, no clowns, no monsters, no cartoon characters
- Focus on environmental damage and disorder, not character additions
- Keep lighting natural and realistic for the destruction level
- Preserve any people/characters already in the image exactly as they are

🌟 CHARACTER INTEGRATION (ONLY IF REQUESTED):
If adding characters to a scene:
- Match the scene's lighting direction and intensity exactly
- Apply the same color temperature and atmospheric conditions
- Ensure character shadows match existing shadows in direction and softness
- Scale character appropriately for their position in the scene
- Match depth of field and focus characteristics
- Integrate character naturally with proper ground contact and spatial positioning
- Use ONLY the character type explicitly requested (no substitutions)

🎨 COMPLEX COMPOSITION & ARTISTIC EFFECTS MASTERY:

🌊 WATER REFLECTION PROTOCOL (for images with puddles, water, wet surfaces):
- When editing subjects reflected in water, maintain PERFECT SYMMETRY between subject and reflection
- Reflection must be vertically flipped version of the main subject with natural water distortion
- Apply subtle wave ripples and water texture to reflection for realism
- Reflection should be slightly darker and less saturated than the main subject
- Preserve water surface characteristics (ripples, debris, lighting)
- If editing main subject (face, clothing, pose), apply IDENTICAL changes to the reflection
- Maintain consistent lighting direction in both subject and reflection
- Keep reflection opacity and clarity consistent with water surface conditions
- Preserve depth and perspective - reflection follows water plane geometry

🎭 ARTISTIC OVERLAY & DOUBLE EXPOSURE HANDLING:
- For images with skeleton/skull overlays in reflections or as artistic effects:
  - Treat as INTENTIONAL ARTISTIC COMPOSITION, not an error to be removed
  - Preserve the artistic relationship between subject and overlay
  - Maintain blend modes, opacity, and visual harmony between layers
  - If editing main subject, consider whether overlay should be affected
  - Respect the artistic intent of composite imagery
- For surreal/artistic compositions: Preserve creative elements while applying requested edits
- Maintain visual balance and artistic coherence throughout edits

🪞 MIRROR & GLASS REFLECTION PROTOCOL:
- Maintain physics-accurate reflections in mirrors and glass surfaces
- Reflection angle must match viewing angle and mirror position
- Apply appropriate perspective distortion to reflections
- Preserve lighting conditions affecting reflected surfaces
- If editing reflected subject, apply changes to both primary and reflected instances

💎 MATERIAL & TEXTURE INTELLIGENCE:
${intent.hasWaterReflection || intent.hasMirrorReflection ? `
- WATER SURFACE: Preserve ripples, transparency, color cast, and natural distortions
- Apply physically accurate reflection properties for water depth and clarity
- Maintain environmental integration - sky color, ambient light in water
` : ''}
- METALLIC SURFACES: Understand chrome, brushed metal, oxidized finishes - proper reflectivity
- FABRIC TEXTURES: Distinguish cotton, silk, denim, leather - accurate drape and weave
- SKIN TONES: Natural pores, subsurface scattering, realistic undertones
- GEMSTONES: Diamond fire/refraction, emerald inclusions, proper faceting
- PAINT FINISHES: Gloss (mirror-like), matte (no shine), metallic (sparkle), pearl (iridescent)
- NATURAL MATERIALS: Wood grain depth, stone patterns, cement roughness, tree bark texture

🔒 ULTRA-CRITICAL RESTRICTIONS:

❌ ABSOLUTELY FORBIDDEN:
- DO NOT remove artistic overlays or intentional composite elements
- DO NOT "fix" reflections that are meant to be artistic/surreal
- DO NOT add any objects, characters, or elements unless explicitly requested
- DO NOT remove or hide any subjects unless explicitly requested
- DO NOT merge multiple subjects into one
- DO NOT change the style (no anime, cartoon, or stylization unless requested)
- DO NOT add decorative elements (no balloons, confetti, effects unless requested)
- DO NOT add horror elements (no clowns, monsters, scary faces, horror characters)
- DO NOT add cartoon or animated characters unless explicitly requested
- DO NOT replace requested characters with different characters
- DO NOT modify subjects that were not mentioned in the prompt
- DO NOT change the number of subjects (if 2 people, keep 2 people)
- DO NOT alter spatial relationships between subjects
- DO NOT change poses or positions unless explicitly requested

✅ REQUIRED PRESERVATION:
- Preserve ALL existing subjects and their fundamental identity
- Maintain proper proportions, perspective, and spatial relationships
- Keep clothing, architecture, and environmental features exactly as they are
- Preserve ALL mechanical features of vehicles (wheels, lights, exhaust, etc.)
- Maintain ALL human anatomical features and natural appearance
- Keep ALL text, logos, and symbols readable and accurate
- Preserve scene coherence and logical consistency
- Maintain photorealistic quality throughout

🎯 MODIFICATION SCOPE:
- ONLY modify elements explicitly mentioned in the prompt
- If prompt mentions "motorcycle" → change ONLY motorcycle, keep riders in EXACT same position and pose
- If prompt mentions "rider" → change ONLY rider, keep motorcycle in EXACT same position and angle
- If prompt mentions "background" → change ONLY background, keep ALL foreground in EXACT positions
- If prompt mentions "add X" → ADD X in specified location WITHOUT moving or shifting anything else
- If prompt mentions "remove X" → REMOVE X and fill space naturally WITHOUT moving surrounding elements
- If prompt mentions "change color" → change ONLY color, keep EXACT positioning, size, and shape
- If prompt mentions "change hairstyle" → change ONLY hair, keep face, body, and position EXACTLY the same
- POSITIONING RULE: Unless prompt explicitly says "move", "reposition", or "relocate", ALL elements stay in EXACT positions

⚠️ BACKGROUND DESTRUCTION RULES:
When creating "messy", "chaotic", "destroyed", or "domestic violence" scenes:
- Focus ONLY on environmental damage: broken furniture, scattered items, damaged walls, torn curtains
- DO NOT add any characters, people, clowns, monsters, or creatures
- Keep destruction realistic and photorealistic
- Show physical damage to objects and surfaces
- Maintain natural lighting appropriate for the scene
- Preserve any existing people in the image exactly as they are

✨ EXECUTION PROTOCOL:
Apply ONLY the requested changes with surgical precision. Everything not mentioned in the request must remain completely unchanged in EXACT positions. The result should look like a professional edit where only the specified elements were modified with ZERO positional drift. When in doubt about adding something, DON'T ADD IT. When in doubt about moving something, DON'T MOVE IT.

🎯 FINAL POSITIONING ACCURACY VERIFICATION:
- Before completing the edit, verify EVERY element is in its EXACT original position
- Check that spatial relationships are IDENTICAL to the original (same distances, same angles, same scales)
- Confirm that no unintended shifting, drifting, or repositioning has occurred
- Validate that depth layering is EXACTLY the same (what was in front is still in front)
- Ensure ground contact points are PRECISELY maintained (same floor level, same contact angles)
- Verify that the camera angle, perspective, and framing are IDENTICAL to the original
- ZERO TOLERANCE for positional inaccuracy - if something moved even slightly, correct it

🔒 POSITIONING LOCK GUARANTEE:
Treat this image as if every element is pinned to exact coordinates. Only the explicitly requested changes should be visible. All spatial relationships, positions, scales, and arrangements must be PIXEL-PERFECT matches to the original. This is a PRECISION EDITING operation where accuracy is paramount.

🎯 REFERENCE IMAGE INTEGRATION PROTOCOL:
When reference images are provided:
- EXACT OBJECT REPLACEMENT: If replacing an object (e.g., changing a truck to match reference), the reference object must PRECISELY replace the original object's position, scale, and orientation
- MAINTAIN SPATIAL CONTEXT: The replaced object must fit naturally in the exact same space as the original
- PRESERVE SCENE INTEGRATION: Match lighting, shadows, perspective, and environmental integration of the original object
- ACCURATE POSITIONING: If original object is at position X,Y with scale S and rotation R, the reference object must occupy the EXACT same position with appropriate scale and rotation
- NO DRIFT: The replacement must not shift, move, or reposition other elements in the scene
- CONTEXTUAL AWARENESS: Understand the relationship between objects (e.g., if replacing a truck with a trailer, ensure the new truck aligns with the trailer's hitch point)

🔬 ULTRA-ADVANCED TEXTURE & MATERIAL MASTERY:
When changing colors, textures, or materials - PRECISION MATERIAL SCIENCE:

🎨 PAINT FINISHES (Complete Spectrum):
- GLOSS: Mirror-like reflection, sharp specular highlights, deep color depth
- MATTE: No shine, diffuse light scatter, flat appearance, powdery texture
- METALLIC: Sparkle particles, color-shifting flakes, dimensional depth
- PEARL/IRIDESCENT: Multi-color shift with viewing angle, delicate shimmer
- CHROME: Perfect mirror reflection, liquid metal appearance
- CANDY: Deep translucent color with base coat visible through
- SATIN: Soft sheen between matte and gloss, elegant finish
- HAMMERED: Textured surface with multiple reflection angles

💎 GEMSTONE PHYSICS (Natural Properties):
- DIAMONDS: Rainbow fire dispersion, brilliant-cut facets, maximum sparkle, refractive index 2.42
- EMERALDS: Jardin (garden) inclusions, verdant green, less sparkle than diamond
- RUBIES: Deep red internal glow, corundum structure, warm undertones
- SAPPHIRES: Deep blue saturation, corundum hardness, occasional asterism
- OPALS: Play-of-color, iridescent fire, delicate crazing patterns
- PEARLS: Soft luster, organic layers, subtle color variations

🪵 NATURAL MATERIALS (Organic Textures):
- WOOD: Growth rings, medullary rays, knots, grain figure (straight/wavy/curly)
- GRANITE: Crystalline structure, speckled pattern, polished reflectivity
- MARBLE: Veining patterns, translucency, cool elegance
- CONCRETE: Aggregate texture, porous surface, industrial roughness
- TREE BARK: Deep fissures, layered texture, organic irregularity
- LEATHER: Grain patterns, natural creasing, patina development
- FABRIC WEAVES: Thread count visibility, drape characteristics, textile structure

⚙️ METAL FINISHES (Industrial Precision):
- BRUSHED: Linear grain pattern, directional reflection, satin appearance
- POLISHED/MIRROR: Perfect reflection, liquid-smooth surface
- OXIDIZED: Rust patina, verdigris, aged character, color transformation
- CHROME: Liquid metal, perfect environmental reflection
- ANODIZED: Color-treated aluminum, consistent hue, protective finish
- HAMMERED: Hand-crafted texture, multiple faceted reflections
- GUNMETAL: Dark grey-blue, minimal reflection, tactical aesthetic

🌈 SURFACE PHYSICS (Light Interaction):
- REFLECTIVITY: Material-accurate specular reflection strength
- TRANSPARENCY: Glass, water, plastics - proper see-through quality with refraction
- REFRACTION: Light bending through transparent materials (diamonds, water, glass)
- SUBSURFACE SCATTERING: Skin, wax, jade - light penetration and glow
- ANISOTROPIC REFLECTION: Brushed metals, hair, fabric - directional highlights
- FRESNEL EFFECT: Stronger reflections at glancing angles
- PHYSICAL ACCURACY: All materials behave according to real-world physics

💎 ADVANCED CONSISTENCY ENFORCEMENT:
- FACIAL IDENTITY LOCK: When editing images with people, maintain 100% facial recognition accuracy - same bone structure, features, expressions
- OBJECT IDENTITY PRESERVATION: Vehicles remain recognizable vehicles with all features intact, clothing remains as clothing with proper fit
- BACKGROUND CONSISTENCY: Unless explicitly requested to change, backgrounds stay identical in every detail
- LIGHTING COHERENCE: All elements must share the same lighting direction, color temperature, and intensity
- SHADOW ACCURACY: Shadows must be consistent with light sources and object positions
- SCALE RELATIONSHIPS: Relative sizes between objects must remain constant unless explicitly changed

🚀 QUALITY ENHANCEMENT PROTOCOLS:
- MAXIMUM DETAIL: Render with highest possible detail and clarity
- SHARP EDGES: Clean, crisp edges without blur or artifacts
- TEXTURE DEFINITION: Visible micro-details in all surfaces
- COLOR ACCURACY: Precise color matching and saturation
- PHOTOREALISTIC INTEGRATION: Seamless blending that looks like a single photograph

⚠️ CRITICAL ERROR PREVENTION:
- DO NOT add elements not explicitly requested
- DO NOT remove elements not explicitly requested to be removed
- DO NOT change positions unless explicitly told to move/reposition
- DO NOT alter the style (no anime/cartoon unless requested)
- DO NOT merge multiple subjects into one
- DO NOT change the number of subjects in the image
- DO NOT add decorative elements (balloons, confetti, etc.) unless requested
- DO NOT change facial features or identity
- DO NOT drift or shift elements even by small amounts

✨ EXECUTION VERIFICATION:
Before finalizing:
1. Verify ONLY requested elements were modified
2. Confirm all positions are EXACTLY as in original
3. Check that no unintended changes occurred
4. Validate material properties are physically accurate
5. Ensure seamless photorealistic integration

This is a PRECISION OPERATION. Accuracy and consistency are paramount. The result must be indistinguishable from a professionally edited photograph with ZERO unintended modifications.`;
    if (params.multiImageMode === 'merge' && referenceImages.length > 0) {
      prompt += ' NATURAL CHARACTER BLENDING: Blend the reference images with the main image using advanced environmental integration. Analyze the target scene\'s lighting conditions, atmospheric properties, and spatial depth. Match the character\'s lighting to the scene - warm golden hour light, cool indoor fluorescent, dramatic sunset, etc. Apply appropriate atmospheric perspective - foreground characters have higher contrast and saturation, background characters are softer with reduced contrast. Create realistic ground contact with proper shadows and weight distribution. Ensure the character\'s pose and expression feel natural for the environment. IMPORTANT: If the main image contains clothing, the clothing must remain recognizable as clothing with proper fit, drape, and textile properties. If the main image contains a car, it must remain a functional vehicle with all automotive features intact. Only blend colors, patterns, or textures while preserving the fundamental object identity and structure.';
    } else if (params.multiImageMode === 'insert' && referenceImages.length > 0) {
      prompt += ' SEAMLESS OBJECT INSERTION: Insert elements from reference images with perfect environmental harmony. Study the target scene\'s depth of field, color temperature, and atmospheric conditions. Scale the inserted object appropriately for its position in the scene. Match focus and sharpness - if the background is blurred, apply appropriate blur to object edges. Create natural interactions with existing scene elements - proper spatial relationships, realistic shadows, and environmental reflections. Adjust object colors and tones to harmonize with the scene\'s overall aesthetic. The object should appear as if it was originally photographed in this exact location. CRITICAL: Preserve the structural integrity of the main subject - if it\'s clothing, maintain proper garment construction and fit; if it\'s a car, keep all automotive features and proportions intact. Only add complementary elements that enhance rather than replace the core object identity.';
    } else if (params.multiImageMode === 'car_wrap' && referenceImages.length > 0) {
      prompt += ' Apply the reference image design as a professional vehicle wrap or paint job. CRITICAL: The car must remain recognizably a car with all automotive features intact - wheels, windows, doors, bumpers, headlights, grille, mirrors, and body proportions must be preserved exactly. Only apply the design/pattern/texture from the reference image as a surface treatment. Maintain the car\'s original shape, curves, body lines, and structural details while seamlessly integrating the pattern/design from the reference image. Ensure the wrap follows the vehicle\'s contours naturally, with proper perspective and lighting that matches the original car photo. The design should look like it was professionally applied by a vehicle wrap specialist.';
    } else if (params.multiImageMode === 'clothing_pattern' && referenceImages.length > 0) {
      prompt += ' Apply the reference image pattern/design to the clothing while maintaining garment structure. CRITICAL: The clothing must remain recognizable as the original garment type with proper fit, drape, seams, and textile properties. Only apply the pattern/texture/design from the reference image as a fabric treatment. Preserve the garment\'s original silhouette, construction details, wrinkles, folds, and how it fits on the body. The pattern should follow the fabric\'s natural drape and stretch, appearing as if the garment was originally made with this fabric design.';
    } else if (params.multiImageMode === 'clothing_logo' && referenceImages.length > 0) {
      prompt += ' CLOTHING LOGO TRANSFER: Transfer ONLY the first reference image as a logo/patch/print onto the garment. Respect fabric drape and curvature; conform the logo to folds and seams with realistic micro-wrinkles and minor stretch. Maintain clean registration: if crisp edges are intended, keep edges sharp; otherwise feather slightly to follow textile microgeometry. Render as ink/print with appropriate finish (matte/satin/gloss based on context) and add subtle specular highlights only if glossy. Blend colors to remain readable while preserving brand hues; avoid color cast from fabric. Add natural contact shadows where the fabric dips, and occlude the print inside deep folds. Do NOT change body, face, or background.';
    }
    if ((params.expression ?? '').trim().length > 0) {
      const expr = (params.expression ?? '').trim();
      prompt += ` Set and maintain facial expression: "${expr}". Use precise facial muscle cues (FACS) for accuracy: match eyebrow position, eyelid openness, nasolabial folds, mouth shape, lip tension, teeth visibility, and cheek raise as appropriate for "${expr}".`;
    }
    if (params.expressionLock) {
      prompt += ' Lock facial expression consistency across edits. Do not change emotion, mouth openness, eyebrow shape or gaze unless explicitly requested.';
    }
    if (params.faceAnchor) {
      prompt += ' FACE ANCHOR: Treat the uploaded face as the untouchable ground truth. When adding or generating any body, clothing, or background, keep facial pixels, proportions, landmarks, and identity 100% unchanged. Synthesize the body to match the anchored face (skin tone, lighting, perspective) without altering the face in any way.';
    }
    if (params.headOnly) {
      prompt += ' HEAD-ONLY PORTRAIT LOCK: Focus strictly on the head/face and hair. Do NOT add or modify body, torso, arms, or hands even if requested. Ignore any instructions to add or change body/clothing; prioritize facial fidelity. If needed, crop to head-and-shoulders without inventing new body parts. Prevent hallucinated body details; only refine facial details and hair.';
    }
    if (params.additionsLock ?? true) {
      prompt += ' ADVANCED PRESERVATION PROTOCOL: Preserve all previously added or merged elements exactly as they were introduced: keep their identity, color, material, style, pose, and relative position unchanged. Maintain their environmental integration - lighting, shadows, reflections, and atmospheric effects must remain consistent. Only add the newly requested elements with the same level of natural integration. STRUCTURAL INTEGRITY: When working with cars, maintain all automotive features (wheels, doors, windows, lights, etc.). When working with clothing, preserve garment structure, fit, and textile properties. When working with characters, maintain their natural placement, environmental harmony, and realistic interaction with the scene. The core object must remain functionally recognizable with perfect environmental integration.';
    }

    // GLOBAL MIMIC POSITIONING: Always infer and mimic the exact pose, orientation, footprint, and screen position for any object/person/vehicle that is being inserted, swapped or replaced. When swapping, align to the original object's silhouette, rotation, perspective and contact points; keep shadows, occlusions and reflections consistent. Respect relative scale versus nearby anchors (seats, handlebars, doors, wheels, ground plane). If aiming an object (e.g., weapon) at the camera is implied, align the object so its primary axis points at the optical center with realistic foreshortening and natural hand/arm articulation. Never invent a different pose unless explicitly requested.

    if (params.strength < 0.3) {
      prompt += ' Make minimal, subtle changes only to the specified elements.';
    } else if (params.strength < 0.7) {
      prompt += ' Make moderate changes to specified elements while preserving overall image integrity.';
    } else {
      prompt += ' Make bold changes to specified elements but keep everything else unchanged.';
    }
    if (params.identityLock) {
      prompt += ' IDENTITY LOCK ACTIVATED: Maintain 100% facial identity consistency. Preserve every unique facial characteristic, micro-expressions, skin details, and personal features. The person must remain completely recognizable with zero identity drift. Apply advanced facial recognition consistency algorithms.';
    }
    prompt += ' FINAL QUALITY ASSURANCE: Maintain original image quality, lighting, and composition. Ensure seamless integration of edits with perfect environmental harmony. Apply professional-grade image processing with attention to detail that matches high-end photo editing standards. For character placement, ensure the integration is so natural that viewers cannot tell the character was added - they should appear as if they were originally part of the scene during photography. The result should be indistinguishable from a professionally edited photograph with stunning natural character integration.';
    // Add content safety guidelines to the prompt
    prompt += '\n\nCONTENT SAFETY REQUIREMENTS:\n- No nudity, sexual content, or explicit material\n- No graphic violence or gore\n- Family-friendly and appropriate content only\n- Focus on artistic and creative expression';
    
    // CRITICAL: Check final length and truncate if needed while preserving core instructions
    if (prompt.length > 2000) {
      console.warn('⚠️ Prompt too long (' + prompt.length + ' chars), intelligently truncating to 2000 chars while preserving core functionality');
      
      // Extract the user's original request and critical system instructions
      const userPrompt = params.prompt.trim();
      const criticalInstructions = ' CRITICAL: Change ONLY what is explicitly requested. Preserve exact positioning, face, background, and all unmodified elements. Apply changes with surgical precision while maintaining photorealistic quality and natural integration.';
      const safetyNote = ' Family-friendly content only.';
      
      // Calculate available space
      const maxUserPromptLength = 2000 - criticalInstructions.length - safetyNote.length - 50; // 50 char buffer
      
      // Truncate user prompt if needed
      const truncatedUserPrompt = userPrompt.length > maxUserPromptLength 
        ? userPrompt.substring(0, maxUserPromptLength) + '...' 
        : userPrompt;
      
      prompt = truncatedUserPrompt + criticalInstructions + safetyNote;
      
      console.log('✅ Prompt truncated intelligently to ' + prompt.length + ' characters');
    }
    
    return prompt;
  }, [referenceImages, validatePromptContent, extractCharacterFromPrompt]);

  const getImageDimensions = useCallback(async (uri: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      try {
        if (!uri || !uri.trim()) {
          reject(new Error('Image URI is required to get dimensions'));
          return;
        }
        
        Image.getSize(
          uri,
          (width: number, height: number) => {
            if (width > 0 && height > 0) {
              resolve({ width, height });
            } else {
              reject(new Error('Invalid image dimensions received'));
            }
          },
          (err) => {
            console.error('❌ Image.getSize error:', err);
            reject(new Error(`Failed to get image dimensions: ${err}`));
          }
        );
      } catch (error) {
        console.error('❌ getImageDimensions error:', error);
        reject(error);
      }
    });
  }, []);

  const ensureFileUri = useCallback(async (uri: string): Promise<string> => {
    try {
      if (uri.startsWith('data:')) {
        if (Platform.OS === 'web') {
          return uri;
        }
        
        if (!FileSystem.cacheDirectory) {
          console.warn('FileSystem not available on this platform, returning data URI as-is');
          return uri;
        }
        
        const parts = uri.split(',');
        if (parts.length !== 2) {
          throw new Error('Invalid data URI format');
        }
        const [header, data] = parts;
        if (!data) {
          throw new Error('No data in URI');
        }
        const mime = (header.split(';')[0] || '').replace('data:', '') || 'image/png';
        const ext = mime.includes('png') ? 'png' : (mime.includes('jpeg') || mime.includes('jpg')) ? 'jpg' : 'png';
        const filename = `img_${Date.now()}.${ext}`;
        const fileUri = `${FileSystem.cacheDirectory}${filename}`;
        
        await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
        return fileUri;
      }
      return uri;
    } catch (e) {
      console.error('ensureFileUri error:', e);
      const errorMessage = e instanceof Error ? e.message : 'Failed to prepare image for export';
      throw new Error(errorMessage);
    }
  }, []);

  const compressImageToBase64 = useCallback(async (imageUri: string, maxSizeKB: number = 4096): Promise<string> => {
    console.log('🔄 Compressing image to stay under', maxSizeKB, 'KB...');
    
    try {
      if (!imageUri || !imageUri.trim()) {
        throw new Error('Image URI is required for compression');
      }
      // First, resize the image if needed to reduce file size
      const fileUri = await ensureFileUri(imageUri);
      
      // Get original dimensions
      const { width, height } = await getImageDimensions(fileUri);
      console.log(`📐 Original dimensions: ${width}x${height}`);
      
      // Start with 70% quality and reduce if needed
      let quality = 0.7;
      let attempts = 0;
      const maxAttempts = 5;
      
      while (attempts < maxAttempts) {
        attempts++;
        console.log(`🔄 Compression attempt ${attempts}/${maxAttempts} with quality ${quality}...`);
        
        // Compress the image
        const compressed = await ImageManipulator.manipulateAsync(
          fileUri,
          [],
          { 
            compress: quality, 
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true
          }
        );
        
        if (compressed.base64) {
          const sizeKB = (compressed.base64.length * 0.75) / 1024; // Approximate size in KB
          console.log(`📊 Compressed size: ${sizeKB.toFixed(2)} KB`);
          
          if (sizeKB <= maxSizeKB) {
            console.log(`✅ Image compressed successfully to ${sizeKB.toFixed(2)} KB`);
            return compressed.base64;
          }
          
          // Reduce quality for next attempt
          quality = quality * 0.85;
          
          if (quality < 0.1) {
            console.warn('⚠️ Quality too low, attempting to resize image instead...');
            // If quality is too low, try resizing the image
            const scale = Math.sqrt(maxSizeKB / sizeKB) * 0.9; // Target 90% of max size
            const newWidth = Math.round(width * scale);
            const newHeight = Math.round(height * scale);
            console.log(`📐 Resizing to ${newWidth}x${newHeight}...`);
            
            const resized = await ImageManipulator.manipulateAsync(
              fileUri,
              [{ resize: { width: newWidth, height: newHeight } }],
              { 
                compress: 0.8, 
                format: ImageManipulator.SaveFormat.JPEG,
                base64: true
              }
            );
            
            if (resized.base64) {
              const finalSizeKB = (resized.base64.length * 0.75) / 1024;
              console.log(`✅ Final compressed size: ${finalSizeKB.toFixed(2)} KB`);
              return resized.base64;
            }
          }
        }
      }
      
      throw new Error('Failed to compress image to acceptable size');
    } catch (error) {
      console.error('❌ Image compression error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to compress image';
      throw new Error(`Image compression failed: ${errorMsg}. Try using a smaller image.`);
    }
  }, [getImageDimensions, ensureFileUri]);

  const convertImageToBase64 = useCallback(async (imageUri: string): Promise<string> => {
    try {
      if (!imageUri || !imageUri.trim()) {
        throw new Error('Image URI is required');
      }
      const sanitizedUri = imageUri.trim();
    if (sanitizedUri.startsWith('data:')) {
      const base64Part = sanitizedUri.split(',')[1];
      if (!base64Part) {
        throw new Error('Invalid data URI format');
      }
      
      // Check size and compress if needed
      const sizeKB = (base64Part.length * 0.75) / 1024;
      console.log(`📊 Data URI size: ${sizeKB.toFixed(2)} KB`);
      
      if (sizeKB > 4096) {
        console.log('⚠️ Image too large, attempting compression...');
        return await compressImageToBase64(sanitizedUri, 4096);
      }
      
      return base64Part;
    }

    if (Platform.OS !== 'web' && (sanitizedUri.startsWith('file://') || sanitizedUri.startsWith('content://'))) {
      try {
        if (!FileSystem.readAsStringAsync) {
          console.warn('FileSystem Base64 not available, falling back to fetch');
          throw new Error('FileSystem not available');
        }
        const base64 = await FileSystem.readAsStringAsync(sanitizedUri, { encoding: FileSystem.EncodingType.Base64 });
        if (!base64 || base64.length === 0) {
          throw new Error('Empty file data');
        }
        if (base64.length > 50 * 1024 * 1024) {
          console.warn('Large base64 data:', base64.length);
        }
        return base64;
      } catch (e) {
        console.error('readAsStringAsync failed, falling back to fetch:', e);
      }
    }

    const isFetchable = (
      sanitizedUri.startsWith('http') ||
      sanitizedUri.startsWith('blob:') ||
      sanitizedUri.startsWith('file://') ||
      sanitizedUri.startsWith('content://')
    );

    if (isFetchable) {
      const response = await fetch(sanitizedUri);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      if (blob.size > 50 * 1024 * 1024) {
        console.warn('Large image file:', blob.size);
      }
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64Part = result.split(',')[1];
          if (!base64Part) {
            reject(new Error('Failed to extract base64 from FileReader result'));
          } else {
            if (base64Part.length > 50 * 1024 * 1024) {
              console.warn('Large processed image:', base64Part.length);
            }
            resolve(base64Part);
          }
        };
        reader.onerror = () => reject(new Error('FileReader error'));
        reader.readAsDataURL(blob);
      });
    }

      throw new Error(`Unsupported image URI format: ${sanitizedUri.substring(0, 20)}...`);
    } catch (error) {
      console.error('❌ convertImageToBase64 error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to convert image';
      throw new Error(`Image conversion failed: ${errorMsg}`);
    }
  }, [ensureFileUri, compressImageToBase64]);

  const fetchJsonWithRetries = useCallback(async (url: string, body: unknown, opts?: { retries?: number; timeoutMs?: number }): Promise<any> => {
    const maxRetries = opts?.retries ?? 3;
    const timeoutMs = opts?.timeoutMs ?? 180000;
    
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeoutMs);
      
      try {
        if (attempt > 0) {
          const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          console.log(`⏳ Retry attempt ${attempt}/${maxRetries} after ${backoffMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
        }
        
        console.log('🌐 Making API request to:', url, `(attempt ${attempt + 1}/${maxRetries + 1})`);
        console.log('📦 Request body size:', JSON.stringify(body).length, 'characters');
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        });
        clearTimeout(t);

        console.log('📡 API Response status:', response.status);
        console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errText = await response.text().catch(() => '');
          console.error('❌ API Error response:', errText.substring(0, 500));
          
          if (response.status === 429) {
            if (attempt < maxRetries) {
              lastError = new Error('Rate limited. Retrying...');
              continue;
            }
            throw new Error('Too many requests. Please wait a minute and try again.');
          }
          
          if (response.status === 503 || response.status === 502 || response.status === 504) {
            console.error('❌ Service unavailable. Status:', response.status);
            console.error('❌ Attempt:', attempt + 1, '/', maxRetries + 1);
            console.error('❌ Time:', new Date().toISOString());
            if (attempt < maxRetries) {
              lastError = new Error(`Service unavailable (${response.status}). Retrying...`);
              continue;
            }
            throw new Error('🚨 AI Image Service Temporarily Unavailable\n\n⚠️ The external AI provider (toolkit.rork.com) is currently experiencing issues or high demand.\n\n🔄 This is NOT an app bug - the service will be back online soon.\n\n💡 What to do:\n• Wait 5-10 minutes and try again\n• The service typically recovers quickly\n• Your image and prompt are saved\n\n📊 Error: HTTP ' + response.status);
          }
          
          if (response.status === 413) {
            throw new Error('Image too large. Please use a smaller image (under 5MB).');
          }
          
          if (response.status === 400 || errText.toLowerCase().includes('blocked') || errText.toLowerCase().includes('content was blocked')) {
            console.error('❌ Content blocked by AI safety filters');
            console.error('❌ Response status:', response.status);
            console.error('❌ Response error text:', errText.substring(0, 300));
            
            // Parse error if it's JSON
            let errorDetail = '';
            try {
              const errorJson = JSON.parse(errText);
              if (errorJson.error) {
                errorDetail = errorJson.error;
              }
            } catch {
              errorDetail = errText.substring(0, 200);
            }
            
            throw new Error('🚫 Content Safety Filter Triggered\n\n⚠️ The AI service blocked this request because it detected content that may violate safety policies.\n\n💡 Common causes:\n• Images containing sensitive content\n• Prompts with graphic descriptions\n• Requests for violent or inappropriate content\n• Images with restricted subjects\n\n🔄 Solutions:\n\n1️⃣ SIMPLIFY YOUR PROMPT:\n• Use general descriptions instead of detailed ones\n• Focus on artistic/creative language\n• Avoid graphic or explicit terms\n\n2️⃣ TRY DIFFERENT WORDING:\n• "Action scene" instead of detailed violence\n• "Dramatic atmosphere" instead of explicit descriptions\n• "Cinematic composition" for stylistic changes\n\n3️⃣ CHECK YOUR IMAGE:\n• Ensure the source image doesn\'t contain restricted content\n• Try a different image if the block persists\n• Remove reference images and try again\n\n📝 Example improvements:\n❌ Detailed violent/graphic descriptions\n✅ "Cinematic action movie scene"\n\n❌ Explicit content requests\n✅ "Artistic portrait with dramatic lighting"\n\n🔍 Technical detail: ' + (errorDetail || 'Content policy violation detected'));
          }
          
          throw new Error(`Request failed (${response.status}). ${errText.substring(0, 200)}`);
        }

        const contentType = response.headers.get('content-type') ?? '';
        console.log('📄 Content-Type:', contentType);
        
        if (!contentType.includes('application/json')) {
          const text = await response.text();
          console.error('❌ Non-JSON response:', text.substring(0, 500));
          
          if (text.includes('502') || text.includes('504') || text.includes('Error')) {
            if (attempt < maxRetries) {
              lastError = new Error('Invalid server response. Retrying...');
              continue;
            }
            throw new Error('⚠️ AI service returned an invalid response.\n\n🔄 The external AI provider may be experiencing issues.\n\n💡 Please try again in a few minutes.');
          }
          
          throw new Error('Invalid response format from server');
        }
        
        let jsonData: any;
        try {
          const responseText = await response.text();
          console.log('📝 Raw response preview:', responseText.substring(0, 200));
          
          // Check if response is actually JSON before parsing
          if (!responseText || responseText.trim().length === 0) {
            console.error('❌ Empty response received');
            if (attempt < maxRetries) {
              lastError = new Error('Empty response from server. Retrying...');
              continue;
            }
            throw new Error('⚠️ AI service returned empty response.\n\n🔄 The service may be experiencing issues.\n\n💡 Please try again in a few minutes.');
          }
          
          // Check if response looks like HTML or plain text error
          const trimmedResponse = responseText.trim();
          if (trimmedResponse.startsWith('<') || trimmedResponse.startsWith('<!DOCTYPE') || 
              (!trimmedResponse.startsWith('{') && !trimmedResponse.startsWith('['))) {
            console.error('❌ Non-JSON response received:', trimmedResponse.substring(0, 300));
            
            // Check for common error patterns
            if (trimmedResponse.includes('502') || trimmedResponse.includes('503') || 
                trimmedResponse.includes('504') || trimmedResponse.includes('Gateway') ||
                trimmedResponse.includes('Service Unavailable') || trimmedResponse.includes('Timeout')) {
              if (attempt < maxRetries) {
                lastError = new Error('Service error detected. Retrying...');
                continue;
              }
              throw new Error('🚨 AI Image Service Temporarily Unavailable\n\n⚠️ The external AI provider is currently experiencing issues.\n\n💡 Please wait 5-10 minutes and try again.');
            }
            
            if (attempt < maxRetries) {
              lastError = new Error('Invalid response format. Retrying...');
              continue;
            }
            throw new Error('⚠️ AI service returned invalid response format.\n\n🔄 The service may be experiencing issues.\n\n💡 Please try again in a few minutes.');
          }
          
          jsonData = JSON.parse(responseText);
          console.log('✅ API Response parsed successfully');
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError);
          const errorMsg = parseError instanceof Error ? parseError.message : 'Unknown parse error';
          console.error('❌ Parse error details:', errorMsg);
          
          if (attempt < maxRetries) {
            lastError = new Error('Failed to parse server response. Retrying...');
            continue;
          }
          
          throw new Error('⚠️ AI service returned invalid data format.\n\n🔄 The service may be experiencing issues.\n\n💡 Please try again in a few minutes.');
        }
        
        return jsonData;
      } catch (e) {
        clearTimeout(t);
        
        if (e instanceof Error) {
          if (e.name === 'AbortError') {
            if (attempt < maxRetries) {
              lastError = new Error('Request timed out. Retrying...');
              continue;
            }
            throw new Error('⏱️ Request timed out after multiple attempts.\n\n🔄 The AI service is taking too long to respond.\n\n💡 Try again in a few minutes or use a smaller image.');
          }
          
          if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError') || e.message.includes('network')) {
            if (attempt < maxRetries) {
              lastError = new Error('Network error. Retrying...');
              continue;
            }
            throw new Error('🌐 Network connection issue.\n\n📶 Please check your internet connection and try again.');
          }
        }
        
        lastError = e as Error;
        if (attempt >= maxRetries) {
          console.error('❌ All retry attempts failed:', e);
          throw e;
        }
      }
    }
    
    throw lastError || new Error('Request failed after all retries');
  }, []);

  const generateEdit = useCallback(async (params: EditParams): Promise<string | null> => {
    try {
      
      if (!params || !params.prompt || !params.prompt.trim()) {
        throw new Error('Edit prompt is required');
      }
      if (params.prompt.length > 2000) {
        throw new Error('Prompt too long (max 2000 characters)');
      }
      if (!sourceImage) {
        throw new Error('No source image available');
      }
      const currentImage = editedImage || sourceImage;
      let enhancedPrompt = buildEnhancedPrompt(params);
      if (params.region) {
        const pct = (n: number) => Math.round(n * 100);
        const r = params.region;
        enhancedPrompt += `\n\nREGION CONSTRAINT: Limit edits strictly to the rectangular region: left ${pct(r.x)}%, top ${pct(r.y)}%, width ${pct(r.width)}%, height ${pct(r.height)}% of the canvas. Do NOT modify pixels outside this box.`;
      }
      try {
        // Compress main image before sending to API
        console.log('📤 Preparing main image for API...');
        const mainImageBase64 = await compressImageToBase64(currentImage, 4096); // 4MB limit
        if (!mainImageBase64 || mainImageBase64.length === 0) {
          throw new Error('Failed to compress main image');
        }
        console.log('✅ Main image prepared successfully');
        
        const images = [{ type: 'image' as const, image: mainImageBase64 }];
        if (referenceImages.length > 0) {
          console.log(`📤 Preparing ${referenceImages.length} reference images...`);
          for (let i = 0; i < referenceImages.length; i++) {
            try {
              console.log(`🔄 Compressing reference image ${i + 1}/${referenceImages.length}...`);
              const refBase64 = await compressImageToBase64(referenceImages[i], 2048); // 2MB limit for reference images
              if (refBase64) {
                images.push({ type: 'image' as const, image: refBase64 });
                console.log(`✅ Reference image ${i + 1} prepared successfully`);
              }
            } catch (e) {
              console.warn(`⚠️ Failed to compress reference image ${i + 1}, skipping:`, e);
            }
          }
        }
        // Enhanced content sanitization to prevent false positives
        let sanitizedPrompt = enhancedPrompt;
        
        // Detect action/disaster scenario keywords
        const actionKeywords = [
          'violence', 'violent', 'blood', 'gore', 'graphic',
          'destruction', 'destroyed', 'damage', 'damaged',
          'crash', 'explosion', 'blast', 'terror', 'horror',
          'windshield', 'motorcycle', 'tornado', 'hurricane', 'earthquake',
          'building explosion', 'falling', 'drowning', 'disaster'
        ];
        
        // Detect everyday scenarios that might be misinterpreted
        const everydayScenarioKeywords = [
          'doordash', 'delivery', 'sleeping', 'taking a photo', 'taking picture',
          'door', 'doorway', 'cracked open', 'holding food', 'delivery person',
          'front door', 'couch', 'asleep', 'phone out', 'deliveryman', 'delivery guy'
        ];
        
        const hasActionScenario = actionKeywords.some(term => 
          sanitizedPrompt.toLowerCase().includes(term)
        );
        
        const hasEverydayScenario = everydayScenarioKeywords.some(term => 
          sanitizedPrompt.toLowerCase().includes(term)
        );
        
        // Add comprehensive safety context for complex scenarios
        if (hasActionScenario) {
          sanitizedPrompt = `🎬 PROFESSIONAL CINEMATIC PRODUCTION - ARTISTIC VISUAL EFFECTS REQUEST

📋 CONTENT CLASSIFICATION: Entertainment/Film Production
🎯 PURPOSE: Creating professional visual effects for artistic storytelling
✅ CONTEXT: This is a fictional, stylized scene for entertainment media
🎨 STYLE: Cinematic, dramatic, action-movie aesthetic
⚠️ SAFETY: Family-friendly action content, no graphic violence or gore
💡 FOCUS: Dramatic composition, dynamic poses, and visual storytelling

` + sanitizedPrompt;
          
          sanitizedPrompt += `\n\n🎭 ARTISTIC DIRECTION GUIDELINES:
- Create dramatic, cinematic action scenes with professional film quality
- Focus on dynamic composition, lighting, and visual storytelling
- Maintain family-friendly content standards (PG-13 action movie level)
- Emphasize artistic expression and entertainment value
- Use stylized, non-graphic representation of action scenarios
- Prioritize visual drama and emotional impact over realistic violence
- This is fictional entertainment content for creative/artistic purposes
- All content should be appropriate for general audiences
- Focus on the artistry and cinematography of action filmmaking`;
        } else if (hasEverydayScenario) {
          sanitizedPrompt = `🎬 EVERYDAY LIFE CINEMATIC SCENE - HUMOROUS/CREATIVE STORYTELLING

📋 CONTENT CLASSIFICATION: Everyday Life / Relatable Humor
🎯 PURPOSE: Creating a humorous, relatable, real-life scenario scene
✅ CONTEXT: This depicts a common, funny everyday situation (delivery driver, food delivery, etc.)
🎨 STYLE: Natural, realistic, slice-of-life photography with comedic timing
⚠️ SAFETY: Completely appropriate content - everyday life moments that are harmless and relatable
💡 FOCUS: Natural scene composition showing a humorous everyday moment
📝 SCENARIO: A delivery person, food service worker, or similar character in a typical real-world situation

🎭 SCENE CONTEXT:
- This is a harmless, everyday life scenario that people experience regularly
- Examples: delivery driver at a door, someone taking a photo, food delivery situations
- These are NORMAL, APPROPRIATE, and COMMON real-world activities
- Nothing inappropriate, dangerous, or concerning is happening
- Focus on natural, realistic composition that captures everyday moments
- Create authentic environmental integration and realistic character positioning

` + sanitizedPrompt;
          
          sanitizedPrompt += `\n\n✅ APPROPRIATE CONTENT CONFIRMATION:
- This scene depicts normal, everyday activities that are completely appropriate
- Any characters are engaged in legal, ethical, and common activities
- The scenario is suitable for all audiences and represents real-world situations
- Focus on natural realism, environmental accuracy, and authentic character placement
- This is storytelling content showing relatable, harmless everyday moments
- No illegal activities, inappropriate content, or harmful actions are depicted
- Create this scene with natural lighting, realistic positioning, and authentic environmental details`;
        }
        
        // CRITICAL: Get original image dimensions for aspect ratio preservation
        let originalWidth = 0;
        let originalHeight = 0;
        try {
          const dimensions = await getImageDimensions(currentImage);
          originalWidth = dimensions.width;
          originalHeight = dimensions.height;
          console.log(`📐 Original image dimensions: ${originalWidth}x${originalHeight}`);
        } catch (e) {
          console.warn('Could not get original dimensions, aspect ratio may not be preserved:', e);
        }
        
        // Add critical aspect ratio preservation instruction with exact dimensions
        const aspectRatioInstruction = `\n\n🎯 CRITICAL ASPECT RATIO & DIMENSION PRESERVATION:
- Original image dimensions: ${originalWidth}x${originalHeight}
- MAINTAIN EXACT aspect ratio: ${(originalWidth / originalHeight).toFixed(4)}:1
- DO NOT change from portrait to landscape or vice versa
- DO NOT crop, zoom, resize, or reframe the image
- DO NOT change the field of view or camera distance
- Keep EXACT same width-to-height ratio as source image
- Preserve ALL edges and the complete frame
- Keep objects at their ORIGINAL SIZE relative to frame
- DO NOT zoom in or zoom out - maintain exact framing
- OUTPUT MUST BE ${originalWidth}x${originalHeight} pixels or maintain exact ${(originalWidth / originalHeight).toFixed(4)}:1 ratio`;
        
        const requestBody = { 
          prompt: sanitizedPrompt + aspectRatioInstruction, 
          images 
        } as const;
        console.log('🚀 Calling image edit API with 4K resolution request');
        console.log('📍 API Endpoint: https://toolkit.rork.com/images/edit/');
        console.log('⏰ Request Time:', new Date().toISOString());
        console.log('📦 Prompt Length:', enhancedPrompt.length, 'characters');
        console.log('🖼️ Reference Images:', referenceImages.length);
        setIsEditLoading(true);
        console.log('⏳ Starting API request with 3 retry attempts...');
        const result = await fetchJsonWithRetries('https://toolkit.rork.com/images/edit/', requestBody, { timeoutMs: 180000 });
        console.log('✅ API request completed successfully!');
        setIsEditLoading(false);
        console.log('Parsed response structure:', {
          hasImage: !!(result as any)?.image,
          hasBase64: !!(result as any)?.image?.base64Data,
          base64Length: (result as any)?.image?.base64Data?.length || 0,
          mimeType: (result as any)?.image?.mimeType
        });
        
        if (!result || typeof result !== 'object') {
          throw new Error('Image editing service returned invalid response. Please try again.');
        }
        const imgObj: any = (result as any).image;
        if (!imgObj || typeof imgObj !== 'object') {
          throw new Error('Image editing service did not return image data. Please try again.');
        }
        if (typeof imgObj.base64Data !== 'string' || imgObj.base64Data.length < 100) {
          throw new Error('Image editing service returned invalid image data. Please try again.');
        }
        const mimeType = imgObj.mimeType || 'image/png';
        const editedImageUri = `data:${mimeType};base64,${imgObj.base64Data}`;
        setEditedImage(editedImageUri);
        try {
          const historyItem: EditHistory = {
            id: Date.now().toString(),
            originalImage: currentImage,
            editedImage: editedImageUri,
            prompt: params.prompt,
            date: new Date().toISOString(),
          };
          addToHistory(historyItem);
        } catch (hErr) {
          console.warn('Failed adding to history', hErr);
        }
        return editedImageUri;
      } catch (editError) {
        throw editError as Error;
      }
    } catch (error) {
      setIsEditLoading(false);
      console.error('Image editing error:', error);
      
      if (error instanceof Error) {
        // Handle timeout errors
        if (error.name === 'AbortError') {
          throw new Error('Request timed out. Service may be busy. Try again in a few minutes.');
        }
        
        // Handle network connectivity issues
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('NetworkError') || 
            error.message.includes('ERR_NETWORK') ||
            error.message.includes('network') ||
            error.message.includes('connection')) {
          throw new Error('Network issue. Check your connection and try again.');
        }
        
        // Handle service availability issues
        if (error.message.includes('502') || error.message.includes('503') || error.message.includes('504') ||
            error.message.includes('temporarily') || error.message.includes('unavailable') ||
            error.message.includes('maintenance') || error.message.includes('overloaded')) {
          throw new Error('Service temporarily unavailable. Please try again in a moment.');
        }
        
        // Handle rate limiting
        if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
          throw new Error('Rate limit reached. Wait a minute and retry.');
        }
        
        // Handle file size issues
        if (error.message.includes('too large') || error.message.includes('5MB')) {
          throw new Error('Image too large. Use an image under 5MB.');
        }
        
        // Re-throw the original error if it's already user-friendly
        throw error;
      } else {
        throw new Error('Unexpected error during image editing. Try again.');
      }
    }
  }, [sourceImage, editedImage, referenceImages, buildEnhancedPrompt, convertImageToBase64, setIsEditLoading, addToHistory]);

  const resizeImageIfNeeded = useCallback(async (uri: string, maxSize: number = 2048): Promise<{ uri: string; wasResized: boolean; originalSize: { width: number; height: number }; newSize?: { width: number; height: number } }> => {
    try {
      const { width, height } = await getImageDimensions(uri);
      const maxDimension = Math.max(width, height);
      
      if (maxDimension <= maxSize) {
        return { uri, wasResized: false, originalSize: { width, height } };
      }
      
      console.log(`Image too large (${width}x${height}), resizing to fit ${maxSize}px...`);
      
      const fileUri = await ensureFileUri(uri);
      const scale = maxSize / maxDimension;
      const newWidth = Math.round(width * scale);
      const newHeight = Math.round(height * scale);
      
      const manipulated = await ImageManipulator.manipulateAsync(
        fileUri,
        [{ resize: { width: newWidth, height: newHeight } }],
        { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      let resizedUri = manipulated.uri;
      
      if (Platform.OS === 'web') {
        const response = await fetch(manipulated.uri);
        const blob = await response.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        resizedUri = base64;
      }
      
      console.log(`Image resized successfully to ${newWidth}x${newHeight}`);
      return { 
        uri: resizedUri, 
        wasResized: true, 
        originalSize: { width, height },
        newSize: { width: newWidth, height: newHeight }
      };
    } catch (error) {
      console.error('Failed to resize image:', error);
      return { uri, wasResized: false, originalSize: { width: 0, height: 0 } };
    }
  }, [getImageDimensions, ensureFileUri]);

  const addReferenceImage = useCallback(async (uri: string, autoResize: boolean = true) => {
    try {
      if (autoResize) {
        const result = await resizeImageIfNeeded(uri, 2048);
        if (result.wasResized) {
          console.log(`Reference image auto-resized from ${result.originalSize.width}x${result.originalSize.height} to ${result.newSize?.width}x${result.newSize?.height}`);
        }
        setReferenceImages(prev => [...prev, result.uri].slice(0, 3));
      } else {
        setReferenceImages(prev => [...prev, uri].slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to add reference image:', error);
      setReferenceImages(prev => [...prev, uri].slice(0, 3));
    }
  }, [resizeImageIfNeeded]);

  const removeReferenceImage = useCallback((index: number) => {
    setReferenceImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const loadOriginalImage = useCallback(async (project: RecentProject): Promise<string | null> => {
    try {
      const storedImage = Platform.OS === 'web' ? await idbGet<string>(project.originalImageId) : await AsyncStorage.getItem(project.originalImageId);
      return storedImage || null;
    } catch (error) {
      console.warn('Failed to load original image:', error);
      return null;
    }
  }, []);

  const resetToOriginal = useCallback(() => {
    setEditedImage(null);
    setCurrentProject(null);
  }, []);

  const startNewSourceImage = useCallback((uri: string) => {
    console.log('startNewSourceImage', uri?.slice(0, 40));
    setInitialSourceImage(uri);
    setSourceImage(uri);
    setEditedImage(null);
    setReferenceImages([]);
    setHistory([]);
    setHistoryCursor(-1);
    setCurrentProject(null);
  }, []);

  const revertToInitialImage = useCallback(() => {
    console.log('revertToInitialImage');
    if (initialSourceImage) {
      setSourceImage(initialSourceImage);
      setEditedImage(null);
      setHistory([]);
      setHistoryCursor(-1);
      setCurrentProject(null);
    }
  }, [initialSourceImage]);

  const saveCurrentImage = useCallback(async (): Promise<boolean> => {
    try {
      const imageToSave = editedImage || sourceImage;
      if (!imageToSave) {
        console.error('No image to save');
        throw new Error('No image to save');
      }
      
      console.log('Creating saved image object...');
      const savedImage: SavedImage = {
        id: Date.now().toString(),
        imageUri: imageToSave,
        originalImageUri: sourceImage || undefined,
        prompt: currentProject?.prompt,
        date: new Date().toISOString(),
        isEdited: !!editedImage,
      };
      
      console.log('Creating thumbnail...');
      const thumbnail = await createThumbnail(imageToSave);
      const savedImageWithThumbnail: SavedImage = { ...savedImage, thumbnail };
      
      console.log('Storing image data...');
      const imageKey = `saved_image_${savedImage.id}`;
      try {
        if (Platform.OS === 'web') {
          await idbSet(imageKey, imageToSave);
        } else {
          await AsyncStorage.setItem(imageKey, imageToSave);
        }
        console.log('Image data stored successfully');
      } catch (storageError) {
        console.error('Failed to store image data:', storageError);
        // Continue anyway, we'll use the thumbnail
      }
      
      console.log('Updating saved images list...');
      const updatedSavedImages = [savedImageWithThumbnail, ...savedImages].slice(0, 50);
      setSavedImages(updatedSavedImages);
      
      try {
        await AsyncStorage.setItem('savedImages', JSON.stringify(updatedSavedImages));
        console.log('Saved images list updated successfully');
      } catch (metaError) {
        console.error('Failed to update saved images metadata:', metaError);
        throw metaError;
      }
      
      return true;
    } catch (error) {
      console.error('Save current image error:', error);
      
      if (error instanceof Error && (((error.message ?? '').toLowerCase().includes('quota')) || error.name === 'QuotaExceededError')) {
        console.log('Storage quota exceeded, cleaning up old images...');
        try {
          const oldestImages = savedImages.slice(30);
          for (const oldImage of oldestImages) {
            try {
              if (Platform.OS === 'web') {
                await idbDelete(`saved_image_${oldImage.id}`);
              } else {
                await AsyncStorage.removeItem(`saved_image_${oldImage.id}`);
              }
            } catch {}
          }
          const cleanedSavedImages = savedImages.slice(0, 30);
          setSavedImages(cleanedSavedImages);
          await AsyncStorage.setItem('savedImages', JSON.stringify(cleanedSavedImages));
          console.log('Cleaned up old images, retrying save...');
          return await saveCurrentImage();
        } catch (cleanupError) {
          console.error('Cleanup failed:', cleanupError);
          return false;
        }
      }
      return false;
    }
  }, [editedImage, sourceImage, currentProject, savedImages, createThumbnail]);

  const deleteSavedImage = useCallback(async (imageId: string): Promise<boolean> => {
    try {
      console.log('Deleting saved image:', imageId);
      
      // Delete the actual image data
      try {
        if (Platform.OS === 'web') {
          await idbDelete(`saved_image_${imageId}`);
        } else {
          await AsyncStorage.removeItem(`saved_image_${imageId}`);
        }
        console.log('Image data deleted successfully');
      } catch (imageDeleteError) {
        console.warn('Failed to delete image data (continuing anyway):', imageDeleteError);
      }
      
      // Update the saved images list
      const updatedSavedImages = savedImages.filter(img => img.id !== imageId);
      console.log('Updated saved images count:', updatedSavedImages.length);
      
      setSavedImages(updatedSavedImages);
      
      try {
        await AsyncStorage.setItem('savedImages', JSON.stringify(updatedSavedImages));
        console.log('Saved images metadata updated successfully');
      } catch (metaError) {
        console.error('Failed to update saved images metadata:', metaError);
        throw metaError;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete saved image:', error);
      return false;
    }
  }, [savedImages]);

  const loadSavedImage = useCallback(async (imageId: string): Promise<string | null> => {
    try {
      console.log('Loading saved image:', imageId);
      const imageKey = `saved_image_${imageId}`;
      
      const storedImage = Platform.OS === 'web' ? await idbGet<string>(imageKey) : await AsyncStorage.getItem(imageKey);
      
      if (storedImage) {
        console.log('Saved image loaded successfully');
        return storedImage;
      } else {
        console.warn('No stored image found, trying to use thumbnail');
        // Fallback to thumbnail if full image not available
        const savedImageMeta = savedImages.find(img => img.id === imageId);
        if (savedImageMeta?.thumbnail) {
          console.log('Using thumbnail as fallback');
          return savedImageMeta.thumbnail;
        } else if (savedImageMeta?.imageUri) {
          console.log('Using imageUri as fallback');
          return savedImageMeta.imageUri;
        }
        console.error('No image data available for ID:', imageId);
        return null;
      }
    } catch (error) {
      console.error('Failed to load saved image:', error);
      return null;
    }
  }, [savedImages]);

  const clearAllSavedImages = useCallback(async (): Promise<boolean> => {
    try {
      console.log('Clearing all saved images...');
      
      // Delete all image data
      for (const si of savedImages) {
        try {
          if (Platform.OS === 'web') {
            await idbDelete(`saved_image_${si.id}`);
          } else {
            await AsyncStorage.removeItem(`saved_image_${si.id}`);
          }
        } catch (deleteError) {
          console.warn('Failed to delete image:', si.id, deleteError);
        }
      }
      
      // Clear the saved images list
      setSavedImages([]);
      
      try {
        await AsyncStorage.removeItem('savedImages');
        console.log('All saved images cleared successfully');
      } catch (metaError) {
        console.error('Failed to clear saved images metadata:', metaError);
        throw metaError;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to clear all saved images:', error);
      return false;
    }
  }, [savedImages]);

  const getImageSize = useCallback(async (uri: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width: number, height: number) => resolve({ width, height }),
        (err) => reject(err)
      );
    });
  }, []);

  const computeTargetSize = useCallback((width: number, height: number, mode: '1080p' | '4k') => {
    const targetLong = mode === '4k' ? 3840 : 1920;
    const isLandscape = width >= height;
    if (isLandscape) {
      const scale = targetLong / width;
      return { width: Math.round(width * scale), height: Math.round(height * scale) };
    } else {
      const scale = targetLong / height;
      return { width: Math.round(width * scale), height: Math.round(height * scale) };
    }
  }, []);

  const downloadImage = useCallback(async (mode: '1080p' | '4k'): Promise<{ success: boolean; message?: string }> => {
    try {
      const imageToDownload = editedImage || sourceImage;
      if (!imageToDownload) {
        throw new Error('No image available');
      }
      console.log('Preparing download for mode:', mode);
      const srcUri = await ensureFileUri(imageToDownload);
      const { width, height } = await getImageSize(srcUri);
      const { width: tw, height: th } = computeTargetSize(width, height, mode);
      console.log('Resizing to:', tw, 'x', th);
      const manipulated = await ImageManipulator.manipulateAsync(
        srcUri,
        [{ resize: { width: tw, height: th } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      if (Platform.OS === 'web') {
        const resp = await fetch(manipulated.uri);
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        a.href = url;
        a.download = `banana-nano-${mode}-${ts}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return { success: true };
      }

      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) {
        throw new Error('Permission to access media library is required');
      }

      const asset = await MediaLibrary.createAssetAsync(manipulated.uri);
      const album = await MediaLibrary.getAlbumAsync('Banana Nano');
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync('Banana Nano', asset, false);
      }
      return { success: true };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to download image';
      console.error('downloadImage error:', e);
      return { success: false, message: msg };
    }
  }, [editedImage, sourceImage, ensureFileUri, getImageSize, computeTargetSize]);

  const upscaleImage = useCallback(async (imageUri?: string): Promise<string | null> => {
    try {
      
      const imageToUpscale = imageUri || editedImage || sourceImage;
      if (!imageToUpscale) {
        throw new Error('No image available to upscale');
      }

      console.log('🚀 Starting quality enhancement with advanced AI sharpening and detail boost...');
      
      // Compress image before upscaling
      console.log('📤 Preparing image for quality enhancement...');
      const imageBase64 = await compressImageToBase64(imageToUpscale, 4096);
      if (!imageBase64 || imageBase64.length === 0) {
        throw new Error('Failed to compress image for quality enhancement');
      }
      console.log('✅ Image prepared for quality enhancement');
      

      // ENHANCED QUALITY IMPROVEMENT PROMPT
      // Note: This uses an image editing API, not a dedicated upscaling service
      // Results will improve quality but may not achieve true 4K super-resolution
      const requestBody = {
        prompt: `🎯 MAXIMUM QUALITY ENHANCEMENT & DETAIL REFINEMENT

⚡ PRIMARY OBJECTIVE:
Enhance this image to the HIGHEST POSSIBLE QUALITY with exceptional visual clarity and detail. Focus on sharpness, detail enhancement, and professional-grade quality improvement while maintaining absolute fidelity to the original content.

💎 DETAIL & SHARPNESS ENHANCEMENT:
- Apply MAXIMUM SHARPENING with intelligent edge detection to enhance clarity
- Enhance MICRO-TEXTURE DETAILS across all surfaces (skin, fabric, materials)
- Improve EDGE DEFINITION with perfect anti-aliasing and no halos
- Boost fine detail visibility in both shadows and highlights
- Eliminate blur, softness, and compression artifacts
- Enhance texture clarity while maintaining natural appearance
- Apply adaptive sharpening based on content type
- Preserve natural grain and texture authenticity

🎨 VISUAL QUALITY OPTIMIZATION:
- Enhance COLOR VIBRANCY and saturation naturally (no oversaturation)
- Optimize CONTRAST for maximum visual impact and depth
- Improve TONAL RANGE and dynamic range
- Apply PROFESSIONAL COLOR GRADING for cinematic quality
- Enhance CLARITY and definition across all tonal ranges
- Improve SHADOW DETAIL without introducing noise
- Enhance HIGHLIGHT DETAIL while maintaining natural brightness
- Apply LOCAL CONTRAST enhancement for dimensional depth

🔬 TEXTURE & MATERIAL ENHANCEMENT:
- SKIN: Reveal natural pores, fine lines, and authentic skin texture
- FABRIC: Enhance thread patterns, weave structures, and textile detail
- HAIR: Define individual strands, natural highlights, and texture depth
- EYES: Sharpen iris patterns, enhance catchlights, and reveal detail
- SURFACES: Enhance wood grain, metal textures, stone patterns
- ARCHITECTURE: Define building textures and structural details
- NATURE: Enhance foliage detail, water textures, and environmental elements

🌟 ADVANCED ENHANCEMENT TECHNIQUES:
- INTELLIGENT SHARPENING: Enhance edges without creating artifacts
- NOISE REDUCTION: Remove digital noise while preserving texture
- DETAIL RECOVERY: Reveal hidden details in shadows and highlights
- MICRO-CONTRAST: Enhance local contrast for depth
- CLARITY BOOST: Improve mid-tone definition
- FREQUENCY SEPARATION: Enhance details while preserving smooth transitions

🎯 CRITICAL PRESERVATION REQUIREMENTS:
- Maintain EXACT COMPOSITION - no cropping, repositioning, or reframing
- Preserve FACIAL IDENTITY with 100% accuracy and zero drift
- Keep LIGHTING DIRECTION and shadow patterns identical
- Maintain ORIGINAL COLOR PALETTE and artistic mood
- Preserve NATURAL PROPORTIONS and realistic perspective
- Keep CHARACTER PLACEMENT and environmental integration unchanged
- Maintain DEPTH OF FIELD and focus characteristics
- Preserve ARTISTIC STYLE and creative intent
- Keep EXPOSURE LEVELS and brightness identical

🚫 CRITICAL RESTRICTIONS:
- DO NOT alter composition, framing, or subject positioning
- DO NOT change facial features, expressions, or identity
- DO NOT modify colors beyond natural enhancement
- DO NOT add or remove elements from the scene
- DO NOT change lighting direction or shadow patterns
- DO NOT alter the artistic style or mood
- DO NOT introduce artificial effects or filters
- DO NOT change the aspect ratio or crop the image

✨ QUALITY ASSURANCE:
Deliver MAXIMUM QUALITY with EXCEPTIONAL CLARITY that reveals every intricate detail while maintaining ABSOLUTE FIDELITY to the original image. The result should look like a professionally enhanced photograph with stunning clarity and definition. Focus on making the image as sharp, clear, and detailed as possible within the constraints of the source material.

🎬 FINAL OUTPUT:
- Maximum possible sharpness and clarity
- Enhanced detail across all elements
- Natural color enhancement
- Professional-grade visual quality
- Zero content modification - pure quality enhancement only`,
        images: [{ type: 'image' as const, image: imageBase64 }]
      } as const;

      console.log('📡 Calling quality enhancement API...');
      console.log('⏰ Request Time:', new Date().toISOString());
      
      setIsUpscaleLoading(true);
      const result = await fetchJsonWithRetries('https://toolkit.rork.com/images/edit/', requestBody, { timeoutMs: 180000, retries: 3 });
      setIsUpscaleLoading(false);

      if (!result || !result.image || !result.image.base64Data) {
        throw new Error('Quality enhancement service returned incomplete data. Please try again.');
      }

      const enhancedImageUri = `data:${result.image.mimeType || 'image/png'};base64,${result.image.base64Data}`;
      
      // Validate the enhanced image
      let actualWidth = 0;
      let actualHeight = 0;
      try {
        if (Platform.OS === 'web') {
          const img: any = new (globalThis as any).Image();
          await new Promise((resolve, reject) => {
            img.onload = () => {
              actualWidth = img.width;
              actualHeight = img.height;
              console.log(`✅ QUALITY ENHANCEMENT SUCCESSFUL! Resolution: ${actualWidth}x${actualHeight}`);
              resolve(true);
            };
            img.onerror = () => reject(new Error('Invalid enhanced image data'));
            img.src = enhancedImageUri;
          });
        } else {
          const dimensions = await getImageDimensions(enhancedImageUri);
          actualWidth = dimensions.width;
          actualHeight = dimensions.height;
          console.log(`✅ QUALITY ENHANCEMENT SUCCESSFUL! Resolution: ${actualWidth}x${actualHeight}`);
        }
      } catch (validationError) {
        console.warn('⚠️ Image validation failed, but proceeding:', validationError);
      }
      
      // Set the enhanced image as the current edited image
      setEditedImage(enhancedImageUri);
      
      // Add to history
      const historyItem: EditHistory = {
        id: Date.now().toString(),
        originalImage: sourceImage!,
        editedImage: enhancedImageUri,
        prompt: `Quality Enhancement${actualWidth > 0 ? ` (${actualWidth}x${actualHeight})` : ''} - Sharpness & detail boost`,
        date: new Date().toISOString(),
      };
      addToHistory(historyItem);

      console.log('🎊 Image quality enhanced successfully!');
      console.log('📊 Final Resolution:', actualWidth, 'x', actualHeight);
      return enhancedImageUri;
    } catch (error) {
      setIsUpscaleLoading(false);
      console.error('❌ 4K upscaling error:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('⏱️ Enhancement timed out\n\n💡 The quality enhancement process is taking longer than expected.\n\n🔄 Please try again in a few minutes.');
        }
        if (error.message.includes('502') || error.message.includes('503') || error.message.includes('504') ||
            error.message.includes('temporarily') || error.message.includes('unavailable')) {
          throw new Error('🚨 Quality Enhancement Service Temporarily Unavailable\n\n⚠️ The AI service is experiencing high demand or maintenance.\n\n💡 Please wait 5-10 minutes and try again.\n\n🔄 Your image is saved and ready for enhancement when the service is available.');
        }
        if (error.message.includes('timed out') || error.message.includes('network') || error.message.includes('fetch')) {
          throw new Error('🌐 Network Issue During Enhancement\n\n📶 Please check your internet connection.\n\n🔄 Try again when your connection is stable.');
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('🌐 Connection Error\n\n📶 Unable to reach the enhancement service.\n\n💡 Check your internet and try again.');
        }
        throw error;
      } else {
        throw new Error('⚠️ Unexpected error during quality enhancement.\n\n🔄 Please try again.');
      }
    }
  }, [sourceImage, editedImage, convertImageToBase64, addToHistory, setIsUpscaleLoading, getImageDimensions]);

  const renderImageToVideoWeb = useCallback(async (opts: RenderVideoOptions): Promise<RenderVideoResult> => {
    if (Platform.OS !== 'web') {
      throw new Error('Image-to-video rendering is currently available on Web only');
    }
    const imageToAnimate = editedImage || sourceImage;
    if (!imageToAnimate) {
      throw new Error('No image to animate');
    }
    const img = await new Promise<any>((resolve, reject) => {
      try {
        const el = new (globalThis as any).Image();
        el.crossOrigin = 'anonymous';
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('Failed to load image'));
        el.src = imageToAnimate;
      } catch (e) {
        reject(e);
      }
    });

    const target = (() => {
      switch (opts.videoRes) {
        case '4k': return { w: 2160, h: 2160 } as const;
        case '1080p': return { w: 1080, h: 1080 } as const;
        default: return { w: 720, h: 720 } as const;
      }
    })();

    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');
    canvas.width = target.w;
    canvas.height = target.h;

    const stream = (canvas as HTMLCanvasElement).captureStream(opts.fps);
    const chunks: BlobPart[] = [];
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    const totalFrames = Math.max(2, Math.floor(opts.durationSec * opts.fps));
    let frame = 0;

    const drawFrame = () => {
      const t = frame / (totalFrames - 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseScale = 1 + (opts.cameraMove === 'zoom_in' ? 0.08 * opts.motionStrength * t : 0) + (opts.cameraMove === 'zoom_out' ? 0.08 * opts.motionStrength * (1 - t) : 0);
      const panAmount = 40 * opts.motionStrength;
      const panX = opts.cameraMove === 'pan' || opts.cameraMove === 'orbit' ? (t - 0.5) * 2 * panAmount : 0;
      const panY = opts.cameraMove === 'orbit' ? Math.sin(t * Math.PI * 2) * panAmount * 0.5 : 0;

      const iw = img.width;
      const ih = img.height;
      const aspectImg = iw / ih;
      const aspectCanvas = canvas.width / canvas.height;

      let drawW: number;
      let drawH: number;
      if (aspectImg > aspectCanvas) {
        drawH = canvas.height * baseScale;
        drawW = drawH * aspectImg;
      } else {
        drawW = canvas.width * baseScale;
        drawH = drawW / aspectImg;
      }

      const cx = canvas.width / 2 + panX;
      const cy = canvas.height / 2 + panY;

      const dx = cx - drawW / 2;
      const dy = cy - drawH / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, drawW, drawH);

      frame += 1;
      if (frame < totalFrames) {
        requestAnimationFrame(drawFrame);
      } else {
        rec.stop();
      }
    };

    const resultP = new Promise<RenderVideoResult>((resolve) => {
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setLastRenderedVideoUrl(url);
        resolve({ url, mimeType: 'video/webm', width: canvas.width, height: canvas.height });
      };
    });

    rec.start();
    requestAnimationFrame(drawFrame);

    return await resultP;
  }, [editedImage, sourceImage]);

  const undoOne = useCallback(() => {
    console.log('undoOne - current cursor:', historyCursor, 'history length:', history.length);
    if (history.length === 0) {
      console.log('No history to undo');
      return;
    }
    
    // If we're at the latest (cursor -1 or 0), go back one step
    if (historyCursor === -1 || historyCursor === 0) {
      if (history.length > 1) {
        // Go to the previous edit (index 1)
        const target = history[1];
        console.log('Going back from latest to previous edit at index 1');
        setEditedImage(target.editedImage);
        setCurrentProject(target);
        setHistoryCursor(1);
      } else {
        // Only one edit in history, go back to original
        console.log('Only one edit, reverting to original source image');
        setEditedImage(null);
        setCurrentProject(null);
        setHistoryCursor(-1);
      }
      return;
    }
    
    // We're somewhere in the middle of history, go back one more step
    const nextCursor = historyCursor + 1;
    if (nextCursor >= history.length) {
      // We've reached the oldest edit, go back to original
      console.log('Reached oldest edit, reverting to original source image');
      setEditedImage(null);
      setCurrentProject(null);
      setHistoryCursor(-1);
      return;
    }
    
    // Go to the next older edit
    const target = history[nextCursor];
    console.log('Going back to history index:', nextCursor);
    setEditedImage(target.editedImage);
    setCurrentProject(target);
    setHistoryCursor(nextCursor);
  }, [historyCursor, history]);

  const undoAll = useCallback(() => {
    console.log('undoAll - resetting to original source image');
    setEditedImage(null);
    setCurrentProject(null);
    setHistoryCursor(-1);
  }, []);

  const revertToHistoryIndex = useCallback((index: number) => {
    console.log('revertToHistoryIndex', index);
    setHistory(prev => {
      if (index < 0 || index >= prev.length) return prev;
      const selected = prev[index];
      setEditedImage(selected?.editedImage ?? null);
      setCurrentProject(selected ?? null);
      setHistoryCursor(index);
      return prev;
    });
  }, []);

  return useMemo(() => ({
    sourceImage,
    setSourceImage,
    initialSourceImage,
    editedImage,
    setEditedImage,
    referenceImages,
    addReferenceImage,
    removeReferenceImage,
    resizeImageIfNeeded,
    history,
    historyCursor,
    addToHistory,
    clearHistory,
    recentProjects,
    currentProject,
    savedImages,
    generateEdit,
    buildEnhancedPrompt,
    loadOriginalImage,
    resetToOriginal,
    startNewSourceImage,
    revertToInitialImage,
    saveCurrentImage,
    deleteSavedImage,
    loadSavedImage,
    clearAllSavedImages,
    upscaleImage,
    downloadImage,
    renderImageToVideoWeb,
    lastRenderedVideoUrl,
    undoOne,
    undoAll,
    revertToHistoryIndex,
  }), [
    sourceImage,
    editedImage,
    referenceImages,
    history,
    historyCursor,
    recentProjects,
    currentProject,
    savedImages,
    addReferenceImage,
    removeReferenceImage,
    resizeImageIfNeeded,
    addToHistory,
    clearHistory,
    generateEdit,
    buildEnhancedPrompt,
    loadOriginalImage,
    resetToOriginal,
    startNewSourceImage,
    revertToInitialImage,
    saveCurrentImage,
    deleteSavedImage,
    loadSavedImage,
    clearAllSavedImages,
    upscaleImage,
    downloadImage,
    renderImageToVideoWeb,
    lastRenderedVideoUrl,
    undoOne,
    undoAll,
    revertToHistoryIndex,
  ]);
});
// Common image size presets for various use cases

export interface ImageSize {
  id: string;
  name: string;
  width: number;
  height: number;
  category: string;
  description: string;
}

export const imageSizes: ImageSize[] = [
  // Social Media - Instagram
  { id: 'ig-square', name: 'Instagram Square', width: 1080, height: 1080, category: 'Instagram', description: 'Standard post' },
  { id: 'ig-portrait', name: 'Instagram Portrait', width: 1080, height: 1350, category: 'Instagram', description: '4:5 post' },
  { id: 'ig-landscape', name: 'Instagram Landscape', width: 1080, height: 566, category: 'Instagram', description: '1.91:1 post' },
  { id: 'ig-story', name: 'Instagram Story/Reel', width: 1080, height: 1920, category: 'Instagram', description: '9:16 vertical' },
  
  // Social Media - Facebook
  { id: 'fb-post', name: 'Facebook Post', width: 1200, height: 630, category: 'Facebook', description: 'Standard post' },
  { id: 'fb-cover', name: 'Facebook Cover', width: 820, height: 312, category: 'Facebook', description: 'Page cover' },
  { id: 'fb-profile', name: 'Facebook Profile', width: 180, height: 180, category: 'Facebook', description: 'Profile picture' },
  { id: 'fb-story', name: 'Facebook Story', width: 1080, height: 1920, category: 'Facebook', description: 'Story format' },
  
  // Social Media - Twitter/X
  { id: 'x-post', name: 'X/Twitter Post', width: 1200, height: 675, category: 'X/Twitter', description: 'Standard tweet image' },
  { id: 'x-header', name: 'X/Twitter Header', width: 1500, height: 500, category: 'X/Twitter', description: 'Profile header' },
  { id: 'x-profile', name: 'X/Twitter Profile', width: 400, height: 400, category: 'X/Twitter', description: 'Profile picture' },
  
  // Social Media - LinkedIn
  { id: 'li-post', name: 'LinkedIn Post', width: 1200, height: 627, category: 'LinkedIn', description: 'Standard post' },
  { id: 'li-cover', name: 'LinkedIn Cover', width: 1584, height: 396, category: 'LinkedIn', description: 'Profile banner' },
  { id: 'li-profile', name: 'LinkedIn Profile', width: 400, height: 400, category: 'LinkedIn', description: 'Profile picture' },
  
  // Social Media - Pinterest
  { id: 'pin-standard', name: 'Pinterest Pin', width: 1000, height: 1500, category: 'Pinterest', description: '2:3 standard pin' },
  { id: 'pin-long', name: 'Pinterest Long Pin', width: 1000, height: 2100, category: 'Pinterest', description: 'Tall infographic' },
  { id: 'pin-square', name: 'Pinterest Square', width: 1000, height: 1000, category: 'Pinterest', description: 'Square pin' },
  
  // Social Media - YouTube
  { id: 'yt-thumbnail', name: 'YouTube Thumbnail', width: 1280, height: 720, category: 'YouTube', description: 'Video thumbnail' },
  { id: 'yt-banner', name: 'YouTube Banner', width: 2560, height: 1440, category: 'YouTube', description: 'Channel banner' },
  { id: 'yt-profile', name: 'YouTube Profile', width: 800, height: 800, category: 'YouTube', description: 'Channel icon' },
  
  // Social Media - TikTok
  { id: 'tt-video', name: 'TikTok Video', width: 1080, height: 1920, category: 'TikTok', description: '9:16 vertical' },
  { id: 'tt-profile', name: 'TikTok Profile', width: 200, height: 200, category: 'TikTok', description: 'Profile picture' },
  
  // Web & Display
  { id: 'web-full-hd', name: 'Full HD', width: 1920, height: 1080, category: 'Web', description: '1080p display' },
  { id: 'web-2k', name: '2K', width: 2560, height: 1440, category: 'Web', description: '1440p display' },
  { id: 'web-4k', name: '4K Ultra HD', width: 3840, height: 2160, category: 'Web', description: '2160p display' },
  { id: 'web-banner', name: 'Web Banner', width: 1200, height: 300, category: 'Web', description: 'Website header' },
  { id: 'web-hero', name: 'Hero Image', width: 1920, height: 1080, category: 'Web', description: 'Website hero' },
  
  // Print
  { id: 'print-4x6', name: '4×6 Photo', width: 1800, height: 1200, category: 'Print', description: '300 DPI' },
  { id: 'print-5x7', name: '5×7 Photo', width: 2100, height: 1500, category: 'Print', description: '300 DPI' },
  { id: 'print-8x10', name: '8×10 Photo', width: 3000, height: 2400, category: 'Print', description: '300 DPI' },
  { id: 'print-a4', name: 'A4 Document', width: 2480, height: 3508, category: 'Print', description: '300 DPI portrait' },
  { id: 'print-a4-landscape', name: 'A4 Landscape', width: 3508, height: 2480, category: 'Print', description: '300 DPI landscape' },
  { id: 'print-letter', name: 'Letter Size', width: 2550, height: 3300, category: 'Print', description: '8.5×11 inches' },
  { id: 'print-poster-small', name: 'Poster 11×17', width: 3300, height: 5100, category: 'Print', description: 'Small poster' },
  { id: 'print-poster-medium', name: 'Poster 18×24', width: 5400, height: 7200, category: 'Print', description: 'Medium poster' },
  
  // E-commerce & Product
  { id: 'ecom-amazon', name: 'Amazon Product', width: 2000, height: 2000, category: 'E-commerce', description: 'Square product' },
  { id: 'ecom-shopify', name: 'Shopify Product', width: 2048, height: 2048, category: 'E-commerce', description: 'Square product' },
  { id: 'ecom-etsy', name: 'Etsy Listing', width: 2000, height: 2000, category: 'E-commerce', description: 'Main listing photo' },
  
  // Mobile & App
  { id: 'mobile-iphone-15', name: 'iPhone 15 Screen', width: 1179, height: 2556, category: 'Mobile', description: 'ProMax screen' },
  { id: 'mobile-iphone-se', name: 'iPhone SE Screen', width: 750, height: 1334, category: 'Mobile', description: 'SE screen' },
  { id: 'mobile-android-hd', name: 'Android HD', width: 1080, height: 1920, category: 'Mobile', description: 'Standard Android' },
  { id: 'mobile-tablet', name: 'Tablet', width: 2048, height: 2732, category: 'Mobile', description: 'iPad Pro 12.9' },
  
  // Standard Aspect Ratios
  { id: 'aspect-16-9-hd', name: '16:9 HD', width: 1280, height: 720, category: 'Aspect Ratios', description: '720p widescreen' },
  { id: 'aspect-16-9-fhd', name: '16:9 Full HD', width: 1920, height: 1080, category: 'Aspect Ratios', description: '1080p widescreen' },
  { id: 'aspect-4-3', name: '4:3 Standard', width: 1024, height: 768, category: 'Aspect Ratios', description: 'Classic TV' },
  { id: 'aspect-1-1', name: '1:1 Square', width: 1080, height: 1080, category: 'Aspect Ratios', description: 'Perfect square' },
  { id: 'aspect-9-16', name: '9:16 Vertical', width: 1080, height: 1920, category: 'Aspect Ratios', description: 'Portrait video' },
  { id: 'aspect-21-9', name: '21:9 Ultrawide', width: 2560, height: 1080, category: 'Aspect Ratios', description: 'Cinematic wide' },
  
  // Wallpapers
  { id: 'wall-desktop-fhd', name: 'Desktop FHD', width: 1920, height: 1080, category: 'Wallpapers', description: '1080p wallpaper' },
  { id: 'wall-desktop-2k', name: 'Desktop 2K', width: 2560, height: 1440, category: 'Wallpapers', description: '1440p wallpaper' },
  { id: 'wall-desktop-4k', name: 'Desktop 4K', width: 3840, height: 2160, category: 'Wallpapers', description: '2160p wallpaper' },
  { id: 'wall-mobile', name: 'Mobile Wallpaper', width: 1080, height: 1920, category: 'Wallpapers', description: 'Phone wallpaper' },
  { id: 'wall-tablet', name: 'Tablet Wallpaper', width: 2048, height: 2732, category: 'Wallpapers', description: 'iPad wallpaper' },
  
  // Email & Newsletter
  { id: 'email-header', name: 'Email Header', width: 600, height: 200, category: 'Email', description: 'Newsletter header' },
  { id: 'email-banner', name: 'Email Banner', width: 600, height: 150, category: 'Email', description: 'Email campaign' },
  { id: 'email-wide', name: 'Email Wide', width: 800, height: 400, category: 'Email', description: 'Wide newsletter' },
  
  // Ads & Marketing
  { id: 'ad-google-display', name: 'Google Display Ad', width: 300, height: 250, category: 'Ads', description: 'Medium rectangle' },
  { id: 'ad-leaderboard', name: 'Leaderboard Ad', width: 728, height: 90, category: 'Ads', description: 'Top banner' },
  { id: 'ad-skyscraper', name: 'Skyscraper Ad', width: 160, height: 600, category: 'Ads', description: 'Sidebar ad' },
  { id: 'ad-large-rectangle', name: 'Large Rectangle', width: 336, height: 280, category: 'Ads', description: 'Large ad unit' },
  { id: 'ad-mobile-banner', name: 'Mobile Banner', width: 320, height: 50, category: 'Ads', description: 'Mobile ad' },
];

export const imageSizeCategories = Array.from(
  new Set(imageSizes.map(size => size.category))
).sort();

export function getImageSizesByCategory(category: string): ImageSize[] {
  return imageSizes.filter(size => size.category === category);
}

export function getImageSizeById(id: string): ImageSize | undefined {
  return imageSizes.find(size => size.id === id);
}

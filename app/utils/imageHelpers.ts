// Helper functions for managing images and placeholders

// Get color values for different page types
export const getPageColors = (pageName: string) => {
  const colors: Record<string, { primary: string, secondary: string }> = {
    'home': { primary: '#0D47A1', secondary: '#1565C0' },      // Blue
    'about': { primary: '#1A237E', secondary: '#283593' },     // Deep Blue
    'services': { primary: '#01579B', secondary: '#0277BD' },  // Light Blue
    'portfolio': { primary: '#004D40', secondary: '#00695C' }, // Teal
    'team': { primary: '#311B92', secondary: '#4527A0' },      // Purple
    'contact': { primary: '#880E4F', secondary: '#AD1457' },   // Pink
    'default': { primary: '#0D47A1', secondary: '#1565C0' },   // Default Blue
  };

  // Normalize the page name (extract from path if needed)
  const normalizedName = pageName.toLowerCase().split('/').pop()?.split('-')[0] || 'default';
  
  return colors[normalizedName] || colors.default;
};

// Generate inline SVG data URLs
export const generateImagePlaceholder = (
  name: string, 
  width: number = 1200,
  height: number = 800,
  primaryColor: string = '#0D47A1',
  secondaryColor: string = '#1565C0'
) => {
  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="none"/>
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.5">${name}</text>
  </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Helper to determine if an image path is a real image
export const isRealImage = (path: string) => {
  if (!path) return false;
  
  // Check if it's a remote URL
  if (path.startsWith('http')) return true;
  
  // Check if it's a local image
  if (path.startsWith('/') && /\.(jpg|jpeg|png|gif|webp)$/i.test(path)) return true;
  
  return false;
};

// Get placeholder or real image based on what's available
export const getImageSrc = (imagePath: string, fallbackName: string = 'Image') => {
  if (isRealImage(imagePath)) {
    return imagePath;
  }
  
  // Extract page name from path
  const pageName = imagePath.split('/').pop()?.split('.')[0] || fallbackName;
  const colors = getPageColors(pageName);
  
  return generateImagePlaceholder(
    fallbackName || pageName,
    1200,
    800,
    colors.primary,
    colors.secondary
  );
}; 
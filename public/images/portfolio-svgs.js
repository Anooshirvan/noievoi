// This script generates placeholder SVGs for portfolio project images
// In a real app, you would use actual images instead

const generatePortfolioSvg = (name, primaryColor, secondaryColor) => {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
    </linearGradient>
    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="url(#smallGrid)"/>
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </pattern>
  </defs>
  
  <rect width="100%" height="100%" fill="url(#grad)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  
  <!-- Project-specific elements -->
  <rect x="100" y="150" width="300" height="300" rx="0" fill="rgba(255,255,255,0.15)"/>
  <rect x="800" y="350" width="250" height="250" rx="125" fill="rgba(255,255,255,0.1)"/>
  <rect x="500" y="500" width="150" height="150" rx="10" fill="rgba(255,255,255,0.2)"/>
  
  <rect x="150" y="200" width="200" height="40" rx="5" fill="rgba(255,255,255,0.3)"/>
  <rect x="150" y="260" width="150" height="20" rx="5" fill="rgba(255,255,255,0.2)"/>
  <rect x="150" y="300" width="180" height="20" rx="5" fill="rgba(255,255,255,0.2)"/>
  
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
    font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="rgba(255,255,255,0.4)">
    ${name}
  </text>
</svg>`;
};

// Portfolio projects with different colors for visual distinction
const projects = [
  { name: 'Manufacturing', file: 'portfolio-manufacturing.svg', primary: '#0D47A1', secondary: '#1565C0' },
  { name: 'Energy', file: 'portfolio-energy.svg', primary: '#1B5E20', secondary: '#2E7D32' },
  { name: 'Infrastructure', file: 'portfolio-infrastructure.svg', primary: '#311B92', secondary: '#4527A0' },
  { name: 'Industrial', file: 'portfolio-industrial.svg', primary: '#BF360C', secondary: '#E64A19' },
  { name: 'Logistics', file: 'portfolio-logistics.svg', primary: '#01579B', secondary: '#0277BD' },
  { name: 'Healthcare', file: 'portfolio-healthcare.svg', primary: '#880E4F', secondary: '#AD1457' },
];

// In a real app, this would write the SVGs to files
projects.forEach(project => {
  const svg = generatePortfolioSvg(project.name, project.primary, project.secondary);
  console.log(`Generated ${project.file}`);
}); 
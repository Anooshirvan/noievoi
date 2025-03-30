// This is a script to generate placeholder SVGs for hero images
// In a real application, you would use actual images

const fs = require('fs');
const path = require('path');

const generateSvg = (name, primaryColor, secondaryColor) => {
  return `<svg width="1800" height="800" xmlns="http://www.w3.org/2000/svg">
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
    <g>
      <rect x="200" y="100" width="300" height="300" rx="20" fill="rgba(255,255,255,0.1)"/>
      <rect x="1300" y="400" width="200" height="200" rx="100" fill="rgba(255,255,255,0.1)"/>
      <rect x="600" y="500" width="150" height="150" rx="20" fill="rgba(255,255,255,0.1)"/>
    </g>
    <text x="50%" y="50%" font-family="Arial" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.6">${name}</text>
  </svg>`;
};

const pages = [
  { name: 'Home Hero Image', file: 'home-hero.svg', primary: '#0D47A1', secondary: '#1565C0' },
  { name: 'About Us Banner', file: 'about-hero.svg', primary: '#1A237E', secondary: '#283593' },
  { name: 'Services Banner', file: 'services-hero.svg', primary: '#01579B', secondary: '#0277BD' },
  { name: 'Portfolio Projects', file: 'portfolio-hero.svg', primary: '#004D40', secondary: '#00695C' },
  { name: 'Team Members', file: 'team-hero.svg', primary: '#311B92', secondary: '#4527A0' },
  { name: 'Contact Us', file: 'contact-hero.svg', primary: '#880E4F', secondary: '#AD1457' },
];

// Create SVGs
pages.forEach(page => {
  const svg = generateSvg(page.name, page.primary, page.secondary);
  // In a real environment, this would write files to disk
  console.log(`Generated ${page.file}`);
}); 
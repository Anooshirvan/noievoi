import React from 'react';

export const generateImagePlaceholder = (name: string, bgColor: string = 'bg-secondary', patternType: 'dots' | 'lines' | 'grid' = 'grid') => {
  const pattern = {
    dots: {
      background: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
      backgroundSize: '20px 20px'
    },
    lines: {
      background: `
        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px'
    },
    grid: {
      background: `
        linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%),
        linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)
      `,
      backgroundSize: '60px 60px',
      backgroundPosition: '0 0, 30px 30px'
    }
  };

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1F2937"/>
      <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.5">${name}</text>
    </svg>`
  )}`;
};

// Pregenerated image placeholders
export const heroImages = {
  home: '/images/home-hero.jpg',
  about: '/images/about-hero.jpg',
  services: '/images/services-hero.jpg',
  portfolio: '/images/portfolio-hero.jpg',
  team: '/images/team-hero.jpg',
  contact: '/images/contact-hero.jpg',
};

// This is a function to be used in production for real images
// For development, we're using the placeholders above
export const getHeroImage = (pageName: string) => {
  return heroImages[pageName as keyof typeof heroImages] || heroImages.home;
}; 
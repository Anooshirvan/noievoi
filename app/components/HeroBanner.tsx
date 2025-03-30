import React from 'react';
import { getPageColors, isRealImage } from '../utils/imageHelpers';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imagePath: string;
  height?: 'small' | 'medium' | 'large';
  overlayOpacity?: 'light' | 'medium' | 'dark';
}

const HeroBanner = ({ 
  title, 
  subtitle, 
  imagePath, 
  height = 'medium',
  overlayOpacity = 'medium'
}: HeroBannerProps) => {
  const heightClass = {
    small: 'min-h-[300px]',
    medium: 'min-h-[400px]',
    large: 'min-h-[500px]',
  }[height];

  const overlayClass = {
    light: 'bg-gradient-to-r from-secondary/70 to-secondary/50',
    medium: 'bg-gradient-to-r from-secondary/80 to-secondary/60',
    dark: 'bg-gradient-to-r from-secondary/90 to-secondary/70',
  }[overlayOpacity];

  // Extract page name from imagePath for color theming
  const pageName = imagePath.split('/').pop()?.split('-')[0] || 'default';
  const colors = getPageColors(pageName);

  // Create an SVG placeholder background with gradients and patterns
  const createPlaceholderSvg = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`grad-${pageName}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colors.secondary, stopOpacity: 1 }} />
            </linearGradient>
            <pattern id={`grid-${pageName}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none"/>
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grad-${pageName})`}/>
          <rect width="100%" height="100%" fill={`url(#grid-${pageName})`}/>
          <g>
            <rect x="20%" y="20%" width="20%" height="30%" rx="20" fill="rgba(255,255,255,0.1)"/>
            <rect x="70%" y="50%" width="15%" height="25%" rx="100" fill="rgba(255,255,255,0.1)"/>
            <rect x="40%" y="60%" width="10%" height="15%" rx="20" fill="rgba(255,255,255,0.1)"/>
          </g>
        </svg>
      </div>
    );
  };

  // Check if the path is to a real image
  const hasRealImage = isRealImage(imagePath);

  return (
    <div 
      className={`relative ${heightClass} flex items-center py-16 w-full bg-secondary overflow-hidden`}
    >
      {/* Background - either real image or placeholder */}
      {hasRealImage ? (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imagePath})` }}
        />
      ) : (
        createPlaceholderSvg()
      )}
      
      {/* Color overlay */}
      <div className={`absolute inset-0 ${overlayClass} z-0`}></div>
      
      <div className="container-custom relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl opacity-80 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
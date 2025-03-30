'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiGlobe, FiGrid, FiLayers, FiMap } from 'react-icons/fi';
import WorldMapPlaceholder from './WorldMapPlaceholder';
import { useState, useEffect } from 'react';

// Define fixed positions for decorative elements to avoid hydration mismatch
const decorativeElements = [
  { width: 120, height: 120, left: 10, top: 15, delay: 0 },
  { width: 180, height: 180, left: 25, top: 40, delay: 0.7 },
  { width: 150, height: 150, left: 60, top: 20, delay: 1.4 },
  { width: 100, height: 100, left: 40, top: 60, delay: 2.1 },
  { width: 200, height: 200, left: 75, top: 70, delay: 2.8 },
  { width: 130, height: 130, left: 20, top: 80, delay: 3.5 },
  { width: 160, height: 160, left: 50, top: 30, delay: 4.2 },
  { width: 110, height: 110, left: 80, top: 50, delay: 4.9 }
];

// Fixed connection lines
const connectionLines = [
  { top: '20%', rotate: 30 },
  { top: '40%', rotate: 60 },
  { top: '60%', rotate: 90 },
  { top: '80%', rotate: 120 },
  { top: '30%', rotate: 150 },
  { top: '70%', rotate: 180 }
];

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render random elements after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Large Background Image/Gradient - industrial theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-dark z-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url('/images/home-hero.jpg')`,
            // Fallback gradient in case image doesn't load
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/images/home-hero.jpg')`
          }}
        ></div>
        
        {/* Background overlay with pattern */}
        <div className="absolute inset-0 bg-black/30 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary/80"></div>
        </div>
      </div>

      {/* World map overlay - faint in background */}
      <div className="absolute inset-0 opacity-10 z-0">
        <WorldMapPlaceholder />
      </div>

      {/* Decorative Industrial Elements - Only rendered on client side */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden z-0">
          {decorativeElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute bg-primary/15 rounded-lg"
              style={{
                width: `${element.width}px`,
                height: `${element.height}px`,
                left: `${element.left}%`,
                top: `${element.top}%`,
                zIndex: 0,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.7, 0.4], 
                scale: [0, 1.2, 1],
                rotate: [0, 90, 180]
              }}
              transition={{ 
                duration: 8,
                delay: element.delay,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10 px-4 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="text-primary block mb-1 sm:mb-2">Global</span> 
                Industrial Excellence
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mb-6 sm:mb-8 md:mb-10 max-w-xl">
                A multidisciplinary team of industrial experts operating across continents, delivering innovative solutions for complex challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4">
                  Discuss Your Project <FiArrowRight />
                </Link>
                <Link href="/portfolio" className="btn-secondary flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4">
                  Explore Our Work
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-8 md:mt-0"
          >
            {/* Industry Expertise Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {[
                {
                  title: 'Manufacturing',
                  description: 'Advanced production systems and automation solutions',
                  icon: <FiGrid className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4" />,
                  color: 'bg-primary'
                },
                {
                  title: 'Energy',
                  description: 'Sustainable power generation and distribution systems',
                  icon: <FiLayers className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4" />,
                  color: 'bg-accent'
                },
                {
                  title: 'Infrastructure',
                  description: 'Critical infrastructure development and maintenance',
                  icon: <FiMap className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4" />,
                  color: 'bg-accent'
                },
                {
                  title: 'Global Operations',
                  description: 'Teams across 5 continents handling complex projects',
                  icon: <FiGlobe className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4" />,
                  color: 'bg-primary'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`aspect-square rounded-lg ${item.color} p-4 sm:p-6 md:p-8 flex items-center justify-center shadow-xl`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-white text-center">
                    <div className="flex justify-center">{item.icon}</div>
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 md:mb-3">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base opacity-90 line-clamp-3">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 sm:-top-10 sm:-left-10 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-primary/20 -z-10"></div>
            <div className="absolute -bottom-5 -right-5 sm:-bottom-10 sm:-right-10 w-20 h-20 sm:w-40 sm:h-40 rounded-full bg-accent/20 -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-white z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Explore Our Capabilities</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-2 h-2 bg-primary rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 
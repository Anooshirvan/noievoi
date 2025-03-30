'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

interface TeamMemberProps {
  name: string;
  position: string;
  location: string;
  bio: string;
  imageColor: string; // Using color as placeholder for actual image
  index: number;
}

const TeamMember = ({ name, position, location, bio, imageColor, index }: TeamMemberProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden h-full transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        {/* Image placeholder - more size responsive */}
        <div 
          className={`w-full h-48 sm:h-56 md:h-64 ${imageColor} flex items-center justify-center`}
        >
          <span className="text-white text-5xl sm:text-6xl font-bold opacity-80">
            {name.charAt(0)}
          </span>
        </div>
        
        {/* Location badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 text-dark px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          {location}
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3 text-sm sm:text-base">{position}</p>
        <p className="text-dark/70 mb-5 text-sm sm:text-base line-clamp-4">{bio}</p>
        
        {/* Social links */}
        <div className="flex gap-2 sm:gap-3">
          <a 
            href="#" 
            aria-label="LinkedIn Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors"
          >
            <FiLinkedin />
          </a>
          <a 
            href="#" 
            aria-label="Twitter Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors"
          >
            <FiTwitter />
          </a>
          <a 
            href="#" 
            aria-label="Email Contact"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-light flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors"
          >
            <FiMail />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember; 
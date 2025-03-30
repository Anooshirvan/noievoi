'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGlobe } from 'react-icons/fi';
import TeamMember from './TeamMember';

interface TeamMemberType {
  id: string;
  name: string;
  position: string;
  location: string;
  bio: string;
  imageUrl?: string | null;
  imageColor: string;
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/team');
        
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        
        const data = await response.json();
        setTeamMembers(data);
        setError('');
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);
  
  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(teamMembers.map(member => member.location)));
  
  // Filter team members based on search query and location filter
  const filteredTeamMembers = teamMembers.filter(member => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      member.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by location
    const matchesLocation = filterLocation === '' || member.location === filterLocation;
    
    return matchesSearch && matchesLocation;
  });
  
  return (
    <section className="section-padding bg-light">
      <div className="container-custom">
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-dark/70 max-w-3xl mx-auto text-base sm:text-lg">
              Our team of industrial experts operates across the globe, bringing diverse expertise
              and local knowledge to tackle complex engineering and infrastructure challenges.
            </p>
          </motion.div>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative w-full sm:max-w-xs">
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="text-center p-6 bg-red-50 rounded-lg mb-10">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        {/* Loading state */}
        {loading && (
          <div className="text-center p-10">
            <div className="inline-block h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-dark/70">Loading team members...</p>
          </div>
        )}
        
        {/* Team Members Grid */}
        {!loading && filteredTeamMembers.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {filteredTeamMembers.map((member, index) => (
              <TeamMember
                key={member.id}
                name={member.name}
                position={member.position}
                location={member.location}
                bio={member.bio}
                imageColor={member.imageColor}
                index={index}
              />
            ))}
          </motion.div>
        )}
        
        {/* No results message */}
        {!loading && filteredTeamMembers.length === 0 && (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <p className="text-dark/70">No team members found matching your criteria.</p>
          </div>
        )}
        
        {/* Global Presence */}
        <div className="mt-16 text-center pt-10 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <FiGlobe className="text-primary w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-xl sm:text-2xl font-bold">Global Presence</h3>
            </div>
            <p className="text-dark/70 max-w-2xl mx-auto text-sm sm:text-base">
              Our industrial team operates across 5 continents, bringing diverse expertise
              and cultural understanding to every project. This global footprint allows us
              to deliver solutions that respect local requirements while maintaining
              international standards of excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 
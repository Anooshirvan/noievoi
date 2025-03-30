'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';

// Sample portfolio projects
const portfolioProjects = [
  {
    id: '1',
    title: 'Advanced Manufacturing Facility',
    category: 'Manufacturing',
    location: 'Shanghai, China',
    year: '2023',
    imageColor: 'bg-blue-800',
    description: 'Automated production line implementation for a global electronics manufacturer',
  },
  {
    id: '2',
    title: 'Renewable Energy Grid Integration',
    category: 'Energy',
    location: 'Western Australia',
    year: '2022',
    imageColor: 'bg-green-800',
    description: 'Large-scale solar and wind farm integration with national power grid',
  },
  {
    id: '3',
    title: 'Smart City Infrastructure',
    category: 'Infrastructure',
    location: 'São Paulo, Brazil',
    year: '2021',
    imageColor: 'bg-indigo-800',
    description: 'Comprehensive urban management systems for a developing metropolis',
  },
  {
    id: '4',
    title: 'Oil Refinery Modernization',
    category: 'Industrial',
    location: 'Houston, USA',
    year: '2023',
    imageColor: 'bg-slate-800',
    description: 'Complete modernization of control systems for improved efficiency and safety',
  },
  {
    id: '5',
    title: 'Port Logistics Automation',
    category: 'Logistics',
    location: 'Rotterdam, Netherlands',
    year: '2022',
    imageColor: 'bg-cyan-800',
    description: 'AI-driven logistics optimization for one of Europe\'s busiest ports',
  },
  {
    id: '6',
    title: 'Healthcare Facility System Integration',
    category: 'Healthcare',
    location: 'Toronto, Canada',
    year: '2021',
    imageColor: 'bg-purple-800',
    description: 'Integrated monitoring and control systems for a major medical complex',
  },
];

const PortfolioSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <h2 className="text-4xl font-bold">
                Our <span className="text-primary">Featured Projects</span>
              </h2>
              
              <div className="flex gap-4">
                <select className="px-4 py-2 rounded-md border border-dark/10 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>All Categories</option>
                  <option>Manufacturing</option>
                  <option>Energy</option>
                  <option>Infrastructure</option>
                  <option>Logistics</option>
                </select>
                
                <select className="px-4 py-2 rounded-md border border-dark/10 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>All Regions</option>
                  <option>Asia</option>
                  <option>Europe</option>
                  <option>Americas</option>
                  <option>Africa</option>
                  <option>Oceania</option>
                </select>
              </div>
            </div>
            
            <p className="text-dark/70 max-w-3xl text-lg">
              Explore our diverse portfolio of industrial projects spanning multiple sectors and 
              continents, showcasing our global expertise and problem-solving capabilities.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/portfolio/${project.id}`} className="block h-full">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className={`h-56 ${project.imageColor} relative overflow-hidden`}>
                    {/* This would be an actual image in production */}
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <span className="text-xl font-bold opacity-40">{project.category}</span>
                    </div>
                    
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-20" 
                      style={{
                        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    {/* Category tag */}
                    <div className="absolute top-4 left-4 bg-white/90 text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                    
                    {/* Year tag */}
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.year}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4 text-dark/60">
                      <FiMapPin className="mr-2" />
                      <span>{project.location}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-dark/70 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-primary font-medium flex items-center group-hover:underline">
                        View Project Details
                        <FiArrowRight className="ml-2 transform transition-transform group-hover:translate-x-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="btn-secondary text-lg px-8 py-3">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 
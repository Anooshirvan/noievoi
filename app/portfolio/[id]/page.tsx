import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroBanner from '../../components/HeroBanner';
import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiCalendar, FiTag, FiUsers, FiAward } from 'react-icons/fi';
import BlueprintPlaceholder from '../../components/BlueprintPlaceholder';

// Mock portfolio projects - in a real app, this would come from a database or API
const portfolioProjects = [
  {
    id: '1',
    title: 'Advanced Manufacturing Facility',
    subtitle: 'Automated production line implementation for a global electronics manufacturer',
    location: 'Shanghai, China',
    year: '2023',
    category: 'Manufacturing',
    client: 'TechElectronics Global',
    awards: 'Innovation in Automation Award 2023',
    description: 'A comprehensive project to design and implement a fully automated production line for consumer electronics manufacturing. The system increased production capacity by 150% while reducing manufacturing defects by 75%.',
    challenges: 'Integrating legacy systems with new automation technology while maintaining production during the transition phase.',
    solutions: 'Custom middleware development that allowed phased implementation with zero downtime. Advanced robotics and AI-driven quality control systems.',
    results: 'The client achieved a 150% increase in production capacity, 75% reduction in defects, and 40% reduction in operating costs within the first year of full implementation.',
    imagePath: '/images/portfolio-manufacturing.jpg',
  },
  {
    id: '2',
    title: 'Renewable Energy Grid Integration',
    subtitle: 'Large-scale solar and wind farm integration with national power grid',
    location: 'Western Australia',
    year: '2022',
    category: 'Energy',
    client: 'AusPower Utilities',
    awards: 'Sustainable Infrastructure Excellence 2022',
    description: 'Design and implementation of control systems for integrating multiple renewable energy sources with the national power grid. The project included advanced grid management systems to handle variable energy production.',
    challenges: 'Balancing fluctuating renewable energy production with stable grid requirements across vast geographic areas.',
    solutions: 'Advanced energy storage systems combined with predictive AI algorithms for optimal load balancing and distribution.',
    results: 'Successfully integrated 1.2GW of renewable energy into the national grid with 99.8% reliability, reducing carbon emissions by over 3 million tons annually.',
    imagePath: '/images/portfolio-energy.jpg',
  },
  {
    id: '3',
    title: 'Smart City Infrastructure',
    subtitle: 'Comprehensive urban management systems for a developing metropolis',
    location: 'São Paulo, Brazil',
    year: '2021',
    category: 'Infrastructure',
    client: 'São Paulo Metropolitan Authority',
    awards: 'Smart City Achievement Award 2022',
    description: 'Development of integrated urban management systems encompassing traffic control, public safety, environmental monitoring, and utilities management for a major metropolitan area.',
    challenges: 'Integrating disparate existing systems while developing new infrastructure in a densely populated urban environment.',
    solutions: 'Modular system architecture allowing independent implementation and scaling of different components while maintaining central coordination.',
    results: 'Traffic congestion reduced by 37%, energy usage optimized by 28%, and emergency response times improved by 45% across the metropolitan area.',
    imagePath: '/images/portfolio-infrastructure.jpg',
  },
];

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  // Find the project with the matching ID
  const project = portfolioProjects.find(p => p.id === params.id) || portfolioProjects[0];
  
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        {/* Hero banner with large image */}
        <HeroBanner 
          title={project.title} 
          subtitle={project.subtitle} 
          imagePath={project.imagePath}
          height="large"
          overlayOpacity="medium"
        />
        
        {/* Project details */}
        <section className="section-padding bg-white relative">
          {/* Blueprint background */}
          <div className="absolute inset-0 opacity-5 z-0">
            <BlueprintPlaceholder />
          </div>
          
          <div className="container-custom relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main content */}
              <div className="lg:w-2/3">
                <Link href="/portfolio" className="inline-flex items-center text-primary mb-8 hover:underline">
                  <FiArrowLeft className="mr-2" />
                  Back to All Projects
                </Link>
                
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                  <p className="text-lg text-dark/80 mb-6">{project.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-light p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Challenges</h3>
                    <p className="text-dark/80">{project.challenges}</p>
                  </div>
                  
                  <div className="bg-light p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Solutions</h3>
                    <p className="text-dark/80">{project.solutions}</p>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
                  <p className="text-lg text-dark/80">{project.results}</p>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-light p-6 rounded-lg sticky top-32">
                  <h3 className="text-xl font-bold mb-6">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiMapPin className="w-5 h-5 text-primary mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-dark/80">{project.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiCalendar className="w-5 h-5 text-primary mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium">Year</h4>
                        <p className="text-dark/80">{project.year}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiTag className="w-5 h-5 text-primary mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium">Category</h4>
                        <p className="text-dark/80">{project.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiUsers className="w-5 h-5 text-primary mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium">Client</h4>
                        <p className="text-dark/80">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FiAward className="w-5 h-5 text-primary mt-1 mr-3" />
                      <div>
                        <h4 className="font-medium">Recognition</h4>
                        <p className="text-dark/80">{project.awards}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-dark/10">
                    <h4 className="font-medium mb-2">Interested in similar projects?</h4>
                    <Link href="/contact" className="btn-primary w-full text-center">
                      Contact Our Team
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
} 
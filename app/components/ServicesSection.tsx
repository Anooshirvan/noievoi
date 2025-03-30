'use client';

import { motion } from 'framer-motion';
import { FiSettings, FiZap, FiLayers, FiTruck, FiActivity, FiDatabase, FiServer, FiShield } from 'react-icons/fi';
import BlueprintPlaceholder from './BlueprintPlaceholder';

const services = [
  {
    title: 'Industrial Automation',
    description: 'Implementing cutting-edge automation systems that improve productivity and reduce operational costs for manufacturing facilities.',
    icon: <FiSettings className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Energy Solutions',
    description: 'Developing renewable and efficient energy systems including solar, wind, and advanced grid management technologies.',
    icon: <FiZap className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Infrastructure Development',
    description: 'Designing and implementing critical infrastructure projects including transportation networks and public facilities.',
    icon: <FiLayers className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Enhancing logistics networks and supply chain efficiency through advanced planning and management systems.',
    icon: <FiTruck className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Asset Management',
    description: 'Comprehensive tracking and maintenance systems for industrial equipment to maximize uptime and extend operational life.',
    icon: <FiActivity className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Data Analytics',
    description: 'Industrial data processing and analysis systems that provide actionable insights for operational excellence.',
    icon: <FiDatabase className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Industrial IoT',
    description: 'Interconnected sensor networks and control systems that enable smart factories and facilities management.',
    icon: <FiServer className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
  {
    title: 'Safety & Compliance',
    description: 'Comprehensive safety protocols and compliance systems that ensure operations meet international regulations.',
    icon: <FiShield className="w-10 h-10 sm:w-12 sm:h-12" />,
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="section-padding bg-light relative">
      {/* Background image/pattern for industrial theme */}
      <div className="absolute inset-0 opacity-5 z-0">
        <BlueprintPlaceholder />
      </div>
      
      {/* Large abstract industrial elements - responsive */}
      <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full z-0"></div>
      <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-accent/5 rounded-full z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our Industrial <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-dark/70 max-w-3xl mx-auto text-base sm:text-lg px-4 sm:px-6">
              With specialized teams working across multiple disciplines, we deliver comprehensive 
              industrial solutions tailored to the unique needs of each project and region.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group h-full"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden p-6 sm:p-8">
                {/* Industrial themed accent element */}
                <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 -translate-x-8 -translate-y-8 sm:-translate-x-10 sm:-translate-y-10 bg-primary/10 rounded-lg rotate-12 transition-transform duration-300 group-hover:rotate-45"></div>
                
                <div className="relative text-primary mb-4 sm:mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{service.title}</h3>
                <p className="text-dark/70 text-sm sm:text-base md:text-lg">{service.description}</p>
              </div>
              
              <div className="pt-3 pb-3 px-6 sm:px-8 border-t border-gray-100">
                <span className="text-primary text-sm sm:text-base font-medium flex items-center">
                  Available Worldwide
                  <span className="ml-2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 sm:mt-16 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6">
              Global Expertise, Local Implementation
            </h3>
            <p className="text-dark/70 max-w-3xl mx-auto text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              Our international team brings diverse expertise from across the industrial sector, 
              implementing solutions that respect local requirements while maintaining global standards.
            </p>
            <button className="btn-primary text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4">
              Learn More About Our Capabilities
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 
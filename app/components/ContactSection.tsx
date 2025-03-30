'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend, FiGlobe, FiCheck, FiLoader } from 'react-icons/fi';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      // Clear form on success
      setFormState({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setSubmitSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Global office locations for an international industrial team
  const contactInfo = [
    {
      icon: <FiGlobe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: 'Global Headquarters',
      content: 'New York, United States'
    },
    {
      icon: <FiMapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: 'Regional Offices',
      content: 'London, Singapore, Dubai, São Paulo, Shanghai'
    },
    {
      icon: <FiPhone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: 'Contact Numbers',
      content: '+1 (212) 555-7890 (Global) | +44 20 7946 0958 (Europe)'
    },
    {
      icon: <FiMail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: 'Email Addresses',
      content: 'global@noievoi.com | projects@noievoi.com'
    }
  ];
  
  // Fixed connection lines with pre-defined positions
  const connectionLines = [
    { top: '15%', rotate: '45deg' },
    { top: '35%', rotate: '120deg' },
    { top: '55%', rotate: '75deg' },
    { top: '75%', rotate: '30deg' },
    { top: '85%', rotate: '100deg' },
    { top: '25%', rotate: '160deg' },
  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative text-white overflow-hidden">
      {/* Large background image */}
      <div className="absolute inset-0 z-0">
        {/* In production, this would be a large image of industrial operations or global map */}
        <div className="w-full h-full bg-gradient-to-br from-secondary via-secondary to-dark">
          <div className="absolute inset-0 bg-black/50">
            {/* World map or industrial background would be here */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Large floating industrial/tech elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 z-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-accent/30 blur-3xl"></div>
      </div>
      
      {/* Animated Background Elements - representing global connectivity */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="relative h-full w-full">
          {isMounted && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/20 rounded-full"
                  style={{
                    width: `${50 + i * 75}px`,
                    height: `${50 + i * 75}px`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `-${(50 + i * 75) / 2}px`,
                    marginTop: `-${(50 + i * 75) / 2}px`,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    delay: i * 2,
                  }}
                />
              ))}
              
              {/* Connection lines - with fixed positions */}
              {connectionLines.map((line, i) => (
                <motion.div
                  key={`line-${i}`}
                  className="absolute bg-white/10 h-px"
                  style={{
                    width: '100%',
                    top: line.top,
                    transform: `rotate(${line.rotate})`,
                    transformOrigin: 'center',
                  }}
                  animate={{
                    opacity: [0.05, 0.2, 0.05],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
      
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Global <span className="text-primary">Connections</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
              With operations spanning five continents and expertise across multiple industrial disciplines, 
              our team is ready to tackle your most challenging projects anywhere in the world.
            </p>
          </motion.div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-16">
          {/* Contact Info - Global Locations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6 sm:space-y-8"
          >
            <div className="p-1 bg-gradient-to-br from-primary to-accent rounded-xl">
              <div className="bg-secondary/90 p-5 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm h-full">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <FiGlobe className="text-primary text-sm sm:text-base" />
                  </span>
                  Global Presence
                </h3>
                
                <div className="space-y-5 sm:space-y-6 md:space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-3 sm:gap-5">
                      <div className="text-primary mt-1 flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1">{item.title}</h4>
                        <p className="text-white/80 text-sm sm:text-base md:text-lg">{item.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 sm:pt-6 border-t border-white/10">
                    <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Industry Sectors</h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {['Manufacturing', 'Energy', 'Construction', 'Technology', 'Infrastructure', 'Logistics'].map((sector, index) => (
                        <span 
                          key={index}
                          className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/10 text-white/90 rounded-full text-xs sm:text-sm"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 p-5 sm:p-8 md:p-10 rounded-xl shadow-2xl backdrop-blur-sm border border-white/10"
          >
            {submitSuccess ? (
              <div className="text-center py-6 sm:py-8 md:py-12">
                <FiCheck className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Message Sent Successfully!</h3>
                <p className="text-white/80 text-sm sm:text-base md:text-lg">Our team will review your project requirements and get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Request a Consultation</h3>
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-red-800">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div>
                      <label htmlFor="name" className="block mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base md:text-lg"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base md:text-lg"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Project Type</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base md:text-lg"
                      required
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Project Request">Project Request</option>
                      <option value="Partnership Opportunity">Partnership Opportunity</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Career Information">Career Information</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base md:text-lg"
                      placeholder="Tell us about your project requirements, scope, and timeline..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
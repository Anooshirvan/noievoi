'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';

const AboutSection = () => {
  const benefits = [
    'Modern and innovative design approach',
    'Experienced team of developers and designers',
    'Commitment to delivering on time and on budget',
    'Ongoing support and maintenance',
    'Performance-optimized solutions',
    'Cross-platform compatibility'
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Large background image */}
      <div className="absolute inset-0 z-0">
        {/* This would be replaced with an actual image in production */}
        <div className="w-full h-full bg-light opacity-80">
          <div className="absolute inset-0 bg-gradient-to-tr from-light via-light to-transparent"></div>
        </div>
      </div>

      {/* Background pattern - larger squares */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 md:grid-cols-8 h-full">
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square border border-secondary/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.02, duration: 0.8 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>

      {/* Large floating elements */}
      <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-primary/5 z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-60 h-60 rounded-full bg-accent/5 z-0 animate-pulse"></div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Larger decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/20 rounded-lg z-0"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-lg z-0"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-6 shadow-2xl rounded-lg overflow-hidden">
              <div className="aspect-square bg-primary p-8 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-5xl md:text-6xl font-bold mb-3">10+</h3>
                  <p className="text-base">Years of Experience</p>
                </div>
              </div>
              <div className="aspect-square bg-secondary p-8 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-5xl md:text-6xl font-bold mb-3">250+</h3>
                  <p className="text-base">Projects Completed</p>
                </div>
              </div>
              <div className="aspect-square bg-accent p-8 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-5xl md:text-6xl font-bold mb-3">50+</h3>
                  <p className="text-base">Team Members</p>
                </div>
              </div>
              <div className="aspect-square bg-dark p-8 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-5xl md:text-6xl font-bold mb-3">100%</h3>
                  <p className="text-base">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              About <span className="text-primary">Noievoi</span>
            </h2>
            <p className="text-dark/80 text-lg mb-6">
              Noievoi is a modern digital agency providing innovative web development, design, and marketing solutions for businesses worldwide. We combine creativity with technical expertise to deliver exceptional digital experiences that drive results.
            </p>
            <p className="text-dark/80 text-lg mb-10">
              Our team of talented professionals is dedicated to crafting tailored solutions that align with your business objectives, helping you stand out in today's competitive digital landscape.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary text-xl flex-shrink-0" />
                  <span className="text-dark/80 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            <button className="btn-primary text-lg">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 
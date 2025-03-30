'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO at TechStart',
    content: 'Working with Noievoi has been a game-changer for our business. Their team delivered a stunning website that perfectly represents our brand and has significantly increased our conversion rates.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    content: 'The team at Noievoi truly understands digital marketing. They helped us optimize our online presence and created a strategy that has doubled our lead generation within just three months.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Founder at InnovateCo',
    content: 'I was impressed by Noievoi\'s attention to detail and commitment to delivering on time. Their developers created a custom application that streamlined our operations and improved user experience.',
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };
  
  return (
    <section className="relative py-24 min-h-[600px] overflow-hidden">
      {/* Large Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-secondary opacity-95">
          {/* This div would contain the actual background image in production */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-dark opacity-90"></div>
        </div>
      </div>
      
      {/* Large Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-primary transform rotate-45 translate-x-1/2 -translate-y-1/4"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full opacity-10 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-accent transform -rotate-45 -translate-x-1/2 translate-y-1/4"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client <span className="text-primary">Testimonials</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about 
              working with Noievoi.
            </p>
          </motion.div>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-xl p-8 md:p-10"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      {/* Large Profile Element */}
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-3xl font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div className="text-center md:text-left">
                        {/* Rating */}
                        <div className="flex items-center justify-center md:justify-start mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${
                                i < testimonial.rating 
                                  ? 'text-primary fill-primary' 
                                  : 'text-gray-300'
                              } w-5 h-5`} 
                            />
                          ))}
                        </div>
                        
                        {/* Content */}
                        <p className="text-dark/80 mb-6 text-lg italic">
                          "{testimonial.content}"
                        </p>
                        
                        {/* Author */}
                        <div>
                          <h4 className="font-bold text-xl">{testimonial.name}</h4>
                          <p className="text-dark/70">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Large Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-4 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all focus:outline-none z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>
          
          {/* Larger Pagination Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-4 h-4 rounded-full mx-2 transition-all focus:outline-none ${
                  i === activeIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 
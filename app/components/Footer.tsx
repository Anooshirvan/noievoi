'use client';

import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { text: 'Web Development', href: '/services/web-development' },
        { text: 'Mobile Development', href: '/services/mobile-development' },
        { text: 'UI/UX Design', href: '/services/ui-ux-design' },
        { text: 'Digital Marketing', href: '/services/digital-marketing' },
        { text: 'Data Analytics', href: '/services/data-analytics' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Our Team', href: '/team' },
        { text: 'Portfolio', href: '/portfolio' },
        { text: 'Testimonials', href: '/testimonials' },
        { text: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', href: '/blog' },
        { text: 'Case Studies', href: '/case-studies' },
        { text: 'FAQ', href: '/faq' },
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Service', href: '/terms-of-service' },
      ],
    },
  ];
  
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-primary">noievoi</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Noievoi is a modern digital agency providing innovative web development, 
              design, and marketing solutions for businesses worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                <span className="text-white/70">123 Business Street, Digital City, 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary flex-shrink-0" />
                <span className="text-white/70">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary flex-shrink-0" />
                <span className="text-white/70">info@noievoi.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors inline-flex items-center"
                    >
                      <FiChevronRight className="mr-1 text-primary" /> {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-lg mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/70">Stay updated with our latest news and offers.</p>
            </div>
            <div>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:border-primary"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/70">
            © {currentYear} <span className="text-primary font-medium">Noievoi</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
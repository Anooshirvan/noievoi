'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-primary">noievoi</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`px-4 py-2 text-base font-medium ${isScrolled ? 'text-dark' : 'text-white'} hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admin"
            className={`ml-2 flex items-center px-4 py-2 rounded-full ${
              isScrolled ? 'bg-primary text-white' : 'bg-white/10 text-white backdrop-blur-sm border border-white/20'
            } hover:bg-primary hover:text-white transition-colors`}
          >
            <FiLock className="mr-2" size={16} />
            <span className="font-medium">Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className={`focus:outline-none ${isScrolled ? 'text-dark' : 'text-white'}`}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white w-full shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-dark hover:text-primary font-medium transition-colors block py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-primary hover:text-primary-dark font-medium transition-colors py-2 border-t border-gray-100 mt-2 pt-4"
              onClick={() => setIsOpen(false)}
            >
              <FiLock size={18} />
              <span>Admin Login</span>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 
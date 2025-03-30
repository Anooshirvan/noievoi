import React from 'react';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';

export default function TeamPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <HeroBanner 
          title="Meet Our Team" 
          subtitle="Our global team of experts brings diverse skills and local knowledge to every industrial project." 
          imagePath="/images/team-hero.jpg"
          height="large"
        />
        <TeamSection />
      </div>
      <Footer />
    </main>
  );
} 
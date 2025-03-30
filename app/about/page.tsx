import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <HeroBanner 
          title="About Our Company" 
          subtitle="Learn about our global industrial expertise and commitment to innovation." 
          imagePath="/images/about-hero.jpg"
          height="large"
        />
        <AboutSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </main>
  );
} 
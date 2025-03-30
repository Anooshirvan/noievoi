import Navbar from '../components/Navbar';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <HeroBanner 
          title="Our Services" 
          subtitle="Comprehensive industrial solutions tailored for global implementation with local expertise." 
          imagePath="/images/services-hero.jpg"
          height="large"
        />
        <ServicesSection />
      </div>
      <Footer />
    </main>
  );
} 
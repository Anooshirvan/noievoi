import Navbar from '../components/Navbar';
import PortfolioSection from '../components/PortfolioSection';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <HeroBanner 
          title="Our Global Projects" 
          subtitle="Explore our portfolio of industrial projects across different sectors and continents." 
          imagePath="/images/portfolio-hero.jpg"
          height="large"
        />
        <PortfolioSection />
      </div>
      <Footer />
    </main>
  );
} 
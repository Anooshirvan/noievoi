import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <HeroBanner 
          title="Contact Us" 
          subtitle="Get in touch with our global team of industrial experts." 
          imagePath="/images/contact-hero.jpg"
          height="medium"
        />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
} 
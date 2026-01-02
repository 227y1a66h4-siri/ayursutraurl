import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/landing/HeroSection';
import TreatmentsSection from '@/components/landing/TreatmentsSection';
import WhyChooseSection from '@/components/landing/WhyChooseSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import Footer from '@/components/landing/Footer';
import Navbar from '@/components/landing/Navbar';
import AIChatbot from '@/components/chat/AIChatbot';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TreatmentsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default LandingPage;

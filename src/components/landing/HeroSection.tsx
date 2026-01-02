import { Button } from '@/components/ui/button';
import { Sparkles, Leaf, Droplets, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden gradient-hero">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-pulse opacity-30">🌿</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}>💧</div>
        <div className="absolute bottom-40 left-1/4 text-3xl animate-pulse opacity-30" style={{ animationDelay: '1s' }}>🧘‍♀️</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}>🌸</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Discover the Ancient{' '}
            <span className="text-primary">Art of Healing</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Experience authentic Panchakarma therapy with personalized treatment plans,
            expert practitioners, and holistic wellness tracking
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a href="#contact">
              <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow">
                <Sparkles className="mr-2 h-5 w-5" />
                Book a Session
              </Button>
            </a>
            <a href="#treatments">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">5000+</div>
              <div className="text-sm text-muted-foreground">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Expert Practitioners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

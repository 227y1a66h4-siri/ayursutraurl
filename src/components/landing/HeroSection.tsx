import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-primary/5 animate-float" />
      <div className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full bg-secondary/5 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-[20%] w-16 h-16 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Traditional Ayurvedic Healing</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-center text-foreground leading-tight mb-8 animate-slide-up">
            Restore Balance,{' '}
            <span className="relative">
              <span className="text-primary">Renew Life</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 150 2 298 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Experience the ancient wisdom of Panchakarma at AyurSutra. Personalized healing journeys 
            designed to cleanse, rejuvenate, and transform your well-being.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a href="#contact">
              <Button size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 h-14 text-base shadow-glow hover:shadow-lg transition-all group">
                Start Your Healing Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#treatments">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Explore Treatments
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-1">5K+</div>
              <div className="text-sm text-muted-foreground">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Expert Healers</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 100L48 95C96 90 192 80 288 75C384 70 480 70 576 72.5C672 75 768 80 864 82.5C960 85 1056 85 1152 82.5C1248 80 1344 75 1392 72.5L1440 70V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
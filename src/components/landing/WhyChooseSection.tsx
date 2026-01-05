import { Award, Users, Leaf, Activity, Clock, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Practitioners',
    description: 'Board-certified Ayurvedic doctors with decades of specialized Panchakarma training from renowned institutions.',
  },
  {
    icon: Activity,
    title: 'Progress Tracking',
    description: 'Advanced wellness analytics and regular assessments to monitor your healing journey with precision.',
  },
  {
    icon: Leaf,
    title: 'Authentic Treatments',
    description: 'Traditional protocols using ethically-sourced, organic herbs and oils prepared in-house daily.',
  },
  {
    icon: Award,
    title: 'Modern Facilities',
    description: 'State-of-the-art treatment rooms combining traditional ambiance with contemporary comfort.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Care',
    description: 'Individualized treatment plans crafted after thorough Prakriti (constitution) analysis.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock care team and AI-powered wellness assistant for guidance anytime.',
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="section-padding gradient-warm relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full border border-primary/10" />
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full border border-secondary/10" />
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Why AyurSutra</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Where Ancient Wisdom Meets Modern Excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the perfect synthesis of time-tested Ayurvedic principles and contemporary healthcare standards.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex w-16 h-16 rounded-2xl bg-card border border-border items-center justify-center mb-6 group-hover:border-primary/30 group-hover:shadow-md transition-all">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
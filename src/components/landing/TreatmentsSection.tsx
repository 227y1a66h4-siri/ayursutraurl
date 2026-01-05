import { Button } from '@/components/ui/button';
import { ArrowRight, Droplets, Wind, Leaf, Brain, Heart } from 'lucide-react';

const treatments = [
  {
    icon: Wind,
    name: 'Vamana',
    subtitle: 'Therapeutic Emesis',
    description: 'Gentle cleansing of Kapha dosha through therapeutic emesis. Ideal for respiratory conditions, allergies, and skin disorders.',
    benefits: ['Clears respiratory tract', 'Improves digestion', 'Enhances skin health'],
  },
  {
    icon: Droplets,
    name: 'Virechana',
    subtitle: 'Purgation Therapy',
    description: 'Controlled purgation to eliminate excess Pitta dosha. Effective for liver disorders, skin conditions, and digestive issues.',
    benefits: ['Detoxifies liver', 'Clears skin', 'Balances metabolism'],
  },
  {
    icon: Leaf,
    name: 'Basti',
    subtitle: 'Medicated Enema',
    description: 'The most powerful Panchakarma treatment for Vata disorders. Addresses neurological conditions and joint problems.',
    benefits: ['Relieves joint pain', 'Calms nervous system', 'Improves mobility'],
  },
  {
    icon: Brain,
    name: 'Nasya',
    subtitle: 'Nasal Administration',
    description: 'Therapeutic nasal drops to cleanse and strengthen the head region. Enhances mental clarity and sensory functions.',
    benefits: ['Mental clarity', 'Sinus relief', 'Better sleep'],
  },
  {
    icon: Heart,
    name: 'Raktamokshana',
    subtitle: 'Blood Purification',
    description: 'Specialized blood purification therapy for inflammatory conditions, skin diseases, and toxin removal.',
    benefits: ['Purifies blood', 'Reduces inflammation', 'Clears toxins'],
  },
];

const TreatmentsSection = () => {
  return (
    <section id="treatments" className="section-padding bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Our Therapies</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
            The Five Pillars of Panchakarma
          </h2>
          <p className="text-lg text-muted-foreground">
            Ancient purification therapies refined over millennia, now available with modern comfort and personalized care.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.name}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <treatment.icon className="h-7 w-7 text-primary" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                      {treatment.name}
                    </h3>
                    <span className="text-sm text-primary font-medium">{treatment.subtitle}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {treatment.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2">
                    {treatment.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="#contact">
            <Button size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 group">
              Schedule Your Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsSection;
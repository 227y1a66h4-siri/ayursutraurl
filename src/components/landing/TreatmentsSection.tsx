import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const treatments = [
  {
    emoji: '🌿',
    name: 'Vamana',
    description: 'Therapeutic emesis to eliminate excess Kapha dosha, treating respiratory and digestive disorders naturally.',
  },
  {
    emoji: '💧',
    name: 'Virechana',
    description: 'Controlled purgation therapy to cleanse Pitta dosha, addressing liver disorders and skin conditions.',
  },
  {
    emoji: '🏺',
    name: 'Basti',
    description: 'Medicated enema therapy to balance Vata dosha, treating neurological and joint disorders effectively.',
  },
  {
    emoji: '👃',
    name: 'Nasya',
    description: 'Nasal administration of medicines to treat head and neck disorders, enhancing mental clarity.',
  },
  {
    emoji: '🩸',
    name: 'Raktamokshana',
    description: 'Bloodletting therapy to purify blood and treat skin diseases, hypertension, and inflammatory conditions.',
  },
];

const TreatmentsSection = () => {
  return (
    <section id="treatments" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Healing Art of Panchakarma
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the five sacred cleansing therapies that have restored balance and vitality for thousands of years
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {treatments.map((treatment, index) => (
            <Card
              key={treatment.name}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {treatment.emoji}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {treatment.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {treatment.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact">
            <Button size="lg" className="gradient-primary text-primary-foreground">
              Start Your Healing Journey
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsSection;

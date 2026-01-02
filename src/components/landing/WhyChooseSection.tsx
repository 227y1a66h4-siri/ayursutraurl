import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    emoji: '👨‍⚕️',
    title: 'Expert Practitioners',
    description: 'Certified Ayurvedic doctors with years of specialized Panchakarma training',
  },
  {
    emoji: '📊',
    title: 'Progress Tracking',
    description: 'Advanced wellness analytics to monitor your healing journey',
  },
  {
    emoji: '🌿',
    title: 'Authentic Treatments',
    description: 'Traditional methods using pure, organic herbs and oils',
  },
  {
    emoji: '🏥',
    title: 'Modern Facilities',
    description: 'State-of-the-art treatment rooms with comfortable amenities',
  },
  {
    emoji: '🤝',
    title: 'Personalized Care',
    description: 'Customized treatment plans tailored to your unique constitution',
  },
  {
    emoji: '💬',
    title: '24/7 Support',
    description: 'Round-the-clock assistance through our AI virtual assistant',
  },
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AyurSutra?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of ancient wisdom and modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.emoji}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

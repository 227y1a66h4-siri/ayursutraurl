import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    initials: 'RS',
    name: 'Rajesh Sharma',
    condition: 'Chronic Pain Patient',
    quote: "After 3 months of Panchakarma therapy, my chronic back pain has reduced by 80%. The personalized treatment plan was exactly what I needed.",
    rating: 5,
  },
  {
    initials: 'PS',
    name: 'Priya Singh',
    condition: 'Stress Management',
    quote: "The Shirodhara sessions completely transformed my sleep quality and stress levels. I feel more balanced and energetic than ever before.",
    rating: 5,
  },
  {
    initials: 'AK',
    name: 'Amit Kumar',
    condition: 'Digestive Health',
    quote: "My digestive issues that plagued me for years are now completely resolved. The holistic approach here is truly remarkable.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories of transformation and healing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.condition}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

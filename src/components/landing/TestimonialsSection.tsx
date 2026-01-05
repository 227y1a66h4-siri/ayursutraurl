import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Chronic Pain Recovery',
    image: null,
    quote: "After struggling with chronic back pain for years, I found relief through AyurSutra's Panchakarma program. The personalized approach made all the difference. My pain reduced by 80% in just 3 months.",
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Stress & Anxiety Management',
    image: null,
    quote: "The Shirodhara treatments transformed my relationship with sleep and stress. I went from constant anxiety to feeling genuinely peaceful. The practitioners here truly understand holistic healing.",
    rating: 5,
  },
  {
    name: 'Dr. Amit Kumar',
    role: 'Digestive Health',
    image: null,
    quote: "As a medical professional myself, I was skeptical at first. But the scientific approach combined with traditional wisdom completely resolved my decade-long digestive issues. Truly remarkable.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-background relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Stories of Transformation
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from people whose lives have been transformed through authentic Ayurvedic healing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 pt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-semibold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
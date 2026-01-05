import { ClipboardCheck, Stethoscope, Sparkles, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    step: '01',
    title: 'Initial Consultation',
    description: 'Book a comprehensive consultation where our experts analyze your Prakriti (constitution), Vikriti (imbalances), and health history.',
  },
  {
    icon: Stethoscope,
    step: '02',
    title: 'Personalized Plan',
    description: 'Receive a customized Panchakarma protocol designed specifically for your body type, health goals, and lifestyle.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Treatment Journey',
    description: 'Experience authentic therapies in our serene healing environment with continuous care from our expert team.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Ongoing Wellness',
    description: 'Continue your transformation with post-treatment guidance, dietary recommendations, and regular progress monitoring.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">The Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
            Your Path to Wellness
          </h2>
          <p className="text-lg opacity-70">
            A structured yet flexible approach to guide you through your healing transformation.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-background/20" />
              )}
              
              {/* Step Number */}
              <div className="text-6xl font-display font-bold opacity-10 mb-4">
                {item.step}
              </div>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="opacity-70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
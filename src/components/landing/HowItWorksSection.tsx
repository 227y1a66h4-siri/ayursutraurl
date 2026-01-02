const steps = [
  {
    number: '1',
    title: 'Register',
    description: 'Complete your health profile and treatment preferences',
  },
  {
    number: '2',
    title: 'Consultation',
    description: 'Meet with our expert practitioners for personalized assessment',
  },
  {
    number: '3',
    title: 'Treatment',
    description: 'Begin your customized Panchakarma therapy program',
  },
  {
    number: '4',
    title: 'Track Progress',
    description: 'Monitor your wellness journey with detailed analytics',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your journey to wellness in simple steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 shadow-lg">
                {step.number}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[200px]">
                {step.description}
              </p>
              
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute transform translate-x-[120px]">
                  <div className="w-[60px] h-0.5 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

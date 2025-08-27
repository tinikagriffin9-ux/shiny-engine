import { CheckCircle } from "lucide-react";

export default function ProcessSection() {
  const processSteps = [
    {
      number: 1,
      title: "Submit Application",
      description: "Complete our streamlined online application with your credentials and documents",
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    },
    {
      number: 2,
      title: "Skills Assessment",
      description: "Take our role-specific online tests to demonstrate your competencies",
      bgColor: "bg-secondary",
      textColor: "text-secondary-foreground"
    },
    {
      number: 3,
      title: "Visa & Registration",
      description: "We handle all visa applications and professional registration processes",
      bgColor: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      number: 4,
      title: "UK Placement",
      description: "Start your new career with full support and ongoing assistance",
      bgColor: "bg-primary",
      textColor: "text-primary-foreground"
    }
  ];

  const facilitations = [
    "Visa sponsorship applications",
    "Professional body registration",
    "English language support",
    "Accommodation assistance",
    "Airport pickup service",
    "Ongoing career support"
  ];

  return (
    <section id="process" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6" data-testid="process-title">
            We Handle Everything for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="process-description">
            Our comprehensive support ensures a smooth transition to your new career in the UK
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center" data-testid={`process-step-${step.number}`}>
              <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 ${step.textColor} text-2xl font-bold`}>
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted p-8 rounded-2xl" data-testid="facilitation-list">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What We Facilitate</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilitations.map((item, index) => (
              <div key={index} className="flex items-center space-x-3" data-testid={`facilitation-${index}`}>
                <CheckCircle className="text-accent text-xl h-5 w-5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

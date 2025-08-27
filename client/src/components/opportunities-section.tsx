import { Button } from "@/components/ui/button";
import { UserIcon, Baby, HandHeart, PoundSterling, Calendar, Home, GraduationCap, Clock, Award } from "lucide-react";
import { Link } from "wouter";

export default function OpportunitiesSection() {
  const opportunities = [
    {
      icon: UserIcon,
      title: "Registered Nurses",
      description: "Join the NHS as a registered nurse. We facilitate visa sponsorship, professional registration, and placement in top UK hospitals.",
      salary: "£28,000 - £40,000 annually",
      schedule: "Full-time positions available",
      benefit: "Accommodation support provided",
      buttonText: "Apply for Nursing Role",
      buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
      testId: "opportunity-nurse"
    },
    {
      icon: Baby,
      title: "Midwives",
      description: "Specialized midwifery positions in NHS trusts across England. Support families during their most important moments.",
      salary: "£30,000 - £45,000 annually",
      schedule: "Flexible shift patterns",
      benefit: "Continuous professional development",
      buttonText: "Apply for Midwife Role",
      buttonClass: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      testId: "opportunity-midwife"
    },
    {
      icon: HandHeart,
      title: "Caregivers",
      description: "Provide compassionate care in residential and community settings. Make a difference in people's daily lives.",
      salary: "£22,000 - £28,000 annually",
      schedule: "Day and night shifts available",
      benefit: "Full training provided",
      buttonText: "Apply for Caregiver Role",
      buttonClass: "bg-accent text-accent-foreground hover:bg-accent/90",
      testId: "opportunity-caregiver"
    }
  ];

  return (
    <section id="opportunities" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6" data-testid="opportunities-title">
            Healthcare Opportunities in the UK
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="opportunities-description">
            We recruit for essential healthcare roles across the UK's NHS and private healthcare system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => {
            const IconComponent = opportunity.icon;
            
            return (
              <div key={index} className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow" data-testid={opportunity.testId}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <IconComponent className="text-primary text-2xl" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{opportunity.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {opportunity.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <PoundSterling className="text-accent w-4 h-4" />
                    <span className="ml-2">{opportunity.salary}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    {index === 0 && <Calendar className="text-accent w-4 h-4" />}
                    {index === 1 && <Clock className="text-accent w-4 h-4" />}
                    {index === 2 && <Clock className="text-accent w-4 h-4" />}
                    <span className="ml-2">{opportunity.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    {index === 0 && <Home className="text-accent w-4 h-4" />}
                    {index === 1 && <GraduationCap className="text-accent w-4 h-4" />}
                    {index === 2 && <Award className="text-accent w-4 h-4" />}
                    <span className="ml-2">{opportunity.benefit}</span>
                  </div>
                </div>
                <Link href="/application" data-testid={`button-${opportunity.testId}`}>
                  <Button className={`w-full py-3 rounded-lg font-semibold transition-colors ${opportunity.buttonClass}`}>
                    {opportunity.buttonText}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

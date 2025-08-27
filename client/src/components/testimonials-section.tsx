import { Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mwangi",
      role: "Registered Nurse • Kenya → London",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      testimonial: "The entire process was seamless. From application to starting work in London took just 3 months. The support team handled everything - visa, registration, even helped me find accommodation near the hospital.",
      testId: "testimonial-sarah"
    },
    {
      name: "David Okonkwo", 
      role: "Senior Caregiver • Nigeria → Manchester",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      testimonial: "I was hesitant at first, but the team proved their reliability. No hidden costs, transparent process, and excellent support even after arriving in the UK. Now I'm earning more than I ever imagined.",
      testId: "testimonial-david"
    },
    {
      name: "Grace Nakamura",
      role: "Midwife • Uganda → Birmingham", 
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
      testimonial: "The transition was smooth thanks to their comprehensive support. They helped with professional registration, cultural orientation, and ongoing career development. I highly recommend their services.",
      testId: "testimonial-grace"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6" data-testid="testimonials-title">
            Success Stories from Africa to UK
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-description">
            Hear from healthcare professionals who have successfully transitioned to UK careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl shadow-lg" data-testid={testimonial.testId}>
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.role.split('•')[0].trim()}`}
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "{testimonial.testimonial}"
              </p>
              <div className="flex items-center text-accent" data-testid={`${testimonial.testId}-rating`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/application" data-testid="testimonials-cta">
            <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
              Join 2000+ Success Stories
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

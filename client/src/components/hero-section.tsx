import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="hero-title">
              Your UK Healthcare Career Starts Here
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed" data-testid="hero-description">
              Join thousands of healthcare professionals from Kenya, Uganda, Ghana, and Nigeria who have built successful careers in the UK. We handle everything - from visas to placement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/application" data-testid="hero-apply-button">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                onClick={() => scrollToSection("process")}
                data-testid="hero-learn-more-button"
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 text-white/80">
              <div className="flex items-center space-x-2" data-testid="stat-success-rate">
                <CheckCircle className="text-accent h-5 w-5" />
                <span>100% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2" data-testid="stat-licensed">
                <Shield className="text-accent h-5 w-5" />
                <span>Fully Licensed</span>
              </div>
              <div className="flex items-center space-x-2" data-testid="stat-placed">
                <Users className="text-accent h-5 w-5" />
                <span>2000+ Placed</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600"
              alt="Modern UK healthcare facility" 
              className="rounded-2xl shadow-2xl w-full" 
              data-testid="hero-image"
            />
            <div className="absolute -bottom-6 -left-6 bg-card glass-effect p-6 rounded-xl shadow-lg" data-testid="salary-highlight">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground text-lg font-bold">£</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Starting Salary</p>
                  <p className="text-2xl font-bold text-foreground">£28,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

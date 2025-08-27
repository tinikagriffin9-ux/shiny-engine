import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="text-primary-foreground text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">UK Healthcare Careers</h1>
              <p className="text-sm text-muted-foreground">International Recruitment</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("opportunities")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-opportunities"
            >
              Opportunities
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-process"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("countries")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-countries"
            >
              Countries
            </button>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-admin">
              Admin
            </Link>
            <Link href="/application" data-testid="nav-apply">
              <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Apply Now
              </Button>
            </Link>
          </nav>
          
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("opportunities")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-opportunities"
              >
                Opportunities
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-process"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("countries")}
                className="text-muted-foreground hover:text-foreground transition-colors text-left"
                data-testid="mobile-nav-countries"
              >
                Countries
              </button>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors text-left" data-testid="mobile-nav-admin">
                Admin
              </Link>
              <Link href="/application" data-testid="mobile-nav-apply">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Apply Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

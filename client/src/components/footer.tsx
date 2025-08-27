import { Heart, Linkedin, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6" data-testid="footer-logo">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold">UK Healthcare Careers</h3>
                <p className="text-primary-foreground/80">International Recruitment</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 mb-6 max-w-md" data-testid="footer-description">
              Connecting exceptional healthcare professionals from Africa with rewarding careers in the UK's healthcare system.
            </p>
            <div className="flex space-x-4" data-testid="footer-social">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors" data-testid="social-linkedin">
                <Linkedin className="text-white h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors" data-testid="social-twitter">
                <Twitter className="text-white h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors" data-testid="social-facebook">
                <Facebook className="text-white h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div data-testid="footer-links">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#opportunities" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-opportunities">Opportunities</a></li>
              <li><a href="#process" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-process">Process</a></li>
              <li><a href="#countries" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-countries">Countries</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-contact">Contact Us</a></li>
            </ul>
          </div>

          <div data-testid="footer-contact">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3" data-testid="contact-address">
                <MapPin className="text-primary-foreground/80 h-5 w-5" />
                <span className="text-primary-foreground/90">London, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-3" data-testid="contact-phone">
                <Phone className="text-primary-foreground/80 h-5 w-5" />
                <span className="text-primary-foreground/90">+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3" data-testid="contact-email">
                <Mail className="text-primary-foreground/80 h-5 w-5" />
                <span className="text-primary-foreground/90">apply@ukhealthcareers.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8" data-testid="footer-bottom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/80 text-sm">
              © {currentYear} UK Healthcare Careers. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0" data-testid="footer-legal">
              <a href="#" className="text-primary-foreground/80 hover:text-white text-sm transition-colors" data-testid="link-privacy">Privacy Policy</a>
              <a href="#" className="text-primary-foreground/80 hover:text-white text-sm transition-colors" data-testid="link-terms">Terms of Service</a>
              <a href="#" className="text-primary-foreground/80 hover:text-white text-sm transition-colors" data-testid="link-gdpr">GDPR Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🕉️</span>
              <span className="font-display text-xl font-semibold">AyurSutra</span>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Authentic Panchakarma healing center dedicated to restoring balance and vitality through traditional Ayurvedic therapies and modern wellness tracking.
            </p>
            
            {/* Newsletter */}
            <div>
              <p className="font-semibold mb-2">Stay Updated</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#treatments" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Treatments
                </a>
              </li>
              <li>
                <a href="#why-choose" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Practitioners
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <Link to="/login" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  123 Wellness Street, Mumbai, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  info@ayursutra.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Badges */}
          <div>
            <h3 className="font-display font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2025 AyurSutra. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-primary-foreground/80 flex items-center gap-1">
              🏆 Certified Ayurvedic Center
            </span>
            <span className="text-sm text-primary-foreground/80 flex items-center gap-1">
              🌿 100% Natural Treatments
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

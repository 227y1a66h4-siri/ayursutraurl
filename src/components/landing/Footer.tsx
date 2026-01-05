import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Leaf, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto">
              Take the first step towards holistic wellness. Schedule a consultation with our expert practitioners today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 group">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-background/30 text-background hover:bg-background/10">
                Call +91 98765 43210
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold">AyurSutra</span>
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-50">Healing Center</div>
              </div>
            </div>
            <p className="opacity-70 text-sm leading-relaxed mb-6">
              Authentic Panchakarma healing center dedicated to restoring balance and vitality through traditional Ayurvedic wisdom.
            </p>
            
            {/* Newsletter */}
            <div>
              <p className="font-medium mb-3 text-sm">Stay Updated</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full"
                />
                <Button size="sm" className="gradient-primary rounded-full px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '#home' },
                { name: 'Our Treatments', href: '#treatments' },
                { name: 'Why Choose Us', href: '#why-choose' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Staff Portal', href: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-display font-semibold mb-6">Treatments</h3>
            <ul className="space-y-3">
              {['Vamana Therapy', 'Virechana', 'Basti', 'Nasya', 'Raktamokshana', 'Shirodhara'].map((treatment) => (
                <li key={treatment}>
                  <a href="#treatments" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {treatment}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-sm opacity-70">
                  123 Wellness Street,<br />Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm opacity-70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm opacity-70">info@ayursutra.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-50">
            © 2025 AyurSutra. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-50 hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
      { name: 'PDF to Image', href: '/tools/pdf-to-image' },
      { name: 'Compress PDF', href: '/tools/compress-pdf' },
      { name: 'Image to PDF', href: '/tools/image-to-pdf' },
    ],
    calculators: [
      { name: 'EMI Calculator', href: '/calculators/emi' },
      { name: 'GST Calculator', href: '/calculators/gst' },
      { name: 'BMI Calculator', href: '/calculators/bmi' },
      { name: 'Age Calculator', href: '/calculators/age' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-navy-900 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <FileText className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                PDFImage Online
              </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-8">
              The ultimate browser-based toolset for PDF manipulation and smart calculations. 
              Fast, secure, and 100% private processing on your device.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-slate-500 hover:text-accent-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-accent-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-accent-purple transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:support@pdfimage.online" className="text-slate-500 hover:text-accent-purple transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">PDF Tools</h4>
            <ul className="space-y-4">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Calculators</h4>
            <ul className="space-y-4">
              {footerLinks.calculators.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal & Info</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} PDFImage Online. Built for privacy and speed.
          </p>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

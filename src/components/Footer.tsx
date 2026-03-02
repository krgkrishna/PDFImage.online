import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
      { name: 'PDF to Image', href: '/tools/pdf-to-image' },
      { name: 'Compress PDF', href: '/tools/compress-pdf' },
      { name: 'Image to PDF', href: '/tools/image-to-pdf' },
      { name: 'EMI Calculator', href: '/calculators/emi' },
      { name: 'GST Calculator', href: '/calculators/gst' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Security', href: '#' },
    ],
  };

  return (
    <footer className="relative mt-20">
      {/* Subtle Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent opacity-50" />
      
      <div className="bg-navy-900/40 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          >
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <div className="w-9 h-9 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                  <FileText className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  PDFImage<span className="text-accent-purple">.</span>
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
                Professional-grade digital tools, processed entirely in your browser for maximum privacy and speed.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Tools</h4>
                <ul className="space-y-3">
                  {footerLinks.tools.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-blue transition-all duration-300 text-sm font-medium relative group inline-block"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-blue transition-all duration-300 text-sm font-medium relative group inline-block"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-blue transition-all duration-300 text-sm font-medium relative group inline-block"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm font-medium mb-1">
                © {currentYear} PDFImage Online
              </p>
              <p className="text-slate-600 text-[11px]">
                All processing happens 100% in your browser.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-xs font-medium">
              <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-slate-500 hover:text-white transition-colors">Support</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

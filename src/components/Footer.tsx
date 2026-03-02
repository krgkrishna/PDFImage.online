import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from '../utils/utils';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const footerLinks = {
    tools: [
      { name: 'Unlock PDF', href: '/unlock' },
      { name: 'PDF to Image', href: '/pdf-to-image' },
      { name: 'Compress PDF', href: '/compress' },
      { name: 'Image to PDF', href: '/image-to-pdf' },
      { name: 'EMI Calculator', href: '/emi' },
      { name: 'GST Calculator', href: '/gst' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
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
              <Link to="/" className="flex items-center space-x-3 mb-6 group relative inline-flex">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                    <FileText className="text-white w-5 h-5" />
                  </div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-accent-purple transition-colors">
                    PDFImage Online
                  </span>
                  {location.pathname === '/' && (
                    <motion.div 
                      layoutId="footer-logo-active"
                      className="h-0.5 w-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full mt-0.5"
                    />
                  )}
                </div>
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
                        className={cn(
                          "transition-all duration-300 text-sm font-medium relative group inline-block",
                          isActive(link.href) 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue" 
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        {link.name}
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300",
                          isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        )} />
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
                        className={cn(
                          "transition-all duration-300 text-sm font-medium relative group inline-block",
                          isActive(link.href) 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue" 
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        {link.name}
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300",
                          isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        )} />
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
                        className={cn(
                          "transition-all duration-300 text-sm font-medium relative group inline-block",
                          isActive(link.href) 
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue" 
                            : "text-slate-400 hover:text-white"
                        )}
                      >
                        {link.name}
                        <span className={cn(
                          "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-300",
                          isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        )} />
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
              <Link to="/privacy" className={cn("transition-colors", isActive('/privacy') ? "text-white" : "text-slate-500 hover:text-white")}>Privacy Policy</Link>
              <Link to="/terms" className={cn("transition-colors", isActive('/terms') ? "text-white" : "text-slate-500 hover:text-white")}>Terms of Service</Link>
              <Link to="/contact" className={cn("transition-colors", isActive('/contact') ? "text-white" : "text-slate-500 hover:text-white")}>Support</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

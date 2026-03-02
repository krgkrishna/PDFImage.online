import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { 
      name: 'PDF Tools', 
      href: '#',
      dropdown: [
        { name: 'Unlock PDF', href: '/unlock' },
        { name: 'PDF to Image', href: '/pdf-to-image' },
        { name: 'Compress PDF', href: '/compress' },
        { name: 'Image to PDF', href: '/image-to-pdf' },
      ]
    },
    { 
      name: 'Calculators', 
      href: '#',
      dropdown: [
        { name: 'EMI Calculator', href: '/emi' },
        { name: 'GST Calculator', href: '/gst' },
        { name: 'BMI Calculator', href: '/bmi' },
        { name: 'Age Calculator', href: '/age' },
      ]
    },
    { 
      name: 'Company', 
      href: '#',
      dropdown: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
      ]
    },
    { 
      name: 'Legal', 
      href: '#',
      dropdown: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Security', href: '/security' },
      ]
    },
  ];

  const isActive = (path: string) => {
    if (path === '#' || path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const isGroupActive = (dropdown?: { href: string }[]) => {
    if (!dropdown) return false;
    return dropdown.some(item => location.pathname === item.href);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 transition-all duration-300 border-b",
      isOpen ? "z-[9999]" : "z-50",
      scrolled 
        ? "bg-navy-900/80 backdrop-blur-xl border-white/10 py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                <FileText className="text-white w-6 h-6" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent-purple/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-extrabold tracking-tight transition-all duration-300",
                location.pathname === '/' 
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-accent-purple" 
                  : "text-white group-hover:text-accent-purple"
              )}>
                PDFImage Online
              </span>
              {location.pathname === '/' && (
                <motion.div 
                  layoutId="logo-active"
                  className="h-0.5 w-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full mt-0.5"
                />
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-3 py-2">
                <Link
                  to={link.href}
                  className={cn(
                    "text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5",
                    isGroupActive(link.dropdown) || isActive(link.href) ? "text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
                </Link>
                
                {/* Active Underline */}
                {(isGroupActive(link.dropdown) || isActive(link.href)) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full"
                  />
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="glass-card p-2 min-w-[220px] shadow-2xl border-white/10">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm font-medium rounded-xl transition-all",
                            isActive(item.href) 
                              ? "bg-white/10 text-white" 
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pl-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/#tools" className="btn-primary py-2.5 px-8 text-sm tracking-wider uppercase font-bold">
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer using Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[99999] lg:hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-full sm:w-[350px] bg-navy-900 border-l border-white/10 overflow-y-auto shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-10">
                    <span className="font-bold text-lg text-white">Menu</span>
                    <button 
                      onClick={() => setIsOpen(false)} 
                      className="text-slate-400 p-2 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {navLinks.map((link) => (
                      <div key={link.name} className="space-y-3 pb-4 border-b border-white/5 last:border-0">
                        <div className={cn(
                          "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2",
                          isGroupActive(link.dropdown) && "text-accent-purple"
                        )}>
                          {link.name}
                        </div>
                        
                        {link.dropdown && (
                          <div className="grid grid-cols-1 gap-3">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block text-lg font-bold transition-colors",
                                  isActive(item.href) ? "text-white" : "text-slate-400 hover:text-white"
                                )}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="pt-6">
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to="/#tools"
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-center btn-primary py-5 rounded-2xl text-lg font-black tracking-widest uppercase"
                        >
                          Get Started Free
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

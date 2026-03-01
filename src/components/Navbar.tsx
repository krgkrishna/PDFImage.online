import React, { useState, useEffect } from 'react';
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'PDF Tools', 
      href: '/#tools',
      dropdown: [
        { name: 'Unlock PDF', href: '/tools/unlock-pdf' },
        { name: 'PDF to Image', href: '/tools/pdf-to-image' },
        { name: 'Compress PDF', href: '/tools/compress-pdf' },
        { name: 'Image to PDF', href: '/tools/image-to-pdf' },
      ]
    },
    { 
      name: 'Calculators', 
      href: '/#calculators',
      dropdown: [
        { name: 'EMI Calculator', href: '/calculators/emi' },
        { name: 'GST Calculator', href: '/calculators/gst' },
        { name: 'BMI Calculator', href: '/calculators/bmi' },
        { name: 'Age Calculator', href: '/calculators/age' },
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-navy-900/80 backdrop-blur-xl border-white/10 py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <FileText className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              PDFImage Online
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-3 py-2">
                <Link
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors flex items-center gap-1",
                    isActive(link.href) ? "text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
                </Link>
                
                {/* Active Underline */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-accent-purple to-accent-blue"
                  />
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="glass-card p-2 min-w-[200px] shadow-2xl">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pl-4">
              <Link to="/#tools" className="btn-primary py-2 px-6 text-sm">
                Get Started
              </Link>
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

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-navy-900 border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="font-bold text-lg">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="text-slate-400 p-2">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {navLinks.map((link) => (
                    <div key={link.name} className="space-y-3">
                      <Link
                        to={link.href}
                        className={cn(
                          "block text-lg font-semibold",
                          isActive(link.href) ? "text-accent-purple" : "text-white"
                        )}
                      >
                        {link.name}
                      </Link>
                      
                      {link.dropdown && (
                        <div className="pl-4 space-y-3 border-l border-white/5">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block text-sm text-slate-400 hover:text-white"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-6">
                    <Link
                      to="/#tools"
                      className="block w-full text-center btn-primary py-3"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

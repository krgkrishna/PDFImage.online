import React from 'react';
import { motion } from 'framer-motion';
import { 
  Unlock, 
  FileArchive, 
  Image as ImageIcon, 
  Calculator, 
  Percent, 
  Scale, 
  Calendar,
  Shield,
  Zap,
  Smartphone
} from 'lucide-react';
import { ToolCard } from '../components/ToolCard';

export const Home = () => {
  const pdfTools = [
    {
      title: 'Unlock PDF',
      description: 'Remove passwords and restrictions from your PDF files instantly.',
      icon: Unlock,
      href: '/tools/unlock-pdf',
      color: 'bg-red-500/20 text-red-400'
    },
    {
      title: 'PDF to Image',
      description: 'Convert PDF pages into high-quality PNG images individually.',
      icon: ImageIcon,
      href: '/tools/pdf-to-image',
      color: 'bg-indigo-500/20 text-indigo-400'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size without losing quality for easier sharing.',
      icon: FileArchive,
      href: '/tools/compress-pdf',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Image to PDF',
      description: 'Convert JPG, PNG, and other images to high-quality PDF documents.',
      icon: ImageIcon,
      href: '/tools/image-to-pdf',
      color: 'bg-emerald-500/20 text-emerald-400'
    }
  ];

  const calculators = [
    {
      title: 'EMI Calculator',
      description: 'Calculate your monthly loan installments with detailed breakdown.',
      icon: Calculator,
      href: '/calculators/emi',
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'GST Calculator',
      description: 'Quickly calculate GST inclusive and exclusive amounts.',
      icon: Percent,
      href: '/calculators/gst',
      color: 'bg-orange-500/20 text-orange-400'
    },
    {
      title: 'BMI Calculator',
      description: 'Check your Body Mass Index and health category easily.',
      icon: Scale,
      href: '/calculators/bmi',
      color: 'bg-pink-500/20 text-pink-400'
    },
    {
      title: 'Age Calculator',
      description: 'Find out your exact age in years, months, and days.',
      icon: Calendar,
      href: '/calculators/age',
      color: 'bg-indigo-500/20 text-indigo-400'
    }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            All-in-One <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue">
              Digital Toolset
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Fast, secure, and browser-based tools for your daily tasks. 
            No uploads required—everything happens on your device.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools" className="btn-primary">
              Explore PDF Tools
            </a>
            <a href="#calculators" className="glass-card px-8 py-3 font-semibold hover:bg-white/10">
              Smart Calculators
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-accent-purple/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-accent-purple w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Private & Secure</h3>
            <p className="text-slate-400 text-sm">Your files never leave your browser. Processing is 100% client-side.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-accent-blue w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
            <p className="text-slate-400 text-sm">Optimized algorithms ensure near-instant results for all tools.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="text-emerald-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Mobile Ready</h3>
            <p className="text-slate-400 text-sm">Fully responsive design works perfectly on any device or screen size.</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">PDF Utilities</h2>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden md:block" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfTools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Smart Calculators</h2>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden md:block" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calc) => (
            <ToolCard key={calc.title} {...calc} />
          ))}
        </div>
      </section>
    </div>
  );
};

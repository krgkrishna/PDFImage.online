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
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Star,
  Layers,
  Activity
} from 'lucide-react';
import { ToolCard } from '../components/ToolCard';
import { Link } from 'react-router-dom';

export const Home = () => {
  const pdfTools = [
    {
      title: 'Unlock PDF',
      description: 'Remove passwords and restrictions from your PDF files instantly.',
      icon: Unlock,
      href: '/unlock',
      color: 'bg-red-500/20 text-red-400'
    },
    {
      title: 'PDF to Image',
      description: 'Convert PDF pages into high-quality PNG images individually.',
      icon: ImageIcon,
      href: '/pdf-to-image',
      color: 'bg-indigo-500/20 text-indigo-400'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size without losing quality for easier sharing.',
      icon: FileArchive,
      href: '/compress',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Image to PDF',
      description: 'Convert JPG, PNG, and other images to high-quality PDF documents.',
      icon: ImageIcon,
      href: '/image-to-pdf',
      color: 'bg-emerald-500/20 text-emerald-400'
    }
  ];

  const calculators = [
    {
      title: 'EMI Calculator',
      description: 'Calculate your monthly loan installments with detailed breakdown.',
      icon: Calculator,
      href: '/emi',
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'GST Calculator',
      description: 'Quickly calculate GST inclusive and exclusive amounts.',
      icon: Percent,
      href: '/gst',
      color: 'bg-orange-500/20 text-orange-400'
    },
    {
      title: 'BMI Calculator',
      description: 'Check your Body Mass Index and health category easily.',
      icon: Activity,
      href: '/bmi',
      color: 'bg-pink-500/20 text-pink-400'
    },
    {
      title: 'Age Calculator',
      description: 'Find out your exact age in years, months, and days.',
      icon: Calendar,
      href: '/age',
      color: 'bg-indigo-500/20 text-indigo-400'
    }
  ];

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-purple/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-accent-blue/10 blur-[100px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Star className="w-4 h-4 text-accent-purple mr-2 fill-accent-purple" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">New: Advanced PDF Compression</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl mb-8 tracking-[-0.03em] leading-[1.1] font-sans" style={{ fontWeight: 800 }}>
            Powerful Tools <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-accent-blue to-emerald-400">
              For Every Task.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience the next generation of digital utilities. Fast, secure, and 
            completely browser-based. No registration, no limits, just pure productivity.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/#tools" 
              onClick={(e) => {
                const el = document.getElementById('tools');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-primary px-10 py-4 text-lg flex items-center group tracking-wide"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/#calculators" 
              onClick={(e) => {
                const el = document.getElementById('calculators');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-10 py-4 text-lg font-bold text-white glass-card hover:bg-white/10 flex items-center tracking-wide hover:scale-[1.05] active:scale-[0.97] transition-transform"
            >
              Smart Calculators
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
              <span className="text-sm font-medium">100% Client-Side</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
              <span className="text-sm font-medium">No Data Uploads</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
              <span className="text-sm font-medium">Free Forever</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Privacy First',
              desc: 'Your files never leave your device. We use local WASM and JS libraries for all processing.',
              icon: Shield,
              color: 'text-accent-purple'
            },
            {
              title: 'Instant Results',
              desc: 'Optimized algorithms and multi-threading ensure lightning-fast performance even for large files.',
              icon: Zap,
              color: 'text-accent-blue'
            },
            {
              title: 'Universal Access',
              desc: 'Works perfectly on any modern browser. No installation or account required.',
              icon: Smartphone,
              color: 'text-emerald-400'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-white/20 transition-all"
            >
              <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-accent-purple/10 text-accent-purple text-[10px] font-black uppercase tracking-widest mb-4">
              PDF Suite
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Professional PDF Utilities</h2>
            <p className="text-slate-400">Everything you need to manage, convert, and optimize your PDF documents in one place.</p>
          </div>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden lg:block mb-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pdfTools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest mb-4">
              Smart Tools
            </div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Intelligent Calculators</h2>
            <p className="text-slate-400">Make informed decisions with our suite of financial, health, and utility calculators.</p>
          </div>
          <div className="h-px flex-grow mx-8 bg-white/5 hidden lg:block mb-6" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {calculators.map((calc, i) => (
            <motion.div
              key={calc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ToolCard {...calc} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 -z-10 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-4xl md:text-6xl text-white mb-8 tracking-[-0.02em] leading-[1.2] font-sans" style={{ fontWeight: 700 }}>Ready to boost your <br /> productivity?</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of users who trust PDFImage Online for their daily document and calculation needs.
          </p>
          <Link 
            to="/#tools" 
            onClick={(e) => {
              const el = document.getElementById('tools');
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary px-16 py-5 text-xl tracking-widest uppercase inline-block"
          >
            Start Using For Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

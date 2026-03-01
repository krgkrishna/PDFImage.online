import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Users, Globe } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue">
          About PDFImage Online
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto">
          We are dedicated to providing fast, secure, and accessible digital tools for everyone. 
          Our mission is to simplify your daily document and financial tasks without compromising your privacy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Philosophy</h2>
          <p className="text-slate-400 leading-relaxed">
            In an era where data privacy is often overlooked, PDFImage Online stands out by processing all your files 
            locally within your browser. We believe that your sensitive documents should never leave your device.
          </p>
          <p className="text-slate-400 leading-relaxed">
            By leveraging modern web technologies like WebAssembly and client-side JavaScript libraries, we deliver 
            performance that rivals server-side processing while maintaining 100% data sovereignty for our users.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="glass-card p-6 text-center">
            <Shield className="w-8 h-8 text-accent-purple mx-auto mb-3" />
            <h4 className="font-bold">Privacy First</h4>
          </div>
          <div className="glass-card p-6 text-center">
            <Zap className="w-8 h-8 text-accent-blue mx-auto mb-3" />
            <h4 className="font-bold">Lightning Fast</h4>
          </div>
          <div className="glass-card p-6 text-center">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <h4 className="font-bold">User Centric</h4>
          </div>
          <div className="glass-card p-6 text-center">
            <Globe className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <h4 className="font-bold">Global Access</h4>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-12 text-center bg-gradient-to-br from-accent-purple/5 to-accent-blue/5"
      >
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Built with Passion</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          PDFImage Online is a labor of love, designed to help students, professionals, and small business owners 
          get their work done efficiently. Thank you for choosing us as your trusted tool platform.
        </p>
      </motion.div>
    </div>
  );
};

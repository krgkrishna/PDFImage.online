import React from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export const Terms = () => {
  const terms = [
    {
      title: "Acceptance of Terms",
      icon: Scale,
      content: "By accessing and using PDFImage Online, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services."
    },
    {
      title: "Use of Services",
      icon: CheckCircle,
      content: "You are granted a non-exclusive, non-transferable right to use our tools for personal or professional use. You agree not to use the service for any illegal purposes or to infringe upon the rights of others."
    },
    {
      title: "Disclaimer of Liability",
      icon: AlertTriangle,
      content: "PDFImage Online provides tools 'as is' without any warranties. While we strive for accuracy and security, we are not responsible for any data loss, errors, or damages resulting from the use of our platform."
    },
    {
      title: "Modifications",
      icon: Info,
      content: "We reserve the right to modify or discontinue any part of our service at any time without prior notice. We may also update these terms from time to time, and your continued use constitutes acceptance of the new terms."
    }
  ];

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-lg">
          Last updated: March 1, 2026
        </p>
      </motion.div>

      <div className="space-y-8">
        {terms.map((term, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center mr-4">
                <term.icon className="text-accent-blue w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">{term.title}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {term.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 p-8 border-t border-white/5 text-center text-slate-500 text-sm"
      >
        By using our website, you acknowledge that you have read and understood these terms.
      </motion.div>
    </div>
  );
};

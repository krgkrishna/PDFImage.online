import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const Privacy = () => {
  const sections = [
    {
      title: "1. Data Privacy Policy",
      icon: ShieldCheck,
      content: "At PDFImage Online, your privacy is our top priority. Unlike traditional online tools, we process all your files locally in your browser. This means your documents, images, and financial data never leave your computer or reach our servers."
    },
    {
      title: "2. Information We Collect",
      icon: Eye,
      content: "We do not collect or store any personal information or the content of the files you process. We may collect anonymous usage statistics (such as page views and tool usage) to help us improve our services, but this data is never linked to your identity."
    },
    {
      title: "3. Local Storage & Cookies",
      icon: Lock,
      content: "We may use cookies and local storage to remember your preferences and provide a better user experience. These are stored locally on your device and are not used for tracking purposes across other websites."
    },
    {
      title: "4. Third-Party Services",
      icon: FileText,
      content: "We may use third-party analytics tools (like Google Analytics) to understand how our website is used. These services have their own privacy policies regarding the data they collect."
    }
  ];

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-lg">
          Last updated: March 1, 2026
        </p>
      </motion.div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 text-center flex flex-col items-center"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-4">
                <section.icon className="text-accent-purple w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {section.content}
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
        If you have any questions about our Privacy Policy, please contact us at privacy@pdfimage.online.
      </motion.div>
    </div>
  );
};

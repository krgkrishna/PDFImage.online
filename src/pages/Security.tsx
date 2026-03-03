import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, Globe, CheckCircle } from 'lucide-react';

export const Security = () => {
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue tracking-tight">
          Security Statement
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mx-auto">
          Your data security is our top priority. We've built PDFImage Online with a security-first approach, 
          ensuring that your sensitive documents and information remain private and protected.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-accent-purple/10 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-accent-purple w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Browser-based processing</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Unlike traditional online tools, PDFImage Online processes all your files locally within your browser. 
            This means your documents, images, and financial data never leave your computer. 
            We use modern web technologies like WebAssembly and client-side JavaScript to perform all operations on your device.
          </p>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="text-accent-blue w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">No file storage on servers</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Since all processing is done locally, we never upload your files to our servers. 
            There is no database where your documents are stored, and there is no risk of your files being intercepted or accessed by unauthorized parties on our end. 
            Your privacy is guaranteed by design.
          </p>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Globe className="text-emerald-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">HTTPS encryption</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            All communication between your browser and our website is encrypted using industry-standard SSL/TLS (HTTPS). 
            This ensures that even though your files are processed locally, the website itself is delivered securely, 
            preventing any "man-in-the-middle" attacks.
          </p>
        </section>

        <section className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle className="text-orange-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Data privacy commitment</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            We are committed to maintaining the highest standards of data privacy. 
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. 
            Our business model is built on providing value through our tools, not by monetizing your data.
          </p>
        </section>
      </div>

      <div className="glass-card p-12 text-center bg-gradient-to-br from-accent-purple/5 to-accent-blue/5 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-4">Trust and Transparency</h3>
        <p className="text-slate-400 max-w-2xl leading-relaxed mx-auto">
          We believe that security is built on trust and transparency. 
          If you have any questions or concerns about our security practices, 
          please don't hesitate to reach out to our support team.
        </p>
      </div>
    </div>
  );
};

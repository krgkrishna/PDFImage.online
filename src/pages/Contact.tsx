import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Have questions, feedback, or need support? We're here to help. 
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <div className="flex items-start space-x-4 mb-8">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-accent-purple w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-slate-400 text-sm">support@pdfimage.online</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mb-8">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="text-accent-blue w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Live Chat</h4>
                <p className="text-slate-400 text-sm">Available Mon-Fri, 9am-6pm</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Location</h4>
                <p className="text-slate-400 text-sm">Bangalore, India</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-slate-400 mb-8">Thank you for reaching out. We'll respond shortly.</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="btn-primary px-10 py-3 font-bold tracking-widest uppercase"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                    <input type="text" required className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                    <input type="email" required className="input-field" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                  <input type="text" required className="input-field" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                  <textarea required rows={5} className="input-field resize-none" placeholder="Your message here..."></textarea>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center py-4 text-lg font-bold tracking-widest uppercase"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

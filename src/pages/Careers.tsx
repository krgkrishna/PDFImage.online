import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, ArrowRight, Globe, TrendingUp, Zap, Shield } from 'lucide-react';

const positions = [
  {
    title: 'Frontend Developer',
    description: 'Build high-performance, accessible, and beautiful web interfaces using React and Tailwind CSS.',
    location: 'Remote',
  },
  {
    title: 'Performance Engineer',
    description: 'Optimize client-side processing using WebAssembly and advanced JavaScript techniques.',
    location: 'Remote',
  },
  {
    title: 'UI/UX Designer',
    description: 'Craft intuitive and premium digital experiences for our suite of browser-based tools.',
    location: 'Remote',
  },
];

export const Careers = () => {
  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue tracking-tight">
          Careers at PDFImage Online
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
          We are on a mission to build the world's most secure and accessible browser-based tools. 
          Join us in our journey to redefine digital productivity with a privacy-first mindset.
        </p>
      </motion.div>

      {/* Why Join Us Section */}
      <section className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Join Us?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Remote-First Culture',
              desc: 'Work from anywhere in the world. We value output over hours spent in an office.',
              icon: Globe,
            },
            {
              title: 'Performance-Driven',
              desc: 'We are obsessed with speed. Work on cutting-edge client-side optimization.',
              icon: Zap,
            },
            {
              title: 'Scalable Tools',
              desc: 'Impact millions of users by building tools that run entirely in the browser.',
              icon: TrendingUp,
            },
            {
              title: 'Ownership Mindset',
              desc: 'We empower every team member to take full ownership of their projects.',
              icon: Shield,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {positions.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center h-full group hover:border-white/20 transition-all"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-accent-blue" />
                </div>
                <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3 mr-1" />
                  {role.location}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">
                {role.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {role.description}
              </p>
              
              <button className="btn-primary w-full flex items-center justify-center py-3 text-sm font-bold tracking-widest uppercase group/btn">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

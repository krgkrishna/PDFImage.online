import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, RefreshCw, Info, Activity, User, ArrowRight } from 'lucide-react';

export const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Normal': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Underweight': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Overweight': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Obese': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-white/5 border-white/10';
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <Activity className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">BMI Calculator</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI) instantly to understand your weight status 
          and track your health journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <User className="w-5 h-5 mr-2 text-accent-purple" />
            Your Measurements
          </h3>
          
          <form onSubmit={calculateBMI} className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Weight (kg)</label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-accent-purple transition-all text-lg"
                  required
                  step="0.1"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">kg</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Height (cm)</label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-accent-purple transition-all text-lg"
                  required
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">cm</span>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center py-4 text-lg">
              <Calculator className="w-6 h-6 mr-3" />
              Calculate Now
            </button>
          </form>
        </motion.div>

        {/* Results Card */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {bmi === null ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 h-full flex flex-col items-center justify-center text-center border-dashed"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 mb-2">Awaiting Input</h3>
                <p className="text-slate-500 text-sm">Enter your weight and height to see your BMI results here.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 h-full flex flex-col"
              >
                <div className="text-center mb-8">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Your Body Mass Index</p>
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-7xl font-black text-white tracking-tighter mb-4"
                  >
                    {bmi}
                  </motion.h2>
                  <div className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest border ${getCategoryColor(category)}`}>
                    {category}
                  </div>
                </div>

                {/* BMI Scale Visualization */}
                <div className="mt-auto space-y-6">
                  <div className="relative h-3 bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500/50" style={{ width: '18.5%' }} />
                    <div className="h-full bg-emerald-500/50" style={{ width: '6.5%' }} />
                    <div className="h-full bg-emerald-500/50" style={{ width: '18.5%' }} />
                    <div className="h-full bg-orange-500/50" style={{ width: '10%' }} />
                    <div className="h-full bg-red-500/50" style={{ width: '46.5%' }} />
                    
                    {/* Indicator */}
                    <motion.div 
                      initial={{ left: '0%' }}
                      animate={{ left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-[8px] font-black text-slate-600 uppercase tracking-tighter text-center">
                    <div>Under<br/>&lt;18.5</div>
                    <div>Normal<br/>18.5-25</div>
                    <div>Over<br/>25-30</div>
                    <div>Obese<br/>30+</div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <button
                    onClick={reset}
                    className="flex items-center justify-center mx-auto text-slate-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest group"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Calculate Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'What is BMI?',
            desc: 'BMI is a measurement of a person\'s leanness or corpulence based on their height and weight.',
            icon: Info
          },
          {
            title: 'Health Indicator',
            desc: 'It is used as a screening tool to identify possible weight problems for adults.',
            icon: Activity
          },
          {
            title: 'Next Steps',
            desc: 'If your BMI is outside the normal range, consult with a healthcare professional.',
            icon: ArrowRight
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10"
          >
            <item.icon className="w-8 h-8 text-accent-purple mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RefreshCw } from 'lucide-react';

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
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="pt-32 pb-20 max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">BMI Calculator</h1>
        <p className="text-slate-400">Calculate your Body Mass Index (BMI) to check your health status.</p>
      </motion.div>

      <div className="glass-card p-8">
        <form onSubmit={calculateBMI} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                className="input-field"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                className="input-field"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center">
            <Calculator className="w-5 h-5 mr-2" />
            Calculate BMI
          </button>
        </form>

        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-center"
          >
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Your BMI is</p>
            <h2 className="text-5xl font-bold text-accent-purple mb-4">{bmi}</h2>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 ${
              category === 'Normal weight' ? 'bg-emerald-500/20 text-emerald-400' : 
              category === 'Underweight' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {category}
            </div>

            <div className="grid grid-cols-2 gap-4 text-left text-xs text-slate-500 border-t border-white/5 pt-6">
              <div>
                <p className="mb-1">Underweight: &lt; 18.5</p>
                <p>Normal: 18.5 – 24.9</p>
              </div>
              <div>
                <p className="mb-1">Overweight: 25 – 29.9</p>
                <p>Obese: 30 or greater</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-8 flex items-center justify-center mx-auto text-slate-400 hover:text-white transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

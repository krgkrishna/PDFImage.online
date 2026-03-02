import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Percent, ArrowRight, Calculator as CalcIcon, Info, CheckCircle2, Receipt } from 'lucide-react';
import { calculateGST } from '../utils/calculators';
import { formatCurrency } from '../utils/utils';

export const GSTCalculator = () => {
  const [amount, setAmount] = React.useState(10000);
  const [rate, setRate] = React.useState(18);
  const [isInclusive, setIsInclusive] = React.useState(false);

  const results = calculateGST(amount, rate, isInclusive);

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <Percent className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">GST Calculator</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Calculate GST inclusive and exclusive amounts with precision. 
          Get a detailed breakdown of tax components instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <CalcIcon className="w-5 h-5 mr-2 text-accent-purple" />
            Tax Parameters
          </h3>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Base Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-6 py-4 text-white font-bold focus:outline-none focus:border-accent-purple transition-all text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">GST Rate (%)</label>
              <div className="grid grid-cols-4 gap-3">
                {[5, 12, 18, 28].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${
                      rate === r 
                        ? 'bg-accent-purple border-accent-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                        : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input
                  type="number"
                  placeholder="Custom rate"
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-bold">%</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Calculation Type</label>
              <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setIsInclusive(false)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                    !isInclusive ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  GST Exclusive
                </button>
                <button
                  onClick={() => setIsInclusive(true)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                    isInclusive ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  GST Inclusive
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-8 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 border-accent-purple/20">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-accent-purple" />
              Tax Invoice Summary
            </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-400 font-medium">Net Amount</span>
                <span className="font-bold text-white">{formatCurrency(results.originalAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex flex-col">
                  <span className="text-slate-400 font-medium">GST Amount ({rate}%)</span>
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">CGST + SGST</span>
                </div>
                <span className="font-bold text-accent-purple">+{formatCurrency(results.gstAmount)}</span>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex justify-between items-center p-6 rounded-3xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.2em] mb-1">Total Amount</p>
                    <p className="text-slate-200 text-sm">Inclusive of all taxes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white tracking-tight">{formatCurrency(results.totalAmount)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-accent-purple/5 border border-accent-purple/10 flex items-start">
              <Info className="w-5 h-5 text-accent-purple mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                {isInclusive 
                  ? `The base amount is calculated by removing ${rate}% GST from the total.` 
                  : `The total amount is calculated by adding ${rate}% GST to the base amount.`}
              </p>
            </div>
          </div>

          {/* Components Breakdown */}
          <div className="glass-card p-6">
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Tax Components</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">CGST ({(rate/2).toFixed(1)}%)</p>
                <p className="text-lg font-bold text-white">{formatCurrency(results.gstAmount / 2)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">SGST ({(rate/2).toFixed(1)}%)</p>
                <p className="text-lg font-bold text-white">{formatCurrency(results.gstAmount / 2)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Inclusive GST',
            desc: 'Calculate the base price when you already know the total price including tax.',
            icon: Receipt
          },
          {
            title: 'Exclusive GST',
            desc: 'Calculate the total price by adding the tax amount to the base price.',
            icon: Percent
          },
          {
            title: 'Accurate Results',
            desc: 'Our calculator uses standard tax formulas to ensure 100% accuracy.',
            icon: CheckCircle2
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

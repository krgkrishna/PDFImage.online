import React from 'react';
import { motion } from 'framer-motion';
import { Percent, ArrowRight, Calculator as CalcIcon } from 'lucide-react';
import { calculateGST } from '../utils/calculators';
import { formatCurrency } from '../utils/utils';

export const GSTCalculator = () => {
  const [amount, setAmount] = React.useState(10000);
  const [rate, setRate] = React.useState(18);
  const [isInclusive, setIsInclusive] = React.useState(false);

  const results = calculateGST(amount, rate, isInclusive);

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">GST Calculator</h1>
        <p className="text-slate-400">Calculate GST inclusive and exclusive amounts quickly.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">GST Rate (%)</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`py-2 rounded-lg border transition-all ${
                      rate === r 
                        ? 'bg-accent-purple border-accent-purple text-white' 
                        : 'border-white/10 text-slate-400 hover:border-white/30'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
              <button
                onClick={() => setIsInclusive(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isInclusive ? 'bg-white/10 text-white' : 'text-slate-500'
                }`}
              >
                Exclusive
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  isInclusive ? 'bg-white/10 text-white' : 'text-slate-500'
                }`}
              >
                Inclusive
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10">
            <h3 className="text-lg font-bold mb-6">Calculation Result</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Net Amount</span>
                <span className="font-semibold">{formatCurrency(results.originalAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">GST Amount ({rate}%)</span>
                <span className="font-semibold text-accent-purple">+{formatCurrency(results.gstAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-400">Total Amount</span>
                <span className="font-bold text-2xl">{formatCurrency(results.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

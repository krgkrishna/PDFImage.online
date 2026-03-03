import React from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, PieChart, TrendingUp, Wallet, ArrowRight, Info } from 'lucide-react';
import { calculateEMI } from '../utils/calculators';
import { formatCurrency } from '../utils/utils';

export const EMICalculator = () => {
  const [principal, setPrincipal] = React.useState(1000000);
  const [rate, setRate] = React.useState(8.5);
  const [tenure, setTenure] = React.useState(120); // Months

  const results = calculateEMI(principal, rate, tenure);

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <CalcIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">EMI Calculator</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Plan your finances with precision. Calculate monthly installments, 
          total interest, and repayment schedules instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-bold mb-8 flex items-center justify-center">
              <Info className="w-5 h-5 mr-2 text-accent-purple" />
              Loan Details
            </h3>
            
            <div className="space-y-10">
              {/* Principal */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-right text-white font-bold focus:outline-none focus:border-accent-purple w-40 transition-colors"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>₹10k</span>
                  <span>₹10M</span>
                </div>
              </div>

              {/* Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Interest Rate (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-right text-white font-bold focus:outline-none focus:border-accent-purple w-24 transition-colors"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tenure (Months)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-right text-white font-bold focus:outline-none focus:border-accent-purple w-24 transition-colors"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="360"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <span>1 Mo</span>
                  <span>30 Yrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 text-center border-accent-purple/20 bg-accent-purple/5"
            >
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="text-accent-purple w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Monthly EMI</p>
              <p 
                className="font-black text-white tracking-tight break-words overflow-wrap-anywhere"
                style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
              >
                {formatCurrency(results.monthlyEmi)}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 text-center border-orange-500/20 bg-orange-500/5"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-orange-400 w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Total Interest</p>
              <p 
                className="font-black text-white tracking-tight break-words overflow-wrap-anywhere"
                style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
              >
                {formatCurrency(results.totalInterest)}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 text-center border-emerald-500/20 bg-emerald-500/5"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PieChart className="text-emerald-400 w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Total Payment</p>
              <p 
                className="font-black text-white tracking-tight break-words overflow-wrap-anywhere"
                style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
              >
                {formatCurrency(results.totalPayment)}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center justify-center">
              <CalcIcon className="mr-3 w-6 h-6 text-accent-purple" />
              Repayment Breakdown
            </h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-accent-blue mr-3" />
                  <span className="text-slate-400 font-medium">Principal Amount</span>
                </div>
                <span className="font-bold text-white">{formatCurrency(principal)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mr-3" />
                  <span className="text-slate-400 font-medium">Total Interest</span>
                </div>
                <span className="font-bold text-orange-400">{formatCurrency(results.totalInterest)}</span>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-white/10">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.2em] mb-1">Total Repayment</p>
                    <p className="text-slate-200 text-sm">Principal + Interest</p>
                  </div>
                  <div className="w-full">
                    <p 
                      className="font-black text-white tracking-tight break-words overflow-wrap-anywhere"
                      style={{ fontSize: 'clamp(20px, 5vw, 32px)' }}
                    >
                      {formatCurrency(results.totalPayment)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start text-left">
              <Info className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                This calculation is an estimate. Actual bank rates and processing fees may vary. 
                Always consult with your financial advisor before making major commitments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

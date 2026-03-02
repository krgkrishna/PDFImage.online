import React from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, PieChart, TrendingUp, Wallet } from 'lucide-react';
import { calculateEMI } from '../utils/calculators';
import { formatCurrency } from '../utils/utils';

export const EMICalculator = () => {
  const [principal, setPrincipal] = React.useState(1000000);
  const [rate, setRate] = React.useState(8.5);
  const [tenure, setTenure] = React.useState(120); // Months

  const results = calculateEMI(principal, rate, tenure);

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">EMI Calculator</h1>
        <p className="text-slate-400">Calculate your monthly loan installments and total interest.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400">Loan Amount</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="bg-transparent text-right text-accent-purple font-bold focus:outline-none w-32"
                  />
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full accent-accent-purple"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="bg-transparent text-right text-accent-purple font-bold focus:outline-none w-20"
                    step="0.1"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-accent-purple"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-400">Tenure (Months)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="bg-transparent text-right text-accent-purple font-bold focus:outline-none w-20"
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="360"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-accent-purple"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Wallet className="text-accent-purple w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Monthly EMI</p>
              <p className="text-xl font-bold">{formatCurrency(results.monthlyEmi)}</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="text-orange-400 w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Interest</p>
              <p className="text-xl font-bold">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <PieChart className="text-emerald-400 w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Payment</p>
              <p className="text-xl font-bold">{formatCurrency(results.totalPayment)}</p>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <CalcIcon className="mr-2 w-5 h-5 text-accent-purple" />
              Breakdown Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Principal Amount</span>
                <span className="font-semibold">{formatCurrency(principal)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Total Interest Payable</span>
                <span className="font-semibold text-orange-400">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-400">Total Amount (Principal + Interest)</span>
                <span className="font-bold text-xl text-accent-purple">{formatCurrency(results.totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

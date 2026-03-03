import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, RefreshCw, Clock, Star, Gift, AlertCircle } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  daysToNextBirthday: number;
}

export const AgeCalculator = () => {
  const [dob, setDob] = useState<string>('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    
    // Reset time to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate > today) {
      setError('Date of birth cannot be in the future.');
      setResult(null);
      return;
    }

    setError('');

    // Main Age Calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total Stats
    const diffTime = today.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next Birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const timeToNextBirthday = nextBirthday.getTime() - today.getTime();
    const daysToNextBirthday = Math.ceil(timeToNextBirthday / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      daysToNextBirthday
    });
  };

  const reset = () => {
    setDob('');
    setResult(null);
    setError('');
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-center">Age Calculator</h1>
        <p className="text-slate-400 text-center">Calculate your exact age and see interesting life statistics.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="lg:col-span-4">
          <div className="glass-card p-6 sticky top-32">
            <form onSubmit={calculateAge} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`input-field w-full pl-10 ${error ? 'border-red-500/50' : ''}`}
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-red-400 text-xs mt-2 flex items-center"
                  >
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {error}
                  </motion.p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center py-3">
                <Clock className="w-5 h-5 mr-2" />
                Calculate
              </button>

              {result && (
                <button
                  type="button"
                  onClick={reset}
                  className="w-full flex items-center justify-center text-slate-500 hover:text-white transition-colors text-sm py-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-500">Enter your birth date</h3>
                <p className="text-slate-600 text-sm max-w-xs mx-auto mt-2">
                  We'll calculate your exact age and show you some interesting milestones.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Main Age Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Years', value: result.years, icon: Star },
                    { label: 'Months', value: result.months, icon: Clock },
                    { label: 'Days', value: result.days, icon: Calendar },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card p-6 text-center group hover:-translate-y-1 transition-all duration-300 border-accent-purple/10 hover:border-accent-purple/30 shadow-lg hover:shadow-accent-purple/5"
                    >
                      <p className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {item.value}
                      </p>
                      <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.2em]">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Secondary Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Months', value: result.totalMonths.toLocaleString() },
                    { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
                    { label: 'Total Days', value: result.totalDays.toLocaleString() },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                    >
                      <p className="text-xl font-semibold text-white mb-1">{item.value}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Next Birthday Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-white/10"
                >
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h4 className="text-lg font-bold text-white mb-1 flex items-center justify-center md:justify-start">
                        <Gift className="w-5 h-5 mr-2 text-accent-purple" />
                        Next Birthday
                      </h4>
                      <p className="text-slate-400 text-sm">Get ready for your next big celebration!</p>
                    </div>
                    <div className="text-center">
                      <p className="text-5xl font-black text-white tracking-tighter">
                        {result.daysToNextBirthday}
                      </p>
                      <p className="text-[10px] font-bold text-accent-purple uppercase tracking-[0.2em]">Days Left</p>
                    </div>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent-purple/20 blur-3xl rounded-full" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

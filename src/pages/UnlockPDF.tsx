import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, Loader2, AlertCircle, Lock, Unlock, CheckCircle2, X } from 'lucide-react';
import { unlockPdf } from '../lib/pdf';

export const UnlockPDF = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState('');
  const [result, setResult] = React.useState<Blob | null>(null);

  const abortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file.');
        return;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setFile(selectedFile);
      setError('');
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const unlocked = await unlockPdf(file, password, abortControllerRef.current.signal);
      setResult(unlocked);
      
      // Automatic download
      const url = URL.createObjectURL(unlocked);
      const a = document.createElement('a');
      a.href = url;
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      a.download = `${originalName}-unlocked.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Failed to unlock PDF. Please check your password.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result || !file) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    a.download = `${originalName}-unlocked.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setPassword('');
    setError('');
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Unlock PDF</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Remove passwords and restrictions from your PDF files instantly. 
          100% secure, browser-based processing.
        </p>
      </motion.div>

      <div className="glass-card overflow-hidden">
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 sm:p-12 text-center"
            >
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 sm:p-10 hover:border-accent-purple/50 hover:bg-accent-purple/5 transition-all cursor-pointer relative group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="relative z-0">
                  <div className="w-16 h-16 bg-accent-purple/10 text-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">Choose PDF file</h3>
                  <p className="text-slate-400 mb-2 text-sm">or drag and drop it here</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Max file size: 50MB</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="process"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8"
            >
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
                <div className="flex items-center min-w-0">
                  <div className="w-12 h-12 bg-accent-purple/10 text-accent-purple rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate pr-4">{file.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={reset} 
                  className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!result ? (
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                      PDF Password (if encrypted)
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password to unlock"
                        className="input-field w-full pl-12"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm"
                    >
                      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <button
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className="btn-primary w-full flex items-center justify-center py-4 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Unlocking PDF...
                      </>
                    ) : (
                      <>
                        <Unlock className="w-6 h-6 mr-3" />
                        Unlock PDF
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white tracking-tight">PDF Unlocked!</h3>
                  <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                    Your file has been successfully decrypted and is ready for download.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={downloadResult} className="btn-primary flex-1 flex items-center justify-center py-4">
                      <Download className="w-6 h-6 mr-3" />
                      Download Now
                    </button>
                    <button 
                      onClick={reset} 
                      className="btn-secondary flex-1 flex items-center justify-center py-4"
                    >
                      Process Another
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: '100% Private',
            desc: 'Files never leave your device. All processing happens locally in your browser.',
            icon: Lock
          },
          {
            title: 'No Limits',
            desc: 'Unlock as many files as you need without any daily restrictions or costs.',
            icon: Unlock
          },
          {
            title: 'Fast & Secure',
            desc: 'Instant decryption using high-performance client-side libraries.',
            icon: CheckCircle2
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col items-center"
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

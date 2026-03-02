import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, Loader2, AlertCircle, Zap, CheckCircle2, X, BarChart3 } from 'lucide-react';
import { compressPdf } from '../lib/pdf';

type CompressionLevel = 'low' | 'medium' | 'high';

export const CompressPDF = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = React.useState(0);
  const [newSize, setNewSize] = React.useState(0);
  const [error, setError] = React.useState('');
  const [level, setLevel] = React.useState<CompressionLevel>('medium');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file.');
        return;
      }
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setResult(null);
      setError('');
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');
    try {
      const compressed = await compressPdf(file, level);
      setResult(compressed);
      setNewSize(compressed.size);
    } catch (err: any) {
      setError(err.message || 'Failed to compress PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result || !file) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  const savings = originalSize > 0 ? Math.max(0, Math.round(((originalSize - newSize) / originalSize) * 100)) : 0;

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <Zap className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Compress PDF</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Reduce PDF file size while maintaining visual quality. 
          Optimized for speed and privacy.
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
              className="p-12 text-center"
            >
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 hover:border-accent-purple/50 hover:bg-accent-purple/5 transition-all cursor-pointer relative group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="relative z-0">
                  <div className="w-20 h-20 bg-accent-purple/10 text-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Choose PDF file</h3>
                  <p className="text-slate-400 mb-2">or drag and drop it here</p>
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
                      {(originalSize / 1024 / 1024).toFixed(2)} MB
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
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">
                      Compression Level
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['low', 'medium', 'high'] as CompressionLevel[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLevel(l)}
                          className={`p-4 rounded-2xl border transition-all text-center ${
                            level === l 
                              ? 'bg-accent-purple/10 border-accent-purple text-white shadow-lg shadow-accent-purple/10' 
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <p className="text-sm font-bold capitalize mb-1">{l}</p>
                          <p className="text-[10px] uppercase tracking-tighter opacity-60">
                            {l === 'low' ? 'Best Quality' : l === 'medium' ? 'Balanced' : 'Smallest Size'}
                          </p>
                        </button>
                      ))}
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
                        Compressing PDF...
                      </>
                    ) : (
                      <>
                        <Zap className="w-6 h-6 mr-3" />
                        Compress PDF
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-6 border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Original Size</p>
                      <p className="text-3xl font-bold text-white tracking-tight">
                        {(originalSize / 1024 / 1024).toFixed(2)} <span className="text-sm font-medium text-slate-500">MB</span>
                      </p>
                    </div>
                    <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                      <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em] mb-2">Compressed Size</p>
                      <p className="text-3xl font-bold text-emerald-400 tracking-tight">
                        {(newSize / 1024 / 1024).toFixed(2)} <span className="text-sm font-medium text-emerald-500/60">MB</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-10 p-6 rounded-3xl bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 border border-white/10 relative overflow-hidden">
                    <div className="relative z-10">
                      <BarChart3 className="w-10 h-10 text-accent-purple mx-auto mb-3" />
                      <h4 className="text-2xl font-bold text-white mb-1">Saved {savings}% of space!</h4>
                      <p className="text-slate-400 text-sm">Your PDF is now optimized for sharing and storage.</p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-accent-purple/10 blur-2xl rounded-full" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={downloadResult} className="btn-primary flex-1 flex items-center justify-center py-4">
                      <Download className="w-6 h-6 mr-3" />
                      Download Optimized PDF
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
            title: 'Smart Optimization',
            desc: 'Our algorithms intelligently reduce file size without sacrificing readability.',
            icon: Zap
          },
          {
            title: 'Privacy First',
            desc: 'Compression happens entirely in your browser. No files are uploaded to any server.',
            icon: CheckCircle2
          },
          {
            title: 'Universal Support',
            desc: 'Works with all PDF versions and types, from text-heavy reports to image-rich portfolios.',
            icon: BarChart3
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

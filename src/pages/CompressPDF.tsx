import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, AlertCircle, Zap } from 'lucide-react';
import { compressPdf } from '../lib/pdf';

export const CompressPDF = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = React.useState(0);
  const [newSize, setNewSize] = React.useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setOriginalSize(e.target.files[0].size);
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const compressed = await compressPdf(file);
      setResult(compressed);
      setNewSize(compressed.size);
    } catch (err) {
      console.error(err);
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

  const savings = originalSize > 0 ? Math.round(((originalSize - newSize) / originalSize) * 100) : 0;

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Compress PDF</h1>
        <p className="text-slate-400">Reduce PDF file size while maintaining visual quality.</p>
      </motion.div>

      <div className="glass-card p-8">
        {!file ? (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-accent-purple/50 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Zap className="w-12 h-12 text-accent-purple mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Click or drag PDF here</p>
            <p className="text-slate-400 text-sm">Secure client-side compression</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
              <FileText className="text-accent-purple mr-4" />
              <div className="flex-grow">
                <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-slate-500">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-500 hover:text-white text-sm">Change</button>
            </div>

            {!result ? (
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  'Compress PDF'
                )}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs text-slate-500 uppercase mb-1">Original</p>
                    <p className="font-bold">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <p className="text-xs text-emerald-500/60 uppercase mb-1">Compressed</p>
                    <p className="font-bold text-emerald-400">{(newSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-accent-purple/10 rounded-xl border border-accent-purple/20">
                  <p className="text-accent-purple font-bold text-lg">Saved {savings}% of space!</p>
                </div>

                <button onClick={downloadResult} className="btn-primary w-full">
                  Download Compressed PDF
                </button>
                <button 
                  onClick={() => {setFile(null); setResult(null);}} 
                  className="mt-4 text-slate-500 hover:text-white text-sm"
                >
                  Compress another file
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

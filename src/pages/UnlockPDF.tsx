import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, AlertCircle } from 'lucide-react';
import { unlockPdf } from '../lib/pdf';

export const UnlockPDF = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState('');
  const [result, setResult] = React.useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');
    try {
      const unlocked = await unlockPdf(file, password);
      setResult(unlocked);
    } catch (err: any) {
      setError(err.message || 'Failed to unlock PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result || !file) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unlocked_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Unlock PDF</h1>
        <p className="text-slate-400">Remove passwords and restrictions from your PDF files.</p>
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
            <Upload className="w-12 h-12 text-accent-purple mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Click or drag PDF here</p>
            <p className="text-slate-400 text-sm">Secure client-side processing</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
              <FileText className="text-accent-purple mr-4" />
              <div className="flex-grow">
                <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-slate-500 hover:text-white text-sm">Change</button>
            </div>

            {!result ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">PDF Password (if any)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field"
                  />
                </div>

                {error && (
                  <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Unlock PDF'
                  )}
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">PDF Unlocked!</h3>
                <p className="text-slate-400 mb-6">Your file is ready for download.</p>
                <button onClick={downloadResult} className="btn-primary w-full">
                  Download Unlocked PDF
                </button>
                <button 
                  onClick={() => {setFile(null); setResult(null); setPassword('');}} 
                  className="mt-4 text-slate-500 hover:text-white text-sm"
                >
                  Process another file
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

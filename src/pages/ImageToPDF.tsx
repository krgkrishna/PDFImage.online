import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, Plus, X, FileImage } from 'lucide-react';
import { imagesToPdf } from '../lib/pdf';

export const ImageToPDF = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      setResult(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const pdf = await imagesToPdf(files);
      setResult(pdf);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const url = URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_images.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Image to PDF</h1>
        <p className="text-slate-400">Convert your JPG and PNG images into a single PDF document.</p>
      </motion.div>

      <div className="glass-card p-8">
        <div className="mb-8 border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-accent-purple/50 transition-colors cursor-pointer relative">
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Plus className="w-10 h-10 text-accent-purple mx-auto mb-2" />
          <p className="font-semibold">Add Images</p>
          <p className="text-slate-500 text-xs mt-1">Supports JPG, PNG</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 group">
                  <FileImage className="text-accent-blue mr-3 w-5 h-5" />
                  <span className="text-sm truncate flex-grow">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result ? (
          <button
            onClick={handleProcess}
            disabled={isProcessing || files.length === 0}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              `Convert ${files.length} Images to PDF`
            )}
          </button>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">PDF Ready!</h3>
            <button onClick={downloadResult} className="btn-primary w-full mb-4">
              Download PDF
            </button>
            <button 
              onClick={() => {setFiles([]); setResult(null);}} 
              className="text-slate-500 hover:text-white text-sm"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

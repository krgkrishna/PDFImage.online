import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, Loader2, Plus, X, FileImage, CheckCircle2, Layers, Trash2 } from 'lucide-react';
import { imagesToPdf } from '../lib/pdf';

export const ImageToPDF = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files) as File[];
      const validFiles = newFiles.filter(f => f.type.startsWith('image/'));
      
      if (validFiles.length < newFiles.length) {
        setError('Some files were skipped. Only images (JPG, PNG) are supported.');
      } else {
        setError('');
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setResult(null);

      // Generate previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError('');
    try {
      const pdf = await imagesToPdf(files);
      setResult(pdf);
    } catch (err) {
      console.error(err);
      setError('Failed to convert images to PDF. Please try again.');
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

  const reset = () => {
    setFiles([]);
    setPreviews([]);
    setResult(null);
    setError('');
  };

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-blue/10 text-accent-blue mb-6">
          <FileImage className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Image to PDF</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Combine your JPG and PNG images into a professional PDF document instantly.
        </p>
      </motion.div>

      <div className="glass-card overflow-hidden mb-12">
        <div className="p-8">
          <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all cursor-pointer relative group mb-8">
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="relative z-0">
              <div className="w-20 h-20 bg-accent-blue/10 text-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Plus className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Add Images</h3>
              <p className="text-slate-400 mb-2 text-sm">Supports JPG, PNG, WebP</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Secure client-side conversion</p>
            </div>
          </div>

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-accent-blue" />
                    Selected Images ({files.length})
                  </h3>
                  <button 
                    onClick={reset}
                    className="text-xs font-bold text-slate-500 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {previews.map((preview, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group"
                    >
                      <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => removeFile(index)}
                          className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                        #{index + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {!result ? (
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing || files.length === 0}
                    className="btn-primary w-full flex items-center justify-center py-4 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        Converting to PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6 mr-3" />
                        Convert {files.length} Images to PDF
                      </>
                    )}
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">PDF Ready!</h3>
                    <p className="text-slate-400 mb-6">Your images have been successfully converted.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={downloadResult} className="btn-primary flex-1 py-4 flex items-center justify-center">
                        <Download className="w-6 h-6 mr-3" />
                        Download PDF
                      </button>
                      <button onClick={reset} className="btn-secondary flex-1 py-4">
                        Start Over
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Batch Processing',
            desc: 'Combine multiple images into a single PDF document in seconds.',
            icon: Layers
          },
          {
            title: 'High Quality',
            desc: 'Images are preserved at their original resolution within the PDF.',
            icon: FileImage
          },
          {
            title: '100% Private',
            desc: 'Your images never leave your device. All processing happens in your browser.',
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
            <item.icon className="w-8 h-8 text-accent-blue mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

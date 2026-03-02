import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, Loader2, Image as ImageIcon, X, AlertCircle, CheckCircle2, Grid, Layers } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Configure pdf.js worker using Vite's worker loader
// @ts-ignore - Vite handles this import correctly at runtime
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const PDFToImage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');
  const [isZipping, setIsZipping] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a valid PDF file.');
        return;
      }
      setFile(selectedFile);
      setError('');
      setImages([]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError('');
    setImages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      
      loadingTask.onPassword = (updatePassword: (password: string) => void) => {
        const password = prompt('This PDF is password protected. Please enter the password:');
        if (password) updatePassword(password);
      };

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const imageUrls: string[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // High quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          // @ts-ignore - pdf.js types can be tricky with canvas
          canvas: canvas
        }).promise;

        imageUrls.push(canvas.toDataURL('image/png'));
      }

      setImages(imageUrls);
    } catch (err: any) {
      console.error(err);
      if (err.name === 'PasswordException') {
        setError('Incorrect password or password required.');
      } else {
        setError('Failed to convert PDF to images. The file might be corrupted or unsupported.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `page_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllAsZip = async () => {
    if (images.length === 0 || !file) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(`${file.name.replace('.pdf', '')}_images`);
      
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i].split(',')[1];
        folder?.file(`page_${i + 1}.png`, base64Data, { base64: true });
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}_images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to create ZIP file.');
    } finally {
      setIsZipping(false);
    }
  };

  const reset = () => {
    setFile(null);
    setImages([]);
    setError('');
  };

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-purple/10 text-accent-purple mb-6">
          <ImageIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">PDF to Image</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Convert each page of your PDF into high-quality PNG images instantly.
        </p>
      </motion.div>

      <div className="glass-card overflow-hidden mb-12">
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

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm mb-6"
                >
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              {images.length === 0 ? (
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="btn-primary w-full flex items-center justify-center py-4 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Converting Pages...
                    </>
                  ) : (
                    <>
                      <Layers className="w-6 h-6 mr-3" />
                      Convert to Images
                    </>
                  )}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={downloadAllAsZip} 
                    disabled={isZipping}
                    className="btn-primary flex-1 flex items-center justify-center py-4"
                  >
                    {isZipping ? (
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    ) : (
                      <Download className="w-6 h-6 mr-3" />
                    )}
                    Download All as ZIP
                  </button>
                  <button 
                    onClick={reset} 
                    className="btn-secondary flex-1 flex items-center justify-center py-4"
                  >
                    Process Another
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Grid className="w-5 h-5 mr-2 text-accent-purple" />
              Page Previews
            </h3>
            <span className="text-sm text-slate-500 font-medium">{images.length} Pages Generated</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden group relative"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-navy-800">
                  <img src={url} alt={`Page ${index + 1}`} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                    <button
                      onClick={() => downloadImage(url, index)}
                      className="btn-primary py-2 px-4 flex items-center text-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </button>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white/[0.02]">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Page {index + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Info Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'High Quality',
            desc: 'Pages are rendered at 2x scale for crisp, high-resolution PNG output.',
            icon: ImageIcon
          },
          {
            title: 'Batch Download',
            desc: 'Convert entire documents at once and download all pages as a single ZIP file.',
            icon: Download
          },
          {
            title: 'Secure Rendering',
            desc: 'All rendering is done locally. Your document content never leaves your browser.',
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
            <item.icon className="w-8 h-8 text-accent-purple mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

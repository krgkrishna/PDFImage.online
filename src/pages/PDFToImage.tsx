import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const PDFToImage = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
      setError('Failed to convert PDF to images. Please ensure the file is not corrupted.');
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

  return (
    <div className="pt-32 pb-20 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">PDF to Image</h1>
        <p className="text-slate-400">Convert each page of your PDF into a high-quality PNG image.</p>
      </motion.div>

      <div className="glass-card p-8 mb-12">
        {!file ? (
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-accent-purple/50 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <ImageIcon className="w-12 h-12 text-accent-purple mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Click or drag PDF here</p>
            <p className="text-slate-400 text-sm">Secure client-side conversion</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white/5 rounded-xl border border-white/10">
              <FileText className="text-accent-purple mr-4" />
              <div className="flex-grow">
                <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => {setFile(null); setImages([]);}} className="text-slate-500 hover:text-white text-sm">Change</button>
            </div>

            {error && (
              <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {images.length === 0 && (
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Converting Pages...
                  </>
                ) : (
                  'Convert to Images'
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden group"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-navy-800">
                <img src={url} alt={`Page ${index + 1}`} className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => downloadImage(url, index)}
                    className="btn-primary py-2 px-4 flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-sm font-medium">Page {index + 1}</span>
                <button
                  onClick={() => downloadImage(url, index)}
                  className="text-accent-purple hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

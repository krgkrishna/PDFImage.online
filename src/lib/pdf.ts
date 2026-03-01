import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';

export async function unlockPdf(file: File, password?: string) {
  const arrayBuffer = await file.arrayBuffer();
  try {
    // @ts-ignore - pdf-lib types sometimes lag behind or have strict load options
    const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
    const savedBytes = await pdfDoc.save();
    return new Blob([savedBytes], { type: 'application/pdf' });
  } catch (error) {
    throw new Error('Invalid password or corrupted PDF');
  }
}

export async function compressPdf(file: File) {
  // Client-side PDF compression is tricky with pdf-lib alone.
  // A common approach is to re-save with optimizations or use a worker.
  // For this demo, we'll re-save the document which often reduces size slightly
  // by removing metadata/incremental updates.
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const savedBytes = await pdfDoc.save({ useObjectStreams: true });
  return new Blob([savedBytes], { type: 'application/pdf' });
}

export async function imagesToPdf(files: File[]) {
  const pdfDoc = await PDFDocument.create();
  
  for (const file of files) {
    const imageBytes = await file.arrayBuffer();
    let image;
    
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      continue;
    }
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
}

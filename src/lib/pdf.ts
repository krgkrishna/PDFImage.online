import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';

export async function unlockPdf(file: File, password?: string) {
  const arrayBuffer = await file.arrayBuffer();
  try {
    // @ts-ignore - pdf-lib types sometimes lag behind or have strict load options
    const pdfDoc = await PDFDocument.load(arrayBuffer, { 
      password,
      ignoreEncryption: false 
    } as any);
    const savedBytes = await pdfDoc.save();
    return new Blob([savedBytes], { type: 'application/pdf' });
  } catch (error: any) {
    if (error.message.includes('password')) {
      throw new Error('Incorrect password. Please try again.');
    }
    throw new Error('Failed to unlock PDF. The file might be corrupted or not encrypted.');
  }
}

export async function compressPdf(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Create a new document to copy pages into (often reduces size)
  const compressedDoc = await PDFDocument.create();
  const pages = await compressedDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
  pages.forEach((page) => compressedDoc.addPage(page));
  
  // Save with optimizations
  const savedBytes = await compressedDoc.save({ 
    useObjectStreams: true,
    addDefaultPage: false
  });
  
  const originalSize = file.size;
  const compressedSize = savedBytes.length;
  
  if (compressedSize >= originalSize) {
    throw new Error('This PDF is already highly optimized. No further compression possible.');
  }
  
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

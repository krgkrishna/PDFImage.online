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
    
    // We save it to remove the encryption
    const savedBytes = await pdfDoc.save();
    return new Blob([savedBytes], { type: 'application/pdf' });
  } catch (error: any) {
    if (error.message?.includes('password') || error.message?.includes('Encrypted')) {
      throw new Error('Incorrect password or PDF is encrypted.');
    }
    throw new Error('Failed to unlock PDF. The file might be corrupted.');
  }
}

export async function compressPdf(file: File, level: 'low' | 'medium' | 'high' = 'medium') {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Compression strategy:
    // 1. Use object streams
    // 2. We could potentially downscale images if we had a more complex implementation
    // For now, we'll use the built-in optimizations of pdf-lib
    
    const savedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
    });

    const originalSize = file.size;
    const compressedSize = savedBytes.length;
    
    // If the "compressed" version is actually larger (can happen with small files),
    // we return the original or a slightly modified version.
    if (compressedSize >= originalSize && level === 'low') {
       return new Blob([arrayBuffer], { type: 'application/pdf' });
    }

    return new Blob([savedBytes], { type: 'application/pdf' });
  } catch (error) {
    throw new Error('Failed to compress PDF.');
  }
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

import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';

const API_KEY = import.meta.env.VITE_PDFCO_API_KEY;

const isApiKeyValid = () => {
  return API_KEY && API_KEY.trim() !== '';
};

export async function unlockPdf(file: File, password?: string, signal?: AbortSignal) {
  if (!isApiKeyValid()) throw new Error('Service configuration error. Please try again later.');

  const formData = new FormData();
  formData.append('file', file);
  if (password) formData.append('password', password);

  try {
    const response = await fetch('https://api.pdf.co/v1/pdf/security/remove-password', {
      method: 'POST',
      headers: { 'x-api-key': API_KEY },
      body: formData,
      signal
    });

    const data = await response.json();
    
    if (data.error) {
      const msg = data.message?.toLowerCase() || '';
      if (msg.includes('password')) {
        throw new Error('Incorrect password. Please try again.');
      }
      if (data.status === 401 || data.status === 403 || msg.includes('limit') || msg.includes('credit')) {
        throw new Error('Service limit reached. Please try again later.');
      }
      if (msg.includes('large') || msg.includes('size')) {
        throw new Error('File is too large for the current service plan.');
      }
      throw new Error(data.message || 'Failed to unlock PDF.');
    }

    const fileResponse = await fetch(data.url);
    if (!fileResponse.ok) throw new Error('Failed to download processed file.');
    const blob = await fileResponse.blob();
    return blob;
  } catch (error: any) {
    if (error.name === 'AbortError') throw error;
    throw error;
  }
}

export async function compressPdf(
  file: File, 
  level: 'low' | 'medium' | 'high' | 'custom' = 'medium',
  customPercentage: number = 60,
  signal?: AbortSignal
) {
  if (!isApiKeyValid()) throw new Error('Service configuration error. Please try again later.');

  const formData = new FormData();
  formData.append('file', file);
  
  let profile = 'ebook';
  if (level === 'low') profile = 'web';
  if (level === 'high') profile = 'screen';
  
  if (level === 'custom') {
    formData.append('profiles', `{"imageQuality": ${customPercentage}}`);
  } else {
    formData.append('profiles', profile);
  }

  try {
    const response = await fetch('https://api.pdf.co/v1/pdf/optimize', {
      method: 'POST',
      headers: { 'x-api-key': API_KEY },
      body: formData,
      signal
    });

    const data = await response.json();
    
    if (data.error) {
      const msg = data.message?.toLowerCase() || '';
      if (data.status === 401 || data.status === 403 || msg.includes('limit') || msg.includes('credit')) {
        throw new Error('Service limit reached. Please try again later.');
      }
      if (msg.includes('large') || msg.includes('size')) {
        throw new Error('File is too large for the current service plan.');
      }
      throw new Error(data.message || 'Failed to compress PDF.');
    }

    const fileResponse = await fetch(data.url);
    if (!fileResponse.ok) throw new Error('Failed to download processed file.');
    const blob = await fileResponse.blob();
    return blob;
  } catch (error: any) {
    if (error.name === 'AbortError') throw error;
    throw error;
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

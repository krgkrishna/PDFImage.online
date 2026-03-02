import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { UnlockPDF } from './pages/UnlockPDF';
import { CompressPDF } from './pages/CompressPDF';
import { ImageToPDF } from './pages/ImageToPDF';
import { PDFToImage } from './pages/PDFToImage';
import { EMICalculator } from './pages/EMICalculator';
import { GSTCalculator } from './pages/GSTCalculator';
import { BMICalculator } from './pages/BMICalculator';
import { AgeCalculator } from './pages/AgeCalculator';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { motion, AnimatePresence } from 'framer-motion';

// Simple placeholder for other tools to keep the app functional
const Placeholder = ({ title }: { title: string }) => (
  <div className="pt-32 pb-20 text-center">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-slate-400">This feature is coming soon in the production version.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-900 selection:bg-accent-purple/30">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools/unlock-pdf" element={<UnlockPDF />} />
              <Route path="/tools/compress-pdf" element={<CompressPDF />} />
              <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
              <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
              <Route path="/calculators/emi" element={<EMICalculator />} />
              <Route path="/calculators/gst" element={<GSTCalculator />} />
              <Route path="/calculators/bmi" element={<BMICalculator />} />
              <Route path="/calculators/age" element={<AgeCalculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

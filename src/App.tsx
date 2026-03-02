import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
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
  <div className="pt-40 pb-20 text-center min-h-[60vh]">
    <h1 className="text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-blue">{title}</h1>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">This feature is coming soon in the production version of PDFImage Online.</p>
    <Link to="/" className="btn-primary mt-10 inline-block px-8 py-3">Back to Home</Link>
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-navy-900 selection:bg-accent-purple/30">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* PDF Tools */}
              <Route path="/unlock" element={<UnlockPDF />} />
              <Route path="/compress" element={<CompressPDF />} />
              <Route path="/image-to-pdf" element={<ImageToPDF />} />
              <Route path="/pdf-to-image" element={<PDFToImage />} />
              
              {/* Calculators */}
              <Route path="/emi" element={<EMICalculator />} />
              <Route path="/gst" element={<GSTCalculator />} />
              <Route path="/bmi" element={<BMICalculator />} />
              <Route path="/age" element={<AgeCalculator />} />
              
              {/* Company */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Placeholder title="Our Blog" />} />
              <Route path="/careers" element={<Placeholder title="Careers" />} />
              
              {/* Legal */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Placeholder title="Cookie Policy" />} />
              <Route path="/security" element={<Placeholder title="Security" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

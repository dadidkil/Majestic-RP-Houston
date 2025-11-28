import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { ComplaintGenerator } from './sections/ComplaintGenerator';
import { FAQ } from './sections/FAQ';
import { Consultation } from './sections/Consultation';
import { Footer } from './components/Layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-justice-gold selection:text-black">
      <Navigation />
      <main>
        <Hero />
        <ComplaintGenerator />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
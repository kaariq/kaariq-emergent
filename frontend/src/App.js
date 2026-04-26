import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tailoring from './pages/Tailoring';
import Collections from './pages/Collections';
import Pricing from './pages/Pricing';
import Explore from './pages/Explore';
import BookingGuide from './pages/BookingGuide';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import PreFooterBooking from './components/PreFooterBooking';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tailoring" element={<Tailoring />} />
          <Route path="/tailoring/:slug" element={<Tailoring />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<Collections />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing/:slug" element={<Pricing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:slug" element={<Explore />} />
          <Route path="/booking" element={<BookingGuide />} />
          <Route path="/booking/:slug" element={<BookingGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/:slug" element={<Contact />} />
        </Routes>
        <PreFooterBooking />
        <Footer />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { SITE } from '@/mock/mock';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="font-italiana text-3xl tracking-[0.3em]">KAARIQ</div>
            <p className="font-serif-display text-3xl lg:text-4xl mt-6 leading-tight max-w-md">Your fabric, your fit, your story.</p>
            <p className="text-sm opacity-75 mt-4 max-w-md">Bespoke tailoring & boutique. Doorstep measurement, virtual fitting, and master craftsmanship — all in one atelier.</p>
            <div className="flex gap-3 mt-8">
              <a href="#" aria-label="Instagram" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Instagram className="w-4 h-4"/></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Facebook className="w-4 h-4"/></a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 border border-white/30 hover:bg-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><Youtube className="w-4 h-4"/></a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mb-4">Tailoring</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tailoring/blouse" className="hover:underline">Women's Wear</Link></li>
              <li><Link to="/tailoring/sherwani" className="hover:underline">Men's Wear</Link></li>
              <li><Link to="/tailoring/embroidery-and-work" className="hover:underline">Customizations</Link></li>
              <li><Link to="/tailoring/alterations-and-repairs" className="hover:underline">Alterations</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mb-4">Discover</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/collections/wedding-edit" className="hover:underline">Wedding Edit</Link></li>
              <li><Link to="/explore/gallery-and-lookbook" className="hover:underline">Gallery</Link></li>
              <li><Link to="/explore/blog-and-fashion-news" className="hover:underline">Journal</Link></li>
              <li><Link to="/booking/measurement-guide" className="hover:underline">Measurement Guide</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mb-4">Atelier Hours</div>
            <p className="text-sm opacity-90">{SITE.hours}</p>
            <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mt-6 mb-4">Visit Us</div>
            <p className="text-sm opacity-90 leading-relaxed">{SITE.address}</p>
            <div className="text-[11px] tracking-[0.22em] uppercase opacity-60 mt-6 mb-4">Stay In Touch</div>
            <form onSubmit={(e)=>{e.preventDefault(); if(email){setDone(true); setEmail(''); setTimeout(()=>setDone(false),3000);}}} className="flex border-b border-white/40">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="Your email" className="flex-1 bg-transparent py-2 text-sm placeholder:opacity-60 focus:outline-none"/>
              <button type="submit" aria-label="Subscribe" className="px-2 hover:opacity-70"><Send className="w-4 h-4"/></button>
            </form>
            {done && <div className="text-[11px] mt-2 opacity-80">Thank you — we'll be in touch.</div>}
          </div>
        </div>
        <div className="border-t border-white/15 mt-14 pt-6 flex flex-col lg:flex-row gap-3 justify-between text-[11px] tracking-[0.18em] uppercase opacity-70">
          <span>© {new Date().getFullYear()} Kaariq Atelier · All rights reserved</span>
          <div className="flex gap-6">
            <Link to="/contact/find-our-studio" className="hover:opacity-100">Privacy</Link>
            <Link to="/contact/find-our-studio" className="hover:opacity-100">Terms</Link>
            <Link to="/contact/find-our-studio" className="hover:opacity-100">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

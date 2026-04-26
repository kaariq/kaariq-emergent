import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Phone, ArrowRight, Check, Video, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TIMES = ['11:00', '12:00', '13:00', '14:30', '15:30', '16:30', '18:00', '19:00'];

export default function PreFooterBooking() {
  const { addAppointment } = useAuth();
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1); return d;
  });
  const [sel, setSel] = useState(0);
  const [time, setTime] = useState('15:30');
  const [mode, setMode] = useState('Virtual');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!name || !phone) return;
    addAppointment({ mode, date: days[sel].toISOString(), time, name, phone });
    setDone(true);
  };

  return (
    <section className="relative bg-white">
      {/* decorative top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(33,11%,73%)] to-transparent"/>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }} className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="edit-num text-[hsl(85,13%,32%)]">—  30 MINUTES · FREE</div>
            <h2 className="font-serif-display text-4xl lg:text-6xl leading-[1.02] mt-4 text-[hsl(85,13%,19%)]">
              Book your free <span className="italic text-[hsl(64,30%,36%)]">consultation</span>.
            </h2>
            <p className="text-[15px] text-[hsl(85,13%,32%)] mt-5 leading-relaxed max-w-md">
              Choose a date and time that works for you. Share your number, pick the mode, and our concierge will confirm your slot within 30 minutes.
            </p>
            <ul className="mt-7 space-y-2.5 text-sm text-[hsl(85,13%,19%)]">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[hsl(64,30%,36%)]"/>Free, no obligation</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[hsl(64,30%,36%)]"/>Sketches, swatches & pricing shared on call</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-[hsl(64,30%,36%)]"/>In-studio, at-home, or virtual — your choice</li>
            </ul>
          </motion.div>

          {/* Right: calendar card */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: 0.1 }} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-6 lg:p-10">
                  {/* Mode toggle */}
                  <div className="flex flex-wrap gap-2">
                    {[{ k: 'Virtual', icon: Video }, { k: 'Studio Visit', icon: MapPin }, { k: 'At Home', icon: Calendar }].map(({ k, icon: I }) => (
                      <button key={k} onClick={() => setMode(k)} className={`inline-flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.22em] uppercase border transition-colors ${mode === k ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,73%)] hover:border-[hsl(85,13%,19%)] text-[hsl(85,13%,19%)]'}`}>
                        <I className="w-3.5 h-3.5"/>{k}
                      </button>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-7 mb-3 flex items-center gap-2"><Calendar className="w-3.5 h-3.5"/>Choose a day</div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {days.map((d, i) => (
                      <motion.button key={i} whileHover={{ y: -2 }} onClick={() => setSel(i)} className={`shrink-0 w-[70px] py-3 border text-center transition-colors ${sel === i ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'bg-white border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] text-[hsl(85,13%,19%)]'}`}>
                        <div className="text-[10px] tracking-[0.18em] uppercase opacity-80">{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="font-serif-display text-2xl mt-1">{d.getDate()}</div>
                        <div className="text-[10px] tracking-[0.18em] uppercase opacity-80">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Times */}
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-6 mb-3 flex items-center gap-2"><Clock className="w-3.5 h-3.5"/>Choose a time (IST)</div>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map((t) => (
                      <motion.button key={t} whileHover={{ y: -1 }} onClick={() => setTime(t)} className={`py-2 border text-sm transition-colors ${time === t ? 'bg-[hsl(64,30%,36%)] text-white border-[hsl(64,30%,36%)]' : 'bg-white border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] text-[hsl(85,13%,19%)]'}`}>{t}</motion.button>
                    ))}
                  </div>

                  {/* Inputs */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Your name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aanya Mehta" className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
                    </div>
                    <div>
                      <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] flex items-center gap-2"><Phone className="w-3.5 h-3.5"/>Phone number</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98XXX XXXXX" className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
                    </div>
                  </div>

                  <button onClick={submit} className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[hsl(85,13%,19%)] text-white px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">
                    Confirm appointment <ArrowRight className="w-4 h-4"/>
                  </button>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-[hsl(85,13%,32%)] mt-3">We'll WhatsApp you a confirmation within 30 minutes.</p>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-[hsl(85,13%,19%)] text-white p-10 lg:p-14 text-center">
                  <div className="w-14 h-14 rounded-full bg-[hsl(64,30%,36%)] mx-auto flex items-center justify-center"><Check className="w-7 h-7"/></div>
                  <h3 className="font-serif-display text-4xl mt-5">Confirmed</h3>
                  <p className="text-sm opacity-85 mt-3 max-w-md mx-auto">Thanks {name} — your {mode.toLowerCase()} consultation is booked for {days[sel].toDateString()} at {time}. Look out for a WhatsApp on {phone}.</p>
                  <button onClick={() => setDone(false)} className="mt-7 inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">Book another</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

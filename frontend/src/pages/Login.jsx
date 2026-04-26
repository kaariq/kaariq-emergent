import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, User as UserIcon, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [err, setErr] = useState('');
  const { login, register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const next = new URLSearchParams(loc.search).get('next') || '/profile';

  const submit = (e) => {
    e.preventDefault();
    setErr('');
    const fn = mode === 'login' ? login : register;
    const r = fn(form);
    if (!r.ok) return setErr(r.error || 'Something went wrong');
    nav(next);
  };

  return (
    <main className="min-h-[80vh] grid lg:grid-cols-2 bg-white">
      {/* Visual side */}
      <div className="relative hidden lg:block bg-[hsl(85,13%,19%)] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1771074152971-7dba5f49bf93" alt="" className="absolute inset-0 w-full h-full object-cover opacity-65"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(50,56,43,0.85) 0%, rgba(50,56,43,0.4) 60%, rgba(0,0,0,0) 100%)' }}/>
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="font-italiana text-2xl tracking-[0.3em]">KAARIQ</Link>
          <div>
            <div className="edit-num opacity-70">—  YOUR ATELIER, IN YOUR POCKET</div>
            <h2 className="font-serif-display text-5xl mt-4 leading-[1.05]">A wardrobe, <span className="italic">crafted to memory.</span></h2>
            <p className="text-sm opacity-85 mt-4 max-w-md leading-relaxed">Save measurements for the family, track every order, and book consultations — all in one place.</p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-md">
          <div className="edit-num text-[hsl(85,13%,32%)]">—  WELCOME</div>
          <h1 className="font-serif-display text-4xl mt-3 text-[hsl(85,13%,19%)]">{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-2">{mode === 'login' ? 'Welcome back. Sign in to manage measurements, orders and appointments.' : 'A free account stores your measurements, orders and appointments forever.'}</p>

          <div className="flex gap-1 mt-6 p-1 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] w-fit">
            {['login', 'register'].map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`px-5 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors ${mode === m ? 'bg-[hsl(85,13%,19%)] text-white' : 'text-[hsl(85,13%,19%)] hover:bg-white'}`}>{m === 'login' ? 'Sign in' : 'Create account'}</button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <Field icon={UserIcon} label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required/>
                </motion.div>
              )}
            </AnimatePresence>
            <Field icon={Mail} type="email" label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required/>
            {mode === 'register' && (
              <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })}/>
            )}
            <Field icon={Lock} type="password" label="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required/>
            {err && <div className="text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{err}</div>}
            <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 bg-[hsl(85,13%,19%)] text-white px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">
              {mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)] text-center">By continuing you agree to our terms & privacy.</p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text', required }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{label}</span>
      <div className="flex items-center gap-2 mt-1.5 bg-white border border-[hsl(33,11%,80%)] focus-within:border-[hsl(85,13%,19%)] transition-colors">
        <span className="pl-3 text-[hsl(85,13%,32%)]"><Icon className="w-4 h-4"/></span>
        <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent py-3 px-2 text-sm focus:outline-none"/>
      </div>
    </label>
  );
}

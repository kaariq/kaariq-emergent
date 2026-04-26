import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from './AdminContext';
import { LEAD_STATUSES, LEAD_SOURCES } from './store';
import { Plus, X, Phone, MessageSquare } from 'lucide-react';

export default function Leads() {
  const { s, setLeadStatus, addLeadNote, addLead } = useAdmin();
  const [filter, setFilter] = useState('all');
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(null);

  const filtered = s.leads.filter((l) => filter === 'all' || l.status === filter);

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Leads & Appointments</h1>
          <p className="text-sm text-neutral-500">Inquiries from website, WhatsApp, calls, walk-ins. Color-code your funnel.</p>
        </div>
        <button onClick={() => setAdding(true)} className="inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-white px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors"><Plus className="w-4 h-4"/>Add lead</button>
      </header>

      <div className="flex flex-wrap gap-2 mb-5">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase border ${filter === 'all' ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'bg-white border-neutral-200 hover:border-[hsl(85,13%,19%)]'}`}>All ({s.leads.length})</button>
        {LEAD_STATUSES.map((st) => {
          const c = s.leads.filter((l) => l.status === st.id).length;
          return (
            <button key={st.id} onClick={() => setFilter(st.id)} className={`px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase border flex items-center gap-1.5 transition-colors ${filter === st.id ? 'border-[hsl(85,13%,19%)] bg-neutral-50' : 'border-neutral-200 bg-white hover:border-[hsl(85,13%,19%)]'}`}>
              <span className={`w-2 h-2 rounded-full ${st.dot}`}/>{st.label} ({c})
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-[10px] tracking-[0.22em] uppercase text-neutral-500">
            <tr>{['Status', 'Name', 'Source', 'Notes', 'Created', ''].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const st = LEAD_STATUSES.find((x) => x.id === l.status);
              return (
                <tr key={l.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase`}><span className={`w-2 h-2 rounded-full ${st?.dot}`}/>{st?.label}</span></td>
                  <td className="px-4 py-3 font-medium">{l.name}<br/><span className="text-[11px] text-neutral-500"><Phone className="w-3 h-3 inline mr-1"/>{l.phone}</span></td>
                  <td className="px-4 py-3 text-[12px] text-neutral-600">{l.source}</td>
                  <td className="px-4 py-3 text-[12px] text-neutral-600 max-w-[280px] truncate">{l.notes}</td>
                  <td className="px-4 py-3 text-[11px] text-neutral-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right"><button onClick={() => setOpen(l.id)} className="text-[11px] tracking-[0.22em] uppercase link-underline">Open</button></td>
                </tr>
              );
            })}
            {!filtered.length && <tr><td colSpan="6" className="px-4 py-12 text-center text-sm text-neutral-500">No leads in this bucket.</td></tr>}
          </tbody>
        </table>
      </div>

      <AnimatePresence>{open && <LeadDrawer leadId={open} onClose={() => setOpen(null)} />}</AnimatePresence>
      <AnimatePresence>{adding && <AddLeadModal onClose={() => setAdding(false)} onAdd={(d) => { addLead(d); setAdding(false); }}/>}</AnimatePresence>
    </div>
  );
}

function LeadDrawer({ leadId, onClose }) {
  const { s, setLeadStatus, addLeadNote } = useAdmin();
  const l = s.leads.find((x) => x.id === leadId);
  const [note, setNote] = useState(l?.notesText || '');
  if (!l) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/40 flex justify-end" onClick={onClose}>
      <motion.aside initial={{ x: 480 }} animate={{ x: 0 }} exit={{ x: 480 }} transition={{ type: 'spring', stiffness: 220, damping: 28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-white h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(64,30%,36%)]">{l.source}</div>
            <h2 className="font-serif-display text-2xl">{l.name}</h2>
            <div className="text-sm text-neutral-500"><Phone className="w-3 h-3 inline mr-1"/>{l.phone}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2">Color code / status</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LEAD_STATUSES.map((st) => (
                <button key={st.id} onClick={() => setLeadStatus(l.id, st.id)} className={`flex items-center gap-2 p-2 border text-[11px] tracking-[0.18em] uppercase transition-colors ${l.status === st.id ? 'border-[hsl(85,13%,19%)] bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${st.dot}`}/>{st.label}
                </button>
              ))}
            </div>
          </section>
          <section>
            <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2">Inquiry</div>
            <p className="text-sm bg-neutral-50 p-3 border border-neutral-100">{l.notes}</p>
          </section>
          <section>
            <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2">Internal notes</div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => addLeadNote(l.id, note)} placeholder="Add notes — saved on blur…" rows="4" className="w-full border border-neutral-200 p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
          </section>
          <section>
            <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2">Status history</div>
            <ul className="space-y-1">
              {(l.history || []).slice().reverse().map((h, i) => {
                const st = LEAD_STATUSES.find((x) => x.id === h.status);
                return <li key={i} className="text-[12px] text-neutral-600 flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${st?.dot}`}/><span className="font-medium">{st?.label}</span><span className="text-neutral-400">{new Date(h.at).toLocaleString()}</span></li>;
              })}
            </ul>
          </section>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function AddLeadModal({ onClose, onAdd }) {
  const [f, setF] = useState({ name: '', phone: '', source: 'WhatsApp', notes: '', status: 'new' });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white p-6 w-full max-w-lg">
        <h3 className="font-serif-display text-2xl mb-4">Add lead</h3>
        <div className="space-y-3">
          <input value={f.name} onChange={(e) => setF({...f, name:e.target.value})} placeholder="Name" className="w-full border border-neutral-200 p-3 text-sm"/>
          <input value={f.phone} onChange={(e) => setF({...f, phone:e.target.value})} placeholder="Phone" className="w-full border border-neutral-200 p-3 text-sm"/>
          <select value={f.source} onChange={(e) => setF({...f, source:e.target.value})} className="w-full border border-neutral-200 p-3 text-sm">{LEAD_SOURCES.map((src) => <option key={src}>{src}</option>)}</select>
          <textarea value={f.notes} onChange={(e) => setF({...f, notes:e.target.value})} placeholder="Inquiry / message" rows="3" className="w-full border border-neutral-200 p-3 text-sm"/>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-neutral-200 py-2.5 text-[11px] tracking-[0.22em] uppercase">Cancel</button>
          <button onClick={() => onAdd(f)} disabled={!f.name || !f.phone} className="flex-1 bg-[hsl(85,13%,19%)] text-white py-2.5 text-[11px] tracking-[0.22em] uppercase disabled:opacity-50">Add lead</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

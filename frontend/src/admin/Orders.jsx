import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from './AdminContext';
import { Play, Square, MessageSquarePlus, X, Clock, User as UserIcon, Search } from 'lucide-react';

export default function Orders() {
  const { s, ORDER_STAGES, activeUser, moveStage, assignOrder, punchIn, punchOut, addOrderNote } = useAdmin();
  const [view, setView] = useState('board');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => s.orders.filter((o) => !q || (o.id + ' ' + o.customer + ' ' + o.title).toLowerCase().includes(q.toLowerCase())), [s.orders, q]);
  const grouped = ORDER_STAGES.map((st) => ({ ...st, orders: filtered.filter((o) => o.stage === st.id) }));

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Orders</h1>
          <p className="text-sm text-neutral-500">{filtered.length} orders · punch in to track time spent</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-neutral-200 px-3">
            <Search className="w-4 h-4 text-neutral-400"/>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by ID, customer, title" className="py-2 text-sm focus:outline-none w-64"/>
          </div>
          <div className="flex border border-neutral-200">
            {['board', 'list'].map((v) => <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors ${view === v ? 'bg-[hsl(85,13%,19%)] text-white' : 'bg-white hover:bg-neutral-50'}`}>{v}</button>)}
          </div>
        </div>
      </header>

      {view === 'board' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {grouped.map((col) => (
            <div key={col.id} className="w-[300px] flex-shrink-0 bg-neutral-100 border border-neutral-200">
              <div className="px-4 py-3 border-b border-neutral-200 bg-white flex items-center justify-between">
                <div className="font-medium text-sm">{col.label}</div>
                <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500">{col.orders.length}</span>
              </div>
              <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
                {col.orders.map((o) => {
                  const owner = s.users.find((u) => u.id === o.assignedTo);
                  const myActivePunch = (o.punches || []).find((p) => p.userId === activeUser.id && !p.out);
                  return (
                    <motion.button layout key={o.id} onClick={() => setOpen(o.id)} className="w-full text-left bg-white border border-neutral-200 hover:border-[hsl(85,13%,19%)] p-3 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(64,30%,36%)]">{o.id}</div>
                        <div className="font-serif-display text-sm">₹{o.price.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="font-medium text-sm mt-1">{o.title}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{o.customer}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                        {owner ? (
                          <span className="flex items-center gap-1.5 text-[11px] text-neutral-600"><span className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-medium">{owner.avatar}</span>{owner.name.split(' ')[0]}</span>
                        ) : <span className="text-[10px] tracking-[0.22em] uppercase text-amber-700">Unassigned</span>}
                        {myActivePunch && <span className="text-[10px] tracking-[0.22em] uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5">Active</span>}
                      </div>
                    </motion.button>
                  );
                })}
                {!col.orders.length && <div className="text-center py-8 text-[11px] text-neutral-400">No orders</div>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-[10px] tracking-[0.22em] uppercase text-neutral-500">
              <tr>{['Order', 'Customer', 'Title', 'Stage', 'Assigned', 'Price', ''].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((o) => {
                const owner = s.users.find((u) => u.id === o.assignedTo);
                return (
                  <tr key={o.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3 text-[hsl(64,30%,36%)] font-medium">{o.id}</td>
                    <td className="px-4 py-3">{o.customer}<br/><span className="text-[11px] text-neutral-500">{o.phone}</span></td>
                    <td className="px-4 py-3">{o.title}</td>
                    <td className="px-4 py-3">{ORDER_STAGES.find((st) => st.id === o.stage)?.label}</td>
                    <td className="px-4 py-3">{owner?.name || '—'}</td>
                    <td className="px-4 py-3 font-medium">₹{o.price.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right"><button onClick={() => setOpen(o.id)} className="text-[11px] tracking-[0.22em] uppercase link-underline">Open</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {open && <OrderDrawer orderId={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function OrderDrawer({ orderId, onClose }) {
  const { s, ORDER_STAGES, activeUser, moveStage, assignOrder, punchIn, punchOut, addOrderNote } = useAdmin();
  const o = s.orders.find((x) => x.id === orderId);
  const [note, setNote] = useState('');
  if (!o) return null;
  const owner = s.users.find((u) => u.id === o.assignedTo);
  const myActivePunch = (o.punches || []).find((p) => p.userId === activeUser.id && !p.out);
  const totalMins = (o.punches || []).reduce((t, p) => t + (p.out ? (new Date(p.out) - new Date(p.in)) / 60000 : 0), 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/40 flex justify-end" onClick={onClose}>
      <motion.aside initial={{ x: 480 }} animate={{ x: 0 }} exit={{ x: 480 }} transition={{ type: 'spring', stiffness: 220, damping: 28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-xl bg-white h-full overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(64,30%,36%)]">{o.id}</div>
            <h2 className="font-serif-display text-2xl">{o.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 space-y-6">
          {/* Customer */}
          <Section title="Customer">
            <div className="text-base font-medium">{o.customer}</div>
            <div className="text-sm text-neutral-500">{o.phone}</div>
            <div className="text-sm mt-2">Category: <span className="font-medium capitalize">{o.category}</span> · Design: <span className="font-medium">{o.design}</span></div>
            <div className="font-serif-display text-2xl mt-2">₹{o.price.toLocaleString('en-IN')}</div>
          </Section>

          {/* Stage */}
          <Section title="Stage / Workflow">
            <div className="flex flex-wrap gap-2">
              {ORDER_STAGES.map((st) => (
                <button key={st.id} onClick={() => moveStage(o.id, st.id, activeUser.id)} className={`text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 border transition-colors ${o.stage === st.id ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'border-neutral-300 hover:border-[hsl(85,13%,19%)]'}`}>{st.label}</button>
              ))}
            </div>
          </Section>

          {/* Assign */}
          <Section title="Assigned To">
            <div className="flex flex-wrap gap-2">
              {s.users.map((u) => (
                <button key={u.id} onClick={() => assignOrder(o.id, u.id)} className={`text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 border transition-colors ${owner?.id === u.id ? 'bg-[hsl(64,30%,36%)] text-white border-[hsl(64,30%,36%)]' : 'border-neutral-300 hover:border-[hsl(85,13%,19%)]'}`}>{u.name} ({u.role})</button>
              ))}
            </div>
          </Section>

          {/* Punch in/out */}
          <Section title={`Time tracking · ${Math.round(totalMins)} min total`}>
            <div className="flex items-center gap-2 mb-3">
              {myActivePunch ? (
                <button onClick={() => punchOut(o.id, myActivePunch.id)} className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-red-700"><Square className="w-4 h-4"/>Punch Out</button>
              ) : (
                <button onClick={() => punchIn(o.id, activeUser.id)} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-emerald-700"><Play className="w-4 h-4"/>Punch In</button>
              )}
              {myActivePunch && <span className="text-[11px] text-neutral-600"><Clock className="w-3 h-3 inline mr-1"/>Started {new Date(myActivePunch.in).toLocaleTimeString()}</span>}
            </div>
            {(o.punches || []).length === 0 && <div className="text-[11px] text-neutral-400">No punches yet.</div>}
            <ul className="space-y-1">
              {(o.punches || []).slice().reverse().map((p) => {
                const u = s.users.find((x) => x.id === p.userId);
                const dur = p.out ? Math.round((new Date(p.out) - new Date(p.in)) / 60000) : null;
                return (
                  <li key={p.id} className="flex items-center gap-2 text-[12px] text-neutral-700 border-b border-neutral-100 py-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-neutral-400"/>
                    <span className="font-medium">{u?.name}</span>
                    <span className="text-neutral-400">{new Date(p.in).toLocaleString()}</span>
                    →
                    <span className="text-neutral-400">{p.out ? new Date(p.out).toLocaleString() : 'active'}</span>
                    {dur != null && <span className="ml-auto text-[hsl(64,30%,36%)] font-medium">{dur} min</span>}
                  </li>
                );
              })}
            </ul>
          </Section>

          {/* Notes */}
          <Section title="Notes">
            <div className="flex gap-2 mb-3">
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the team…" className="flex-1 border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
              <button onClick={() => { if (note) { addOrderNote(o.id, note, activeUser.id); setNote(''); } }} className="inline-flex items-center gap-1 bg-[hsl(85,13%,19%)] text-white px-3 py-2 text-[11px] tracking-[0.22em] uppercase"><MessageSquarePlus className="w-4 h-4"/>Add</button>
            </div>
            <ul className="space-y-2">
              {(o.notes || []).slice().reverse().map((n) => {
                const u = s.users.find((x) => x.id === n.by);
                return <li key={n.id} className="text-sm bg-neutral-50 p-3 border border-neutral-100"><span className="font-medium">{u?.name || 'System'}</span> <span className="text-[11px] text-neutral-500">{new Date(n.at).toLocaleString()}</span><div className="mt-1">{n.text}</div></li>;
              })}
              {!(o.notes || []).length && <li className="text-[11px] text-neutral-400">No notes yet.</li>}
            </ul>
          </Section>

          {/* History */}
          <Section title="Stage history">
            <ul className="space-y-1">
              {(o.history || []).slice().reverse().map((h, i) => {
                const u = s.users.find((x) => x.id === h.by);
                return <li key={i} className="text-[12px] text-neutral-600"><span className="font-medium">{ORDER_STAGES.find((st) => st.id === h.stage)?.label || h.stage}</span> by {u?.name || '—'} · {new Date(h.at).toLocaleString()}</li>;
              })}
              {!(o.history || []).length && <li className="text-[11px] text-neutral-400">No history yet.</li>}
            </ul>
          </Section>
        </div>
      </motion.aside>
    </motion.div>
  );
}

const Section = ({ title, children }) => (
  <section>
    <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2">{title}</div>
    {children}
  </section>
);

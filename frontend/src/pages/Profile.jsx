import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { MEASUREMENT_FIELDS, CATEGORY_LABELS, RELATIONS } from '@/data/measurements';
import { Plus, User, Trash2, Edit3, MapPin, Ruler, Calendar, Package, LogOut, Check, X, Phone } from 'lucide-react';

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'measurements', label: 'People & Measurements', icon: Ruler },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
];

export default function Profile() {
  const { user, isAuthed, logout, state } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState('orders');
  if (!isAuthed) {
    nav('/login?next=/profile');
    return null;
  }
  return (
    <main className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[hsl(33,11%,80%)] pb-8">
        <div>
          <div className="edit-num text-[hsl(85,13%,32%)]">—  YOUR ACCOUNT</div>
          <h1 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">Hello, <span className="italic text-[hsl(64,30%,36%)]">{user.name?.split(' ')[0]}</span>.</h1>
          <div className="text-sm text-[hsl(85,13%,32%)] mt-2">{user.email} {user.phone && <>· {user.phone}</>}</div>
        </div>
        <button onClick={() => { logout(); nav('/'); }} className="inline-flex items-center gap-2 border border-[hsl(33,11%,80%)] px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(85,13%,19%)] hover:text-white transition-colors w-fit"><LogOut className="w-4 h-4"/>Sign out</button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 mt-10">
        {/* Tabs */}
        <aside className="lg:col-span-3">
          <ul className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <li key={t.id} className="shrink-0">
                <button onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] tracking-[0.22em] uppercase border-l-2 transition-colors text-left whitespace-nowrap ${tab === t.id ? 'border-[hsl(64,30%,36%)] text-[hsl(85,13%,19%)] bg-[hsl(33,11%,96%)]' : 'border-transparent text-[hsl(85,13%,32%)] hover:bg-[hsl(33,11%,96%)]'}`}>
                  <t.icon className="w-4 h-4"/>{t.label}
                  {t.id === 'orders' && <span className="ml-auto text-[10px] opacity-70">{state.orders.length}</span>}
                  {t.id === 'measurements' && <span className="ml-auto text-[10px] opacity-70">{state.people.length}</span>}
                  {t.id === 'addresses' && <span className="ml-auto text-[10px] opacity-70">{state.addresses.length}</span>}
                  {t.id === 'appointments' && <span className="ml-auto text-[10px] opacity-70">{state.appointments.length}</span>}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
              {tab === 'orders' && <OrdersTab/>}
              {tab === 'measurements' && <PeopleTab/>}
              {tab === 'addresses' && <AddressesTab/>}
              {tab === 'appointments' && <AppointmentsTab/>}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

/* ---------- ORDERS ---------- */
function OrdersTab() {
  const { state } = useAuth();
  if (!state.orders.length) return <Empty title="No orders yet" subtitle="Your bespoke orders will appear here." cta="Browse tailoring" to="/tailoring"/>;
  return (
    <div className="space-y-4">
      {state.orders.map((o) => (
        <motion.article key={o.id} layout className="border border-[hsl(33,11%,80%)] bg-white p-5 lg:p-6 grid lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-2 edit-num text-[hsl(64,30%,36%)]">#{o.id.slice(-6).toUpperCase()}</div>
          <div className="lg:col-span-5">
            <div className="font-serif-display text-xl text-[hsl(85,13%,19%)] capitalize">{o.category} · {o.designLabel || o.design}</div>
            <div className="text-[12px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)] mt-1">{new Date(o.createdAt).toDateString()}</div>
          </div>
          <div className="lg:col-span-2"><span className="inline-block px-2 py-1 text-[10px] tracking-[0.22em] uppercase bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">{o.status}</span></div>
          <div className="lg:col-span-2 font-serif-display text-2xl text-[hsl(85,13%,19%)]">₹{o.price?.toLocaleString('en-IN')}</div>
          <div className="lg:col-span-1 lg:text-right"><Link to="#" className="text-[11px] tracking-[0.22em] uppercase link-underline">View</Link></div>
        </motion.article>
      ))}
    </div>
  );
}

/* ---------- PEOPLE & MEASUREMENTS ---------- */
function PeopleTab() {
  const { state, upsertPerson, removePerson } = useAuth();
  const [editing, setEditing] = useState(null);
  const [meas, setMeas] = useState(null); // { personId }
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif-display text-2xl">People & Measurements</h2>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-1">Save measurements for up to 4 people. Each can have multiple categories.</p>
        </div>
        <button onClick={() => setEditing({})} disabled={state.people.length >= 4} className="inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-white px-4 py-2.5 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors disabled:opacity-50"><Plus className="w-4 h-4"/>Add person</button>
      </div>
      {!state.people.length && <Empty title="No people yet" subtitle="Add yourself, your spouse, sister, anyone. Each gets their own measurement vault."/>}
      <div className="grid sm:grid-cols-2 gap-4">
        {state.people.map((p) => (
          <motion.div key={p.id} layout className="border border-[hsl(33,11%,80%)] bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(33,11%,96%)] flex items-center justify-center"><User className="w-5 h-5 text-[hsl(85,13%,19%)]"/></div>
                <div>
                  <div className="font-serif-display text-xl">{p.name}</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)]">{p.relation || 'Self'}{p.phone && ` · ${p.phone}`}</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(p)} aria-label="Edit" className="p-2 hover:bg-[hsl(33,11%,96%)]"><Edit3 className="w-4 h-4"/></button>
                <button onClick={() => window.confirm('Delete this person?') && removePerson(p.id)} aria-label="Delete" className="p-2 hover:bg-red-50 text-red-700"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {Object.keys(p.measurements || {}).length === 0 && <span className="text-[11px] text-[hsl(85,13%,32%)]">No measurements saved</span>}
              {Object.entries(p.measurements || {}).map(([cat, vals]) => (
                <span key={cat} className="text-[10px] tracking-[0.22em] uppercase bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] px-2 py-1">{CATEGORY_LABELS[cat] || cat} · {Object.values(vals || {}).filter(Boolean).length} fields</span>
              ))}
            </div>
            <button onClick={() => setMeas({ personId: p.id })} className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-[hsl(33,11%,80%)] px-3 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(85,13%,19%)] hover:text-white transition-colors"><Ruler className="w-4 h-4"/>Manage measurements</button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{editing !== null && <PersonEditor person={editing} onClose={() => setEditing(null)} onSave={(p) => { upsertPerson(p); setEditing(null); }}/>}</AnimatePresence>
      <AnimatePresence>{meas && <MeasurementsEditor personId={meas.personId} onClose={() => setMeas(null)}/>}</AnimatePresence>
    </div>
  );
}

function PersonEditor({ person, onClose, onSave }) {
  const [form, setForm] = useState({ name: person.name || '', phone: person.phone || '', relation: person.relation || 'Self' });
  return (
    <Modal onClose={onClose}>
      <h3 className="font-serif-display text-2xl">{person.id ? 'Edit person' : 'Add person'}</h3>
      <div className="space-y-4 mt-5">
        <Lbl label="Name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/></Lbl>
        <Lbl label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/></Lbl>
        <Lbl label="Relation"><select value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]">{RELATIONS.map(r => <option key={r}>{r}</option>)}</select></Lbl>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={onClose} className="flex-1 border border-[hsl(33,11%,80%)] px-4 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(33,11%,96%)]">Cancel</button>
        <button disabled={!form.name} onClick={() => onSave({ ...person, ...form })} className="flex-1 bg-[hsl(85,13%,19%)] text-white px-4 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] disabled:opacity-50">Save</button>
      </div>
    </Modal>
  );
}

function MeasurementsEditor({ personId, onClose }) {
  const { state, setMeasurements } = useAuth();
  const person = state.people.find((p) => p.id === personId);
  const [cat, setCat] = useState(Object.keys(person?.measurements || {})[0] || 'blouse');
  const fields = MEASUREMENT_FIELDS[cat] || [];
  const [vals, setVals] = useState(person?.measurements?.[cat] || {});
  const updateCat = (c) => { setCat(c); setVals(person?.measurements?.[c] || {}); };
  const save = () => { setMeasurements(personId, cat, vals); onClose(); };
  return (
    <Modal onClose={onClose} wide>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif-display text-2xl">{person.name}’s measurements</h3>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-1">Bilingual labels. All values in inches.</p>
        </div>
        <button onClick={onClose} aria-label="close" className="p-2 hover:bg-[hsl(33,11%,96%)]"><X className="w-4 h-4"/></button>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-2">
        {Object.keys(MEASUREMENT_FIELDS).map((c) => (
          <button key={c} onClick={() => updateCat(c)} className={`shrink-0 px-3 py-2 text-[10px] tracking-[0.22em] uppercase border transition-colors ${cat === c ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{CATEGORY_LABELS[c]}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mt-5 max-h-[55vh] overflow-y-auto pr-1">
        {fields.map((f) => (
          <div key={f.key}>
            <div className="flex items-baseline justify-between">
              <label className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,19%)]">{f.en}</label>
              <span className="text-[11px] text-[hsl(85,13%,32%)]">{f.hi}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 bg-white border border-[hsl(33,11%,80%)] focus-within:border-[hsl(85,13%,19%)]">
              <input value={vals[f.key] || ''} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} placeholder={`Enter ${f.en} / ${f.hi}`} className="flex-1 bg-transparent py-2.5 px-3 text-sm focus:outline-none"/>
              <span className="pr-3 text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)]">{f.unit}</span>
            </div>
            {f.hint && <div className="text-[10px] text-[hsl(85,13%,32%)] mt-1">{f.hint}</div>}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={onClose} className="flex-1 border border-[hsl(33,11%,80%)] px-4 py-3 text-[11px] tracking-[0.22em] uppercase">Cancel</button>
        <button onClick={save} className="flex-1 bg-[hsl(85,13%,19%)] text-white px-4 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)]"><Check className="w-4 h-4 inline mr-2"/>Save measurements</button>
      </div>
    </Modal>
  );
}

/* ---------- ADDRESSES ---------- */
function AddressesTab() {
  const { state, upsertAddress, removeAddress } = useAuth();
  const [edit, setEdit] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif-display text-2xl">Addresses</h2>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-1">Save addresses for pickup, delivery, and at-home appointments.</p>
        </div>
        <button onClick={() => setEdit({})} className="inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-white px-4 py-2.5 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors"><Plus className="w-4 h-4"/>Add address</button>
      </div>
      {!state.addresses.length && <Empty title="No addresses" subtitle="Add your home or office to enable doorstep services."/>}
      <div className="grid sm:grid-cols-2 gap-4">
        {state.addresses.map((a) => (
          <motion.div key={a.id} layout className="border border-[hsl(33,11%,80%)] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2"><span className="font-serif-display text-lg">{a.label || 'Home'}</span>{a.isDefault && <span className="text-[9px] tracking-[0.22em] uppercase bg-[hsl(64,30%,36%)] text-white px-2 py-0.5">Default</span>}</div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)] mt-1 flex items-center gap-1"><Phone className="w-3 h-3"/>{a.name} · {a.phone}</div>
                <div className="text-sm text-[hsl(85,13%,19%)] mt-2 leading-relaxed">{a.line1}{a.line2 && `, ${a.line2}`}<br/>{a.city}, {a.state} — {a.pin}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEdit(a)} aria-label="Edit" className="p-2 hover:bg-[hsl(33,11%,96%)]"><Edit3 className="w-4 h-4"/></button>
                <button onClick={() => window.confirm('Delete this address?') && removeAddress(a.id)} aria-label="Delete" className="p-2 hover:bg-red-50 text-red-700"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>{edit !== null && <AddressEditor address={edit} onClose={() => setEdit(null)} onSave={(a) => { upsertAddress(a); setEdit(null); }}/>}</AnimatePresence>
    </div>
  );
}
function AddressEditor({ address, onClose, onSave }) {
  const [f, setF] = useState({ label: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pin: '', isDefault: false, ...address });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal onClose={onClose}>
      <h3 className="font-serif-display text-2xl">{address.id ? 'Edit address' : 'Add address'}</h3>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">
        <Lbl label="Label"><input value={f.label} onChange={set('label')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="Recipient name"><input value={f.name} onChange={set('name')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="Phone" cls="sm:col-span-2"><input value={f.phone} onChange={set('phone')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="Address line 1" cls="sm:col-span-2"><input value={f.line1} onChange={set('line1')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="Address line 2" cls="sm:col-span-2"><input value={f.line2} onChange={set('line2')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="City"><input value={f.city} onChange={set('city')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="State"><input value={f.state} onChange={set('state')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <Lbl label="PIN"><input value={f.pin} onChange={set('pin')} className="w-full bg-white border border-[hsl(33,11%,80%)] p-3 text-sm"/></Lbl>
        <label className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase mt-2"><input type="checkbox" checked={!!f.isDefault} onChange={(e) => setF({ ...f, isDefault: e.target.checked })}/>Set as default</label>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={onClose} className="flex-1 border border-[hsl(33,11%,80%)] px-4 py-3 text-[11px] tracking-[0.22em] uppercase">Cancel</button>
        <button onClick={() => onSave(f)} disabled={!f.name || !f.phone || !f.line1 || !f.city || !f.pin} className="flex-1 bg-[hsl(85,13%,19%)] text-white px-4 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] disabled:opacity-50">Save</button>
      </div>
    </Modal>
  );
}

/* ---------- APPOINTMENTS ---------- */
function AppointmentsTab() {
  const { state, cancelAppointment } = useAuth();
  if (!state.appointments.length) return <Empty title="No appointments" subtitle="Book a free consultation — in studio, at home, or virtual." cta="Book a slot" to="/booking/book-appointment"/>;
  return (
    <div className="space-y-3">
      {state.appointments.map((a) => (
        <motion.article key={a.id} layout className="grid lg:grid-cols-12 gap-4 items-center border border-[hsl(33,11%,80%)] bg-white p-5">
          <div className="lg:col-span-2 edit-num text-[hsl(64,30%,36%)]">{a.mode}</div>
          <div className="lg:col-span-4">
            <div className="font-serif-display text-xl">{new Date(a.date).toDateString()} · {a.time}</div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)] mt-1">{a.name} · {a.phone}</div>
          </div>
          <div className="lg:col-span-3 text-sm">{a.notes || '—'}</div>
          <div className="lg:col-span-2"><span className={`inline-block px-2 py-1 text-[10px] tracking-[0.22em] uppercase border ${a.status === 'Cancelled' ? 'border-red-300 text-red-700 bg-red-50' : 'border-[hsl(33,11%,80%)] bg-[hsl(33,11%,96%)]'}`}>{a.status}</span></div>
          <div className="lg:col-span-1 lg:text-right">{a.status !== 'Cancelled' && <button onClick={() => cancelAppointment(a.id)} className="text-[11px] tracking-[0.22em] uppercase text-red-700 link-underline">Cancel</button>}</div>
        </motion.article>
      ))}
    </div>
  );
}

/* ---------- helpers ---------- */
function Empty({ title, subtitle, cta, to }) {
  return (
    <div className="text-center border border-dashed border-[hsl(33,11%,80%)] py-16 px-6 bg-[hsl(33,11%,96%)]">
      <h3 className="font-serif-display text-2xl">{title}</h3>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">{subtitle}</p>
      {cta && <Link to={to} className="inline-flex items-center gap-2 mt-5 bg-[hsl(85,13%,19%)] text-white px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">{cta}</Link>}
    </div>
  );
}
function Lbl({ label, children, cls = '' }) {
  return <label className={`block ${cls}`}><span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{label}</span><div className="mt-1.5">{children}</div></label>;
}
function Modal({ children, onClose, wide = false }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/45 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} transition={{ type: 'spring', stiffness: 240, damping: 24 }} onClick={(e) => e.stopPropagation()} className={`bg-white border border-[hsl(33,11%,80%)] p-6 lg:p-8 w-full ${wide ? 'max-w-3xl' : 'max-w-md'} max-h-[92vh] overflow-y-auto`}>{children}</motion.div>
    </motion.div>
  );
}

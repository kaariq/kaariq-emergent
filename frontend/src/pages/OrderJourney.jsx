import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Upload, Info, X, Plus, Ruler } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DESIGNS, NECKLINES, BACK_DESIGNS, SLEEVE_STYLES, ADDONS, HOW_TO_MEASURE } from '@/data/designs';
import { MEASUREMENT_FIELDS, CATEGORY_TO_SCHEMA, CATEGORY_LABELS } from '@/data/measurements';
import { Breadcrumb } from '@/components/PageBits';
import { NECKLINE_SVGS, BACK_SVGS, SLEEVE_SVGS } from '@/components/DesignSVGs';
import { Home as HomeIcon, MapPin, UserCheck, PencilLine } from 'lucide-react';

const PLAN_OPTIONS = [
  { id: 'visit-atelier', label: 'I will visit the atelier', hint: 'A master tailor will record measurements on your visit.', Icon: MapPin },
  { id: 'home-pickup',   label: 'Send a stylist home',      hint: 'Our team will visit, take measurements & pick up fabric.', Icon: HomeIcon },
  { id: 'saved-person',  label: 'Use a saved profile',      hint: 'Reuse measurements saved against a person on your account.', Icon: UserCheck },
  { id: 'enter-now',     label: 'Enter measurements now',   hint: 'I have my measurements ready — I will type them in.', Icon: PencilLine },
];

const slideX = {
  enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
};

export default function OrderJourney() {
  const { slug, design } = useParams();
  const schemaKey = CATEGORY_TO_SCHEMA[slug] || 'blouse';
  const isCustom = design === 'custom';
  const designObj = !isCustom ? (DESIGNS[schemaKey] || []).find((d) => d.id === design) : null;
  const fields = MEASUREMENT_FIELDS[schemaKey] || MEASUREMENT_FIELDS.blouse;
  const nav = useNavigate();
  const { isAuthed, state, addOrder, upsertPerson } = useAuth();

  const steps = useMemo(() => {
    return isCustom
      ? ['Upload Design', 'Sleeves', 'Add-ons', 'Plan', 'Measurements', 'Review']
      : ['Neckline', 'Back', 'Sleeves', 'Add-ons', 'Plan', 'Measurements', 'Review'];
  }, [isCustom]);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState({
    customPhoto: null,
    customNotes: '',
    neckline: 'round',
    back: 'closed',
    sleeve: 'half',
    addons: [],
    plan: 'visit-atelier',
    personId: state.people[0]?.id || '',
    measurements: {},
  });

  // Pricing
  const basePrice = designObj?.basePrice || (isCustom ? 4500 : 2500);
  const addonsPrice = data.addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const total = basePrice + addonsPrice;

  const next = () => { setDir(1); setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)); };

  const placeOrder = () => {
    if (!isAuthed) { nav(`/login?next=/tailoring/${slug}/order/${design}`); return; }
    const order = addOrder({
      category: schemaKey,
      design: design,
      designLabel: designObj?.label || 'Custom design',
      customPhoto: data.customPhoto,
      customNotes: data.customNotes,
      customizations: { neckline: data.neckline, back: data.back, sleeve: data.sleeve },
      addons: data.addons,
      plan: data.plan,
      personId: data.personId,
      measurements: data.measurements,
      price: total,
    });
    nav('/profile');
  };

  const stepName = steps[step];

  return (
    <main className="pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Tailoring', to: '/tailoring' }, { label: CATEGORY_LABELS[schemaKey], to: `/tailoring/${slug}` }, { label: isCustom ? 'Custom order' : (designObj?.label || 'Order') }]}/>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="edit-num text-[hsl(85,13%,32%)]">—  ORDER JOURNEY</div>
            <h1 className="font-serif-display text-3xl lg:text-5xl mt-2 text-[hsl(85,13%,19%)]">{isCustom ? 'Custom Design' : designObj?.label} <span className="italic text-[hsl(64,30%,36%)]">({CATEGORY_LABELS[schemaKey]})</span></h1>
          </div>
          <div className="text-right">
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Estimated total</div>
            <div className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">₹{total.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Stepper */}
        <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 mb-10">
          {steps.map((s, i) => (
            <button key={s} onClick={() => setStep(i)} className={`text-left group`}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-italiana transition-colors ${i < step ? 'bg-[hsl(64,30%,36%)] text-white' : i === step ? 'bg-[hsl(85,13%,19%)] text-white' : 'bg-[hsl(33,11%,96%)] text-[hsl(85,13%,32%)] border border-[hsl(33,11%,80%)]'}`}>{i < step ? <Check className="w-3.5 h-3.5"/> : i + 1}</div>
                <span className={`text-[11px] tracking-[0.22em] uppercase ${i === step ? 'text-[hsl(85,13%,19%)]' : 'text-[hsl(85,13%,32%)]'}`}>{s}</span>
              </div>
              <div className={`h-[2px] mt-2 ${i <= step ? 'bg-[hsl(64,30%,36%)]' : 'bg-[hsl(33,11%,80%)]'}`}/>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main step area */}
          <div className="lg:col-span-8 min-h-[420px] relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir} variants={slideX} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                {stepName === 'Upload Design' && (
                  <CustomUploadStep value={data.customPhoto} notes={data.customNotes} onPhoto={(p) => setData({ ...data, customPhoto: p })} onNotes={(v) => setData({ ...data, customNotes: v })}/>
                )}
                {stepName === 'Neckline' && <OptionStep title="Choose your neckline" hint="Front opening style. You can refine on call." options={NECKLINES} svgMap={NECKLINE_SVGS} value={data.neckline} onChange={(v) => setData({ ...data, neckline: v })}/>}
                {stepName === 'Back' && <OptionStep title="Choose the back" hint="Backless, keyhole, or button — your call." options={BACK_DESIGNS} svgMap={BACK_SVGS} value={data.back} onChange={(v) => setData({ ...data, back: v })}/>}
                {stepName === 'Sleeves' && <OptionStep title="Choose sleeve style" hint="Long, short, puff or off-the-shoulder." options={SLEEVE_STYLES} svgMap={SLEEVE_SVGS} value={data.sleeve} onChange={(v) => setData({ ...data, sleeve: v })}/>}
                {stepName === 'Add-ons' && <AddonsStep value={data.addons} onChange={(v) => setData({ ...data, addons: v })}/>}
                {stepName === 'Plan' && <PlanStep value={data.plan} onChange={(v) => setData({ ...data, plan: v })} hasSavedPeople={state.people.length > 0}/>}
                {stepName === 'Measurements' && <MeasurementsStep schemaKey={schemaKey} fields={fields} data={data} setData={setData} state={state} upsertPerson={upsertPerson}/>}
                {stepName === 'Review' && <ReviewStep data={data} designObj={designObj} isCustom={isCustom} schemaKey={schemaKey} total={total} basePrice={basePrice} addonsPrice={addonsPrice} state={state}/>}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-[hsl(33,11%,80%)]">
              <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase border border-[hsl(33,11%,80%)] px-4 py-2.5 hover:bg-[hsl(33,11%,96%)] disabled:opacity-40"><ArrowLeft className="w-4 h-4"/>Back</button>
              {step < steps.length - 1 ? (
                <button onClick={next} className="group inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase bg-[hsl(85,13%,19%)] text-white px-6 py-3 hover:bg-[hsl(64,30%,36%)] transition-colors">Continue<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
              ) : (
                <button onClick={placeOrder} className="group inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase bg-[hsl(64,30%,36%)] text-white px-6 py-3 hover:bg-[hsl(85,13%,19%)] transition-colors">Place order<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></button>
              )}
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="border border-[hsl(33,11%,80%)] bg-white">
              {(designObj?.image || data.customPhoto) && (
                <div className="aspect-[4/5] bg-[hsl(33,11%,88%)] overflow-hidden">
                  <img src={data.customPhoto || designObj.image} alt="" className="w-full h-full object-cover"/>
                </div>
              )}
              <div className="p-5">
                <div className="edit-num text-[hsl(64,30%,36%)]">—  YOUR ORDER</div>
                <div className="font-serif-display text-2xl mt-1">{isCustom ? 'Custom Design' : designObj?.label}</div>
                <ul className="mt-4 text-sm space-y-1.5">
                  <Row k="Category" v={CATEGORY_LABELS[schemaKey]}/>
                  {!isCustom && <Row k="Neckline" v={NECKLINES.find((n) => n.id === data.neckline)?.label || '—'}/>}
                  {!isCustom && <Row k="Back" v={BACK_DESIGNS.find((n) => n.id === data.back)?.label || '—'}/>}
                  <Row k="Sleeve" v={SLEEVE_STYLES.find((n) => n.id === data.sleeve)?.label || '—'}/>
                  <Row k="Add-ons" v={data.addons.length ? `${data.addons.length} selected` : '—'}/>
                  <Row k="Plan" v={PLAN_OPTIONS.find((p) => p.id === data.plan)?.label || '—'}/>
                  <Row k="For" v={state.people.find((p) => p.id === data.personId)?.name || '—'}/>
                </ul>
                <div className="mt-5 pt-4 border-t border-[hsl(33,11%,80%)] space-y-1.5">
                  <Row k="Base" v={`₹${basePrice.toLocaleString('en-IN')}`}/>
                  <Row k="Add-ons" v={`₹${addonsPrice.toLocaleString('en-IN')}`}/>
                  <div className="flex justify-between pt-2"><span className="text-[11px] tracking-[0.22em] uppercase">Total</span><span className="font-serif-display text-2xl">₹{total.toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const Row = ({ k, v }) => <li className="flex justify-between gap-3 text-[hsl(85,13%,32%)]"><span className="text-[11px] tracking-[0.22em] uppercase">{k}</span><span className="text-[hsl(85,13%,19%)] text-right">{v}</span></li>;

function OptionStep({ title, hint, options, value, onChange, svgMap }) {
  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">{title}</h2>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">{hint}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mt-6">
        {options.map((o) => {
          const selected = value === o.id;
          const Svg = svgMap?.[o.id];
          return (
            <motion.button
              key={o.id}
              data-testid={`option-${o.id}`}
              whileHover={{ y: -2 }}
              onClick={() => onChange(o.id)}
              className={`text-left p-4 border transition-colors flex flex-col gap-3 ${selected ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'bg-white border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] text-[hsl(85,13%,19%)]'}`}
            >
              {Svg && (
                <div className={`aspect-square w-full p-2 ${selected ? 'bg-white/10 text-white' : 'bg-[hsl(33,11%,96%)] text-[hsl(64,30%,36%)]'}`}>
                  {Svg}
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif-display text-base sm:text-lg leading-tight">{o.label}</span>
                {selected && <Check className="w-4 h-4 flex-shrink-0"/>}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function PlanStep({ value, onChange, hasSavedPeople }) {
  const opts = PLAN_OPTIONS.filter((o) => o.id !== 'saved-person' || hasSavedPeople);
  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">How shall we measure?</h2>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">Pick what works best — you can change this any time before pickup.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {opts.map((o) => {
          const selected = value === o.id;
          return (
            <motion.button
              key={o.id}
              data-testid={`plan-${o.id}`}
              whileHover={{ y: -2 }}
              onClick={() => onChange(o.id)}
              className={`text-left p-5 border transition-colors flex items-start gap-4 ${selected ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'bg-white border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}
            >
              <span className={`mt-0.5 w-9 h-9 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-white/10 text-white' : 'bg-[hsl(33,11%,96%)] text-[hsl(64,30%,36%)]'}`}>
                <o.Icon className="w-4 h-4"/>
              </span>
              <span className="flex-1">
                <span className="block font-serif-display text-lg leading-tight">{o.label}</span>
                <span className={`block text-sm mt-1 ${selected ? 'text-white/80' : 'text-[hsl(85,13%,32%)]'}`}>{o.hint}</span>
              </span>
              {selected && <Check className="w-4 h-4 flex-shrink-0"/>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function AddonsStep({ value, onChange }) {
  const toggle = (id) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Finishing & add-ons</h2>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">Select any extras to elevate the finish.</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {ADDONS.map((a) => (
          <motion.label whileHover={{ y: -2 }} key={a.id} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${value.includes(a.id) ? 'bg-[hsl(33,11%,96%)] border-[hsl(85,13%,19%)]' : 'bg-white border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>
            <input type="checkbox" checked={value.includes(a.id)} onChange={() => toggle(a.id)} className="sr-only"/>
            <span className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${value.includes(a.id) ? 'bg-[hsl(64,30%,36%)] border-[hsl(64,30%,36%)] text-white' : 'border-[hsl(33,11%,80%)]'}`}>{value.includes(a.id) && <Check className="w-3 h-3"/>}</span>
            <span className="flex-1"><span className="font-serif-display text-base">{a.label}</span></span>
            <span className="font-serif-display text-base">+₹{a.price.toLocaleString('en-IN')}</span>
          </motion.label>
        ))}
      </div>
    </div>
  );
}

function CustomUploadStep({ value, onPhoto, notes, onNotes }) {
  const onFile = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhoto(reader.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Upload your design</h2>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">A photo, sketch, or screenshot — anything that captures the look.</p>
      <label className="mt-6 block border-2 border-dashed border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] bg-[hsl(33,11%,96%)] aspect-[4/3] cursor-pointer overflow-hidden">
        {value ? (
          <img src={value} alt="design" className="w-full h-full object-contain bg-white"/>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
            <Upload className="w-7 h-7 text-[hsl(64,30%,36%)]"/>
            <div className="font-serif-display text-xl mt-3">Click to upload</div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-1">PNG, JPG · up to 10MB</div>
          </div>
        )}
        <input type="file" accept="image/*" onChange={onFile} className="sr-only"/>
      </label>
      <label className="block mt-5">
        <span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Notes for the designer</span>
        <textarea value={notes} onChange={(e) => onNotes(e.target.value)} rows="4" placeholder="Mention occasion, fabric preference, color, fit…" className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
      </label>
    </div>
  );
}

function MeasurementsStep({ schemaKey, fields, data, setData, state, upsertPerson }) {
  const [howOpen, setHowOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const person = state.people.find((p) => p.id === data.personId);
  const saved = person?.measurements?.[schemaKey] || {};
  const m = Object.keys(data.measurements).length ? data.measurements : saved;
  const setVal = (k, v) => setData({ ...data, measurements: { ...m, [k]: v } });
  const useSaved = () => setData({ ...data, measurements: { ...saved } });
  const addPerson = () => { if (!newName) return; const id = `p_${Date.now()}`; upsertPerson({ id, name: newName, relation: 'Self', measurements: {} }); setData({ ...data, personId: id }); setNewName(''); };

  // If user picked "I'll visit" or "send a stylist", show an info panel — measurements
  // will be captured later. They can still optionally save a name/profile.
  const deferred = data.plan === 'visit-atelier' || data.plan === 'home-pickup';

  if (deferred) {
    const planObj = PLAN_OPTIONS.find((p) => p.id === data.plan);
    return (
      <div>
        <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Measurements — captured later</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-2">You chose: <span className="text-[hsl(85,13%,19%)] font-medium">{planObj?.label}</span>. We will capture exact measurements during the appointment.</p>

        <div className="mt-6 p-6 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] flex items-start gap-4">
          <span className="mt-0.5 w-10 h-10 flex items-center justify-center bg-white text-[hsl(64,30%,36%)] flex-shrink-0">
            {planObj?.Icon ? <planObj.Icon className="w-5 h-5"/> : <Ruler className="w-5 h-5"/>}
          </span>
          <div className="flex-1">
            <div className="font-serif-display text-xl text-[hsl(85,13%,19%)]">{planObj?.label}</div>
            <p className="text-sm text-[hsl(85,13%,32%)] mt-1">{planObj?.hint}</p>
            <p className="text-[12px] text-[hsl(85,13%,32%)] mt-3">Once your order is placed, our team will reach out within 24 hours to confirm the slot. You can track this in your profile.</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mb-2">Whose outfit is this?</div>
          <div className="p-4 bg-white border border-[hsl(33,11%,80%)] flex items-center gap-3 flex-wrap">
            <select data-testid="person-select" value={data.personId} onChange={(e) => setData({ ...data, personId: e.target.value })} className="bg-white border border-[hsl(33,11%,80%)] py-2 px-3 text-sm">
              <option value="">— Select a saved person —</option>
              {state.people.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.relation || 'Self'})</option>)}
            </select>
            <span className="text-[11px] text-[hsl(85,13%,32%)]">or</span>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Add a new person (e.g. ‘Mom’)" className="bg-white border border-[hsl(33,11%,80%)] py-2 px-3 text-sm flex-1 min-w-[200px]"/>
            <button onClick={addPerson} className="inline-flex items-center gap-1 bg-[hsl(85,13%,19%)] text-white px-3 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)]"><Plus className="w-4 h-4"/>Add</button>
          </div>
        </div>

        <details className="mt-6 group border border-[hsl(33,11%,80%)] bg-white">
          <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,19%)] hover:bg-[hsl(33,11%,96%)]">
            <span>Have measurements? Enter them now (optional)</span>
            <Plus className="w-4 h-4 group-open:rotate-45 transition-transform"/>
          </summary>
          <div className="border-t border-[hsl(33,11%,80%)] p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {fields.map((f) => (
                <div key={f.key}>
                  <div className="flex items-baseline justify-between">
                    <label className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,19%)]">{f.en}</label>
                    <span className="text-[11px] text-[hsl(85,13%,32%)]">{f.hi}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 bg-white border border-[hsl(33,11%,80%)] focus-within:border-[hsl(85,13%,19%)]">
                    <input value={m[f.key] || ''} onChange={(e) => setVal(f.key, e.target.value)} placeholder={`Enter ${f.en}`} className="flex-1 bg-transparent py-2.5 px-3 text-sm focus:outline-none"/>
                    <span className="pr-3 text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)]">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Measurements</h2>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-2">Bilingual labels. Values in inches. Save to a person to reuse later.</p>
        </div>
        <button onClick={() => setHowOpen(true)} className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase border border-[hsl(33,11%,80%)] px-3 py-2 hover:bg-[hsl(33,11%,96%)]"><Info className="w-4 h-4"/>How to measure</button>
      </div>

      {/* Person selector */}
      <div className="mt-6 p-4 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] flex items-center gap-3 flex-wrap">
        <span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Measure for</span>
        <select data-testid="person-select" value={data.personId} onChange={(e) => setData({ ...data, personId: e.target.value, measurements: {} })} className="bg-white border border-[hsl(33,11%,80%)] py-2 px-3 text-sm">
          <option value="">— Select —</option>
          {state.people.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.relation || 'Self'})</option>)}
        </select>
        <span className="text-[11px] text-[hsl(85,13%,32%)]">or</span>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Add new person name" className="bg-white border border-[hsl(33,11%,80%)] py-2 px-3 text-sm flex-1 min-w-[180px]"/>
        <button onClick={addPerson} className="inline-flex items-center gap-1 bg-[hsl(85,13%,19%)] text-white px-3 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)]"><Plus className="w-4 h-4"/>Add</button>
        {Object.keys(saved).length > 0 && (
          <button onClick={useSaved} className="inline-flex items-center gap-1 border border-[hsl(85,13%,19%)] text-[hsl(85,13%,19%)] px-3 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(85,13%,19%)] hover:text-white"><Ruler className="w-4 h-4"/>Use saved {CATEGORY_LABELS[schemaKey]}</button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        {fields.map((f) => (
          <div key={f.key}>
            <div className="flex items-baseline justify-between">
              <label className="text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,19%)]">{f.en}</label>
              <span className="text-[11px] text-[hsl(85,13%,32%)]">{f.hi}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 bg-white border border-[hsl(33,11%,80%)] focus-within:border-[hsl(85,13%,19%)]">
              <input value={m[f.key] || ''} onChange={(e) => setVal(f.key, e.target.value)} placeholder={`Enter ${f.en} / ${f.hi}`} className="flex-1 bg-transparent py-2.5 px-3 text-sm focus:outline-none"/>
              <span className="pr-3 text-[11px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)]">{f.unit}</span>
            </div>
            {f.hint && <div className="text-[10px] text-[hsl(85,13%,32%)] mt-1">{f.hint}</div>}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {howOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/45 flex items-center justify-center p-4" onClick={() => setHowOpen(false)}>
            <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} className="bg-white max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <div className="edit-num text-[hsl(64,30%,36%)]">—  HOW TO MEASURE</div>
                  <h3 className="font-serif-display text-3xl mt-2">A short, simple guide.</h3>
                </div>
                <button onClick={() => setHowOpen(false)} aria-label="close" className="p-2 hover:bg-[hsl(33,11%,96%)]"><X className="w-4 h-4"/></button>
              </div>
              <svg viewBox="0 0 400 220" className="w-full h-auto mt-5 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">
                <g stroke="#727941" strokeWidth="1.5" fill="none">
                  <path d="M200 30 q-30 10 -50 30 v60 q-10 60 -10 80 h120 q0 -20 -10 -80 v-60 q-20 -20 -50 -30 z"/>
                  <line x1="150" y1="60" x2="250" y2="60"/>
                  <text x="205" y="55" fill="#32382b" fontSize="10" fontFamily="sans-serif">Shoulder</text>
                  <line x1="160" y1="95" x2="240" y2="95"/>
                  <text x="205" y="90" fill="#32382b" fontSize="10" fontFamily="sans-serif">Bust</text>
                  <line x1="170" y1="125" x2="230" y2="125"/>
                  <text x="205" y="120" fill="#32382b" fontSize="10" fontFamily="sans-serif">Waist</text>
                  <line x1="160" y1="160" x2="240" y2="160"/>
                  <text x="205" y="155" fill="#32382b" fontSize="10" fontFamily="sans-serif">Hip</text>
                </g>
              </svg>
              <ol className="mt-6 space-y-3">
                {HOW_TO_MEASURE.map((h, i) => (
                  <li key={h.title} className="flex gap-3"><span className="font-italiana text-2xl text-[hsl(64,30%,36%)] w-6">0{i + 1}</span><div><div className="font-serif-display text-lg">{h.title}</div><div className="text-sm text-[hsl(85,13%,32%)]">{h.body}</div></div></li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReviewStep({ data, designObj, isCustom, schemaKey, total, basePrice, addonsPrice, state }) {
  const person = state.people.find((p) => p.id === data.personId);
  return (
    <div>
      <h2 className="font-serif-display text-3xl">Review your order</h2>
      <p className="text-sm text-[hsl(85,13%,32%)] mt-2">A summary before you place it. You can edit any step from the stepper above.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Card title="Design">
          <div className="font-serif-display text-2xl">{isCustom ? 'Custom Design' : designObj?.label}</div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-1">{CATEGORY_LABELS[schemaKey]}</div>
          {isCustom && data.customNotes && <p className="text-sm mt-3 italic text-[hsl(85,13%,32%)]">“{data.customNotes}”</p>}
        </Card>
        {!isCustom && (
          <Card title="Customisations">
            <ul className="text-sm space-y-1">
              <li>Neckline — {NECKLINES.find((n) => n.id === data.neckline)?.label}</li>
              <li>Back — {BACK_DESIGNS.find((n) => n.id === data.back)?.label}</li>
              <li>Sleeve — {SLEEVE_STYLES.find((n) => n.id === data.sleeve)?.label}</li>
            </ul>
          </Card>
        )}
        <Card title="Add-ons">
          {data.addons.length === 0 && <span className="text-sm text-[hsl(85,13%,32%)]">None</span>}
          <ul className="text-sm space-y-1">{data.addons.map((id) => { const a = ADDONS.find((x) => x.id === id); return <li key={id} className="flex justify-between"><span>{a.label}</span><span>+₹{a.price}</span></li>; })}</ul>
        </Card>
        <Card title="Plan & Recipient">
          <div className="font-serif-display text-xl">{PLAN_OPTIONS.find((p) => p.id === data.plan)?.label || '—'}</div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-1">{person?.name ? `For ${person.name}${person.relation ? ' · ' + person.relation : ''}` : 'No person selected'}</div>
          <div className="text-sm mt-3">{Object.values(data.measurements || {}).filter(Boolean).length} of {(MEASUREMENT_FIELDS[schemaKey] || []).length} measurements filled</div>
        </Card>
      </div>

      <div className="mt-6 p-5 bg-[hsl(85,13%,19%)] text-white">
        <div className="flex justify-between text-sm"><span>Base price</span><span>₹{basePrice.toLocaleString('en-IN')}</span></div>
        <div className="flex justify-between text-sm mt-1"><span>Add-ons</span><span>₹{addonsPrice.toLocaleString('en-IN')}</span></div>
        <div className="flex justify-between mt-3 pt-3 border-t border-white/15"><span className="text-[11px] tracking-[0.22em] uppercase">Total</span><span className="font-serif-display text-3xl">₹{total.toLocaleString('en-IN')}</span></div>
      </div>
    </div>
  );
}

const Card = ({ title, children }) => (
  <div className="p-5 border border-[hsl(33,11%,80%)] bg-white">
    <div className="edit-num text-[hsl(85,13%,32%)]">—  {title.toUpperCase()}</div>
    <div className="mt-2">{children}</div>
  </div>
);

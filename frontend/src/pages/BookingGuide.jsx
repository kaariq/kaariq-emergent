import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero, Breadcrumb } from '@/components/PageBits';
import { PROCESS, IMAGES, FAQ } from '@/mock/mock';
import { Calendar as CalIcon, Clock, Video, MapPin, Check, ArrowRight } from 'lucide-react';

const measurements = [
  { label: 'Bust / Chest', desc: 'Around the fullest part, keeping tape parallel to the floor.' },
  { label: 'Waist', desc: 'At the natural waistline — the slimmest part of your torso.' },
  { label: 'Hip', desc: 'Around the fullest part of your hips, about 8\" below the waist.' },
  { label: 'Shoulder', desc: 'Across the back, from one shoulder seam to the other.' },
  { label: 'Sleeve length', desc: 'From shoulder seam to wrist with arm slightly bent.' },
  { label: 'Inseam', desc: 'From the inside of the leg, crotch to ankle.' },
  { label: 'Outseam', desc: 'Outside of leg, from waist down to ankle.' },
  { label: 'Full length', desc: 'For dresses — shoulder to desired hem.' },
];

export default function BookingGuide() {
  const { slug } = useParams();
  const view = slug || 'our-process';
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Booking & Guide', to:'/booking'},{label:(slug || 'Our Process').replace(/-/g,' ')}]}/>
      <PageHero tag="BOOKING & GUIDE" title={<>Plan your <span className="italic">visit</span>, your way.</>} subtitle="In-studio, at-home, or virtual — choose the experience that suits you. Every appointment ends with a personalised quote and timeline." image={IMAGES.consultation}/>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12 flex flex-wrap gap-2">
        {[
          ['our-process','Our Process'],
          ['measurement-guide','Measurement Guide'],
          ['book-appointment','Book Appointment'],
          ['virtual-consultation','Virtual Consultation'],
        ].map(([s,l]) => (
          <Link key={s} to={`/booking/${s}`} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${view===s ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{l}</Link>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        {view === 'our-process' && <ProcessView />}
        {view === 'measurement-guide' && <Measurement items={measurements}/>}
        {view === 'book-appointment' && <BookForm />}
        {view === 'virtual-consultation' && <VirtualBook />}
      </div>

      <FAQSection />
    </main>
  );
}

function ProcessView() {
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <div className="sticky top-32">
          <div className="aspect-[4/5] overflow-hidden bg-[hsl(33,11%,88%)]">
            <img src={IMAGES.craft} alt="" className="w-full h-full object-cover"/>
          </div>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-5 leading-relaxed">A calm, considered process — designed to keep you involved at every stage. From your first conversation to delivery, you'll have one dedicated stylist.</p>
        </div>
      </div>
      <div className="lg:col-span-8">
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-[hsl(33,11%,80%)]" aria-hidden="true"/>
          {PROCESS.map((p) => (
            <div key={p.n} className="relative pl-14 pb-10 last:pb-0">
              <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] flex items-center justify-center font-italiana text-base">{p.n}</div>
              <h3 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">{p.title}</h3>
              <p className="text-sm text-[hsl(85,13%,32%)] mt-2 leading-relaxed max-w-xl">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Measurement({ items }) {
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5">
        <div className="aspect-[4/5] overflow-hidden bg-[hsl(33,11%,88%)] sticky top-32">
          <img src={IMAGES.consultation} alt="" className="w-full h-full object-cover"/>
        </div>
      </div>
      <div className="lg:col-span-7">
        <h2 className="font-serif-display text-3xl lg:text-4xl text-[hsl(85,13%,19%)]">A short, simple guide.</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-xl">Use a soft tape, stand naturally, and ask a friend to help. If you're unsure, our master tailor can come to you — free with bespoke orders.</p>
        <ol className="mt-8 space-y-5">
          {items.map((m, i) => (
            <li key={m.label} className="flex gap-5 pb-5 border-b border-[hsl(33,11%,80%)] last:border-0">
              <div className="font-italiana text-2xl text-[hsl(64,30%,36%)] w-10">0{i+1}</div>
              <div>
                <div className="font-serif-display text-xl text-[hsl(85,13%,19%)]">{m.label}</div>
                <div className="text-sm text-[hsl(85,13%,32%)] mt-1">{m.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function BookForm() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'Womens Wear', mode:'Studio Visit', date:'', time:'11:00', notes:'' });
  const [done, setDone] = useState(false);
  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setDone(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  if (done) {
    return (
      <div className="max-w-2xl mx-auto bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] p-10 lg:p-14 text-center">
        <Check className="w-8 h-8 mx-auto text-[hsl(64,30%,36%)]"/>
        <h3 className="font-serif-display text-4xl mt-4">Appointment requested</h3>
        <p className="text-sm opacity-80 mt-3">Thanks {form.name || 'friend'} — our concierge will confirm your slot on {form.date || 'the chosen date'} at {form.time}. Check your inbox in 30 minutes.</p>
        <button onClick={()=>setDone(false)} className="mt-6 inline-block border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">Book another</button>
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7">
        <h2 className="font-serif-display text-3xl lg:text-4xl text-[hsl(85,13%,19%)]">Book your appointment.</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-xl">Tell us a few details and we'll confirm within 30 minutes during studio hours.</p>
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <Field label="Full name" value={form.name} onChange={onChange('name')} required/>
          <Field label="Phone" value={form.phone} onChange={onChange('phone')} required/>
          <Field label="Email" type="email" value={form.email} onChange={onChange('email')} required cls="sm:col-span-2"/>
          <Select label="Service" value={form.service} onChange={onChange('service')} options={["Women's Wear","Men's Wear",'Bridal','Alterations','Customisation','Bulk / Corporate']}/>
          <Select label="Visit mode" value={form.mode} onChange={onChange('mode')} options={['Studio Visit','At-Home Visit','Virtual']}/>
          <Field label="Preferred date" type="date" value={form.date} onChange={onChange('date')} required/>
          <Select label="Preferred time" value={form.time} onChange={onChange('time')} options={['11:00','12:30','14:00','15:30','17:00','18:30']}/>
          <div className="sm:col-span-2">
            <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Notes (optional)</label>
            <textarea value={form.notes} onChange={onChange('notes')} rows="4" className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
          </div>
        </div>
        <button type="submit" className="mt-8 inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">Confirm appointment <ArrowRight className="w-4 h-4"/></button>
      </div>
      <div className="lg:col-span-5 space-y-4">
        <InfoCard icon={MapPin} title="Visit our atelier" body="12 Heritage Lane, Bandra West, Mumbai 400050"/>
        <InfoCard icon={Clock} title="Studio hours" body={'Mon – Sat · 11:00 – 20:00\nSundays by appointment'}/>
        <InfoCard icon={Video} title="Prefer to meet online?" body="Switch the visit mode to Virtual — we'll send a Google Meet link."/>
        <InfoCard icon={CalIcon} title="What to expect" body="45-min consultation, fabric & swatch viewing, measurement, and a written quote."/>
      </div>
    </form>
  );
}

function VirtualBook() {
  const days = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d;
  });
  const [sel, setSel] = useState(0);
  const [time, setTime] = useState('15:30');
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="max-w-2xl mx-auto text-center bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] p-12">
      <Check className="w-8 h-8 mx-auto text-[hsl(64,30%,36%)]"/>
      <h3 className="font-serif-display text-3xl mt-3">Call confirmed</h3>
      <p className="text-sm opacity-80 mt-2">{days[sel].toDateString()} at {time}. Google Meet invite is on its way.</p>
    </div>
  );
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5">
        <div className="edit-num text-[hsl(85,13%,32%)]">—  30 MIN · GOOGLE MEET</div>
        <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">Book your free virtual consultation.</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-4">A relaxed video call with our e-designer. We'll discuss your inspirations, recommend fabrics, and share a written quote within the hour.</p>
        <ul className="mt-6 space-y-2 text-sm">
          {['Free, no obligation','Sketches & swatches included','Pricing emailed within 1 hour'].map(x=> <li key={x} className="flex items-center gap-2"><Check className="w-4 h-4 text-[hsl(64,30%,36%)]"/>{x}</li>)}
        </ul>
      </div>
      <div className="lg:col-span-7 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-6 lg:p-8">
        <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mb-3">Choose a day</div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {days.map((d, i) => (
            <button key={i} onClick={()=>setSel(i)} className={`shrink-0 w-16 py-3 border text-center transition-colors ${sel===i ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>
              <div className="text-[10px] tracking-[0.18em] uppercase opacity-80">{d.toLocaleDateString('en-US',{weekday:'short'})}</div>
              <div className="font-serif-display text-2xl mt-1">{d.getDate()}</div>
              <div className="text-[10px] tracking-[0.18em] uppercase opacity-80">{d.toLocaleDateString('en-US',{month:'short'})}</div>
            </button>
          ))}
        </div>
        <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)] mt-6 mb-3">Choose a time (IST)</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {['11:00','12:00','13:00','14:30','15:30','16:30','18:00','19:00'].map(t => (
            <button key={t} onClick={()=>setTime(t)} className={`py-2 border text-sm transition-colors ${time===t ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{t}</button>
          ))}
        </div>
        <button onClick={()=>setDone(true)} className="mt-8 inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">Confirm slot <ArrowRight className="w-4 h-4"/></button>
      </div>
    </div>
  );
}

function Field({ label, cls='', ...props }) {
  return (
    <div className={cls}>
      <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{label}</label>
      <input {...props} className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
    </div>
  );
}
function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{label}</label>
      <select {...props} className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function InfoCard({ icon: Icon, title, body }) {
  return (
    <div className="p-6 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">
      <Icon className="w-5 h-5 text-[hsl(64,30%,36%)]"/>
      <div className="font-serif-display text-xl mt-3">{title}</div>
      <div className="text-sm text-[hsl(85,13%,32%)] mt-1 whitespace-pre-line">{body}</div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 lg:px-10 mt-20">
      <div className="edit-num text-[hsl(85,13%,32%)] text-center">—  FREQUENTLY ASKED</div>
      <h2 className="font-serif-display text-4xl lg:text-5xl text-[hsl(85,13%,19%)] text-center mt-3">Good to know.</h2>
      <div className="mt-10 divide-y divide-[hsl(33,11%,80%)] border-y border-[hsl(33,11%,80%)]">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-serif-display text-xl lg:text-2xl text-[hsl(85,13%,19%)]">{f.q}</span>
              <span className="font-italiana text-2xl text-[hsl(64,30%,36%)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-3xl leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

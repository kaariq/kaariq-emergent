import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero, Breadcrumb } from '@/components/PageBits';
import { SITE, IMAGES } from '@/mock/mock';
import { MapPin, Phone, Mail, MessageCircle, Building2, Send, Check } from 'lucide-react';

export default function Contact() {
  const { slug } = useParams();
  const view = slug || 'find-our-studio';
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Contact', to:'/contact'},{label:(slug || 'Find Our Studio').replace(/-/g,' ')}]}/>
      <PageHero tag="CONTACT US" title={<>Let's start a <span className="italic">conversation</span>.</>} subtitle="Whether it's a quick query or a wedding wardrobe, our concierge will reply within an hour during studio hours." image={IMAGES.boutique}/>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12 flex flex-wrap gap-2">
        {[
          ['find-our-studio','Find Our Studio'],
          ['whatsapp-support','WhatsApp Support'],
          ['corporate-inquiries','Corporate Inquiries'],
        ].map(([s,l]) => (
          <Link key={s} to={`/contact/${s}`} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${view===s ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{l}</Link>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        {view === 'find-our-studio' && <Studio />}
        {view === 'whatsapp-support' && <Whatsapp />}
        {view === 'corporate-inquiries' && <Corporate />}
      </div>
    </main>
  );
}

function Studio() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [done, setDone] = useState(false);
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5">
        <div className="aspect-[4/3] overflow-hidden bg-[hsl(33,11%,88%)]">
          <img src={IMAGES.boutique} alt="Atelier" className="w-full h-full object-cover"/>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Info icon={MapPin} title="Atelier address" body={SITE.address}/>
          <Info icon={Phone} title="Phone" body={SITE.phone}/>
          <Info icon={Mail} title="Email" body={SITE.email}/>
          <Info icon={MessageCircle} title="WhatsApp" body={SITE.whatsapp}/>
        </div>
      </div>
      <div className="lg:col-span-7">
        <h2 className="font-serif-display text-3xl lg:text-4xl text-[hsl(85,13%,19%)]">Send us a note.</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-xl">We answer every message personally. Expect a reply from a real human, not a bot.</p>
        {!done ? (
          <form onSubmit={(e)=>{e.preventDefault(); setDone(true);}} className="mt-8 grid sm:grid-cols-2 gap-5">
            <Field label="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
            <Field label="Email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
            <div className="sm:col-span-2">
              <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Message</label>
              <textarea rows="5" required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
            </div>
            <button type="submit" className="sm:col-span-2 inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors w-fit"><Send className="w-4 h-4"/>Send message</button>
          </form>
        ) : (
          <div className="mt-8 p-8 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">
            <Check className="w-7 h-7 text-[hsl(64,30%,36%)]"/>
            <div className="font-serif-display text-2xl mt-3">Message received</div>
            <p className="text-sm text-[hsl(85,13%,32%)] mt-1">We'll be in touch within an hour during studio hours.</p>
          </div>
        )}
        <div className="mt-10 aspect-[16/9] overflow-hidden bg-[hsl(33,11%,88%)] border border-[hsl(33,11%,80%)]">
          <iframe title="map" className="w-full h-full" src="https://www.openstreetmap.org/export/embed.html?bbox=72.81%2C19.05%2C72.85%2C19.07&layer=mapnik" loading="lazy"/>
        </div>
      </div>
    </div>
  );
}

function Whatsapp() {
  return (
    <div className="max-w-3xl mx-auto bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] p-10 lg:p-14 text-center">
      <MessageCircle className="w-9 h-9 mx-auto text-[hsl(64,30%,36%)]"/>
      <h2 className="font-serif-display text-4xl lg:text-5xl mt-4">Chat on WhatsApp.</h2>
      <p className="text-sm opacity-80 mt-3 max-w-xl mx-auto">Send us inspiration images, ask about pricing, or share your timeline. Our concierge replies within minutes during studio hours.</p>
      <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g,'')}`} className="inline-flex items-center gap-2 mt-8 bg-[hsl(0,0%,100%)] text-[hsl(85,13%,19%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors"><MessageCircle className="w-4 h-4"/>Open WhatsApp →</a>
      <div className="text-[11px] tracking-[0.22em] uppercase opacity-70 mt-5">{SITE.whatsapp}</div>
    </div>
  );
}

function Corporate() {
  const [form, setForm] = useState({ company:'', name:'', email:'', size:'10–25', requirement:'' });
  const [done, setDone] = useState(false);
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5">
        <Building2 className="w-7 h-7 text-[hsl(64,30%,36%)]"/>
        <h2 className="font-serif-display text-3xl lg:text-4xl mt-3 text-[hsl(85,13%,19%)]">Corporate, weddings & wholesale.</h2>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-3">From wedding-party uniforms to brand collaborations, our team can scale production while keeping the hand-finished feel.</p>
        <ul className="mt-6 space-y-2 text-sm">
          {['Dedicated project manager','Up to 18% wholesale discount','Bulk shipping & invoicing','Brand-customised labels'].map(x => <li key={x} className="flex items-center gap-2"><Check className="w-4 h-4 text-[hsl(64,30%,36%)]"/>{x}</li>)}
        </ul>
      </div>
      <div className="lg:col-span-7">
        {!done ? (
          <form onSubmit={(e)=>{e.preventDefault(); setDone(true);}} className="grid sm:grid-cols-2 gap-5 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-6 lg:p-8">
            <Field label="Company" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} required cls="sm:col-span-2"/>
            <Field label="Contact name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
            <Field label="Email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
            <div className="sm:col-span-2">
              <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Order size</label>
              <select value={form.size} onChange={(e)=>setForm({...form,size:e.target.value})} className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm">
                <option>10–25</option><option>26–50</option><option>51–100</option><option>100+</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">Requirement</label>
              <textarea rows="5" value={form.requirement} onChange={(e)=>setForm({...form,requirement:e.target.value})} className="w-full mt-2 bg-white border border-[hsl(33,11%,80%)] p-3 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)]"/>
            </div>
            <button type="submit" className="sm:col-span-2 inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors w-fit"><Send className="w-4 h-4"/>Submit inquiry</button>
          </form>
        ) : (
          <div className="p-10 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] text-center">
            <Check className="w-8 h-8 mx-auto text-[hsl(64,30%,36%)]"/>
            <div className="font-serif-display text-3xl mt-3">Inquiry received</div>
            <p className="text-sm opacity-80 mt-2">Our team will reach out within one business day with a tailored proposal.</p>
          </div>
        )}
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
function Info({ icon: Icon, title, body }) {
  return (
    <div className="p-5 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">
      <Icon className="w-5 h-5 text-[hsl(64,30%,36%)]"/>
      <div className="font-serif-display text-lg mt-2">{title}</div>
      <div className="text-sm text-[hsl(85,13%,32%)] mt-1">{body}</div>
    </div>
  );
}

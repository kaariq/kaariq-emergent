import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero, Breadcrumb } from '@/components/PageBits';
import { IMAGES, GALLERY, BLOG } from '@/mock/mock';
import { Sparkles, ArrowRight, Wand2, ChevronRight } from 'lucide-react';

const quizQs = [
  { q: 'How would you describe your everyday style?', a: ['Classic & tailored','Bohemian & relaxed','Modern minimal','Festive & ornate'] },
  { q: 'Which palette pulls you in?', a: ['Ivory & gold','Earthy neutrals','Jewel tones','Pastels'] },
  { q: 'A perfect occasion to dress for?', a: ['Wedding sangeet','Sunday brunch','Boardroom meeting','Diwali night'] },
];
const showreels = [
  { name: 'Ananya M.', city: 'Mumbai', vid: IMAGES.women },
  { name: 'Rohan K.', city: 'Delhi', vid: IMAGES.men },
  { name: 'Priya I.', city: 'Bengaluru', vid: IMAGES.casual },
  { name: 'Arjun N.', city: 'Singapore', vid: IMAGES.boutique },
];

export default function Explore() {
  const { slug } = useParams();
  const view = slug || 'gallery-and-lookbook';
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Explore', to:'/explore'},{label: (slug || 'Gallery').replace(/-/g,' ')}]}/>
      <PageHero tag="EXPLORE" title={<>Stories, style, <span className="italic">and inspiration</span>.</>} subtitle="Step into the Kaariq world — a curated lookbook, journal entries, AI-led design tools and films from our customers." image={IMAGES.lookbook}/>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12 flex flex-wrap gap-2">
        {[
          ['gallery-and-lookbook','Gallery & Lookbook'],
          ['blog-and-fashion-news','Journal'],
          ['ai-design-tool','AI Design Tool'],
          ['personal-style-quiz','Style Quiz'],
          ['customer-showreels','Showreels'],
        ].map(([s,l]) => (
          <Link key={s} to={`/explore/${s}`} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${view===s ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{l}</Link>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        {view === 'gallery-and-lookbook' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {GALLERY.map((g, i) => (
              <div key={i} className={`overflow-hidden bg-[hsl(33,11%,88%)] ${i%5===0 ? 'aspect-[3/4] lg:row-span-2 lg:aspect-[3/5]' : 'aspect-[3/4]'}`}>
                <img src={g} alt="" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700"/>
              </div>
            ))}
          </div>
        )}
        {view === 'blog-and-fashion-news' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...BLOG, ...BLOG].map((b, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-[hsl(33,11%,88%)] mb-4">
                  <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"/>
                </div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{b.tag} · {b.date}</div>
                <h3 className="font-serif-display text-2xl mt-2">{b.title}</h3>
                <span className="link-underline text-[12px] tracking-[0.22em] uppercase mt-3 inline-block">Read article →</span>
              </article>
            ))}
          </div>
        )}
        {view === 'ai-design-tool' && <AITool />}
        {view === 'personal-style-quiz' && <Quiz qs={quizQs}/>}
        {view === 'customer-showreels' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showreels.map((s) => (
              <div key={s.name} className="group relative aspect-[3/5] overflow-hidden bg-black">
                <img src={s.vid} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute left-4 bottom-4 right-4 text-[hsl(0,0%,100%)]">
                  <div className="edit-num opacity-90">SHOWREEL</div>
                  <div className="font-serif-display text-2xl mt-1">{s.name}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase opacity-80">{s.city}</div>
                </div>
                <button className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[hsl(0,0%,100%)]/90 flex items-center justify-center hover:bg-[hsl(0,0%,100%)] transition-colors" aria-label="Play">
                  <ChevronRight className="w-6 h-6 text-[hsl(85,13%,19%)] ml-1"/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function AITool() {
  const [prompt, setPrompt] = useState('A pastel anarkali with delicate floral threadwork for a daytime sangeet');
  const [result, setResult] = useState(null);
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-8 lg:p-10">
        <div className="flex items-center gap-2 text-[hsl(64,30%,36%)]"><Wand2 className="w-5 h-5"/><span className="edit-num">KAARIQ DESIGN STUDIO</span></div>
        <h3 className="font-serif-display text-3xl mt-3">Describe your dream outfit.</h3>
        <p className="text-sm text-[hsl(85,13%,32%)] mt-2">Our AI will sketch a moodboard and recommend fabrics, embroideries, and an estimated price.</p>
        <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} className="w-full mt-5 bg-white border border-[hsl(33,11%,80%)] p-4 text-sm focus:outline-none focus:border-[hsl(85,13%,19%)] min-h-[120px]"/>
        <button onClick={()=>setResult({ id: Date.now() })} className="mt-4 inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors"><Sparkles className="w-4 h-4"/>Generate moodboard</button>
        <p className="text-[11px] mt-3 text-[hsl(85,13%,32%)]">*Demo only — connect API to enable live AI design.</p>
      </div>
      <div className="bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-6 lg:p-8">
        {!result && <div className="h-full flex items-center justify-center text-center min-h-[280px]"><div><Sparkles className="w-7 h-7 mx-auto text-[hsl(64,30%,36%)]"/><div className="text-sm text-[hsl(85,13%,32%)] mt-3">Your moodboard will appear here.</div></div></div>}
        {result && (
          <div>
            <div className="grid grid-cols-2 gap-2">
              <img src={IMAGES.embroidery} alt="" className="aspect-square object-cover"/>
              <img src={IMAGES.festive} alt="" className="aspect-square object-cover"/>
              <img src={IMAGES.fabric} alt="" className="aspect-square object-cover"/>
              <img src={IMAGES.women} alt="" className="aspect-square object-cover"/>
            </div>
            <div className="mt-5">
              <div className="font-serif-display text-2xl">Suggested look</div>
              <p className="text-sm text-[hsl(85,13%,32%)] mt-1">Pastel pista anarkali · organza dupatta · floral resham work · estimate ₹16,500 – ₹22,000.</p>
              <Link to="/booking/book-appointment" className="link-underline text-[12px] tracking-[0.22em] uppercase mt-4 inline-block">Book a fitting →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Quiz({ qs }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState([]);
  const done = step >= qs.length;
  return (
    <div className="max-w-2xl mx-auto bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-8 lg:p-12">
      {!done && (
        <>
          <div className="edit-num text-[hsl(85,13%,32%)]">QUESTION 0{step+1} / 0{qs.length}</div>
          <h3 className="font-serif-display text-3xl mt-2">{qs[step].q}</h3>
          <div className="mt-6 space-y-2">
            {qs[step].a.map(opt => (
              <button key={opt} onClick={()=>{ setAns([...ans, opt]); setStep(step+1); }} className="w-full text-left p-4 border border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] hover:bg-[hsl(0,0%,100%)] transition-colors text-sm">{opt}</button>
            ))}
          </div>
        </>
      )}
      {done && (
        <div className="text-center">
          <Sparkles className="w-7 h-7 mx-auto text-[hsl(64,30%,36%)]"/>
          <div className="edit-num text-[hsl(85,13%,32%)] mt-3">YOUR STYLE</div>
          <h3 className="font-serif-display text-4xl mt-2">Modern Heritage</h3>
          <p className="text-sm text-[hsl(85,13%,32%)] mt-3">Refined classics with a contemporary edge — crisp tailoring, hand-finished details, and a calm palette.</p>
          <Link to="/collections/modern-minimalist" className="inline-flex items-center gap-2 mt-6 bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">See your edit <ArrowRight className="w-4 h-4"/></Link>
        </div>
      )}
    </div>
  );
}

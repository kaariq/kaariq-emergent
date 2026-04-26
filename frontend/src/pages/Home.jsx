import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Quote, Scissors, Ruler, Sparkles, Globe, Heart, Leaf, Clock, Eye } from 'lucide-react';
import { IMAGES, SERVICES, FEATURES, COLLECTIONS, PROCESS, TESTIMONIALS, BLOG, GALLERY, SITE } from '@/mock/mock';

const featureIcons = [Ruler, Globe, Scissors, Heart, Eye, Clock, Leaf, Sparkles];

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <ProcessSection />
      <CollectionsEditorial />
      <FabricBanner />
      <FeaturesSection />
      <Testimonials />
      <Journal />
      <CTASection />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative bg-[hsl(30,22%,95%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 lg:pt-16 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left text */}
          <div className="lg:col-span-4 flex flex-col justify-center fade-up">
            <div className="edit-num text-[hsl(351,20%,28%)]">——  EST. 2018  ——</div>
            <h1 className="font-serif-display text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.02] mt-5 text-[hsl(351,33%,18%)]">
              Your fabric,<br/>
              <span className="italic">your fit,</span><br/>
              your story.
            </h1>
            <p className="text-[15px] leading-relaxed text-[hsl(351,20%,28%)] mt-6 max-w-md">
              Bespoke tailoring & boutique — hand-crafted in Mumbai, delivered worldwide. Doorstep measurements, virtual fittings, and master artisans for every silhouette.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/booking/book-appointment" className="group inline-flex items-center gap-2 bg-[hsl(351,33%,18%)] text-[hsl(30,22%,95%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(351,33%,30%)] transition-colors">
                Book Appointment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link to="/tailoring" className="inline-flex items-center gap-2 border border-[hsl(351,33%,18%)] text-[hsl(351,33%,18%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(351,33%,18%)] hover:text-[hsl(30,22%,95%)] transition-colors">
                Explore Tailoring
              </Link>
            </div>
            <div className="flex gap-8 mt-12">
              {[['7,400+', 'Garments crafted'],['96%', 'Repeat clients'],['25+', 'Cities served']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-serif-display text-3xl text-[hsl(351,33%,18%)]">{n}</div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-[hsl(351,20%,28%)] mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Image — large */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-[hsl(30,14%,82%)]">
              <img src={IMAGES.hero} alt="Bespoke tailoring" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"/>
              <div className="absolute left-6 bottom-6 lg:left-10 lg:bottom-10 bg-[hsl(30,22%,95%)] px-5 py-4 max-w-xs">
                <div className="edit-num text-[hsl(351,20%,28%)]">SS ’26 · Lookbook</div>
                <div className="font-serif-display text-2xl mt-1 text-[hsl(351,33%,18%)]">The Wedding Edit</div>
                <Link to="/collections/wedding-edit" className="link-underline text-[12px] tracking-[0.22em] uppercase mt-3 inline-block">Discover →</Link>
              </div>
              <div className="absolute top-6 right-6 lg:top-10 lg:right-10 hidden md:flex flex-col items-end gap-2 text-right">
                <span className="edit-num text-[hsl(30,22%,95%)] drop-shadow">N° 01</span>
                <span className="text-[hsl(30,22%,95%)] text-[11px] tracking-[0.22em] uppercase drop-shadow">Made to measure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = ['Doorstep Measurement', 'Virtual Fitting', 'Hand Embroidery', 'Worldwide Shipping', 'Lifetime Alterations', 'Sustainable Atelier'];
  return (
    <div className="border-y border-[hsl(28,11%,70%)] bg-[hsl(30,18%,92%)] overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-4">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[12px] tracking-[0.28em] uppercase text-[hsl(351,33%,18%)]">
            <span className="font-italiana text-base text-[hsl(28,11%,55%)]">—</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="edit-num text-[hsl(351,20%,28%)]">—  WHAT WE TAILOR</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-3 text-[hsl(351,33%,18%)] leading-[1.05]">
            Tailoring, <span className="italic">re-imagined</span> for the modern wardrobe.
          </h2>
        </div>
        <Link to="/tailoring" className="link-underline text-[12px] tracking-[0.22em] uppercase">View all services →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {SERVICES.map((s, i) => (
          <Link to={s.link} key={s.title} className="group block">
            <div className="aspect-[3/4] overflow-hidden bg-[hsl(30,14%,82%)] mb-4">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"/>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="edit-num text-[hsl(351,20%,28%)]">N° 0{i+1}</div>
                <h3 className="font-serif-display text-2xl mt-1 text-[hsl(351,33%,18%)]">{s.title}</h3>
              </div>
              <ArrowUpRight className="w-5 h-5 mt-1 text-[hsl(351,33%,18%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
            </div>
            <p className="text-sm text-[hsl(351,20%,28%)] mt-2 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[hsl(351,33%,18%)] text-[hsl(30,22%,95%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="edit-num opacity-70">—  THE KAARIQ PROCESS</div>
            <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 leading-[1.05]">From sketch <span className="italic">to silhouette,</span> in six steps.</h2>
            <p className="text-sm opacity-75 mt-5 max-w-sm leading-relaxed">A considered, calm process — designed to put you at the centre of every decision. Whether you visit our atelier, host us at home, or fit virtually, the experience is the same.</p>
            <Link to="/booking/our-process" className="inline-flex items-center gap-2 mt-8 border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(351,33%,18%)] transition-colors">Read full process <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-white/10">
            {PROCESS.map((p) => (
              <div key={p.n} className="p-8 bg-[hsl(351,33%,18%)] hover:bg-[hsl(351,40%,24%)] transition-colors">
                <div className="font-italiana text-3xl text-[hsl(28,11%,55%)]">{p.n}</div>
                <h3 className="font-serif-display text-2xl mt-2">{p.title}</h3>
                <p className="text-sm opacity-75 mt-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectionsEditorial() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="edit-num text-[hsl(351,20%,28%)]">—  THE COLLECTIONS</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-3 text-[hsl(351,33%,18%)] leading-[1.05]">Edits for every <span className="italic">occasion.</span></h2>
        </div>
        <Link to="/collections" className="link-underline text-[12px] tracking-[0.22em] uppercase">Browse the lookbook →</Link>
      </div>
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {COLLECTIONS.map((c, i) => (
          <Link key={c.title} to={`/collections/${c.tag.toLowerCase().replace(/\s+/g,'-')}`} className={`group relative overflow-hidden bg-[hsl(30,14%,82%)] block ${i===0 ? 'lg:col-span-7 aspect-[4/3]' : i===1 ? 'lg:col-span-5 aspect-[4/3]' : i===2 ? 'lg:col-span-5 aspect-[4/3]' : 'lg:col-span-7 aspect-[4/3]'}`}>
            <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"/>
            <div className="absolute left-6 bottom-6 lg:left-8 lg:bottom-8 text-[hsl(30,22%,95%)] max-w-md">
              <div className="edit-num opacity-90">{c.tag}</div>
              <h3 className="font-serif-display text-3xl lg:text-4xl mt-1">{c.title}</h3>
              <p className="text-sm opacity-90 mt-2 hidden lg:block">{c.blurb}</p>
              <span className="link-underline text-[12px] tracking-[0.22em] uppercase mt-3 inline-block">Shop now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FabricBanner() {
  return (
    <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
      <img src={IMAGES.craft} alt="Atelier" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-black/45"/>
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl text-[hsl(30,22%,95%)] fade-up">
          <div className="edit-num opacity-80">—  AT THE ATELIER</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-4 leading-[1.05]">A garment is never <span className="italic">finished</span> — only delivered.</h2>
          <p className="text-sm opacity-90 mt-5 max-w-xl mx-auto">Every Kaariq piece passes through 14 hands and 6 quality checks before it leaves the studio.</p>
          <Link to="/explore/gallery-and-lookbook" className="inline-flex items-center gap-2 mt-8 border border-white px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(351,33%,18%)] transition-colors">View the atelier <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="edit-num text-[hsl(351,20%,28%)]">—  WHY KAARIQ</div>
        <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(351,33%,18%)]">Fabric. Fashion. <span className="italic">Fit.</span> Finesse.</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(28,11%,70%)] border border-[hsl(28,11%,70%)]">
        {FEATURES.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <div key={f.title} className="bg-[hsl(30,22%,95%)] p-8 hover:bg-[hsl(30,18%,92%)] transition-colors">
              <Icon className="w-7 h-7 text-[hsl(351,33%,30%)]" strokeWidth={1.4}/>
              <h3 className="font-serif-display text-xl mt-5 text-[hsl(351,33%,18%)]">{f.title}</h3>
              <p className="text-sm text-[hsl(351,20%,28%)] mt-2 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(p => (p+1) % TESTIMONIALS.length), 6000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="bg-[hsl(30,18%,92%)] border-y border-[hsl(28,11%,70%)]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <Quote className="w-8 h-8 mx-auto text-[hsl(28,11%,55%)]"/>
        <p className="font-serif-display text-2xl lg:text-4xl leading-[1.25] mt-6 text-[hsl(351,33%,18%)]">“{t.quote}”</p>
        <div className="mt-8">
          <div className="font-serif-display text-xl text-[hsl(351,33%,18%)]">{t.name}</div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(351,20%,28%)] mt-1">{t.role}</div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={()=>setI(idx)} aria-label={`Go to testimonial ${idx+1}`} className={`h-1 transition-all ${idx===i ? 'w-8 bg-[hsl(351,33%,18%)]' : 'w-4 bg-[hsl(36,14%,75%)] hover:bg-[hsl(351,33%,18%)]/50'}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="edit-num text-[hsl(351,20%,28%)]">—  JOURNAL</div>
          <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(351,33%,18%)]">From the <span className="italic">atelier</span>.</h2>
        </div>
        <Link to="/explore/blog-and-fashion-news" className="link-underline text-[12px] tracking-[0.22em] uppercase">All articles →</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {BLOG.map(b => (
          <article key={b.title} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-[hsl(30,14%,82%)] mb-4">
              <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"/>
            </div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(351,20%,28%)]">{b.tag} · {b.date}</div>
            <h3 className="font-serif-display text-2xl mt-2 text-[hsl(351,33%,18%)] leading-snug group-hover:text-[hsl(351,33%,30%)] transition-colors">{b.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-[hsl(30,22%,95%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-px bg-[hsl(28,11%,70%)] border border-[hsl(28,11%,70%)]">
          <Link to="/booking/book-appointment" className="group bg-[hsl(30,18%,92%)] hover:bg-[hsl(351,33%,18%)] hover:text-[hsl(30,22%,95%)] p-10 lg:p-14 transition-colors">
            <div className="edit-num opacity-70">—  AT THE ATELIER</div>
            <h3 className="font-serif-display text-3xl lg:text-4xl mt-3">Visit our Mumbai studio</h3>
            <p className="text-sm opacity-80 mt-3 max-w-md">Walk through fabrics, browse the lookbook, and meet the master tailor in person.</p>
            <div className="inline-flex items-center gap-2 mt-6 text-[12px] tracking-[0.22em] uppercase">Book a visit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></div>
          </Link>
          <Link to="/booking/virtual-consultation" className="group bg-[hsl(30,18%,92%)] hover:bg-[hsl(351,33%,18%)] hover:text-[hsl(30,22%,95%)] p-10 lg:p-14 transition-colors">
            <div className="edit-num opacity-70">—  ANYWHERE IN THE WORLD</div>
            <h3 className="font-serif-display text-3xl lg:text-4xl mt-3">Virtual consultation</h3>
            <p className="text-sm opacity-80 mt-3 max-w-md">A 30-minute video call with our e-designer. Sketches, swatches and pricing — in your inbox.</p>
            <div className="inline-flex items-center gap-2 mt-6 text-[12px] tracking-[0.22em] uppercase">Schedule a call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></div>
          </Link>
        </div>
      </div>
    </section>
  );
}

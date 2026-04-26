import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Quote, Scissors, Ruler, Sparkles, Globe, Heart, Leaf, Clock, Eye, Play, X } from 'lucide-react';
import { IMAGES, SERVICES, FEATURES, COLLECTIONS, PROCESS, TESTIMONIAL_MEDIA, BLOG, HERO_SLIDES } from '@/mock/mock';

const featureIcons = [Ruler, Globe, Scissors, Heart, Eye, Clock, Leaf, Sparkles];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <TrustStrip />
      <ServicesGrid />
      <HorizontalProcess />
      <CollectionsEditorial />
      <FabricBanner />
      <FeaturesSection />
      <MediaTestimonials />
      <Journal />
    </main>
  );
}

/* -------------------- HERO CAROUSEL -------------------- */
function HeroCarousel() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const total = HERO_SLIDES.length;
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setI((p) => (p + 1) % total), 5500);
    return () => clearInterval(t);
  }, [hover, total]);
  const go = (d) => setI((p) => (p + d + total) % total);
  const slide = HERO_SLIDES[i];
  const alignLeft = slide.align === 'left';
  return (
    <section className="relative w-full bg-[hsl(85,13%,19%)] overflow-hidden" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative h-[78vh] min-h-[560px] max-h-[840px] w-full">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background: slide.overlay }}/>
            {/* SVG noise / grain decoration */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
              <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
              <rect width="100%" height="100%" filter="url(#n)"/>
            </svg>
            {/* decorative arc SVG */}
            <svg className={`absolute ${alignLeft ? '-right-20 top-10' : '-left-20 top-10'} w-[280px] h-[280px] hidden lg:block opacity-25`} viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="95" stroke="#c3bcb1" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="60" stroke="#c3bcb1" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="30" stroke="#c3bcb1" strokeWidth="0.5"/>
            </svg>
          </motion.div>
        </AnimatePresence>
        {/* Text overlay */}
        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              className={`max-w-xl text-white ${alignLeft ? 'text-left' : 'ml-auto text-left lg:text-right'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-italiana text-[11px] tracking-[0.4em] uppercase opacity-90">{slide.eyebrow}</div>
              <h1 className="font-serif-display mt-5 text-[44px] sm:text-[56px] lg:text-[78px] leading-[0.98] whitespace-pre-line">{slide.title}</h1>
              <p className="text-[15px] lg:text-[16px] leading-relaxed mt-5 opacity-90 max-w-md ml-0 lg:ml-auto">{slide.body}</p>
              <div className={`flex flex-wrap gap-3 mt-8 ${alignLeft ? '' : 'lg:justify-end'}`}>
                <Link to={slide.cta.to} className="group inline-flex items-center gap-2 bg-white text-[hsl(85,13%,19%)] px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] hover:text-white transition-colors">
                  {slide.cta.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link to="/booking/book-appointment" className="inline-flex items-center gap-2 border border-white/70 px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Controls */}
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5"/></button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5"/></button>
        {/* Pagination */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 px-6">
          {HERO_SLIDES.map((s, idx) => (
            <button key={s.id} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className="group relative h-[3px] w-10 lg:w-14 bg-white/30 overflow-hidden">
              <span className={`absolute inset-0 bg-white origin-left transition-transform duration-[5500ms] ease-linear ${idx === i ? 'scale-x-100' : 'scale-x-0'}`}/>
            </button>
          ))}
          <span className="font-italiana text-white text-[11px] tracking-[0.3em] ml-3">0{i + 1} / 0{total}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------- TRUST STRIP -------------------- */
function TrustStrip() {
  const items = ['Free Doorstep Measurement', 'Free Pickup & Delivery', 'Free Lifetime Alterations', 'Worldwide Shipping', 'Hand Embroidery', 'Sustainable Atelier'];
  return (
    <div className="border-y border-[hsl(33,11%,80%)] bg-white overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-4">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-[12px] tracking-[0.28em] uppercase text-[hsl(85,13%,19%)]">
            <span className="font-italiana text-base text-[hsl(64,30%,36%)]">—</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- SERVICES GRID -------------------- */
function ServicesGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <motion.div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
        <div className="max-w-2xl">
          <div className="edit-num text-[hsl(85,13%,32%)]">—  WHAT WE TAILOR</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-3 text-[hsl(85,13%,19%)] leading-[1.05]">
            Tailoring, <span className="italic text-[hsl(64,30%,36%)]">re-imagined</span> for the modern wardrobe.
          </h2>
        </div>
        <Link to="/tailoring" className="link-underline text-[12px] tracking-[0.22em] uppercase">View all services →</Link>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {SERVICES.map((s, i) => (
          <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} custom={i} variants={fadeUp}>
            <Link to={s.link} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-[hsl(33,11%,88%)] mb-4 relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1200ms]"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(85,13%,19%)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="edit-num text-[hsl(85,13%,32%)]">N° 0{i + 1}</div>
                  <h3 className="font-serif-display text-2xl mt-1 text-[hsl(85,13%,19%)] group-hover:text-[hsl(64,30%,36%)] transition-colors">{s.title}</h3>
                </div>
                <ArrowUpRight className="w-5 h-5 mt-1 text-[hsl(85,13%,19%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(64,30%,36%)] transition-all"/>
              </div>
              <p className="text-sm text-[hsl(85,13%,32%)] mt-2 leading-relaxed">{s.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- HORIZONTAL PROCESS -------------------- */
function HorizontalProcess() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.2'] });
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section ref={ref} className="bg-[hsl(85,13%,19%)] text-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="max-w-3xl mb-16">
          <div className="edit-num opacity-70">—  THE KAARIQ PROCESS</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-3 leading-[1.05]">From sketch <span className="italic text-[hsl(33,11%,73%)]">to silhouette,</span> in six steps.</h2>
          <p className="text-sm opacity-75 mt-5 max-w-xl leading-relaxed">A calm, considered process — designed to put you at the centre of every decision.</p>
        </motion.div>

        {/* Horizontal scrollable process */}
        <div className="relative">
          {/* progress line */}
          <div className="absolute left-0 right-0 top-[42px] h-px bg-white/15" aria-hidden="true"/>
          <motion.div className="absolute left-0 top-[42px] h-px bg-[hsl(64,30%,36%)]" style={{ width: lineW }} aria-hidden="true"/>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 relative">
            {PROCESS.map((p, idx) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }} className="relative group">
                <motion.div whileHover={{ y: -4 }} className="flex flex-col items-start">
                  <div className="relative z-10 w-[84px] h-[84px] rounded-full bg-[hsl(85,13%,19%)] border-2 border-white/25 group-hover:border-[hsl(64,30%,36%)] flex items-center justify-center transition-colors">
                    <span className="font-italiana text-3xl text-[hsl(33,11%,73%)] group-hover:text-[hsl(64,30%,36%)] transition-colors">{p.n}</span>
                  </div>
                  <h3 className="font-serif-display text-2xl mt-5">{p.title}</h3>
                  <p className="text-[13px] opacity-75 mt-2 leading-relaxed pr-2">{p.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mt-16">
          <Link to="/booking/our-process" className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">Read full process <ArrowRight className="w-4 h-4"/></Link>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- COLLECTIONS EDITORIAL -------------------- */
function CollectionsEditorial() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="edit-num text-[hsl(85,13%,32%)]">—  THE COLLECTIONS</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-3 text-[hsl(85,13%,19%)] leading-[1.05]">Edits for every <span className="italic text-[hsl(64,30%,36%)]">occasion.</span></h2>
        </div>
        <Link to="/collections" className="link-underline text-[12px] tracking-[0.22em] uppercase">Browse the lookbook →</Link>
      </motion.div>
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {COLLECTIONS.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={i === 0 ? 'lg:col-span-7' : i === 1 ? 'lg:col-span-5' : i === 2 ? 'lg:col-span-5' : 'lg:col-span-7'}>
            <Link to={`/collections/${c.tag.toLowerCase().replace(/\s+/g, '-')}`} className="group relative overflow-hidden bg-[hsl(33,11%,88%)] block aspect-[4/3]">
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(85,13%,14%)]/65 via-[hsl(85,13%,14%)]/10 to-transparent"/>
              <div className="absolute left-6 bottom-6 lg:left-8 lg:bottom-8 text-white max-w-md">
                <div className="edit-num opacity-90">{c.tag}</div>
                <h3 className="font-serif-display text-3xl lg:text-4xl mt-1">{c.title}</h3>
                <p className="text-sm opacity-90 mt-2 hidden lg:block">{c.blurb}</p>
                <span className="link-underline text-[12px] tracking-[0.22em] uppercase mt-3 inline-block">Shop now →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- FABRIC BANNER -------------------- */
function FabricBanner() {
  return (
    <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
      <motion.img initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} src={IMAGES.craft} alt="Atelier" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(50,56,43,0.4) 0%, rgba(50,56,43,0.55) 70%, rgba(50,56,43,0.7) 100%)' }}/>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl text-white">
          <div className="edit-num opacity-80">—  AT THE ATELIER</div>
          <h2 className="font-serif-display text-4xl lg:text-6xl mt-4 leading-[1.05]">A garment is never <span className="italic">finished</span> — only delivered.</h2>
          <p className="text-sm opacity-90 mt-5 max-w-xl mx-auto">Every Kaariq piece passes through 14 hands and 6 quality checks before it leaves the studio.</p>
          <Link to="/explore/gallery-and-lookbook" className="inline-flex items-center gap-2 mt-8 border border-white px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">View the atelier <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------- FEATURES -------------------- */
function FeaturesSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
        <div className="edit-num text-[hsl(85,13%,32%)]">—  WHY KAARIQ</div>
        <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">Fabric. Fashion. <span className="italic text-[hsl(64,30%,36%)]">Fit.</span> Finesse.</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(33,11%,80%)] border border-[hsl(33,11%,80%)]">
        {FEATURES.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.06 }} className="bg-white p-8 hover:bg-[hsl(33,11%,96%)] transition-colors group">
              <Icon className="w-7 h-7 text-[hsl(64,30%,36%)] group-hover:scale-110 transition-transform" strokeWidth={1.4}/>
              <h3 className="font-serif-display text-xl mt-5 text-[hsl(85,13%,19%)]">{f.title}</h3>
              <p className="text-sm text-[hsl(85,13%,32%)] mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- MEDIA TESTIMONIALS -------------------- */
function MediaTestimonials() {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[hsl(33,11%,96%)] border-y border-[hsl(33,11%,80%)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <div className="edit-num text-[hsl(85,13%,32%)]">—  STORIES FROM OUR CUSTOMERS</div>
          <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">In their own <span className="italic text-[hsl(64,30%,36%)]">words.</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TESTIMONIAL_MEDIA.map((t, i) => (
            <motion.article key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.1 }} className="flex flex-col">
              <button onClick={() => setOpen(t)} className="group relative aspect-[4/5] overflow-hidden bg-[hsl(33,11%,88%)]" aria-label={`View ${t.name} testimonial`}>
                <img src={t.thumb} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms]"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(85,13%,14%)]/60 via-transparent to-transparent"/>
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.22em] uppercase bg-white/90 text-[hsl(85,13%,19%)] px-2 py-1">{t.type === 'video' ? 'Video' : 'Photo'}</span>
                <span className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/95 flex items-center justify-center group-hover:bg-[hsl(64,30%,36%)] group-hover:text-white transition-all group-hover:scale-110">
                  {t.type === 'video' ? <Play className="w-5 h-5 ml-1"/> : <Eye className="w-5 h-5"/>}
                </span>
              </button>
              <div className="mt-5 flex-1 flex flex-col">
                <Quote className="w-5 h-5 text-[hsl(64,30%,36%)]"/>
                <p className="font-serif-display text-lg leading-snug mt-2 text-[hsl(85,13%,19%)] line-clamp-4">“{t.quote}”</p>
                <div className="mt-auto pt-4">
                  <div className="font-serif-display text-base text-[hsl(85,13%,19%)]">{t.name}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{t.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="relative max-w-4xl w-full" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center"><X className="w-5 h-5"/></button>
              <div className="aspect-video bg-black">
                {open.type === 'video' ? (
                  <iframe src={open.src} title={open.name} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
                ) : (
                  <img src={open.src} alt={open.name} className="w-full h-full object-contain"/>
                )}
              </div>
              <div className="bg-white p-6">
                <p className="font-serif-display text-xl text-[hsl(85,13%,19%)]">“{open.quote}”</p>
                <div className="mt-3">
                  <div className="font-serif-display text-base">{open.name}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{open.role}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------- JOURNAL -------------------- */
function Journal() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="edit-num text-[hsl(85,13%,32%)]">—  JOURNAL</div>
          <h2 className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">From the <span className="italic text-[hsl(64,30%,36%)]">atelier</span>.</h2>
        </div>
        <Link to="/explore/blog-and-fashion-news" className="link-underline text-[12px] tracking-[0.22em] uppercase">All articles →</Link>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {BLOG.map((b, i) => (
          <motion.article key={b.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: i * 0.08 }} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-[hsl(33,11%,88%)] mb-4">
              <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[900ms]"/>
            </div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{b.tag} · {b.date}</div>
            <h3 className="font-serif-display text-2xl mt-2 text-[hsl(85,13%,19%)] leading-snug group-hover:text-[hsl(64,30%,36%)] transition-colors">{b.title}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

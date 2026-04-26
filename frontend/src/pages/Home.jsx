import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Quote, Scissors, Ruler, Sparkles, Globe, Heart, Leaf, Clock, Eye, Play, X } from 'lucide-react';
import { IMAGES, SERVICES, FEATURES, COLLECTIONS, PROCESS, TESTIMONIAL_MEDIA, BLOG, HERO_SLIDES } from '@/mock/mock';

const featureIcons = [Ruler, Globe, Scissors, Heart, Eye, Clock, Leaf, Sparkles];

/* ---------- Reusable motion variants ---------- */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.85, delay: i * 0.08, ease } }),
};

const dropIn = {
  hidden: { opacity: 0, y: -40, scale: 0.96 },
  show: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, delay: i * 0.08, type: 'spring', stiffness: 80, damping: 16 } }),
};

const blurUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: (i = 0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.0, delay: i * 0.1, ease } }),
};

const stagger = (delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren } },
});

/* ---------- Section wrapper that softly launches its children ---------- */
function Reveal({ children, variants = fadeUp, custom = 0, className = '', once = true, amount = 0.2 }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once, amount }} custom={custom} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

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
          <motion.div key={slide.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.15, ease }}>
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background: slide.overlay }}/>
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
              <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/></filter>
              <rect width="100%" height="100%" filter="url(#n)"/>
            </svg>
            <svg className={`absolute ${alignLeft ? '-right-20 top-10' : '-left-20 top-10'} w-[280px] h-[280px] hidden lg:block opacity-25`} viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="95" stroke="#c3bcb1" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="60" stroke="#c3bcb1" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="30" stroke="#c3bcb1" strokeWidth="0.5"/>
            </svg>
          </motion.div>
        </AnimatePresence>
        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              className={`max-w-xl text-white ${alignLeft ? 'text-left' : 'ml-auto text-left lg:text-right'}`}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              variants={stagger(0.15)}
            >
              <motion.div variants={blurUp} className="font-italiana text-[11px] tracking-[0.4em] uppercase opacity-90">{slide.eyebrow}</motion.div>
              <motion.h1 variants={blurUp} className="font-serif-display mt-5 text-[44px] sm:text-[56px] lg:text-[78px] leading-[0.98] whitespace-pre-line">{slide.title}</motion.h1>
              <motion.p variants={blurUp} className="text-[15px] lg:text-[16px] leading-relaxed mt-5 opacity-90 max-w-md ml-0 lg:ml-auto">{slide.body}</motion.p>
              <motion.div variants={blurUp} className={`flex flex-wrap gap-3 mt-8 ${alignLeft ? '' : 'lg:justify-end'}`}>
                <Link to={slide.cta.to} className="group inline-flex items-center gap-2 bg-white text-[hsl(85,13%,19%)] px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] hover:text-white transition-colors">
                  {slide.cta.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link to="/booking/book-appointment" className="inline-flex items-center gap-2 border border-white/70 px-7 py-3.5 text-[12px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">
                  Book Appointment
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><ChevronLeft className="w-5 h-5"/></button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center transition-colors"><ChevronRight className="w-5 h-5"/></button>
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

/* -------------------- SERVICES GRID — refined -------------------- */
function ServicesGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <Reveal variants={stagger()} className="grid lg:grid-cols-12 gap-6 mb-16 items-end">
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="edit-num text-[hsl(85,13%,32%)]">— 01 / WHAT WE TAILOR</div>
        </motion.div>
        <motion.h2 variants={blurUp} className="lg:col-span-7 font-serif-display text-4xl lg:text-[64px] leading-[1.02] text-[hsl(85,13%,19%)]">
          Tailoring,
          <span className="italic text-[hsl(64,30%,36%)]"> re-imagined</span>
          <br className="hidden lg:block"/> for the modern wardrobe.
        </motion.h2>
        <motion.div variants={fadeUp} className="lg:col-span-2 lg:text-right">
          <Link to="/tailoring" className="link-underline text-[12px] tracking-[0.22em] uppercase">View all services →</Link>
        </motion.div>
      </Reveal>

      <Reveal variants={stagger(0.05)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(33,11%,80%)] border border-[hsl(33,11%,80%)]">
        {SERVICES.map((s, i) => (
          <motion.div key={s.title} custom={i} variants={dropIn} className="bg-white">
            <Link to={s.link} className="group block relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-[hsl(33,11%,88%)]">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(85,13%,14%)]/80 via-[hsl(85,13%,14%)]/20 to-transparent"/>
                {/* corner index */}
                <span className="absolute top-5 left-5 font-italiana text-[hsl(33,11%,88%)] text-[26px] tracking-[0.2em]">N°&nbsp;0{i + 1}</span>
                {/* bottom card content */}
                <div className="absolute left-0 right-0 bottom-0 p-6 lg:p-7 text-white">
                  <h3 className="font-serif-display text-[26px] leading-tight">{s.title}</h3>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-[max-height] duration-700 ease-out">
                    <p className="text-[13px] opacity-85 leading-relaxed mt-2 pr-3">{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-[11px] tracking-[0.28em] uppercase">
                    Discover
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                  </div>
                </div>
                {/* subtle decorative thin line */}
                <span className="absolute left-6 right-6 bottom-[68px] h-px bg-white/30"/>
              </div>
            </Link>
          </motion.div>
        ))}
      </Reveal>
    </section>
  );
}

/* -------------------- HORIZONTAL PROCESS -------------------- */
function HorizontalProcess() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.2'] });
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section ref={ref} className="bg-[hsl(85,13%,19%)] text-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal variants={stagger(0.05)} className="max-w-3xl mb-20">
          <motion.div variants={fadeUp} className="edit-num opacity-70">— 02 / THE KAARIQ PROCESS</motion.div>
          <motion.h2 variants={blurUp} className="font-serif-display text-4xl lg:text-6xl mt-4 leading-[1.05]">From sketch <span className="italic text-[hsl(33,11%,73%)]">to silhouette,</span> in six steps.</motion.h2>
          <motion.p variants={fadeUp} className="text-sm opacity-75 mt-5 max-w-xl leading-relaxed">A calm, considered process — designed to put you at the centre of every decision.</motion.p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[42px] h-px bg-white/15" aria-hidden="true"/>
          <motion.div className="absolute left-0 top-[42px] h-px bg-[hsl(64,30%,36%)]" style={{ width: lineW }} aria-hidden="true"/>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6 relative">
            {PROCESS.map((p, idx) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8, delay: idx * 0.12, type: 'spring', stiffness: 80, damping: 16 }} className="relative group">
                <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 250, damping: 20 }} className="flex flex-col items-start">
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

        <Reveal className="mt-20">
          <Link to="/booking/our-process" className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">Read full process <ArrowRight className="w-4 h-4"/></Link>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------- COLLECTIONS EDITORIAL -------------------- */
function CollectionsEditorial() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <Reveal variants={stagger()} className="grid lg:grid-cols-12 gap-6 mb-16 items-end">
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="edit-num text-[hsl(85,13%,32%)]">— 03 / THE COLLECTIONS</div>
        </motion.div>
        <motion.h2 variants={blurUp} className="lg:col-span-7 font-serif-display text-4xl lg:text-[64px] leading-[1.02] text-[hsl(85,13%,19%)]">
          Edits for every <span className="italic text-[hsl(64,30%,36%)]">occasion.</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="lg:col-span-2 lg:text-right">
          <Link to="/collections" className="link-underline text-[12px] tracking-[0.22em] uppercase">Browse the lookbook →</Link>
        </motion.div>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {COLLECTIONS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: i * 0.12, ease }}
            className={i === 0 ? 'lg:col-span-7' : i === 1 ? 'lg:col-span-5' : i === 2 ? 'lg:col-span-5' : 'lg:col-span-7'}
          >
            <Link to={`/collections/${c.tag.toLowerCase().replace(/\s+/g, '-')}`} className="group relative overflow-hidden bg-[hsl(33,11%,88%)] block aspect-[4/3]">
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms] ease-out"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(85,13%,14%)]/72 via-[hsl(85,13%,14%)]/15 to-transparent"/>
              <div className="absolute left-7 bottom-7 lg:left-9 lg:bottom-9 text-white max-w-md">
                <div className="edit-num opacity-90">{c.tag}</div>
                <h3 className="font-serif-display text-3xl lg:text-[40px] mt-1 leading-tight">{c.title}</h3>
                <p className="text-sm opacity-90 mt-3 hidden lg:block max-w-sm">{c.blurb}</p>
                <span className="link-underline text-[12px] tracking-[0.22em] uppercase mt-4 inline-block">Shop now →</span>
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
      <motion.img initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease }} src={IMAGES.craft} alt="Atelier" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(50,56,43,0.4) 0%, rgba(50,56,43,0.55) 70%, rgba(50,56,43,0.7) 100%)' }}/>
      <Reveal variants={stagger(0.1)} className="relative h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl text-white">
          <motion.div variants={blurUp} className="edit-num opacity-80">— AT THE ATELIER</motion.div>
          <motion.h2 variants={blurUp} className="font-serif-display text-4xl lg:text-6xl mt-4 leading-[1.05]">A garment is never <span className="italic">finished</span> — only delivered.</motion.h2>
          <motion.p variants={blurUp} className="text-sm opacity-90 mt-5 max-w-xl mx-auto">Every Kaariq piece passes through 14 hands and 6 quality checks before it leaves the studio.</motion.p>
          <motion.div variants={blurUp}>
            <Link to="/explore/gallery-and-lookbook" className="inline-flex items-center gap-2 mt-8 border border-white px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">View the atelier <ArrowRight className="w-4 h-4"/></Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------- FEATURES -------------------- */
function FeaturesSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <Reveal variants={stagger(0.05)} className="text-center max-w-3xl mx-auto mb-16">
        <motion.div variants={fadeUp} className="edit-num text-[hsl(85,13%,32%)]">— 04 / WHY KAARIQ</motion.div>
        <motion.h2 variants={blurUp} className="font-serif-display text-4xl lg:text-5xl mt-3 text-[hsl(85,13%,19%)]">Fabric. Fashion. <span className="italic text-[hsl(64,30%,36%)]">Fit.</span> Finesse.</motion.h2>
      </Reveal>
      <Reveal variants={stagger(0.04)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(33,11%,80%)] border border-[hsl(33,11%,80%)]">
        {FEATURES.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <motion.div key={f.title} custom={i} variants={dropIn} className="bg-white p-8 hover:bg-[hsl(33,11%,96%)] transition-colors group">
              <Icon className="w-7 h-7 text-[hsl(64,30%,36%)] group-hover:scale-110 transition-transform" strokeWidth={1.4}/>
              <h3 className="font-serif-display text-xl mt-5 text-[hsl(85,13%,19%)]">{f.title}</h3>
              <p className="text-sm text-[hsl(85,13%,32%)] mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </Reveal>
    </section>
  );
}

/* -------------------- MEDIA TESTIMONIALS — split, dark, auto-scroll -------------------- */
function MediaTestimonials() {
  const [open, setOpen] = useState(null);
  const list = [...TESTIMONIAL_MEDIA, ...TESTIMONIAL_MEDIA, ...TESTIMONIAL_MEDIA]; // for seamless loop
  const [paused, setPaused] = useState(false);
  return (
    <section className="relative bg-[hsl(85,13%,14%)] text-white overflow-hidden">
      {/* decorative SVG */}
      <svg className="absolute -left-32 top-20 w-[420px] h-[420px] opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="98" stroke="#c3bcb1" strokeWidth="0.3"/>
        <circle cx="100" cy="100" r="66" stroke="#c3bcb1" strokeWidth="0.3"/>
        <circle cx="100" cy="100" r="34" stroke="#c3bcb1" strokeWidth="0.3"/>
      </svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT — heading + quote */}
        <Reveal variants={stagger(0.1)} className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div variants={fadeUp} className="edit-num opacity-70">— 05 / FROM OUR CUSTOMERS</motion.div>
          <motion.h2 variants={blurUp} className="font-serif-display text-4xl lg:text-[64px] leading-[1.02] mt-4">
            In their own <span className="italic text-[hsl(33,11%,73%)]">words.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 max-w-md">
            <Quote className="w-7 h-7 text-[hsl(64,30%,46%)]"/>
            <p className="font-serif-display text-xl lg:text-2xl mt-4 leading-snug opacity-90">
              &ldquo;Behind every garment is a story of trust — of fabric, fit, and the people who chose us to tell it.&rdquo;
            </p>
            <div className="mt-6 text-[11px] tracking-[0.22em] uppercase opacity-70">— The Kaariq atelier</div>
          </motion.div>
          <motion.div variants={fadeUp} className="hidden lg:flex items-center gap-3 mt-10 text-[11px] tracking-[0.22em] uppercase opacity-70">
            <span>Hover to pause</span>
            <span className="w-12 h-px bg-white/30"/>
            <span>Click to view</span>
          </motion.div>
        </Reveal>

        {/* RIGHT — auto-scrolling marquee column */}
        <div className="lg:col-span-7 relative h-[640px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[hsl(85,13%,14%)] to-transparent z-10 pointer-events-none"/>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[hsl(85,13%,14%)] to-transparent z-10 pointer-events-none"/>
          <motion.div
            className="flex flex-col gap-6"
            animate={{ y: paused ? undefined : ['0%', '-66.66%'] }}
            transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
          >
            {list.map((t, i) => (
              <motion.button
                key={`${t.name}-${i}`}
                whileHover={{ scale: 1.015 }}
                onClick={() => setOpen(t)}
                className="group flex gap-5 items-stretch text-left bg-white/[0.04] border border-white/10 hover:border-[hsl(64,30%,46%)]/60 backdrop-blur-sm p-4 lg:p-5 transition-colors"
              >
                <div className="relative w-[140px] sm:w-[180px] aspect-[3/4] overflow-hidden flex-shrink-0 bg-black">
                  <img src={t.thumb} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[900ms]"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.22em] uppercase bg-white/95 text-[hsl(85,13%,19%)] px-2 py-0.5">{t.type === 'video' ? 'Video' : 'Photo'}</span>
                  <span className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white/95 flex items-center justify-center group-hover:bg-[hsl(64,30%,36%)] group-hover:text-white transition-all">
                    {t.type === 'video' ? <Play className="w-4 h-4 ml-0.5"/> : <Eye className="w-4 h-4"/>}
                  </span>
                </div>
                <div className="flex-1 py-1 flex flex-col">
                  <Quote className="w-4 h-4 text-[hsl(64,30%,46%)]"/>
                  <p className="font-serif-display text-[17px] sm:text-[19px] leading-snug mt-2 line-clamp-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-auto pt-3">
                    <div className="font-serif-display text-base">{t.name}</div>
                    <div className="text-[10px] tracking-[0.22em] uppercase opacity-70">{t.role}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="relative max-w-4xl w-full" initial={{ scale: 0.94, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.94, y: 24, opacity: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/15 hover:bg-white text-white hover:text-[hsl(85,13%,19%)] flex items-center justify-center"><X className="w-5 h-5"/></button>
              <div className="aspect-video bg-black">
                {open.type === 'video' ? (
                  <iframe src={open.src} title={open.name} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
                ) : (
                  <img src={open.src} alt={open.name} className="w-full h-full object-contain"/>
                )}
              </div>
              <div className="bg-white p-6">
                <p className="font-serif-display text-xl text-[hsl(85,13%,19%)]">&ldquo;{open.quote}&rdquo;</p>
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

/* -------------------- JOURNAL — minimal -------------------- */
function Journal() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
      <Reveal variants={stagger(0.05)} className="grid lg:grid-cols-12 gap-6 items-end mb-12">
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <div className="edit-num text-[hsl(85,13%,32%)]">— 06 / JOURNAL</div>
        </motion.div>
        <motion.h2 variants={blurUp} className="lg:col-span-7 font-serif-display text-4xl lg:text-5xl text-[hsl(85,13%,19%)]">
          Notes from the <span className="italic text-[hsl(64,30%,36%)]">atelier</span>.
        </motion.h2>
        <motion.div variants={fadeUp} className="lg:col-span-2 lg:text-right">
          <Link to="/explore/blog-and-fashion-news" className="link-underline text-[12px] tracking-[0.22em] uppercase">All articles →</Link>
        </motion.div>
      </Reveal>

      <Reveal variants={stagger(0.04)} className="border-t border-[hsl(33,11%,80%)]">
        {BLOG.map((b, i) => (
          <motion.article key={b.title} custom={i} variants={fadeUp}>
            <Link to="/explore/blog-and-fashion-news" className="group grid grid-cols-12 gap-6 items-center py-7 lg:py-8 border-b border-[hsl(33,11%,80%)] hover:bg-[hsl(33,11%,96%)] transition-colors px-2 lg:px-3">
              <div className="col-span-2 lg:col-span-1 font-italiana text-2xl lg:text-3xl text-[hsl(64,30%,36%)]">0{i + 1}</div>
              <div className="col-span-10 lg:col-span-3 text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{b.tag} · {b.date}</div>
              <h3 className="col-span-12 lg:col-span-6 font-serif-display text-2xl lg:text-3xl text-[hsl(85,13%,19%)] leading-snug group-hover:text-[hsl(64,30%,36%)] transition-colors">{b.title}</h3>
              <div className="col-span-12 lg:col-span-2 flex items-center justify-start lg:justify-end gap-3">
                <div className="hidden lg:block w-14 h-14 overflow-hidden bg-[hsl(33,11%,88%)] rounded-full">
                  <img src={b.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[hsl(85,13%,19%)] group-hover:text-[hsl(64,30%,36%)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"/>
              </div>
            </Link>
          </motion.article>
        ))}
      </Reveal>
    </section>
  );
}

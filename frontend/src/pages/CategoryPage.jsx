import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles, Upload } from 'lucide-react';
import { Breadcrumb, PageHero } from '@/components/PageBits';
import { DESIGNS } from '@/data/designs';
import { CATEGORY_TO_SCHEMA, CATEGORY_LABELS } from '@/data/measurements';
import { IMAGES } from '@/mock/mock';

export default function CategoryPage({ slug: forcedSlug }) {
  const params = useParams();
  const slug = forcedSlug || params.slug;
  const schemaKey = CATEGORY_TO_SCHEMA[slug];
  const designs = DESIGNS[schemaKey] || [];
  const label = CATEGORY_LABELS[schemaKey] || (slug || '').replace(/-/g, ' ');
  const nav = useNavigate();
  const heroImg = designs[0]?.image || IMAGES.craft;

  return (
    <main className="pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Tailoring', to: '/tailoring' }, { label }]}/>
      <PageHero tag="BESPOKE TAILORING" title={<span className="capitalize">{label}<span className="italic text-[hsl(64,30%,36%)]"> by Kaariq</span></span>} subtitle="Pick a design to start your bespoke order — or build something one-of-a-kind with our designers." image={heroImg}/>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div className="edit-num text-[hsl(85,13%,32%)]">—  PREDEFINED DESIGNS</div>
            <h2 className="font-serif-display text-3xl lg:text-4xl mt-2">Pick a starting silhouette.</h2>
          </div>
          <span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">{designs.length} designs</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => nav(`/tailoring/${slug}/order/${d.id}`)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group text-left bg-white border border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)] transition-colors"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[hsl(33,11%,88%)]">
                <img src={d.image} alt={d.label} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1000ms]"/>
                <span className="absolute top-3 left-3 text-[10px] tracking-[0.22em] uppercase bg-white/95 px-2 py-1">N° {String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif-display text-xl text-[hsl(85,13%,19%)]">{d.label}</h3>
                  <ArrowUpRight className="w-4 h-4 mt-1 text-[hsl(85,13%,32%)] group-hover:text-[hsl(64,30%,36%)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"/>
                </div>
                <p className="text-[13px] text-[hsl(85,13%,32%)] mt-1 leading-relaxed line-clamp-2">{d.blurb}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[hsl(33,11%,80%)]">
                  <span className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">From</span>
                  <span className="font-serif-display text-lg text-[hsl(85,13%,19%)]">₹{d.basePrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom order CTA */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative overflow-hidden bg-[hsl(85,13%,19%)] text-white p-8 lg:p-12">
            <Sparkles className="w-7 h-7 text-[hsl(64,30%,46%)]"/>
            <h3 className="font-serif-display text-3xl mt-4">Have a design in mind?</h3>
            <p className="text-sm opacity-85 mt-3 max-w-md">Upload a reference photo or sketch — our designer will recreate it with your fabric and fit.</p>
            <Link to={`/tailoring/${slug}/order/custom`} className="inline-flex items-center gap-2 mt-6 bg-white text-[hsl(85,13%,19%)] px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] hover:text-white transition-colors"><Upload className="w-4 h-4"/>Upload your design</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="relative overflow-hidden bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)] p-8 lg:p-12">
            <div className="edit-num text-[hsl(64,30%,36%)]">—  NOT SURE WHAT SUITS YOU?</div>
            <h3 className="font-serif-display text-3xl mt-3">Talk to a designer.</h3>
            <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-md">Free 30-minute video call. Share your inspirations, body type and budget — we’ll suggest the right silhouette.</p>
            <Link to="/booking/virtual-consultation" className="inline-flex items-center gap-2 mt-6 bg-[hsl(85,13%,19%)] text-white px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">Book consultation <ArrowRight className="w-4 h-4"/></Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

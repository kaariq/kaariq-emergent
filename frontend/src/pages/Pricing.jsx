import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero, Breadcrumb } from '@/components/PageBits';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_GROUPS, PRICING_INCLUDED } from '@/data/pricing-data';
import { IMAGES } from '@/mock/mock';

export default function Pricing() {
  const { slug } = useParams();
  const initial = PRICING_GROUPS.find((g) => slug?.includes(g.id))?.id || 'womens';
  const [tab, setTab] = useState(initial);
  const group = PRICING_GROUPS.find((g) => g.id === tab);

  return (
    <main className="pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]}/>
      <PageHero tag="TRANSPARENT PRICING" title={<>Honest rates, <span className="italic text-[hsl(64,30%,36%)]">no surprises</span>.</>} subtitle="All prices include design consultation, 14-point measurement, two rounds of fittings, and packaging." image={IMAGES.fabric}/>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[hsl(33,11%,80%)] pb-3">
          {PRICING_GROUPS.map((g) => (
            <button key={g.id} onClick={() => setTab(g.id)} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${tab === g.id ? 'bg-[hsl(85,13%,19%)] text-white border-[hsl(85,13%,19%)]' : 'border-transparent hover:border-[hsl(85,13%,19%)]'}`}>{g.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }} className="mt-10">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="edit-num text-[hsl(85,13%,32%)]">— {group.label.toUpperCase()}</div>
                <h2 className="font-serif-display text-3xl lg:text-4xl mt-3 text-[hsl(85,13%,19%)]">Pricing for {group.label}.</h2>
                <p className="text-sm text-[hsl(85,13%,32%)] mt-3 max-w-md">{group.intro}</p>
                <Link to="/booking/book-appointment" className="inline-flex items-center gap-2 mt-7 bg-[hsl(85,13%,19%)] text-white px-5 py-3 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">Get a custom quote <ArrowRight className="w-4 h-4"/></Link>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-[hsl(33,11%,80%)] bg-white">
                  <div className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-[hsl(33,11%,80%)] bg-[hsl(33,11%,96%)] text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">
                    <div className="col-span-7">Item</div>
                    <div className="col-span-3">Price</div>
                    <div className="col-span-2 text-right">Lead time</div>
                  </div>
                  {group.rows.map(([name, price, lead], i) => (
                    <motion.div key={name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-[hsl(33,11%,80%)] last:border-0 hover:bg-[hsl(33,11%,96%)] transition-colors">
                      <div className="col-span-7 font-serif-display text-lg text-[hsl(85,13%,19%)]">{name}</div>
                      <div className="col-span-3 text-[hsl(64,30%,36%)] font-serif-display text-lg">{price}</div>
                      <div className="col-span-2 text-right text-sm text-[hsl(85,13%,32%)]">{lead}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Always included */}
        <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="p-8 lg:p-10 bg-[hsl(85,13%,19%)] text-white">
            <div className="edit-num opacity-70">—  ALWAYS INCLUDED</div>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {PRICING_INCLUDED.map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="w-4 h-4 text-[hsl(64,30%,46%)]"/>{x}</li>
              ))}
            </ul>
            <p className="text-[11px] tracking-[0.18em] uppercase opacity-70 mt-4">*on premium bespoke orders</p>
          </div>
          <div className="p-8 lg:p-10 bg-[hsl(33,11%,96%)] border border-[hsl(33,11%,80%)]">
            <div className="edit-num text-[hsl(85,13%,32%)]">—  CORPORATE & WEDDING PARTIES</div>
            <h3 className="font-serif-display text-3xl mt-2">Need 10+ pieces?</h3>
            <p className="text-sm text-[hsl(85,13%,32%)] mt-2">Unlock priority production, dedicated stylist, and up to 18% wholesale discount.</p>
            <Link to="/contact/corporate-inquiries" className="link-underline text-[12px] tracking-[0.22em] uppercase mt-6 inline-block">Request bulk quote →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

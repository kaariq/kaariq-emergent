import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero, Breadcrumb, GarmentCard } from '@/components/PageBits';
import { IMAGES, NAV } from '@/mock/mock';

const womensItems = [
  { title: 'Hand-embroidered Blouse', img: IMAGES.women, price: 'from ₹4,500', badge: 'Bespoke' },
  { title: 'Anarkali Suit', img: IMAGES.embroidery, price: 'from ₹18,000', badge: 'Heavy work' },
  { title: 'Lehenga Choli', img: IMAGES.wedding, price: 'from ₹48,000', badge: 'Bridal' },
  { title: 'Modern Kurta Set', img: IMAGES.casual, price: 'from ₹6,800' },
  { title: 'Salwar & Bottoms', img: IMAGES.fabric, price: 'from ₹1,800' },
  { title: 'Festive Anarkali', img: IMAGES.festive, price: 'from ₹14,000', badge: 'New' },
];
const mensItems = [
  { title: 'Bespoke Suit', img: IMAGES.men, price: 'from ₹28,000', badge: 'Premium' },
  { title: 'Wedding Sherwani', img: IMAGES.wedding, price: 'from ₹32,000', badge: 'Bridal' },
  { title: 'Kurta Pyjama', img: IMAGES.consultation, price: 'from ₹4,200' },
  { title: 'Tailored Blazer', img: IMAGES.boutique, price: 'from ₹18,000' },
  { title: 'Linen Trousers', img: IMAGES.fabric, price: 'from ₹4,400' },
  { title: 'Embroidered Waistcoat', img: IMAGES.embroidery, price: 'from ₹6,500' },
];

const sub = NAV[0].columns;

export default function Tailoring() {
  const { slug } = useParams();
  const items = slug && /sherwani|suit|kurta-pyjama|men|trousers|waistcoat/i.test(slug) ? mensItems : womensItems;
  const heading = slug ? slug.replace(/-/g, ' ').replace(/\band\b/g, '&') : 'Bespoke Tailoring';
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Tailoring', to:'/tailoring'},{label:heading}]}/>
      <PageHero tag="TAILORING" title={<span className="capitalize">{heading}<span className="italic"> by Kaariq</span></span>} subtitle="Hand-cut, machine and hand-stitched in our Mumbai atelier. From measurement to delivery, every step is yours to direct." image={IMAGES.craft}/>

      {/* Sub-categories pills */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        <div className="flex flex-wrap gap-2">
          {sub.flatMap(c => c.items).map(it => {
            const s = it.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
            const active = s === slug;
            return (
              <Link key={it} to={`/tailoring/${s}`} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${active ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{it}</Link>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((g, i) => <GarmentCard key={i} {...g}/>)}
        </div>
      </section>

      {/* CTA bar */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-20">
        <div className="bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] p-10 lg:p-14 grid lg:grid-cols-3 gap-8 items-center">
          <h3 className="font-serif-display text-3xl lg:text-4xl lg:col-span-2">Don't see what you have in mind? <span className="italic">We can craft it.</span></h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/booking/book-appointment" className="inline-block bg-[hsl(0,0%,100%)] text-[hsl(85,13%,19%)] px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors">Book Appointment</Link>
            <Link to="/contact/whatsapp-support" className="inline-block border border-white/40 px-6 py-3 text-[12px] tracking-[0.22em] uppercase hover:bg-white hover:text-[hsl(85,13%,19%)] transition-colors">WhatsApp Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero, Breadcrumb, GarmentCard } from '@/components/PageBits';
import { IMAGES, COLLECTIONS, NAV } from '@/mock/mock';

const items = [
  { title: 'Ivory Silk Lehenga', img: IMAGES.wedding, price: '₹1,25,000', badge: 'Wedding' },
  { title: 'Emerald Anarkali', img: IMAGES.festive, price: '₹22,000', badge: 'Festive' },
  { title: 'Linen Co-ord Set', img: IMAGES.casual, price: '₹8,500', badge: 'New In' },
  { title: 'Hand-zardozi Blouse', img: IMAGES.embroidery, price: '₹6,200' },
  { title: 'Atelier Saree', img: IMAGES.women, price: '₹18,000' },
  { title: 'Indo-Western Suit', img: IMAGES.men, price: '₹32,000', badge: 'Best Seller' },
  { title: 'Festive Sherwani', img: IMAGES.boutique, price: '₹34,000' },
  { title: 'Editorial Lookbook', img: IMAGES.lookbook, price: 'View edit', badge: 'Lookbook' },
];

export default function Collections() {
  const { slug } = useParams();
  const heading = slug ? slug.replace(/-/g,' ') : 'Collections';
  const sub = NAV[1].columns;
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Collections', to:'/collections'},{label:heading}]}/>
      <PageHero tag="COLLECTIONS" title={<span className="capitalize">{heading}</span>} subtitle="Curated edits across occasions, styles, and seasons — ready to be made yours." image={IMAGES.lookbook}/>

      {/* Featured collection mosaic */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {sub.flatMap(c => c.items).map(it => {
            const s = it.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
            const active = s === slug;
            return (
              <Link key={it} to={`/collections/${s}`} className={`text-[11px] tracking-[0.22em] uppercase px-4 py-2 border transition-colors ${active ? 'bg-[hsl(85,13%,19%)] text-[hsl(0,0%,100%)] border-[hsl(85,13%,19%)]' : 'border-[hsl(33,11%,80%)] hover:border-[hsl(85,13%,19%)]'}`}>{it}</Link>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-16">
          {COLLECTIONS.map((c, i) => (
            <Link to={`/collections/${c.tag.toLowerCase().replace(/\s+/g,'-')}`} key={c.title} className={`group relative overflow-hidden bg-[hsl(33,11%,88%)] block ${i%2===0 ? 'lg:col-span-7 aspect-[4/3]' : 'lg:col-span-5 aspect-[4/3]'}`}>
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"/>
              <div className="absolute left-6 bottom-6 lg:left-8 lg:bottom-8 text-[hsl(0,0%,100%)] max-w-md">
                <div className="edit-num opacity-90">{c.tag}</div>
                <h3 className="font-serif-display text-3xl mt-1">{c.title}</h3>
                <p className="text-sm opacity-90 mt-1 hidden lg:block">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((g, i) => <GarmentCard key={i} {...g}/>)}
        </div>
      </section>
    </main>
  );
}

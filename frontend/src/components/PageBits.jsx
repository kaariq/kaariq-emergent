import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function PageHero({ tag, title, subtitle, image }) {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 lg:pt-16">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="edit-num text-[hsl(85,13%,32%)]">—  {tag}</div>
            <h1 className="font-serif-display text-5xl lg:text-7xl mt-4 leading-[1.02] text-[hsl(85,13%,19%)]">{title}</h1>
            {subtitle && <p className="text-[15px] text-[hsl(85,13%,32%)] mt-5 max-w-xl leading-relaxed">{subtitle}</p>}
          </div>
          {image && (
            <div className="lg:col-span-5">
              <div className="aspect-[5/4] overflow-hidden bg-[hsl(33,11%,88%)]">
                <img src={image} alt="" className="w-full h-full object-cover"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,32%)]">
      {items.map((it, i) => (
        <span key={i}>
          {it.to ? <Link to={it.to} className="hover:text-[hsl(85,13%,19%)]">{it.label}</Link> : <span className="text-[hsl(85,13%,19%)]">{it.label}</span>}
          {i < items.length - 1 && <span className="mx-2 opacity-50">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function GarmentCard({ title, image, price, badge, to='/tailoring' }) {
  return (
    <Link to={to} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[hsl(33,11%,88%)]">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"/>
        {badge && <span className="absolute top-3 left-3 bg-[hsl(0,0%,100%)] px-2 py-1 text-[10px] tracking-[0.22em] uppercase">{badge}</span>}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"/>
      </div>
      <div className="flex items-start justify-between gap-2 mt-3">
        <h3 className="font-serif-display text-lg text-[hsl(85,13%,19%)]">{title}</h3>
        <ArrowUpRight className="w-4 h-4 text-[hsl(85,13%,19%)] mt-1 opacity-60 group-hover:opacity-100"/>
      </div>
      {price && <div className="text-[12px] tracking-[0.18em] uppercase text-[hsl(85,13%,32%)] mt-0.5">{price}</div>}
    </Link>
  );
}

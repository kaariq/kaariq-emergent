import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero, Breadcrumb } from '@/components/PageBits';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING, IMAGES } from '@/mock/mock';

export default function Pricing() {
  return (
    <main className="pb-20">
      <Breadcrumb items={[{label:'Home', to:'/'},{label:'Pricing'}]}/>
      <PageHero tag="TRANSPARENT PRICING" title={<>Honest rates, <span className="italic">no surprises</span>.</>} subtitle="All prices include design consultation, 14-point measurement, two rounds of fittings, and packaging." image={IMAGES.fabric}/>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 mt-14">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {PRICING.map((p) => (
            <div key={p.plan} className={`p-8 lg:p-10 border ${p.featured ? 'bg-[hsl(351,33%,18%)] text-[hsl(30,22%,95%)] border-[hsl(351,33%,18%)]' : 'bg-[hsl(30,18%,92%)] border-[hsl(28,11%,70%)]'}`}>
              <div className={`edit-num ${p.featured ? 'opacity-80' : 'text-[hsl(351,20%,28%)]'}`}>{p.featured ? 'MOST CHOSEN' : '—'}</div>
              <h3 className="font-serif-display text-3xl mt-2">{p.plan}</h3>
              <p className={`text-sm mt-2 ${p.featured ? 'opacity-80' : 'text-[hsl(351,20%,28%)]'}`}>{p.headline}</p>
              <ul className="mt-6 divide-y divide-current/10">
                {p.items.map(([n, v]) => (
                  <li key={n} className="flex justify-between py-3 text-sm">
                    <span className="flex items-center gap-2"><Check className={`w-4 h-4 ${p.featured ? 'text-[hsl(28,11%,55%)]' : 'text-[hsl(351,33%,30%)]'}`}/>{n}</span>
                    <span className="font-serif-display text-base">{v}</span>
                  </li>
                ))}
              </ul>
              <Link to="/booking/book-appointment" className={`inline-flex items-center gap-2 mt-8 px-5 py-3 text-[12px] tracking-[0.22em] uppercase transition-colors ${p.featured ? 'bg-[hsl(30,22%,95%)] text-[hsl(351,33%,18%)] hover:bg-[hsl(28,11%,55%)]' : 'bg-[hsl(351,33%,18%)] text-[hsl(30,22%,95%)] hover:bg-[hsl(351,33%,30%)]'}`}>Get a quote <ArrowRight className="w-4 h-4"/></Link>
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="p-8 lg:p-10 bg-[hsl(30,18%,92%)] border border-[hsl(28,11%,70%)]">
            <div className="edit-num text-[hsl(351,20%,28%)]">—  BULK ORDERS</div>
            <h3 className="font-serif-display text-3xl mt-2">Corporate & wedding parties</h3>
            <p className="text-sm text-[hsl(351,20%,28%)] mt-2">10+ pieces unlock priority production, dedicated stylist, and up to 18% off published rates.</p>
            <Link to="/contact/corporate-inquiries" className="link-underline text-[12px] tracking-[0.22em] uppercase mt-6 inline-block">Request bulk quote →</Link>
          </div>
          <div className="p-8 lg:p-10 bg-[hsl(30,18%,92%)] border border-[hsl(28,11%,70%)]">
            <div className="edit-num text-[hsl(351,20%,28%)]">—  ALWAYS INCLUDED</div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {['Design consultation','14-point measurement','Two fittings','Premium packaging','Lifetime alterations*','Worldwide shipping*'].map(x => (
                <li key={x} className="flex items-center gap-2"><Check className="w-4 h-4 text-[hsl(351,33%,30%)]"/>{x}</li>
              ))}
            </ul>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[hsl(351,20%,28%)] mt-4">*on premium bespoke orders</p>
          </div>
        </div>
      </section>
    </main>
  );
}

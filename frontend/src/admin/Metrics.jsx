import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from './AdminContext';

export default function Metrics() {
  const { s } = useAdmin();
  // Category counts from events + orders
  const catCounts = {};
  s.events.forEach((e) => { if (e.category) catCounts[e.category] = (catCounts[e.category] || 0) + 1; });
  const orderCatCounts = {};
  s.orders.forEach((o) => { orderCatCounts[o.category] = (orderCatCounts[o.category] || 0) + 1; });

  const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
  const maxView = Math.max(...sortedCats.map(([, n]) => n), 1);
  const sortedOrderCats = Object.entries(orderCatCounts).sort((a, b) => b[1] - a[1]);
  const maxOrd = Math.max(...sortedOrderCats.map(([, n]) => n), 1);

  // Funnel
  const funnel = ['view_category', 'view_design', 'start_journey', 'place_order'];
  const funnelCounts = funnel.map((t) => s.events.filter((e) => e.type === t).length);
  const funnelMax = funnelCounts[0] || 1;

  // Conversion rate
  const conv = funnelCounts[3] && funnelCounts[0] ? ((funnelCounts[3] / funnelCounts[0]) * 100).toFixed(1) : '0';

  // Lead source breakdown
  const leadSources = {};
  s.leads.forEach((l) => leadSources[l.source] = (leadSources[l.source] || 0) + 1);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Metrics</h1>
        <p className="text-sm text-neutral-500">Real-time, event-driven product analytics. Last 30 days.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi label="Total events" value={s.events.length} hint="30 days"/>
        <Kpi label="Conversion" value={`${conv}%`} hint="view → order"/>
        <Kpi label="Total orders" value={s.orders.length} hint="all-time"/>
        <Kpi label="Open leads" value={s.leads.filter((l) => !['lost','customer'].includes(l.status)).length} hint="in pipeline"/>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category views */}
        <Card title="Most-viewed categories" subtitle="From product page events">
          <ul className="space-y-3">
            {sortedCats.map(([cat, n], i) => (
              <li key={cat}>
                <div className="flex justify-between text-[12px] mb-1"><span className="capitalize font-medium">{cat}</span><span className="text-neutral-500">{n}</span></div>
                <div className="h-2 bg-neutral-100"><motion.div initial={{ width: 0 }} animate={{ width: `${(n / maxView) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05 }} className="h-full bg-[hsl(85,13%,19%)]"/></div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Order categories */}
        <Card title="Most-ordered categories" subtitle="From placed orders">
          <ul className="space-y-3">
            {sortedOrderCats.map(([cat, n], i) => (
              <li key={cat}>
                <div className="flex justify-between text-[12px] mb-1"><span className="capitalize font-medium">{cat}</span><span className="text-neutral-500">{n}</span></div>
                <div className="h-2 bg-neutral-100"><motion.div initial={{ width: 0 }} animate={{ width: `${(n / maxOrd) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05 }} className="h-full bg-[hsl(64,30%,36%)]"/></div>
              </li>
            ))}
            {!sortedOrderCats.length && <li className="text-[11px] text-neutral-400">No orders yet.</li>}
          </ul>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Funnel */}
        <Card title="Conversion funnel" subtitle="View → design → journey → order">
          <ul className="space-y-3">
            {funnel.map((t, i) => (
              <li key={t}>
                <div className="flex justify-between text-[12px] mb-1"><span className="capitalize">{t.replace(/_/g, ' ')}</span><span className="text-neutral-500">{funnelCounts[i]}</span></div>
                <div className="h-3 bg-neutral-100"><motion.div initial={{ width: 0 }} animate={{ width: `${(funnelCounts[i] / funnelMax) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full" style={{ background: `hsl(85,13%,${19 + i*10}%)` }}/></div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Lead sources */}
        <Card title="Lead sources" subtitle="Where inquiries come from">
          <ul className="space-y-3">
            {Object.entries(leadSources).map(([src, n], i) => (
              <li key={src} className="flex items-center gap-3">
                <div className="w-24 text-[12px] font-medium">{src}</div>
                <div className="flex-1 h-2 bg-neutral-100"><motion.div initial={{ width: 0 }} animate={{ width: `${(n / s.leads.length) * 100}%` }} transition={{ duration: 0.7, delay: i * 0.05 }} className="h-full bg-[hsl(64,30%,36%)]"/></div>
                <span className="text-[12px] text-neutral-500 w-8 text-right">{n}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

const Kpi = ({ label, value, hint }) => (
  <motion.div whileHover={{ y: -2 }} className="bg-white border border-neutral-200 p-5">
    <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">{label}</div>
    <div className="font-serif-display text-3xl mt-2">{value}</div>
    <div className="text-[11px] text-neutral-500 mt-1">{hint}</div>
  </motion.div>
);
const Card = ({ title, subtitle, children }) => (
  <div className="bg-white border border-neutral-200">
    <div className="px-5 py-4 border-b border-neutral-100">
      <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">{subtitle}</div>
      <h2 className="font-serif-display text-xl mt-0.5">{title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

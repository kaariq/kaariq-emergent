import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from './AdminContext';
import { TrendingUp, ShoppingBag, Users as UsersIcon, AlertCircle, IndianRupee, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { s, activeUser, ROLES, ORDER_STAGES } = useAdmin();
  const role = activeUser.role;

  // Action items per role
  const myStages = ORDER_STAGES.filter((st) => st.owner === role).map((s) => s.id);
  const myOrders = s.orders.filter((o) => myStages.includes(o.stage) && (o.assignedTo === activeUser.id || !o.assignedTo));
  const newLeads = s.leads.filter((l) => l.status === 'new' || l.status === 'undecided');
  const totalRevenue = s.orders.filter((o) => o.stage === 'done').reduce((t, o) => t + o.price, 0);
  const inProduction = s.orders.filter((o) => !['new','done'].includes(o.stage)).length;

  // 7-day revenue series (mock from history)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const day = d.toDateString();
    const total = s.orders.filter((o) => new Date(o.createdAt).toDateString() === day).reduce((t, o) => t + o.price, 0);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), value: total };
  });
  const maxRev = Math.max(...days.map((d) => d.value), 1);

  // Reviews mock
  const reviews = [{ stars: 5, count: 142 }, { stars: 4, count: 38 }, { stars: 3, count: 6 }, { stars: 2, count: 2 }, { stars: 1, count: 1 }];
  const totalReviews = reviews.reduce((t, r) => t + r.count, 0);
  const avg = (reviews.reduce((t, r) => t + r.stars * r.count, 0) / totalReviews).toFixed(2);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Welcome back, {activeUser.name.split(' ')[0]}.</h1>
        <p className="text-sm text-neutral-500">Here’s what needs your attention today.</p>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={ShoppingBag} label="Active orders" value={inProduction} hint="in production"/>
        <Kpi icon={IndianRupee} label="Lifetime revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} hint="delivered"/>
        <Kpi icon={UsersIcon} label="Open leads" value={newLeads.length} hint="need follow-up"/>
        <Kpi icon={TrendingUp} label="Avg rating" value={avg} hint={`${totalReviews} reviews`}/>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Action items (role specific) */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="lg:col-span-2 bg-white border border-neutral-200">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">Action items</div>
              <h2 className="font-serif-display text-xl mt-0.5">For {ROLES[role].label}</h2>
            </div>
            <Link to="orders" className="text-[11px] tracking-[0.22em] uppercase link-underline">All orders</Link>
          </div>
          {!myOrders.length && <div className="p-8 text-center text-sm text-neutral-500">All clear — no items in your queue.</div>}
          <ul>
            {myOrders.slice(0, 6).map((o) => (
              <li key={o.id} className="px-5 py-4 border-b border-neutral-100 last:border-0 grid grid-cols-12 gap-3 items-center hover:bg-neutral-50 transition-colors">
                <div className="col-span-2 text-[11px] tracking-[0.22em] uppercase text-[hsl(64,30%,36%)]">{o.id}</div>
                <div className="col-span-5">
                  <div className="font-medium text-neutral-900">{o.title}</div>
                  <div className="text-[11px] text-neutral-500">{o.customer} · {o.phone}</div>
                </div>
                <div className="col-span-3"><Stage stage={o.stage}/></div>
                <div className="col-span-2 text-right"><Link to="orders" className="text-[11px] tracking-[0.22em] uppercase text-[hsl(85,13%,19%)] link-underline">Open <ArrowRight className="w-3 h-3 inline"/></Link></div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Leads */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-white border border-neutral-200">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">Hot leads</div>
              <h2 className="font-serif-display text-xl mt-0.5">Recent inquiries</h2>
            </div>
            <Link to="leads" className="text-[11px] tracking-[0.22em] uppercase link-underline">All</Link>
          </div>
          <ul>
            {newLeads.slice(0, 5).map((l) => (
              <li key={l.id} className="px-5 py-3 border-b border-neutral-100 last:border-0 flex items-center gap-3 hover:bg-neutral-50">
                <span className="w-1.5 h-10 rounded-full bg-[hsl(64,30%,36%)] flex-shrink-0"/>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{l.name}</div>
                  <div className="text-[11px] text-neutral-500 truncate">{l.source} · {l.notes}</div>
                </div>
              </li>
            ))}
            {!newLeads.length && <li className="px-5 py-6 text-sm text-neutral-500 text-center">No open leads.</li>}
          </ul>
        </motion.section>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="lg:col-span-2 bg-white border border-neutral-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">7-day order value</div>
              <h2 className="font-serif-display text-xl mt-0.5">Revenue trend</h2>
            </div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/>Updated live</span>
          </div>
          <div className="flex items-end gap-3 mt-6 h-48">
            {days.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / maxRev) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} className="w-full bg-gradient-to-t from-[hsl(85,13%,19%)] to-[hsl(64,30%,36%)] min-h-[2px]"/>
                <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-500">{d.day}</span>
                <span className="text-[10px] text-neutral-400">{d.value > 0 ? `₹${(d.value/1000).toFixed(0)}k` : '—'}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white border border-neutral-200 p-5">
          <div className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">Customer satisfaction</div>
          <h2 className="font-serif-display text-xl mt-0.5">Reviews</h2>
          <div className="flex items-baseline gap-2 mt-3"><span className="font-serif-display text-4xl text-[hsl(85,13%,19%)]">{avg}</span><span className="text-sm text-neutral-500">/ 5.0</span></div>
          <div className="text-[11px] text-neutral-500 mb-3">{totalReviews} reviews</div>
          {reviews.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 my-1.5">
              <span className="text-[11px] w-6">{r.stars}★</span>
              <div className="flex-1 h-1.5 bg-neutral-100 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(r.count / totalReviews) * 100}%` }} transition={{ duration: 0.7 }} className="h-full bg-[hsl(64,30%,36%)]"/></div>
              <span className="text-[11px] text-neutral-500 w-8 text-right">{r.count}</span>
            </div>
          ))}
        </motion.section>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, hint }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white border border-neutral-200 p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.22em] uppercase text-neutral-500">{label}</span>
        <Icon className="w-4 h-4 text-[hsl(64,30%,36%)]"/>
      </div>
      <div className="font-serif-display text-3xl mt-3 text-[hsl(85,13%,19%)]">{value}</div>
      <div className="text-[11px] text-neutral-500 mt-1">{hint}</div>
    </motion.div>
  );
}

function Stage({ stage }) {
  const colors = { new: 'bg-neutral-200 text-neutral-700', consult: 'bg-amber-100 text-amber-800', pickup: 'bg-blue-100 text-blue-800', cutting: 'bg-orange-100 text-orange-800', stitching: 'bg-violet-100 text-violet-800', qc: 'bg-cyan-100 text-cyan-800', fitting: 'bg-pink-100 text-pink-800', delivery: 'bg-indigo-100 text-indigo-800', done: 'bg-green-100 text-green-800' };
  return <span className={`inline-block px-2 py-1 text-[10px] tracking-[0.22em] uppercase ${colors[stage] || 'bg-neutral-100'}`}>{stage}</span>;
}

import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ListOrdered, Users, BarChart3, MessageSquare, Settings, ChevronDown } from 'lucide-react';
import { AdminProvider, useAdmin } from './AdminContext';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Leads from './Leads';
import Metrics from './Metrics';
import AdminUsers from './Users';

const nav = [
  { to: '', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: 'orders', label: 'Orders', icon: ListOrdered },
  { to: 'leads', label: 'Leads & Appointments', icon: MessageSquare },
  { to: 'metrics', label: 'Metrics', icon: BarChart3 },
  { to: 'users', label: 'Users', icon: Users },
];

export default function AdminApp() {
  return (
    <AdminProvider>
      <Shell>
        <Routes>
          <Route index element={<Dashboard/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="leads" element={<Leads/>} />
          <Route path="metrics" element={<Metrics/>} />
          <Route path="users" element={<AdminUsers/>} />
          <Route path="*" element={<Navigate to="." replace/>} />
        </Routes>
      </Shell>
    </AdminProvider>
  );
}

function Shell({ children }) {
  const { s, ROLES, activeUser, switchUser } = useAdmin();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[hsl(85,13%,19%)] text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="font-italiana text-2xl tracking-[0.3em]">KAARIQ</div>
          <div className="text-[10px] tracking-[0.28em] uppercase opacity-70 mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 py-4">
          {nav.map((n) => (
            <NavLink key={n.label} to={n.to} end={n.end} className={({isActive}) => `flex items-center gap-3 px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition-colors ${isActive ? 'bg-white/10 text-white border-l-2 border-[hsl(64,30%,46%)]' : 'text-white/70 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}>
              <n.icon className="w-4 h-4"/>{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 text-[10px] tracking-[0.22em] uppercase opacity-70">v1.0 · mock data</div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-serif-display text-xl text-[hsl(85,13%,19%)]">Provider Console</div>
            <span className="hidden sm:inline text-[10px] tracking-[0.22em] uppercase bg-[hsl(64,30%,36%)] text-white px-2 py-0.5">{ROLES[s.activeRole]?.label}</span>
          </div>
          {/* Role / user switcher */}
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-3 px-3 py-2 border border-neutral-200 hover:border-neutral-400 transition-colors">
              <span className="w-8 h-8 rounded-full bg-[hsl(85,13%,19%)] text-white flex items-center justify-center text-[11px] font-medium">{activeUser?.avatar}</span>
              <span className="text-left hidden sm:block">
                <span className="block text-[12px] font-medium text-neutral-900">{activeUser?.name}</span>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-neutral-500">{ROLES[activeUser?.role]?.label}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-500"/>
            </button>
            {open && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 top-full mt-2 w-72 bg-white border border-neutral-200 shadow-lg z-50 max-h-[480px] overflow-y-auto">
                <div className="px-4 py-3 text-[10px] tracking-[0.22em] uppercase text-neutral-500 border-b">Switch user / role</div>
                {s.users.map((u) => (
                  <button key={u.id} onClick={() => { switchUser(u.id); setOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors text-left ${u.id === activeUser?.id ? 'bg-neutral-50' : ''}`}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] text-white font-medium" style={{ background: ROLES[u.role]?.color }}>{u.avatar}</span>
                    <span className="flex-1"><span className="block text-[13px] font-medium">{u.name}</span><span className="block text-[10px] tracking-[0.18em] uppercase text-neutral-500">{ROLES[u.role]?.label}</span></span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

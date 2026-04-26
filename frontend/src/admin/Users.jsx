import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from './AdminContext';
import { Plus, Edit3, Trash2, X } from 'lucide-react';

export default function AdminUsers() {
  const { s, ROLES, upsertUser, removeUser } = useAdmin();
  const [edit, setEdit] = useState(null);
  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif-display text-3xl text-[hsl(85,13%,19%)]">Users</h1>
          <p className="text-sm text-neutral-500">Manage tailors, masters, advisors, and delivery staff.</p>
        </div>
        <button onClick={() => setEdit({})} className="inline-flex items-center gap-2 bg-[hsl(85,13%,19%)] text-white px-4 py-2 text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(64,30%,36%)] transition-colors"><Plus className="w-4 h-4"/>Add user</button>
      </header>

      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-[10px] tracking-[0.22em] uppercase text-neutral-500">
            <tr>{['User', 'Role', 'Phone', 'Email', 'Joined', 'Status', ''].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {s.users.map((u) => (
              <tr key={u.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3 flex items-center gap-3"><span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-medium" style={{ background: ROLES[u.role]?.color }}>{u.avatar}</span>{u.name}</td>
                <td className="px-4 py-3 text-[12px] tracking-[0.18em] uppercase">{ROLES[u.role]?.label}</td>
                <td className="px-4 py-3 text-[12px] text-neutral-600">{u.phone}</td>
                <td className="px-4 py-3 text-[12px] text-neutral-600">{u.email}</td>
                <td className="px-4 py-3 text-[11px] text-neutral-500">{new Date(u.joined).toLocaleDateString()}</td>
                <td className="px-4 py-3"><span className={`text-[10px] tracking-[0.22em] uppercase px-2 py-0.5 ${u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>{u.active ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEdit(u)} className="p-1.5 hover:bg-neutral-100"><Edit3 className="w-4 h-4"/></button>
                  <button onClick={() => window.confirm('Delete user?') && removeUser(u.id)} className="p-1.5 hover:bg-red-50 text-red-700 ml-1"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>{edit !== null && <UserEditor user={edit} onClose={() => setEdit(null)} onSave={(u) => { upsertUser(u); setEdit(null); }}/>}</AnimatePresence>
    </div>
  );
}

function UserEditor({ user, onClose, onSave }) {
  const { ROLES } = useAdmin();
  const [f, setF] = useState({ name: '', phone: '', email: '', role: 'tailor', avatar: 'NN', active: true, ...user });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-display text-2xl">{user.id ? 'Edit user' : 'Add user'}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-neutral-100"><X className="w-4 h-4"/></button>
        </div>
        <div className="space-y-3">
          <input value={f.name} onChange={(e) => setF({...f, name:e.target.value, avatar: e.target.value.split(' ').map((x) => x[0]).join('').slice(0,2).toUpperCase()})} placeholder="Full name" className="w-full border border-neutral-200 p-3 text-sm"/>
          <input value={f.phone} onChange={(e) => setF({...f, phone:e.target.value})} placeholder="Phone" className="w-full border border-neutral-200 p-3 text-sm"/>
          <input value={f.email} onChange={(e) => setF({...f, email:e.target.value})} placeholder="Email" className="w-full border border-neutral-200 p-3 text-sm"/>
          <select value={f.role} onChange={(e) => setF({...f, role:e.target.value})} className="w-full border border-neutral-200 p-3 text-sm">
            {Object.values(ROLES).map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.active} onChange={(e) => setF({...f, active:e.target.checked})}/>Active</label>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-neutral-200 py-2.5 text-[11px] tracking-[0.22em] uppercase">Cancel</button>
          <button onClick={() => onSave(f)} disabled={!f.name} className="flex-1 bg-[hsl(85,13%,19%)] text-white py-2.5 text-[11px] tracking-[0.22em] uppercase disabled:opacity-50">Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadAdmin, saveAdmin, ROLES, ORDER_STAGES, uid } from './store';

const Ctx = createContext(null);

export function AdminProvider({ children }) {
  const [s, setS] = useState(() => loadAdmin());
  useEffect(() => { saveAdmin(s); }, [s]);

  // Role / user switching
  const switchRole = (role) => setS((p) => {
    const user = p.users.find((u) => u.role === role) || p.users[0];
    return { ...p, activeRole: role, activeUserId: user.id };
  });
  const switchUser = (id) => setS((p) => {
    const u = p.users.find((x) => x.id === id);
    return { ...p, activeUserId: id, activeRole: u?.role || p.activeRole };
  });

  // Orders
  const moveStage = (orderId, stage, byUserId) => setS((p) => ({
    ...p,
    orders: p.orders.map((o) => o.id !== orderId ? o : ({
      ...o,
      stage,
      assignedTo: byUserId || o.assignedTo,
      history: [...(o.history || []), { stage, by: byUserId || null, at: new Date().toISOString() }],
    })),
  }));
  const assignOrder = (orderId, userId) => setS((p) => ({
    ...p,
    orders: p.orders.map((o) => o.id === orderId ? { ...o, assignedTo: userId } : o),
  }));
  const punchIn = (orderId, userId) => setS((p) => ({
    ...p,
    orders: p.orders.map((o) => o.id !== orderId ? o : ({
      ...o,
      punches: [...(o.punches || []), { id: uid('pn'), userId, in: new Date().toISOString(), out: null }],
    })),
  }));
  const punchOut = (orderId, punchId) => setS((p) => ({
    ...p,
    orders: p.orders.map((o) => o.id !== orderId ? o : ({
      ...o,
      punches: (o.punches || []).map((pn) => pn.id === punchId ? { ...pn, out: new Date().toISOString() } : pn),
    })),
  }));
  const addOrderNote = (orderId, text, byUserId) => setS((p) => ({
    ...p,
    orders: p.orders.map((o) => o.id !== orderId ? o : ({ ...o, notes: [...(o.notes || []), { id: uid('n'), text, by: byUserId, at: new Date().toISOString() }] })),
  }));

  // Leads
  const setLeadStatus = (leadId, status) => setS((p) => ({
    ...p,
    leads: p.leads.map((l) => l.id !== leadId ? l : ({
      ...l, status, history: [...(l.history || []), { status, at: new Date().toISOString() }],
    })),
  }));
  const addLeadNote = (leadId, text) => setS((p) => ({
    ...p,
    leads: p.leads.map((l) => l.id !== leadId ? l : ({ ...l, notesText: text })),
  }));
  const addLead = (lead) => setS((p) => ({ ...p, leads: [{ id: uid('l'), createdAt: new Date().toISOString(), history: [{ status: lead.status || 'new', at: new Date().toISOString() }], ...lead }, ...p.leads] }));

  // Users
  const upsertUser = (u) => setS((p) => {
    const id = u.id || uid('u');
    const exists = p.users.some((x) => x.id === id);
    return { ...p, users: exists ? p.users.map((x) => x.id === id ? { ...x, ...u } : x) : [...p.users, { active: true, joined: new Date().toISOString(), ...u, id }] };
  });
  const removeUser = (id) => setS((p) => ({ ...p, users: p.users.filter((u) => u.id !== id) }));

  const activeUser = s.users.find((u) => u.id === s.activeUserId) || s.users[0];

  return <Ctx.Provider value={{ s, ROLES, ORDER_STAGES, activeUser, switchRole, switchUser, moveStage, assignOrder, punchIn, punchOut, addOrderNote, setLeadStatus, addLeadNote, addLead, upsertUser, removeUser }}>{children}</Ctx.Provider>;
}
export const useAdmin = () => useContext(Ctx);

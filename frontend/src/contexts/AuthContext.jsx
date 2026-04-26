import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loadState, saveState, uid } from '@/lib/storage';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => loadState());

  useEffect(() => { saveState(state); }, [state]);

  // ---------- AUTH ----------
  const register = ({ name, email, phone, password }) => {
    if (!name || !email || !password) return { ok: false, error: 'Please fill all fields' };
    const user = { id: uid('u'), name, email, phone: phone || '', password, createdAt: Date.now() };
    setState((s) => ({ ...s, auth: user }));
    return { ok: true };
  };
  const login = ({ email, password }) => {
    // For mock: anyone with email + password (>=4 chars) signs in. If account exists, validate.
    const existing = state.auth;
    if (existing && existing.email === email) {
      if (existing.password && existing.password !== password) return { ok: false, error: 'Wrong password' };
      return { ok: true };
    }
    if (!email || !password || password.length < 4) return { ok: false, error: 'Enter email and a 4+ char password' };
    const user = { id: uid('u'), name: email.split('@')[0], email, phone: '', password, createdAt: Date.now() };
    setState((s) => ({ ...s, auth: user }));
    return { ok: true };
  };
  const logout = () => setState((s) => ({ ...s, auth: null }));

  // ---------- PEOPLE & MEASUREMENTS ----------
  const upsertPerson = useCallback((person) => {
    setState((s) => {
      const id = person.id || uid('p');
      const exists = s.people.some((p) => p.id === id);
      const next = exists ? s.people.map((p) => (p.id === id ? { ...p, ...person, id } : p)) : [...s.people, { measurements: {}, ...person, id }];
      return { ...s, people: next };
    });
  }, []);
  const removePerson = (id) => setState((s) => ({ ...s, people: s.people.filter((p) => p.id !== id) }));
  const setMeasurements = (personId, category, values) => setState((s) => ({
    ...s,
    people: s.people.map((p) => p.id === personId ? { ...p, measurements: { ...(p.measurements || {}), [category]: values } } : p),
  }));

  // ---------- ADDRESSES ----------
  const upsertAddress = (address) => setState((s) => {
    const id = address.id || uid('a');
    const exists = s.addresses.some((a) => a.id === id);
    let next = exists ? s.addresses.map((a) => (a.id === id ? { ...a, ...address, id } : a)) : [...s.addresses, { ...address, id }];
    if (address.isDefault) next = next.map((a) => ({ ...a, isDefault: a.id === id }));
    if (!next.some((a) => a.isDefault) && next.length) next[0].isDefault = true;
    return { ...s, addresses: next };
  });
  const removeAddress = (id) => setState((s) => ({ ...s, addresses: s.addresses.filter((a) => a.id !== id) }));

  // ---------- APPOINTMENTS ----------
  const addAppointment = (a) => setState((s) => ({ ...s, appointments: [{ id: uid('apt'), status: 'Pending', createdAt: Date.now(), ...a }, ...s.appointments] }));
  const cancelAppointment = (id) => setState((s) => ({ ...s, appointments: s.appointments.map((a) => a.id === id ? { ...a, status: 'Cancelled' } : a) }));

  // ---------- ORDERS ----------
  const addOrder = (o) => {
    const order = { id: uid('o'), status: 'In Production', createdAt: Date.now(), ...o };
    setState((s) => ({ ...s, orders: [order, ...s.orders] }));
    return order;
  };
  const updateOrder = (id, patch) => setState((s) => ({ ...s, orders: s.orders.map((o) => o.id === id ? { ...o, ...patch } : o) }));

  // ---------- DRAFT ORDER (wizard) ----------
  const setOrderDraft = (draft) => setState((s) => ({ ...s, drafts: { ...s.drafts, order: draft } }));
  const clearOrderDraft = () => setState((s) => ({ ...s, drafts: { ...s.drafts, order: null } }));

  const value = {
    state,
    user: state.auth,
    isAuthed: !!state.auth,
    register, login, logout,
    upsertPerson, removePerson, setMeasurements,
    upsertAddress, removeAddress,
    addAppointment, cancelAppointment,
    addOrder, updateOrder,
    setOrderDraft, clearOrderDraft,
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

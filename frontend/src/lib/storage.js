// Tiny localStorage helper for the Kaariq frontend-only app
const KEY = 'kaariq_app_v1';

const defaultState = () => ({
  auth: null,                 // { id, name, email, phone, createdAt }
  people: [],                 // [{ id, name, phone, relation, measurements: { [category]: { ...fields } } }]
  addresses: [],              // [{ id, label, name, phone, line1, line2, city, state, pin, isDefault }]
  appointments: [],           // [{ id, mode, date, time, name, phone, notes, status, createdAt }]
  orders: [],                 // [{ id, category, design, customizations, addons, personId, measurements, price, status, createdAt }]
  drafts: { order: null },    // in-progress wizard
});

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

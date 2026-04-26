// Admin localStorage store with seed data
const KEY = 'kaariq_admin_v1';

export const ROLES = {
  admin:    { id: 'admin',    label: 'Admin',    color: '#32382b' },
  master:   { id: 'master',   label: 'Master Cutter', color: '#727941' },
  tailor:   { id: 'tailor',   label: 'Tailor',   color: '#5a6b3a' },
  advisor:  { id: 'advisor',  label: 'Advisor',  color: '#8b5a3c' },
  delivery: { id: 'delivery', label: 'Pickup & Delivery', color: '#3a5a6b' },
};

export const ORDER_STAGES = [
  { id: 'new',       label: 'New',          owner: 'advisor'  },
  { id: 'consult',   label: 'Consultation', owner: 'advisor'  },
  { id: 'pickup',    label: 'Fabric Pickup',owner: 'delivery' },
  { id: 'cutting',   label: 'Cutting',      owner: 'master'   },
  { id: 'stitching', label: 'Stitching',    owner: 'tailor'   },
  { id: 'qc',        label: 'QC & Finishing', owner: 'master' },
  { id: 'fitting',   label: 'Fitting',      owner: 'advisor'  },
  { id: 'delivery',  label: 'Out for Delivery', owner: 'delivery' },
  { id: 'done',      label: 'Delivered',    owner: 'admin'    },
];

export const LEAD_STATUSES = [
  { id: 'new',        label: 'New',          color: '#737373', dot: 'bg-neutral-500' },
  { id: 'undecided',  label: 'Still Deciding', color: '#eab308', dot: 'bg-yellow-500' },
  { id: 'follow',     label: 'Follow Up',    color: '#a3a3a3', dot: 'bg-neutral-400' },
  { id: 'potential',  label: 'Potential',    color: '#16a34a', dot: 'bg-green-600' },
  { id: 'customer',   label: 'Existing CX',  color: '#2563eb', dot: 'bg-blue-600' },
  { id: 'returning',  label: 'Recurring',    color: '#111827', dot: 'bg-neutral-900' },
  { id: 'lost',       label: 'Not Interested', color: '#dc2626', dot: 'bg-red-600' },
];

export const LEAD_SOURCES = ['Website Form', 'Appointment Booking', 'WhatsApp', 'Phone Call', 'Walk-in', 'Referral', 'Instagram'];

function d(daysAgo, hour = 11) {
  const x = new Date(); x.setDate(x.getDate() - daysAgo); x.setHours(hour, 0, 0, 0); return x.toISOString();
}

function seed() {
  const now = Date.now();
  return {
    activeRole: 'admin',
    activeUserId: 'u_admin',
    users: [
      { id: 'u_admin',   name: 'Mira Khan',     role: 'admin',    avatar: 'MK', phone: '+91 98000 11111', email: 'mira@kaariq.in',  joined: d(420), active: true },
      { id: 'u_master',  name: 'Iqbal Mistry',  role: 'master',   avatar: 'IM', phone: '+91 98000 22222', email: 'iqbal@kaariq.in', joined: d(900), active: true },
      { id: 'u_tailor1', name: 'Rohit Kamble',  role: 'tailor',   avatar: 'RK', phone: '+91 98000 33333', email: 'rohit@kaariq.in', joined: d(620), active: true },
      { id: 'u_tailor2', name: 'Sunita Devi',   role: 'tailor',   avatar: 'SD', phone: '+91 98000 44444', email: 'sunita@kaariq.in',joined: d(480), active: true },
      { id: 'u_adv',     name: 'Neha Joshi',    role: 'advisor',  avatar: 'NJ', phone: '+91 98000 55555', email: 'neha@kaariq.in',  joined: d(300), active: true },
      { id: 'u_dlv',     name: 'Amit Verma',    role: 'delivery', avatar: 'AV', phone: '+91 98000 66666', email: 'amit@kaariq.in',  joined: d(220), active: true },
    ],
    orders: [
      mkO('K-1042', 'Aanya Mehta',     '+91 98765 11000', 'Bridal Lehenga',  'lehenga',  'panelled',   125000, 'stitching', 'u_tailor1', d(8), [['cutting', 'u_master', d(7)], ['stitching', 'u_tailor1', d(4)]]),
      mkO('K-1041', 'Rohan Khanna',    '+91 98765 22000', 'Wedding Sherwani','sherwani', 'classic-sherwani', 38000, 'qc',       'u_master',  d(14), [['cutting','u_master', d(13)], ['stitching','u_tailor2', d(10)], ['qc','u_master', d(2)]]),
      mkO('K-1040', 'Priya Iyer',      '+91 98765 33000', 'Festive Anarkali','anarkali','classic-anarkali', 18500, 'delivery', 'u_dlv',     d(20), [['stitching','u_tailor1', d(17)], ['qc','u_master', d(15)], ['fitting','u_adv', d(11)], ['delivery','u_dlv', d(1)]]),
      mkO('K-1039', 'Arjun Nair',      '+91 98765 44000', 'Two-piece Suit',  'suit',    'two-piece',   24000, 'done',     'u_admin',   d(35), [['done','u_admin', d(2)]]),
      mkO('K-1038', 'Sneha Patil',     '+91 98765 55000', 'Hand-emb Blouse', 'blouse',  'backless',     6800, 'cutting',  'u_master',  d(3), []),
      mkO('K-1037', 'Tara Bose',       '+91 98765 66000', 'Casual Co-ord',   'kurta',   'a-line',       4200, 'new',      null,        d(0), []),
      mkO('K-1036', 'Vikram Shah',     '+91 98765 77000', 'Bandhgala',       'suit',    'bandhgala',   28000, 'consult',  'u_adv',     d(1), []),
      mkO('K-1035', 'Diya Kapoor',     '+91 98765 88000', 'Lehenga',         'lehenga', 'a-line-lehenga', 42000, 'pickup', 'u_dlv',     d(2), []),
      mkO('K-1034', 'Karan Mehra',     '+91 98765 99000', 'Tuxedo',          'suit',    'tuxedo',      38000, 'fitting',  'u_adv',     d(18), [['stitching','u_tailor2', d(15)], ['fitting','u_adv', d(1)]]),
    ],
    leads: [
      mkL('Saanvi Rao',   '+91 99001 11111', 'WhatsApp',           'Asked about bridal lehenga — budget 1.5L+', 'potential', d(0)),
      mkL('Karthik Iyer', '+91 99001 22222', 'Website Form',       'Wants 5 suits for groomsmen',              'customer',  d(1)),
      mkL('Meera Singh',  '+91 99001 33333', 'Appointment Booking','Booked virtual consult for kurta set',     'new',       d(2)),
      mkL('Aditya Sharma','+91 99001 44444', 'Phone Call',         'Will decide after Diwali',                  'undecided', d(3)),
      mkL('Pooja Reddy',  '+91 99001 55555', 'Instagram',          'DM about a co-ord set',                     'follow',    d(4)),
      mkL('Rajesh Bhatia','+91 99001 66666', 'Referral',           'Old customer — wants alterations',         'returning', d(5)),
      mkL('Latika Nair',  '+91 99001 77777', 'Walk-in',            'Did not commit',                            'lost',      d(6)),
      mkL('Tanvi Desai',  '+91 99001 88888', 'Website Form',       'Inquiry about embroidery',                  'new',       d(7)),
    ],
    events: seedEvents(now),
  };
}

function mkO(id, customer, phone, title, category, design, price, stage, assignedTo, createdAt, history) {
  return { id, customer, phone, title, category, design, price, stage, assignedTo, createdAt, history: history || [], punches: [], notes: [] };
}
function mkL(name, phone, source, notes, status, createdAt) {
  return { id: 'l_' + Math.random().toString(36).slice(2, 8), name, phone, source, notes, status, createdAt, history: [{ status, at: createdAt }] };
}
function seedEvents(now) {
  const evs = [];
  const types = ['view_category', 'view_design', 'start_journey', 'place_order', 'book_appt', 'lead_in'];
  const cats = ['blouse', 'kurta', 'anarkali', 'lehenga', 'suit', 'sherwani', 'bottom'];
  for (let i = 0; i < 220; i++) {
    evs.push({ id: 'ev_' + i, type: types[Math.floor(Math.random() * types.length)], category: cats[Math.floor(Math.random() * cats.length)], at: now - Math.random() * 1000 * 60 * 60 * 24 * 30 });
  }
  return evs;
}

export function loadAdmin() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) { const s = seed(); localStorage.setItem(KEY, JSON.stringify(s)); return s; }
    return JSON.parse(raw);
  } catch { return seed(); }
}
export function saveAdmin(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }
export function resetAdmin() { localStorage.removeItem(KEY); }
export function uid(p) { return `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`; }

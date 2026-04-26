// Comprehensive pricing tables
export const PRICING_GROUPS = [
  {
    id: 'womens',
    label: "Women's Wear",
    intro: 'Bespoke tailoring with two fittings, premium lining, and complimentary alteration warranty.',
    rows: [
      ['Blouse — Standard', '₹1,500', '7–10 days'],
      ['Blouse — Designer', 'from ₹4,500', '12–18 days'],
      ['Kurti / Kurta', 'from ₹1,800', '10–14 days'],
      ['Anarkali — Light', 'from ₹6,500', '14–21 days'],
      ['Anarkali — Heavy', 'from ₹18,000', '4–6 weeks'],
      ['Lehenga — Festive', 'from ₹35,000', '4–6 weeks'],
      ['Lehenga — Bridal', 'from ₹85,000', '8–12 weeks'],
      ['Salwar / Pant', 'from ₹900', '7–10 days'],
      ['Saree Blouse + Fall-Pico', '₹1,650', '7–10 days'],
    ],
  },
  {
    id: 'mens',
    label: "Men's Wear",
    intro: 'Hand-cut canvas, full-canvas construction available on premium suits.',
    rows: [
      ['Two-piece Suit', 'from ₹24,000', '3–4 weeks'],
      ['Three-piece Suit', 'from ₹32,000', '3–4 weeks'],
      ['Tuxedo', 'from ₹38,000', '4–5 weeks'],
      ['Bandhgala / Jodhpuri', 'from ₹28,000', '3–4 weeks'],
      ['Sherwani — Wedding', 'from ₹32,000', '5–7 weeks'],
      ['Kurta Pyjama', 'from ₹4,200', '10–14 days'],
      ['Designer Waistcoat', 'from ₹5,500', '10–14 days'],
      ['Trousers', 'from ₹2,200', '7–10 days'],
    ],
  },
  {
    id: 'embroidery',
    label: 'Embroidery & Hand Work',
    intro: 'Charged in addition to garment cost. Final pricing depends on motif density and panel size.',
    rows: [
      ['Light Resham / Threadwork', 'from ₹2,500', '+5–7 days'],
      ['Medium Aari / Zari', 'from ₹6,500', '+10–14 days'],
      ['Heavy Zardozi', 'from ₹14,000', '+3–4 weeks'],
      ['Mirror / Sheesha Work', 'from ₹4,500', '+7–10 days'],
      ['Sequin / Bead Work', 'from ₹5,500', '+7–12 days'],
      ['Cutwork / Chikankari', 'from ₹7,500', '+2–3 weeks'],
    ],
  },
  {
    id: 'alterations',
    label: 'Alterations & Repairs',
    intro: 'Free for life on every Kaariq bespoke order. Below rates apply to ready-to-wear and external garments.',
    rows: [
      ['Hem (trouser / kurta)', '₹250', '3–5 days'],
      ['Take in / Let out', '₹400', '3–5 days'],
      ['Sleeve Shorten', '₹300', '3 days'],
      ['Zipper Replacement', '₹350', '3–4 days'],
      ['Lining Replacement', '₹900', '5–7 days'],
      ['Blouse Refit', '₹600', '5–7 days'],
      ['Bridal Restoration', 'on quote', '2–3 weeks'],
    ],
  },
  {
    id: 'addons',
    label: 'Add-ons & Finishing',
    intro: 'Add to any order to elevate the finish.',
    rows: [
      ['Premium Inner Lining', '₹350', '—'],
      ['Bra-cup Padding', '₹250', '—'],
      ['Contrast Piping', '₹200', '—'],
      ['Fall & Pico (saree)', '₹150', '—'],
      ['Cancan / Volume Net', '₹1,200', '—'],
      ['Designer Buttons', '₹300', '—'],
      ['Concealed Side Zipper', '₹200', '—'],
      ['Dori with Tassels', '₹400', '—'],
      ['Rush Delivery (7 days)', '₹1,500', '—'],
    ],
  },
  {
    id: 'bulk',
    label: 'Bulk & Corporate',
    intro: 'Wedding parties, brand uniforms, and trousseau orders.',
    rows: [
      ['10–25 pieces', '8% off', 'Dedicated PM'],
      ['26–50 pieces', '12% off', 'Dedicated PM + courier'],
      ['51–100 pieces', '15% off', 'Priority production'],
      ['100+ pieces', '18% off', 'Custom contract'],
    ],
  },
];

export const PRICING_INCLUDED = [
  'Free design consultation', 'Free 14-point measurement', 'Two rounds of fittings',
  'Premium packaging', 'Lifetime free alterations*', 'Free pickup & delivery (in 25+ cities)',
];

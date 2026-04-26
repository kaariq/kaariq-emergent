// Mock data for Kaariq Tailoring & Boutique

export const SITE = {
  brand: 'Kaariq',
  tagline: 'Your fabric, your fit, your story.',
  phone: '+91 98000 00000',
  whatsapp: '+91 98000 00000',
  email: 'hello@kaariq.in',
  address: 'Kaariq Atelier, 12 Heritage Lane, Bandra West, Mumbai 400050',
  hours: 'Mon – Sat · 11:00 – 20:00',
};

export const ANNOUNCEMENTS = [
  'Complimentary doorstep measurement on orders above ₹5,000',
  'New Wedding Edit · Now Open for Consultations',
  'Free virtual fitting · Book in 60 seconds',
];

export const NAV = [
  {
    key: 'tailoring',
    label: 'Tailoring',
    columns: [
      { title: "Women's Wear", items: ['Blouse', 'Kurta', 'Anarkali', 'Lehenga', 'Bottoms & Salwars'] },
      { title: "Men's Wear", items: ['Suits & Blazers', 'Sherwani', 'Kurta Pyjama', 'Waistcoats', 'Trousers'] },
      { title: 'Customizations', items: ['Embroidery & Work', 'Neckline Designs', 'Sleeve Styles', 'Fabric Dyeing'] },
      { title: 'Alterations', items: ['Alterations & Repairs'] },
    ],
  },
  {
    key: 'collections',
    label: 'Collections',
    columns: [
      { title: 'Occasions', items: ['Wedding Edit', 'Festive Wear', 'Party & Evening', 'Formal Business'] },
      { title: 'Styles', items: ['Casual Daily', 'Boho Chic', 'Classic Vintage', 'Modern Minimalist'] },
      { title: 'Seasonal', items: ['Summer Breeze', 'Winter Velvet', 'Monsoon Essentials'] },
      { title: 'Featured', items: ['New Arrivals', 'Best Sellers'] },
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing',
    columns: [
      { title: 'Rates', items: ['Standard Rates', 'Premium Bespoke', 'Alteration Charges', 'Bulk Orders'] },
    ],
  },
  {
    key: 'explore',
    label: 'Explore',
    columns: [
      { title: 'Discover', items: ['Gallery & Lookbook', 'Blog & Fashion News', 'AI Design Tool', 'Personal Style Quiz', 'Customer Showreels'] },
    ],
  },
  {
    key: 'booking',
    label: 'Booking & Guide',
    columns: [
      { title: 'Plan Your Visit', items: ['Our Process', 'Measurement Guide', 'Book Appointment', 'Virtual Consultation'] },
    ],
  },
  {
    key: 'contact',
    label: 'Contact Us',
    columns: [
      { title: 'Get In Touch', items: ['Find Our Studio', 'WhatsApp Support', 'Corporate Inquiries'] },
    ],
  },
];

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1746372283841-dbb3838f9935',
  women: 'https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg',
  men: 'https://images.pexels.com/photos/6458310/pexels-photo-6458310.jpeg',
  embroidery: 'https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72',
  craft: 'https://images.unsplash.com/photo-1772351720165-d9218e428cf0',
  wedding: 'https://images.unsplash.com/photo-1724856604403-60304b28906c',
  festive: 'https://images.pexels.com/photos/12100636/pexels-photo-12100636.jpeg',
  casual: 'https://images.unsplash.com/photo-1768651925875-d1523ed07cb6',
  lookbook: 'https://images.unsplash.com/photo-1724433530860-f094e39b64e7',
  fabric: 'https://images.pexels.com/photos/34191411/pexels-photo-34191411.jpeg',
  consultation: 'https://images.unsplash.com/photo-1764298493253-e49696c110e7',
  boutique: 'https://images.pexels.com/photos/6044231/pexels-photo-6044231.jpeg',
};

export const SERVICES = [
  { title: "Women's Wear", desc: 'Blouses, Kurtas, Anarkalis, Lehengas, and bottoms — bespoke from sketch to stitch.', img: 'https://images.pexels.com/photos/8432522/pexels-photo-8432522.jpeg', link: '/tailoring/womens-wear' },
  { title: "Men's Wear", desc: 'Suits, Sherwanis, Kurta-pyjamas and waistcoats — tailored to a flawless silhouette.', img: 'https://images.pexels.com/photos/34211795/pexels-photo-34211795.jpeg', link: '/tailoring/mens-wear' },
  { title: 'Customizations', desc: 'Hand embroidery, necklines, sleeves, and dyeing — make every piece unmistakably yours.', img: 'https://images.unsplash.com/photo-1771409046893-d5c43a196743', link: '/tailoring/customizations' },
  { title: 'Alterations & Repairs', desc: 'Trusted alterations and restoration for ready-to-wear or beloved heirlooms.', img: 'https://images.unsplash.com/photo-1687422808289-e721259c9eb4', link: '/tailoring/alterations' },
];

export const COLLECTIONS = [
  { tag: 'Wedding Edit', title: 'The Wedding Edit', img: 'https://images.pexels.com/photos/30276951/pexels-photo-30276951.jpeg', blurb: 'Heirloom lehengas and sherwanis for the once-in-a-lifetime moment.' },
  { tag: 'Festive', title: 'Festive Wear', img: 'https://images.unsplash.com/photo-1724433530860-f094e39b64e7', blurb: 'Diwali, Eid, weddings — dress for the celebration.' },
  { tag: 'New In', title: 'New Arrivals', img: 'https://images.unsplash.com/photo-1732511405271-003810212501', blurb: 'Fresh silhouettes for the season, just landed in the atelier.' },
  { tag: 'Daily', title: 'Casual Daily', img: 'https://images.unsplash.com/photo-1732508530231-eda9c8546fdf', blurb: 'Comfort that still turns heads — kurtas, co-ords, modern Indo-western.' },
];

export const FEATURES = [
  { title: 'Doorstep Measurement', desc: 'Our master tailor visits you at home or office.' },
  { title: 'Virtual Fitting', desc: 'Consult with our e-designer over video, anywhere in the world.' },
  { title: 'Expert Craftsmanship', desc: 'Hand-finished by artisans with 20+ years of training.' },
  { title: 'Perfect Fit Promise', desc: 'Three rounds of fittings included on every bespoke order.' },
  { title: 'Eye for Detail', desc: 'Curated linings, buttons, threads — nothing left to chance.' },
  { title: 'Quick Turnaround', desc: 'From sketch to delivery in as little as 14 days.' },
  { title: 'Sustainable Practices', desc: 'Zero-waste cutting, natural dyes and end-of-life take-back.' },
  { title: 'Timeless Fashion', desc: 'Silhouettes that outlast trends — built to be worn for years.' },
];

export const PROCESS = [
  { n: '01', title: 'Consult', desc: 'Tell us your story, occasion, and inspirations — at the studio, your home, or on a video call.' },
  { n: '02', title: 'Measure', desc: 'Master tailor records 14 reference measurements and posture notes.' },
  { n: '03', title: 'Design', desc: 'We sketch, swatch and finalise fabric, lining, embroidery and trims.' },
  { n: '04', title: 'Craft', desc: 'Hand-cut, machine and hand-stitched in our atelier — with regular updates.' },
  { n: '05', title: 'Fit', desc: 'Two rounds of fittings included to perfect every seam.' },
  { n: '06', title: 'Deliver', desc: 'Beautifully packaged and delivered to your door, with a lifetime alteration warranty.' },
];

export const PRICING = [
  {
    plan: 'Standard',
    headline: 'Everyday tailoring, exceptional quality.',
    items: [
      ['Blouse (basic)', '₹1,200'],
      ['Kurta (women)', '₹1,800'],
      ['Salwar / Pant', '₹900'],
      ['Kurta Pyjama (men)', '₹2,200'],
      ['Trousers', '₹1,400'],
      ['Waistcoat', '₹1,800'],
    ],
  },
  {
    plan: 'Premium Bespoke',
    headline: 'Hand-finished with master artisans.',
    featured: true,
    items: [
      ['Bridal Lehenga', 'from ₹85,000'],
      ['Anarkali (heavy work)', 'from ₹18,000'],
      ['Sherwani', 'from ₹22,000'],
      ['Designer Suit (men)', 'from ₹28,000'],
      ['Designer Blouse', 'from ₹4,500'],
      ['Hand Embroidery', 'from ₹6,000'],
    ],
  },
  {
    plan: 'Alterations',
    headline: 'Bring your wardrobe back to life.',
    items: [
      ['Hem (trouser/kurta)', '₹250'],
      ['Take in / Let out', '₹400'],
      ['Zipper Replacement', '₹350'],
      ['Lining Replacement', '₹900'],
      ['Blouse refit', '₹600'],
      ['Bridal restoration', 'on quote'],
    ],
  },
];

export const HERO_SLIDES = [
  {
    id: 'kurtis',
    eyebrow: 'NEW IN \u00b7 SS \u201926',
    title: 'Kurtis,\ncrafted to flow.',
    body: 'Hand-blocked, breath-light cottons and silks \u2014 made to your measure.',
    cta: { label: 'Shop Kurtis', to: '/tailoring/kurta' },
    image: 'https://images.unsplash.com/photo-1708534246055-d7b149acb731',
    align: 'left',
    overlay: 'linear-gradient(90deg, rgba(50,56,43,0.72) 0%, rgba(50,56,43,0.28) 45%, rgba(50,56,43,0) 70%)',
  },
  {
    id: 'salwar',
    eyebrow: 'CO\u2011ORD EDIT',
    title: 'Salwars &\nco\u2011ord sets.',
    body: 'Tailored separates that move with you, from morning to mehendi.',
    cta: { label: 'Explore the Edit', to: '/tailoring/bottoms-and-salwars' },
    image: 'https://images.unsplash.com/photo-1583391734039-1c611b6d9bd0',
    align: 'right',
    overlay: 'linear-gradient(270deg, rgba(50,56,43,0.7) 0%, rgba(50,56,43,0.25) 45%, rgba(50,56,43,0) 70%)',
  },
  {
    id: 'mens',
    eyebrow: 'BESPOKE \u00b7 MEN',
    title: 'Suits & sherwanis,\nbuilt to fit.',
    body: 'Hand-cut canvas, mother-of-pearl buttons, and silhouettes that last decades.',
    cta: { label: "Shop Men's", to: '/tailoring/suits-and-blazers' },
    image: 'https://images.unsplash.com/photo-1729347917808-e3e35a462fec',
    align: 'left',
    overlay: 'linear-gradient(90deg, rgba(50,56,43,0.78) 0%, rgba(50,56,43,0.35) 50%, rgba(50,56,43,0) 78%)',
  },
  {
    id: 'alterations',
    eyebrow: 'COMPLIMENTARY SERVICE',
    title: 'Free alterations,\nfor life.',
    body: 'Every bespoke order from Kaariq is altered free \u2014 forever. Bring it back, we\u2019ll bring it home.',
    cta: { label: 'Learn more', to: '/tailoring/alterations-and-repairs' },
    image: 'https://images.unsplash.com/photo-1708234165852-89c978e5e33d',
    align: 'left',
    overlay: 'linear-gradient(90deg, rgba(50,56,43,0.82) 0%, rgba(50,56,43,0.45) 55%, rgba(114,121,65,0.15) 100%)',
  },
  {
    id: 'pickup',
    eyebrow: 'NOW IN 25+ CITIES',
    title: 'Free pickup,\nfree delivery.',
    body: 'Doorstep measurement, garment pickup, and white-glove delivery \u2014 included with every order.',
    cta: { label: 'Book a pickup', to: '/booking/book-appointment' },
    image: 'https://images.unsplash.com/photo-1759563874665-af0168ce2011',
    align: 'right',
    overlay: 'linear-gradient(270deg, rgba(50,56,43,0.78) 0%, rgba(50,56,43,0.35) 55%, rgba(50,56,43,0) 80%)',
  },
  {
    id: 'studio',
    eyebrow: 'INSIDE THE ATELIER',
    title: 'A studio,\nbuilt by hand.',
    body: 'Fabrics, threads, and master tailors \u2014 visit our Bandra atelier or step in virtually.',
    cta: { label: 'Visit the studio', to: '/contact/find-our-studio' },
    image: 'https://images.unsplash.com/photo-1771074152971-7dba5f49bf93',
    align: 'left',
    overlay: 'linear-gradient(90deg, rgba(50,56,43,0.7) 0%, rgba(50,56,43,0.2) 50%, rgba(0,0,0,0) 80%)',
  },
];

export const TESTIMONIAL_MEDIA = [
  {
    name: 'Ananya Mehta', role: 'Bride, Mumbai',
    quote: 'My bridal lehenga felt like a second skin. The Kaariq team understood my brief in a single sitting and delivered the most exquisite hand-zardozi I have seen.',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1724856604403-60304b28906c',
    src: 'https://images.unsplash.com/photo-1724856604403-60304b28906c',
  },
  {
    name: 'Rohan Khanna', role: 'Groom, Delhi',
    quote: 'A sherwani that fit perfectly on day one \u2014 without a single follow-up alteration. Effortless, world-class craftsmanship.',
    type: 'video',
    thumb: 'https://images.pexels.com/photos/6687162/pexels-photo-6687162.jpeg',
    src: 'https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1',
  },
  {
    name: 'Priya Iyer', role: 'Bengaluru',
    quote: 'I sent my measurements on a Sunday and a kurta set arrived in 12 days. Beautifully finished, packaging like a luxury brand.',
    type: 'image',
    thumb: 'https://images.unsplash.com/photo-1768651925875-d1523ed07cb6',
    src: 'https://images.unsplash.com/photo-1768651925875-d1523ed07cb6',
  },
  {
    name: 'Arjun Nair', role: 'Singapore',
    quote: 'Their virtual fitting actually works. Three suits later, I am a customer for life.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1729347917808-e3e35a462fec',
    src: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1',
  },
];

export const TESTIMONIALS = TESTIMONIAL_MEDIA;

export const BLOG = [
  { title: 'A guide to choosing the right blouse neckline', date: 'Apr 18, 2026', tag: 'Style', img: 'https://images.pexels.com/photos/36435092/pexels-photo-36435092.jpeg' },
  { title: 'Why hand-zardozi is making a comeback', date: 'Apr 02, 2026', tag: 'Craft', img: 'https://images.unsplash.com/photo-1763400126795-d83e07d3449e' },
  { title: 'How to take measurements at home', date: 'Mar 21, 2026', tag: 'Guide', img: 'https://images.pexels.com/photos/13206032/pexels-photo-13206032.jpeg' },
  { title: 'Inside our atelier: the making of a bridal lehenga', date: 'Mar 06, 2026', tag: 'Atelier', img: 'https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg' },
];

export const GALLERY = [
  IMAGES.wedding, IMAGES.lookbook, IMAGES.women, IMAGES.embroidery,
  IMAGES.festive, IMAGES.men, IMAGES.casual, IMAGES.fabric,
  IMAGES.craft, IMAGES.boutique, IMAGES.consultation, IMAGES.hero,
];

export const FAQ = [
  { q: 'How long does a bespoke order take?', a: '14–21 days for most garments. Bridal pieces with heavy hand-work take 6–10 weeks.' },
  { q: 'Do you ship internationally?', a: 'Yes — we ship worldwide via DHL with full insurance. Delivery in 4–7 business days.' },
  { q: 'What if the fit isn\u2019t right?', a: 'Every bespoke order includes 2 fittings. If the fit is still off, we re-make it on us.' },
  { q: 'Can I bring my own fabric?', a: 'Absolutely. We charge stitching only — and will advise on lining and trims.' },
];

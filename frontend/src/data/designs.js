// Predefined design subcategories for each tailoring category.
// Each design: { id, label, blurb, image, basePrice }
import { IMAGES } from '@/mock/mock';

const _i = IMAGES;

export const DESIGNS = {
  blouse: [
    { id: 'sleeveless-classic', label: 'Sleeveless Classic', blurb: 'Clean lines, princess cut, perfect base.', image: _i.women, basePrice: 1500 },
    { id: 'cut-sleeve', label: 'Cut Sleeve', blurb: 'Asymmetric cut sleeves with sharp shoulder line.', image: _i.women, basePrice: 1800 },
    { id: 'cap-sleeve', label: 'Cap Sleeve', blurb: 'Soft, rounded shoulder cap.', image: _i.women, basePrice: 1700 },
    { id: 'half-sleeve', label: 'Half Sleeve', blurb: 'Elbow-length sleeve, classic and versatile.', image: _i.women, basePrice: 1600 },
    { id: 'full-sleeve', label: 'Full Sleeve', blurb: 'Wrist-length sleeve, ideal for embroidery.', image: _i.women, basePrice: 1900 },
    { id: 'backless', label: 'Backless', blurb: 'Open back with dori or hook closure.', image: _i.embroidery, basePrice: 2400 },
    { id: 'halter-neck', label: 'Halter Neck', blurb: 'Tied behind the neck, sculptural shoulder.', image: _i.women, basePrice: 2200 },
    { id: 'off-shoulder', label: 'Off-shoulder', blurb: 'Off-the-shoulder elasticated neckline.', image: _i.women, basePrice: 2300 },
    { id: 'boat-neck', label: 'Boat Neck', blurb: 'Wide horizontal neckline, regal silhouette.', image: _i.women, basePrice: 1700 },
    { id: 'sweetheart', label: 'Sweetheart Neck', blurb: 'Heart-shaped neckline with soft curves.', image: _i.women, basePrice: 1900 },
  ],
  kurta: [
    { id: 'a-line', label: 'A-Line Kurti', blurb: 'Flares gently from chest to hem.', image: _i.casual, basePrice: 2000 },
    { id: 'anarkali-kurti', label: 'Anarkali Kurti', blurb: 'Heavy flare from waist down.', image: _i.festive, basePrice: 3500 },
    { id: 'straight-cut', label: 'Straight Cut', blurb: 'Slim, modern straight silhouette.', image: _i.casual, basePrice: 1800 },
    { id: 'asymmetric', label: 'Asymmetric', blurb: 'Uneven hemline for drama.', image: _i.casual, basePrice: 2400 },
    { id: 'high-low', label: 'High-Low', blurb: 'Short in front, longer at back.', image: _i.casual, basePrice: 2500 },
    { id: 'side-slit', label: 'Side Slit', blurb: 'Long with elegant side slits.', image: _i.casual, basePrice: 2200 },
    { id: 'cape-kurti', label: 'Cape Style', blurb: 'Layered cape over a base kurti.', image: _i.festive, basePrice: 3200 },
    { id: 'jacket-kurti', label: 'Jacket Kurti', blurb: 'Inner kurti with overlay jacket.', image: _i.festive, basePrice: 3400 },
  ],
  anarkali: [
    { id: 'classic-anarkali', label: 'Classic Floor Length', blurb: 'Heavy flare, full length.', image: _i.festive, basePrice: 9500 },
    { id: 'kalidar', label: 'Kalidar Anarkali', blurb: 'Multi-panel kali construction.', image: _i.festive, basePrice: 12000 },
    { id: 'short-anarkali', label: 'Short Anarkali', blurb: 'Knee-length, festive cut.', image: _i.casual, basePrice: 7000 },
    { id: 'cape-anarkali', label: 'Cape Anarkali', blurb: 'With layered cape overlay.', image: _i.festive, basePrice: 14000 },
  ],
  lehenga: [
    { id: 'a-line-lehenga', label: 'A-Line Lehenga', blurb: 'Soft A-line silhouette.', image: _i.wedding, basePrice: 35000 },
    { id: 'circular', label: 'Circular Lehenga', blurb: 'Full 360° flare for drama.', image: _i.wedding, basePrice: 45000 },
    { id: 'mermaid', label: 'Mermaid / Fishtail', blurb: 'Fitted to knee, then flares.', image: _i.wedding, basePrice: 55000 },
    { id: 'panelled', label: 'Panelled (Kalidar)', blurb: 'Multi-panel construction with rich detail.', image: _i.wedding, basePrice: 65000 },
  ],
  bottom: [
    { id: 'churidar', label: 'Churidar', blurb: 'Stretchy, gathered ankle.', image: _i.fabric, basePrice: 700 },
    { id: 'salwar', label: 'Salwar', blurb: 'Loose pleated salwar.', image: _i.fabric, basePrice: 800 },
    { id: 'patiala', label: 'Patiala', blurb: 'Heavily pleated traditional cut.', image: _i.fabric, basePrice: 1100 },
    { id: 'palazzo', label: 'Palazzo', blurb: 'Wide-leg, modern silhouette.', image: _i.fabric, basePrice: 1200 },
    { id: 'cigarette', label: 'Cigarette Pant', blurb: 'Slim, ankle length.', image: _i.fabric, basePrice: 1100 },
    { id: 'sharara', label: 'Sharara', blurb: 'Wide flared from knee.', image: _i.fabric, basePrice: 1500 },
  ],
  suit: [
    { id: 'two-piece', label: 'Two-piece Suit', blurb: 'Classic jacket + trouser.', image: _i.men, basePrice: 24000 },
    { id: 'three-piece', label: 'Three-piece Suit', blurb: 'With matching waistcoat.', image: _i.men, basePrice: 32000 },
    { id: 'tuxedo', label: 'Tuxedo', blurb: 'Satin lapel, formal.', image: _i.men, basePrice: 38000 },
    { id: 'bandhgala', label: 'Bandhgala', blurb: 'Indian closed-neck blazer.', image: _i.men, basePrice: 28000 },
  ],
  sherwani: [
    { id: 'classic-sherwani', label: 'Classic Sherwani', blurb: 'Knee length, heritage cut.', image: _i.wedding, basePrice: 28000 },
    { id: 'indo-western', label: 'Indo-Western', blurb: 'Modern asymmetric design.', image: _i.men, basePrice: 32000 },
    { id: 'achkan', label: 'Achkan', blurb: 'Long, royal silhouette.', image: _i.wedding, basePrice: 30000 },
  ],
  'kurta-pyjama': [
    { id: 'classic-kurta', label: 'Classic Kurta', blurb: 'Straight-cut everyday kurta.', image: _i.consultation, basePrice: 3500 },
    { id: 'short-kurta', label: 'Short Kurta', blurb: 'Modern hip-length cut.', image: _i.consultation, basePrice: 3200 },
    { id: 'pathani', label: 'Pathani', blurb: 'Side-slit Pathani style.', image: _i.consultation, basePrice: 3800 },
  ],
  trousers: [
    { id: 'formal', label: 'Formal Trouser', blurb: 'Classic pleated formals.', image: _i.fabric, basePrice: 2200 },
    { id: 'chino', label: 'Chino', blurb: 'Casual cotton chino.', image: _i.fabric, basePrice: 1900 },
    { id: 'linen', label: 'Linen', blurb: 'Breezy linen trousers.', image: _i.fabric, basePrice: 2400 },
  ],
  waistcoat: [
    { id: 'classic-wc', label: 'Classic Waistcoat', blurb: 'Three-button formal.', image: _i.embroidery, basePrice: 3200 },
    { id: 'embroidered-wc', label: 'Embroidered Waistcoat', blurb: 'Festive zari work.', image: _i.embroidery, basePrice: 5500 },
    { id: 'nehru', label: 'Nehru Jacket', blurb: 'Bandhgala-style waistcoat.', image: _i.embroidery, basePrice: 4800 },
  ],
};

// Customisation options used by the order journey
export const NECKLINES = [
  { id: 'round', label: 'Round Neck' },
  { id: 'v-neck', label: 'V Neck' },
  { id: 'sweetheart', label: 'Sweetheart' },
  { id: 'square', label: 'Square Neck' },
  { id: 'boat', label: 'Boat Neck' },
  { id: 'collar', label: 'Collar' },
  { id: 'mandarin', label: 'Mandarin' },
  { id: 'halter', label: 'Halter' },
  { id: 'high-neck', label: 'High Neck' },
];

export const BACK_DESIGNS = [
  { id: 'closed', label: 'Closed Back' },
  { id: 'keyhole', label: 'Keyhole' },
  { id: 'deep-u', label: 'Deep U' },
  { id: 'deep-v', label: 'Deep V' },
  { id: 'backless-dori', label: 'Backless w/ Dori' },
  { id: 'tassel', label: 'Tassel Tie' },
  { id: 'button', label: 'Button Back' },
  { id: 'zipper', label: 'Concealed Zipper' },
];

export const SLEEVE_STYLES = [
  { id: 'sleeveless', label: 'Sleeveless' },
  { id: 'cap', label: 'Cap Sleeve' },
  { id: 'short', label: 'Short Sleeve' },
  { id: 'half', label: 'Half Sleeve' },
  { id: 'three-quarter', label: '3/4 Sleeve' },
  { id: 'full', label: 'Full Sleeve' },
  { id: 'puff', label: 'Puff Sleeve' },
  { id: 'bell', label: 'Bell Sleeve' },
  { id: 'bishop', label: 'Bishop Sleeve' },
  { id: 'cold-shoulder', label: 'Cold Shoulder' },
];

export const ADDONS = [
  { id: 'lining', label: 'Premium Inner Lining', price: 350 },
  { id: 'padding', label: 'Bra-cup Padding', price: 250 },
  { id: 'piping', label: 'Contrast Piping', price: 200 },
  { id: 'fall-pico', label: 'Fall & Pico (saree)', price: 150 },
  { id: 'cancan', label: 'Cancan / Volume Net', price: 1200 },
  { id: 'fancy-buttons', label: 'Designer Buttons', price: 300 },
  { id: 'side-zipper', label: 'Concealed Side Zipper', price: 200 },
  { id: 'dori-tassels', label: 'Dori with Tassels', price: 400 },
  { id: 'embroidery-light', label: 'Light Hand-Embroidery', price: 2500 },
  { id: 'embroidery-medium', label: 'Medium Hand-Embroidery', price: 6500 },
  { id: 'embroidery-heavy', label: 'Heavy Zardozi / Aari', price: 14000 },
  { id: 'rush-delivery', label: 'Rush Delivery (7 days)', price: 1500 },
];

export const HOW_TO_MEASURE = [
  { title: 'Use a soft tape', body: 'A flexible cloth measuring tape gives the most accurate reading.' },
  { title: 'Stand naturally', body: 'Stand straight with arms relaxed by your side. Don\u2019t suck in or flex.' },
  { title: 'Wear a fitted top', body: 'For best accuracy, wear a thin, well-fitting top while measuring.' },
  { title: 'Round to the nearest 0.25 in', body: 'Always round up if between two values.' },
  { title: 'Get a friend to help', body: 'For shoulder, back gala and sleeve length, a second pair of hands is essential.' },
];

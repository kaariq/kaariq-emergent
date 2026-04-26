// SVG previews for design options used in the order journey
import React from 'react';

const svg = (paths, vb = '0 0 80 80') => (
  <svg viewBox={vb} className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);

// Necklines
export const NECKLINE_SVGS = {
  'round':       svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M30 36 a10 8 0 0 0 20 0"/></>),
  'v-neck':      svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M30 18 L40 42 L50 18"/></>),
  'sweetheart':  svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M30 22 q5 12 10 16 q5 -4 10 -16"/></>),
  'square':      svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M30 22 V40 H50 V22"/></>),
  'boat':        svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M22 24 Q40 32 58 24"/></>),
  'collar':      svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M28 22 L40 36 L52 22"/><path d="M28 22 Q24 30 30 36"/><path d="M52 22 Q56 30 50 36"/></>),
  'mandarin':    svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M30 18 V30 H50 V18"/></>),
  'halter':      svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><path d="M40 14 L34 36 H46 L40 14"/></>),
  'high-neck':   svg(<><path d="M20 18 q20 -10 40 0 v18 q-20 22 -40 0 z"/><rect x="32" y="14" width="16" height="14"/></>),
};

export const BACK_SVGS = {
  'closed':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/></>),
  'keyhole':      svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><circle cx="40" cy="30" r="6"/><path d="M40 36 V46"/></>),
  'deep-u':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><path d="M28 18 V42 a12 14 0 0 0 24 0 V18"/></>),
  'deep-v':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><path d="M28 18 L40 50 L52 18"/></>),
  'backless-dori':svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><path d="M28 18 V52 H52 V18"/><path d="M30 28 L50 28 M30 36 L50 36 M30 44 L50 44"/></>),
  'tassel':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><path d="M40 16 V52"/><path d="M36 52 V58 M40 52 V60 M44 52 V58"/></>),
  'button':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><circle cx="40" cy="24" r="1.5"/><circle cx="40" cy="34" r="1.5"/><circle cx="40" cy="44" r="1.5"/></>),
  'zipper':       svg(<><path d="M20 18 q20 -10 40 0 v40 H20 z"/><path d="M40 18 V52" strokeDasharray="2 2"/></>),
};

export const SLEEVE_SVGS = {
  'sleeveless':    svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/></>),
  'cap':           svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M14 22 Q20 18 24 26"/><path d="M66 22 Q60 18 56 26"/></>),
  'short':         svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M8 22 L18 22 L20 34 L10 36 z"/><path d="M72 22 L62 22 L60 34 L70 36 z"/></>),
  'half':          svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M6 22 L18 22 L20 44 L8 46 z"/><path d="M74 22 L62 22 L60 44 L72 46 z"/></>),
  'three-quarter': svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M4 22 L18 22 L20 56 L6 58 z"/><path d="M76 22 L62 22 L60 56 L74 58 z"/></>),
  'full':          svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M4 22 L18 22 L20 70 L4 72 z"/><path d="M76 22 L62 22 L60 70 L76 72 z"/></>),
  'puff':          svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M4 22 Q12 14 18 22 Q14 28 8 30 z"/><path d="M76 22 Q68 14 62 22 Q66 28 72 30 z"/></>),
  'bell':          svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M4 22 L18 22 L24 60 L0 62 z"/><path d="M76 22 L62 22 L56 60 L80 62 z"/></>),
  'bishop':        svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M6 22 L18 22 Q22 50 16 56 L8 56 z"/><path d="M74 22 L62 22 Q58 50 64 56 L72 56 z"/></>),
  'cold-shoulder': svg(<><path d="M20 24 q20 -8 40 0 v34 H20 z"/><path d="M8 24 L14 24 M8 30 L18 30 L20 50 L10 52 z"/><path d="M72 24 L66 24 M72 30 L62 30 L60 50 L70 52 z"/></>),
};

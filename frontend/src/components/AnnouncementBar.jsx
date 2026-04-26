import React from 'react';
import { ANNOUNCEMENTS } from '@/mock/mock';

export default function AnnouncementBar() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div className="bg-[hsl(351,33%,30%)] text-[hsl(30,22%,95%)] overflow-hidden border-b border-black/10">
      <div className="flex marquee-track whitespace-nowrap py-2 text-[11px] tracking-[0.18em] uppercase">
        {items.map((t, i) => (
          <span key={i} className="px-8 inline-flex items-center gap-3">
            <span className="opacity-60">·</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function ScrollSectionIndicator() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const getActive = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      const trigger = window.innerHeight * 0.4;

      let current: string | null = null;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= trigger) {
          current = section.dataset.section ?? null;
        }
      }
      setActiveSection(current);
    };

    getActive();
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex transition-opacity duration-300 ${
        activeSection ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* key change remounts the span, re-triggering the CSS fade-in animation */}
      <span
        key={activeSection}
        className="anim-section-label text-[10px] font-medium tracking-widest uppercase whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {activeSection}
      </span>
    </div>
  );
}

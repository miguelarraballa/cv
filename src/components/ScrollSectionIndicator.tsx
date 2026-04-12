'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence mode="wait">
      {activeSection && (
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex"
        >
          <span
            className="text-[10px] font-medium tracking-widest uppercase opacity-30 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {activeSection}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

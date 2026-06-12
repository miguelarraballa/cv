'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className="fixed bottom-6 right-6 z-50 p-2 border border-black/15 bg-white/90 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-200 cursor-pointer md:bottom-8 md:right-8"
    >
      <ChevronUp size={18} />
    </button>
  );
}

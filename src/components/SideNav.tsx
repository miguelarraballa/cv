'use client';

import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  'Tecnologías',
  'Hard Skills & Portfolio',
  'Formación Reglada',
  'Formación No Reglada & Certificaciones',
  'Experiencia Profesional',
  'Idiomas',
  'Algunos Clientes Finales & Agencias',
  'Disponibilidad',
];

const CONTENT_MAX_W = 1152; // max-w-6xl en px
const GAP = 20;             // espacio mínimo entre nav y contenido

export default function SideNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    function checkFit() {
      const nav = navRef.current;
      if (!nav) return;
      // Espacio disponible a la izquierda del contenido principal
      const contentLeft = Math.max(24, (window.innerWidth - CONTENT_MAX_W) / 2);
      setFits(contentLeft > nav.offsetWidth + GAP);
    }

    checkFit();
    window.addEventListener('resize', checkFit, { passive: true });
    return () => window.removeEventListener('resize', checkFit);
  }, []);

  useEffect(() => {
    function getActive() {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      const trigger = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= trigger) current = s.dataset.section ?? null;
      }
      setActiveSection(current);
    }

    getActive();
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  function scrollToSection(title: string) {
    document.querySelector<HTMLElement>(`[data-section="${title}"]`)
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav
      ref={navRef}
      aria-label="Navegación de secciones"
      className={`fixed left-6 top-32 z-40 hidden lg:flex flex-col gap-3 max-w-[140px] transition-opacity duration-500 ${
        fits ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {SECTIONS.map((title) => (
        <button
          key={title}
          onClick={() => scrollToSection(title)}
          className={`text-left text-[10px] leading-snug tracking-wide transition-all duration-200 cursor-pointer ${
            activeSection === title
              ? 'opacity-100 font-semibold'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          {title}
        </button>
      ))}
    </nav>
  );
}

'use client';

import { useEffect, useState } from 'react';

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

export default function DotNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
      aria-label="Navegación de secciones"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
    >
      {SECTIONS.map((title) => {
        const isActive = activeSection === title;
        return (
          <div key={title} className="group/dot relative flex items-center">
            {/* Tooltip a la izquierda del punto */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
              <span className="block text-[10px] tracking-widest uppercase whitespace-nowrap bg-white border border-black/10 px-2 py-1 shadow-sm">
                {title}
              </span>
            </div>

            {/* Punto */}
            <button
              onClick={() => scrollToSection(title)}
              aria-label={title}
              className={`block rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-2 h-2 bg-black'
                  : 'w-1.5 h-1.5 bg-black/25 hover:bg-black/50'
              }`}
            />
          </div>
        );
      })}
    </nav>
  );
}

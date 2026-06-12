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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Bloquea scroll del body mientras el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function handleSection(title: string) {
    setOpen(false);
    // Espera a que la animación de cierre empiece antes de hacer scroll
    setTimeout(() => {
      document.querySelector<HTMLElement>(`[data-section="${title}"]`)
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  return (
    <>
      {/* Botón hamburguesa — solo visible en móvil/tablet */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú de navegación"
        className="fixed top-5 left-5 z-50 md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border border-black"
      >
        <span className="block w-5 h-px bg-black mb-1.5" />
        <span className="block w-5 h-px bg-black mb-1.5" />
        <span className="block w-5 h-px bg-black" />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer lateral */}
      <nav
        aria-label="Menú de secciones"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col md:hidden
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Cabecera del drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <span className="text-xs tracking-widest uppercase font-medium">Secciones</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="w-8 h-8 flex items-center justify-center text-black/50 hover:text-black transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Lista de secciones */}
        <ul className="flex-1 overflow-y-auto py-4">
          {SECTIONS.map((title) => (
            <li key={title}>
              <button
                onClick={() => handleSection(title)}
                className="w-full text-left px-6 py-3.5 text-sm tracking-wide hover:bg-black/5 transition-colors"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

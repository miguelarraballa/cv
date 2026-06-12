'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, icon, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const id = title
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <section
      ref={ref}
      id={id}
      data-section={title}
      className={`py-16 md:py-24 px-6 ${visible ? 'section-visible' : 'section-hidden'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10 md:mb-12">
          <div className="p-3 border border-black/10 flex-shrink-0">
            {icon}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

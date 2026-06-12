'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  preview?: React.ReactNode;
  children: React.ReactNode;
}

export default function ExpandableSection({
  title,
  icon,
  isExpanded,
  onToggle,
  preview,
  children,
}: ExpandableSectionProps) {
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

  return (
    <section
      ref={ref}
      data-section={title}
      className={`py-16 md:py-24 px-6 border-t border-black/10 ${visible ? 'section-visible' : 'section-hidden'}`}
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between group mb-8 hover:opacity-70 transition-opacity cursor-pointer"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 border border-black/10 flex-shrink-0">
              {icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-left">{title}</h2>
          </div>
          <div
            className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          >
            <ChevronDown size={32} />
          </div>
        </button>

        {!isExpanded && preview && (
          <div className="mb-6 transition-opacity duration-300">
            {preview}
            <button
              onClick={onToggle}
              className="mt-8 text-sm underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            >
              Más detalle
            </button>
          </div>
        )}

        {/* Grid rows trick: animates height: 0 → auto smoothly */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-4">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

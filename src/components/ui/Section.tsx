'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, icon, children, className = '' }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      data-section={title}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className={`py-16 md:py-24 px-6 ${className}`}
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
    </motion.section>
  );
}

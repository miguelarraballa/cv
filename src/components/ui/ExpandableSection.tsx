'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      data-section={title}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 px-6 border-t border-black/10"
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
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>

        {!isExpanded && preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            {preview}
          </motion.div>
        )}

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4">{children}</div>
        </motion.div>
      </div>
    </motion.section>
  );
}

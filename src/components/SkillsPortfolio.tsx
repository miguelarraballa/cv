'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import Section from '@/components/ui/Section';
import cvData from '@/data/cv.json';

const { skills } = cvData;

type Tab = string;

interface PortfolioItem {
  title: string;
  description: string;
  url: string;
  year?: string;
  tags: string[];
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="border border-black/10 p-6 hover:border-black/30 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg md:text-xl font-bold leading-snug">{item.title}</h3>
          {item.year && (
            <span className="text-xs opacity-40 mt-0.5 block">{item.year}</span>
          )}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-40 hover:opacity-80 transition-opacity flex-shrink-0 mt-1"
            aria-label={`Ver ${item.title}`}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <p className="opacity-60 mb-4 leading-relaxed text-sm md:text-base">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 bg-black/5 border border-black/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsPortfolio() {
  const [activeTab, setActiveTab] = useState<Tab>(skills.tabs[0]);

  const tabLabels: Record<string, string> = {
    Web: 'Web frontend & backend',
    WordPress: 'WordPress / CMS',
    Datos: 'Data & ML',
  };

  const currentItems = (skills as Record<string, unknown>)[activeTab] as PortfolioItem[];

  return (
    <Section title="Hard Skills & Portfolio" icon={<Code2 />}>
      {/* Tabs */}
      <div className="mb-8 flex gap-0 border-b border-black/10 overflow-x-auto">
        {skills.tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-3 md:px-4 whitespace-nowrap relative transition-colors text-sm md:text-base cursor-pointer ${
              activeTab === tab
                ? 'text-black font-medium'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            {tabLabels[tab] ?? tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Items */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {currentItems.map((item) => (
          <PortfolioCard key={item.title} item={item} />
        ))}
      </motion.div>
    </Section>
  );
}

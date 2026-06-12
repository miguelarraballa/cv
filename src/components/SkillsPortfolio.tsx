'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2, ExternalLink } from 'lucide-react';
import Section from '@/components/ui/Section';
import cvData from '@/data/cv.json';

type SkillTab = 'Web' | 'WordPress' | 'Datos';

interface PortfolioItem {
  title: string;
  description: string;
  url: string;
  year?: string;
  tags: string[];
}

type SkillsData = { tabs: SkillTab[] } & Record<SkillTab, PortfolioItem[]>;

const skills = cvData.skills as unknown as SkillsData;

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="border border-black/10 p-6 hover:border-black/30 hover:-translate-y-1 transition-all duration-300">
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
          <span key={tag} className="text-xs px-3 py-1 bg-black/5 border border-black/10 rounded-[3px]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsPortfolio() {
  const [activeTab, setActiveTab] = useState<SkillTab>(skills.tabs[0]);
  const [panelKey, setPanelKey] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabLabels: Record<string, string> = {
    Web: 'Web frontend & backend',
    WordPress: 'WordPress / CMS',
    Datos: 'Data & ML',
  };

  const currentItems: PortfolioItem[] = skills[activeTab];

  useEffect(() => {
    const idx = skills.tabs.indexOf(activeTab);
    const el = tabRefs.current[idx];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  function selectTab(tab: SkillTab) {
    setActiveTab(tab);
    setPanelKey((k) => k + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const tabs = skills.tabs;
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      selectTab(tabs[nextIndex]);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <Section title="Hard Skills & Portfolio" icon={<Code2 />}>
      {/* Tabs */}
      <div
        ref={tablistRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className="relative mb-8 flex gap-0 border-b border-black/10 overflow-x-auto"
      >
        {skills.tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => { tabRefs.current[index] = el; }}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`tabpanel-${tab}`}
            id={`tab-${tab}`}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => selectTab(tab)}
            className={`pb-4 px-3 md:px-4 whitespace-nowrap relative transition-colors text-sm md:text-base cursor-pointer ${
              activeTab === tab ? 'text-black font-medium' : 'text-black/40 hover:text-black/60'
            }`}
          >
            {tabLabels[tab] ?? tab}
          </button>
        ))}
        {/* Sliding indicator — tracks active tab position */}
        <div
          className="absolute bottom-0 h-0.5 bg-black transition-[left,width] duration-300 ease-out"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </div>

      {/* Items */}
      <div
        key={panelKey}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="anim-tab-panel grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {currentItems.map((item) => (
          <PortfolioCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}

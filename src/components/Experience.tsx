'use client';

import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import ExpandableSection from '@/components/ui/ExpandableSection';
import cvData from '@/data/cv.json';

const { experience } = cvData;

const typeLabels: Record<string, string> = {
  Autónomo: 'Autónomo',
  Freelance: 'Freelance',
  Empresa: 'Empresa',
};

function ExperienceItem({
  position,
  company,
  period,
  location,
  type,
  description,
  achievements,
}: {
  position: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
}) {
  return (
    <div className="pl-6 md:pl-8 relative">
      <div className="absolute left-0 top-2 w-2 h-2 bg-black rounded-full -translate-x-[4.5px]" />
      <div className="mb-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg md:text-xl font-bold">{position}</h3>
          {type && (
            <span className="text-xs px-2 py-0.5 bg-black/5 border border-black/10 rounded-[3px]">
              {typeLabels[type] ?? type}
            </span>
          )}
        </div>
        <p className="opacity-60 font-medium">{company}</p>
        <div className="flex flex-wrap gap-x-3 mt-1">
          <p className="text-sm opacity-40">{period}</p>
          {location && <p className="text-sm opacity-30">{location}</p>}
        </div>
      </div>
      <p className="opacity-70 mb-4 leading-relaxed text-sm md:text-base">{description}</p>
      <ul className="space-y-2">
        {achievements.map((achievement, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm opacity-60">
            <span className="mt-1.5 w-1 h-1 bg-black/40 rounded-full flex-shrink-0" />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);

  const preview = (
    <div className="space-y-2 opacity-60 text-sm md:text-base">
      {experience.map((item) => (
        <p key={item.position + item.company}>
          • {item.position} — {item.company} ({item.period})
        </p>
      ))}
    </div>
  );

  return (
    <ExpandableSection
      title="Experiencia Profesional"
      icon={<Briefcase />}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded((v) => !v)}
      preview={preview}
    >
      <div className="space-y-8 md:space-y-10 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-black/10">
        {experience.map((item) => (
          <ExperienceItem key={item.position + item.company} {...item} />
        ))}
      </div>
    </ExpandableSection>
  );
}

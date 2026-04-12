'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import ExpandableSection from '@/components/ui/ExpandableSection';
import cvData from '@/data/cv.json';

const { education } = cvData;

function EducationItem({
  degree,
  institution,
  period,
  description,
  note,
}: {
  degree: string;
  institution: string;
  period: string;
  description: string;
  note?: string;
}) {
  return (
    <div className="border-l-2 border-black/20 pl-6 pb-6">
      <div className="flex flex-wrap items-start gap-2 mb-1">
        <h3 className="text-lg md:text-xl font-bold">{degree}</h3>
        {note && (
          <span className="text-xs px-2 py-0.5 bg-black/5 border border-black/10 self-start mt-1">
            {note}
          </span>
        )}
      </div>
      <p className="opacity-60 mb-1">{institution}</p>
      <p className="text-sm opacity-40 mb-3">{period}</p>
      <p className="opacity-70 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  );
}

export default function Education() {
  const [isExpanded, setIsExpanded] = useState(false);

  const preview = (
    <div className="space-y-2 opacity-60 text-sm md:text-base">
      {education.map((item) => (
        <p key={item.degree}>
          • {item.degree} — {item.institution.split('—')[0].trim()} ({item.period})
        </p>
      ))}
    </div>
  );

  return (
    <ExpandableSection
      title="Formación Reglada"
      icon={<GraduationCap />}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded((v) => !v)}
      preview={preview}
    >
      <div className="space-y-6">
        {education.map((item) => (
          <EducationItem key={item.degree} {...item} />
        ))}
      </div>
    </ExpandableSection>
  );
}

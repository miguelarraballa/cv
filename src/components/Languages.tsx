import { BookOpen, PenLine, Ear, Mic } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Languages as LanguagesIcon } from 'lucide-react';
import cvData from '@/data/cv.json';

const { languages } = cvData;

const skills = [
  { key: 'reading',   label: 'Leer',        icon: <BookOpen size={16} /> },
  { key: 'writing',   label: 'Escribir',     icon: <PenLine size={16} /> },
  { key: 'listening', label: 'Comprender',   icon: <Ear size={16} /> },
  { key: 'speaking',  label: 'Conversación', icon: <Mic size={16} /> },
] as const;

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1);
        return (
          <span key={i} className="relative inline-block w-3.5 h-3.5">
            <svg viewBox="0 0 24 24" className="w-full h-full text-black/15" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function LanguageCard({ lang, index }: { lang: typeof languages[number]; index: number }) {
  return (
    <div
      className="border border-black/10 p-6 hover:border-black/25 transition-all anim-card-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl leading-none">{lang.flag}</span>
        <h3 className="text-xl font-bold tracking-tight">{lang.name}</h3>
      </div>
      <div className="space-y-3">
        {skills.map(({ key, label, icon }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 opacity-50 min-w-[110px]">
              {icon}
              <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
            </div>
            <Stars value={lang[key]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Languages() {
  return (
    <Section title="Idiomas" icon={<LanguagesIcon />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((lang, i) => (
          <LanguageCard key={lang.name} lang={lang} index={i} />
        ))}
      </div>
    </Section>
  );
}

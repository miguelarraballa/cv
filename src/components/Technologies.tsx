import { Cpu } from 'lucide-react';
import Section from '@/components/ui/Section';
import cvData from '@/data/cv.json';

const { technologies } = cvData;

export default function Technologies() {
  return (
    <Section title="Tecnologías" icon={<Cpu />} className="border-t border-black/10">
      <div className="space-y-4">
        {technologies.map(({ titulo, tags }) => (
          <div
            key={titulo}
            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
          >
            <span className="text-xs uppercase tracking-widest opacity-40 pt-1 w-20 flex-shrink-0">
              {titulo}
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 border border-black/10 bg-black/[0.03] hover:border-black/30 hover:bg-black/[0.06] transition-all rounded-[3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

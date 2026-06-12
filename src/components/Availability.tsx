import { Zap } from 'lucide-react';
import Section from '@/components/ui/Section';

const tags = [
  { label: 'Freelance',               desc: 'Proyectos puntuales o continuados' },
  { label: 'Consultoría técnica',      desc: 'Revisión, diseño y toma de decisiones' },
  { label: 'Trabajo remoto',           desc: 'Full remote o híbrido' },
  { label: 'Proyectos a medida',       desc: 'Desarrollo desde cero a medida' },
  { label: 'Mantenimiento evolutivo',  desc: 'Evolución y soporte de aplicaciones existentes' },
  { label: 'Integración de APIs',      desc: 'Conexión con servicios y plataformas externas' },
  { label: 'Auditoría de código',      desc: 'Revisión de calidad, seguridad y rendimiento' },
  { label: 'Pair programming',         desc: 'Colaboración directa con equipos de desarrollo' },
  { label: 'Formación técnica',        desc: 'Mentoring y formación para equipos' },
];

export default function Availability() {
  return (
    <Section title="Disponibilidad" icon={<Zap />}>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ label, desc }) => (
          <div key={label} className="group relative">
            <span className="block text-sm px-3 py-1 border border-black/10 bg-black/[0.03] hover:border-black/30 hover:bg-black/[0.06] transition-all rounded-[3px] cursor-default">
              {label}
            </span>
            {/* Tooltip con descripción */}
            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] tracking-wide whitespace-nowrap bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[3px]">
              {desc}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

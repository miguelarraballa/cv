'use client';

import { useRef, useState } from 'react';
import { GitBranch, Link2, Mail, Phone, MapPin, ChevronDown, Globe, ExternalLink, FileDown } from 'lucide-react';
import cvData from '@/data/cv.json';

const { personal } = cvData;

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 group">
      <div className="mt-1 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider opacity-40 mb-1">{label}</p>
        <p className={`${href ? 'hover:underline' : ''} transition-all break-all`}>
          {value}
          {href && <ExternalLink size={13} className="inline ml-1 opacity-40" />}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [generating, setGenerating] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  function scrollPastHero() {
    const height = sectionRef.current?.offsetHeight ?? window.innerHeight;
    window.scrollTo({ top: height, behavior: 'smooth' });
  }

  async function handleDownloadPdf() {
    setGenerating(true);
    setPdfError(false);
    try {
      const { generateCvPdf } = await import('@/lib/generateCvPdf');
      await generateCvPdf();
    } catch {
      setPdfError(true);
    } finally {
      setGenerating(false);
    }
  }

  const contactItems = [
    personal.email && {
      icon: <Mail size={18} />,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    personal.phone && {
      icon: <Phone size={18} />,
      label: 'Teléfono',
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: <MapPin size={18} />,
      label: 'Ubicación',
      value: personal.location,
    },
    personal.linkedin && {
      icon: <Link2 size={18} />,
      label: 'LinkedIn',
      value: personal.linkedin.replace('https://', ''),
      href: personal.linkedin,
    },
    personal.github && {
      icon: <GitBranch size={18} />,
      label: 'GitHub',
      value: personal.github.replace('https://', ''),
      href: personal.github,
    },
    personal.web && {
      icon: <Globe size={18} />,
      label: 'Web',
      value: personal.web.replace('https://', ''),
      href: personal.web,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href?: string }[];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative px-6">
      <div className="max-w-4xl w-full">
        <div className="anim-hero-block">

          <div className="mb-6 flex items-center gap-4 anim-hero-title">
            <div className="w-1 h-16 bg-black flex-shrink-0" />
            <div>
              <p className="text-sm tracking-[0.3em] uppercase opacity-60 mb-1">
                {personal.title}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {personal.nameDisplay}
              </h1>
            </div>
          </div>

          <p className="anim-hero-subtitle text-lg md:text-xl max-w-2xl mb-4 leading-relaxed">
            {personal.subtitle}
          </p>

          <p className="anim-hero-desc text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
            {personal.description}
          </p>

          <div className="anim-hero-contacts grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {contactItems.map((item) => (
              <ContactItem key={item.label} {...item} />
            ))}
          </div>

          <div className="anim-hero-button mb-12">
            <button
              onClick={handleDownloadPdf}
              disabled={generating}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/20 text-sm hover:bg-black hover:text-white transition-all disabled:opacity-40 disabled:cursor-wait cursor-pointer"
            >
              <FileDown size={16} />
              {generating ? 'Generando PDF…' : 'Descargar CV en PDF'}
            </button>
            {pdfError && (
              <p className="mt-2 text-xs opacity-50">
                No se pudo generar el PDF. Inténtalo de nuevo.
              </p>
            )}
          </div>
        </div>

        <div className="anim-hero-chevron flex justify-center">
          <button
            onClick={scrollPastHero}
            aria-label="Ir al contenido"
            className="cursor-pointer"
          >
            <div className="anim-hero-bounce">
              <ChevronDown size={32} className="opacity-30 hover:opacity-70 transition-opacity" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const heroRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  async function handleDownloadPdf() {
    setGenerating(true);
    const { generateCvPdf } = await import('@/lib/generateCvPdf');
    await generateCvPdf();
    setGenerating(false);
  }
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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
    <motion.section
      ref={heroRef}
      style={{ opacity, scale }}
      className="min-h-screen flex items-center justify-center relative px-6"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-1 h-16 bg-black flex-shrink-0" />
            <div>
              <p className="text-sm tracking-[0.3em] uppercase opacity-60 mb-1">
                {personal.title}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {personal.nameDisplay}
              </h1>
            </div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl opacity-70 max-w-2xl mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {personal.subtitle}
          </motion.p>

          <motion.p
            className="text-base md:text-lg opacity-60 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personal.description}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {contactItems.map((item) => (
              <ContactItem key={item.label} {...item} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-12"
          >
            <button
              onClick={handleDownloadPdf}
              disabled={generating}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/20 text-sm hover:bg-black hover:text-white transition-all disabled:opacity-40 disabled:cursor-wait cursor-pointer"
            >
              <FileDown size={16} />
              {generating ? 'Generando PDF…' : 'Descargar CV en PDF'}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} className="opacity-30" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

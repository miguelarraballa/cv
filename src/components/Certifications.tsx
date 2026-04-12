'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import ExpandableSection from '@/components/ui/ExpandableSection';
import cvData from '@/data/cv.json';

const { certifications } = cvData;

function CertificationCard({
  name,
  issuer,
  year,
  hours,
  diplomaFile,
  certUrl,
}: {
  name: string;
  issuer: string;
  year: string;
  hours?: string;
  diplomaFile?: string;
  certUrl?: string;
}) {
  const [showDiploma, setShowDiploma] = useState(false);

  return (
    <div className="border border-black/10 hover:border-black/30 transition-all overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold mb-2 text-sm md:text-base leading-snug">{name}</h3>
        <div className="flex flex-wrap justify-between items-center gap-1 text-sm opacity-60 mb-3">
          <span>{issuer}</span>
          <div className="flex items-center gap-2">
            {hours && <span className="text-xs opacity-70">{hours}h</span>}
            <span>{year}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {diplomaFile && (
            <button
              onClick={() => setShowDiploma(!showDiploma)}
              className="text-xs px-3 py-1.5 border border-black/20 hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              {showDiploma ? 'Ocultar diploma' : 'Ver diploma'}
            </button>
          )}
          {certUrl && (
            <a
              href={certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 border border-black/20 hover:bg-black hover:text-white transition-all inline-flex items-center gap-1"
            >
              Verificar
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: showDiploma && diplomaFile ? 'auto' : 0,
          opacity: showDiploma && diplomaFile ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {diplomaFile && (
          <div className="p-4 pt-0">
            <div className="border border-black/10 bg-black/5">
              {diplomaFile.endsWith('.pdf') ? (
                <div className="relative">
                  <iframe
                    src={diplomaFile}
                    title={`Diploma: ${name}`}
                    className="w-full h-64 md:h-96"
                    loading="lazy"
                  />
                  <a
                    href={diplomaFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 text-xs px-2 py-1 bg-white border border-black/20 hover:bg-black hover:text-white transition-all inline-flex items-center gap-1"
                  >
                    Abrir PDF <ExternalLink size={11} />
                  </a>
                </div>
              ) : (
                <img
                  src={diplomaFile}
                  alt={`Diploma de ${name}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Group certifications by category for preview
const previewItems = certifications.slice(0, 6).map((c) => `${c.name} (${c.year})`);

export default function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  const preview = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 opacity-60 text-sm md:text-base">
      {previewItems.map((item) => (
        <p key={item}>• {item}</p>
      ))}
      {certifications.length > 6 && (
        <p className="opacity-60">• +{certifications.length - 6} más...</p>
      )}
    </div>
  );

  return (
    <ExpandableSection
      title="Formación No Reglada & Certificaciones"
      icon={<Award />}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded((v) => !v)}
      preview={preview}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {certifications.map((cert) => (
          <CertificationCard key={cert.name} {...cert} />
        ))}
      </div>
    </ExpandableSection>
  );
}

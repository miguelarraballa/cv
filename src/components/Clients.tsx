'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Section from '@/components/ui/Section';
import cvData from '@/data/cv.json';

const { clients } = cvData;

function ClientCard({ name, url, logo }: { name: string; url: string; logo?: string }) {
  const inner = (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center justify-center p-5 border border-black/10 hover:border-black/30 transition-all aspect-square bg-black/[0.1]"
    >
      {logo ? (
        <img
          src={`/${logo}`}
          alt={name}
          rel="nofollow"
          className="max-h-16 max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      ) : (
        <span className="font-bold opacity-40 group-hover:opacity-70 transition-opacity text-center text-sm md:text-base leading-tight">
          {name}
        </span>
      )}
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
        {inner}
      </a>
    );
  }
  return inner;
}

export default function Clients() {
  return (
    <Section title="Algunos Clientes Finales & Agencias" icon={<Users />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center">
        {clients.map((client) => (
          <ClientCard key={client.name} {...client} />
        ))}
      </div>
      <div className="mt-10 md:mt-12 pt-10 md:pt-12 border-t border-black/10 text-center">
        <p className="opacity-60 text-sm">
          Disponible para proyectos freelance y consultoría técnica
        </p>
      </div>
    </Section>
  );
}

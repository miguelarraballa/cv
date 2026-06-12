import { Users } from 'lucide-react';
import Section from '@/components/ui/Section';
import cvData from '@/data/cv.json';

const { clients } = cvData;

function LogoImage({ logo, name }: { logo: string; name: string }) {
  const isPng = logo.endsWith('.png');
  if (isPng) {
    const webp1x = `/${logo.replace(/\.png$/, '.webp')}`;
    const webp2x = `/${logo.replace(/\.png$/, '@2x.webp')}`;
    return (
      <picture>
        <source srcSet={`${webp1x} 1x, ${webp2x} 2x`} type="image/webp" />
        <img
          src={`/${logo}`}
          alt={name}
          loading="lazy"
          width={160}
          height={64}
          className="max-h-16 max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </picture>
    );
  }
  return (
    <img
      src={`/${logo}`}
      alt={name}
      loading="lazy"
      width={160}
      height={64}
      className="max-h-16 max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
    />
  );
}

function ClientCard({ name, url, logo }: { name: string; url: string; logo?: string }) {
  const inner = (
    <div className="group flex items-center justify-center p-5 border border-black/10 hover:border-black/30 hover:scale-[1.04] transition-all duration-200 aspect-square bg-black/[0.1]">
      {logo ? (
        <LogoImage logo={logo} name={name} />
      ) : (
        <span className="font-bold opacity-40 group-hover:opacity-70 transition-opacity text-center text-sm md:text-base leading-tight">
          {name}
        </span>
      )}
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer nofollow" aria-label={name}>
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
    </Section>
  );
}

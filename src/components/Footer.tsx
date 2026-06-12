import cvData from '@/data/cv.json';

const { personal } = cvData;

const BUILD_DATE = new Date().toLocaleDateString('es-ES', {
  month: 'long',
  year: 'numeric',
});

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 md:py-12 px-6 text-center border-t border-black/10 space-y-1">
      <p className="text-sm opacity-40">
        © {year} {personal.name}. Desarrollado con Next.js y Tailwind CSS.
      </p>
      <p className="text-xs opacity-25">
        Actualizado: {BUILD_DATE}
      </p>
    </footer>
  );
}

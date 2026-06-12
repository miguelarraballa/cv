import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Contenido no autorizado en X — Miguel Arrabal",
  description: "Miguel Arrabal no autoriza la difusión de su contenido en X (antes Twitter).",
  robots: { index: false, follow: false },
};

export default function NoX() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="max-w-xl w-full py-20">

        <div className="mb-10 flex items-center gap-4">
          <div className="w-1 h-16 bg-black flex-shrink-0" />
          <div>
            <p className="text-sm tracking-[0.3em] uppercase opacity-40 mb-1">Aviso</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Este contenido se está compartiendo en X sin mi autorización
            </h1>
          </div>
        </div>

        <div className="space-y-5 opacity-70 leading-relaxed text-base md:text-lg mb-12">
          <p>
            He tomado la decisión personal de no estar presente en <strong>X</strong> ni de
            permitir que mi contenido circule en esa plataforma. No es un rechazo a quien la usa:
            es una posición que tiene que ver con mis propios valores y con el tipo de espacios en
            los que elijo participar.
          </p>
          <p>
            Si te ha llegado este enlace desde X y tienes interés en mi perfil profesional,
            puedes acceder directamente aquí abajo. Y si quieres compartirlo con alguien, te
            agradecería que lo hicieras por otro canal — LinkedIn, correo o como mejor te venga.
          </p>
          <p>
            Gracias por entenderlo.
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/20 text-sm hover:bg-black hover:text-white transition-all"
        >
          <ArrowLeft size={16} />
          Ver el CV
        </a>

      </div>
    </main>
  );
}

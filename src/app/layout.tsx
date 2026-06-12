import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://miguelarrabal.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Miguel Arrabal — Programador Full Stack",
  description:
    "CV online de Miguel Antonio Arrabal López-Ángulo. Programador Full Stack especializado en PHP, Laravel, WordPress y Python. Más de 20 años de experiencia en desarrollo web.",
  keywords: ["programador", "full stack", "PHP", "Laravel", "WordPress", "Python", "Málaga"],
  authors: [{ name: "Miguel Antonio Arrabal López-Ángulo" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Miguel Arrabal — Programador Full Stack",
    description:
      "CV online de Miguel Antonio Arrabal López-Ángulo. Programador Full Stack especializado en PHP, Laravel y WordPress.",
    url: siteUrl,
    siteName: "Miguel Arrabal",
    locale: "es_ES",
    type: "profile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Miguel Arrabal — Programador Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Este enlace se comparte sin autorización del autor",
    description:
      "Miguel Arrabal no autoriza la difusión de su contenido en X. Haz clic para conocer los motivos.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://www.linkedin.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:text-sm focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}

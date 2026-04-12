import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miguel Arrabal — Programador Full Stack",
  description:
    "CV online de Miguel Antonio Arrabal López-Ángulo. Programador Full Stack especializado en PHP, Laravel, WordPress y Python. Más de 20 años de experiencia en desarrollo web.",
  keywords: ["programador", "full stack", "PHP", "Laravel", "WordPress", "Python", "Málaga"],
  authors: [{ name: "Miguel Antonio Arrabal López-Ángulo" }],
  openGraph: {
    title: "Miguel Arrabal — Programador Full Stack",
    description:
      "CV online de Miguel Antonio Arrabal López-Ángulo. Programador Full Stack especializado en PHP, Laravel y WordPress.",
    locale: "es_ES",
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

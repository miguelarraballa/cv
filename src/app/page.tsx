import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import SkillsPortfolio from "@/components/SkillsPortfolio";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import Clients from "@/components/Clients";
import Languages from "@/components/Languages";
import Availability from "@/components/Availability";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import DotNav from "@/components/DotNav";
import MobileNav from "@/components/MobileNav";
import BackToTop from "@/components/BackToTop";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateModified": new Date().toISOString(),
  "mainEntity": {
    "@type": "Person",
    "@id": "https://miguelarrabal.es/#person",
    "name": "Miguel Antonio Arrabal López-Ángulo",
    "alternateName": "Miguel Arrabal",
    "jobTitle": "Programador Full Stack",
    "description": "Programador full stack con más de 20 años de experiencia desarrollando soluciones web a medida. Especializado en PHP, Laravel, WordPress y Python.",
    "url": "https://miguelarrabal.es",
    "email": "info@mdmgdesarrolloweb.com",
    "telephone": "+34654828896",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Málaga",
      "addressCountry": "ES"
    },
    "sameAs": [
      "https://www.linkedin.com/in/miguelarrabal/",
      "https://github.com/miguelarraballa",
      "https://mdmgdesarrolloweb.com"
    ],
    "knowsAbout": [
      "PHP", "Laravel", "WordPress", "Python", "React", "Next.js",
      "MySQL", "REST API", "JavaScript", "Git", "Linux"
    ],
    "knowsLanguage": [
      { "@type": "Language", "name": "Español" },
      { "@type": "Language", "name": "Inglés" }
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="min-h-screen bg-white text-black">
        <SideNav />
        <DotNav />
        <MobileNav />
        <BackToTop />
        <Hero />
        <Technologies />
        <SkillsPortfolio />
        <Education />
        <Certifications />
        <Experience />
        <Languages />
        <Clients />
        <Availability />
        <Footer />
      </main>
    </>
  );
}

import Hero from "@/components/Hero";
import SkillsPortfolio from "@/components/SkillsPortfolio";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Experience from "@/components/Experience";
import Clients from "@/components/Clients";
import Languages from "@/components/Languages";
import Footer from "@/components/Footer";
import ScrollSectionIndicator from "@/components/ScrollSectionIndicator";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <ScrollSectionIndicator />
      <Hero />
      <SkillsPortfolio />
      <Education />
      <Certifications />
      <Experience />
      <Languages />
      <Clients />
      <Footer />
    </main>
  );
}

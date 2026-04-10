import Hero from "@/components/Hero";
import AIServices from "@/components/AIServices";
import ProjectsWeb from "@/components/ProjectsWeb";
import ProjectsCrypto from "@/components/ProjectsCrypto";
import Contact from "@/components/Contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import AuroraBackground from "@/components/AuroraBackground";
import LightMeshBackground from "@/components/LightMeshBackground";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <LightMeshBackground />
      <ParticlesBackground />
      <ThemeToggle />
      <div className="relative z-10">
        <Hero />
        <AIServices />
        <ProjectsWeb />
        <ProjectsCrypto />
        <Contact />
      </div>
    </main>
  );
}

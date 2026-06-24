import Hero from "@/components/Hero";
import AIServices from "@/components/AIServices";
import ProjectsWeb from "@/components/ProjectsWeb";
import ProjectsCrypto from "@/components/ProjectsCrypto";
import Contact from "@/components/Contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import AuroraBackground from "@/components/AuroraBackground";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <ParticlesBackground />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <div className="section-dark">
          <AIServices />
        </div>
        <ProjectsCrypto />
        <div className="section-dark">
          <ProjectsWeb />
        </div>
        <Contact />
      </div>
    </main>
  );
}

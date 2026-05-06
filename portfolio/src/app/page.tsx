import Hero from "@/components/Hero";
import AIServices from "@/components/AIServices";
import ProjectsWeb from "@/components/ProjectsWeb";
import ProjectsCrypto from "@/components/ProjectsCrypto";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AIServices />
      <ProjectsCrypto />
      <ProjectsWeb />
      <Contact />
    </main>
  );
}

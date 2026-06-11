import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ModulesGrid from "@/components/sections/ModulesGrid";
import Architecture from "@/components/sections/Architecture";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <ModulesGrid />
        <Architecture />
      </main>
      <Footer />
    </>
  );
}

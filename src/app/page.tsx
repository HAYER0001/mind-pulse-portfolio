import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import InteractiveMenu from "@/components/sections/InteractiveMenu";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";
import Architecture from "@/components/sections/Architecture";
import LiveMetrics from "@/components/sections/LiveMetrics";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <div className="py-16" />
        <InteractiveMenu />
        <div className="py-16" />
        <ParallaxShowcase />
        <div className="py-16" />
        <Architecture />
        <div className="py-16" />
        <LiveMetrics />
      </main>
      <Footer />
    </>
  );
}

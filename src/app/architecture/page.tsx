import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParallaxShowcase from "@/components/sections/ParallaxShowcase";
import Architecture from "@/components/sections/Architecture";
import LiveMetrics from "@/components/sections/LiveMetrics";

export default function ArchitecturePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <div className="py-12" />
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

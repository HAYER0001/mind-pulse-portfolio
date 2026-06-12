import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewHero from "@/components/sections/NewHero";
import AudienceFeatures from "@/components/sections/AudienceFeatures";
import ValueProposition from "@/components/sections/ValueProposition";
import DashboardReveal from "@/components/sections/DashboardReveal";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <NewHero />
        <AudienceFeatures />
        <ValueProposition />
        <DashboardReveal />
        <InfiniteMarquee />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

import ScrollProvider from "@/components/ScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Pillars from "@/components/sections/Pillars";
import Impact from "@/components/sections/Impact";
import Programs from "@/components/sections/Programs";
import Timeline from "@/components/sections/Timeline";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <ScrollProvider>
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <Mission />
        <Pillars />
        <Impact />
        <Programs />
        <Timeline />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </ScrollProvider>
  );
}

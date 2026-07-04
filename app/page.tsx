import ScrollProvider from "@/components/ScrollProvider";
import CanvasStage from "@/components/three/CanvasStage";
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
      {/* Fixed 3D golden ring — visible at the top, fades out on scroll */}
      <CanvasStage />

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

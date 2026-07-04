import Kicker from "@/components/ui/Kicker";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const lines = [
  "We believe every student deserves the tools to build the future — not just consume it.",
  "Through workshops, events, and student-run chapters, we teach coding, AI, and robotics as living skills.",
  "The goal isn't a certificate. It's a generation of confident, creative technical leaders.",
];

export default function Mission() {
  return (
    <section
      id="mission"
      className="section-anchor relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:py-44"
    >
      <div className="flex justify-center">
        <Kicker>Our Mission</Kicker>
      </div>

      <Reveal delay={0.05}>
        <h2 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-section)] font-semibold leading-[1.08] tracking-tight">
          Turning curiosity into{" "}
          <span className="gold-text">capability</span>.
        </h2>
      </Reveal>

      <Stagger className="mx-auto mt-12 flex max-w-2xl flex-col gap-6">
        {lines.map((l, i) => (
          <StaggerItem key={i}>
            <p className="text-lg leading-relaxed text-[color:var(--color-muted)]">
              {l}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

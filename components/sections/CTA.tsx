import Kicker from "@/components/ui/Kicker";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

const paths = [
  {
    title: "Join",
    blurb: "Students — enroll in a program and start building this term.",
    cta: "Become a member",
    href: `mailto:${site.email}?subject=Join%20Code2Conquer`,
  },
  {
    title: "Volunteer",
    blurb: "Mentors — share your skills and shape the next generation.",
    cta: "Mentor with us",
    href: `mailto:${site.email}?subject=Volunteer%20with%20Code2Conquer`,
  },
  {
    title: "Partner",
    blurb: "Schools & sponsors — bring a chapter to your community.",
    cta: "Start a chapter",
    href: `mailto:${site.email}?subject=Partner%20with%20Code2Conquer`,
  },
];

export default function CTA() {
  return (
    <section
      id="cta"
      className="section-anchor relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-16 text-center md:pt-24"
    >
      <div className="flex justify-center">
        <Kicker>Get Involved</Kicker>
      </div>

      <Reveal delay={0.05}>
        <h2 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--font-display)] text-[length:var(--text-hero)] font-semibold leading-[1.03] tracking-tight">
          Build the future with{" "}
          <span className="gold-text">Code2Conquer</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[color:var(--color-muted)]">
          Whether you code, mentor, or lead — there&apos;s a place for you in the
          movement.
        </p>
      </Reveal>

      <Stagger className="mt-16 grid gap-4 md:grid-cols-3">
        {paths.map((p) => (
          <StaggerItem key={p.title}>
            <div className="flex h-full flex-col rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 p-7 text-left backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--color-gold)]/60">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-faint)]">
                {p.blurb}
              </p>
              <div className="mt-6">
                <Button href={p.href} variant="ghost" className="w-full">
                  {p.cta}
                </Button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

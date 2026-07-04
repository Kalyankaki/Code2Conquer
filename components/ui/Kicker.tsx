import { Reveal } from "./Reveal";

/** Small uppercase label with a gold tick — used above section headings. */
export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.28em] text-[color:var(--color-faint)]">
        <span className="h-px w-8 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent" />
        {children}
      </span>
    </Reveal>
  );
}

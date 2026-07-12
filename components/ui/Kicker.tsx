import { Reveal } from "./Reveal";

/**
 * Small uppercase section label, preceded by a vertical connector line + node.
 * The connectors repeat above each section heading to form a subtle "spine"
 * that threads the page together as you scroll.
 */
export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <span className="flex flex-col items-center gap-2.5">
        {/* connector line + glowing node */}
        <span className="h-12 w-px bg-gradient-to-b from-transparent to-[color:var(--color-gold)]/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-gold)] shadow-[0_0_10px_2px_rgba(212,175,55,0.55)]" />
        <span className="mt-1.5 inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.28em] text-[color:var(--color-faint)]">
          {children}
        </span>
      </span>
    </Reveal>
  );
}

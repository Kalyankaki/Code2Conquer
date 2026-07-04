import Link from "next/link";
import { site, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--color-border)] bg-[#0a0a0a]/80 backdrop-blur-sm">
      {/* subtle particle-like top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-gold)]/50">
              <span className="gold-text font-[family-name:var(--font-display)] font-bold">
                C
              </span>
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold">
              Code<span className="gold-text">2</span>Conquer
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color:var(--color-faint)]">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-gold)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            Connect
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-gold)]"
              >
                {site.email}
              </a>
            </li>
            {Object.entries(site.socials).map(([k, url]) => (
              <li key={k}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm capitalize text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-gold)]"
                >
                  {k}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-[color:var(--color-border)] px-6 py-6 text-xs text-[color:var(--color-faint)] sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. A student-led STEM initiative.</p>
        <p>Built by students, for students.</p>
      </div>
    </footer>
  );
}

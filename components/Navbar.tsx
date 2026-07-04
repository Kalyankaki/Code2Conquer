"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { clsx } from "@/lib/clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-6",
          scrolled
            ? "glass hairline py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]"
            : "border border-transparent py-2.5",
        )}
      >
        <Link href="#hero" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-gold)]/50 bg-[#0d0d0d]">
            <span className="gold-text font-[family-name:var(--font-display)] text-sm font-bold">
              C
            </span>
          </span>
          <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight">
            Code<span className="gold-text">2</span>Conquer
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-[color:var(--color-faint)] transition-colors hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#cta"
            className="hidden rounded-full bg-gradient-to-b from-[#e6c65a] to-[#c39a2b] px-5 py-2 text-sm font-medium text-[#0d0d0d] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Join
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full hairline md:hidden"
          >
            <span className="text-lg">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <div className="glass hairline flex flex-col gap-1 rounded-2xl p-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-[color:var(--color-muted)] hover:bg-white/5"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

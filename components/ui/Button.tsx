import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "gold" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "gold",
  className,
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

  const styles: Record<Variant, string> = {
    gold: "bg-gradient-to-b from-[#e6c65a] to-[#c39a2b] text-[#0d0d0d] hover:shadow-[0_0_36px_-6px_rgba(212,175,55,0.7)] hover:-translate-y-0.5",
    ghost:
      "hairline text-[color:var(--color-muted)] hover:text-white hover:border-[color:var(--color-gold)] hover:-translate-y-0.5",
  };

  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

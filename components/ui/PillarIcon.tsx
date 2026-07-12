/** Line icons for the four pillars. Stroke uses currentColor. */
export default function PillarIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const common = {
    className,
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "coding":
      return (
        <svg {...common}>
          <path d="M8 8l-4 4 4 4" />
          <path d="M16 8l4 4-4 4" />
          <path d="M13 5l-2 14" />
        </svg>
      );
    case "ai":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <path d="M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
      );
    case "robotics":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="14" height="11" rx="2.5" />
          <path d="M12 8V5" />
          <circle cx="12" cy="3.8" r="1.15" fill="currentColor" stroke="none" />
          <circle cx="9.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
          <path d="M2 12v3M22 12v3" />
        </svg>
      );
    case "leadership":
      return (
        <svg {...common}>
          <path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7L12 3z" />
        </svg>
      );
    default:
      return null;
  }
}

"use client";

import { motion, type Variants } from "framer-motion";
import { clsx } from "@/lib/clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "h2" | "p";
};

/** Fade + slide-up on scroll into view. Cinematic easing, once. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Wrap a list of children to stagger them in. Use <Stagger.Item> for each. */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A single staggered child. Exported standalone (not as `Stagger.Item`) because
 * static properties on a client component don't cross the RSC server boundary.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={item} className={clsx(className)}>
      {children}
    </motion.div>
  );
}

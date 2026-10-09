"use client";

import { motion } from "motion/react";

const blobs = [
  {
    className:
      "left-[-20%] top-[-15%] size-[70vmax] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-secondary)_32%,transparent),transparent)]",
    x: [0, 60, -20, 0],
    y: [0, 40, 80, 0],
    duration: 26,
  },
  {
    className:
      "right-[-25%] top-[10%] size-[60vmax] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-primary)_26%,transparent),transparent)]",
    x: [0, -70, -10, 0],
    y: [0, 60, -30, 0],
    duration: 32,
  },
  {
    className:
      "bottom-[-30%] left-[15%] size-[65vmax] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-accent)_14%,transparent),transparent)]",
    x: [0, 50, -40, 0],
    y: [0, -50, -10, 0],
    duration: 38,
  },
];

/** Slowly drifting soft color fields behind everything. Uses gradients (no CSS blur) for mobile performance. */
export function AuroraGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--theme-background-alt),transparent_70%)]" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full will-change-transform ${b.className}`}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_120%,transparent_40%,color-mix(in_oklab,var(--theme-background)_80%,black))]" />
    </div>
  );
}

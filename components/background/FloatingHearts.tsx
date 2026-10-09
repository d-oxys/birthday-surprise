"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { config } from "@/lib/content";
import { seeded } from "@/lib/utils";

const HEARTS = Array.from({ length: 9 }, (_, i) => ({
  left: 4 + seeded(i + 1) * 92,
  size: 10 + seeded(i + 11) * 14,
  duration: 16 + seeded(i + 21) * 12,
  delay: seeded(i + 31) * 14,
  sway: 14 + seeded(i + 41) * 26,
  tone: i % 3,
}));

const tones = ["text-primary/45", "text-secondary/40", "text-accent/35"];

/** A few hearts drifting upward. Kept sparse on purpose so it never fights the content. */
export function FloatingHearts({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();
  if (!config.animation.floatingHearts || reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {HEARTS.map((h, i) => (
            <motion.span
              key={i}
              className={`absolute bottom-[-40px] ${tones[h.tone]}`}
              style={{ left: `${h.left}%` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "-115vh", x: [0, h.sway, -h.sway, 0], opacity: [0, 0.9, 0.9, 0], rotate: [-10, 10, -6] }}
              transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
            >
              <Heart fill="currentColor" strokeWidth={0} style={{ width: h.size, height: h.size }} />
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

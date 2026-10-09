"use client";

import { AnimatePresence, motion } from "motion/react";

/** A number where each digit rolls independently when it changes. */
export function RollingNumber({ value, minDigits = 2 }: { value: number; minDigits?: number }) {
  const digits = String(value).padStart(minDigits, "0").split("");

  return (
    <span className="inline-flex">
      {digits.map((digit, i) => (
        // Key by position from the right so "100" → "99" keeps the ones/tens slots stable.
        <span key={digits.length - i} className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={digit}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

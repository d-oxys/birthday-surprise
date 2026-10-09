"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SceneHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/** Consistent eyebrow + display title + subtitle used at the top of each scene. */
export function SceneHeader({ eyebrow, title, subtitle, className }: SceneHeaderProps) {
  return (
    <header className={cn("text-center", className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-accent uppercase"
        >
          <Sparkles aria-hidden className="size-3.5" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        data-scene-focus
        tabIndex={-1}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl leading-[1.05] font-medium text-balance text-ink outline-none text-glow sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mx-auto mt-4 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}

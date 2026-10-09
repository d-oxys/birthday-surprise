"use client";

import { motion } from "motion/react";
import { config } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ProgressNavProps {
  current: number;
  visited: number;
  onSelect: (index: number) => void;
}

/** Step indicator. Steps already reached can be revisited; future steps stay locked. */
export function ProgressNav({ current, visited, onSelect }: ProgressNavProps) {
  return (
    <motion.nav
      aria-label={config.ui.progressLabel}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="glass flex items-center rounded-full px-2 py-1 shadow-lg shadow-black/20"
    >
      <ol className="flex items-center">
        {config.ui.stepLabels.map((label, i) => {
          const isCurrent = i === current;
          const reachable = i <= visited;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!reachable || isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={label}
                title={label}
                className="grid h-9 min-w-7 place-items-center px-1 disabled:cursor-default"
              >
                <motion.span
                  layout
                  className={cn(
                    "block h-1.5 rounded-full transition-colors duration-500",
                    isCurrent ? "w-6 bg-primary" : reachable ? "w-1.5 bg-ink/60 hover:bg-ink" : "w-1.5 bg-ink/20",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}

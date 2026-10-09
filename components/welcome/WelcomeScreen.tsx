"use client";

import { motion } from "motion/react";
import { Gift, Headphones, Heart } from "lucide-react";
import { config, fill } from "@/lib/content";
import { MagicButton } from "@/components/ui/MagicButton";

const ease = [0.22, 1, 0.36, 1] as const;

/** Opening scene: glowing orb, orbiting lights and a letter-by-letter greeting. */
export function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  const greeting = fill(config.welcome.greeting);
  const words = greeting.split(" ");
  // Index of the first letter of each word, so every letter gets its own stagger delay.
  const wordStarts = words.map((_, w) => words.slice(0, w).reduce((n, word) => n + word.length, 0));
  const lettersEnd = 0.7 + greeting.length * 0.045;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
      <Orb />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease }}
        className="mt-10 text-xs font-semibold tracking-[0.3em] text-accent uppercase sm:text-sm"
      >
        {fill(config.welcome.eyebrow)}
      </motion.p>

      <h1
        aria-label={greeting}
        className="mt-4 max-w-4xl font-display text-6xl leading-[0.95] font-medium text-ink italic text-glow sm:text-7xl md:text-8xl"
      >
        {words.map((word, w) => (
          <span key={w} aria-hidden className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => {
              const i = wordStarts[w] + c;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.7 + i * 0.045, duration: 0.8, ease }}
                >
                  {char}
                </motion.span>
              );
            })}
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lettersEnd, duration: 0.9, ease }}
        className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg"
      >
        {fill(config.welcome.subtitle)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: lettersEnd + 0.35, duration: 0.8, ease }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <MagicButton onClick={onOpen} icon={<Gift />} className="px-9 text-base">
          {fill(config.welcome.button)}
        </MagicButton>
        {config.music.enabled && config.welcome.hint && (
          <p className="inline-flex items-center gap-2 text-xs text-muted/80">
            <Headphones aria-hidden className="size-3.5" />
            {config.welcome.hint}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function Orb() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease }}
      className="relative grid size-40 place-items-center sm:size-48"
    >
      {/* soft halo */}
      <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-glow)_35%,transparent),transparent)]" />

      {/* rotating light ring */}
      <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0%,var(--theme-primary)_12%,transparent_30%,var(--theme-accent)_50%,transparent_68%,var(--theme-secondary)_85%,transparent_100%)] mask-[radial-gradient(closest-side,transparent_calc(100%-2px),black_calc(100%-1.5px))] opacity-80" />

      {/* orbiting dots */}
      {[
        { size: "inset-[-14%]", dur: 9, dot: "bg-accent shadow-[0_0_12px_2px_var(--theme-accent)]", reverse: false },
        { size: "inset-[-30%]", dur: 14, dot: "bg-primary shadow-[0_0_12px_2px_var(--theme-primary)]", reverse: true },
      ].map((o, i) => (
        <motion.div
          key={i}
          className={`absolute ${o.size} rounded-full border border-ink/6`}
          animate={{ rotate: o.reverse ? -360 : 360 }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
        >
          <span className={`absolute top-0 left-1/2 size-2 -translate-1/2 rounded-full ${o.dot}`} />
        </motion.div>
      ))}

      {/* core */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid size-24 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--theme-decoration),color-mix(in_oklab,var(--theme-primary)_80%,var(--theme-secondary))_55%,color-mix(in_oklab,var(--theme-secondary)_60%,var(--theme-background))_100%)] shadow-[0_0_60px_10px_color-mix(in_oklab,var(--theme-glow)_45%,transparent)] sm:size-28"
      >
        <Heart className="size-9 text-on-primary/80" fill="currentColor" strokeWidth={0} />
      </motion.div>
    </motion.div>
  );
}

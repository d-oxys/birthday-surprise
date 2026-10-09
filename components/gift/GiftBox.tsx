"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { config, fill } from "@/lib/content";
import { burst, originFromElement } from "@/lib/confetti";
import { cn, seeded } from "@/lib/utils";
import { MagicButton } from "@/components/ui/MagicButton";
import { SceneHeader } from "@/components/ui/SceneHeader";

const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2 + seeded(i) * 0.5;
  const dist = 70 + seeded(i + 7) * 60;
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 30, size: 8 + seeded(i + 3) * 8 };
});

/** Scene 2 — a gift that needs a few taps of encouragement before it bursts open. */
export function GiftBox({ onNext }: { onNext: () => void }) {
  const hints = config.gift.hints.length ? config.gift.hints : ["Tap the gift"];
  const needed = hints.length;
  const [taps, setTaps] = useState(0);
  const opened = taps >= needed;
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const handleTap = () => {
    if (opened) return;
    const next = taps + 1;
    setTaps(next);

    if (next < needed) {
      const s = 4 + (next / needed) * 10; // shake harder every tap
      if (!reduce) {
        animate(
          scope.current,
          { rotate: [0, -s, s, -s * 0.7, s * 0.5, 0], y: [0, -6 * next, 0, -3, 0], scale: [1, 1.05, 0.98, 1.02, 1] },
          { duration: 0.6, ease: "easeInOut" },
        );
      }
    } else {
      if (!reduce) {
        animate(scope.current, { scale: [1, 0.9, 1.08, 1], y: [0, 8, -4, 0] }, { duration: 0.5 });
      }
      window.setTimeout(() => burst(originFromElement(buttonRef.current), 1.4), 220);
    }
  };

  const lidState = opened ? "open" : taps === needed - 1 && needed > 1 ? "loose" : "closed";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <SceneHeader
        title={opened ? fill(config.gift.openedTitle) : fill(config.gift.title)}
        subtitle={opened ? fill(config.gift.openedSubtitle) : fill(config.gift.subtitle)}
        key={opened ? "opened" : "closed"}
      />

      <div className="relative mt-14 mb-6 grid h-72 w-full max-w-sm place-items-center sm:h-80">
        {/* light rays when opened */}
        <AnimatePresence>
          {opened && (
            <motion.div
              aria-hidden
              className="absolute top-1/2 left-1/2 size-[min(130vw,560px)] -translate-1/2"
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1, rotate: 40 }}
              transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, rotate: { duration: 30, ease: "linear" } }}
            >
              <div className="size-full rounded-full bg-[repeating-conic-gradient(from_0deg,color-mix(in_oklab,var(--theme-accent)_30%,transparent)_0deg_6deg,transparent_6deg_22deg)] mask-[radial-gradient(closest-side,black_20%,transparent_100%)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* rising star */}
        <AnimatePresence>
          {opened && (
            <motion.div
              aria-hidden
              className="absolute top-1/2 left-1/2 z-10 -translate-1/2 text-accent"
              initial={{ y: 20, scale: 0, opacity: 0 }}
              animate={{ y: -110, scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 120, damping: 12 }}
            >
              <motion.div animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <Star className="size-14 drop-shadow-[0_0_18px_var(--theme-accent)]" fill="currentColor" strokeWidth={0} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={buttonRef}
          type="button"
          onClick={handleTap}
          disabled={opened}
          aria-label={opened ? fill(config.gift.openedTitle) : `${hints[taps]} (${taps + 1}/${needed})`}
          className="group relative animate-float rounded-3xl p-4 outline-offset-8 disabled:cursor-default"
        >
          <span ref={scope} className="relative block h-44 w-48 sm:h-48 sm:w-56">
            {/* ground glow */}
            <span aria-hidden className="absolute inset-x-2 -bottom-5 block h-8 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-glow)_55%,transparent),transparent)]" />

            {/* inner light leaking out */}
            <motion.span
              aria-hidden
              className="absolute inset-x-[10%] top-[18%] block h-24 rounded-full bg-[radial-gradient(closest-side,var(--theme-decoration),color-mix(in_oklab,var(--theme-accent)_60%,transparent),transparent)]"
              initial={false}
              animate={{ opacity: opened ? 1 : taps > 0 ? 0.25 * taps : 0, scale: opened ? 1.6 : 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* box body */}
            <span className="absolute inset-x-[7%] bottom-0 block h-[68%] overflow-hidden rounded-t-md rounded-b-2xl bg-linear-to-b from-primary to-[color-mix(in_oklab,var(--theme-primary)_55%,var(--theme-secondary))] shadow-[inset_0_-14px_30px_rgba(0,0,0,0.18),0_24px_50px_-12px_rgba(0,0,0,0.5)]">
              <span className="absolute inset-y-0 left-1/2 block w-[17%] -translate-x-1/2 bg-linear-to-b from-accent to-[color-mix(in_oklab,var(--theme-accent)_70%,var(--theme-primary))]" />
              <span className="absolute inset-0 block bg-[linear-gradient(115deg,rgba(255,255,255,0.28),transparent_35%)]" />
              {/* polka dots */}
              {[18, 78, 30, 70].map((left, i) => (
                <span
                  key={i}
                  className="absolute block size-2 rounded-full bg-paper/40"
                  style={{ left: `${left}%`, top: `${30 + (i % 2) * 35}%` }}
                />
              ))}
            </span>

            {/* lid + bow */}
            <motion.span
              className="absolute inset-x-0 top-[22%] z-10 block h-[17%]"
              initial={false}
              animate={lidState}
              variants={{
                closed: { y: 0, x: 0, rotate: 0, opacity: 1 },
                loose: { y: -10, x: 0, rotate: -4, opacity: 1 },
                open: { y: -230, x: 90, rotate: 38, opacity: 0 },
              }}
              transition={lidState === "open" ? { duration: 1, ease: [0.3, 0.7, 0.4, 1] } : { type: "spring", stiffness: 300, damping: 12 }}
            >
              <span className="absolute inset-0 block rounded-lg bg-linear-to-b from-[color-mix(in_oklab,var(--theme-primary)_80%,white)] to-primary shadow-[0_6px_14px_-4px_rgba(0,0,0,0.35)]">
                <span className="absolute inset-y-0 left-1/2 block w-[15%] -translate-x-1/2 bg-accent" />
              </span>
              {/* bow */}
              <motion.span
                className="absolute bottom-[88%] left-1/2 block h-12 w-28 -translate-x-1/2"
                initial={false}
                animate={{ scale: taps > 0 && !opened ? [1, 1.15, 1] : 1, rotate: taps * -3 }}
                transition={{ duration: 0.4 }}
              >
                <span className="absolute top-2 left-1 block h-9 w-12 -rotate-[24deg] rounded-[50%] border-[7px] border-accent" />
                <span className="absolute top-2 right-1 block h-9 w-12 rotate-[24deg] rounded-[50%] border-[7px] border-accent" />
                <span className="absolute bottom-0 left-1/2 block size-5 -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--theme-accent)_80%,black)]" />
              </motion.span>
            </motion.span>

            {/* sparks on every tap */}
            {taps > 0 && !reduce && (
              <span key={taps} aria-hidden className="pointer-events-none absolute top-1/3 left-1/2 block">
                {SPARKS.map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute block text-accent"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                    animate={{ x: s.x, y: s.y, opacity: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Star fill="currentColor" strokeWidth={0} style={{ width: s.size, height: s.size }} />
                  </motion.span>
                ))}
              </span>
            )}
          </span>
        </button>
      </div>

      <div className="flex min-h-28 flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex flex-col items-center gap-3"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={taps}
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-base font-medium text-ink"
                >
                  {hints[taps]}
                </motion.p>
              </AnimatePresence>
              <div className="flex gap-2" aria-hidden>
                {hints.map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-1.5 rounded-full transition-all duration-500", i < taps ? "w-6 bg-primary" : "w-1.5 bg-ink/25")}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              onAnimationComplete={() => nextRef.current?.focus({ preventScroll: true })}
            >
              <MagicButton ref={nextRef} onClick={onNext} iconAfter={<ArrowRight />}>
                {fill(config.gift.button)}
              </MagicButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

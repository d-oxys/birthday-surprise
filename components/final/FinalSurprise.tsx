"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, PartyPopper, RotateCcw, Wind } from "lucide-react";
import { config, fill } from "@/lib/content";
import { burst, celebrate, fireworks, originFromElement } from "@/lib/confetti";
import { MagicButton } from "@/components/ui/MagicButton";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Cake } from "./Cake";

interface FinalSurpriseProps {
  onReplay: () => void;
  onReread: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Scene 6 — blow out the candles, then the grand finale. */
export function FinalSurprise({ onReplay, onReread }: FinalSurpriseProps) {
  const count = Math.min(9, Math.max(1, Math.round(config.finale.candles)));
  const [candlesOut, setCandlesOut] = useState<boolean[]>(() => Array(count).fill(false));
  const [celebrating, setCelebrating] = useState(false);
  const allOut = candlesOut.every(Boolean);
  const confettiRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Short pause after the last candle so the smoke can be seen, then the finale.
  useEffect(() => {
    if (!allOut || celebrating) return;
    const t = setTimeout(() => setCelebrating(true), 1100);
    return () => clearTimeout(t);
  }, [allOut, celebrating]);

  useEffect(() => {
    if (!celebrating) return;
    burst({ x: 0.5, y: 0.4 }, 1.6);
    const stopCannons = celebrate(3000);
    const stopFireworks = fireworks(5000);
    const focus = setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 800);
    return () => {
      stopCannons();
      stopFireworks();
      clearTimeout(focus);
    };
  }, [celebrating]);

  const blow = (i: number) => setCandlesOut((prev) => prev.map((out, j) => out || j === i));
  const blowAll = () => setCandlesOut((prev) => prev.map(() => true));
  const finalTitle = fill(config.finale.finalTitle);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
      <AnimatePresence mode="popLayout">
        {!celebrating && (
          <motion.div key="intro" exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}>
            <SceneHeader eyebrow={config.finale.eyebrow} title={fill(config.finale.title)} subtitle={fill(config.finale.instruction)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ layout: { duration: 0.9, ease } }}
        animate={{ scale: celebrating ? 0.72 : 1 }}
        className="relative mt-10"
      >
        <span aria-hidden className="absolute inset-x-[-30%] top-[10%] bottom-[-20%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-glow)_22%,transparent),transparent)]" />
        <Cake
          candlesOut={candlesOut}
          onBlow={blow}
          disabled={celebrating}
          labelFor={(i) => `Blow out candle ${i + 1} of ${count}`}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {!celebrating ? (
          <motion.div
            key="blow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex min-h-12 flex-col items-center gap-3"
          >
            {allOut ? (
              <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-hand text-3xl text-accent" aria-live="polite">
                {config.finale.wishMade}
              </motion.p>
            ) : (
              <MagicButton variant="ghost" icon={<Wind />} onClick={blowAll}>
                {config.finale.blowAllButton}
              </MagicButton>
            )}
          </motion.div>
        ) : (
          <motion.div key="finale" className="relative -mt-2 flex max-w-2xl flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-hand text-2xl text-accent sm:text-3xl"
            >
              {config.finale.wishMade}
            </motion.p>

            <h2
              ref={titleRef}
              tabIndex={-1}
              aria-label={finalTitle}
              className="mt-3 font-display text-5xl leading-[1.02] font-semibold text-balance italic outline-none sm:text-7xl md:text-8xl"
            >
              {finalTitle.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block pr-[0.25em] last:pr-0"
                  initial={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.45 + i * 0.18, duration: 0.9, ease }}
                >
                  <span className="text-shimmer">{word}</span>
                </motion.span>
              ))}
            </h2>

            <div className="mt-8 space-y-4">
              {config.finale.finalMessage.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.5, duration: 0.8, ease }}
                  className="text-lg leading-relaxed text-pretty text-ink/90 sm:text-xl"
                >
                  {fill(line)}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 + config.finale.finalMessage.length * 0.5, duration: 0.8 }}
              className="mt-6 self-end font-hand text-4xl text-primary"
            >
              {fill(config.finale.signature)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + config.finale.finalMessage.length * 0.5, duration: 0.7 }}
              className="mt-12 flex w-full flex-col items-center gap-3"
            >
              <MagicButton
                ref={confettiRef}
                icon={<PartyPopper />}
                onClick={() => burst(originFromElement(confettiRef.current), 1.2)}
              >
                {config.finale.moreConfettiButton}
              </MagicButton>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagicButton variant="ghost" icon={<Mail />} onClick={onReread}>
                  {config.finale.rereadButton}
                </MagicButton>
                <MagicButton variant="ghost" icon={<RotateCcw />} onClick={onReplay}>
                  {config.finale.replayButton}
                </MagicButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { seeded } from "@/lib/utils";

interface CakeProps {
  candlesOut: boolean[];
  onBlow: (index: number) => void;
  disabled?: boolean;
  labelFor: (index: number) => string;
}

const DRIPS = Array.from({ length: 11 }, (_, i) => ({ left: 3 + i * 9 + seeded(i) * 3, height: 8 + seeded(i + 20) * 16 }));
const SPRINKLES = Array.from({ length: 16 }, (_, i) => ({
  left: 6 + seeded(i + 40) * 88,
  top: 38 + seeded(i + 60) * 48,
  rotate: seeded(i + 80) * 180,
  tone: i % 3,
}));
const sprinkleTones = ["bg-accent", "bg-paper", "bg-secondary"];

/** A two-tier cake whose candles are real buttons — tap a flame to blow it out. */
export function Cake({ candlesOut, onBlow, disabled, labelFor }: CakeProps) {
  return (
    <div className="relative mx-auto w-64 pt-20 sm:w-80">
      {/* candles */}
      <div className="absolute inset-x-[20%] top-0 z-10 flex h-24 items-end justify-around">
        {candlesOut.map((out, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onBlow(i)}
            disabled={out || disabled}
            aria-label={labelFor(i)}
            className="group relative flex h-24 w-9 items-end justify-center rounded-full disabled:cursor-default"
          >
            <Candle out={out} index={i} />
          </button>
        ))}
      </div>

      {/* top tier */}
      <div className="relative mx-auto h-16 w-[66%] rounded-t-2xl bg-linear-to-b from-[color-mix(in_oklab,var(--theme-secondary)_80%,white)] to-secondary shadow-[inset_0_-10px_20px_rgba(0,0,0,0.12)] sm:h-20">
        <Frosting />
      </div>

      {/* bottom tier */}
      <div className="relative h-24 w-full rounded-t-2xl rounded-b-lg bg-linear-to-b from-[color-mix(in_oklab,var(--theme-primary)_85%,white)] to-[color-mix(in_oklab,var(--theme-primary)_80%,var(--theme-secondary))] shadow-[inset_0_-14px_24px_rgba(0,0,0,0.15)] sm:h-28">
        <Frosting />
        {SPRINKLES.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute h-1 w-2.5 rounded-full ${sprinkleTones[s.tone]}`}
            style={{ left: `${s.left}%`, top: `${s.top}%`, rotate: `${s.rotate}deg` }}
          />
        ))}
      </div>

      {/* plate */}
      <div aria-hidden className="relative -mx-[8%] h-4 rounded-[50%] bg-linear-to-b from-ink/35 to-ink/10 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)]" />
    </div>
  );
}

function Frosting() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 h-4 rounded-t-2xl bg-paper">
      {DRIPS.map((d, i) => (
        <span
          key={i}
          className="absolute top-full w-[9%] rounded-b-full bg-paper"
          style={{ left: `${d.left}%`, height: d.height, marginTop: -2 }}
        />
      ))}
    </div>
  );
}

function Candle({ out, index }: { out: boolean; index: number }) {
  return (
    <span className="relative block h-14 w-3.5" aria-hidden>
      {/* wax */}
      <span className="absolute inset-0 block rounded-t-sm rounded-b-[2px] bg-[repeating-linear-gradient(135deg,var(--theme-paper)_0_5px,var(--theme-accent)_5px_9px)] shadow-[inset_-2px_0_3px_rgba(0,0,0,0.15)]" />
      {/* wick */}
      <span className="absolute -top-1.5 left-1/2 block h-2 w-0.5 -translate-x-1/2 rounded-full bg-ink/60" />

      <AnimatePresence>
        {!out && (
          <motion.span
            className="absolute bottom-[calc(100%+4px)] left-1/2 block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2, y: -6, transition: { duration: 0.25 } }}
            transition={{ delay: 0.2 + index * 0.12 }}
          >
            {/* halo */}
            <span className="absolute top-1/2 left-1/2 block size-14 -translate-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-accent)_55%,transparent),transparent)] transition-transform group-hover:scale-125" />
            {/* flame */}
            <span
              className="absolute bottom-0 left-1/2 block h-6 w-3.5 origin-bottom animate-flicker rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(ellipse_at_50%_75%,#fff_0%,#fff6c8_25%,var(--theme-accent)_55%,var(--theme-glow)_100%)] shadow-[0_0_14px_4px_color-mix(in_oklab,var(--theme-accent)_60%,transparent)]"
              style={{ animationDelay: `${index * -0.37}s` }}
            />
          </motion.span>
        )}
      </AnimatePresence>

      {/* smoke after blowing */}
      {out && (
        <span className="absolute bottom-full left-1/2 block">
          {[0, 1, 2].map((p) => (
            <motion.span
              key={p}
              className="absolute block size-2.5 rounded-full bg-ink/30"
              initial={{ opacity: 0.7, y: 0, x: -5, scale: 0.6 }}
              animate={{ opacity: 0, y: -50 - p * 12, x: (p - 1) * 10, scale: 2.2 }}
              transition={{ duration: 1.6, delay: p * 0.15, ease: "easeOut" }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

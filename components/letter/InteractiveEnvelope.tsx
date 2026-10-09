"use client";

import { useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { Hand } from "lucide-react";
import { config, fill } from "@/lib/content";
import { burst, originFromElement } from "@/lib/confetti";
import { SceneHeader } from "@/components/ui/SceneHeader";

/** A sealed envelope: break the wax seal, the flap swings open and the letter slides out. */
export function InteractiveEnvelope({ onOpened }: { onOpened: () => void }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();
  const initial = config.sender.name.trim().charAt(0).toUpperCase() || "♥";

  const open = async () => {
    if (opening) return;
    setOpening(true);
    const k = reduce ? 0.01 : 1;
    const ease = [0.65, 0, 0.35, 1] as const;

    await animate("[data-seal]", { scale: [1, 1.18, 0], rotate: [0, -12, 25], opacity: [1, 1, 0] }, { duration: 0.55 * k });
    await animate("[data-flap]", { rotateX: 180 }, { duration: 0.7 * k, ease });
    // Once the flap is folded back it must sit behind the letter.
    scope.current.querySelector<HTMLElement>("[data-flap]")?.style.setProperty("z-index", "1");
    await animate("[data-letter]", { y: "-62%" }, { duration: 0.9 * k, ease: [0.22, 1, 0.36, 1] });
    burst(originFromElement(scope.current.querySelector("[data-letter]")), 0.6);
    await animate(scope.current, { opacity: 0, y: 30, scale: 0.94 }, { duration: 0.55 * k, delay: 0.45 * k });
    onOpened();
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <SceneHeader title={fill(config.letter.envelopeTitle)} />

      <div ref={scope} className="relative mt-40 w-[min(86vw,440px)] sm:mt-48">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-7/5 w-full perspective-[1400px]"
        >
          {/* back of the envelope */}
          <div className="absolute inset-0 rounded-2xl bg-[color-mix(in_oklab,var(--theme-primary)_45%,var(--theme-surface))] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" />

          {/* the letter inside */}
          <div data-letter className="paper absolute inset-x-[7%] top-[7%] bottom-[5%] z-2 rounded-lg p-5 text-left shadow-md">
            <p className="font-hand text-2xl text-paper-ink/80">{fill(config.letter.greeting)}</p>
            <div className="mt-3 space-y-2.5" aria-hidden>
              {[92, 80, 86, 60].map((w, i) => (
                <span key={i} className="block h-1.5 rounded-full bg-paper-ink/10" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>

          {/* front pocket */}
          <div className="absolute inset-0 z-3 rounded-2xl bg-linear-to-b from-[color-mix(in_oklab,var(--theme-primary)_78%,white)] to-[color-mix(in_oklab,var(--theme-primary)_75%,var(--theme-secondary))] [clip-path:polygon(0_0,50%_54%,100%_0,100%_100%,0_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),transparent_45%)]" />
            <p className="absolute bottom-[9%] left-[8%] font-hand text-2xl text-on-primary/70 sm:text-3xl">
              for {config.recipient.name}
            </p>
          </div>

          {/* flap */}
          <div
            data-flap
            className="absolute inset-x-0 top-0 z-4 h-[56%] origin-top rounded-t-2xl bg-linear-to-b from-[color-mix(in_oklab,var(--theme-primary)_70%,var(--theme-secondary))] to-[color-mix(in_oklab,var(--theme-primary)_88%,white)] [clip-path:polygon(0_0,100%_0,50%_100%)] backface-visible"
          />

          {/* wax seal */}
          <button
            data-seal
            type="button"
            onClick={open}
            disabled={opening}
            aria-label={config.letter.sealButtonLabel}
            className="absolute top-[56%] left-1/2 z-5 grid size-18 -translate-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--theme-glow)_85%,white),var(--theme-glow)_45%,color-mix(in_oklab,var(--theme-glow)_55%,black))] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.55),inset_0_-4px_8px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 sm:size-20"
          >
            {!opening && <span aria-hidden className="absolute inset-0 animate-ping-slow rounded-full border-2 border-glow/70" />}
            <span className="grid size-[74%] place-items-center rounded-full border-2 border-dashed border-white/35 font-display text-3xl font-semibold text-white/90 italic">
              {initial}
            </span>
          </button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ delay: opening ? 0 : 1 }}
        className="mt-10 inline-flex items-center gap-2 text-sm text-muted"
      >
        <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <Hand aria-hidden className="size-4 text-accent" />
        </motion.span>
        {config.letter.envelopeHint}
      </motion.p>
    </div>
  );
}

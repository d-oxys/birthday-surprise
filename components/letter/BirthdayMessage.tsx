"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Images } from "lucide-react";
import { birthdayDate, config, fill } from "@/lib/content";
import { MagicButton } from "@/components/ui/MagicButton";
import { Typewriter } from "./Typewriter";

interface BirthdayMessageProps {
  onFinish: () => void;
  /** Show the whole letter at once (used when re-reading). */
  instant?: boolean;
}

/** The digital letter: sections are revealed one by one with a typewriter effect. */
export function BirthdayMessage({ onFinish, instant = false }: BirthdayMessageProps) {
  const reduce = useReducedMotion();
  const sections = config.letter.sections;
  const total = sections.length;
  const [current, setCurrent] = useState(instant ? total : 0);
  const [typed, setTyped] = useState(instant);
  const [skipped, setSkipped] = useState(false);
  const activeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const finished = current >= total || (current === total - 1 && typed);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (current === 0 || current >= total) return;
    activeRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [current, total, reduce]);

  const skip = () => {
    if (typed || current >= total) return;
    setSkipped(true);
    setTyped(true);
  };

  const next = () => {
    setCurrent((c) => c + 1);
    setTyped(false);
    setSkipped(false);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pt-24 pb-20 sm:px-6">
      <motion.article
        initial={{ opacity: 0, y: 60, scale: 0.96, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onClick={skip}
        className="paper relative w-full max-w-2xl rounded-[28px] px-6 py-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:px-12 sm:py-14"
      >
        {/* corner ornaments */}
        <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[22px] border border-paper-ink/10" />
        <span aria-hidden className="absolute top-6 right-6 font-display text-xs tracking-[0.3em] text-paper-ink/45 uppercase">
          {birthdayDate.slice(0, 4)}
        </span>

        <header className="relative text-center">
          <h2
            ref={headingRef}
            data-scene-focus
            tabIndex={-1}
            className="font-display text-4xl leading-tight font-semibold text-balance text-paper-ink italic outline-none sm:text-5xl"
          >
            {fill(config.letter.heading)}
          </h2>
          <div aria-hidden className="mx-auto mt-4 flex items-center justify-center gap-3 text-glow">
            <span className="h-px w-12 bg-current opacity-50" />
            <span className="text-lg">♥</span>
            <span className="h-px w-12 bg-current opacity-50" />
          </div>
        </header>

        <p className="relative mt-8 font-hand text-3xl text-paper-ink/85">{fill(config.letter.greeting)}</p>

        <div className="relative mt-4 space-y-7 text-[17px] leading-[1.85] text-paper-ink/90 sm:text-lg">
          {sections.map((section, i) => {
            if (i > current) return null;
            const isActive = i === current;
            return (
              <motion.div
                key={i}
                ref={isActive ? activeRef : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {section.title && (
                  <h3 className="mb-1.5 text-xs font-bold tracking-[0.22em] text-[color-mix(in_oklab,var(--theme-glow)_70%,var(--theme-paper-text))] uppercase">
                    {fill(section.title)}
                  </h3>
                )}
                <Typewriter
                  text={fill(section.body)}
                  speed={config.animation.typingSpeed}
                  instant={!isActive || skipped || instant || !!reduce}
                  onDone={() => setTyped(true)}
                />
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {finished && (
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: instant ? 0.2 : 0.5, duration: 0.8 }}
              className="relative mt-10 text-right"
            >
              {config.letter.closing && (
                <p className="text-left text-lg leading-relaxed font-medium text-paper-ink sm:text-xl">{fill(config.letter.closing)}</p>
              )}
              <p className="mt-8 text-sm text-paper-ink/70">{fill(config.letter.signOff)}</p>
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: instant ? 0.4 : 1.1, duration: 1.4, ease: "easeInOut" }}
                className="font-hand text-5xl text-[color-mix(in_oklab,var(--theme-glow)_65%,var(--theme-paper-text))]"
              >
                {config.sender.name}
              </motion.p>
            </motion.footer>
          )}
        </AnimatePresence>

        {!typed && current < total && !reduce && (
          <div className="relative mt-8 text-center">
            <button type="button" onClick={skip} className="rounded-full px-3 py-2 text-xs text-paper-ink/55 transition-colors hover:text-paper-ink">
              {config.letter.tapToSkip}
            </button>
          </div>
        )}
      </motion.article>

      <div className="mt-8 flex min-h-14 flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="finish" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: instant ? 0.3 : 1.6 }}>
              <MagicButton onClick={onFinish} icon={<Images />} iconAfter={<ArrowRight />}>
                {fill(config.letter.finishButton)}
              </MagicButton>
            </motion.div>
          ) : typed ? (
            <motion.div key={`next-${current}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <MagicButton variant="ghost" onClick={next} iconAfter={<ChevronDown />}>
                {config.letter.nextButton} · {current + 2}/{total}
              </MagicButton>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

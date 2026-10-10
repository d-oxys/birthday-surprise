"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { config, fill } from "@/lib/content";
import { cn, seeded } from "@/lib/utils";
import { MagicButton } from "@/components/ui/MagicButton";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Lightbox } from "./Lightbox";
import { MemoryImage } from "./MemoryImage";

const aspect = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[9/16]",
  wide: "aspect-video",
} as const;

/** Scene 5 — scattered polaroids that fly in on scroll and open in a lightbox. */
export function MemoryGallery({ onNext }: { onNext: () => void }) {
  const items = config.memories.items;
  const [view, setView] = useState<{ index: number; direction: number } | null>(null);

  const close = useCallback(() => setView(null), []);
  const navigate = useCallback(
    (step: 1 | -1) =>
      setView((v) => (v ? { index: (v.index + step + items.length) % items.length, direction: step } : v)),
    [items.length],
  );

  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pt-28 pb-20 sm:px-6">
      <SceneHeader eyebrow={config.memories.eyebrow} title={fill(config.memories.title)} subtitle={fill(config.memories.subtitle)} />

      <div className="mt-14 w-full max-w-5xl columns-2 gap-4 sm:gap-7 md:columns-3">
        {items.map((item, i) => {
          const tilt = (seeded(i + 5) - 0.5) * 7;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setView({ index: i, direction: 0 })}
              aria-label={[item.caption || item.alt, item.date].filter(Boolean).join(", ")}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: "spring", stiffness: 140, damping: 18, delay: (i % 3) * 0.08 }}
              className="group relative mb-5 block w-full break-inside-avoid rounded-sm bg-paper p-2 pb-3 text-left shadow-[0_20px_40px_-18px_rgba(0,0,0,0.75)] sm:mb-8 sm:p-3 sm:pb-4"
            >
              {/* washi tape */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 bg-accent/55 shadow-sm"
                style={{ rotate: `${(seeded(i + 9) - 0.5) * 16}deg` }}
              />
              <span className={cn("relative block w-full overflow-hidden rounded-[2px]", aspect[item.orientation ?? "portrait"])}>
                <MemoryImage item={item} index={i} sizes="(max-width: 768px) 46vw, 320px" />
                <span className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              {item.caption && (
                <span className="mt-2.5 block px-1 font-hand text-xl leading-tight text-paper-ink sm:text-2xl">{item.caption}</span>
              )}
              {item.date && (
                <span className="mt-0.5 block px-1 text-[10px] font-semibold tracking-[0.2em] text-paper-ink/55 uppercase">
                  {item.date}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <MagicButton onClick={onNext} icon={<Sparkles />} iconAfter={<ArrowRight />}>
          {fill(config.memories.button)}
        </MagicButton>
      </motion.div>

      {/* Portal: scene transitions use transforms, which would trap a fixed overlay inside them. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {view && (
              <Lightbox items={items} index={view.index} direction={view.direction} onClose={close} onNavigate={navigate} />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

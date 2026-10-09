"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { config } from "@/lib/content";
import type { MemoryItem } from "@/lib/types";
import { MemoryImage } from "./MemoryImage";

interface LightboxProps {
  items: MemoryItem[];
  index: number;
  direction: number;
  onClose: () => void;
  onNavigate: (step: 1 | -1) => void;
}

/** Full-screen photo viewer: swipe / arrow keys to browse, Esc to close, focus stays inside. */
export function Lightbox({ items, index, direction, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const many = items.length > 1;

  // Keep latest callbacks without re-binding listeners.
  const handlers = useRef({ onClose, onNavigate });
  useEffect(() => {
    handlers.current = { onClose, onNavigate };
  }, [onClose, onNavigate]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      else if (e.key === "ArrowRight") handlers.current.onNavigate(1);
      else if (e.key === "ArrowLeft") handlers.current.onNavigate(-1);
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!many) return;
    if (info.offset.x < -60 || info.velocity.x < -400) onNavigate(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) onNavigate(-1);
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[color-mix(in_oklab,var(--theme-background)_88%,transparent)] px-4 py-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={config.ui.close}
        className="glass absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full text-ink transition-transform hover:scale-110"
      >
        <X className="size-5" />
      </button>

      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.figure
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 80, opacity: 0, scale: 0.96 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -80, opacity: 0, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            className="flex cursor-grab flex-col items-center active:cursor-grabbing"
          >
            <div className="relative h-[min(64dvh,680px)] w-full overflow-hidden rounded-2xl bg-black/20 shadow-2xl">
              <MemoryImage item={item} index={index} sizes="(max-width: 896px) 92vw, 896px" fit="contain" priority />
            </div>
            <figcaption className="mt-5 text-center">
              <p className="font-hand text-3xl text-ink sm:text-4xl">{item.caption}</p>
              {item.date && <p className="mt-1 text-xs font-semibold tracking-[0.25em] text-accent uppercase">{item.date}</p>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {many && (
          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label={config.ui.previous}
              className="glass grid size-12 place-items-center rounded-full text-ink transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="min-w-14 text-center text-sm text-muted tabular-nums" aria-live="polite">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label={config.ui.next}
              className="glass grid size-12 place-items-center rounded-full text-ink transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

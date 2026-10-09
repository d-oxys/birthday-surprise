"use client";

import { AnimatePresence, motion } from "motion/react";
import { Music2, VolumeX } from "lucide-react";
import { config } from "@/lib/content";
import { useMusic } from "./MusicProvider";

export function MusicToggle() {
  const { active, playing, toggle } = useMusic();

  return (
    <AnimatePresence>
      {active && (
        <motion.button
          type="button"
          onClick={toggle}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={playing ? config.ui.musicOn : config.ui.musicOff}
          aria-pressed={playing}
          title={playing ? config.ui.musicOn : config.ui.musicOff}
          className="glass relative grid size-11 place-items-center rounded-full text-ink shadow-lg shadow-black/20"
        >
          {playing && (
            <span aria-hidden className="absolute inset-0 animate-ping-slow rounded-full border border-primary/50" />
          )}
          {playing ? <Music2 className="size-[18px]" /> : <VolumeX className="size-[18px] text-muted" />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}

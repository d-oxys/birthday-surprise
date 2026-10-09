"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InteractiveEnvelope } from "./InteractiveEnvelope";
import { BirthdayMessage } from "./BirthdayMessage";

interface LetterSceneProps {
  onNext: () => void;
  /** Skip the envelope and show the full letter (re-reading). */
  reread?: boolean;
}

/** Scene 4 — envelope first, then the letter. */
export function LetterScene({ onNext, reread = false }: LetterSceneProps) {
  const [opened, setOpened] = useState(reread);

  return (
    <AnimatePresence mode="wait">
      {opened ? (
        <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <BirthdayMessage onFinish={onNext} instant={reread} />
        </motion.div>
      ) : (
        <motion.div key="envelope" exit={{ opacity: 0 }}>
          <InteractiveEnvelope onOpened={() => setOpened(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

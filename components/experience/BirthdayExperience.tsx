"use client";

import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { MusicProvider, useMusic } from "@/components/audio/MusicProvider";
import { MusicToggle } from "@/components/audio/MusicToggle";
import { AuroraGlow } from "@/components/background/AuroraGlow";
import { FloatingHearts } from "@/components/background/FloatingHearts";
import { StarField } from "@/components/background/StarField";
import { Countdown } from "@/components/countdown/Countdown";
import { FinalSurprise } from "@/components/final/FinalSurprise";
import { MemoryGallery } from "@/components/gallery/MemoryGallery";
import { GiftBox } from "@/components/gift/GiftBox";
import { LetterScene } from "@/components/letter/LetterScene";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";
import { config } from "@/lib/content";
import { ProgressNav } from "./ProgressNav";

// The countdown comes first and (with lockUntilBirthday) gates everything after it.
const SCENES = ["countdown", "welcome", "gift", "letter", "memories", "finale"] as const;
type Scene = (typeof SCENES)[number];

const HEART_SCENES: Scene[] = ["letter", "memories", "finale"];
// Intro scenes hide the progress dots.
const INTRO_SCENES: Scene[] = ["countdown", "welcome"];

export function BirthdayExperience() {
  return (
    <MusicProvider>
      <MotionConfig reducedMotion="user">
        <Experience />
      </MotionConfig>
    </MusicProvider>
  );
}

function Experience() {
  const music = useMusic();
  const [scene, setScene] = useState<Scene>("countdown");
  const [visited, setVisited] = useState(0);
  const [letterRead, setLetterRead] = useState(false);
  const [flashes, setFlashes] = useState(0);
  // Bumped on "replay" so every scene remounts with fresh state.
  const [run, setRun] = useState(0);

  const go = useCallback((next: Scene) => {
    setScene(next);
    setVisited((v) => Math.max(v, SCENES.indexOf(next)));
  }, []);

  const openSurprise = () => {
    music.start();
    setFlashes((f) => f + 1);
    go("gift");
  };

  const finishLetter = () => {
    setLetterRead(true);
    go("memories");
  };

  const replay = () => {
    // Start again from the welcome screen — the countdown has already been passed.
    setLetterRead(false);
    setVisited(SCENES.indexOf("welcome"));
    setRun((r) => r + 1);
    setScene("welcome");
  };

  const reread = () => {
    setLetterRead(true);
    go("letter");
  };

  const sceneIndex = SCENES.indexOf(scene);

  let content: ReactNode;
  switch (scene) {
    case "countdown":
      content = <Countdown onNext={() => go("welcome")} />;
      break;
    case "welcome":
      content = <WelcomeScreen onOpen={openSurprise} />;
      break;
    case "gift":
      content = <GiftBox onNext={() => go("letter")} />;
      break;
    case "letter":
      content = <LetterScene onNext={finishLetter} reread={letterRead} />;
      break;
    case "memories":
      content = <MemoryGallery onNext={() => go("finale")} />;
      break;
    case "finale":
      content = <FinalSurprise onReplay={replay} onReread={reread} />;
      break;
  }

  return (
    <main className="relative isolate min-h-dvh overflow-x-clip">
      <AuroraGlow />
      <StarField />
      <FloatingHearts visible={HEART_SCENES.includes(scene)} />

      {/* top bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 p-3 sm:p-5">
        <span className="size-11" aria-hidden />
        <div className="pointer-events-auto">
          <AnimatePresence>
            {!INTRO_SCENES.includes(scene) && (
              <ProgressNav current={sceneIndex} visited={visited} onSelect={(i) => go(SCENES[i])} />
            )}
          </AnimatePresence>
        </div>
        <div className="pointer-events-auto size-11">
          <MusicToggle />
        </div>
      </div>

      {/* light flash when the surprise is opened */}
      <AnimatePresence>
        {flashes > 0 && (
          <motion.div
            key={flashes}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-30 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--theme-decoration)_70%,transparent),color-mix(in_oklab,var(--theme-glow)_25%,transparent)_40%,transparent_75%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.3, times: [0, 0.3, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
        <SceneFrame key={`${scene}-${run}`} kind={scene} autoFocus={!(scene === SCENES[0] && run === 0)}>
          {content}
        </SceneFrame>
      </AnimatePresence>
    </main>
  );
}

const sceneVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  gone: { opacity: 0, y: -24, scale: 1.01, filter: "blur(6px)", transition: { duration: 0.45, ease: "easeIn" } },
  // The welcome screen "zooms into the light" when the surprise is opened.
  goneWelcome: { opacity: 0, scale: 1.18, filter: "blur(14px)", transition: { duration: 0.7, ease: [0.55, 0, 0.75, 0] } },
} as const;

function SceneFrame({ kind, autoFocus, children }: { kind: Scene; autoFocus: boolean; children: ReactNode }) {
  return (
    <motion.section
      aria-label={config.ui.stepLabels[SCENES.indexOf(kind)]}
      variants={sceneVariants}
      initial="hidden"
      animate="shown"
      exit={kind === "welcome" ? "goneWelcome" : "gone"}
      onAnimationComplete={(definition) => {
        if (!autoFocus || definition !== "shown") return;
        // Move focus to the new scene's heading for keyboard & screen-reader users.
        const target = document.querySelector<HTMLElement>("main section [data-scene-focus]");
        if (target && !target.contains(document.activeElement)) target.focus({ preventScroll: true });
      }}
    >
      {children}
    </motion.section>
  );
}

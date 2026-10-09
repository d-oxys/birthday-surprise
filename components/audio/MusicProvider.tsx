"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { config } from "@/lib/content";
import { MusicBox } from "@/lib/music-box";

interface MusicContextValue {
  /** Music is configured and has been started by a user gesture. */
  active: boolean;
  playing: boolean;
  /** Call from a click handler (browser autoplay policy). Safe to call repeatedly. */
  start: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

type Player = { play: () => Promise<void>; pause: () => void | Promise<void>; destroy: () => void };

function createFilePlayer(src: string, volume: number, onFail: () => void): Player {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = Math.max(0, Math.min(1, volume));
  audio.preload = "auto";
  audio.addEventListener("error", onFail, { once: true });
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    destroy: () => {
      audio.removeEventListener("error", onFail);
      audio.pause();
      audio.src = "";
    },
  };
}

function createBoxPlayer(volume: number): Player {
  const box = new MusicBox(volume);
  return { play: () => box.play(), pause: () => box.pause(), destroy: () => box.destroy() };
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { enabled, src, volume } = config.music;
  const playerRef = useRef<Player | null>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Fall back to the built-in melody if the audio file is missing or can't play.
  const fallbackToBox = useCallback(() => {
    playerRef.current?.destroy();
    const box = createBoxPlayer(volume);
    playerRef.current = box;
    box.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [volume]);

  const start = useCallback(() => {
    if (!enabled || playerRef.current) return;
    try {
      const player = src ? createFilePlayer(src, volume, fallbackToBox) : createBoxPlayer(volume);
      playerRef.current = player;
      setActive(true);
      player.play().then(
        () => setPlaying(true),
        () => (src ? fallbackToBox() : setPlaying(false)),
      );
    } catch {
      playerRef.current = null;
    }
  }, [enabled, src, volume, fallbackToBox]);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player) return start();
    if (playing) {
      void player.pause();
      setPlaying(false);
    } else {
      player.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  }, [playing, start]);

  useEffect(() => () => playerRef.current?.destroy(), []);

  const value = useMemo(() => ({ active, playing, start, toggle }), [active, playing, start, toggle]);
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}

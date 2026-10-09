"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  /** Milliseconds per character. */
  speed: number;
  /** Render the full text immediately (skip, reduced motion, re-reading). */
  instant?: boolean;
  startDelay?: number;
  onDone?: () => void;
  className?: string;
}

/**
 * Types text out character by character with natural pauses at punctuation.
 * The untyped remainder is rendered invisibly so the layout never jumps,
 * and screen readers get the full text at once.
 */
export function Typewriter({ text, speed, instant = false, startDelay = 300, onDone, className }: TypewriterProps) {
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (instant) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        onDoneRef.current?.();
        return;
      }
      const ch = text[i - 1];
      const pause = /[.!?…]/.test(ch) ? 9 : /[,;:—–]/.test(ch) ? 4 : ch === "\n" ? 7 : 1;
      timer = setTimeout(step, speed * pause);
    };
    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, instant, startDelay]);

  const shown = instant ? text.length : count;
  const done = shown >= text.length;

  return (
    <p className={cn("whitespace-pre-line", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, shown)}
        {!done && (
          <span className="relative inline-block h-[1.05em] w-0 align-[-0.15em]">
            <span className="absolute top-0 left-px h-full w-[2px] animate-blink rounded-full bg-current" />
          </span>
        )}
        <span className="invisible">{text.slice(shown)}</span>
      </span>
    </p>
  );
}

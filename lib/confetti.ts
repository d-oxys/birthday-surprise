import confetti from "canvas-confetti";
import { config } from "./content";
import { prefersReducedMotion } from "./utils";

type Origin = { x: number; y: number };

const colors = () => [
  config.theme.primary,
  config.theme.secondary,
  config.theme.accent,
  config.theme.decoration,
  config.theme.glow,
];

function canFire() {
  return typeof window !== "undefined" && config.animation.confetti && !prefersReducedMotion();
}

const base = { zIndex: 70, disableForReducedMotion: true } as const;

/** Convert an element's center into a confetti origin (0–1 viewport coords). */
export function originFromElement(el: Element | null): Origin {
  if (!el) return { x: 0.5, y: 0.5 };
  const r = el.getBoundingClientRect();
  return { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight };
}

/** One soft, round burst — for small "yay" moments. */
export function burst(origin: Origin = { x: 0.5, y: 0.5 }, intensity = 1) {
  if (!canFire()) return;
  const particleCount = Math.round(70 * intensity);
  confetti({ ...base, origin, particleCount, spread: 75, startVelocity: 38, scalar: 0.9, ticks: 220, colors: colors() });
  confetti({
    ...base,
    origin,
    particleCount: Math.round(particleCount / 3),
    spread: 110,
    startVelocity: 26,
    shapes: ["star"],
    scalar: 1.1,
    ticks: 260,
    colors: [config.theme.accent, config.theme.decoration],
  });
}

/** Side cannons for a few seconds — for big moments. Returns a cancel function. */
export function celebrate(durationMs = 2600) {
  if (!canFire()) return () => {};
  const end = Date.now() + durationMs;
  let frame = 0;
  const loop = () => {
    const opts = { ...base, particleCount: 3, spread: 60, startVelocity: 55, ticks: 260, colors: colors() };
    confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.75 } });
    confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.75 } });
    if (Date.now() < end) frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(frame);
}

/** Firework-style bursts at random spots — for the grand finale. Returns a cancel function. */
export function fireworks(durationMs = 4000) {
  if (!canFire()) return () => {};
  const end = Date.now() + durationMs;
  const id = window.setInterval(() => {
    if (Date.now() > end) return window.clearInterval(id);
    const origin = { x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.35 };
    confetti({ ...base, origin, particleCount: 45, spread: 360, startVelocity: 24, gravity: 0.7, ticks: 180, scalar: 0.85, colors: colors() });
  }, 380);
  return () => window.clearInterval(id);
}

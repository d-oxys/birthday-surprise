export type CountdownPhase = "before" | "today" | "after";

export interface CountdownState {
  phase: CountdownPhase;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Whole days since the birthday moment (only meaningful when phase === "after"). */
  daysSince: number;
}

const SECOND = 1000;
const HOUR = 60 * 60 * SECOND;
const DAY = 24 * HOUR;

/**
 * Pure countdown math. Never returns negative values:
 * before the moment → time remaining, inside the celebration window → "today",
 * afterwards → "after" with the number of days since.
 */
export function getCountdown(target: number, now: number, celebrationHours: number): CountdownState {
  const diff = target - now;

  if (diff > 0) {
    // Round up so the display reaches 00:00:00:00 exactly when the moment arrives.
    const total = Math.ceil(diff / SECOND);
    return {
      phase: "before",
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
      daysSince: 0,
    };
  }

  const elapsed = -diff;
  const phase: CountdownPhase = elapsed < celebrationHours * HOUR ? "today" : "after";
  return { phase, days: 0, hours: 0, minutes: 0, seconds: 0, daysSince: Math.max(1, Math.floor(elapsed / DAY)) };
}

let soonAnchor: number | null = null;

/**
 * Testing helper: add ?simulate=soon, ?simulate=today or ?simulate=after
 * to the URL to preview those states without changing the date in the config.
 * "soon" starts 10 seconds before the birthday so you can watch it arrive.
 */
export function simulatedNow(target: number, now: number, simulate: string | null) {
  if (simulate === "today") return target + HOUR;
  if (simulate === "after") return target + 3 * DAY + 2 * HOUR;
  if (simulate === "soon") {
    soonAnchor ??= now;
    return target - 10 * SECOND + (now - soonAnchor);
  }
  return now;
}

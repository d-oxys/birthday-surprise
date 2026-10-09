/**
 * A tiny shared clock store for useSyncExternalStore.
 * Ticks exactly on every second boundary (not drifting setInterval),
 * and re-syncs immediately when the tab becomes visible again.
 */
type Listener = () => void;

let now = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<Listener>();

function emit() {
  now = Date.now();
  listeners.forEach((listener) => listener());
}

function schedule() {
  const msToNextSecond = 1000 - (Date.now() % 1000) + 8;
  timer = setTimeout(() => {
    emit();
    schedule();
  }, msToNextSecond);
}

function onVisibility() {
  if (document.visibilityState === "visible") {
    clearTimeout(timer);
    emit();
    schedule();
  }
}

export function subscribeClock(listener: Listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    now = Date.now();
    schedule();
    document.addEventListener("visibilitychange", onVisibility);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearTimeout(timer);
      timer = undefined;
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}

export function getClockSnapshot() {
  if (now === 0) now = Date.now();
  return now;
}

export function getServerClockSnapshot(): number | null {
  return null;
}

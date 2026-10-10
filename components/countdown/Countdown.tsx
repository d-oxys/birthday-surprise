"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { ArrowRight, CalendarHeart, HeartHandshake, Lock, PartyPopper } from "lucide-react";
import { config, fill } from "@/lib/content";
import { getClockSnapshot, getServerClockSnapshot, subscribeClock } from "@/lib/clock";
import { getCountdown, simulatedNow, type CountdownState } from "@/lib/countdown";
import { burst, celebrate } from "@/lib/confetti";
import { MagicButton } from "@/components/ui/MagicButton";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { RollingNumber } from "./RollingNumber";

const noopSubscribe = () => () => {};
const readSimulate = () => new URLSearchParams(window.location.search).get("simulate");
const readSimulateServer = () => null;

function formatDate(timestamp: number) {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: config.birthday.timeZone,
    hourCycle: config.birthday.clock === "24h" ? "h23" : "h12",
  };
  try {
    return new Intl.DateTimeFormat(config.meta.locale, options).format(timestamp);
  } catch {
    // Unknown locale or timezone in the config — fall back to the browser defaults.
    return new Date(timestamp).toLocaleString();
  }
}

/** Scene 3 — real-time countdown to the configured birthday moment. */
export function Countdown({ onNext }: { onNext: () => void }) {
  const now = useSyncExternalStore(subscribeClock, getClockSnapshot, getServerClockSnapshot);
  const simulate = useSyncExternalStore(noopSubscribe, readSimulate, readSimulateServer);
  const target = useMemo(() => Date.parse(config.birthday.date), []);
  const invalidDate = Number.isNaN(target);

  const state: CountdownState | null =
    now === null || invalidDate ? null : getCountdown(target, simulatedNow(target, now, simulate), config.birthday.celebrationHours);
  const phase = state?.phase;
  const locked = config.birthday.lockUntilBirthday && phase === "before";

  // Celebrate when the "today" state appears — including live, at the exact second it arrives.
  useEffect(() => {
    if (phase !== "today") return;
    burst({ x: 0.5, y: 0.35 }, 1.2);
    return celebrate(3200);
  }, [phase]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6">
      {phase === "today" ? (
        <TodayView />
      ) : phase === "after" && state ? (
        <PastView days={state.daysSince} />
      ) : (
        <>
          <SceneHeader eyebrow={config.countdown.eyebrow} title={fill(config.countdown.title)} subtitle={fill(config.countdown.subtitle)} />
          {invalidDate ? (
            <p role="alert" className="glass mt-10 max-w-md rounded-2xl px-6 py-4 text-sm text-muted">
              The birthday date in <code className="text-accent">birthday.config.ts</code> is not valid. Use a format like{" "}
              <code className="text-accent">2026-10-20T00:00:00+07:00</code>.
            </p>
          ) : (
            <>
              <Tiles state={state} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm text-muted"
              >
                <CalendarHeart aria-hidden className="size-4 text-accent" />
                {formatDate(target)}
              </motion.p>
            </>
          )}
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <MagicButton onClick={onNext} disabled={locked || state === null} icon={locked ? <Lock /> : undefined} iconAfter={locked ? undefined : <ArrowRight />}>
          {fill(config.countdown.button)}
        </MagicButton>
        {locked && <p className="max-w-xs text-sm text-muted">{fill(config.countdown.lockedMessage)}</p>}
      </motion.div>
    </div>
  );
}

function Tiles({ state }: { state: CountdownState | null }) {
  const { labels } = config.countdown;
  const units: Array<[number, string]> = [
    [state?.days ?? 0, labels.days],
    [state?.hours ?? 0, labels.hours],
    [state?.minutes ?? 0, labels.minutes],
    [state?.seconds ?? 0, labels.seconds],
  ];
  const summary = state
    ? `${state.days} ${labels.days}, ${state.hours} ${labels.hours}, ${state.minutes} ${labels.minutes}`
    : "";

  return (
    <div role="timer" aria-label={summary} className="mt-12 grid w-full max-w-2xl grid-cols-4 gap-2 sm:gap-4">
      {units.map(([value, label], i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass group relative overflow-hidden rounded-2xl px-1 py-5 sm:rounded-3xl sm:py-7"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
          <span aria-hidden className="absolute inset-x-6 -bottom-6 h-12 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--theme-glow)_35%,transparent),transparent)]" />
          <div aria-hidden className="font-display text-[2.1rem] leading-none font-semibold text-ink tabular-nums lining-nums sm:text-6xl md:text-7xl">
            {state ? <RollingNumber value={value} /> : <span className="opacity-40">--</span>}
          </div>
          <div aria-hidden className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase sm:mt-3 sm:text-xs sm:tracking-[0.25em]">
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TodayView() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        className="mb-6 grid size-24 place-items-center rounded-full bg-linear-to-br from-primary to-accent text-on-primary glow-ring"
      >
        <motion.span animate={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}>
          <PartyPopper className="size-11" />
        </motion.span>
      </motion.div>
      <SceneHeader
        title={<span className="text-shimmer">{fill(config.countdown.todayTitle)}</span>}
        subtitle={fill(config.countdown.todayMessage)}
      />
    </div>
  );
}

function PastView({ days }: { days: number }) {
  const title = days === 1 ? config.countdown.pastTitleOneDay : config.countdown.pastTitle;
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
        className="glass mb-6 grid size-20 place-items-center rounded-full text-primary"
      >
        <HeartHandshake className="size-9" />
      </motion.div>
      <SceneHeader title={fill(title, { days })} subtitle={fill(config.countdown.pastMessage)} />
    </div>
  );
}

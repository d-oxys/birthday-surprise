"use client";

import { useEffect, useRef } from "react";
import { config } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/utils";

interface Star { x: number; y: number; r: number; phase: number; speed: number; color: string }
interface Dust { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }
interface Meteor { x: number; y: number; vx: number; vy: number; life: number }

const TAU = Math.PI * 2;

/**
 * Canvas starfield: twinkling stars, rising light dust and the occasional shooting star.
 * Colors are read from the theme CSS variables. Pauses when the tab is hidden,
 * caps DPR for performance and renders a single static frame for reduced motion.
 */
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !config.animation.particles) return;

    const reduce = prefersReducedMotion();
    const css = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
    const deco = read("--theme-decoration", "#ffffff");
    const accent = read("--theme-accent", "#ffd98a");
    const primary = read("--theme-primary", "#ff9fc4");
    const density = Math.min(1.5, Math.max(0.2, config.animation.particleDensity));

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let meteor: Meteor | null = null;
    let nextMeteor = performance.now() + 4000 + Math.random() * 5000;
    let raf = 0;
    let last = performance.now();

    const pickColor = () => {
      const roll = Math.random();
      return roll < 0.78 ? deco : roll < 0.9 ? accent : primary;
    };

    const build = () => {
      const count = Math.min(240, Math.round(((w * h) / 5200) * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.15 + 0.25,
        phase: Math.random() * TAU,
        speed: 0.5 + Math.random() * 1.6,
        color: pickColor(),
      }));
      dust = Array.from({ length: Math.max(8, Math.round(count / 9)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 8,
        vy: -(5 + Math.random() * 14),
        alpha: 0.25 + Math.random() * 0.45,
        color: Math.random() < 0.5 ? primary : accent,
      }));
    };

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time / 1000;

      for (const s of stars) {
        const a = reduce ? 0.7 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, TAU);
        ctx.fill();
        if (s.r > 1.15) {
          ctx.globalAlpha = a * 0.14;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, TAU);
          ctx.fill();
        }
      }

      for (const d of dust) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha * 0.18;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3.2, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = d.alpha;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, TAU);
        ctx.fill();
      }

      if (!reduce) {
        if (!meteor && time > nextMeteor) {
          const fromLeft = Math.random() < 0.5;
          meteor = {
            x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
            y: Math.random() * h * 0.35,
            vx: (fromLeft ? 1 : -1) * (700 + Math.random() * 300),
            vy: 320 + Math.random() * 160,
            life: 1,
          };
        }
        if (meteor) {
          meteor.x += meteor.vx * dt;
          meteor.y += meteor.vy * dt;
          meteor.life -= dt * 1.2;
          const tail = 0.12;
          const tx = meteor.x - meteor.vx * tail;
          const ty = meteor.y - meteor.vy * tail;
          const grad = ctx.createLinearGradient(meteor.x, meteor.y, tx, ty);
          grad.addColorStop(0, deco);
          grad.addColorStop(1, "transparent");
          ctx.globalAlpha = Math.max(0, meteor.life);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          if (meteor.life <= 0) {
            meteor = null;
            nextMeteor = time + 6000 + Math.random() * 8000;
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const widthChanged = window.innerWidth !== w;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile address bars change the height while scrolling — don't reshuffle the sky for that.
      if (widthChanged || stars.length === 0) build();
      if (reduce) draw(0, 0);
    };

    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - last) / 1000);
      last = time;
      draw(time, dt);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.visibilityState === "visible") {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}

import type { ThemeColors } from "@/lib/types";

const toVar = (key: string) => `--theme-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

/**
 * Turns the colors from birthday.config.ts into CSS variables on :root.
 * Tailwind tokens (bg-primary, text-accent, …) in globals.css read these variables,
 * so changing a color in the config re-themes the entire site.
 * Rendered on the server inside <head>, so there is no color flash on load.
 */
export function ThemeProvider({ theme }: { theme: ThemeColors }) {
  const css = `:root{${Object.entries(theme)
    .map(([key, value]) => `${toVar(key)}:${value};`)
    .join("")}}`;
  return <style id="birthday-theme" dangerouslySetInnerHTML={{ __html: css }} />;
}

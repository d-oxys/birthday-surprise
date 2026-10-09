import type { ThemeColors } from "./types";

/**
 * Ready-made palettes. To use one, open birthday.config.ts and write e.g.
 *
 *   import { themePresets } from "@/lib/theme-presets";
 *   ...
 *   theme: themePresets.lavenderDream,
 *
 * or spread it and override single colors:
 *
 *   theme: { ...themePresets.oceanGlow, primary: "#ff9ec7" },
 */
export const themePresets = {
  /** Deep plum night, rose pink and champagne gold (default). */
  midnightRose: {
    background: "#120a1f",
    backgroundAlt: "#2b1340",
    surface: "#1f1333",
    primary: "#f4a6c1",
    secondary: "#b89cff",
    accent: "#f6d38b",
    text: "#fbf3f7",
    textMuted: "#c9b8d4",
    decoration: "#fde7f1",
    glow: "#ff8fbf",
    buttonText: "#2a0f24",
    paper: "#fdf6ee",
    paperText: "#3d2436",
  },
  /** Soft lilac dusk with silver highlights. */
  lavenderDream: {
    background: "#100c22",
    backgroundAlt: "#251c4a",
    surface: "#1c1638",
    primary: "#c3a6ff",
    secondary: "#8fb8ff",
    accent: "#ffd6f0",
    text: "#f5f2ff",
    textMuted: "#beb6dc",
    decoration: "#ebe4ff",
    glow: "#a98bff",
    buttonText: "#1a1033",
    paper: "#f8f5ff",
    paperText: "#2e2547",
  },
  /** Midnight ocean, aqua glow and pearl. */
  oceanGlow: {
    background: "#06121c",
    backgroundAlt: "#0d2a3d",
    surface: "#0d1e2c",
    primary: "#7fe0d4",
    secondary: "#7aa8ff",
    accent: "#ffe3a8",
    text: "#effaf9",
    textMuted: "#a9c4cc",
    decoration: "#dff9ff",
    glow: "#4fd1c5",
    buttonText: "#04211e",
    paper: "#f4fbfa",
    paperText: "#173238",
  },
  /** Warm sunset, coral and honey. */
  goldenHour: {
    background: "#1a0d0b",
    backgroundAlt: "#3a1a14",
    surface: "#2a1612",
    primary: "#ffb38a",
    secondary: "#ff8fa3",
    accent: "#ffd36e",
    text: "#fff5ee",
    textMuted: "#dcbfb2",
    decoration: "#ffe9d6",
    glow: "#ff9a6b",
    buttonText: "#2e120a",
    paper: "#fff8ef",
    paperText: "#43261c",
  },
} satisfies Record<string, ThemeColors>;

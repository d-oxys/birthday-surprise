/**
 * Type definitions for birthday.config.ts.
 * You normally never need to edit this file — edit birthday.config.ts instead.
 */

export interface ThemeColors {
  /** Main page background (darkest tone). */
  background: string;
  /** Second background tone used for the soft top gradient. */
  backgroundAlt: string;
  /** Base color for glass cards and panels. */
  surface: string;
  /** Main brand color: buttons, highlights, gift box. */
  primary: string;
  /** Supporting color: gradients, aurora, secondary details. */
  secondary: string;
  /** Small highlights: gold sparkles, focus rings, dates. */
  accent: string;
  /** Main readable text on the dark background. */
  text: string;
  /** Softer text for subtitles and labels. */
  textMuted: string;
  /** Stars, particles and floating hearts. */
  decoration: string;
  /** Glow and light effects behind buttons and headings. */
  glow: string;
  /** Text color on top of primary buttons. */
  buttonText: string;
  /** Letter paper and photo frame color. */
  paper: string;
  /** Ink color used on the paper. */
  paperText: string;
}

export interface LetterSection {
  /** Optional small heading above the paragraph. */
  title?: string;
  /** The paragraph. Use "\n" for a line break. */
  body: string;
}

export interface MemoryItem {
  /**
   * Image path inside /public, e.g. "/memories/01.jpg".
   * Leave empty ("") to show an elegant placeholder instead.
   */
  src?: string;
  /** Short description for screen readers. */
  alt: string;
  /** Handwritten caption shown under the photo. Optional — leave empty for none. */
  caption?: string;
  /** Optional small date / place label. */
  date?: string;
  /**
   * Frame shape. Defaults to "portrait".
   * portrait = 4:5, landscape = 4:3, square = 1:1, tall = 9:16 (phone photo), wide = 16:9.
   */
  orientation?: "portrait" | "landscape" | "square" | "tall" | "wide";
}

export interface BirthdayConfig {
  meta: {
    /** Browser tab + link preview title. Supports {name} and {sender}. */
    title: string;
    /** Link preview description. */
    description: string;
    /** <html lang> attribute. */
    lang: string;
    /** Locale used to format dates, e.g. "en-US" or "id-ID". */
    locale: string;
    /** Public URL after deploy (used for link previews). Optional. */
    siteUrl?: string;
  };
  recipient: { name: string };
  sender: { name: string };
  birthday: {
    /**
     * Exact moment of the birthday, ISO 8601 WITH timezone offset.
     * Example: "2026-10-20T00:00:00+07:00" = 20 Oct 2026, 00:00 WIB.
     */
    date: string;
    /** IANA timezone used to display the date, e.g. "Asia/Jakarta". */
    timeZone: string;
    /** "24h" shows 00:00, "12h" shows 12:00 AM. */
    clock: "24h" | "12h";
    /** How many hours the "It's your day!" state lasts after the moment. */
    celebrationHours: number;
    /** If true, the letter & the rest stay locked until the birthday arrives. */
    lockUntilBirthday: boolean;
  };
  welcome: {
    eyebrow: string;
    greeting: string;
    subtitle: string;
    button: string;
    hint: string;
  };
  gift: {
    title: string;
    subtitle: string;
    /** Hint shown before each tap. The gift opens after hints.length taps. */
    hints: string[];
    openedTitle: string;
    openedSubtitle: string;
    button: string;
  };
  countdown: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labels: { days: string; hours: string; minutes: string; seconds: string };
    todayTitle: string;
    todayMessage: string;
    /** Used when the birthday was exactly 1 day ago. */
    pastTitleOneDay: string;
    /** Supports {days}. */
    pastTitle: string;
    pastMessage: string;
    lockedMessage: string;
    button: string;
  };
  letter: {
    envelopeTitle: string;
    envelopeHint: string;
    sealButtonLabel: string;
    /** Handwritten label on the envelope. Supports {name}. */
    envelopeLabel: string;
    /** Letter(s) stamped on the wax seal. */
    sealInitial: string;
    heading: string;
    greeting: string;
    sections: LetterSection[];
    /** Line after the last section. Leave empty ("") to skip it. */
    closing: string;
    signOff: string;
    tapToSkip: string;
    nextButton: string;
    finishButton: string;
  };
  memories: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: MemoryItem[];
    button: string;
  };
  finale: {
    eyebrow: string;
    title: string;
    instruction: string;
    blowAllButton: string;
    /** Number of candles on the cake (1–9 looks best). */
    candles: number;
    wishMade: string;
    finalTitle: string;
    finalMessage: string[];
    signature: string;
    moreConfettiButton: string;
    replayButton: string;
    rereadButton: string;
  };
  ui: {
    musicOn: string;
    musicOff: string;
    close: string;
    previous: string;
    next: string;
    progressLabel: string;
    stepLabels: [string, string, string, string, string, string];
  };
  theme: ThemeColors;
  music: {
    /** Show the music button and play music after the first tap. */
    enabled: boolean;
    /**
     * Path to an audio file in /public, e.g. "/music/song.mp3".
     * Leave empty ("") to use the built-in music-box "Happy Birthday" melody.
     */
    src: string;
    /** 0 – 1 */
    volume: number;
  };
  animation: {
    /** Starfield + floating dust particles in the background. */
    particles: boolean;
    /** 0.3 – 1.5. Lower = fewer particles (lighter on old phones). */
    particleDensity: number;
    /** Small hearts slowly floating up in later scenes. */
    floatingHearts: boolean;
    /** Confetti bursts at special moments. */
    confetti: boolean;
    /** Milliseconds per character for the typewriter effect. */
    typingSpeed: number;
  };
}

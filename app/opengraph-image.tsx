import { ImageResponse } from "next/og";
import { config, fill } from "@/lib/content";

export const alt = "A little birthday surprise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Rendered once at build time (required for the static export).
export const dynamic = "force-static";

/** Link preview card (WhatsApp, iMessage, Instagram DM, …) built from birthday.config.ts. */
export default function OpengraphImage() {
  const t = config.theme;
  // Keep the preview mysterious: no birthday wishes, just an invitation.
  const title = fill(config.welcome.greeting);
  const subtitle = fill(config.welcome.eyebrow);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(circle at 50% 0%, ${t.backgroundAlt}, ${t.background} 70%)`,
          color: t.text,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {[
          [120, 110, 4],
          [1040, 90, 3],
          [980, 470, 5],
          [200, 500, 3],
          [600, 70, 2],
          [860, 260, 2],
          [320, 300, 2],
        ].map(([x, y, r], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: 999,
              background: t.decoration,
              boxShadow: `0 0 ${r * 6}px ${t.glow}`,
            }}
          />
        ))}
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `radial-gradient(circle at 35% 30%, ${t.decoration}, ${t.primary} 55%, ${t.secondary})`,
            boxShadow: `0 0 90px 10px ${t.glow}66`,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24">
            <path
              fill={t.buttonText}
              fillOpacity="0.8"
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.1c2-.2 3.9.9 5.4 2.7 1.5-1.8 3.4-2.9 5.4-2.7 3.7.4 5.7 4.3 4.2 7.7C19.5 16.4 12 21 12 21z"
            />
          </svg>
        </div>
        <div style={{ marginTop: 44, fontSize: 30, letterSpacing: 8, textTransform: "uppercase", color: t.accent }}>
          {subtitle}
        </div>
        <div style={{ marginTop: 18, fontSize: 96, fontStyle: "italic", color: t.text }}>{title}</div>
      </div>
    ),
    size,
  );
}

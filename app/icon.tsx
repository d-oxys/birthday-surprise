import { ImageResponse } from "next/og";
import { config } from "@/lib/content";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
// Rendered once at build time (required for the static export).
export const dynamic = "force-static";

/** Favicon generated from the theme colors in birthday.config.ts. */
export default function Icon() {
  const { primary, accent, background } = config.theme;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primary} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.1c2-.2 3.9.9 5.4 2.7 1.5-1.8 3.4-2.9 5.4-2.7 3.7.4 5.7 4.3 4.2 7.7C19.5 16.4 12 21 12 21z"
          />
        </svg>
      </div>
    ),
    size,
  );
}

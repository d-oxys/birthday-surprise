"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { MemoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const TONES = ["primary", "secondary", "accent"] as const;

interface MemoryImageProps {
  item: MemoryItem;
  index: number;
  sizes: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}

/**
 * Renders a memory photo, or a soft themed placeholder when no `src` is set
 * (or the file can't be loaded) — so there are never broken images.
 */
export function MemoryImage({ item, index, sizes, fit = "cover", priority }: MemoryImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = item.src?.trim();

  if (!src || failedSrc === src) return <PhotoPlaceholder index={index} />;

  return (
    <Image
      src={src}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
      // Remote URLs would need next.config "images.remotePatterns"; skip optimisation for them instead.
      unoptimized={/^https?:\/\//.test(src)}
      onError={() => setFailedSrc(src)}
      className={cn(fit === "cover" ? "object-cover" : "object-contain")}
    />
  );
}

function PhotoPlaceholder({ index }: { index: number }) {
  const a = TONES[index % 3];
  const b = TONES[(index + 1) % 3];
  return (
    <div
      role="img"
      aria-label={`Photo ${index + 1} placeholder`}
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{
        background: `linear-gradient(140deg, color-mix(in oklab, var(--theme-${a}) 55%, var(--theme-surface)), color-mix(in oklab, var(--theme-${b}) 35%, var(--theme-background)))`,
      }}
    >
      <span className="absolute -top-1/4 -left-1/4 size-3/4 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]" />
      <span className="absolute -right-1/4 -bottom-1/3 size-3/4 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)]" />
      <span className="relative flex flex-col items-center gap-2 text-white/85">
        <ImageIcon aria-hidden className="size-7" strokeWidth={1.5} />
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">Photo {index + 1}</span>
      </span>
    </div>
  );
}

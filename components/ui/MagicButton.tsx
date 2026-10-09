"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface MagicButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-primary via-[color-mix(in_oklab,var(--theme-primary)_55%,var(--theme-accent))] to-accent text-on-primary glow-ring",
  ghost: "glass text-ink hover:border-primary/40",
};

/** Pill button with glow, shimmer sweep on hover and springy press feedback. */
export const MagicButton = forwardRef<HTMLButtonElement, MagicButtonProps>(function MagicButton(
  { variant = "primary", icon, iconAfter, className, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3 text-[15px] font-semibold tracking-wide transition-[opacity,border-color] duration-300 select-none",
        "disabled:cursor-not-allowed disabled:opacity-45",
        styles[variant],
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
      />
      {icon && <span className="relative shrink-0 [&>svg]:size-[18px]">{icon}</span>}
      <span className="relative">{children}</span>
      {iconAfter && (
        <span className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-1 [&>svg]:size-[18px]">
          {iconAfter}
        </span>
      )}
    </motion.button>
  );
});

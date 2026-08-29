import { cn } from "@frontend/utils/cn";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-soft disabled:bg-ink-faint",
  secondary:
    "bg-white text-ink border border-line hover:border-ink/20 hover:bg-canvas",
  ghost: "bg-transparent text-ink hover:bg-white",
  danger: "bg-terracotta text-white hover:opacity-90",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

import { cn } from "@frontend/utils/cn";
import type { HTMLAttributes } from "react";

const tones = {
  neutral: "bg-canvas text-ink-muted",
  accent: "bg-accent-soft text-accent",
  success: "bg-forest-soft text-forest",
  warning: "bg-amber-soft text-amber",
  danger: "bg-terracotta-soft text-terracotta",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof tones;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function statusTone(key: string): keyof typeof tones {
  if (key === "approved" || key === "success") return "success";
  if (key === "rejected" || key === "error" || key === "critical") return "danger";
  if (key === "needs_resubmission" || key === "pending" || key === "high" || key === "medium") return "warning";
  if (key === "under_review" || key === "submitted") return "accent";
  return "neutral";
}

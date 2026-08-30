import { cn } from "@frontend/utils/cn";
import type { ReactNode } from "react";

export function SiteHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-gold/20 bg-navy text-cream", className)}>
      {children}
    </header>
  );
}

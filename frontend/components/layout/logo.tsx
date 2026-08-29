"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";

export function Logo({ className }: { className?: string }) {
  const { isAr } = useLocale();
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[13px] text-white">
        E
      </span>
      <span className={cn(isAr && "font-arabic")} dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
        {isAr ? "إليفيشن" : "Elevation"}
      </span>
    </span>
  );
}

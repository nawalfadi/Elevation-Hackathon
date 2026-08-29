"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";

export function LanguageSwitch({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-medium",
        light ? "border-white/20 bg-white/10 text-white" : "border-line bg-white text-ink-muted",
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en" && (light ? "bg-white text-ink" : "bg-accent-soft text-accent"),
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={cn(
          "rounded-full px-2.5 py-1 font-arabic transition-colors",
          locale === "ar" && (light ? "bg-white text-ink" : "bg-accent-soft text-accent"),
        )}
      >
        ع
      </button>
    </div>
  );
}

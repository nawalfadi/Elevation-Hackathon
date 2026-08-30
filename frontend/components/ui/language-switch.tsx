"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import type { Locale } from "@frontend/store/ui";
import { cn } from "@frontend/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LanguageSwitch({
  light = false,
  notice = "below",
}: {
  light?: boolean;
  notice?: "below" | "left";
}) {
  const { locale, setLocale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, [visible]);

  function choose(next: Locale) {
    if (next === locale) return;
    setLocale(next);
    setVisible(true);
  }

  return (
    <div className="relative inline-flex items-center overflow-visible" dir="ltr">
      <div
        className={cn(
          "relative grid grid-cols-2 items-center rounded-full border text-xs font-semibold tracking-wide",
          light
            ? "border-white/20 bg-white/10 px-1 py-1 text-silver shadow-[0_0_15px_rgba(255,255,255,0.15)] backdrop-blur-sm"
            : "border-line bg-surface p-0.5 text-ink-muted",
        )}
        role="group"
        aria-label="Language"
      >
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-full",
            light
              ? "top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-navy-deep shadow-[0_0_12px_rgba(232,197,71,0.45)]"
              : "top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-navy shadow-gold",
          )}
          initial={false}
          animate={{ x: locale === "en" ? 0 : "100%" }}
          transition={{ duration: 0.22 }}
        />
        <button
          type="button"
          onClick={() => choose("en")}
          className={cn(
            "relative z-10 flex h-8 items-center justify-center rounded-full px-2.5 transition-all duration-200",
            locale === "en"
              ? "text-sm font-bold text-gold-bright drop-shadow-[0_0_10px_rgba(246,231,156,0.9)]"
              : light
                ? "text-silver"
                : "text-ink-muted",
          )}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => choose("ar")}
          className={cn(
            "relative z-10 flex h-8 items-center justify-center rounded-full px-2.5 font-arabic transition-all duration-200",
            locale === "ar"
              ? "text-sm font-bold text-gold-bright drop-shadow-[0_0_10px_rgba(246,231,156,0.9)]"
              : light
                ? "text-silver"
                : "text-ink-muted",
          )}
        >
          ع
        </button>
      </div>
      <AnimatePresence>
        {visible ? (
          <motion.p
            className={cn(
              "pointer-events-none absolute z-20 whitespace-nowrap rounded-full px-5 py-2.5 text-base font-semibold",
              notice === "left" ? "right-full top-1/2 mr-3" : "top-full mt-2",
              light ? "bg-gold-gradient text-navy shadow-gold" : "bg-navy text-cream",
            )}
            initial={
              notice === "left"
                ? { opacity: 0, x: 12, y: "-50%", scale: 0.86 }
                : { opacity: 0, y: -8, scale: 0.86 }
            }
            animate={
              notice === "left"
                ? { opacity: 1, x: 0, y: "-50%", scale: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              notice === "left"
                ? { opacity: 0, x: 8, y: "-50%", scale: 0.92 }
                : { opacity: 0, y: -8, scale: 0.92 }
            }
            transition={{ duration: 0.28 }}
          >
            {locale === "ar" ? "تم التبديل إلى العربية" : "Switched to English"}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

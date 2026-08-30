"use client";

import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import Image from "next/image";

const iconClass: Record<"sm" | "md" | "lg" | "lockup", string> = {
  sm: "h-12 w-auto",
  md: "h-20 w-auto sm:h-24",
  lg: "h-auto w-[260px] sm:w-[300px]",
  lockup: "h-auto w-[230px] sm:w-[280px]",
};

export function Logo({
  className,
  light = false,
  size = "md",
  compact = false,
}: {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg" | "lockup";
  compact?: boolean;
}) {
  const { isAr } = useLocale();
  const hero = size === "lg" || size === "lockup";
  const name = isAr ? "إليفيشن" : "Elevation";
  const product = isAr ? "منصة إقراض بالذكاء الاصطناعي" : "AI Driven Loan Platform";
  const tagline = isAr ? "نحوّل الرحلة" : "Transforming the Journey";

  return (
    <span className={cn("inline-flex flex-col items-center bg-transparent text-center", className)}>
      <Image
        src="/brand/logo.png"
        alt=""
        width={562}
        height={262}
        priority
        unoptimized
        style={{ backgroundColor: "transparent" }}
        className={cn(
          "shrink-0 bg-transparent object-contain mix-blend-normal",
          compact ? "h-8 w-auto" : iconClass[size],
        )}
      />
      <span
        className={cn(
          "mt-1 flex w-full flex-col items-center bg-transparent text-center",
          hero && "mt-4",
          compact && "mt-0.5",
        )}
        dir={isAr ? "rtl" : "ltr"}
        lang={isAr ? "ar" : "en"}
      >
        <span
          className={cn(
            "bg-transparent font-display font-bold uppercase leading-none tracking-[0.16em]",
            compact ? "text-xs" : hero ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
            isAr && "font-display-ar tracking-normal",
            light ? "text-cream" : "text-navy",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "bg-transparent font-bold uppercase leading-tight text-[#C5A059]",
            compact
              ? "mt-0.5 text-[8px] tracking-[0.14em]"
              : hero
                ? "mt-1 text-xs tracking-[0.18em] sm:text-sm"
                : "mt-1 text-xs tracking-[0.12em] sm:text-sm",
          )}
        >
          {product}
        </span>
        {compact ? null : (
          <span
            className={cn(
              "mt-1 bg-transparent font-medium leading-snug",
              hero ? "text-sm" : "text-xs sm:text-sm",
              light ? "text-[#C5A059]" : "text-navy",
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}

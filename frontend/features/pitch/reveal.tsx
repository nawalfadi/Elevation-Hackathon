"use client";

import { BiInline } from "@frontend/components/ui/bilingual";
import { cn } from "@frontend/utils/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  en,
  ar,
  light = false,
}: {
  children?: ReactNode;
  en?: string;
  ar?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
        light ? "text-white/45" : "text-ink-faint",
      )}
    >
      {en && ar ? <BiInline en={en} ar={ar} /> : children}
    </p>
  );
}

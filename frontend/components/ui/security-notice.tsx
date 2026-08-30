"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { Button } from "@frontend/components/ui/button";
import { useSession } from "@frontend/hooks/use-auth";
import { ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "elevation_security_prompt";

export function markSecurityPromptPending() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, "pending");
}

function dismissSecurityPrompt() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, "dismissed");
}

export function SecurityNotice() {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const user = data && "user" in data ? data.user : null;
  const shieldHref = user?.role === "customer" ? "/app/shield" : "/shield";
  const onShield = pathname === "/app/shield" || pathname === "/shield";

  useEffect(() => {
    if (onShield) {
      dismissSecurityPrompt();
      setOpen(false);
      return;
    }
    setOpen(window.sessionStorage.getItem(STORAGE_KEY) === "pending");
  }, [onShield]);

  function skip() {
    dismissSecurityPrompt();
    setOpen(false);
  }

  function read() {
    dismissSecurityPrompt();
    setOpen(false);
    router.push(shieldHref);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/55 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="security-notice-title"
        className="w-full max-w-md rounded-card border border-gold/30 bg-surface p-7 shadow-navy"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
          <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h2 id="security-notice-title" className="mt-4 font-display text-2xl font-bold tracking-tight">
          <Bi en="Security and data protection" ar="الأمان وحماية البيانات" compact />
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-ink-muted">
          <Bi
            en="Would you like to read how Elevation protects your information, or skip and continue?"
            ar="هل تريد قراءة كيف تحمي إليفيشن معلوماتك، أم التخطي والمتابعة؟"
            compact
          />
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" className="w-full sm:w-auto" onClick={skip}>
            <BiInline en="Skip" ar="تخطي" />
          </Button>
          <Button className="w-full sm:w-auto" onClick={read}>
            <BiInline en="Read" ar="اقرأ" />
          </Button>
        </div>
      </div>
    </div>
  );
}

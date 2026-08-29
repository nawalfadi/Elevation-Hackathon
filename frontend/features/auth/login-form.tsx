"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { useLocale } from "@frontend/hooks/use-locale";
import { overlay } from "@backend/i18n/catalog";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { useLogin } from "@frontend/hooks/use-auth";
import { useState } from "react";

const demos = [
  { email: "maya@elevation.app", password: "demo", role: "Customer", roleAr: "عميل" },
  { email: "jordan@elevation.app", password: "demo", role: "Customer", roleAr: "عميل" },
  { email: "alex@elevation.app", password: "demo", role: "Reviewer", roleAr: "مراجع" },
  { email: "priya@elevation.app", password: "demo", role: "Manager", roleAr: "مدير" },
];

export function LoginForm() {
  const login = useLogin();
  const { t } = useLocale();
  const [email, setEmail] = useState("maya@elevation.app");
  const [password, setPassword] = useState("demo");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <Input label={<BiInline en="Email" ar="البريد" />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        label={<BiInline en="Password" ar="كلمة المرور" />}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {login.error ? (
        <p className="text-sm text-terracotta">
          <Bi pair={overlay(login.error.message)} compact />
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? (
          <BiInline en="Signing in…" ar="جارٍ الدخول…" />
        ) : (
          <BiInline en="Continue" ar="متابعة" />
        )}
      </Button>
      <div className="pt-2">
        <p className="text-xs uppercase tracking-[0.16em] text-ink-faint">
          <BiInline en="Demo accounts" ar="حسابات تجريبية" />
        </p>
        <div className="mt-3 grid gap-2">
          {demos.map((demo) => (
            <button
              key={demo.email}
              type="button"
              className="rounded-control border border-line bg-canvas/70 px-3 py-2.5 text-left hover:border-accent/30 hover:bg-white"
              onClick={() => {
                setEmail(demo.email);
                setPassword(demo.password);
              }}
            >
              <p className="text-xs font-medium text-ink">{t(demo.role, demo.roleAr)}</p>
              <p className="mt-1 font-mono text-[12px] text-ink-muted">{demo.email}</p>
              <p className="mt-0.5 text-[11px] text-ink-faint">
                {t(`Password ${demo.password}`, `كلمة المرور ${demo.password}`)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

"use client";

import { Logo } from "@frontend/components/layout/logo";
import { SiteHeader } from "@frontend/components/layout/site-header";
import { BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { SecurityNotice } from "@frontend/components/ui/security-notice";
import { useLogout, useSession } from "@frontend/hooks/use-auth";
import { useLocale } from "@frontend/hooks/use-locale";
import { cn } from "@frontend/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const rolesEn: Record<string, string> = {
  customer: "Customer",
  reviewer: "Reviewer",
  manager: "Manager",
};

const rolesAr: Record<string, string> = {
  customer: "عميل",
  reviewer: "مراجع",
  manager: "مدير",
};

function isNavActive(pathname: string, href: string) {
  if (href === "/app" || href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavItem {
  href: string;
  label: string;
  labelAr: string;
  cta?: boolean;
  roles?: Array<"customer" | "reviewer" | "manager">;
}

export function AppShell({
  items,
  children,
}: {
  items: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { data } = useSession();
  const logout = useLogout();
  const { t } = useLocale();
  const user = data && "user" in data ? data.user : null;
  const visible = items.filter((item) => !item.roles || (user && item.roles.includes(user.role)));
  const roleLabel = user ? t(rolesEn[user.role] ?? user.role, rolesAr[user.role] ?? user.role) : "";

  function itemClass(item: NavItem) {
    if (item.cta) {
      return "rounded-full bg-gradient-to-r from-[#C5A059] to-[#E5C158] px-5 py-2 text-sm font-semibold text-[#0B1AA3] shadow-[0_0_15px_rgba(229,193,88,0.4)] transition-all hover:shadow-[0_0_22px_rgba(229,193,88,0.6)]";
    }
    return cn(
      "cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
      isNavActive(pathname, item.href)
        ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-[#0B1AA3] shadow-[0_0_15px_rgba(229,193,88,0.4)]"
        : "text-white/80 hover:text-white",
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader>
        <div className="gold-rule" />
        <div className="flex min-h-20 w-full items-center justify-between px-8 py-2">
          <Link
            href={user?.role === "customer" ? "/app" : "/admin"}
            className="shrink-0 bg-transparent"
          >
            <Logo light size="md" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {visible.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass(item)}>
                <BiInline en={item.label} ar={item.labelAr} />
              </Link>
            ))}
          </nav>
          <div className="flex items-end gap-6">
            <LanguageSwitch light />
            <div className="flex flex-col items-end gap-1.5">
              {user ? (
                <div className="rounded-lg bg-gradient-to-r from-[#C5A059] to-[#E5C158] px-3 py-1.5 text-right">
                  <p className="font-semibold text-[#0B1AA3]">{user.full_name}</p>
                  <p className="text-xs capitalize text-[#0B1AA3]/70">{roleLabel}</p>
                </div>
              ) : null}
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-white/90"
                onClick={() => logout.mutate()}
              >
                <BiInline en="Sign out" ar="تسجيل الخروج" />
              </button>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-8 overflow-x-auto px-8 pb-3 md:hidden">
          {visible.map((item) => (
            <Link key={item.href} href={item.href} className={cn("whitespace-nowrap", itemClass(item))}>
              <BiInline en={item.label} ar={item.labelAr} />
            </Link>
          ))}
        </nav>
      </SiteHeader>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
      <SecurityNotice />
    </div>
  );
}

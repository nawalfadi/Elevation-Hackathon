import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { LoginForm } from "@frontend/features/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <PageTransition>
        <div className="w-full max-w-md rounded-card border border-line bg-white p-8 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <Logo />
            <LanguageSwitch />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            <Bi en="Welcome back" ar="مرحباً بعودتك" compact />
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            <Bi
              en="Sign in to continue an application or review queue."
              ar="سجّل الدخول لمتابعة طلب أو طابور المراجعة."
              compact
            />
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-6 text-sm text-ink-muted">
            <BiInline en="New here?" ar="جديد هنا؟" />{" "}
            <Link href="/signup" className="text-ink underline-offset-4 hover:underline">
              <BiInline en="Create an account" ar="أنشئ حساباً" />
            </Link>
          </p>
        </div>
      </PageTransition>
    </div>
  );
}

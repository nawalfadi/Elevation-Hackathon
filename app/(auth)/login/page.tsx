import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { LoginForm } from "@frontend/features/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="ink-panel relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="absolute right-4 top-4 z-10 sm:right-8 sm:top-6">
        <LanguageSwitch light notice="left" />
      </div>
      <PageTransition>
        <div className="relative z-10 flex w-full max-w-md flex-col items-center">
          <Logo light size="lockup" />
          <div className="mt-8 w-full overflow-hidden rounded-card border border-gold/25 bg-surface p-8 shadow-navy">
            <h1 className="font-display text-3xl font-bold tracking-tight">
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
              <Link href="/signup" className="text-navy underline-offset-4 hover:text-gold hover:underline">
                <BiInline en="Create an account" ar="أنشئ حساباً" />
              </Link>
            </p>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}

import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { SignupForm } from "@frontend/features/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
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
              <Bi en="Create your workspace" ar="أنشئ مساحتك" compact />
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              <Bi
                en="Applicants start here. Staff accounts are provisioned separately."
                ar="المتقدمون يبدأون هنا. حسابات الموظفين تُنشأ بشكل منفصل."
                compact
              />
            </p>
            <div className="mt-6">
              <SignupForm />
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              <BiInline en="Already have access?" ar="لديك حساب؟" />{" "}
              <Link href="/login" className="text-navy underline-offset-4 hover:text-gold hover:underline">
                <BiInline en="Sign in" ar="تسجيل الدخول" />
              </Link>
            </p>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}

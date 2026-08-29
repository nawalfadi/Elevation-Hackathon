"use client";

import { Logo } from "@frontend/components/layout/logo";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { useLocale } from "@frontend/hooks/use-locale";
import { Eyebrow, Reveal } from "@frontend/features/pitch/reveal";
import { cn } from "@frontend/utils/cn";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  EyeOff,
  FileSearch,
  Flag,
  Gauge,
  LayoutDashboard,
  ListChecks,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const problems = [
  {
    icon: EyeOff,
    title: { en: "No visibility", ar: "لا شفافية" },
    body: {
      en: "Applicants guess which documents they need. Reviewers open folders with no shared status.",
      ar: "المتقدم يخمن المستندات المطلوبة. والمراجع يفتح مجلدات بلا حالة مشتركة.",
    },
  },
  {
    icon: FileSearch,
    title: { en: "No proof", ar: "لا إثبات" },
    body: {
      en: "Blurry IDs and incomplete packets still reach underwriting. Failures show up too late.",
      ar: "هويات باهتة وملفات ناقصة تصل للتدقيق. والفشل يظهر متأخراً.",
    },
  },
  {
    icon: SlidersHorizontal,
    title: { en: "No accountability", ar: "لا مساءلة" },
    body: {
      en: "Approve or reject happens in Slack and email. Nobody can explain the decision later.",
      ar: "القبول والرفض يحدثان في الرسائل. ولا أحد يشرح القرار لاحقاً.",
    },
  },
];

const roles = [
  {
    title: { en: "Applicant", ar: "المتقدم" },
    line: {
      en: "A living checklist, drag-and-drop validation, and a live tracker after every decision.",
      ar: "قائمة مستندات حيّة، تحقق بالسحب والإفلات، ومتتبع مباشر بعد كل قرار.",
    },
  },
  {
    title: { en: "Reviewer", ar: "المراجع" },
    line: {
      en: "A file summary, open flags, and an AI recommendation before they post a decision.",
      ar: "ملخص الملف والإشارات المفتوحة وتوصية الذكاء الاصطناعي قبل إصدار القرار.",
    },
  },
  {
    title: { en: "Manager", ar: "المدير" },
    line: {
      en: "Volume, approval rate, and review time from real events — not a slide of fake numbers.",
      ar: "الحجم ونسبة القبول ووقت المراجعة من أحداث حقيقية — ليست أرقاماً ثابتة.",
    },
  },
  {
    title: { en: "The system", ar: "النظام" },
    line: {
      en: "Rules, statuses, and document types live in catalogs. The UI never hardcodes the product.",
      ar: "القواعد والحالات وأنواع المستندات في كتالوجات. الواجهة لا تثبّت منطق المنتج.",
    },
  },
];

const features = [
  {
    icon: ListChecks,
    title: { en: "Dynamic checklist", ar: "قائمة ديناميكية" },
    body: {
      en: "Answers fire a rules engine. Self-employed gets tax returns. Employed gets a letter.",
      ar: "الإجابات تشغّل محرك قواعد. العمل الحر يطلب إقراراً. الموظف يطلب خطاب عمل.",
    },
  },
  {
    icon: ScanSearch,
    title: { en: "Live validation", ar: "تحقق فوري" },
    body: {
      en: "Pending, success, or error from an API — with the exact issue written back to the file.",
      ar: "قيد الانتظار أو نجاح أو خطأ من الواجهة البرمجية — مع سبب واضح على الملف.",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Status pipeline", ar: "مسار الحالة" },
    body: {
      en: "Submitted, under review, approved, rejected. Stages come from the catalog, not a hardcoded bar.",
      ar: "مقدَّم، قيد المراجعة، مقبول، مرفوض. المراحل من الكتالوج وليست شريطاً ثابتاً.",
    },
  },
  {
    icon: Flag,
    title: { en: "Fraud flags", ar: "إشارات الاحتيال" },
    body: {
      en: "Unreadable titles, income mismatch, pending statements — a dynamic list, not a badge.",
      ar: "ملكية غير مقروءة أو دخل غير مطابق — قائمة ديناميكية لا شارة ثابتة.",
    },
  },
  {
    icon: Gauge,
    title: { en: "AI copilot", ar: "مساعد ذكي" },
    body: {
      en: "Approve, review, or reject with confidence, risk score, and the factors that moved it.",
      ar: "قبول أو مراجعة أو رفض مع الثقة ودرجة المخاطر والعوامل المؤثرة.",
    },
  },
];

const journey = [
  { step: "01", en: "Answers captured", ar: "التقاط الإجابات" },
  { step: "02", en: "Checklist generated", ar: "توليد القائمة" },
  { step: "03", en: "Files validated", ar: "التحقق من الملفات" },
  { step: "04", en: "Packet submitted", ar: "تقديم الملف" },
  { step: "05", en: "AI scored", ar: "تقييم الذكاء" },
  { step: "06", en: "Decision posted", ar: "إصدار القرار" },
];

const guardrails = [
  {
    icon: ShieldCheck,
    title: { en: "Proof required", ar: "الإثبات إلزامي" },
    body: {
      en: "A file is not “uploaded.” It is validated against type, size, and quality before it counts.",
      ar: "الملف لا يُعد مرفوعاً حتى يُتحقق من نوعه وحجمه وجودته.",
    },
  },
  {
    icon: LayoutDashboard,
    title: { en: "Rules, not if-statements", ar: "قواعد لا شروط ثابتة" },
    body: {
      en: "Mortgage, auto, and business packs change when catalogs change. No redeploy for a new doc.",
      ar: "حزم الرهن والسيارة والتجاري تتغير مع الكتالوج. بلا إعادة نشر لكل مستند جديد.",
    },
  },
  {
    icon: Users,
    title: { en: "Approval scales with risk", ar: "القبول يتناسب مع المخاطر" },
    body: {
      en: "Clean packets can go straight through. Flags and failed OCR force a human into the loop.",
      ar: "الملفات النظيفة تمر مباشرة. الإشارات والفشل يجبران تدخلاً بشرياً.",
    },
  },
];

const audit = [
  { who: "Maya Chen", whoAr: "مايا تشن", en: "submitted a personal loan", ar: "قدّمت قرضاً شخصياً", time: "5d ago", timeAr: "قبل 5 أيام" },
  { who: "System", whoAr: "النظام", en: "flagged an unreadable vehicle title", ar: "أشار إلى استمارة غير مقروءة", time: "4d ago", timeAr: "قبل 4 أيام" },
  { who: "Alex Rivera", whoAr: "أليكس ريفيرا", en: "requested resubmission on the auto file", ar: "طلب إعادة رفع لملف السيارة", time: "1d ago", timeAr: "قبل يوم" },
  { who: "Priya Shah", whoAr: "بريا شاه", en: "approved Jordan Hale’s mortgage", ar: "قبلت رهن جوردان هيل", time: "8d ago", timeAr: "قبل 8 أيام" },
];

export function PitchPage() {
  const { isAr, t } = useLocale();

  return (
    <div className="bg-canvas text-ink">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#050507]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo className="text-white" />
          <div className="flex items-center gap-3">
            <LanguageSwitch light />
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              <BiInline en="Open Elevation" ar="افتح إليفيشن" />
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="ink-panel relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-28 text-white">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <Eyebrow en="Elevation" ar="إليفيشن" light />
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[84px]"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  الإقراض يعمل بالفوضى.
                  <br />
                  بنينا الحل.
                </>
              ) : (
                <>
                  Lending runs on chaos.
                  <br />
                  We built the fix.
                </>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {t(
                "One system replaces scattered checklists, email threads, and guesswork. Applicants upload with certainty. Reviewers decide with a copilot.",
                "نظام واحد يستبدل القوائم المتفرقة والرسائل والتخمين. المتقدم يرفع بيقين. والمراجع يقرر بمساعد ذكي.",
              )}
            </p>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t("Scroll to explore", "مرّر للاستكشاف")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="The problem" ar="المشكلة" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Why this exists" ar="لماذا وُجد هذا" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {problems.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.1}>
              <Card>
                <item.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-5 text-xl font-semibold">
                  <Bi pair={item.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={item.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="The solution" ar="الحل" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Meet the roles" ar="تعرّف على الأدوار" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal key={role.title.en} delay={index * 0.08}>
              <Card className="min-h-[180px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">
                  <Bi pair={role.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={role.line} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="What we built" ar="ماذا بنينا" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="The product, not a deck" ar="المنتج نفسه، ليس عرضاً" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title.en} delay={index * 0.08}>
              <Card>
                <feature.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-5 text-lg font-semibold">
                  <Bi pair={feature.title} compact />
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  <Bi pair={feature.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="How it works" ar="كيف يعمل" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="The review journey" ar="رحلة المراجعة" />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-[24px] border border-line bg-white px-6 py-10 shadow-soft">
            <ol className="flex min-w-[860px] items-start">
              {journey.map((item, index) => (
                <li key={item.step} className="flex flex-1 items-start">
                  <div className="flex min-w-0 flex-col items-center text-center">
                    <span className="font-mono text-[11px] text-ink-faint">{item.step}</span>
                    <span className="mt-3 h-2.5 w-2.5 rounded-full bg-accent" />
                    <span className="mt-3 max-w-[130px] text-sm font-medium leading-5">
                      <Bi en={item.en} ar={item.ar} compact />
                    </span>
                  </div>
                  {index < journey.length - 1 ? <div className="mx-2 mt-8 h-px flex-1 bg-line" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="Why it’s trustworthy" ar="لماذا يمكن الوثوق به" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Guardrails" ar="ضوابط الحماية" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {guardrails.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.1}>
              <Card>
                <item.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-5 text-xl font-semibold">
                  <Bi pair={item.title} compact />
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                  <Bi pair={item.body} compact />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow en="Live audit trail" ar="سجل التدقيق الحي" />
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            <Bi en="Nothing disappears" ar="لا شيء يختفي" />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-white shadow-soft">
            {audit.map((row) => (
              <div key={row.en} className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-5">
                <p className="text-[15px]">
                  <span className="font-semibold">{isAr ? row.whoAr : row.who}</span>{" "}
                  <span className="text-ink-muted">{isAr ? row.ar : row.en}</span>
                </p>
                <p className="font-mono text-xs text-ink-faint">{isAr ? row.timeAr : row.time}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-16">
        <div className="ink-panel mx-auto max-w-6xl rounded-[28px] px-8 py-20 text-white sm:px-16 sm:py-24">
          <Reveal>
            <Eyebrow en="The handoff" ar="التسليم" light />
            <h2
              className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  هذا ليس نموذجاً.
                  <br />
                  إنه يعمل الآن.
                </>
              ) : (
                <>
                  This isn’t a mockup.
                  <br />
                  It’s live.
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/65" dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
              {t(
                "Every checklist, flag, and chart on the next screen is computed — not hardcoded.",
                "كل قائمة وإشارة ورسم في الشاشة التالية محسوب — وليس مكتوباً يدوياً.",
              )}
            </p>
            <Link
              href="/login"
              className="mt-10 inline-flex h-14 items-center gap-3 rounded-full px-7 text-base font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #3D4F46 0%, #6B8A74 100%)" }}
            >
              <BiInline en="Open Elevation" ar="افتح إليفيشن" />
              <ArrowRight className="h-5 w-5" />
            </Link>
            <div className="mt-6 space-y-1.5 font-mono text-[11px] text-white/45">
              <p>
                <BiInline en="Demo accounts · password demo" ar="حسابات تجريبية · كلمة المرور demo" />
              </p>
              <p>maya@elevation.app · {t("Customer", "عميل")}</p>
              <p>jordan@elevation.app · {t("Customer", "عميل")}</p>
              <p>alex@elevation.app · {t("Reviewer", "مراجع")}</p>
              <p>priya@elevation.app · {t("Manager", "مدير")}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article className={cn("h-full rounded-[24px] border border-line bg-white p-7 shadow-soft", className)}>
      {children}
    </article>
  );
}

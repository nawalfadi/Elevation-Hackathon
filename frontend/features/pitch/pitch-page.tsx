"use client";

import { Logo } from "@frontend/components/layout/logo";
import { SiteHeader } from "@frontend/components/layout/site-header";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { LanguageSwitch } from "@frontend/components/ui/language-switch";
import { useLocale } from "@frontend/hooks/use-locale";
import { Eyebrow, Reveal } from "@frontend/features/pitch/reveal";
import { cn } from "@frontend/utils/cn";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  CircleHelp,
  Eye,
  Flag,
  Gauge,
  LayoutDashboard,
  ListChecks,
  RefreshCw,
  ScanSearch,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const pitch = {
  navy: "text-[#152454]",
  cardTitle: "text-[#1E32C4]",
  body: "font-sans text-sm leading-relaxed text-[#484488]",
  gold: "text-[#C5A059]",
};

const problems = [
  {
    icon: Eye,
    title: { en: "Zero Visibility", ar: "صفر شفافية" },
    body: {
      en: "Doesn't know required documents upfront, leading to expired or low quality uploads.",
      ar: "لا يعرف المستندات المطلوبة مسبقاً، فيرفع ملفات منتهية أو ضعيفة الجودة.",
    },
  },
  {
    icon: CircleHelp,
    title: { en: "Vague Rejections", ar: "رفض غامض" },
    body: {
      en: "Generic 'incomplete document' notices without clear fix instructions.",
      ar: "إشعارات عامة مثل «مستند ناقص» بلا تعليمات واضحة للإصلاح.",
    },
  },
  {
    icon: Building2,
    title: { en: "Branch Dependency", ar: "الاعتماد على الفرع" },
    body: {
      en: "Forced physical visits to resubmit documents and restart from scratch.",
      ar: "زيارات حضورية لإعادة تقديم المستندات والبدء من الصفر.",
    },
  },
  {
    icon: RefreshCw,
    title: { en: "Redundant Requests", ar: "طلبات متكررة" },
    body: {
      en: "Repeating the exact same document verification process for every new loan.",
      ar: "تكرار نفس عملية التحقق من المستندات مع كل قرض جديد.",
    },
  },
];

const roles = [
  {
    title: { en: "60 to 70% manual drag", ar: "٦٠ إلى ٧٠٪ عبء يدوي" },
    line: {
      en: "Employees sift through PDFs and chase applicants for missing files.",
      ar: "الموظف يفرز ملفات PDF ويلاحق المتقدمين للمستندات الناقصة.",
    },
  },
  {
    title: { en: "5 tab system switching", ar: "التنقل بين خمس أنظمة" },
    line: {
      en: "Manually checking Absher, GOSI, Zakat, Sijil, and Simah.",
      ar: "فحص يدوي في أبشر والتأمينات والزكاة والسجل وسمة.",
    },
  },
  {
    title: { en: "Human eye fraud risk", ar: "مخاطر احتيال بالعين المجردة" },
    line: {
      en: "Undetected tampering, inconsistent decisions, and systemic backlog.",
      ar: "تلاعب غير مكتشف وقرارات غير متسقة وتراكم منهجي.",
    },
  },
  {
    title: { en: "Compliance risk & fatigue", ar: "مخاطر الامتثال والإرهاق" },
    line: {
      en: "Tedious manual regulatory checks leading to human error, compliance liability, and operational stress.",
      ar: "فحوصات تنظيمية يدوية مرهقة تؤدي إلى خطأ بشري ومسؤولية امتثال وضغط تشغيلي.",
    },
  },
];

const features = [
  {
    icon: ListChecks,
    title: { en: "Dynamic document checklist", ar: "قائمة مستندات ديناميكية" },
    body: {
      en: "Personalized, exact list by loan type.",
      ar: "قائمة دقيقة ومخصصة حسب نوع القرض.",
    },
  },
  {
    icon: ScanSearch,
    title: { en: "Real time validator", ar: "تحقق فوري" },
    body: {
      en: "Catches blur, expiry, name or ID mismatch before submit.",
      ar: "يلتقط الضباب وانتهاء الصلاحية وعدم تطابق الاسم أو الهوية قبل الإرسال.",
    },
  },
  {
    icon: BadgeCheck,
    title: { en: "Live tracker + rejection explainer", ar: "متتبع حي وشرح للرفض" },
    body: {
      en: "Status in the open. Fixes in plain Arabic.",
      ar: "الحالة ظاهرة. والإصلاح بلغة عربية واضحة.",
    },
  },
  {
    icon: Flag,
    title: { en: "Fraud detection engine", ar: "محرك كشف الاحتيال" },
    body: {
      en: "Metadata checks, duplicate IPs and phones, and tamper flags.",
      ar: "فحص البيانات الوصفية والأرقام المكررة وإشارات التلاعب.",
    },
  },
  {
    icon: Gauge,
    title: { en: "AI confidence + policy checker", ar: "درجة الثقة وفحص السياسة" },
    body: {
      en: "Score the file. Flag compliance gaps automatically.",
      ar: "تقييم الملف وكشف فجوات الامتثال تلقائياً.",
    },
  },
];

const pipeline = [
  {
    step: "01",
    name: { en: "Absher", ar: "أبشر" },
    role: {
      en: "National ID or Iqama and Biometric Verification",
      ar: "التحقق من الهوية الوطنية أو الإقامة والبصمة",
    },
  },
  {
    step: "02",
    name: { en: "GOSI", ar: "التأمينات" },
    role: {
      en: "General Organization for Social Insurance",
      ar: "المؤسسة العامة للتأمينات الاجتماعية",
    },
  },
  {
    step: "03",
    name: { en: "Zakat, Tax and Customs Authority", ar: "هيئة الزكاة والضريبة والجمارك" },
    role: {
      en: "ZATCA, Zakat",
      ar: "هيئة الزكاة والضريبة والجمارك",
    },
  },
  {
    step: "04",
    name: { en: "Sijil", ar: "السجل" },
    role: {
      en: "Commercial Registration, Ministry of Commerce",
      ar: "السجل التجاري / وزارة التجارة",
    },
  },
  {
    step: "05",
    name: { en: "SIMAH", ar: "سمة" },
    role: {
      en: "Saudi Credit Bureau",
      ar: "الشركة السعودية للمعلومات الائتمانية",
    },
  },
  {
    step: "06",
    name: { en: "AI Decision Copilot", ar: "مساعد قرار الذكاء الاصطناعي" },
    role: {
      en: "Aggregates all payloads into an AI Confidence Score and instant recommendation",
      ar: "يجمع كل النتائج في درجة ثقة وتوصية فورية",
    },
  },
];

const guardrails = [
  {
    icon: ShieldCheck,
    title: { en: "In browser client redaction", ar: "إخفاء من المتصفح" },
    body: {
      en: "PII, national ID numbers, and sensitive fields are blurred or masked on the client side before display.",
      ar: "تُموَّه الهوية الوطنية والحقول الحساسة في المتصفح قبل العرض.",
    },
  },
  {
    icon: LayoutDashboard,
    title: { en: "Metadata tamper detection", ar: "كشف تلاعب البيانات الوصفية" },
    body: {
      en: "Instant local analysis flagging altered PDF timestamps, cloned layers, and suspicious editing software tags.",
      ar: "تحليل محلي فوري يشير إلى تعديل الوقت أو الطبقات المنسوخة أو برامج التحرير المشبوهة.",
    },
  },
  {
    icon: Users,
    title: { en: "Zero retention client mock", ar: "بدون احتفاظ بالملفات" },
    body: {
      en: "Session only memory simulation. No sensitive files persisted to a live database.",
      ar: "ذاكرة للجلسة فقط، بلا حفظ ملفات حساسة في قاعدة بيانات حية.",
    },
  },
];

const audit = [
  { who: "Avg. loan processing", whoAr: "متوسط معالجة القرض", en: "2 to 3 weeks to 2 to 3 days", ar: "من ٢ إلى ٣ أسابيع إلى ٢ إلى ٣ أيام", time: "ROI", timeAr: "الأثر" },
  { who: "Employee review time", whoAr: "وقت مراجعة الموظف", en: "about 45 min to about 8 min", ar: "من نحو ٤٥ د إلى نحو ٨ د", time: "ROI", timeAr: "الأثر" },
  { who: "Incomplete submissions", whoAr: "الطلبات الناقصة", en: "about 60% to about 10%", ar: "من نحو ٦٠٪ إلى نحو ١٠٪", time: "ROI", timeAr: "الأثر" },
  { who: "Employee capacity", whoAr: "طاقة الموظف", en: "1x baseline to 5x throughput", ar: "من ١× إلى ٥×", time: "ROI", timeAr: "الأثر" },
];

export function PitchPage() {
  const { isAr, t } = useLocale();

  return (
    <div className="bg-canvas text-ink">
      <SiteHeader>
        <div className="gold-rule" />
        <div className="flex items-center justify-between gap-4 px-8 py-3">
          <Link href="/" className="shrink-0">
            <Logo light size="md" />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitch light />
            <div className="flex w-[min(100%,16.5rem)] flex-col gap-2">
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C158] to-[#C5A059] px-5 py-2.5 text-sm font-bold text-[#0B1AA3] shadow-[0_0_20px_rgba(229,193,88,0.4)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(229,193,88,0.7)]"
              >
                <BiInline en="Launch Live Demo" ar="افتح التجربة الحية" />
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shield"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C158] to-[#C5A059] px-5 py-2.5 text-sm font-bold text-[#0B1AA3] shadow-[0_0_20px_rgba(229,193,88,0.4)] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(229,193,88,0.7)]"
              >
                <Shield className="h-4 w-4" strokeWidth={1.5} />
                <BiInline en="Behind the Shield" ar="خلف الدرع" />
              </Link>
            </div>
          </div>
        </div>
      </SiteHeader>

      <section className="ink-panel relative flex min-h-[calc(100vh-7rem)] flex-col justify-center px-6 py-16 text-white">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Reveal>
            <h1
              className="max-w-4xl font-display text-5xl leading-[1.2] tracking-tight sm:text-7xl sm:leading-[1.18] lg:text-[84px] lg:leading-[1.16]"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  الإقراض يستغرق أسابيع.
                  <br />
                  <span className="gold-text">اختصرناه إلى دقائق.</span>
                </>
              ) : (
                <>
                  Loan processing takes weeks.
                  <br />
                  <span className="gold-text">We cut it to minutes.</span>
                </>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-8 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {t(
                "A unified, two sided AI engine that validates customer documents instantly and provides employees with an auto verified copilot.",
                "محرك ذكاء اصطناعي موحّد للطرفين يتحقق من مستندات العميل فوراً ويمنح الموظفين مساعداً موثّقاً تلقائياً.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  header: { en: "2–3 Weeks → 2–3 Days", ar: "٢–٣ أسابيع ← ٢–٣ أيام" },
                  label: { en: "Avg. Processing Time", ar: "متوسط وقت المعالجة" },
                },
                {
                  header: { en: "45 Min → 8 Min", ar: "٤٥ د ← ٨ د" },
                  label: { en: "Employee Review Time", ar: "وقت مراجعة الموظف" },
                },
                {
                  header: { en: "5× Capacity", ar: "٥× الطاقة" },
                  label: { en: "Reviewer Throughput", ar: "طاقة المراجع" },
                },
              ].map((kpi) => (
                <article
                  key={kpi.label.en}
                  className="rounded-2xl border border-gold/35 bg-white/[0.06] px-5 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md"
                >
                  <p className="font-display text-xl font-bold leading-snug text-cream sm:text-2xl">
                    {isAr ? kpi.header.ar : kpi.header.en}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    {isAr ? kpi.label.ar : kpi.label.en}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t("Scroll to explore pitch", "مرّر لاستكشاف العرض")}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrowEn="The pain points" eyebrowAr="نقاط الألم" titleEn="The customer friction" titleAr="احتكاك العميل" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {problems.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.08}>
              <PitchCard>
                <IconWell>
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </IconWell>
                <h3 className={cn("mt-6 font-display text-xl font-bold", pitch.cardTitle)}>
                  <Bi pair={item.title} compact />
                </h3>
                <p className={cn("mt-3", pitch.body)}>
                  <Bi pair={item.body} compact />
                </p>
              </PitchCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrowEn="The architecture" eyebrowAr="البنية" titleEn="The employee bottleneck" titleAr="اختناق الموظف" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {roles.map((role, index) => (
            <Reveal key={role.title.en} delay={index * 0.08}>
              <PitchCard>
                <IconWell>
                  <span className="font-mono text-sm font-semibold">0{index + 1}</span>
                </IconWell>
                <h3 className={cn("mt-6 font-display text-xl font-bold", pitch.cardTitle)}>
                  <Bi pair={role.title} compact />
                </h3>
                <p className={cn("mt-3", pitch.body)}>
                  <Bi pair={role.line} compact />
                </p>
              </PitchCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHead eyebrowEn="Two connected products" eyebrowAr="منتجان متصلان" titleEn="One AI core" titleAr="قلب ذكاء واحد" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title.en} delay={index * 0.08}>
              <PitchCard>
                <IconWell>
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </IconWell>
                <h3 className={cn("mt-6 font-display text-xl font-bold", pitch.cardTitle)}>
                  <Bi pair={feature.title} compact />
                </h3>
                <p className={cn("mt-3", pitch.body)}>
                  <Bi pair={feature.body} compact />
                </p>
              </PitchCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#484488]">
            <BiInline en="Automated cross checking" ar="فحص حكومي آلي" />
          </p>
          <h2 className={cn("mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl", pitch.navy)}>
            <Bi en="Simulated Government Integration" ar="تكامل حكومي محاكى" />
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-14 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
            <ol className="relative">
              <div className="absolute bottom-8 top-8 w-px bg-[#C5A059]/55 start-6" />
              {pipeline.map((item) => (
                <li key={item.step} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-semibold text-[#C5A059] shadow-[0_0_0_4px_#FFFFFF]">
                    {item.step}
                  </div>
                  <article className="min-w-0 flex-1 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:scale-[1.01] hover:border-slate-200/80 hover:bg-[#FFFFF0] hover:shadow-[0_8px_28px_rgba(197,160,89,0.16)] sm:p-5">
                    <h3 className={cn("font-display text-xl font-bold", pitch.cardTitle)}>
                      <Bi pair={item.name} compact />
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-[#333333]">
                      <Bi pair={item.role} compact />
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <Eyebrow
            en="Zero data risk architecture"
            ar="بدون مخاطر بيانات"
            className="text-xs tracking-[0.15em] text-indigo-900/60"
          />
          <h2 className={cn("mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl", pitch.navy)}>
            <Bi en="Security, privacy & trust" ar="الأمان والخصوصية والثقة" />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {guardrails.map((item, index) => (
            <Reveal key={item.title.en} delay={index * 0.1}>
              <Card>
                <item.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <h3 className={cn("mt-5 font-display text-xl font-bold", pitch.cardTitle)}>
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
          <Eyebrow
            en="Tangible results"
            ar="أثر ملموس"
            className="text-xs tracking-[0.15em] text-indigo-900/60"
          />
          <h2 className={cn("mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl", pitch.navy)}>
            <Bi en="Before vs. after" ar="قبل وبعد" />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-14 divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-white shadow-soft">
            {audit.map((row) => (
              <div key={row.en} className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-5">
                <p className="text-[15px]">
                  <span className={cn("font-semibold", pitch.cardTitle)}>{isAr ? row.whoAr : row.who}</span>{" "}
                  <span className="text-ink-muted">{isAr ? row.ar : row.en}</span>
                </p>
                <p className="font-mono text-xs text-ink-faint">{isAr ? row.timeAr : row.time}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-16">
        <div className="ink-panel relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-20 text-white sm:px-16 sm:py-24">
          <div className="relative z-10">
          <Reveal>
            <Eyebrow en="The handoff" ar="التسليم" light />
            <h2
              className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl"
              dir={isAr ? "rtl" : "ltr"}
              lang={isAr ? "ar" : "en"}
            >
              {isAr ? (
                <>
                  بُني للهاكاثون.
                  <br />
                  جاهز للتجربة.
                </>
              ) : (
                <>
                  Built for the Hackathon.
                  <br />
                  Ready to Test.
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/65" dir={isAr ? "rtl" : "ltr"} lang={isAr ? "ar" : "en"}>
              {t(
                "Experience real time document validation, metadata fraud flags, and instant employee summary profiles.",
                "جرّب التحقق الفوري من المستندات وإشارات الاحتيال وملخص الموظف الفوري.",
              )}
            </p>
            <Link
              href="/login"
              className="mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-gold-gradient px-7 text-base font-semibold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
            >
              <BiInline en="Launch Live Demo" ar="افتح التجربة الحية" />
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({
  eyebrowEn,
  eyebrowAr,
  titleEn,
  titleAr,
}: {
  eyebrowEn: string;
  eyebrowAr: string;
  titleEn: string;
  titleAr: string;
}) {
  return (
    <Reveal>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-900/60">
        <BiInline en={eyebrowEn} ar={eyebrowAr} />
      </p>
      <h2 className={cn("mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl", pitch.navy)}>
        <Bi en={titleEn} ar={titleAr} />
      </h2>
    </Reveal>
  );
}

function PitchCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "h-full rounded-2xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </article>
  );
}

function IconWell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-[#C5A059]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article className={cn("h-full rounded-[24px] border border-line bg-surface p-7 shadow-soft", className)}>
      {children}
    </article>
  );
}

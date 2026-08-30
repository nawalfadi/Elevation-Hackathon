"use client";

import { Badge, statusTone } from "@frontend/components/ui/badge";
import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { PageTransition } from "@frontend/components/ui/page-transition";
import { EmptyState } from "@frontend/components/ui/empty-state";
import { ErrorState } from "@frontend/components/ui/error-state";
import { CardSkeleton } from "@frontend/components/ui/skeleton";
import { KpiCards } from "@frontend/features/performance/kpi-cards";
import { useAdminApplications, useAdminDashboard } from "@frontend/hooks/use-admin";
import { useLocale } from "@frontend/hooks/use-locale";
import { aiActions, lookup, overlay, statuses, types as typeCopy } from "@backend/i18n/catalog";
import { formatDate, relativeTime } from "@frontend/utils/format";
import Link from "next/link";
import { useMemo, useState } from "react";

type QueueFilter = "ALL" | "FLAGGED" | "REVIEWED" | "IN_REVIEW";

export default function AdminDashboardPage() {
  const dashboard = useAdminDashboard();
  const applications = useAdminApplications();
  const { t } = useLocale();
  const [filter, setFilter] = useState<QueueFilter>("ALL");

  const rows = useMemo(() => {
    const all = applications.data ?? [];
    if (filter === "FLAGGED") return all.filter((row) => row.flag_count > 0);
    if (filter === "REVIEWED") return all.filter((row) => row.status.is_terminal);
    if (filter === "IN_REVIEW") return all.filter((row) => row.status.key === "under_review");
    return all;
  }, [applications.data, filter]);

  if (dashboard.isLoading) {
    return (
      <div className="grid gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (dashboard.isError || !dashboard.data) {
    return <ErrorState message={dashboard.error?.message ?? "Unable to load"} onRetry={() => dashboard.refetch()} />;
  }

  const data = dashboard.data;
  const total = data.total_applications;
  const flaggedCount = applications.data?.filter((row) => row.flag_count > 0).length ?? data.open_flags;
  const reviewedCount = applications.data?.filter((row) => row.status.is_terminal).length ?? 0;
  const inReview = data.by_status.find((row) => row.status.key === "under_review")?.count ?? 0;

  return (
    <PageTransition>
      <h1 className="text-3xl font-semibold tracking-tight">
        <Bi en="Review operations" ar="عمليات المراجعة" compact />
      </h1>
      <div className="mt-8">
        <KpiCards
          items={[
            {
              label: t("Total applications", "إجمالي الطلبات"),
              value: String(total),
              hint: t(`Click to view all (${total})`, `اضغط لعرض الكل (${total})`),
              onSelect: () => setFilter("ALL"),
              active: filter === "ALL",
            },
            {
              label: t("Open flags", "إشارات مفتوحة"),
              value: String(data.open_flags),
              hint: t(`Click to filter flagged (${flaggedCount})`, `اضغط لتصفية المعلّمة (${flaggedCount})`),
              hintClass: "text-[#DAFF57]/80",
              onSelect: () => setFilter("FLAGGED"),
              active: filter === "FLAGGED",
            },
            {
              label: t("Avg. review time", "متوسط المراجعة"),
              value: data.avg_review_hours === null ? "n/a" : `${data.avg_review_hours}h`,
              hint: t(`Click to view reviewed (${reviewedCount})`, `اضغط لعرض المراجَعة (${reviewedCount})`),
              onSelect: () => setFilter("REVIEWED"),
              active: filter === "REVIEWED",
            },
            {
              label: t("In review", "قيد المراجعة"),
              value: String(inReview),
              hint: t(`Click to filter active (${inReview})`, `اضغط لتصفية النشطة (${inReview})`),
              onSelect: () => setFilter("IN_REVIEW"),
              active: filter === "IN_REVIEW",
            },
          ]}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          {filter === "FLAGGED" ? (
            <Bi en="Flagged applications" ar="الطلبات المعلّمة" compact />
          ) : filter === "REVIEWED" ? (
            <Bi en="Completed reviews" ar="المراجعات المكتملة" compact />
          ) : filter === "IN_REVIEW" ? (
            <Bi en="Applications in review" ar="الطلبات قيد المراجعة" compact />
          ) : (
            <Bi en="All applications" ar="كل الطلبات" compact />
          )}
        </h2>
        <div className="mt-4">
          {applications.isLoading ? <CardSkeleton rows={5} /> : null}
          {applications.isError ? (
            <ErrorState message={applications.error.message} onRetry={() => applications.refetch()} />
          ) : null}
          {applications.data && rows.length === 0 ? (
            <EmptyState
              title={<Bi en="No matching files" ar="لا ملفات مطابقة" compact />}
              description={<Bi en="Try another filter or wait for the next submission." ar="جرّب تصفية أخرى أو انتظر التقديم التالي." compact />}
            />
          ) : null}
          <div className="grid gap-3">
            {rows.map((row) => (
              <Link
                key={row.application.id}
                href={`/admin/applications/${row.application.id}`}
                className="rounded-card border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{row.applicant.full_name}</p>
                    <p className="mt-1 text-sm text-ink-muted">
                      <BiInline pair={lookup(typeCopy, row.type.key, row.type.name)} /> · {formatDate(row.application.updated_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {row.recommendation &&
                    !((row.recommendation.action === "review" || row.recommendation.action === "reject") &&
                      row.status.key === "under_review") ? (
                      <Badge
                        tone={statusTone(
                          row.recommendation.action === "reject" ? "review" : row.recommendation.action,
                        )}
                      >
                        <BiInline
                          pair={lookup(
                            aiActions,
                            row.recommendation.action === "reject" ? "review" : row.recommendation.action,
                          )}
                        />
                      </Badge>
                    ) : null}
                    <Badge tone={statusTone(row.status.key)}>
                      <BiInline pair={lookup(statuses, row.status.key, row.status.name)} />
                    </Badge>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-muted">
                  {row.validated_count}/{row.document_count} <BiInline en="validated" ar="تم التحقق" /> · {row.flag_count}{" "}
                  <BiInline en="open flags" ar="إشارات مفتوحة" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">
            <Bi en="Pipeline" ar="المسار" compact />
          </h2>
          <ul className="mt-4 space-y-3">
            {data.by_status
              .filter((row) => row.status.pipeline_visible || row.count > 0)
              .map((row) => (
                <li key={row.status.id}>
                  <Link
                    href={`/admin/applications?status=${row.status.key}`}
                    className="flex items-center justify-between text-sm hover:text-ink"
                  >
                    <span className="text-ink-muted">
                      <BiInline pair={lookup(statuses, row.status.key, row.status.name)} />
                    </span>
                    <span className="font-medium">{row.count}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
        <section className="rounded-card border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold">
            <Bi en="Activity" ar="النشاط" compact />
          </h2>
          <ul className="mt-4 space-y-4">
            {data.activity.map((event) => (
              <li key={event.id}>
                <p className="text-sm">
                  <Bi pair={overlay(event.message)} compact />
                </p>
                <p className="mt-1 text-xs text-ink-faint">{relativeTime(event.created_at)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}

"use client";

import { Bi } from "@frontend/components/ui/bilingual";
import { useLocale } from "@frontend/hooks/use-locale";
import { Card, CardBody, CardHeader, CardTitle } from "@frontend/components/ui/card";
import type { PerformanceMetrics } from "@backend/types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PerformanceCharts({ data }: { data: PerformanceMetrics }) {
  const { t } = useLocale();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Bi en="Volume and outcomes" ar="الحجم والنتائج" compact />
        </CardTitle>
      </CardHeader>
      <CardBody className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.series}>
            <CartesianGrid stroke="#E8E6E1" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B6963" }} tickFormatter={(v) => v.slice(5)} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#6B6963" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E8E6E1",
                boxShadow: "0 8px 24px rgba(26,26,24,0.06)",
              }}
            />
            <Area type="monotone" dataKey="submitted" stroke="#3D4F46" fill="#E7EDE9" name={t("Submitted", "مقدَّم")} />
            <Area type="monotone" dataKey="approved" stroke="#3E5C4A" fill="#E6F0EA" name={t("Approved", "مقبول")} />
            <Area type="monotone" dataKey="rejected" stroke="#A85A44" fill="#F6E8E3" name={t("Rejected", "مرفوض")} />
            <Area type="monotone" dataKey="flagged" stroke="#8A6A32" fill="#F4EEDC" name={t("Flagged", "مؤشَّر")} />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}

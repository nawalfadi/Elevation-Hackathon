import { Card, CardBody } from "@frontend/components/ui/card";

export function KpiCards({
  items,
}: {
  items: Array<{ label: string; value: string; hint?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardBody className="pt-6">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
            {item.hint ? <p className="mt-1 text-xs text-ink-muted">{item.hint}</p> : null}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

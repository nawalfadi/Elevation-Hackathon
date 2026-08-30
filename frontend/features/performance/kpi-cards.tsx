import { Card, CardBody } from "@frontend/components/ui/card";
import { cn } from "@frontend/utils/cn";
import Link from "next/link";

export function KpiCards({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    hint?: string;
    hintClass?: string;
    href?: string;
    onSelect?: () => void;
    active?: boolean;
  }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const selectable = Boolean(item.onSelect);
        const card = (
          <Card
            tone="navy"
            className={cn(
              "h-full transition-all",
              selectable || item.active
                ? item.active
                  ? "border-2 border-[#DAFF57] shadow-[0_0_20px_rgba(218,255,87,0.25)]"
                  : "cursor-pointer border border-[#C5A059]/30 opacity-80 hover:opacity-100"
                : item.href
                  ? "cursor-pointer hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lift"
                  : "border border-[#C5A059]/30 opacity-80",
            )}
          >
            <CardBody className="pt-6">
              <div className="mb-4 h-0.5 w-10 bg-gold-metallic" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-silver">{item.label}</p>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-gold">{item.value}</p>
              {item.hint ? (
                <p className={cn("mt-2 text-[10px] text-white/60", item.hintClass)}>{item.hint}</p>
              ) : null}
            </CardBody>
          </Card>
        );

        if (item.onSelect) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onSelect}
              className="block w-full text-start"
            >
              {card}
            </button>
          );
        }

        if (item.href) {
          return (
            <Link key={item.label} href={item.href} className="block">
              {card}
            </Link>
          );
        }

        return <div key={item.label}>{card}</div>;
      })}
    </div>
  );
}

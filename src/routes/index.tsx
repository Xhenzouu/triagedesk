import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { mockOrders, type Order } from "@/data/mockData";
import { OrderTable } from "@/components/triage/OrderTable";
import { OrderDrawer } from "@/components/triage/OrderDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orders | Triage Dashboard" },
      { name: "description", content: "Triage Shopify order confirmations: HMAC checks, Shopify notes and email delivery." },
      { property: "og:title", content: "Orders | Triage Dashboard" },
      { property: "og:description", content: "Triage Shopify order confirmations: HMAC checks, Shopify notes and email delivery." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selected, setSelected] = useState<Order | null>(null);
  const invalid = orders.filter((o) => o.hmacStatus === "Invalid").length;
  const unsent = orders.filter((o) => !o.emailSent).length;

  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl text-foreground">Order Triage</h1>
          <p className="mt-2 text-sm text-muted-foreground">Shopify order confirmation pipeline — webhook intake to email delivery.</p>
        </div>
        <div className="flex gap-3 text-sm">
          <Stat label="Orders" value={orders.length} />
          <Stat label="HMAC invalid" value={invalid} />
          <Stat label="Emails pending" value={unsent} />
        </div>
      </div>
      <OrderTable orders={orders} selectedId={selected?.id ?? null} onSelect={setSelected} />
      <OrderDrawer order={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-2.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold tabular-nums text-foreground">{value}</div>
    </div>
  );
}

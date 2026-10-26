import { createFileRoute } from "@tanstack/react-router";
import { mockOrders, formatDate } from "@/data/mockData";
import { Pill } from "@/components/triage/Pill";

export const Route = createFileRoute("/audit-log")({
  head: () => ({
    meta: [
      { title: "Audit Log | Triage Dashboard" },
      { name: "description", content: "Pipeline audit trail for every Shopify order webhook." },
      { property: "og:title", content: "Audit Log | Triage Dashboard" },
      { property: "og:description", content: "Pipeline audit trail for every Shopify order webhook." },
    ],
  }),
  component: AuditLog,
});

function AuditLog() {
  const events = mockOrders.flatMap((o) => [
    { t: o.date, id: o.id, step: "Webhook received", ok: true },
    { t: o.date, id: o.id, step: "HMAC verification", ok: o.hmacStatus === "Valid" },
    { t: o.date, id: o.id, step: "Shopify note written", ok: o.shopifyNoteStatus === "success" },
    { t: o.date, id: o.id, step: "Confirmation email (Resend)", ok: o.emailSent },
  ]).reverse();
  const th = "px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground";
  return (
    <>
      <h1 className="mb-8 font-serif text-4xl text-foreground">Audit Log</h1>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border"><tr><th className={th}>Time</th><th className={th}>Webhook ID</th><th className={th}>Step</th><th className={th}>Result</th></tr></thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-5 py-3 text-muted-foreground">{formatDate(e.t)}</td>
                <td className="px-5 py-3 font-mono text-xs text-primary">{e.id}</td>
                <td className="px-5 py-3 text-foreground">{e.step}</td>
                <td className="px-5 py-3"><Pill tone={e.ok ? "success" : "danger"}>{e.ok ? "OK" : "Failed"}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

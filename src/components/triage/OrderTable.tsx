import { Check, Minus } from "lucide-react";
import { type Order, formatDate, formatMoney } from "@/data/mockData";
import { Pill } from "./Pill";

export function OrderTable({ orders, selectedId, onSelect }: {
  orders: Order[]; selectedId: string | null; onSelect: (o: Order) => void;
}) {
  const th = "px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground";
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            <th className={th}>Webhook ID</th><th className={th}>Customer</th><th className={th}>Date</th>
            <th className={`${th} text-right`}>Total</th><th className={th}>HMAC Status</th>
            <th className={`${th} text-center`}>Email Sent</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} onClick={() => onSelect(o)}
              className={`cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-accent ${selectedId === o.id ? "bg-accent" : ""}`}>
              <td className="px-5 py-4 font-mono text-xs text-primary">{o.id}</td>
              <td className="px-5 py-4">
                <div className="text-foreground">{o.customerName}</div>
                <div className="text-xs text-muted-foreground">{o.orderNumber}</div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">{formatDate(o.date)}</td>
              <td className="px-5 py-4 text-right tabular-nums text-foreground">{formatMoney(o.totalAmount)}</td>
              <td className="px-5 py-4"><Pill tone={o.hmacStatus === "Valid" ? "success" : "danger"}>{o.hmacStatus}</Pill></td>
              <td className="px-5 py-4">
                <div className="flex justify-center">
                  {o.emailSent ? <Check className="h-4 w-4 text-success" aria-label="Sent" /> : <Minus className="h-4 w-4 text-muted-foreground" aria-label="Not sent" />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { type Order, formatMoney } from "@/data/mockData";

export function EmailPreview({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-muted px-4 py-2 text-xs text-muted-foreground">
        Mock Email Preview {order.emailSent ? "" : "(not delivered)"}
      </div>
      <div className="bg-paper p-6 text-paper-foreground">
        <div className="text-xs text-paper-muted">To: {order.email}</div>
        <h3 className="mt-3 font-serif text-xl">Your order {order.orderNumber} is confirmed</h3>
        <p className="mt-2 text-sm">Hi {order.customerName}, thank you for your order. Here is your summary:</p>
        <div className="mt-4 space-y-1 border-t border-b border-paper-muted/30 py-3 text-sm">
          {order.items.map((i) => (
            <div key={i.name} className="flex justify-between gap-4">
              <span>{i.qty} x {i.name}</span>
              <span className="tabular-nums">{formatMoney(i.qty * i.price)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-sm font-semibold">
          <span>Total</span><span className="tabular-nums">{formatMoney(order.totalAmount)}</span>
        </div>
        <p className="mt-6 text-xs text-paper-muted">Sent via Resend</p>
      </div>
    </div>
  );
}

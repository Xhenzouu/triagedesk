import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type Order, formatDate, formatMoney } from "@/data/mockData";
import { EmailPreview } from "./EmailPreview";
import { Pill, statusTone } from "./Pill";

export function OrderDrawer({ order, onClose }: { order: Order | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-40 bg-background/70"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside key="drawer" role="dialog" aria-label={`Order ${order.orderNumber}`}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[500px] flex-col border-l border-border bg-card"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}>
            <div className="flex items-start justify-between border-b border-border p-6">
              <div>
                <div className="text-xs text-muted-foreground">Order {order.orderNumber}</div>
                <h2 className="mt-1 font-serif text-2xl text-foreground">{order.customerName}</h2>
                <div className="mt-1 text-sm text-muted-foreground">{formatDate(order.date)}</div>
                <div className="mt-3"><Pill tone={statusTone(order.status)}>{order.status}</Pill></div>
              </div>
              <button onClick={onClose} aria-label="Close"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <section>
                <h3 className="mb-3 font-serif text-lg text-foreground">Items</h3>
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 text-left font-medium">Item</th>
                      <th className="py-2 text-right font-medium">Qty</th>
                      <th className="py-2 text-right font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((i) => (
                      <tr key={i.name} className="border-b border-border">
                        <td className="py-2.5 text-foreground">{i.name}</td>
                        <td className="py-2.5 text-right tabular-nums text-muted-foreground">{i.qty}</td>
                        <td className="py-2.5 text-right tabular-nums text-foreground">{formatMoney(i.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="pt-3 font-medium text-foreground" colSpan={2}>Total</td>
                      <td className="pt-3 text-right font-medium tabular-nums text-primary">{formatMoney(order.totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </section>

              <EmailPreview order={order} />

              <section className="rounded-md border border-border bg-inset p-4 font-mono text-xs leading-6 text-muted-foreground">
                <div>Webhook ID: <span className="text-foreground">{order.id}</span></div>
                <div>Shopify Note Status:{" "}
                  <span className={order.shopifyNoteStatus === "success" ? "text-success" : "text-destructive"}>{order.shopifyNoteStatus}</span>
                </div>
                <div>Resend Message ID: <span className="text-foreground">{order.resendMessageId ? `${order.resendMessageId.slice(0, 8)}...` : "none"}</span></div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

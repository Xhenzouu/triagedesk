export type OrderStatus = "Fulfilled" | "Pending" | "Refunded";

export interface OrderItem { name: string; qty: number; price: number }

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: OrderStatus;
  hmacStatus: "Valid" | "Invalid";
  shopifyNoteStatus: "success" | "failed";
  emailSent: boolean;
  resendMessageId: string | null;
  date: string;
  items: OrderItem[];
}

const total = (items: OrderItem[]) => items.reduce((s, i) => s + i.qty * i.price, 0);

const raw: Omit<Order, "totalAmount">[] = [
  {
    id: "test-webhook-id-015", orderNumber: "#1015", customerName: "Halvorsen Supply Co.",
    email: "procurement@halvorsen.co", status: "Fulfilled", hmacStatus: "Valid",
    shopifyNoteStatus: "success", emailSent: true, resendMessageId: "01a10f3c-8e2b-4d71-9a6e-5c2f8b1d0e47",
    date: "2026-10-24T09:12:00Z",
    items: [
      { name: "Industrial Shelving Unit 72in", qty: 4, price: 289 },
      { name: "Heavy-Duty Bin Set (12)", qty: 2, price: 64.5 },
    ],
  },
  {
    id: "test-webhook-id-016", orderNumber: "#1016", customerName: "Marlowe & Finch Interiors",
    email: "orders@marlowefinch.com", status: "Pending", hmacStatus: "Valid",
    shopifyNoteStatus: "success", emailSent: true, resendMessageId: "01a10b77-2c4d-4f19-8d03-7e6a1c9b5f22",
    date: "2026-10-24T14:47:00Z",
    items: [
      { name: "Walnut Desk Organizer", qty: 20, price: 38 },
      { name: "Brass Desk Lamp", qty: 10, price: 112 },
      { name: "Linen Cable Sleeve", qty: 40, price: 6.25 },
    ],
  },
  {
    id: "test-webhook-id-017", orderNumber: "#1017", customerName: "Oakridge Hospitality Group",
    email: "ap@oakridgehg.com", status: "Pending", hmacStatus: "Invalid",
    shopifyNoteStatus: "failed", emailSent: false, resendMessageId: null,
    date: "2026-10-25T03:05:00Z",
    items: [{ name: "Commercial Linen Bundle", qty: 50, price: 42 }],
  },
  {
    id: "test-webhook-id-018", orderNumber: "#1018", customerName: "Kestrel Logistics",
    email: "buying@kestrel-log.io", status: "Refunded", hmacStatus: "Valid",
    shopifyNoteStatus: "success", emailSent: true, resendMessageId: "01a10e91-5b3a-47c8-b2f4-0d8e6a3c1b95",
    date: "2026-10-25T11:30:00Z",
    items: [
      { name: "Thermal Label Printer", qty: 3, price: 219 },
      { name: "Label Roll 4x6 (500)", qty: 12, price: 18.9 },
    ],
  },
  {
    id: "test-webhook-id-019", orderNumber: "#1019", customerName: "Northvale Dental Partners",
    email: "office@northvaledental.com", status: "Fulfilled", hmacStatus: "Valid",
    shopifyNoteStatus: "failed", emailSent: false, resendMessageId: null,
    date: "2026-10-26T01:58:00Z",
    items: [
      { name: "Ergonomic Operator Stool", qty: 6, price: 349 },
      { name: "Nitrile Glove Case", qty: 8, price: 74 },
    ],
  },
];

export const mockOrders: Order[] = raw.map((o) => ({ ...o, totalAmount: total(o.items) }));

export const formatMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  }) + " UTC";

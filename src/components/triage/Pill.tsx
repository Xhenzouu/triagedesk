import { cn } from "@/lib/utils";

const tones = {
  success: "bg-success text-success-foreground",
  danger: "bg-destructive text-destructive-foreground",
  info: "bg-primary text-primary-foreground",
  accent: "bg-secondary text-secondary-foreground",
  neutral: "bg-accent text-muted-foreground",
};

export function Pill({ tone, children }: { tone: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export const statusTone = (s: string): keyof typeof tones =>
  s === "Fulfilled" ? "success" : s === "Pending" ? "accent" : "neutral";

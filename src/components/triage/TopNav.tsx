import { Link } from "@tanstack/react-router";

export function TopNav() {
  const link = "px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors";
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-border bg-card">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-serif text-lg font-bold text-primary-foreground">T</span>
          <span className="font-serif text-lg text-foreground">Triage</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={link} activeOptions={{ exact: true }} activeProps={{ className: "text-foreground border-b-2 border-primary" }}>Orders</Link>
          <Link to="/audit-log" className={link} activeProps={{ className: "text-foreground border-b-2 border-primary" }}>Audit Log</Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm text-foreground">Henson Arroyo</div>
            <div className="text-xs text-muted-foreground">Ops Admin</div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">HA</span>
        </div>
      </div>
    </header>
  );
}

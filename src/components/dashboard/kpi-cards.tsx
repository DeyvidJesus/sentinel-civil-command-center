import { AlertTriangle, Droplets, Flame, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  {
    name: "Incidentes Ativos",
    value: "14",
    change: "+2 desde a última hora",
    changeType: "negative",
    icon: AlertTriangle,
    iconColor: "text-status-critical",
    iconBg: "bg-status-critical/10",
  },
  {
    name: "Focos de Incêndio",
    value: "8",
    change: "+1 desde a última hora",
    changeType: "negative",
    icon: Flame,
    iconColor: "text-status-warning",
    iconBg: "bg-status-warning/10",
  },
  {
    name: "Risco de Enchente",
    value: "2",
    change: "-1 desde ontem",
    changeType: "positive",
    icon: Droplets,
    iconColor: "text-status-stable",
    iconBg: "bg-status-stable/10",
  },
  {
    name: "Equipes em Campo",
    value: "32",
    change: "Todas as unidades ativas",
    changeType: "neutral",
    icon: ShieldCheck,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.name}
            className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.1)] group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{kpi.value}</p>
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
                  kpi.iconBg
                )}
              >
                <Icon className={cn("h-6 w-6", kpi.iconColor)} aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span
                className={cn(
                  "font-medium",
                  kpi.changeType === "positive" ? "text-status-stable" : "",
                  kpi.changeType === "negative" ? "text-status-critical" : "",
                  kpi.changeType === "neutral" ? "text-muted-foreground" : ""
                )}
              >
                {kpi.change}
              </span>
            </div>
            {/* Ambient glow effect */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10"></div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { AlertTriangle, Droplets, Flame, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKpis } from "@/hooks/use-dashboard";

// Helper to map icon string from API to component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'AlertTriangle': return AlertTriangle;
    case 'Flame': return Flame;
    case 'Droplets': return Droplets;
    case 'ShieldCheck': return ShieldCheck;
    default: return AlertCircle;
  }
};

export function KpiCards() {
  const { data: kpis, isLoading, isError } = useKpis();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 h-[116px] flex flex-col justify-between animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-8 w-12 bg-muted rounded"></div>
              </div>
              <div className="h-12 w-12 bg-muted rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-status-critical/50 bg-status-critical/5 p-5 text-center text-status-critical flex items-center justify-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Falha ao carregar indicadores de performance.</span>
      </div>
    );
  }

  if (!kpis || kpis.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = getIconComponent(kpi.icon);
        return (
          <div
            key={kpi.name}
            className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.1)] group"
          >
            <div className="flex items-center justify-between relative z-10">
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
            <div className="mt-4 flex items-center text-xs relative z-10">
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

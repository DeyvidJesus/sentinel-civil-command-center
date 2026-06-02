import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const incidents = [
  {
    id: 1,
    title: "Incêndio Florestal Detectado",
    location: "Parque Nacional da Serra dos Órgãos",
    time: "10 min atrás",
    severity: "critical",
    status: "Em Análise",
  },
  {
    id: 2,
    title: "Alerta de Enchente",
    location: "Vale do Itajaí",
    time: "45 min atrás",
    severity: "warning",
    status: "Equipes Acionadas",
  },
  {
    id: 3,
    title: "Deslizamento de Terra Relatado",
    location: "Petrópolis, RJ",
    time: "2 horas atrás",
    severity: "critical",
    status: "Em Andamento",
  },
  {
    id: 4,
    title: "Qualidade do Ar Crítica",
    location: "Região Metropolitana de SP",
    time: "3 horas atrás",
    severity: "warning",
    status: "Monitorando",
  },
  {
    id: 5,
    title: "Foco de Calor Anômalo",
    location: "Cerrado Baiano",
    time: "4 horas atrás",
    severity: "warning",
    status: "Em Análise",
  }
];

export function IncidentFeed() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Feed de Incidentes</h3>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          Ao Vivo
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-2">
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="group relative cursor-pointer rounded-lg border border-transparent p-3 transition-colors hover:bg-muted/30 hover:border-border/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        incident.severity === "critical"
                          ? "bg-status-critical animate-pulse"
                          : "bg-status-warning"
                      )}
                    ></span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {incident.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{incident.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium ring-1 ring-inset",
                      incident.severity === "critical"
                        ? "bg-status-critical/10 text-status-critical ring-status-critical/20"
                        : "bg-status-warning/10 text-status-warning ring-status-warning/20"
                    )}
                  >
                    {incident.severity === "critical" ? "CRÍTICO" : "ALERTA"}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {incident.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

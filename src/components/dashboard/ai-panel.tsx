import { BrainCircuit, TrendingUp, ShieldAlert, Cpu } from "lucide-react";

export function AiPanel() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4 bg-primary/5">
        <BrainCircuit className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Inteligência Sentinel</h3>
        <span className="ml-auto flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>
      
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Risk Score */}
        <div className="flex flex-col items-center justify-center py-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),transparent_50%)] pointer-events-none"></div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 z-10">Índice Nacional de Risco</span>
          <div className="flex items-baseline gap-1 z-10">
            <span className="text-6xl font-black text-status-critical tracking-tighter">84</span>
            <span className="text-xl text-muted-foreground font-medium">/100</span>
          </div>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-status-critical/10 px-2 py-0.5 text-xs font-semibold text-status-critical ring-1 ring-inset ring-status-critical/20 z-10">
            <TrendingUp className="h-3 w-3" />
            Alto Risco (Projetado +5%)
          </span>
        </div>

        {/* Predictions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            Previsões em 24h
          </h4>
          
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/20 p-3 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Expansão de Incêndio - Norte</span>
                <span className="text-xs font-bold text-status-critical">92% Confiança</span>
              </div>
              <div className="w-full bg-card rounded-full h-1.5 overflow-hidden">
                <div className="bg-status-critical h-1.5 rounded-full" style={{ width: "92%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Ventos fortes (35km/h) projetados para agravar o foco principal na região da serra.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/20 p-3 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Saturação de Solo - Sul</span>
                <span className="text-xs font-bold text-status-warning">78% Confiança</span>
              </div>
              <div className="w-full bg-card rounded-full h-1.5 overflow-hidden">
                <div className="bg-status-warning h-1.5 rounded-full" style={{ width: "78%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Acúmulo de chuvas sugere risco iminente de deslizamento nos próximos 2 dias.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-2 relative z-10">
            <ShieldAlert className="h-4 w-4" />
            Ação Recomendada
          </h4>
          <p className="text-sm text-foreground/90 relative z-10">
            Deslocar unidades de suporte aéreo para o quadrante Norte e emitir alerta de evacuação Nível 2.
          </p>
          <button className="mt-3 w-full rounded-md bg-primary hover:bg-primary/90 text-primary-foreground py-2 text-sm font-medium transition-colors relative z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            Executar Protocolo
          </button>
        </div>
      </div>
    </div>
  );
}

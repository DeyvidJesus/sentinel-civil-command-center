"use client";

import { BrainCircuit, TrendingUp, ShieldAlert, Cpu, AlertCircle, TrendingDown, Minus } from "lucide-react";
import { useIntelligence } from "@/hooks/use-intelligence";
import { cn } from "@/lib/utils";

export function AiPanel() {
  const { data: analysis, isLoading } = useIntelligence();

  const getScoreColor = (score: number) => {
    if (score > 80) return "text-status-critical";
    if (score > 60) return "text-orange-500";
    if (score > 30) return "text-status-warning";
    return "text-status-stable";
  };

  const getScoreBg = (score: number) => {
    if (score > 80) return "rgba(239,68,68,0.15)";
    if (score > 60) return "rgba(249,115,22,0.15)";
    if (score > 30) return "rgba(234,179,8,0.15)";
    return "rgba(34,197,94,0.15)";
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'negative') return "bg-status-critical";
    if (impact === 'positive') return "bg-status-stable";
    return "bg-muted-foreground";
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4 bg-primary/5">
        <BrainCircuit className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Intelligence Engine</h3>
        <span className="ml-auto flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>
      
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {isLoading || !analysis ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
             <div className="animate-pulse flex flex-col items-center space-y-4 w-full">
               <div className="h-24 w-24 border-4 border-muted rounded-full border-t-primary animate-spin"></div>
               <p className="text-xs text-muted-foreground">Sintetizando variáveis ambientais e operacionais...</p>
               <div className="h-4 w-3/4 bg-muted rounded"></div>
               <div className="h-20 w-full bg-muted rounded"></div>
             </div>
          </div>
        ) : (
          <>
            {/* Risk Score */}
            <div className="flex flex-col items-center justify-center py-4 relative">
              <div 
                className="absolute inset-0 pointer-events-none transition-colors duration-1000"
                style={{ background: `radial-gradient(ellipse at center, ${getScoreBg(analysis.score)}, transparent 50%)` }}
              ></div>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2 z-10">
                Índice Nacional de Risco
              </span>
              <div className="flex items-baseline gap-1 z-10">
                <span className={cn("text-6xl font-black tracking-tighter transition-colors duration-500", getScoreColor(analysis.score))}>
                  {analysis.score}
                </span>
                <span className="text-xl text-muted-foreground font-medium">/100</span>
              </div>
              <span className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset z-10",
                analysis.level === 'Crítico' ? 'bg-status-critical/10 text-status-critical ring-status-critical/20' :
                analysis.level === 'Alto' ? 'bg-orange-500/10 text-orange-500 ring-orange-500/20' :
                analysis.level === 'Moderado' ? 'bg-status-warning/10 text-status-warning ring-status-warning/20' :
                'bg-status-stable/10 text-status-stable ring-status-stable/20'
              )}>
                {analysis.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : analysis.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                Risco {analysis.level} {analysis.trendValue > 0 ? `(+${analysis.trendValue}%)` : ''}
              </span>
            </div>

            {/* Justifications */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                Justificativas da Heurística
              </h4>
              
              <div className="space-y-3">
                {analysis.justifications.length > 0 ? (
                  analysis.justifications.slice(0, 4).map((justification) => (
                    <div key={justification.id} className="rounded-lg border border-border bg-muted/20 p-3 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{justification.factor}</span>
                        <span className="text-xs font-bold text-muted-foreground">
                          Impacto: {justification.weight}
                        </span>
                      </div>
                      <div className="w-full bg-card rounded-full h-1.5 overflow-hidden">
                        <div className={cn("h-1.5 rounded-full transition-all duration-1000", getImpactColor(justification.impact))} style={{ width: `${Math.max(justification.weight, 5)}%` }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {justification.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Sistema estável.</p>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className={cn(
              "rounded-lg border p-4 relative overflow-hidden group transition-colors duration-500",
              analysis.level === 'Crítico' ? 'border-status-critical/20 bg-status-critical/5' :
              analysis.level === 'Alto' ? 'border-orange-500/20 bg-orange-500/5' :
              analysis.level === 'Moderado' ? 'border-status-warning/20 bg-status-warning/5' :
              'border-status-stable/20 bg-status-stable/5'
            )}>
              <div className={cn(
                "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out",
                analysis.level === 'Crítico' ? 'bg-status-critical/10' :
                analysis.level === 'Alto' ? 'bg-orange-500/10' :
                analysis.level === 'Moderado' ? 'bg-status-warning/10' :
                'bg-status-stable/10'
              )}></div>
              <h4 className={cn(
                "text-sm font-semibold flex items-center gap-2 mb-2 relative z-10",
                 analysis.level === 'Crítico' ? 'text-status-critical' :
                 analysis.level === 'Alto' ? 'text-orange-500' :
                 analysis.level === 'Moderado' ? 'text-status-warning' :
                 'text-status-stable'
              )}>
                <ShieldAlert className="h-4 w-4" />
                Ação Recomendada: {analysis.recommendation.action}
              </h4>
              <p className="text-sm text-foreground/90 relative z-10 leading-relaxed">
                {analysis.recommendation.description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

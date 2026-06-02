"use client";

import { MapPin, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReportsRealtime } from "@/hooks/use-reports";
import { reportRepository } from "@/repositories/report.repository";
import { useState } from "react";
import { Report } from "@/types";

export function IncidentFeed() {
  const { data: reports, isLoading, isError } = useReportsRealtime();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, currentStatus: Report['status']) => {
    try {
      setUpdatingId(id);
      
      // Rotate status logic: Em Análise -> Em Andamento -> Resolvido -> Em Análise
      let nextStatus: Report['status'] = 'Em Andamento';
      if (currentStatus === 'Em Andamento') nextStatus = 'Resolvido';
      if (currentStatus === 'Resolvido') nextStatus = 'Em Análise';
      if (currentStatus === 'Falso Alarme') nextStatus = 'Em Análise';

      await reportRepository.updateReportStatus(id, nextStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'Em Análise': return 'text-status-warning bg-status-warning/10 ring-status-warning/20';
      case 'Em Andamento': return 'text-status-critical bg-status-critical/10 ring-status-critical/20';
      case 'Resolvido': return 'text-status-stable bg-status-stable/10 ring-status-stable/20';
      default: return 'text-muted-foreground bg-muted ring-muted-foreground/20';
    }
  };

  const getStatusDotColor = (status: Report['status']) => {
    switch (status) {
      case 'Em Análise': return 'bg-status-warning animate-pulse';
      case 'Em Andamento': return 'bg-status-critical animate-ping';
      case 'Resolvido': return 'bg-status-stable';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">Feed de Ocorrências</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Ao Vivo (Firebase)
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Conectando ao Firestore...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2 text-status-warning p-4 text-center border border-status-warning/20 rounded-lg bg-status-warning/5 m-2">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm font-medium">Firebase não configurado.</p>
            <p className="text-xs text-muted-foreground">Configure as credenciais no .env.local para carregar o feed em tempo real.</p>
          </div>
        ) : reports && reports.length > 0 ? (
          <ul className="space-y-2">
            {reports.map((report) => (
              <li
                key={report.id}
                className="group relative rounded-lg border border-transparent p-3 transition-colors hover:bg-muted/30 hover:border-border/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", getStatusDotColor(report.status))}></span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {report.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>Lat: {report.latitude.toFixed(2)}, Lon: {report.longitude.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(report.createdAt).toLocaleTimeString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => handleUpdateStatus(report.id, report.status)}
                      disabled={updatingId === report.id}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium ring-1 ring-inset transition-colors cursor-pointer hover:opacity-80 disabled:opacity-50",
                        getStatusColor(report.status)
                      )}
                      title="Clique para avançar o status"
                    >
                      {updatingId === report.id ? <RefreshCw className="h-3 w-3 animate-spin" /> : null}
                      {report.status}
                    </button>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      Confiança: {report.confidenceScore}%
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-sm text-muted-foreground">Nenhuma ocorrência registrada.</p>
            <p className="text-xs text-muted-foreground mt-1">Clique em 'Nova Ocorrência' para criar um report de teste no Firestore.</p>
          </div>
        )}
      </div>
    </div>
  );
}

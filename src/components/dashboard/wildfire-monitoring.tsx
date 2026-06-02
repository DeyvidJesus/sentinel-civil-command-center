"use client";

import { useState } from "react";
import { Flame, AlertTriangle, ShieldAlert, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirmsData } from "@/hooks/use-firms";

export function WildfireMonitoring() {
  const [region, setRegion] = useState("BRA"); // Default Brazil
  // Use a smaller day range (e.g. 1) to avoid heavy payload if possible
  const { data, isLoading, isError } = useFirmsData(region, 1);

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-orange-500/5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Monitoramento FIRMS (NASA)
        </h3>
        <select 
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-muted/50 border border-border rounded-md text-xs px-2 py-1 text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="BRA">Brasil</option>
          <option value="ARG">Argentina</option>
          <option value="CHL">Chile</option>
          <option value="COL">Colômbia</option>
          <option value="PER">Peru</option>
        </select>
      </div>
      
      <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
        {!process.env.NEXT_PUBLIC_FIRMS_MAP_KEY ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2 text-status-warning p-4 text-center border border-status-warning/20 rounded-lg bg-status-warning/5">
            <AlertTriangle className="h-8 w-8" />
            <p className="text-sm font-medium">Chave da API NASA FIRMS não configurada.</p>
            <p className="text-xs text-muted-foreground mt-2">Defina NEXT_PUBLIC_FIRMS_MAP_KEY no seu .env.local para ver os focos de calor em tempo real.</p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col space-y-4">
             <div className="animate-pulse flex gap-4">
               <div className="h-24 flex-1 bg-muted rounded-xl"></div>
               <div className="h-24 flex-1 bg-muted rounded-xl"></div>
             </div>
             <div className="h-10 w-full bg-muted rounded-xl"></div>
             <div className="h-10 w-full bg-muted rounded-xl"></div>
          </div>
        ) : isError ? (
           <div className="flex flex-col items-center justify-center h-full space-y-2 text-status-critical">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">Falha na comunicação com satélites da NASA.</p>
           </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col justify-center items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors"></div>
                <span className="text-xs text-muted-foreground mb-1 relative z-10">Focos Ativos (24h)</span>
                <span className="text-3xl font-black text-foreground relative z-10">{data.totalActive}</span>
              </div>
              <div className="p-4 rounded-xl border border-status-critical/30 bg-status-critical/5 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-critical opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-status-critical"></span>
                  </span>
                </div>
                <span className="text-xs text-status-critical mb-1 font-medium">Alta Confiança</span>
                <span className="text-3xl font-black text-status-critical">{data.highConfidence}</span>
              </div>
            </div>

            <div className="mt-2 space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                Focos Críticos Recentes
              </h4>
              
              <div className="space-y-2">
                {data.fires
                  .filter(f => f.confidence === 'h' || (typeof f.confidence === 'number' && f.confidence > 80))
                  .slice(0, 5) // Show top 5
                  .map((fire, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-muted-foreground">
                          {fire.latitude.toFixed(4)}, {fire.longitude.toFixed(4)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {fire.acq_date} às {fire.acq_time}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-orange-500">Intensidade: {Math.round(fire.brightness)}K</span>
                        <span className="text-[10px] bg-status-critical/20 text-status-critical px-1.5 py-0.5 rounded mt-1">Crítico</span>
                      </div>
                    </div>
                  ))}
                  
                {data.highConfidence === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">Nenhum foco de alta confiança detectado nas últimas 24h.</p>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

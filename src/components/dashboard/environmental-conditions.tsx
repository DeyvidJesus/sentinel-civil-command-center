"use client";

import { CloudRain, Droplets, Thermometer, Wind, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEnvironmentalConditions } from "@/hooks/use-weather";

export function EnvironmentalConditions() {
  const { data, isLoading, isError } = useEnvironmentalConditions();

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-primary" />
          Condições Ambientais
        </h3>
      </div>
      
      <div className="flex-1 p-5 flex flex-col justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
             <div className="animate-pulse flex flex-col space-y-4 w-full">
               <div className="h-20 w-full bg-muted rounded-xl"></div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="h-16 bg-muted rounded-xl"></div>
                 <div className="h-16 bg-muted rounded-xl"></div>
               </div>
               <div className="h-10 w-full bg-muted rounded-xl"></div>
             </div>
          </div>
        ) : isError ? (
           <div className="flex flex-col items-center justify-center h-full space-y-2 text-status-critical">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">Erro de telemetria meteorológica.</p>
              <p className="text-xs text-muted-foreground">Verifique a API de satélite.</p>
           </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  {/* Using OpenWeather icon mapping logic ideally, but fallback to Thermometer */}
                  <img src={`https://openweathermap.org/img/wn/${data.current.icon}@2x.png`} alt="Weather Icon" className="h-16 w-16 opacity-80" />
                </div>
                <div>
                  <h4 className="text-4xl font-bold tracking-tighter text-foreground">
                    {Math.round(data.current.temp)}°C
                  </h4>
                  <p className="text-sm text-muted-foreground capitalize">{data.current.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                <Droplets className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Umidade</p>
                  <p className="text-sm font-semibold">{data.current.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                <Wind className="h-5 w-5 text-teal-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Vento</p>
                  <p className="text-sm font-semibold">{Math.round(data.current.windSpeed)} km/h</p>
                </div>
              </div>
            </div>

            <div className={cn(
              "p-3 rounded-lg border flex items-center justify-between",
              data.risk === 'critical' ? "bg-status-critical/10 border-status-critical/30" :
              data.risk === 'warning' ? "bg-status-warning/10 border-status-warning/30" :
              "bg-status-stable/10 border-status-stable/30"
            )}>
              <span className="text-sm font-medium">Risco Climático Geral</span>
              <span className={cn(
                "text-xs font-bold uppercase px-2 py-1 rounded-md",
                data.risk === 'critical' ? "bg-status-critical/20 text-status-critical" :
                data.risk === 'warning' ? "bg-status-warning/20 text-status-warning" :
                "bg-status-stable/20 text-status-stable"
              )}>
                {data.risk === 'critical' ? 'CRÍTICO' : data.risk === 'warning' ? 'ALERTA' : 'NORMAL'}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">Dados indisponíveis.</p>
        )}
      </div>
    </div>
  );
}

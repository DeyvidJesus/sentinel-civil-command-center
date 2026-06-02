"use client";

import { useState } from "react";
import { Maximize2, Layers, Filter, AlertCircle, Flame, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMapPoints } from "@/hooks/use-dashboard";
import { useFirmsData } from "@/hooks/use-firms";
import { useReportsRealtime } from "@/hooks/use-reports";

// Basic equirectangular projection for Brazil roughly: Lat (5 to -35), Lon (-75 to -35)
function getMapCoordinates(lat: number, lon: number) {
  // Clamp values to keep them somewhat on screen
  const clampedLat = Math.min(Math.max(lat, -35), 5);
  const clampedLon = Math.min(Math.max(lon, -75), -35);

  const top = ((5 - clampedLat) / 40) * 100;
  const left = ((clampedLon + 75) / 40) * 100;
  return { top: `${top}%`, left: `${left}%` };
}

export function InteractiveMap() {
  const [activeLayer, setActiveLayer] = useState("all");
  const { data: mapPoints, isLoading: isMapLoading, isError: isMapError } = useMapPoints();
  const { data: firmsData, isLoading: isFirmsLoading } = useFirmsData("BRA", 1);
  const { data: reports, isLoading: isReportsLoading } = useReportsRealtime();

  const isLoading = isMapLoading || isFirmsLoading;
  const isError = isMapError;

  return (
    <div className="relative flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden group">
      {/* Header controls overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <div className="flex items-center rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-1">
            <button 
              onClick={() => setActiveLayer("all")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors", activeLayer === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Geral
            </button>
            <button 
              onClick={() => setActiveLayer("critical")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors", activeLayer === "critical" ? "bg-status-critical text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Críticos
            </button>
            <button 
              onClick={() => setActiveLayer("firms")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1", activeLayer === "firms" ? "bg-orange-500 text-white" : "text-muted-foreground hover:text-foreground")}
            >
              <Flame className="h-3 w-3" /> NASA
            </button>
            <button 
              onClick={() => setActiveLayer("reports")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1", activeLayer === "reports" ? "bg-blue-500 text-white" : "text-muted-foreground hover:text-foreground")}
            >
              <ShieldAlert className="h-3 w-3" /> Reports (Live)
            </button>
          </div>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors">
            <Layers className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Map visual representation (Stylized abstract map) */}
      <div className="absolute inset-0 bg-[#09090b] overflow-hidden flex items-center justify-center">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* Topographic abstract curves */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 C150,200 350,0 500,100 C650,200 850,50 1000,150 L1000,1000 L0,1000 Z" fill="none" stroke="currentColor" className="text-primary/30" strokeWidth="1" />
          <path d="M0,200 C200,300 400,100 600,250 C800,400 900,150 1000,250 L1000,1000 L0,1000 Z" fill="none" stroke="currentColor" className="text-primary/20" strokeWidth="1" />
          <path d="M0,350 C250,450 450,250 650,400 C850,550 950,300 1000,400 L1000,1000 L0,1000 Z" fill="none" stroke="currentColor" className="text-primary/10" strokeWidth="1" />
        </svg>

        {/* Ambient Map Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Radar sweep animation */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-primary/10 rounded-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-primary/40 origin-left animate-[spin_4s_linear_infinite]"></div>
        </div>

        {/* Status Overlays */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-sm font-medium text-foreground">Sincronizando satélites...</p>
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm text-status-critical">
            <AlertCircle className="h-12 w-12 mb-4" />
            <p className="text-sm font-medium">Falha na conexão com satélites.</p>
          </div>
        )}

        {/* Realtime Firebase Reports */}
        {(activeLayer === "all" || activeLayer === "reports") && reports && reports.map((report) => {
          const { top, left } = getMapCoordinates(report.latitude, report.longitude);
          const isCritical = report.status === 'Em Andamento';
          const isResolved = report.status === 'Resolvido';
          
          return (
            <div
              key={report.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
              style={{ left, top }}
            >
              {!isResolved && (
                <div className={cn(
                  "absolute inset-0 rounded-full opacity-60 scale-150",
                  isCritical ? "animate-ping bg-status-critical" : "animate-pulse bg-blue-500"
                )}></div>
              )}
              <div
                className={cn(
                  "relative rounded-full transition-transform group-hover:scale-150 shadow-lg border border-background",
                  isResolved ? "h-2 w-2 bg-status-stable" : isCritical ? "h-4 w-4 bg-status-critical" : "h-3 w-3 bg-blue-500"
                )}
              ></div>
              
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-popover px-2 py-1 text-center text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-border z-30 shadow-xl">
                <span className="font-bold">{report.title}</span> <br/> 
                <span className={cn(
                  "text-[10px] uppercase font-bold",
                  isCritical ? "text-status-critical" : isResolved ? "text-status-stable" : "text-blue-500"
                )}>
                  {report.status}
                </span>
              </div>
            </div>
          );
        })}

        {/* FIRMS Data Points (Heatmap) */}
        {(activeLayer === "all" || activeLayer === "firms") && firmsData && firmsData.fires.map((fire, idx) => {
          const { top, left } = getMapCoordinates(fire.latitude, fire.longitude);
          const isHighConfidence = fire.confidence === 'h' || (typeof fire.confidence === 'number' && fire.confidence > 80);
          
          return (
            <div
              key={`firms-${idx}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              style={{ left, top }}
            >
              {isHighConfidence && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-60 bg-orange-500 scale-150"></div>
              )}
              <div
                className={cn(
                  "relative rounded-full transition-transform group-hover:scale-150 shadow-[0_0_10px_rgba(249,115,22,0.5)]",
                  isHighConfidence ? "h-3 w-3 bg-orange-500 border border-background" : "h-1.5 w-1.5 bg-orange-400/80"
                )}
              ></div>
              
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 rounded bg-popover px-2 py-1 text-center text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-border z-20">
                Foco de Calor (FIRMS) <br/> 
                <span className="text-[10px] text-muted-foreground uppercase">{fire.acq_date} - {fire.acq_time}</span>
                <br/>
                <span className="text-[10px] text-orange-500">Intensidade: {fire.brightness}K</span>
              </div>
            </div>
          );
        })}

        {/* Sentinel General Data Points */}
        {(activeLayer === "all" || activeLayer === "critical") && mapPoints && mapPoints
          .filter(point => activeLayer === "all" || point.status === activeLayer)
          .map((point) => (
          <div
            key={`general-${point.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 opacity-30"
            style={{ left: point.x, top: point.y }}
          >
            {point.pulse && (
              <div
                className={cn(
                  "absolute inset-0 rounded-full animate-ping opacity-75",
                  point.status === "critical" && "bg-status-critical",
                  point.status === "warning" && "bg-status-warning",
                  point.status === "stable" && "bg-status-stable"
                )}
              ></div>
            )}
            <div
              className={cn(
                "relative h-4 w-4 rounded-full border-2 border-background shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-150",
                point.status === "critical" && "bg-status-critical shadow-status-critical/50",
                point.status === "warning" && "bg-status-warning shadow-status-warning/50",
                point.status === "stable" && "bg-status-stable shadow-status-stable/50"
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

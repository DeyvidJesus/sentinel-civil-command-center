"use client";

import { useState } from "react";
import { Maximize2, Layers, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const mapPoints = [
  { id: 1, x: "35%", y: "45%", status: "critical", pulse: true },
  { id: 2, x: "65%", y: "30%", status: "warning", pulse: false },
  { id: 3, x: "50%", y: "60%", status: "stable", pulse: false },
  { id: 4, x: "25%", y: "75%", status: "critical", pulse: true },
  { id: 5, x: "75%", y: "65%", status: "warning", pulse: false },
];

export function InteractiveMap() {
  const [activeLayer, setActiveLayer] = useState("all");

  return (
    <div className="relative flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden group">
      {/* Header controls overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <div className="flex items-center rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-1">
            <button 
              onClick={() => setActiveLayer("all")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors", activeLayer === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Todos
            </button>
            <button 
              onClick={() => setActiveLayer("critical")}
              className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors", activeLayer === "critical" ? "bg-status-critical text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Críticos
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
      <div className="absolute inset-0 bg-[#09090b] overflow-hidden">
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

        {/* Data Points */}
        {mapPoints.map((point) => (
          <div
            key={point.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
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
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 rounded bg-popover px-2 py-1 text-center text-xs text-popover-foreground opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-border">
              Alvo {point.id} <br/> 
              <span className="text-[10px] text-muted-foreground uppercase">{point.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { KpiCards } from "@/components/dashboard/kpi-cards";
import { InteractiveMap } from "@/components/dashboard/interactive-map";
import { IncidentFeed } from "@/components/dashboard/incident-feed";
import { AiPanel } from "@/components/dashboard/ai-panel";
import { Analytics } from "@/components/dashboard/analytics";
import { EnvironmentalConditions } from "@/components/dashboard/environmental-conditions";
import { WildfireMonitoring } from "@/components/dashboard/wildfire-monitoring";
import { GuidedTour } from "@/components/guided-tour";

import { useState } from "react";
import { CreateReportModal } from "@/components/dashboard/create-report-modal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <GuidedTour />
      {isModalOpen && <CreateReportModal onClose={() => setIsModalOpen(false)} />}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">Painel de Comando Global</h1>
            <p className="text-xs text-muted-foreground font-medium">Última atualização: Hoje às 10:42 BRT</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              Nova Ocorrência
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-status-stable/20 bg-status-stable/10 px-3 py-1 text-sm font-medium text-status-stable ring-1 ring-inset ring-status-stable/20">
              <span className="h-2 w-2 rounded-full bg-status-stable animate-pulse"></span>
              Sistemas Operacionais
            </span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Row: KPIs */}
          <div id="tour-kpi-cards">
            <KpiCards />
          </div>

          {/* Middle Row: Map, AI Panel, and FIRMS */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
            <div className="lg:col-span-2 h-full min-h-[500px]" id="tour-interactive-map">
              <InteractiveMap />
            </div>
            <div className="h-full min-h-[500px]" id="tour-wildfire-monitoring">
              <WildfireMonitoring />
            </div>
            <div className="h-full min-h-[500px]" id="tour-ai-panel">
              <AiPanel />
            </div>
          </div>

          {/* Bottom Row: Incident Feed, Analytics, and Environmental Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
            <div className="h-full min-h-[400px]" id="tour-incident-feed">
              <IncidentFeed />
            </div>
            <div className="h-full min-h-[400px]" id="tour-analytics">
              <Analytics />
            </div>
            <div className="h-full min-h-[400px]" id="tour-environmental">
              <EnvironmentalConditions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

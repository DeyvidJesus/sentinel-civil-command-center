"use client";

import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function GuidedTour() {
  const driverRef = useRef<any>(null);

  useEffect(() => {
    // Check if the user has already seen the tour
    const hasSeenTour = localStorage.getItem("sentinel_civil_tour_seen");
    
    // Pequeno delay para garantir que os elementos estejam montados na tela
    if (!hasSeenTour) {
      setTimeout(() => {
        const driverObj = driver({
          showProgress: true,
          animate: true,
          allowClose: true,
          nextBtnText: "Próximo",
          prevBtnText: "Anterior",
          doneBtnText: "Concluir",
          steps: [
            {
              popover: {
                title: "Bem-vindo ao Command Center",
                description: "Este é o painel de comando global do SentinelCivil. Vamos fazer um rápido tour para você conhecer as principais funcionalidades e visões estratégicas do sistema."
              }
            },

            {
              element: "#tour-kpi-cards",
              popover: {
                title: "KPIs e Métricas",
                description: "Visão consolidada da operação: acompanhe o número de incidentes ativos, focos de incêndio e equipes mobilizadas no terreno.",
                side: "bottom",
                align: "start"
              }
            },
            {
              element: "#tour-interactive-map",
              popover: {
                title: "Mapa Tático Integrado",
                description: "Fusão de dados em tempo real: veja pontos de interesse, focos de calor via satélite e a localização exata das viaturas da Defesa Civil.",
                side: "right",
                align: "start"
              }
            },
            {
              element: "#tour-ai-panel",
              popover: {
                title: "Motor de IA & Análise de Risco",
                description: "Nossa IA cruza dados satelitais com os reports dos cidadãos para gerar scores de risco de alta precisão, evitando alarmes falsos.",
                side: "left",
                align: "start"
              }
            },
            {
              element: "#tour-incident-feed",
              popover: {
                title: "Feed de Incidentes",
                description: "Lista cronológica e priorizada de todos os eventos ambientais detectados. Incidentes críticos aparecem no topo.",
                side: "top",
                align: "start"
              }
            },
            {
              element: "#tour-analytics",
              popover: {
                title: "Análise Histórica",
                description: "Painéis analíticos para identificar tendências operacionais, auxiliando na alocação preventiva de recursos pelas secretarias de segurança.",
                side: "top",
                align: "start"
              }
            }
          ],
          onDestroyStarted: () => {
            localStorage.setItem("sentinel_civil_tour_seen", "true");
            driverObj.destroy();
          }
        });
  
        driverObj.drive();
        driverRef.current = driverObj;
      }, 500); // 500ms delay to allow rendering and layout
    }
  }, []);

  return null;
}

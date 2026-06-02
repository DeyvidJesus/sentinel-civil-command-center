import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Incident, KpiData, MapPoint, AiInsightData, AnalyticsData, Report } from '@/types';

export const dashboardRepository = {
  getIncidents: async (): Promise<Incident[]> => {
    return []; // Handled by realtime report.repository
  },

  getKpis: async (): Promise<KpiData[]> => {
    if (!db) return [];
    
    const q = query(collection(db, "reports"));
    const snapshot = await getDocs(q);
    const reports: Report[] = [];
    snapshot.forEach(doc => reports.push(doc.data() as Report));

    const activeCount = reports.filter(r => r.status === 'Em Andamento').length;
    const pendingCount = reports.filter(r => r.status === 'Em Análise').length;
    const resolvedCount = reports.filter(r => r.status === 'Resolvido').length;

    return [
      {
        name: "Ocorrências Ativas",
        value: activeCount,
        change: "Dinâmico (Firebase)",
        changeType: "neutral",
        icon: "Flame",
        iconColor: "text-red-500",
        iconBg: "bg-red-500/10",
      },
      {
        name: "Em Análise",
        value: pendingCount,
        change: "Aguardando Triagem",
        changeType: "warning",
        icon: "AlertTriangle",
        iconColor: "text-amber-500",
        iconBg: "bg-amber-500/10",
      },
      {
        name: "Alocações Estimadas",
        value: activeCount * 2, // 2 teams per active incident estimate
        change: "Operações Ativas",
        changeType: "neutral",
        icon: "ShieldCheck",
        iconColor: "text-blue-500",
        iconBg: "bg-blue-500/10",
      },
      {
        name: "Casos Resolvidos",
        value: resolvedCount,
        change: "Histórico Acumulado",
        changeType: "positive",
        icon: "ShieldCheck",
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-500/10",
      }
    ];
  },

  getMapPoints: async (): Promise<MapPoint[]> => {
    return []; // Maps are handled directly via FIRMS API and Firebase Streams
  },

  getAiInsights: async (): Promise<AiInsightData[]> => {
    return []; // Handled natively by intelligence.service
  },

  getAnalytics: async (): Promise<AnalyticsData> => {
    if (!db) return { timeSeriesData: [] };
    
    const q = query(collection(db, "reports"));
    const snapshot = await getDocs(q);
    const reports: Report[] = [];
    snapshot.forEach(doc => reports.push(doc.data() as Report));

    // Calculate real analytics based on report creation times (last 24h grouped by 4h intervals)
    const now = Date.now();
    const intervals = 6;
    const intervalMs = (24 * 60 * 60 * 1000) / intervals;
    
    const timeSeriesData = [];
    
    for (let i = intervals - 1; i >= 0; i--) {
      const startTime = now - ((i + 1) * intervalMs);
      const endTime = now - (i * intervalMs);
      
      // Filter reports that were created in this time window
      const intervalReports = reports.filter(r => r.createdAt >= startTime && r.createdAt < endTime);
      
      // Categorize severity based on confidence score (as a proxy for severity)
      const critical = intervalReports.filter(r => r.confidenceScore > 80).length;
      const warning = intervalReports.filter(r => r.confidenceScore > 50 && r.confidenceScore <= 80).length;
      const stable = intervalReports.filter(r => r.confidenceScore <= 50).length;
      
      const date = new Date(endTime);
      const name = `${date.getHours().toString().padStart(2, '0')}:00`;
      
      timeSeriesData.push({ name, critical, warning, stable });
    }

    return { timeSeriesData };
  },
};

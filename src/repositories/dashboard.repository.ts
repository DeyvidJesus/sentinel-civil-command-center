import { apiClient } from '@/api/client';
import { Incident, KpiData, MapPoint, AiInsightData, AnalyticsData } from '@/types';

export const dashboardRepository = {
  getIncidents: async (): Promise<Incident[]> => {
    const { data } = await apiClient.get<Incident[]>('/incidents');
    return data;
  },

  getKpis: async (): Promise<KpiData[]> => {
    const { data } = await apiClient.get<KpiData[]>('/kpis');
    return data;
  },

  getMapPoints: async (): Promise<MapPoint[]> => {
    const { data } = await apiClient.get<MapPoint[]>('/map-points');
    return data;
  },

  getAiInsights: async (): Promise<AiInsightData[]> => {
    const { data } = await apiClient.get<AiInsightData[]>('/ai-insights');
    return data;
  },

  getAnalytics: async (): Promise<AnalyticsData> => {
    const { data } = await apiClient.get<AnalyticsData>('/analytics');
    return data;
  },
};

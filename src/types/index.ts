export type Severity = 'critical' | 'warning' | 'stable';

export interface Incident {
  id: string | number;
  title: string;
  location: string;
  time: string;
  severity: Severity;
  status: string;
}

export interface KpiData {
  name: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string; // We'll map the icon name string to a Lucide icon component in the UI
  iconColor: string;
  iconBg: string;
}

export interface MapPoint {
  id: string | number;
  x: string;
  y: string;
  status: Severity;
  pulse: boolean;
}

export interface AiInsightData {
  id: string;
  type: string;
  content: string;
  confidence: number;
}

export interface AnalyticsData {
  timeSeriesData: Array<{ name: string; critical: number; warning: number; stable: number }>;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export type ClimateRisk = 'normal' | 'warning' | 'critical';

export interface WeatherContext {
  current: WeatherData;
  risk: ClimateRisk;
}

export interface FirmsFireData {
  latitude: number;
  longitude: number;
  brightness: number;
  scan: number;
  track: number;
  acq_date: string;
  acq_time: string;
  satellite: string;
  confidence: string; // FIRMS confidence can be l/n/h (low, nominal, high) or a percentage 0-100 depending on the instrument
  version: string;
  bright_t31: number;
  frp: number;
  daynight: string;
}

export interface WildfireSummary {
  totalActive: number;
  highConfidence: number;
  averageBrightness: number;
  fires: FirmsFireData[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  createdAt: number;
  status: 'Em Análise' | 'Em Andamento' | 'Resolvido' | 'Falso Alarme';
  confidenceScore: number;
}

export type RiskLevel = 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';

export interface InsightDetail {
  id: string;
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  weight: number; // 0 to 100 representing how much this factor influenced the final score
}

export interface RiskAnalysis {
  score: number;
  level: RiskLevel;
  trend: 'stable' | 'up' | 'down';
  trendValue: number;
  justifications: InsightDetail[];
  recommendation: {
    action: string;
    description: string;
  };
}

import { WeatherData, WildfireSummary, Report, RiskAnalysis, RiskLevel, InsightDetail } from "@/types";

export const intelligenceService = {
  /**
   * Calculates a heuristic Risk Score based on environmental and operational data.
   */
  calculateRiskScore: (
    weather: WeatherData | undefined, 
    firms: WildfireSummary | undefined, 
    reports: Report[] | undefined
  ): RiskAnalysis => {
    let score = 0;
    const justifications: InsightDetail[] = [];

    // 1. Weather Factors (Max 40 points)
    if (weather) {
      // Temperature contribution (Max 15 points)
      let tempScore = 0;
      if (weather.temp > 35) tempScore = 15;
      else if (weather.temp > 30) tempScore = 10;
      else if (weather.temp > 25) tempScore = 5;
      
      if (tempScore > 0) {
        score += tempScore;
        justifications.push({
          id: 'temp',
          factor: 'Temperatura Elevada',
          impact: 'negative',
          description: `Temperaturas acima da média (${weather.temp}°C) aumentam o ressecamento da vegetação.`,
          weight: tempScore
        });
      }

      // Humidity contribution (Max 15 points)
      let humScore = 0;
      if (weather.humidity < 20) humScore = 15;
      else if (weather.humidity < 30) humScore = 10;
      else if (weather.humidity < 40) humScore = 5;
      
      if (humScore > 0) {
        score += humScore;
        justifications.push({
          id: 'hum',
          factor: 'Baixa Umidade',
          impact: 'negative',
          description: `Umidade do ar em níveis críticos (${weather.humidity}%), facilitando a ignição.`,
          weight: humScore
        });
      }

      // Wind Speed contribution (Max 10 points)
      let windScore = 0;
      if (weather.windSpeed > 10) windScore = 10;
      else if (weather.windSpeed > 5) windScore = 5;

      if (windScore > 0) {
        score += windScore;
        justifications.push({
          id: 'wind',
          factor: 'Ventos Fortes',
          impact: 'negative',
          description: `Velocidade do vento (${weather.windSpeed} m/s) acelera a propagação de chamas.`,
          weight: windScore
        });
      }
    }

    // 2. FIRMS Hotspots (Max 40 points)
    if (firms) {
      let firmsScore = Math.min(firms.totalActive * 0.5 + firms.highConfidence * 2, 40);
      score += firmsScore;

      if (firmsScore > 0) {
        justifications.push({
          id: 'firms',
          factor: 'Focos de Calor (NASA)',
          impact: 'negative',
          description: `Detectados ${firms.totalActive} focos, sendo ${firms.highConfidence} de alta confiança.`,
          weight: firmsScore
        });
      }
    }

    // 3. Operational Reports (Max 20 points)
    if (reports && reports.length > 0) {
      const activeReports = reports.filter(r => r.status === 'Em Andamento' || r.status === 'Em Análise').length;
      let reportsScore = Math.min(activeReports * 2, 20);
      score += reportsScore;

      if (reportsScore > 0) {
        justifications.push({
          id: 'reports',
          factor: 'Ocorrências Civis',
          impact: 'negative',
          description: `${activeReports} ocorrências ativas em campo exigindo atenção.`,
          weight: reportsScore
        });
      }
    }

    // If no data is loading or everything is fine
    if (justifications.length === 0) {
      justifications.push({
        id: 'stable',
        factor: 'Condições Estáveis',
        impact: 'positive',
        description: 'Todos os indicadores ambientais e operacionais estão dentro da normalidade.',
        weight: 100
      });
    }

    // Normalize and sort justifications
    score = Math.min(Math.round(score), 100);
    justifications.sort((a, b) => b.weight - a.weight);

    // Determine Level
    let level: RiskLevel = 'Baixo';
    let recommendation = {
      action: 'Monitoramento Padrão',
      description: 'Manter rotinas operacionais normais. Nenhuma ação tática imediata requerida.'
    };

    if (score > 80) {
      level = 'Crítico';
      recommendation = {
        action: 'Acionar Protocolo Alfa',
        description: 'Deslocar unidades aéreas para contenção e preparar avisos de evacuação Nível 2.'
      };
    } else if (score > 60) {
      level = 'Alto';
      recommendation = {
        action: 'Mobilização Preventiva',
        description: 'Colocar brigadas de incêndio em sobreaviso e aumentar patrulhamento terrestre.'
      };
    } else if (score > 30) {
      level = 'Moderado';
      recommendation = {
        action: 'Observação Reforçada',
        description: 'Aumentar a frequência de telemetria de satélites nas regiões de borda urbana.'
      };
    }

    return {
      score,
      level,
      trend: score > 60 ? 'up' : 'stable',
      trendValue: score > 60 ? Math.round(score * 0.05) : 0, // Mock trend value based on score
      justifications,
      recommendation
    };
  }
};

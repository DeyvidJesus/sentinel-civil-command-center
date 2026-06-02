import { useState, useEffect } from "react";
import { useEnvironmentalConditions } from "./use-weather";
import { useFirmsData } from "./use-firms";
import { useReportsRealtime } from "./use-reports";
import { intelligenceService } from "@/services/intelligence.service";
import { RiskAnalysis } from "@/types";

export const useIntelligence = () => {
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);

  // Fetch all 3 data sources
  const { data: weatherData, isLoading: weatherLoading } = useEnvironmentalConditions();
  const { data: firmsData, isLoading: firmsLoading } = useFirmsData("BRA", 1);
  const { data: reportsData, isLoading: reportsLoading } = useReportsRealtime();

  const isLoading = weatherLoading || firmsLoading || reportsLoading;

  useEffect(() => {
    // We can calculate even if some data is undefined, but ideally we wait for the first load to finish.
    // Realtime Firebase updates will trigger this effect and re-calculate the score live.
    if (!isLoading) {
      const result = intelligenceService.calculateRiskScore(
        weatherData?.current,
        firmsData,
        reportsData
      );
      setAnalysis(result);
    }
  }, [weatherData, firmsData, reportsData, isLoading]);

  return { data: analysis, isLoading };
};

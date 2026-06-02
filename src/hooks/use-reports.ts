import { useEffect, useState } from "react";
import { reportRepository } from "@/repositories/report.repository";
import { Report } from "@/types";

export const useReportsRealtime = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // If Firebase isn't configured, we shouldn't attempt to connect
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      const unsubscribe = reportRepository.subscribeToReports((data) => {
        setReports(data);
        setIsLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return { data: reports, isLoading, isError };
};

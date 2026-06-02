import Papa from 'papaparse';
import { firmsRepository } from '@/repositories/firms.repository';
import { FirmsFireData, WildfireSummary } from '@/types';

export const firmsService = {
  /**
   * Fetches active fire data and parses the CSV into a typed summary object.
   */
  getWildfireData: async (country: string = 'BRA', days: number = 1): Promise<WildfireSummary> => {
    try {
      const csvData = await firmsRepository.getActiveFiresByCountry('VIIRS_SNPP_NRT', country, days);
      
      return new Promise((resolve, reject) => {
        Papa.parse<FirmsFireData>(csvData, {
          header: true,
          dynamicTyping: true, // Automatically converts numbers
          skipEmptyLines: true,
          complete: (results) => {
            const fires = results.data as FirmsFireData[];
            
            // Clean up: FIRMS sometimes returns empty or invalid rows at EOF
            const validFires = fires.filter(f => f.latitude && f.longitude);

            // Calculate metadata
            const totalActive = validFires.length;
            
            // Confidence can be 'h' (high), 'n' (nominal), 'l' (low) for VIIRS, 
            // or a percentage 0-100 for MODIS. We'll handle both.
            const highConfidence = validFires.filter(f => 
              f.confidence === 'h' || 
              (typeof f.confidence === 'number' && f.confidence > 80)
            ).length;

            const totalBrightness = validFires.reduce((acc, curr) => acc + (curr.brightness || 0), 0);
            const averageBrightness = totalActive > 0 ? totalBrightness / totalActive : 0;

            resolve({
              totalActive,
              highConfidence,
              averageBrightness,
              fires: validFires
            });
          },
          error: (error: any) => {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching FIRMS data:", error);
      throw error;
    }
  }
};

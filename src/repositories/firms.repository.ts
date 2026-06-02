import axios from 'axios';

export const firmsRepository = {
  /**
   * Fetch active fire data from FIRMS.
   * @param source e.g. 'VIIRS_SNPP_NRT' or 'MODIS_NRT'
   * @param country e.g. 'BRA' for Brazil
   * @param dayRange 1 to 10 days
   * @returns Raw CSV string
   */
  getActiveFiresByCountry: async (
    source: string = 'VIIRS_SNPP_NRT',
    country: string = 'BRA',
    dayRange: number = 1
  ): Promise<string> => {
    // Calls our Next.js API route to bypass CORS issues on the browser
    const { data } = await axios.get<string>('/api/firms', {
      params: { source, country, dayRange }
    });
    return data;
  }
};

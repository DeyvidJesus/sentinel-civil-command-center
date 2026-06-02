import { openWeatherClient } from '@/api/openweather.client';

export const weatherRepository = {
  getCurrentWeather: async (lat: number, lon: number): Promise<any> => {
    const { data } = await openWeatherClient.get('/weather', {
      params: { lat, lon }
    });
    return data;
  },

  getForecast: async (lat: number, lon: number): Promise<any> => {
    const { data } = await openWeatherClient.get('/forecast', {
      params: { lat, lon }
    });
    return data;
  }
};

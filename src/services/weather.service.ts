import { weatherRepository } from '@/repositories/weather.repository';
import { WeatherContext, WeatherData, ClimateRisk } from '@/types';

export const weatherService = {
  getEnvironmentalConditions: async (lat: number, lon: number): Promise<WeatherContext> => {
    const data = await weatherRepository.getCurrentWeather(lat, lon);
    
    const weatherData: WeatherData = {
      temp: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
      description: data.weather[0]?.description || 'Desconhecido',
      icon: data.weather[0]?.icon || '01d',
    };

    // Calculate generic risk based on thresholds
    let risk: ClimateRisk = 'normal';
    
    // Example logic for environmental risk (Wildfire & Flood conditions)
    if (weatherData.temp > 35 && weatherData.humidity < 25 && weatherData.windSpeed > 30) {
      risk = 'critical'; // High fire risk
    } else if (weatherData.temp > 30 && weatherData.humidity < 30) {
      risk = 'warning'; // Moderate fire risk
    }

    // Heavy rains could also trigger warning/critical risk if we had precipitation data,
    // For now we use basic temp/humidity/wind.

    return {
      current: weatherData,
      risk,
    };
  }
};

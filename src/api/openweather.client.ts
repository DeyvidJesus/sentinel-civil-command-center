import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/2.5';
// We retrieve the key from env var, defaulting to empty to prevent undefined crashes,
// but real queries require a valid key.
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';

export const openWeatherClient = axios.create({
  baseURL,
  timeout: 10000,
});

openWeatherClient.interceptors.request.use(
  (config) => {
    // Automatically inject the API key and units into every request
    config.params = {
      ...config.params,
      appid: OPENWEATHER_API_KEY,
      units: 'metric', // Use Celsius for temperature
      lang: 'pt_br',   // Localization
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

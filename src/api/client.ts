import axios from 'axios';

// The base URL can be defined in .env.local as NEXT_PUBLIC_API_URL
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sentinelcivil.com/v1';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    // If we have authentication, we can attach the token here
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle global errors here (e.g., 401 Unauthorized, refresh token, etc.)
    return Promise.reject(error);
  }
);

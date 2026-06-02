import axios from 'axios';

const baseURL = 'https://firms.modaps.eosdis.nasa.gov/api';

export const firmsClient = axios.create({
  baseURL,
  timeout: 15000,
});

// FIRMS expects the map key in the URL path, not as a query param or header,
// so we will pass the MAP_KEY directly in the repository functions.
export const getFirmsMapKey = () => process.env.NEXT_PUBLIC_FIRMS_MAP_KEY || '';

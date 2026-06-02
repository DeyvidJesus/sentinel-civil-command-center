import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'VIIRS_SNPP_NRT';
  const country = searchParams.get('country') || 'BRA';
  const dayRange = searchParams.get('dayRange') || '1';

  const mapKey = process.env.NEXT_PUBLIC_FIRMS_MAP_KEY;

  if (!mapKey) {
    return NextResponse.json({ error: 'FIRMS API Key is missing' }, { status: 500 });
  }

  const endpoint = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${mapKey}/${source}/${country}/${dayRange}`;

  try {
    const response = await axios.get(endpoint);
    // Return the raw CSV string
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=300'
      }
    });
  } catch (error: any) {
    console.error('FIRMS API Proxy Error:', error.message);
    if (error.response) {
      console.error('NASA FIRMS Response Data:', error.response.data);
      console.error('NASA FIRMS Status:', error.response.status);
    }
    return NextResponse.json({ error: 'Failed to fetch data from NASA FIRMS' }, { status: 502 });
  }
}

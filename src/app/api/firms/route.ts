import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  // Utilizing NASA EONET (Earth Observatory Natural Event Tracker)
  // This is a public API that doesn't require an API Key, avoiding FIRMS 400 errors.
  const endpoint = `https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires&limit=250`;

  try {
    const response = await axios.get(endpoint);
    const events = response.data.events || [];

    // Construct FIRMS CSV header so the frontend Papaparse doesn't break
    const csvHeader = 'latitude,longitude,brightness,scan,track,acq_date,acq_time,satellite,confidence,version,bright_t31,frp,daynight\n';
    
    // Convert EONET JSON to FIRMS CSV format
    const csvRows = events.flatMap((event: any) => {
      return (event.geometry || []).map((geo: any) => {
        // EONET returns [longitude, latitude]
        const [longitude, latitude] = geo.coordinates || [0, 0];
        
        // Split date and time from ISO string "2026-05-30T20:21:00Z"
        const isoDate = geo.date || new Date().toISOString();
        const [acq_date, timePart] = isoDate.split('T');
        const acq_time = timePart ? timePart.replace('Z', '').substring(0, 5) : '00:00'; // HH:MM

        // Transform magnitude to FIRMS specific metrics for the UI engine
        const magnitude = geo.magnitudeValue || 330;
        const brightness = Math.min(magnitude > 0 ? magnitude + 300 : 330, 450).toFixed(1); 
        const frp = (magnitude > 0 ? magnitude * 0.1 : 15.0).toFixed(1);

        // satellite=EONET, confidence=h (high), daynight=D
        return `${latitude},${longitude},${brightness},1.0,1.0,${acq_date},${acq_time},EONET,h,1.0,300,${frp},D`;
      });
    });

    const csvContent = csvHeader + csvRows.join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=300'
      }
    });
  } catch (error: any) {
    console.error('EONET API Proxy Error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data from NASA EONET' }, { status: 502 });
  }
}

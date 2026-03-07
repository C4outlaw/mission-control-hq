export async function GET() {
  try {
    // Daytona Beach, FL (local default)
    const lat = 29.2108;
    const lon = -81.0228;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=10`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('weather fetch failed');

    const data = await res.json();
    const d = data?.daily || {};
    const days = (d.time || []).map((date, i) => ({
      date,
      max: d.temperature_2m_max?.[i],
      min: d.temperature_2m_min?.[i],
      rainChance: d.precipitation_probability_max?.[i],
    }));

    return Response.json({ ok: true, location: 'Daytona Beach, FL', days }, { status: 200 });
  } catch {
    return Response.json({ ok: false, location: 'Daytona Beach, FL', days: [] }, { status: 200 });
  }
}

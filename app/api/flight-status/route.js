export async function GET() {
  try {
    const url = 'https://flightaware.com/live/flight/DWI5805';
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('fetch failed');
    const html = await res.text();

    const landed = /landed|arrived/i.test(html);
    const onTime = /on time/i.test(html);

    return Response.json(
      {
        ok: true,
        flight: 'Arajet 5805 (DWI5805)',
        route: 'YYZ → PUJ',
        landed,
        onTime,
        source: url,
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      {
        ok: false,
        flight: 'Arajet 5805 (DWI5805)',
        route: 'YYZ → PUJ',
        landed: false,
        onTime: null,
        source: 'https://flightaware.com/live/flight/DWI5805',
      },
      { status: 200 }
    );
  }
}

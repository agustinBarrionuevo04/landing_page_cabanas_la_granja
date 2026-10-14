// Pide a Routes API la ruta en auto (y a pie) entre el complejo y un destino de destinations.json
// y la guarda en routes/<destino>.json. Los destinos con "trip": true van al revés: del lugar al complejo.
// Uso: GOOGLE_MAPS_API_KEY=... node fetch-route.js <destino>      (ver claves en destinations.json)
const fs = require('fs');
const path = require('path');

const key = process.env.GOOGLE_MAPS_API_KEY;
if (!key) { console.error('Falta GOOGLE_MAPS_API_KEY'); process.exit(1); }

const destinations = JSON.parse(fs.readFileSync(path.join(__dirname, 'destinations.json'), 'utf8'));
const id = process.argv[2];
const dest = destinations[id];
if (!dest) { console.error(`Destino desconocido. Opciones: ${Object.keys(destinations).join(', ')}`); process.exit(1); }

// Origen: lib/site.ts es la única fuente de verdad de los datos del negocio
const site = fs.readFileSync(path.join(__dirname, '../../cabanas-la-granja/lib/site.ts'), 'utf8');
const geo = site.match(/geo:\s*\{\s*latitude:\s*(-?[\d.]+),\s*longitude:\s*(-?[\d.]+)/);
const street = site.match(/streetAddress:\s*"([^"]+)"/);
if (!geo || !street) { console.error('No encontré geo/streetAddress en lib/site.ts'); process.exit(1); }
const origin = { lat: Number(geo[1]), lng: Number(geo[2]) };

const complex = { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } };

async function route(travelMode) {
  const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.legs.startLocation,routes.legs.endLocation',
    },
    body: JSON.stringify({
      // { address } o { placeId }: con placeId Google calcula hasta (o desde) el acceso real del lugar
      origin: dest.trip ? dest.query : complex,
      destination: dest.trip ? complex : dest.query,
      travelMode,
      languageCode: 'es-419',
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.routes?.length) throw new Error(`${travelMode}: ${JSON.stringify(json)}`);
  const r = json.routes[0];
  const start = r.legs[0].startLocation.latLng, end = r.legs[0].endLocation.latLng;
  return {
    start: { lat: start.latitude, lng: start.longitude },
    meters: r.distanceMeters,
    seconds: parseInt(r.duration, 10),   // viene como "394s"
    polyline: r.polyline.encodedPolyline,
    end: { lat: end.latitude, lng: end.longitude },
  };
}

(async () => {
  // En los viajes largos no tiene sentido el tiempo a pie
  const [drive, walk] = await Promise.all([route('DRIVE'), dest.trip ? null : route('WALK')]);
  // origin = el complejo siempre; destination = el otro extremo (en un viaje es el punto de partida)
  const out = {
    origin: { address: street[1], latLng: origin },
    destination: { id, ...dest, latLng: dest.trip ? drive.start : drive.end },
    drive: { meters: drive.meters, seconds: drive.seconds, polyline: drive.polyline },
    ...(walk && { walk: { meters: walk.meters, seconds: walk.seconds } }),
  };
  fs.mkdirSync(path.join(__dirname, 'routes'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'routes', `${id}.json`), JSON.stringify(out, null, 2) + '\n');
  console.log(`routes/${id}.json: auto ${drive.meters} m / ${drive.seconds} s` + (walk ? ` · a pie ${walk.meters} m / ${walk.seconds} s` : ''));
})().catch(e => { console.error(e.message); process.exit(1); });

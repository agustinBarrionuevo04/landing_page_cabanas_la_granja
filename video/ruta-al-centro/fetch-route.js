// Pide a Routes API la ruta en auto y a pie desde el complejo hasta el destino y la guarda en route.json.
// Uso: GOOGLE_MAPS_API_KEY=... node fetch-route.js ["dirección destino"] ["etiqueta"] ["subetiqueta"]
const fs = require('fs');
const path = require('path');

const key = process.env.GOOGLE_MAPS_API_KEY;
if (!key) { console.error('Falta GOOGLE_MAPS_API_KEY'); process.exit(1); }

// Default: la esquina de Av. Edén más cercana al complejo (Pres. Arturo Illia), donde arranca el centro
const [address = 'Av. Edén y Pres. Arturo Illia, La Falda, Córdoba', label = 'Av. Edén', sublabel = 'Centro de La Falda'] = process.argv.slice(2);

// Origen: lib/site.ts es la única fuente de verdad de los datos del negocio
const site = fs.readFileSync(path.join(__dirname, '../../cabanas-la-granja/lib/site.ts'), 'utf8');
const geo = site.match(/geo:\s*\{\s*latitude:\s*(-?[\d.]+),\s*longitude:\s*(-?[\d.]+)/);
const street = site.match(/streetAddress:\s*"([^"]+)"/);
if (!geo || !street) { console.error('No encontré geo/streetAddress en lib/site.ts'); process.exit(1); }
const origin = { lat: Number(geo[1]), lng: Number(geo[2]) };

async function route(travelMode) {
  const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.legs.endLocation',
    },
    body: JSON.stringify({
      origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
      destination: { address },
      travelMode,
      languageCode: 'es-419',
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.routes?.length) throw new Error(`${travelMode}: ${JSON.stringify(json)}`);
  const r = json.routes[0];
  const end = r.legs[0].endLocation.latLng;
  return {
    meters: r.distanceMeters,
    seconds: parseInt(r.duration, 10),   // viene como "394s"
    polyline: r.polyline.encodedPolyline,
    end: { lat: end.latitude, lng: end.longitude },
  };
}

(async () => {
  const [drive, walk] = await Promise.all([route('DRIVE'), route('WALK')]);
  const out = {
    origin: { address: street[1], latLng: origin },
    destination: { query: address, label, sublabel, latLng: drive.end },
    drive: { meters: drive.meters, seconds: drive.seconds, polyline: drive.polyline },
    walk: { meters: walk.meters, seconds: walk.seconds },
  };
  fs.writeFileSync(path.join(__dirname, 'route.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`route.json: auto ${drive.meters} m / ${drive.seconds} s · a pie ${walk.meters} m / ${walk.seconds} s`);
})().catch(e => { console.error(e.message); process.exit(1); });

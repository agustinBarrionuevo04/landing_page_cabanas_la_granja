# Video: ruta al centro

Genera un video vertical (1080×1920, 30 fps, 14 s) sobre un mapa de Google Maps con el recorrido en auto desde el complejo hasta Av. Edén. Muestra la distancia y el tiempo en auto y el tiempo a pie. Pensado para Reels y Stories.

## Cómo funciona

1. `fetch-route.js` le pide la ruta a **Routes API** en modo auto y a pie y la guarda en `route.json`. Guarda la polilínea codificada, los metros, los segundos y el punto de destino geocodificado. El origen (coordenadas y dirección) sale de `cabanas-la-granja/lib/site.ts`.
2. `route.html` dibuja el mapa con **Maps JavaScript API** y expone `renderAt(t)`, que deja la escena en el segundo `t` (cámara, línea, pines, textos) y espera a que carguen los tiles.
3. `render.js` abre la página con Playwright, captura cuadro por cuadro y lo codifica con ffmpeg (H.264, `yuv420p`, `+faststart`). Como renderiza cuadro a cuadro y no graba en tiempo real, el video sale fluido aunque la red sea lenta.

## Requisitos

- Node 18 o superior, `ffmpeg` y Playwright con Chromium (`npm i -g playwright`, o con `NODE_PATH` apuntando a una instalación existente). Si Chromium no está donde Playwright lo busca, usá `CHROMIUM_PATH=/ruta/a/chromium`.
- Una API key de Google Cloud con **Maps JavaScript API** y **Routes API** habilitadas, en la variable `GOOGLE_MAPS_API_KEY`. Directions API es legacy y no se puede habilitar en proyectos nuevos. **No commitear la key.**

## Uso

Desde esta carpeta:

```sh
# 1. Ruta (solo hace falta si cambia el origen o el destino)
node fetch-route.js                                   # default: "Av. Edén 400, La Falda, Córdoba"
node fetch-route.js "Av. Edén 400, La Falda, Córdoba" "Av. Edén" "Centro de La Falda"

# 2. Revisar algunos cuadros sueltos (genera prueba_<t>.png)
node render.js prueba 1,5,10,13.5

# 3. Video completo (~3-4 min)
node render.js ruta-al-centro.mp4
```

## Ajustes

En `route.html`:
- `T`: línea de tiempo en segundos (cuándo arranca y termina el recorrido, el alejamiento y la tarjeta). `DURATION` y `FPS` definen el largo.
- `Z_FOLLOW` / `Z_OVERVIEW`: zoom mientras sigue al auto y en el plano general. Conviene usar valores enteros: en mapas raster un zoom fraccionario escala los tiles y las etiquetas se ven borrosas.
- `overviewCenter`: centro del plano general, corrido para dejar lugar al título y a la tarjeta. Si cambiás el destino, revisalo junto con `Z_OVERVIEW` mirando el cuadro final.
- Los colores son los tokens de `app/globals.css` (crema, verde monte, terracota), convertidos de oklch a hex.

## Notas

- Términos de Google: el logo de Google y "Datos del mapa" tienen que quedar visibles. No los tapes con la tarjeta.
- Los pines y el auto son overlays propios (`OverlayView`), no `google.maps.Marker`, para no depender de los íconos de `maps.gstatic.com`.
- La espera de tiles mira solo las imágenes de `googleapis.com`: si una imagen auxiliar que nunca termina de cargar entrara en el chequeo, cada cuadro esperaría hasta el timeout.
- El video generado (`*.mp4`) y los cuadros de prueba no se versionan (ver `.gitignore`).

# Videos: cómo llegar desde el complejo

Genera videos verticales (1080×1920, 30 fps, 15 s) sobre un mapa de Google Maps con el recorrido en auto desde el complejo hasta un destino: el centro (Av. Edén), el Anfiteatro o el Hotel Edén. Cada video muestra la distancia y el tiempo en auto, el tiempo a pie y puntos de referencia: la Ruta Nacional 38 y los otros dos destinos. Pensado para Reels y Stories.

## Cómo funciona

1. `destinations.json` define cada destino: qué se le pide a Routes API (`address` o `placeId`), el título, la etiqueta del pin y el texto de la tarjeta.
2. `fetch-route.js <destino>` le pide la ruta a **Routes API** en modo auto y a pie y la guarda en `routes/<destino>.json`. Guarda la polilínea codificada, los metros, los segundos y el punto de destino geocodificado. El origen (coordenadas y dirección) sale de `cabanas-la-granja/lib/site.ts`.
3. `landmarks.json` tiene los puntos de referencia (coordenadas verificadas a mano sobre el ícono del lugar en el mapa) y el trazado del tramo urbano de la RN 38 (Av. España), sacado de Routes API. Cada punto tiene el `id` de su destino: el lugar que es destino del video no se repite como referencia.
4. `route.html` dibuja el mapa con **Maps JavaScript API** y expone `renderAt(t)`, que deja la escena en el segundo `t` (cámara, línea, pines, textos) y espera a que carguen los tiles.
5. `render.js <destino>` abre la página con Playwright, captura cuadro por cuadro y lo codifica con ffmpeg (H.264, `yuv420p`, `+faststart`). Como renderiza cuadro a cuadro y no graba en tiempo real, el video sale fluido aunque la red sea lenta.

## Requisitos

- Node 18 o superior, `ffmpeg` y Playwright con Chromium (`npm i -g playwright`, o con `NODE_PATH` apuntando a una instalación existente). Si Chromium no está donde Playwright lo busca, usá `CHROMIUM_PATH=/ruta/a/chromium`.
- Una API key de Google Cloud con **Maps JavaScript API** y **Routes API** habilitadas, en la variable `GOOGLE_MAPS_API_KEY`. Directions API es legacy y no se puede habilitar en proyectos nuevos. **No commitear la key.**

## Uso

Desde esta carpeta:

```sh
# <destino>: centro | anfiteatro | hotel-eden

# 1. Ruta (las de routes/ ya están commiteadas; solo hace falta si cambia el origen o el destino)
node fetch-route.js anfiteatro

# 2. Revisar algunos cuadros sueltos (genera prueba_<t>.png)
node render.js anfiteatro prueba 1,5,10,14.5

# 3. Video completo (~3-4 min; por defecto sale ruta-<destino>.mp4)
node render.js anfiteatro
```

## Destinos

| Destino | Auto | A pie |
|---|---|---|
| `centro`: Av. Edén y Pres. Arturo Illia | 1,5 km · 4 min | 1,3 km · 20 min |
| `anfiteatro`: Anfiteatro de La Falda | 1,4 km · 4 min | 1,4 km · 19 min |
| `hotel-eden`: Hotel Edén | 1,4 km · 5 min | 1,4 km · 22 min |

Para agregar uno: sumalo a `destinations.json` (para lugares conocidos conviene el `placeId`, que Google rutea hasta el acceso real) y, si querés que aparezca como referencia en los otros videos, a `landmarks.json` con el mismo `id`.

### Por qué el centro es Av. Edén y Pres. Arturo Illia

Es la esquina de Av. Edén más cercana al complejo: ahí empieza el centro. Routes API devuelve la ruta más rápida en auto, respetando las calles de mano única. Comparación hecha con Routes API:

| Destino | Auto | A pie |
|---|---|---|
| Av. Edén y Pres. Arturo Illia (default) | 1,5 km · 4 min | 1,3 km · 20 min |
| Av. Edén y Jujuy | 1,6 km · 4 min | 1,5 km · 22 min |
| Plaza San Martín | 1,7 km · 5 min | 1,6 km · 23 min |
| Av. Edén 400 (primera versión) | 2,2 km · 7 min | 1,7 km · 25 min |

Si cambiás el destino `centro`, actualizá también `site.downtown` en `cabanas-la-granja/lib/site.ts` (el texto que acompaña al video en la landing).

## Ajustes

En `route.html`:
- `T`: línea de tiempo en segundos (recorrido, alejamiento, aparición de las referencias y la tarjeta). `DURATION` y `FPS` definen el largo.
- `Z_FOLLOW` / `Z_OVERVIEW`: zoom mientras sigue al auto y en el plano general. Conviene usar valores enteros: en mapas raster un zoom fraccionario escala los tiles y las etiquetas se ven borrosas.
- `overviewCenter`: centro del plano general (encuadra la ruta y los puntos de `landmarks.json`), corrido para dejar lugar al título y a la tarjeta. Si cambiás el destino o las referencias, revisalo junto con `Z_OVERVIEW` mirando el cuadro final.
- Los colores son los tokens de `app/globals.css` (crema, verde monte, terracota), convertidos de oklch a hex.

## Notas

- Términos de Google: el logo de Google y "Datos del mapa" tienen que quedar visibles. No los tapes con la tarjeta.
- Los pines y el auto son overlays propios (`OverlayView`), no `google.maps.Marker`, para no depender de los íconos de `maps.gstatic.com`.
- La espera de tiles mira solo las imágenes de `googleapis.com`: si una imagen auxiliar que nunca termina de cargar entrara en el chequeo, cada cuadro esperaría hasta el timeout.
- Los videos generados (`*.mp4`) y los cuadros de prueba no se versionan (ver `.gitignore`). La versión web del video del centro que usa la landing está en `cabanas-la-granja/public/`.

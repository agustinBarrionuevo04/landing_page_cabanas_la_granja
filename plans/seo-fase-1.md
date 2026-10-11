# Plan: SEO Fase 1, que Google encuentre el sitio

Estado: aprobado

## Objetivo

"Que cuando busques Cabañas La Granja aparezca de las primeras." Esta fase cubre la base técnica para que Google pueda rastrear, indexar y entender el sitio (`plans/seo-audit/ACTION-PLAN.md`, Fase 1, puntos 1 a 4):

1. Llevar a producción la vista previa al compartir (el commit `5c17074` quedó fuera del PR #6).
2. `robots.txt`.
3. `sitemap.xml`.
4. URL canónica.
5. Datos estructurados `LodgingBusiness` (JSON-LD).
6. Unificar la dirección visible con la de Google Maps.

## Feature a implementar

**`seo-fase-1`**, en la rama `feature/seo-fase-1` (sale de `origin/main`). Agrega los archivos de rastreo (`app/robots.ts`, `app/sitemap.ts`), la URL canónica y el JSON-LD del negocio, generados desde los datos que ya están en `lib/site.ts`.

## Features que va a utilizar

| Pieza (nombre textual) | Dónde | Cómo la usa |
|---|---|---|
| `site` (`name`, `email`, `phones`, `instagram`, `address`) | `cabanas-la-granja/lib/site.ts` | Fuente única para nombre, teléfono, mail e Instagram del JSON-LD |
| `metadata` (export de Next) | `cabanas-la-granja/app/layout.tsx` | Se le suma `alternates.canonical` |
| `shareImage` / `og-image.jpg` | `app/layout.tsx`, `public/og-image.jpg` (commit `5c17074`) | La imagen del JSON-LD y de la vista previa |
| `RootLayout` | `cabanas-la-granja/app/layout.tsx` | Renderiza el `<script type="application/ld+json">` |
| Servicios de `inCabin` / `inComplex` | `cabanas-la-granja/components/amenities-section.tsx` | Referencia para `amenityFeature` (ver Enfoque: se listan en `lib/site.ts`, no se importan del componente) |
| Convenciones de metadata de Next 14.2 (`MetadataRoute.Robots`, `MetadataRoute.Sitemap`) | `next` 14.2.16 | Generan `robots.txt` y `sitemap.xml` como archivos estáticos en el build |

## Features que va a modificar

| Pieza | Archivo | Qué cambia | Posible impacto |
|---|---|---|---|
| `siteUrl` | `app/layout.tsx` → pasa a `lib/site.ts` como `site.url` | Hoy se arma con `VERCEL_PROJECT_PRODUCTION_URL`. Pasa a ser el dominio fijo `https://www.xn--cabaaslagranja-tnb.com`, con `NEXT_PUBLIC_SITE_URL` como única forma de cambiarlo | Los deploys de prueba de Vercel también apuntan a producción en canonical y vista previa. Es lo deseable: así no se indexan ni se comparten URLs de prueba |
| `metadata` | `app/layout.tsx` | Se agrega `alternates.canonical: "/"` | Ninguno visible |
| `RootLayout` | `app/layout.tsx` | Se agrega el `<script>` JSON-LD en el `<body>` | Ninguno visible; pesa ~1 KB en el HTML |
| `site` | `lib/site.ts` | Se suman `url`, `streetAddress`, `postalCode`, `geo`, `mapsUrl` y `amenities` (claves nuevas). `address` cambia a "Av. Teresa M. de Ferrarini 1100, La Falda, Córdoba" | La dirección visible cambia en Ubicación (`location-section.tsx`) y en el footer (`footer.tsx`), que leen `site.address` |
| `AGENTS.md` | raíz | Se actualiza la nota de "Vista previa al compartir" (dominio fijo) y se agrega robots/sitemap/JSON-LD | — |

## Fuera de alcance

- Cambiar otros textos visibles: el H1 con "Cabañas en La Falda" y el título. Eso es la Fase 2.
- Search Console y Google Business Profile (los hacés vos; te dejo los pasos).
- Imágenes WebP, alt de la galería, contenido nuevo, preguntas frecuentes.
- `llms.txt` y headers de seguridad.
- Reseñas en el schema (`aggregateRating`): Google no muestra estrellas de reseñas propias del negocio y puede tomarlo como spam.

## Enfoque

1. **Rama nueva desde `origin/main`** + `git cherry-pick 5c17074` para recuperar la vista previa al compartir.
2. **Dominio fijo en `lib/site.ts`.** Se usa `site.url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.xn--cabaaslagranja-tnb.com"`. El host va en punycode porque las URLs de un sitemap tienen que ser ASCII, y con `www` porque producción redirige ahí.
   - Descarté seguir con `VERCEL_PROJECT_PRODUCTION_URL`: Vercel elige "el dominio más corto", que podría ser el sin `www`. Ese redirige, y un canonical que redirige confunde a Google.
3. **`app/robots.ts`:** permite todo y declara `sitemap: ${site.url}/sitemap.xml`.
4. **`app/sitemap.ts`:** una sola URL (`${site.url}/`), con `lastModified` igual a la fecha del build.
5. **Canonical:** `alternates.canonical: "/"` en `metadata`; Next lo resuelve contra `metadataBase`.
6. **JSON-LD en `lib/structured-data.ts`**, con una función pura `lodgingBusinessJsonLd()` que arma el objeto desde `site`. `RootLayout` lo inserta con `JSON.stringify` en un `<script type="application/ld+json">`.
   - Campos: `@type: "LodgingBusiness"`, `name`, `url`, `image` (og-image), `logo`, `telephone`, `email`, `address` (`PostalAddress`: `streetAddress` "Av. Teresa M. de Ferrarini 1100", `postalCode` "X5172", `addressLocality` "La Falda", `addressRegion` "Córdoba", `addressCountry` "AR"), `geo` (lat −31.1005613, long −64.4724555, tomados del mapa embebido), `hasMap`, `sameAs` (Instagram y ficha de Google Maps), `amenityFeature` y `petsAllowed: true`.
   - Descarté `@type: "Campground"`/`"Resort"`: `LodgingBusiness` es el tipo genérico correcto para un complejo de cabañas.

## Archivos afectados

- `cabanas-la-granja/app/layout.tsx` (modificado)
- `cabanas-la-granja/lib/site.ts` (modificado)
- `cabanas-la-granja/lib/structured-data.ts` (nuevo)
- `cabanas-la-granja/app/robots.ts` (nuevo)
- `cabanas-la-granja/app/sitemap.ts` (nuevo)
- `cabanas-la-granja/public/og-image.jpg` (llega por el cherry-pick)
- `cabanas-la-granja/test/seo.test.ts` (nuevo)
- `AGENTS.md` (modificado)

## Riesgos y supuestos

- **Supuesto:** el dominio canónico es `https://www.cabañaslagranja.com`, porque producción redirige el dominio sin www hacia www.
- **Confirmado:** la ficha de Google Maps del mapa embebido (4,4★, 269 reseñas) es la del complejo. De ahí salen las coordenadas y el ID (`cid=10666608910001243711`) que se enlaza en `sameAs`.
- **Confirmado:** la dirección del JSON-LD es la de Google Maps: "Av. Teresa M. de Ferrarini 1100, X5172 La Falda, Córdoba".
- **Confirmado:** sin horario de check-in/check-out ni rango de precios; el schema va sin esos campos (son opcionales).
- **Decidido:** la dirección visible también pasa a ser la de Google Maps, así coincide con el JSON-LD.
- **Riesgo:** con `output` normal de Next en Vercel, `robots.ts` y `sitemap.ts` se generan estáticos en el build. Lo verifico mirando el build.

## Verificación

- **Tests nuevos (`test/seo.test.ts`):**
  - `robots()` permite rastrear y apunta al sitemap con el dominio canónico.
  - `sitemap()` devuelve exactamente la URL canónica.
  - `lodgingBusinessJsonLd()` tiene `@type` `LodgingBusiness`, teléfono y mail iguales a `site`, dirección completa, `geo` y `sameAs` con Instagram.
- **Build** en una copia aparte (para no pisar `.next` del servidor local): confirmar que salen `robots.txt`, `sitemap.xml`, `<link rel="canonical">` y el `<script type="application/ld+json">` en el HTML.
- Validar el JSON-LD con la herramienta de schema de claude-seo (`seo-schema`).
- Tests existentes, `tsc --noEmit` y build en verde.
- **Después del deploy (a mano):** `https://www.cabañaslagranja.com/robots.txt` y `/sitemap.xml` responden 200, y la [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results) detecta el `LodgingBusiness`.

## Preguntas abiertas

Ninguna.

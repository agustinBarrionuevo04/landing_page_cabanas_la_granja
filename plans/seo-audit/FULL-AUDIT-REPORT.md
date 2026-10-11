# Auditoría SEO: cabañaslagranja.com

- Fecha: 2026-10-11
- URL auditada: https://www.cabañaslagranja.com/ (`www.xn--cabaaslagranja-tnb.com`)
- Herramienta: claude-seo v2.4.2 (render, análisis on-page) + chequeos HTTP + búsquedas web
- Tipo de negocio detectado: **servicio local / alojamiento turístico** (LodgingBusiness), una sola página

## Resumen

**Puntaje estimado: ~51 / 100.** Es aproximado: Core Web Vitals no se pudo medir porque PageSpeed sin API key devolvió límite de cuota.

| Categoría | Peso | Puntaje | Motivo principal |
|---|---|---|---|
| SEO técnico | 22% | 60 | HTTPS y redirecciones bien; faltan robots.txt, sitemap y canonical |
| Contenido | 23% | 45 | 289 palabras; sin capacidades, tarifas, check-in, preguntas frecuentes |
| On-page | 20% | 65 | Título y descripción bien; el H1 no dice "cabañas" ni "La Falda" |
| Datos estructurados | 10% | 10 | No hay ningún JSON-LD |
| Rendimiento | 10% | ~70 (sin medir) | Sitio estático, respuesta en 155 ms; imágenes JPEG sin optimizar |
| Preparación para buscadores con IA | 10% | 35 | Poco dato concreto citable, sin schema |
| Imágenes | 5% | 60 | Buenos alt en la mayoría; las fotos de la galería tienen `alt=""` |

## Hallazgo más importante: el sitio casi no aparece en buscadores

Buscando "Cabañas La Granja La Falda Córdoba" no aparece el sitio, ni tampoco con el nombre del dominio. Sí aparecen competidores (Cabañas El Mirador, Friul, El Jardín, Wingfield) y directorios como Welcome Argentina.

Hay dos causas probables:

1. **Indexación.** No hay sitemap ni Search Console verificado (no se puede confirmar sin acceso). Lo más probable es que Google tenga poco o nada indexado.
2. **Choque de nombre con el pueblo "La Granja".** La Granja es una localidad de Córdoba, en Sierras Chicas. Las búsquedas de "cabañas la granja" devuelven cabañas *en* La Granja (Espacio Silvestre, Lignum, etc.). El nombre siempre tiene que ir junto con "La Falda" para que Google entienda de qué entidad se habla.

Limitación: el buscador usado para esta auditoría no es Google Argentina, así que las posiciones exactas pueden diferir. Igual, los dos problemas se confirman por otras vías: el sitemap da 404 y la colisión de nombre está en los resultados.

## SEO técnico

| Chequeo | Estado |
|---|---|
| HTTPS + HSTS | Bien (`max-age=63072000`) |
| Redirecciones | Bien: http → https y sin www → www, cada una con un 308 |
| Renderizado | Bien: HTML estático, el contenido está en el HTML inicial |
| Página 404 | Bien: `noindex` |
| `robots.txt` | **Falta** (404) |
| `sitemap.xml` | **Falta** (404) |
| `<link rel="canonical">` | **Falta** |
| Imagen para compartir `og-image.jpg` | **404 en producción**: el commit `5c17074` quedó fuera del merge del PR #6 |
| Headers de seguridad | Solo HSTS (falta `X-Content-Type-Options`, `Referrer-Policy`); impacto SEO bajo |

## On-page

- **Título:** "Cabañas la Granja · La Falda, Córdoba" (37 caracteres). Está bien, aunque le sobra lugar para sumar "con pileta".
- **Meta description:** bien (149 caracteres, con beneficios concretos).
- **H1:** "Viví la tranquilidad de las sierras". Es lindo, pero no tiene ninguna palabra que la gente busque. Conviene que diga "Cabañas en La Falda" de forma visible o dentro del H1.
- **H2:** son buenos títulos de sección, pero ninguno apunta a búsquedas ("cabañas con pileta en La Falda", "cómo llegar").
- **Datos de contacto:** la dirección del sitio ("Av. Ferrarini al 1100") no coincide con la de Google Maps ("Av. Teresa M. de Ferrarini, X5172"). Nombre, dirección y teléfono tienen que ser idénticos en todos lados.

## Contenido

Hay 289 palabras en total. Para competir en "cabañas en La Falda" falta información que la gente busca y que Google y las IA citan:

- Tipos de cabaña y para cuántas personas es cada una.
- Qué incluye cada cabaña (ropa de cama, vajilla, aire acondicionado o no, TV).
- Horario de check-in y check-out, política de mascotas y de seña.
- Temporadas y tarifas (aunque sea "desde $X" o "consultá tarifas").
- Distancias a lugares conocidos (centro, Hotel Edén, Siete Cascadas, Cerro La Banderita).
- Preguntas frecuentes.

## Datos estructurados

No hay ninguno. Es la mejora de mayor impacto por esfuerzo. Conviene un `LodgingBusiness` con:

- Datos del negocio: nombre, dirección, ubicación (lat −31.1005613, long −64.4724555, tomada del mapa embebido), teléfono, mail y URL.
- Imágenes y servicios (`amenityFeature`: pileta, wifi, parrilla, estacionamiento, admite mascotas).
- `sameAs`: Instagram y la ficha de Google Maps.

## Imágenes

- Los alt son buenos en la portada, Nosotros y Servicios.
- Las fotos del mosaico de la galería tienen `alt=""` (la descripción está en el botón). Para Google Imágenes conviene que el alt esté en la foto.
- Son JPEG de entre 240 y 550 KB, servidos sin optimizar (`images.unoptimized`). Se pueden generar versiones WebP de antemano sin cambiar el tipo de deploy.

## Preparación para buscadores con IA

- No hay hechos concretos y citables: precios, capacidades, distancias, horarios.
- No hay schema para identificar la entidad.
- `llms.txt` no existe; aporta poco para un sitio de una página, es opcional.

## Señales locales (fuera del sitio)

- Según el mapa embebido, **hay ficha de Google Business Profile, con 4,4★ y 269 reseñas**. Es el activo más valioso: para "cabañas en La Falda", el mapa de Google suele aparecer antes que los resultados web.
- Conviene verificar que la ficha apunte a `https://www.cabañaslagranja.com`, revisar la categoría, las fotos y los horarios, y responder las reseñas.
- El dominio con "ñ" es difícil de escribir; las variantes sin ñ (`cabanaslagranja.com`, `.com.ar`) no responden.

## Fuentes de las búsquedas

- [Alquiler de cabañas en La Falda (Welcome Argentina)](https://www.welcomeargentina.com/lafalda/cabanas.html)
- [Cabañas con pileta en La Falda (Welcome Argentina)](https://www.welcomeargentina.com/lafalda/cabanas-con-pileta.html)
- [La Granja, alquileres (Expedia)](https://www.expedia.com/La-Granja-Vacation-Rentals.d3000007302.Travel-Guide-VacationRentals)
- [Espacio Silvestre Cabañas, La Granja](https://www.bedandbreakfast.eu/en/a/uJ23n9vPzuqv/espacio-silvestre-cabanas)

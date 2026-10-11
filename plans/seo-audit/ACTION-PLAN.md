# Plan de acción SEO: cabañaslagranja.com

Ordenado por impacto. **[Código]** lo hago yo en el repo; **[Vos]** requiere tu cuenta o datos del negocio.

## Fase 1: que Google encuentre el sitio (esta semana)

1. **[Código] Llevar a producción la vista previa al compartir.** El commit `5c17074` quedó fuera del PR #6 y `og-image.jpg` da 404.
2. **[Código] `robots.txt` y `sitemap.xml`** con `app/robots.ts` y `app/sitemap.ts`. Funcionan en sitio estático.
3. **[Código] Canonical** apuntando a `https://www.cabañaslagranja.com/`.
4. **[Código] Datos estructurados `LodgingBusiness`** (JSON-LD): nombre, dirección, ubicación, teléfono, servicios, Instagram y ficha de Maps.
5. **[Vos] Google Search Console:** verificar el dominio (con un registro DNS en Vercel), enviar el sitemap y pedir la indexación de la portada. Sin esto no hay forma de saber qué ve Google.
6. **[Vos] Google Business Profile:** que el sitio web de la ficha sea `https://www.cabañaslagranja.com`. Revisar categoría ("Complejo de cabañas"), horarios, fotos actuales (sin la sala de juegos) y responder reseñas.

## Fase 2: que Google entienda quién sos (semanas 2-3)

7. **[Código] Diferenciarse del pueblo "La Granja".** Que el H1 o el texto principal diga "Cabañas en La Falda". Título: "Cabañas la Granja en La Falda, Córdoba · Pileta y parque".
8. **[Vos + Código] Unificar nombre, dirección y teléfono.** Elegir una sola dirección (por ejemplo "Av. Teresa M. de Ferrarini 1100, La Falda") y usarla igual en el sitio, Google, Instagram y directorios.
9. **[Código] Alt en las fotos de la galería** (no solo en el botón), y versiones WebP comprimidas generadas de antemano.

## Fase 3: contenido que convence y se cita (mes 2)

10. **[Vos → Código] Sección "Las cabañas":** tipos, capacidad, qué incluye cada una. Necesito estos datos tuyos.
11. **[Vos → Código] Preguntas frecuentes:** check-in y check-out, mascotas, seña y cancelación, ropa de cama, temporada de pileta.
12. **[Vos → Código] "Qué hacer cerca"** con distancias reales (centro, Hotel Edén, Siete Cascadas, Cerro La Banderita).
13. **[Vos] Directorios:** dar de alta o actualizar Welcome Argentina, Booking/Airbnb (si aplica) y TripAdvisor, con link al sitio y los mismos datos de contacto.

## Fase 4: seguimiento (continuo)

14. **[Vos] Dominio sin ñ:** registrar `cabanaslagranja.com` (o `.com.ar`) y redirigirlo al principal. Mucha gente no escribe la ñ.
15. **[Vos] Reseñas:** pedirlas por WhatsApp después de cada estadía; responderlas todas.
16. **[Vos + Código] Medición:** después de 4 a 6 semanas, revisar Search Console (consultas, impresiones) y medir Core Web Vitals con una API key de PageSpeed.

## Qué necesito de vos para la Fase 1 y 2

- La dirección exacta como querés que figure.
- Acceso a Search Console (o lo verificás vos siguiendo mis pasos).
- Si la ficha de Google Business es tuya y qué URL tiene cargada.

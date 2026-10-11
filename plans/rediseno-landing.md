# Plan: rediseño y pulido de la landing de Cabañas La Granja

Estado: **APROBADO (2026-10-11), construido; pendiente de entrega**
Rama: `claude/landing-page-design-review-1fbe38`

## 0. Pedido concreto (va sí o sí)

- Borrar `public/sala_de_juegos.jpeg` y sacarla de la galería (`components/gallery-section.tsx:35`).
- Sacar el amenity "Salon de Juegos" (`components/amenities-section.tsx:28`) y el ícono `Dices` que queda sin usar.

## 1. Diagnóstico (qué encontré)

### Bugs y problemas funcionales
| # | Problema | Dónde |
|---|---|---|
| 1 | **No hay menú en mobile**: el `nav` es `hidden md:flex` y no hay hamburguesa. En celular solo se ve "Reservar". | `header.tsx` |
| 2 | Al navegar, el título de cada sección queda **tapado por el header fijo** (no hay `scroll-margin-top`). | todas las secciones |
| 3 | El hero usa `h-screen` (100vh): en mobile el contenido salta con la barra del navegador. | `hero-section.tsx` |
| 4 | **Dos `<h1>`** (logo del header + hero). Malo para SEO y lectores de pantalla. | `header.tsx`, `hero-section.tsx` |
| 5 | Alt de fotos incorrectos: el garage dice "Cocina equipada", la sala de juegos dice "Sala de estar con chimenea", 12 fotos dicen "Entorno natural". | `gallery-section.tsx` |
| 6 | Las 14 tarjetas de amenities tienen `description: ""` → se renderiza un `CardContent` vacío que agrega aire sin sentido. | `amenities-section.tsx` |
| 7 | Teléfono y mail **no son clickeables** (sin `tel:` / `mailto:`). | `contact-section.tsx`, `footer.tsx` |
| 8 | El iframe del mapa no tiene `title` (accesibilidad). Los botones ‹ › de la galería no tienen `aria-label`. | `location-section.tsx`, `gallery-section.tsx` |
| 9 | El iframe de YouTube se carga entero apenas lo elegís; no hay "fachada" liviana. | `gallery-section.tsx` |
| 10 | Fotos sin optimizar: 8,5 MB en `public/`, `images.unoptimized: true`, `<img>` crudo y fondo del hero por CSS (sin prioridad de carga). | `next.config.mjs`, todos |
| 11 | El test `muestra una imagen por defecto` espera que no arranque en el video, pero el primer ítem **es** el video. Hay que correrlo; sospecho que está fallando hoy. | `test/gallery-section.test.tsx` |
| 12 | Footer: "© 2025" fijo, falta link a Ubicación. | `footer.tsx` |

### Textos
- Mezcla de voseo y tuteo: "Viví" / "Seguinos" vs "Reserva Ahora", "Descubre", "Contáctanos", "Encuéntranos". Propongo **voseo en todo** (es Córdoba).
- Errores: "Vivi" → "Viví", "Parrilas" → "Parrillas", "mas" → "más", "ademas" → "además", "Salon" → "Salón", "mts" → "m²", doble espacio en varios párrafos.

### Diseño (por qué se ve "plantilla")
- Paleta por defecto de v0: cian + ámbar sobre blanco y grises. No transmite sierras, madera ni campo.
- Una sola tipografía (Geist) en todo: los títulos no tienen personalidad.
- Todas las secciones son iguales: título centrado + párrafo + grilla de cards. No hay ritmo.
- Amenities: 14 cards grandes, cada una con un ícono y 2-3 palabras. Mucho scroll para poca información.
- Galería: foto grande + 19 miniaturas en grilla. Funciona, pero se ve vieja.
- Botones flotantes: `transition-all`, `hover:scale-110` también en touch, ícono genérico de chat para WhatsApp, Instagram con gradiente violeta que choca con todo.
- Sin ninguna animación de entrada ni respuesta al presionar botones.

## 2. Propuesta de diseño

### 2.1 Identidad visual
- **Paleta cálida "sierras"**: fondo crema/hueso, texto casi negro cálido, primario verde monte (oliva profundo), acento terracota/arcilla para los CTA de reserva. Variables en `globals.css`; se borra el bloque `.dark` que no se usa.
- **Tipografía**: serif con carácter para títulos (propuesta: *Fraunces* o *Instrument Serif* vía `next/font/google`) + Geist o Inter para el cuerpo. Títulos con `letter-spacing` negativo y `text-balance`.
- Radio de bordes y sombras más suaves y consistentes; menos cards con borde, más espacio en blanco y fotos.

### 2.2 Sección por sección
- **Header**: transparente sobre el hero con texto blanco; al scrollear pasa a fondo crema con blur y borde. Indicador de sección activa. Menú hamburguesa en mobile usando el `Sheet` que ya existe en `components/ui`.
- **Hero**: `100svh`, foto con `next/image priority`, degradé desde abajo en vez de negro plano al 40%, título serif grande alineado a la izquierda abajo (estilo editorial), un CTA principal "Reservá por WhatsApp" + uno secundario "Ver las cabañas". Pequeño indicador de "scroll" abajo.
- **Nosotros**: layout asimétrico foto grande + texto; los números (+20 años / +50k huéspedes) como cifras grandes en serif, sin cards.
- **Amenities**: separar en dos grupos, "En tu cabaña" (cocina, wifi, calefacción, parrilla, cochera) y "En el complejo" (piletas, 10.000 m² de parque, canchas, plaza, solarium, bar, vista, pet friendly). Grilla compacta ícono + texto, sin cards vacías. Opcional: una franja de fotos (pileta / parque / canchas) entre los dos grupos.
- **Galería**: grilla tipo *bento* (fotos de distintos tamaños) con el video como pieza destacada con botón de play. Click abre un **lightbox** a pantalla completa con flechas, teclado (← → Esc), swipe en celular y contador "3 / 18". El video se carga solo al darle play (fachada con miniatura).
- **Ubicación**: mapa con bordes redondeados + bloque con dirección, "a X min del centro de La Falda" (si me pasás el dato) y botón "Cómo llegar" que abre Google Maps.
- **Contacto**: el formulario de WhatsApp queda igual en funcionamiento, rediseñado; teléfonos, mail e Instagram como links clickeables.
- **Footer**: fondo verde monte, año dinámico, links completos.
- **Botones flotantes**: ícono oficial de WhatsApp (SVG), Instagram en el mismo estilo neutro, `scale(0.97)` al presionar, hover solo en dispositivos con mouse.

### 2.3 Detalles de calidad (Emil Kowalski / Apple)
- Curvas propias (`cubic-bezier(0.23, 1, 0.32, 1)`), nada de `transition-all`, duraciones de UI < 300 ms.
- `:active { scale(0.97) }` en todos los botones.
- Hover detrás de `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion`: se quitan movimientos y queda solo fade.
- `scroll-margin-top` en secciones, `scroll-behavior: smooth` global en vez de `scrollIntoView` repetido en cada componente; la navegación pasa a ser `<a href="#seccion">` reales.
- Tap highlight y estados de foco visibles con el color de marca.

## 3. Efectos de scroll recomendados

Te los ordeno de más recomendable a más arriesgado. **Mi recomendación: 1 + 2 + 3 + 4.** El 5 lo vemos si querés algo "wow".

| # | Efecto | Dónde | Comentario |
|---|---|---|---|
| 1 | **Hero con zoom-out y oscurecido al scrollear**: la foto arranca en `scale(1.08)` y baja a 1 mientras el texto se desvanece y sube un poco. | Hero | Muy "Apple", barato (solo transform/opacity). Con CSS scroll-driven animations (`animation-timeline: scroll()`); donde no hay soporte, queda estático. |
| 2 | **Revelado de fotos con `clip-path`**: la foto aparece "destapándose" de abajo hacia arriba al entrar en pantalla, una sola vez. | Nosotros, franja de amenities, galería | Se siente premium y no molesta. IntersectionObserver. |
| 3 | **Fade-up escalonado** (8 px, 40-60 ms entre ítems) para títulos y la grilla de amenities. | Todas las secciones | Sutil, da ritmo. Una sola vez por elemento. |
| 4 | **Header que cambia** de transparente a sólido + resaltado de la sección activa. | Header | Más funcional que decorativo. |
| 5 | **Galería horizontal "pinneada"**: la sección se queda fija y al scrollear vertical las fotos avanzan en horizontal. | Galería | Muy vistoso en desktop, pero en celular puede molestar. Lo haría solo en desktop, con la grilla normal en mobile. |

Descartados: parallax en todas las fotos (marea y pesa en celulares viejos), contadores animados de números (cliché), cursor personalizado.

**Sin dependencias nuevas**: todo con CSS + un hook chico de IntersectionObserver. No meto Framer Motion para esto.

## 4. Limpieza técnica (bajo riesgo)
- Activar optimización de imágenes de Next (sacar `unoptimized: true`) y usar `next/image` con `sizes`. *Ojo: si se despliega como sitio estático, esto cambia; confirmame dónde está hosteado.*
- Metadata: Open Graph (foto + título para cuando se comparte por WhatsApp), favicon con el logo, `lang="es-AR"`.
- No toco los ~40 componentes de `components/ui` sin usar ni las dependencias sobrantes (quedan para otra tarea si querés).

## 5. Verificación
- `pnpm test`, `pnpm lint`, `pnpm build` en verde.
- Actualizar/agregar tests de galería: arranca correctamente, el lightbox abre/cierra, ← → navegan, la sala de juegos ya no aparece.
- Revisión visual en el navegador integrado: desktop (1440), tablet (768) y mobile (375), y con `prefers-reduced-motion`.
- Capturas antes/después para el PR.

## 6. Preguntas abiertas
1. ¿Te va la dirección de paleta cálida verde monte + terracota, o preferís mantener los colores actuales (cian/ámbar) y solo pulir?
2. ¿Serif para los títulos, sí o no?
3. ¿Qué efectos de scroll metemos? (recomiendo 1-4)
4. ¿Los datos "+20 años" y "+50k huéspedes" siguen siendo correctos? ¿Hay distancia al centro de La Falda para poner en Ubicación?
5. ¿Dónde está desplegado (Vercel, estático, otro)? Define si activo la optimización de imágenes.
6. ¿Paso todos los textos a voseo?

## 7. Orden de construcción (una vez aprobado)
1. Pedido concreto (sala de juegos) + bugs funcionales (1-9, 12) + textos.
2. Tokens de diseño (paleta, tipografía, curvas) en `globals.css` y `layout.tsx`.
3. Rediseño sección por sección: header → hero → nosotros → amenities → galería + lightbox → ubicación → contacto → footer → flotantes.
4. Efectos de scroll elegidos.
5. Imágenes y metadata.
6. Tests, lint, build y revisión visual.

## 8. Decisiones tomadas al construir
- Preguntas 1, 2, 3 y 6 sin respuesta explícita: se aplicaron las recomendaciones (paleta verde monte + terracota, serif Fraunces, efectos 1-4, voseo).
- Pregunta 4: cifras sin cambios; sin dato de distancia, se omitió.
- Pregunta 5: Vercel como sitio estático → se mantiene `images.unoptimized: true`; se usa `next/image` igual (carga diferida, `priority` en el hero, `sizes`).
- Se descartó la flecha "bajar" del hero porque chocaba con los botones flotantes.
- En mobile: "Reservar" del header pasa al menú; el Instagram flotante solo se ve desde tablet (está en contacto y footer).
- Logo: se generó `public/logo-mark.png` (isotipo recortado y transparente desde `logo_v1.jpeg`) para que funcione blanco sobre el hero y oscuro al bajar.
- Infra de tests: vitest no tenía el runtime JSX automático ni `cleanup` entre tests; los 2 tests viejos fallaban en `main`. Se arregló la config y se reescribieron los tests para la galería nueva (5 tests).
- Pendiente para la etapa de SEO: `metadataBase` con el dominio real (hoy Next avisa en el build), datos estructurados, sitemap/robots, imágenes más livianas.

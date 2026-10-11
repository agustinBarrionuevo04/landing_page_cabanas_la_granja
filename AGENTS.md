# Cabañas La Granja

Landing page de una sola página para Cabañas La Granja (La Falda, Córdoba), hecha con Next.js 14 (App Router) + Tailwind CSS v4 + componentes shadcn/ui, desplegada en Vercel como sitio estático.

## Estructura

La app vive en `cabanas-la-granja/` (no en la raíz del repo). Todos los comandos se corren desde ahí.

```
cabanas-la-granja/
  app/            layout.tsx (fuentes, metadata), page.tsx (arma las secciones), globals.css (tokens y animaciones)
  components/     una sección por archivo (header, hero-section, about-section, amenities-section,
                  gallery-section, location-section, contact-section, footer, floating-buttons)
                  + section-heading.tsx y reveal-observer.tsx (revelado al hacer scroll)
  components/ui/  componentes shadcn/ui (la mayoría sin uso)
  lib/site.ts     datos del negocio (dominio, dirección, contacto, servicios), links de navegación y `whatsappUrl` (única fuente de verdad)
  lib/structured-data.ts  `lodgingBusinessJsonLd()`: JSON-LD del complejo, se inserta en `app/layout.tsx`
  app/robots.ts, app/sitemap.ts  generan robots.txt y sitemap.xml en el build
  public/         fotos y logos
  test/           tests de Vitest + Testing Library
plans/            planes de trabajo (`/planear`)
video/ruta-al-centro/  generador del video vertical de la ruta complejo → Av. Edén (Google Maps + Playwright + ffmpeg; ver su README)
```

## Comandos

Node 24 y pnpm 11 (verificado con node v24.18.0, pnpm 11.18.0).

| Para | Comando (desde `cabanas-la-granja/`) |
|---|---|
| Instalar | `pnpm install` |
| Desarrollo | `./node_modules/.bin/next dev` (puerto 3000) |
| Tests | `./node_modules/.bin/vitest run` |
| Tipos | `./node_modules/.bin/tsc --noEmit` |
| Build | `./node_modules/.bin/next build` |

Notas verificadas:
- Con pnpm 11, `pnpm install` termina con `ERR_PNPM_IGNORED_BUILDS` (pide `allowBuilds` en `pnpm-workspace.yaml`) y modifica ese archivo con valores de ejemplo. Las dependencias igual quedan instaladas; revertí el cambio en `pnpm-workspace.yaml`.
- Por ese mismo chequeo, `pnpm test` / `pnpm build` fallan antes de correr. Usá los binarios directos de la tabla.
- `pnpm lint` (`next lint`) **no está configurado**: no hay config de ESLint y el comando abre un asistente interactivo. No hay lint por ahora.
- No corras `next build` con `next dev` levantado: los dos usan `.next/` y el build deja al servidor de desarrollo sirviendo el CSS con 404 (la página se ve sin estilos). Si pasa, frená el dev, borrá `.next/` y volvé a levantarlo.
- `next.config.mjs` tiene `typescript.ignoreBuildErrors` y `eslint.ignoreDuringBuilds` en `true`: **el build no detecta errores de tipos**. Corré siempre `tsc --noEmit` antes de dar algo por terminado.

## Convenciones

- Textos de la página en español rioplatense con **voseo** ("Reservá", "Conocé", "Escribinos").
- Datos de contacto (teléfonos, mail, WhatsApp, Instagram, dirección) solo en `lib/site.ts`; no repetirlos en los componentes.
- Navegación con `<a href="#seccion">` reales; el desplazamiento suave y el margen del header fijo los resuelve CSS (`scroll-behavior` y `scroll-padding-top` en `globals.css`).
- Tokens de diseño en `app/globals.css`: paleta crema / verde monte (`primary`) / terracota (`secondary`), tipografía display `font-display` (Fraunces) y curvas `--ease-out-strong`, `--ease-in-out-strong`, `--ease-drawer`.
- Animaciones: solo `transform`/`opacity`/`clip-path`; respetar `prefers-reduced-motion`. En Tailwind v4, `scale-*` y `translate-*` usan las propiedades CSS `scale`/`translate`: si escribís `transition-[...]` a mano, incluilas.
- Revelado al scrollear: agregar `data-reveal="up"` o `data-reveal="clip"` (y opcional `style={{ "--i": n }}` para escalonar). Solo se oculta si hay JS.
- El `Button` de `components/ui` no reenvía `ref` (React 18): no usarlo como hijo `asChild` de disparadores de Radix (`Dialog.Trigger`, `Dialog.Close`); usar el primitivo nativo.
- Fotos con `next/image` y `alt` descriptivo real (nada de "Entorno natural").
- Commits cortos en inglés; los PRs van de una rama de trabajo hacia `main`.

## Zonas delicadas

- **Deploy**: Vercel, sitio estático con dominio propio. Un merge a `main` publica. No mergear ni desplegar sin confirmación explícita.
- **Imágenes**: `images.unoptimized: true` se mantiene a propósito (sitio estático). No activar la optimización de Next sin consultarlo.
- **Fotos de `public/`**: son fotos reales del complejo. No borrar ni reemplazar sin pedido explícito.
- **SEO y dominio**: `site.url` en `lib/site.ts` es el dominio canónico fijo `https://www.xn--cabaaslagranja-tnb.com` (cabañaslagranja.com en punycode, con www porque el resto redirige ahí; se puede cambiar con `NEXT_PUBLIC_SITE_URL`). De ahí salen `metadataBase`, el canonical, robots, sitemap y el JSON-LD. No volver a `VERCEL_PROJECT_PRODUCTION_URL`: puede elegir el dominio sin www, que redirige.
- **Datos del negocio**: la dirección tiene que ser idéntica a la de la ficha de Google Maps ("Av. Teresa M. de Ferrarini 1100", X5172). Si cambia algo del contacto, se cambia en `lib/site.ts` y se actualiza solo en la página y en el JSON-LD.
- **Vista previa al compartir**: la imagen es `public/og-image.jpg` (1200×630, ~180 KB; WhatsApp falla con imágenes pesadas).
- **WhatsApp**: el formulario de contacto no tiene backend; arma un link `wa.me` con el número de `lib/site.ts`.

## Pendientes conocidos

- Sin CI, sin lint, tests solo de la galería.
- `styles/globals.css` y la mayoría de `components/ui` no se usan.

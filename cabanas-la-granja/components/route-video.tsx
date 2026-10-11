"use client"

import { useEffect, useRef, useState } from "react"
import { site } from "@/lib/site"

const { downtown } = site

/**
 * Video vertical con la ruta del complejo al centro (generado con video/ruta-al-centro).
 * Se reproduce en silencio solo mientras está en pantalla; con `prefers-reduced-motion`
 * no arranca solo y muestra los controles.
 */
export function RouteVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(reduce)
    if (reduce || !("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() puede rechazarse (ahorro de datos, políticas de autoplay): queda el póster
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.4 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className="mx-auto w-full max-w-[300px] lg:max-w-none">
      <div className="overflow-hidden rounded-2xl border bg-background">
        <video
          ref={ref}
          src="/ruta-al-centro.mp4"
          poster="/ruta-al-centro-poster.jpg"
          width={720}
          height={1280}
          muted
          loop
          playsInline
          preload="metadata"
          controls={reducedMotion}
          aria-label={`Animación del recorrido en auto desde ${site.name} hasta ${downtown.name}, en el centro de La Falda`}
          className="block aspect-[9/16] h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        {downtown.driveMinutes} min en auto ({downtown.km} km) o unos {downtown.walkMinutes} min caminando hasta{" "}
        {downtown.name}
      </figcaption>
    </figure>
  )
}

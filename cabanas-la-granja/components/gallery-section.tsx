"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; thumbnail: string }

export const mediaItems: MediaItem[] = [
  { type: "image", src: "/pileta_v7.jpeg", alt: "Pileta con reposeras y agapantos en flor" },
  {
    type: "video",
    src: "https://www.youtube-nocookie.com/embed/ahLPonA5rww?start=61&autoplay=1&rel=0",
    thumbnail: "https://img.youtube.com/vi/ahLPonA5rww/hqdefault.jpg",
    alt: "Recorrido en video por Cabañas la Granja",
  },
  { type: "image", src: "/cabaña_v7.jpeg", alt: "Cabaña con galería y jardín con flores" },
  { type: "image", src: "/interior_v1.jpeg", alt: "Dormitorio con camas individuales y techo de madera" },
  { type: "image", src: "/cochera+asador.jpeg", alt: "Cochera techada con asador individual" },
  { type: "image", src: "/plaza_v1.jpeg", alt: "Plaza de juegos para chicos en el parque" },
  { type: "image", src: "/interior_v2.jpeg", alt: "Dormitorio matrimonial con techo de madera" },
  { type: "image", src: "/cabaña_v6.jpeg", alt: "Cabaña de piedra y madera rodeada de verde" },
  { type: "image", src: "/pileta_v4.jpeg", alt: "Pileta al atardecer" },
  { type: "image", src: "/patio_v1.jpeg", alt: "Mesas de picnic bajo los árboles, junto a las canchas" },
  { type: "image", src: "/patio_v2.jpeg", alt: "Parque con vista abierta a las sierras" },
  { type: "image", src: "/cochera_v1.jpeg", alt: "Galería con pérgola y asador junto a la cabaña" },
  { type: "image", src: "/pileta_v6.jpeg", alt: "Pileta rodeada de césped y cabañas" },
  { type: "image", src: "/cabaña_v5.jpeg", alt: "Cabaña con galería y asador propio" },
  { type: "image", src: "/cabaña_v8.jpeg", alt: "Cabaña de dos plantas con quincho" },
  { type: "image", src: "/canchas.jpeg", alt: "Canchas deportivas del complejo" },
  { type: "image", src: "/patio_v3.jpeg", alt: "Parque arbolado con mesas y cabañas al fondo" },
  { type: "image", src: "/cabaña_v9.jpeg", alt: "Cabaña entre árboles en el parque" },
]

// Cantidad de piezas en el mosaico; el resto se ve en el visor
const VISIBLE = 8

const tileLayout = [
  "col-span-2 row-span-2 aspect-square md:aspect-auto",
  "col-span-2 aspect-video md:aspect-auto",
]

const SWIPE_DISTANCE = 50
const SWIPE_VELOCITY = 0.11

export function GallerySection() {
  // El índice se conserva al cerrar para que la animación de salida no quede vacía
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const swipe = useRef<{ x: number; t: number } | null>(null)

  const total = mediaItems.length
  const current = mediaItems[index]

  const openAt = (i: number) => {
    setIndex(i)
    setOpen(true)
  }

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1)
    if (event.key === "ArrowLeft") go(-1)
  }

  const onPointerDown = (event: React.PointerEvent) => {
    if (!event.isPrimary || swipe.current) return
    swipe.current = { x: event.clientX, t: event.timeStamp }
  }

  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipe.current
    swipe.current = null
    if (!start || !event.isPrimary) return
    const dx = event.clientX - start.x
    const velocity = Math.abs(dx) / Math.max(event.timeStamp - start.t, 1)
    if (Math.abs(dx) >= SWIPE_DISTANCE || (Math.abs(dx) > 10 && velocity > SWIPE_VELOCITY)) {
      go(dx < 0 ? 1 : -1)
    }
  }

  return (
    <section id="galeria" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Galería"
            title="Conocé el lugar"
            description="Las cabañas, las piletas y el parque, tal cual los vas a encontrar."
          />
          <button
            type="button"
            onClick={() => openAt(0)}
            data-reveal="up"
            className="self-start text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-primary md:self-auto"
          >
            Ver toda la galería
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,13rem))] md:gap-4 lg:grid-rows-[repeat(3,minmax(0,15rem))]">
          {mediaItems.slice(0, VISIBLE).map((item, i) => {
            const isLast = i === VISIBLE - 1
            const remaining = total - VISIBLE
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => openAt(i)}
                aria-label={isLast ? `${item.alt}. Ver ${remaining} más` : item.alt}
                data-reveal="clip"
                style={{ "--i": i } as React.CSSProperties}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-2xl bg-muted outline-offset-4 transition-transform duration-150 ease-out active:scale-[0.98] md:aspect-auto",
                  tileLayout[i],
                )}
              >
                <Image
                  src={item.type === "video" ? item.thumbnail : item.src}
                  alt=""
                  fill
                  sizes={i < 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
                />
                {item.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm">
                      <Play className="size-4 fill-current" aria-hidden />
                      Ver recorrido
                    </span>
                  </span>
                )}
                {isLast && remaining > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 font-display text-2xl text-white md:text-3xl">
                    +{remaining}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95 duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            onKeyDown={onKeyDown}
            className="fixed inset-0 z-50 flex flex-col text-white outline-none duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <p className="text-sm tabular-nums text-white/70" aria-live="polite">
                {`${index + 1} / ${total}`}
              </p>
              <Dialog.Close
                className="flex size-11 items-center justify-center rounded-full transition-[background-color,transform,translate,scale] duration-150 hover:bg-white/10 active:scale-[0.95]"
                aria-label="Cerrar galería"
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Title className="sr-only">Galería de fotos</Dialog.Title>
            <Dialog.Description className="sr-only">
              Usá las flechas del teclado o deslizá para pasar de foto.
            </Dialog.Description>

            <div
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 md:px-20"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
            >
              {current.type === "image" && (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  draggable={false}
                  className="max-h-full max-w-full select-none rounded-lg object-contain duration-300 animate-in fade-in-0"
                />
              )}
              {open && current.type === "video" && (
                <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black">
                  <iframe
                    src={current.src}
                    title={current.alt}
                    className="size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-[background-color,transform,translate,scale] duration-150 hover:bg-white/20 active:scale-[0.95] md:left-6 md:flex"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-[background-color,transform,translate,scale] duration-150 hover:bg-white/20 active:scale-[0.95] md:right-6 md:flex"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 px-4 pb-6 pt-4 md:pb-8">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="flex size-11 items-center justify-center rounded-full bg-white/10 active:scale-[0.95] md:hidden"
              >
                <ChevronLeft className="size-5" />
              </button>
              <p className="max-w-md text-center text-sm text-white/80">{current.alt}</p>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="flex size-11 items-center justify-center rounded-full bg-white/10 active:scale-[0.95] md:hidden"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}

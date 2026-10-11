import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  Armchair,
  Beef,
  Car,
  Dog,
  FerrisWheel,
  Flame,
  Martini,
  Mountain,
  Trees,
  Utensils,
  Volleyball,
  WavesLadder,
  Wifi,
} from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type Amenity = { icon: LucideIcon; title: string }

const inCabin: Amenity[] = [
  { icon: Utensils, title: "Cocina completamente equipada" },
  { icon: Wifi, title: "Wi-Fi" },
  { icon: Flame, title: "Calefacción" },
  { icon: Beef, title: "Parrilla individual" },
  { icon: Car, title: "Estacionamiento individual" },
]

const inComplex: Amenity[] = [
  { icon: WavesLadder, title: "Piletas" },
  { icon: Trees, title: "10.000 m² de parque cercado" },
  { icon: Mountain, title: "Vista a las sierras" },
  { icon: Volleyball, title: "Canchas" },
  { icon: FerrisWheel, title: "Plaza para los chicos" },
  { icon: Armchair, title: "Solárium" },
  { icon: Martini, title: "Bar y proveeduría" },
  { icon: Dog, title: "Pet friendly" },
]

const strip = [
  { src: "/pileta_v6.jpeg", alt: "Pileta rodeada de césped y cabañas" },
  { src: "/patio_v2.jpeg", alt: "Parque con vista abierta a las sierras" },
  { src: "/canchas.jpeg", alt: "Canchas deportivas del complejo" },
]

function AmenityList({ title, items, className }: { title: string; items: Amenity[]; className?: string }) {
  return (
    <div>
      <h3 data-reveal="up" className="mb-6 font-display text-2xl font-medium">
        {title}
      </h3>
      <ul className={cn("grid gap-x-8 sm:grid-cols-2", className)}>
        {items.map(({ icon: Icon, title }, index) => (
          <li
            key={title}
            data-reveal="up"
            style={{ "--i": index } as React.CSSProperties}
            className="flex items-center gap-4 border-t py-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <Icon className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="text-base">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AmenitiesSection() {
  return (
    <section id="servicios" className="bg-muted py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Comodidades"
          title="Todo lo que necesitás, sin perder el contacto con la naturaleza"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <AmenityList title="En tu cabaña" items={inCabin} className="lg:grid-cols-1" />
          <AmenityList title="En el complejo" items={inComplex} />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {strip.map((photo, index) => (
            <div
              key={photo.src}
              data-reveal="clip"
              style={{ "--i": index * 2 } as React.CSSProperties}
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-2xl bg-background",
                index === 2 && "hidden md:block",
              )}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

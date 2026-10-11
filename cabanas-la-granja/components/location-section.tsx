import { ArrowUpRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RouteVideo } from "@/components/route-video"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/lib/site"

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-muted py-24 md:py-32">
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Ubicación"
            title="En el corazón de La Falda"
            description="Cerca de todo, pero lejos del ruido. Un punto de partida ideal para recorrer el Valle de Punilla."
          />
          <div data-reveal="up" style={{ "--i": 3 } as React.CSSProperties} className="mt-8 flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
            <p className="text-base">{site.address}</p>
          </div>
          <Button
            asChild
            data-reveal="up"
            style={{ "--i": 4 } as React.CSSProperties}
            className="mt-8 h-11 rounded-full px-6"
          >
            <a href={site.mapsDirections} target="_blank" rel="noopener noreferrer">
              Cómo llegar
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>

        <div data-reveal="clip" className="overflow-hidden rounded-2xl border bg-background lg:col-span-5">
          <iframe
            title={`Mapa de ${site.name} en Google Maps`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.329911659574!2d-64.4724555!3d-31.1005613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d825a05fd37ad%3A0x9407684a1ea4063f!2sCaba%C3%B1as%20La%20Granja!5e0!3m2!1ses!2sar!4v1764698715617!5m2!1ses!2sar"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[380px] w-full border-0 md:h-[480px]"
          />
        </div>

        <div data-reveal="up" style={{ "--i": 2 } as React.CSSProperties} className="lg:col-span-3">
          <RouteVideo />
        </div>
      </div>
    </section>
  )
}

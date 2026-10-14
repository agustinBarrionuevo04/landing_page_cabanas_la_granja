import Image from "next/image"
import { Button } from "@/components/ui/button"
import { whatsappUrl } from "@/lib/site"

const HERO_MESSAGE = "Hola! Me interesa hacer una reserva en Cabañas la Granja."

export function HeroSection() {
  // min-h + padding superior: si el contenido no entra (pantallas bajas), el hero crece hacia abajo
  // en vez de meterse debajo del header fijo
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-end overflow-hidden bg-primary pt-[calc(var(--header-height)+2rem)]"
    >
      <div className="hero-media absolute inset-0">
        <Image
          src="/fondo_principal.jpeg"
          alt="Piletas de Cabañas la Granja rodeadas de parque y cabañas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Degradé desde abajo para leer el texto sin apagar toda la foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/40 md:via-black/25" />
      <div className="hero-shade absolute inset-0 bg-black opacity-0" />

      <div className="hero-content relative z-10 container mx-auto px-4 pb-28 text-white md:pb-24">
        <p
          className="hero-in mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          La Falda · Sierras de Córdoba
        </p>
        <h1
          className="hero-in max-w-4xl font-display text-[clamp(3rem,min(9vw,11svh),6rem)] font-medium leading-[0.98] tracking-[-0.01em]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Viví la tranquilidad de las sierras
        </h1>
        <p
          className="hero-in mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Cabañas con piletas, 10.000 m² de parque y vista a las sierras, para reconectar con la naturaleza en
          familia, en pareja o con amigos.
        </p>
        <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--i": 3 } as React.CSSProperties}>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-secondary px-8 text-base text-secondary-foreground hover:bg-secondary/90"
          >
            <a href={whatsappUrl(HERO_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Reservá por WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            <a href="#galeria">Ver las cabañas</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

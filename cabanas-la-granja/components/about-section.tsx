import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"

const stats = [
  { value: "+20", label: "años recibiendo huéspedes" },
  { value: "+50 mil", label: "huéspedes que nos eligieron" },
  { value: "10.000 m²", label: "de parque cercado" },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-14 px-4 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6 lg:col-span-5">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/cabaña_v3.jpeg"
              alt="Cabaña de dos plantas con balcón de madera y jardín"
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow="Nuestra historia"
            title="Donde las sierras cordobesas te esperan"
          />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p data-reveal="up" style={{ "--i": 2 } as React.CSSProperties}>
              Hace más de 20 años que abrimos nuestras puertas para recibir a quienes buscan desconectarse y disfrutar
              de la tranquilidad de las sierras. Familias, parejas y grupos encuentran acá el lugar para compartir
              momentos únicos, rodeados de naturaleza y paz.
            </p>
            <p data-reveal="up" style={{ "--i": 3 } as React.CSSProperties}>
              Tenemos amplios parques y un ambiente ideal para celebraciones y encuentros. Sumale la magia de La
              Falda y cada estadía se transforma en una experiencia que siempre invita a volver.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t pt-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal="up"
                style={{ "--i": index + 3 } as React.CSSProperties}
                className="flex flex-col-reverse"
              >
                <dt className="mt-1 text-sm leading-snug text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-2xl font-medium tracking-tight text-primary sm:text-3xl md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

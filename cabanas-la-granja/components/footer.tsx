import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import { navLinks, site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="" width={61} height={36} className="h-9 w-auto invert" />
              <div>
                <p className="font-display text-xl font-medium">{site.name}</p>
                <p className="text-sm text-primary-foreground/70">{site.city}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Tu refugio en las sierras cordobesas, donde la tranquilidad y el confort se encuentran con la naturaleza.
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Contacto</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 opacity-70" aria-hidden />
                <a href={site.mapsDirections} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 opacity-70" aria-hidden />
                <a href={site.phones[0].href} className="hover:underline">
                  {site.phones[0].label}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 opacity-70" aria-hidden />
                <a href={`mailto:${site.email}`} className="break-all hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="size-4 shrink-0 opacity-70" aria-hidden />
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">Secciones</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-primary-foreground/80 hover:text-primary-foreground">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/60">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

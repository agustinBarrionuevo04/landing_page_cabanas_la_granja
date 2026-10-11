"use client"

import { useEffect, useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navLinks, site, whatsappUrl } from "@/lib/site"

const RESERVE_MESSAGE = "Hola! Quiero consultar disponibilidad en Cabañas la Granja."

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  // Destino pendiente: se navega recién cuando el menú terminó de cerrarse y liberó el scroll
  const pendingTarget = useRef<string | null>(null)

  // Transparente sobre el hero, sólido al bajar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Sección activa en el menú
  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--header-height)] border-b transition-[background-color,border-color,color] duration-300 ease-out",
        solid
          ? "border-border bg-background/85 text-foreground backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent text-white",
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between gap-6 px-4">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${site.name}, ir al inicio`}>
          <img
            src="/logo-mark.png"
            alt=""
            width={56}
            height={33}
            className={cn("h-8 w-auto transition-[filter] duration-300", !solid && "invert")}
          />
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-display text-lg font-medium">{site.name}</span>
            <span className={cn("block text-xs", solid ? "text-muted-foreground" : "text-white/75")}>{site.city}</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeId === id ? "true" : undefined}
              className={cn(
                "relative rounded-full px-3 py-2 text-sm transition-opacity duration-150 hover:opacity-100",
                activeId === id ? "opacity-100" : "opacity-75",
              )}
            >
              {label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ease-[var(--ease-out-strong)]",
                  activeId === id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full bg-secondary px-5 sm:inline-flex text-secondary-foreground hover:bg-secondary/90">
            <a href={whatsappUrl(RESERVE_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Reservar
            </a>
          </Button>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              className="flex size-10 items-center justify-center rounded-full transition-[background-color,scale] duration-150 hover:bg-current/10 active:scale-[0.95] lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content
                onCloseAutoFocus={(event) => {
                  const target = pendingTarget.current
                  if (!target) return
                  event.preventDefault()
                  pendingTarget.current = null
                  document.getElementById(target)?.scrollIntoView()
                  history.replaceState(null, "", `#${target}`)
                }}
                className="fixed inset-x-3 top-3 z-50 rounded-2xl border bg-background p-6 shadow-xl duration-200 ease-[var(--ease-out-strong)] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 origin-top">
                <div className="mb-6 flex items-center justify-between">
                  <Dialog.Title className="font-display text-lg font-medium">{site.name}</Dialog.Title>
                  <Dialog.Close
                    className="flex size-10 items-center justify-center rounded-full transition-[background-color,scale] duration-150 hover:bg-accent active:scale-[0.95]"
                    aria-label="Cerrar menú"
                  >
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Secciones de la página</Dialog.Description>
                <nav aria-label="Móvil" className="flex flex-col">
                  {navLinks.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        pendingTarget.current = id
                        setMenuOpen(false)
                      }}
                      className="border-b py-4 font-display text-2xl last:border-b-0"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <Button
                  asChild
                  className="mt-4 h-12 w-full rounded-full bg-secondary text-base text-secondary-foreground hover:bg-secondary/90"
                >
                  <a href={whatsappUrl(RESERVE_MESSAGE)} target="_blank" rel="noopener noreferrer">
                    Reservar por WhatsApp
                  </a>
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Clock, Instagram, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading } from "@/components/section-heading"
import { site, whatsappUrl } from "@/lib/site"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola! Me interesa hacer una reserva en Cabañas la Granja.

Nombre: ${formData.name}
Consulta: ${formData.message}`

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const channels = [
    {
      icon: Phone,
      title: "Teléfonos",
      content: (
        <span className="flex flex-col">
          {site.phones.map((phone) => (
            <a key={phone.href} href={phone.href} className="hover:text-primary">
              {phone.label}
            </a>
          ))}
        </span>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a href={`mailto:${site.email}`} className="break-all hover:text-primary">
          {site.email}
        </a>
      ),
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: (
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
          {site.instagramHandle}
        </a>
      ),
    },
    { icon: Clock, title: "Horarios de atención", content: site.hours },
  ]

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Contacto y reservas"
            title="¿Listo para tu próxima escapada?"
            description="Escribinos para reservar o para cualquier consulta. Te respondemos por WhatsApp."
          />

          <dl className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ icon: Icon, title, content }, index) => (
              <div
                key={title}
                data-reveal="up"
                style={{ "--i": index } as React.CSSProperties}
                className="flex gap-4 border-t py-5"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
                <div>
                  <dt className="text-sm text-muted-foreground">{title}</dt>
                  <dd className="mt-1 text-base">{content}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal="up" className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm md:p-10">
            <h3 className="font-display text-2xl font-medium">Envianos tu consulta</h3>
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nombre</Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Tu nombre y apellido"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-background text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Consulta</Label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Contanos sobre tu estadía ideal: fechas, cantidad de personas, si venís con mascota…"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-36 bg-background text-base"
              />
            </div>
            <Button type="submit" className="h-12 w-full rounded-full text-base">
              Enviar consulta por WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

import { describe, expect, it } from "vitest"

import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { site } from "@/lib/site"
import { lodgingBusinessJsonLd } from "@/lib/structured-data"

const CANONICAL = "https://www.xn--cabaaslagranja-tnb.com"

describe("SEO", () => {
  it("usa el dominio canónico con www", () => {
    expect(site.url).toBe(CANONICAL)
  })

  it("robots permite rastrear y apunta al sitemap", () => {
    const result = robots()
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" })
    expect(result.sitemap).toBe(`${CANONICAL}/sitemap.xml`)
  })

  it("el sitemap tiene exactamente la URL canónica", () => {
    const entries = sitemap()
    expect(entries.map((entry) => entry.url)).toEqual([`${CANONICAL}/`])
  })

  it("el JSON-LD describe el complejo con los mismos datos de contacto", () => {
    const data = lodgingBusinessJsonLd()

    expect(data["@type"]).toBe("LodgingBusiness")
    expect(data.url).toBe(`${CANONICAL}/`)
    expect(data.telephone).toBe("+5493548526883")
    expect(data.email).toBe(site.email)
    expect(data.address).toMatchObject({
      streetAddress: "Av. Teresa M. de Ferrarini 1100",
      addressLocality: "La Falda",
      postalCode: "X5172",
      addressCountry: "AR",
    })
    expect(data.geo).toMatchObject({ latitude: -31.1005613, longitude: -64.4724555 })
    expect(data.sameAs).toContain(site.instagram)
    expect(data.amenityFeature.length).toBeGreaterThan(0)
  })

  it("la dirección visible coincide con la del JSON-LD", () => {
    expect(site.address.startsWith(site.streetAddress)).toBe(true)
  })
})

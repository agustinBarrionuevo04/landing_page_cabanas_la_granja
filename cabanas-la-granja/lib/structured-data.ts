import { site } from "@/lib/site"

/** JSON-LD del complejo para que Google entienda qué es, dónde está y cómo contactarlo. */
export function lodgingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${site.url}/#lodging`,
    name: site.name,
    description:
      "Complejo de cabañas en La Falda, Córdoba, con piletas, 10.000 m² de parque cercado y vista a las sierras.",
    url: `${site.url}/`,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/logo-mark.png`,
    telephone: site.phones[0].href.replace("tel:", ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.streetAddress,
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapsUrl,
    sameAs: [site.instagram, site.mapsUrl],
    petsAllowed: true,
    amenityFeature: site.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  }
}

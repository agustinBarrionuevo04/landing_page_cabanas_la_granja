export const site = {
  name: "Cabañas la Granja",
  // Dominio canónico (cabañaslagranja.com en punycode, con www porque el resto redirige ahí)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.xn--cabaaslagranja-tnb.com",
  city: "La Falda, Córdoba",
  // Igual que en la ficha de Google Maps
  address: "Av. Teresa M. de Ferrarini 1100, La Falda, Córdoba",
  streetAddress: "Av. Teresa M. de Ferrarini 1100",
  locality: "La Falda",
  region: "Córdoba",
  postalCode: "X5172",
  country: "AR",
  geo: { latitude: -31.1005613, longitude: -64.4724555 },
  mapsUrl: "https://maps.google.com/?cid=10666608910001243711",
  email: "cabana-lagranja@hotmail.com",
  phones: [
    { label: "+54 9 3548 52-6883", href: "tel:+5493548526883" },
    { label: "+54 9 3548 57-1607", href: "tel:+5493548571607" },
  ],
  whatsappNumber: "5493548526883",
  instagram: "https://www.instagram.com/cabanas_lagranja/",
  instagramHandle: "@cabanas_lagranja",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Caba%C3%B1as%20La%20Granja%2C%20La%20Falda%2C%20C%C3%B3rdoba",
  hours: "Lunes a domingo, de 8 a 22 h",
  // Para los datos estructurados; los textos visibles viven en amenities-section.tsx
  amenities: [
    "Cocina completamente equipada",
    "Wi-Fi",
    "Calefacción",
    "Parrilla individual",
    "Estacionamiento individual",
    "Piletas",
    "10.000 m² de parque cercado",
    "Canchas",
    "Plaza para los chicos",
    "Solárium",
    "Bar y proveeduría",
  ],
}

export const navLinks = [
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "galeria", label: "Galería" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
]

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const site = {
  name: "Cabañas la Granja",
  city: "La Falda, Córdoba",
  address: "Av. Ferrarini al 1100, La Falda, Córdoba",
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

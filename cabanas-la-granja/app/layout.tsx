import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RevealObserver } from "@/components/reveal-observer"
import { site } from "@/lib/site"
import { lodgingBusinessJsonLd } from "@/lib/structured-data"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
})

const title = "Cabañas la Granja · La Falda, Córdoba"
const shareDescription = "Cabañas con piletas, 10.000 m² de parque y vista a las sierras en La Falda, Córdoba."
const shareImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Piletas de Cabañas la Granja rodeadas de parque y cabañas",
}

export const metadata: Metadata = {
  // Las vistas previas de WhatsApp/Instagram y el canonical necesitan URLs absolutas
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title,
  description:
    "Cabañas en La Falda, Córdoba, con piletas, 10.000 m² de parque y vista a las sierras. El lugar para desconectar en familia, en pareja o con amigos.",
  icons: { icon: "/logo_80x80.png" },
  openGraph: {
    title,
    description: shareDescription,
    url: "/",
    siteName: "Cabañas la Granja",
    images: [shareImage],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: shareDescription,
    images: [shareImage],
  },
}

export const viewport: Viewport = {
  themeColor: "#f7f3ea",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        {/* Marca que hay JS antes de pintar, para que el revelado al scrollear no parpadee */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd()).replace(/</g, "\\u003c") }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  )
}

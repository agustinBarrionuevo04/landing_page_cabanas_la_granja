import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RevealObserver } from "@/components/reveal-observer"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cabañas la Granja · La Falda, Córdoba",
  description:
    "Cabañas en La Falda, Córdoba, con piletas, 10.000 m² de parque y vista a las sierras. El lugar para desconectar en familia, en pareja o con amigos.",
  icons: { icon: "/logo_80x80.png" },
  openGraph: {
    title: "Cabañas la Granja · La Falda, Córdoba",
    description: "Cabañas con piletas, parque y vista a las sierras en La Falda, Córdoba.",
    images: ["/fondo_principal.jpeg"],
    locale: "es_AR",
    type: "website",
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
        <Suspense fallback={null}>{children}</Suspense>
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  )
}

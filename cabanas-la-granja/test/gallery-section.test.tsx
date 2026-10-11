import { render, screen, fireEvent, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { GallerySection, mediaItems } from "@/components/gallery-section"

const VIDEO_ALT = "Recorrido en video por Cabañas la Granja"
const FIRST_ALT = mediaItems[0].alt

describe("GallerySection", () => {
  it("muestra el mosaico sin cargar el video", () => {
    render(<GallerySection />)

    expect(screen.getByRole("button", { name: FIRST_ALT })).toBeInTheDocument()
    expect(screen.queryByTitle(VIDEO_ALT)).not.toBeInTheDocument()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("ya no incluye la sala de juegos", () => {
    expect(mediaItems.some((item) => item.src.includes("sala_de_juegos"))).toBe(false)
  })

  it("abre el visor en la foto elegida y navega con el teclado", () => {
    render(<GallerySection />)

    fireEvent.click(screen.getByRole("button", { name: FIRST_ALT }))
    const dialog = screen.getByRole("dialog")
    expect(within(dialog).getByText(`1 / ${mediaItems.length}`)).toBeInTheDocument()
    expect(within(dialog).getByRole("img", { name: FIRST_ALT })).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: "ArrowLeft" })
    expect(within(dialog).getByText(`${mediaItems.length} / ${mediaItems.length}`)).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: "ArrowRight" })
    fireEvent.keyDown(dialog, { key: "ArrowRight" })
    expect(within(dialog).getByText(`2 / ${mediaItems.length}`)).toBeInTheDocument()
    expect(within(dialog).getByTitle(VIDEO_ALT)).toBeInTheDocument()
  })

  it("carga el video solo al tocar su miniatura", () => {
    render(<GallerySection />)

    fireEvent.click(screen.getByRole("button", { name: VIDEO_ALT }))

    expect(screen.getByTitle(VIDEO_ALT)).toBeInTheDocument()
  })

  it("la última pieza del mosaico indica cuántas fotos quedan", () => {
    render(<GallerySection />)

    const remaining = mediaItems.length - 8
    expect(screen.getByRole("button", { name: new RegExp(`Ver ${remaining} más`) })).toBeInTheDocument()
  })
})

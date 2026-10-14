import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { RouteVideo } from "@/components/route-video"
import { site } from "@/lib/site"

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce"), media: query }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("RouteVideo", () => {
  it("muestra el video en silencio, con póster y la ruta en texto", () => {
    mockReducedMotion(false)
    render(<RouteVideo />)

    const video = screen.getByLabelText(/Animación del recorrido/) as HTMLVideoElement
    expect(video).toHaveAttribute("src", "/ruta-al-centro.mp4")
    expect(video).toHaveAttribute("poster", "/ruta-al-centro-poster.jpg")
    expect(video.muted).toBe(true)
    expect(video).not.toHaveAttribute("autoplay")
    expect(video).not.toHaveAttribute("controls")
    expect(
      screen.getByText(new RegExp(`${site.downtown.driveMinutes} min en auto \\(${site.downtown.km} km\\)`)),
    ).toBeInTheDocument()
  })

  it("con movimiento reducido muestra los controles en vez de reproducirse solo", () => {
    mockReducedMotion(true)
    render(<RouteVideo />)

    expect(screen.getByLabelText(/Animación del recorrido/)).toHaveAttribute("controls")
  })
})

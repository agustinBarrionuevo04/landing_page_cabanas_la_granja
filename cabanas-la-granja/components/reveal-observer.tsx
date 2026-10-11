"use client"

import { useEffect } from "react"

/**
 * Marca con `data-revealed` cada elemento `[data-reveal]` la primera vez que
 * entra en pantalla. Los estilos viven en globals.css.
 */
export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-revealed", ""))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

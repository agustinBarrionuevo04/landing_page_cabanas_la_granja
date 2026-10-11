import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p data-reveal="up" className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        {eyebrow}
      </p>
      <h2
        data-reveal="up"
        style={{ "--i": 1 } as React.CSSProperties}
        className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.005em] text-foreground md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal="up"
          style={{ "--i": 2 } as React.CSSProperties}
          className="mt-5 text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </p>
      )}
    </div>
  )
}

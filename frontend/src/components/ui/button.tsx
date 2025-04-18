import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button-variants"

import { cn } from "@/lib/utils"

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ariaLabel?: string
    ariaDescribedBy?: string
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      aria-label={props.ariaLabel}
      aria-describedby={props.ariaDescribedBy}
      {...props}
    />
  )
}

export { Button }

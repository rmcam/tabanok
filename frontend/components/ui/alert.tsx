import * as React from "react"
import { cn } from "@/lib/utils"

import { CheckCircledIcon, InformationCircledIcon, WarningCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"

const alertVariants = {
  default: "bg-background text-foreground",
  destructive:
    "border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
  info: "border-blue-500/50 dark:border-blue-500 [&>svg]:text-blue-500 text-blue-500",
  success: "border-green-500/50 dark:border-green-500 [&>svg]:text-green-500 text-green-500",
}

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg]:h-4 [&>svg]:w-4",
        alertVariants[variant] || alertVariants.default,
        className
      )}
      ref={ref}
      {...props}
    >
      <CheckCircledIcon />
    </div>
  )
})
Alert.displayName = "Alert"

export { Alert }

import * as React from "react"
import { cn } from "@/utils/cn"

export function Loader({ className, size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div 
        className={cn(
          "animate-spin rounded-full border-4 border-solid border-primary border-t-transparent",
          sizeClasses[size],
          className
        )}
      ></div>
    </div>
  )
}

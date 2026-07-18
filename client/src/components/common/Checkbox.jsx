import * as React from "react"
import { cn } from "@/utils/cn"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, onChange, ...props }, ref) => (
  <div className="relative flex items-center">
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      className={cn(
        "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground transition-all",
        className
      )}
      {...props}
    />
    <Check className={cn(
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-primary-foreground pointer-events-none opacity-0 transition-opacity",
      checked && "opacity-100"
    )} />
  </div>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }

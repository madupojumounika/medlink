import * as React from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "./Button"

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-destructive/20 rounded-lg bg-destructive/5">
      <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4 text-destructive">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-destructive">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}

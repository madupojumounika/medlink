import * as React from "react"
import { cn } from "@/utils/cn"
import { X } from "lucide-react"
import { Button } from "./Button"

export function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg sm:rounded-lg animate-in fade-in zoom-in-95">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-6 w-6 rounded-sm opacity-70 transition-opacity hover:opacity-100" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="py-2">
          {children}
        </div>
        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

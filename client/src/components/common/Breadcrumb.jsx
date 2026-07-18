import * as React from "react"
import { ChevronRight } from "lucide-react"

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <a href={item.href || "#"} className="hover:text-foreground transition-colors">
            {item.label}
          </a>
          {index < items.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

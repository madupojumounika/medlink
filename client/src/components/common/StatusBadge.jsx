import React from 'react';
import { cn } from '@/utils/cn';

const statusStyles = {
  critical: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  stable: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  en_route: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  occupied: "bg-muted text-muted-foreground border-border",
  default: "bg-muted text-muted-foreground border-border"
};

export function StatusBadge({ status, children, className }) {
  const normalizedStatus = status?.toLowerCase().replace(' ', '_') || 'default';
  const style = statusStyles[normalizedStatus] || statusStyles.default;

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm", style, className)}>
      {children || status}
    </span>
  );
}

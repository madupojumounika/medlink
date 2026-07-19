import React from 'react';
import { Card, CardContent } from './Card';

export function MetricCard({ title, value, description, icon: Icon, trend }) {
  return (
    <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
          </div>
          {Icon && (
            <div className="p-3 bg-slate-800/80 rounded-xl border border-white/5">
              <Icon className="w-5 h-5 text-cyan-400" />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          {trend && (
            <span className={`text-xs font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
          {description && (
            <span className="text-xs text-slate-500">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

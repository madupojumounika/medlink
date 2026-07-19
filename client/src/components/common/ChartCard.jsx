import React from 'react';
import { Card, CardContent } from './Card';
import { ResponsiveContainer } from 'recharts';

export function ChartCard({ title, description, children, className }) {
  return (
    <Card className={`bg-slate-900/50 border-white/5 backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

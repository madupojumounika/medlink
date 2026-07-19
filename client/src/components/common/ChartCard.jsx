import React from 'react';
import { Card, CardContent } from './Card';
import { ResponsiveContainer } from 'recharts';

export function ChartCard({ title, description, children, className }) {
  return (
    <Card className={`bg-card border-border shadow-sm ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
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

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Ambulance() {
  return (
    <div className="w-full">
      <PageHeader title="Ambulance Dashboard" description="Manage your Ambulance operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Ambulance content skeleton</p>
      </div>
    </div>
  );
}

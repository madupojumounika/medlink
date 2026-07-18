import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Hospital() {
  return (
    <div className="w-full">
      <PageHeader title="Hospital Dashboard" description="Manage your Hospital operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Hospital content skeleton</p>
      </div>
    </div>
  );
}

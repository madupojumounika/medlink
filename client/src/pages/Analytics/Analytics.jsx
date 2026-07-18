import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Analytics() {
  return (
    <div className="w-full">
      <PageHeader title="Analytics Dashboard" description="Manage your Analytics operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Analytics content skeleton</p>
      </div>
    </div>
  );
}

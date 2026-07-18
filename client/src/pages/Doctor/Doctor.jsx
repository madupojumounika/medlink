import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Doctor() {
  return (
    <div className="w-full">
      <PageHeader title="Doctor Dashboard" description="Manage your Doctor operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Doctor content skeleton</p>
      </div>
    </div>
  );
}

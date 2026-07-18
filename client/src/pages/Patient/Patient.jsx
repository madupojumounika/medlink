import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Patient() {
  return (
    <div className="w-full">
      <PageHeader title="Patient Dashboard" description="Manage your Patient operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Patient content skeleton</p>
      </div>
    </div>
  );
}

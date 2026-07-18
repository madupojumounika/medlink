import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';

export default function Settings() {
  return (
    <div className="w-full">
      <PageHeader title="Settings Dashboard" description="Manage your Settings operations." />
      <div className="flex items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Settings content skeleton</p>
      </div>
    </div>
  );
}

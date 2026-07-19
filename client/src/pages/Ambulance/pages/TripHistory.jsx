import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

const tripHistory = [
  { id: 'TRP-098', date: 'Oct 24, 2026', patient: 'Michael Scott', from: 'Dunder Mifflin', to: 'City Clinic', duration: '14 mins', status: 'Completed' },
  { id: 'TRP-097', date: 'Oct 23, 2026', patient: 'Jim Halpert', from: 'Highway 1', to: 'Northside Hospital', duration: '22 mins', status: 'Completed' },
  { id: 'TRP-096', date: 'Oct 21, 2026', patient: 'Dwight Schrute', from: 'Schrute Farms', to: 'East Medical', duration: '35 mins', status: 'Completed' },
  { id: 'TRP-095', date: 'Oct 20, 2026', patient: 'Unknown', from: 'Downtown', to: 'Central General', duration: '8 mins', status: 'Canceled' },
];

export default function TripHistory() {
  const columns = [
    { header: 'Trip ID', accessorKey: 'id' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Pickup', accessorKey: 'from' },
    { header: 'Dropoff', accessorKey: 'to' },
    { header: 'Duration', accessorKey: 'duration' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Completed' ? 'available' : 'occupied'}>{row.status}</StatusBadge>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Trip History" description="Log of all completed and canceled emergency dispatches." />
        <Button variant="outline" className="gap-2 text-slate-300">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={tripHistory} placeholder="Search by Trip ID, Date, or Location..." />
      </motion.div>
    </div>
  );
}

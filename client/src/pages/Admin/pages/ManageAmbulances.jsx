import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const ambulances = [
  { id: 'AMB-044', type: 'ALS (Advanced)', operator: 'Metro EMS', plate: 'XYZ-1234', lastMaintenance: 'Oct 01, 2026', status: 'Active' },
  { id: 'AMB-045', type: 'BLS (Basic)', operator: 'Northside Rescue', plate: 'ABC-9876', lastMaintenance: 'Sep 15, 2026', status: 'Active' },
  { id: 'AMB-046', type: 'Neonatal', operator: 'Metro EMS', plate: 'NNC-5542', lastMaintenance: 'Jun 22, 2026', status: 'Maintenance Required' },
];

export default function ManageAmbulances() {
  const columns = [
    { header: 'Unit ID', accessorKey: 'id' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Operator/Agency', accessorKey: 'operator' },
    { header: 'License Plate', accessorKey: 'plate', cell: (row) => <span className="font-mono text-slate-400 text-sm">{row.plate}</span> },
    { header: 'Last Maintenance', accessorKey: 'lastMaintenance' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Active' ? 'available' : 'critical'}>{row.status}</StatusBadge>
    )},
    { header: 'Action', cell: () => <Button size="sm" variant="outline">Edit Unit</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Ambulance Fleet" description="Monitor registered vehicles, types, and maintenance schedules." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={ambulances} placeholder="Search by Unit ID or Plate..." />
      </motion.div>
    </div>
  );
}

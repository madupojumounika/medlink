import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const initialBeds = [
  { id: 'ICU-101', type: 'Trauma ICU', status: 'Occupied', patient: 'PT-892', admitted: '2 hrs ago' },
  { id: 'ICU-102', type: 'Trauma ICU', status: 'Available', patient: '-', admitted: '-' },
  { id: 'ICU-103', type: 'Neuro ICU', status: 'Cleaning', patient: '-', admitted: '-' },
  { id: 'ICU-104', type: 'Cardiac ICU', status: 'Occupied', patient: 'PT-104', admitted: '12 hrs ago' },
  { id: 'ICU-105', type: 'Pediatric ICU', status: 'Available', patient: '-', admitted: '-' },
];

export default function ICUAvailability() {
  const [beds, setBeds] = useState(initialBeds);

  const columns = [
    { header: 'Bed ID', accessorKey: 'id' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Available' ? 'available' : row.status === 'Occupied' ? 'critical' : 'pending'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'Current Patient', accessorKey: 'patient' },
    { header: 'Admitted', accessorKey: 'admitted' },
    { header: 'Action', cell: () => <Button variant="outline" size="sm">Manage</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="ICU & Bed Availability" description="Real-time management of critical care beds." />
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Bed
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">Available ICU Beds</p>
          <h3 className="text-3xl font-bold text-emerald-400">12</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">Occupied Beds</p>
          <h3 className="text-3xl font-bold text-rose-400">31</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">In Maintenance/Cleaning</p>
          <h3 className="text-3xl font-bold text-amber-400">2</h3>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable columns={columns} data={beds} placeholder="Search beds..." />
      </motion.div>
    </div>
  );
}

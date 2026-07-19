import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  { id: 'VEN-01', name: 'Standard Ventilator', type: 'Ventilator', count: 15, inUse: 12, status: 'Active' },
  { id: 'VEN-02', name: 'Transport Ventilator', type: 'Ventilator', count: 5, inUse: 2, status: 'Active' },
  { id: 'DEF-01', name: 'Defibrillator', type: 'Cardiac', count: 20, inUse: 4, status: 'Active' },
  { id: 'DIA-01', name: 'Dialysis Machine', type: 'Nephrology', count: 8, inUse: 8, status: 'Critical Shortage' },
  { id: 'MRI-01', name: 'MRI Scanner', type: 'Imaging', count: 2, inUse: 1, status: 'Active' },
];

export default function ResourceManagement() {
  const columns = [
    { header: 'Resource ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Total', accessorKey: 'count' },
    { header: 'In Use', accessorKey: 'inUse' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Active' ? 'available' : 'critical'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'Action', cell: () => <Button variant="outline" size="sm">Update</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Resource Management" description="Track life-saving equipment availability." />
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Equipment
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable columns={columns} data={resources} placeholder="Search equipment..." />
      </motion.div>
    </div>
  );
}

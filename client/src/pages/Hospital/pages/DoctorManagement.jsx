import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const doctors = [
  { id: 'DR-1042', name: 'Dr. Sarah Jenkins', specialty: 'Trauma Surgery', status: 'On Shift', patients: 3 },
  { id: 'DR-1043', name: 'Dr. Marcus Webb', specialty: 'Cardiology', status: 'In Surgery', patients: 1 },
  { id: 'DR-1044', name: 'Dr. Elena Rostova', specialty: 'Neurology', status: 'Off Shift', patients: 0 },
  { id: 'DR-1045', name: 'Dr. James Chen', specialty: 'ER Attending', status: 'On Shift', patients: 5 },
];

export default function DoctorManagement() {
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Name', accessorKey: 'name' },
    { header: 'Specialty', accessorKey: 'specialty' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'On Shift' ? 'available' : row.status === 'In Surgery' ? 'pending' : 'occupied'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'Active Patients', accessorKey: 'patients' },
    { header: 'Action', cell: () => <Button variant="outline" size="sm">View Profile</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Doctor Management" description="Manage hospital staff and their current availability." />
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Doctor
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable columns={columns} data={doctors} placeholder="Search doctors..." />
      </motion.div>
    </div>
  );
}

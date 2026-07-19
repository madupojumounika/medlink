import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const hospitals = [
  { id: 'HOS-001', name: 'Central General Hospital', type: 'Level 1 Trauma', location: 'Metro City', status: 'Active', integrated: 'Yes' },
  { id: 'HOS-002', name: 'Northside Clinic', type: 'Urgent Care', location: 'North District', status: 'Pending Approval', integrated: 'No' },
  { id: 'HOS-003', name: 'East Medical Center', type: 'General', location: 'Eastside', status: 'Active', integrated: 'Yes' },
  { id: 'HOS-004', name: 'St. Jude Cardiac', type: 'Specialty', location: 'Downtown', status: 'Suspended', integrated: 'No' },
];

export default function ManageHospitals() {
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Hospital Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Active' ? 'available' : row.status === 'Pending Approval' ? 'pending' : 'critical'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'EHR Linked', accessorKey: 'integrated', cell: (row) => <span className={row.integrated === 'Yes' ? 'text-emerald-400' : 'text-slate-500'}>{row.integrated}</span> },
    { header: 'Action', cell: () => <Button size="sm" variant="outline">Manage</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Hospital Management" description="Onboard, verify, and manage healthcare facilities in the network." />
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"><Plus className="w-4 h-4"/> Add Hospital</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={hospitals} placeholder="Search hospitals by name, ID, or location..." />
      </motion.div>
    </div>
  );
}

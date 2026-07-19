import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const doctors = [
  { id: 'DR-9921', name: 'Sarah Jenkins', specialization: 'Trauma', hospital: 'Central General', license: 'MD-88124', status: 'Verified' },
  { id: 'DR-9922', name: 'Marcus Webb', specialization: 'Cardiology', hospital: 'St. Jude Cardiac', license: 'MD-88125', status: 'Pending Review' },
  { id: 'DR-9923', name: 'Elena Rostova', specialization: 'Neurology', hospital: 'Northside Clinic', license: 'MD-88126', status: 'Verified' },
];

export default function ManageDoctors() {
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Doctor Name', accessorKey: 'name' },
    { header: 'Specialization', accessorKey: 'specialization' },
    { header: 'Affiliated Hospital', accessorKey: 'hospital' },
    { header: 'License No.', accessorKey: 'license', cell: (row) => <span className="font-mono text-slate-400 text-sm">{row.license}</span> },
    { header: 'Verification', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Verified' ? 'available' : 'pending'}>{row.status}</StatusBadge>
    )},
    { header: 'Action', cell: () => <Button size="sm" variant="outline">View Docs</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Doctor Management" description="Review licenses and verify medical professionals." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={doctors} placeholder="Search doctors by name or license..." />
      </motion.div>
    </div>
  );
}

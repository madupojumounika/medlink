import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const patients = [
  { id: 'PT-1092', name: 'James Wilson', hospital: 'Central General', severity: 'High', doctor: 'Dr. Sarah Jenkins', referralStatus: 'Accepted', date: 'Oct 24, 2026' },
  { id: 'PT-1093', name: 'Maria Garcia', hospital: 'Northside Trauma', severity: 'Critical', doctor: 'Dr. Marcus Webb', referralStatus: 'Transferred', date: 'Oct 24, 2026' },
  { id: 'PT-1094', name: 'Robert Chen', hospital: 'St. Jude Cardiac', severity: 'Critical', doctor: 'Dr. Elena Rostova', referralStatus: 'Pending', date: 'Oct 24, 2026' },
];

export default function ManagePatients() {
  const columns = [
    { header: 'Patient ID', accessorKey: 'id' },
    { header: 'Patient Name', accessorKey: 'name' },
    { header: 'Current Hospital', accessorKey: 'hospital' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => (
      <StatusBadge status={row.severity === 'Critical' ? 'critical' : 'pending'}>{row.severity}</StatusBadge>
    )},
    { header: 'Assigned Doctor', accessorKey: 'doctor' },
    { header: 'Referral Status', accessorKey: 'referralStatus', cell: (row) => (
      <StatusBadge status={row.referralStatus === 'Accepted' || row.referralStatus === 'Transferred' ? 'available' : 'occupied'}>{row.referralStatus}</StatusBadge>
    )},
    { header: 'Admission Date', accessorKey: 'date' },
    { header: 'Action', cell: () => <Button size="sm" variant="outline">View Records</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Patient Management" description="Global overview of patient flow across the network." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={patients} placeholder="Search patients by ID or Name..." />
      </motion.div>
    </div>
  );
}

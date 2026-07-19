import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const requestsData = [
  { id: 'REQ-101', patient: 'Unknown Male (Trauma)', hospital: 'Northside Trauma', priority: 'Critical', distance: '1.2 mi', eta: '4 mins', resources: 'ALS Required' },
  { id: 'REQ-102', patient: 'Maria Garcia', hospital: 'City Clinic', priority: 'High', distance: '3.5 mi', eta: '12 mins', resources: 'BLS' },
  { id: 'REQ-103', patient: 'James Wilson', hospital: 'Central General', priority: 'Medium', distance: '5.0 mi', eta: '18 mins', resources: 'BLS' },
];

export default function AvailableRequests() {
  const columns = [
    { header: 'Request ID', accessorKey: 'id' },
    { header: 'Patient / Incident', accessorKey: 'patient' },
    { header: 'Hospital', accessorKey: 'hospital' },
    { header: 'Priority', accessorKey: 'priority', cell: (row) => (
      <StatusBadge status={row.priority === 'Critical' ? 'critical' : row.priority === 'High' ? 'pending' : 'stable'}>{row.priority}</StatusBadge>
    )},
    { header: 'Distance', accessorKey: 'distance' },
    { header: 'Est. Time', accessorKey: 'eta' },
    { header: 'Requirements', accessorKey: 'resources', cell: (row) => <span className="text-slate-400 text-sm">{row.resources}</span> },
    { header: 'Action', cell: () => <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Accept Trip</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Available Requests" description="Open emergency dispatches matching your unit's capability." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={requestsData} placeholder="Search by ID or Location..." />
      </motion.div>
    </div>
  );
}

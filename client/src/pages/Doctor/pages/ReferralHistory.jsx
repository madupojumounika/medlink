import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const historyData = [
  { id: 'REF-801', patient: 'Michael Scott', to: 'Referral Desk', severity: 'High', status: 'Referral Requested', date: 'Oct 24, 2026' },
  { id: 'REF-802', patient: 'Jim Halpert', to: 'Northside Hospital', severity: 'Critical', status: 'Referral Sent', date: 'Oct 23, 2026' },
  { id: 'REF-803', patient: 'Dwight Schrute', to: 'East Medical', severity: 'Medium', status: 'Rejected', date: 'Oct 21, 2026' },
  { id: 'REF-804', patient: 'Pam Beesly', to: 'Central General', severity: 'Low', status: 'Accepted', date: 'Oct 20, 2026' },
  { id: 'REF-805', patient: 'Stanley Hudson', to: 'Cardiac Center', severity: 'Critical', status: 'Completed', date: 'Oct 19, 2026' },
];

export default function ReferralHistory() {
  const columns = [
    { header: 'Ref ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Destination', accessorKey: 'to' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => (
      <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge>
    )},
    { header: 'Final Status', accessorKey: 'status', cell: (row) => {
      let badgeStatus = 'pending';
      if (['Accepted', 'Completed'].includes(row.status)) badgeStatus = 'available';
      if (['Rejected'].includes(row.status)) badgeStatus = 'critical';
      if (['In Transit', 'Referral Sent'].includes(row.status)) badgeStatus = 'occupied';
      return <StatusBadge status={badgeStatus}>{row.status}</StatusBadge>;
    }},
    { header: 'Date', accessorKey: 'date' },
    { header: 'Action', cell: () => <Button variant="outline" size="sm">View Report</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Referral History" description="Log of all past patient transfers and their final resolutions." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={historyData} placeholder="Search past referrals by ID or Patient Name..." />
      </motion.div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';

const hospitalData = [
  { rank: '#1', name: 'Central General', acceptRate: '94%', avgTime: '12 mins', effScore: '98/100', status: 'Excellent' },
  { rank: '#2', name: 'Northside Trauma', acceptRate: '88%', avgTime: '18 mins', effScore: '92/100', status: 'Good' },
  { rank: '#3', name: 'St. Jude Cardiac', acceptRate: '91%', avgTime: '15 mins', effScore: '89/100', status: 'Good' },
  { rank: '#4', name: 'East Medical', acceptRate: '65%', avgTime: '34 mins', effScore: '62/100', status: 'Needs Review' },
];

export default function HospitalPerformance() {
  const columns = [
    { header: 'Rank', accessorKey: 'rank', cell: (row) => <span className="font-bold text-white">{row.rank}</span> },
    { header: 'Hospital Name', accessorKey: 'name' },
    { header: 'Referral Acceptance', accessorKey: 'acceptRate', cell: (row) => <span className="text-cyan-400">{row.acceptRate}</span> },
    { header: 'Avg Door-to-Bed', accessorKey: 'avgTime' },
    { header: 'Efficiency Score', accessorKey: 'effScore', cell: (row) => <span className="font-mono text-emerald-400">{row.effScore}</span> },
    { header: 'Performance', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Excellent' || row.status === 'Good' ? 'available' : 'critical'}>{row.status}</StatusBadge>
    )}
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Hospital Performance Matrix" description="Rankings based on admission speed, acceptance rates, and ICU efficiency." />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={hospitalData} placeholder="Search hospitals by name..." />
      </motion.div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const queue = [
  { id: 'EQ-001', patient: 'Unknown Male', condition: 'Multiple Trauma', triage: 'Level 1 (Resuscitation)', wait: '0 mins', location: 'Bay 1' },
  { id: 'EQ-002', patient: 'Sarah Connor', condition: 'Chest Pain', triage: 'Level 2 (Emergent)', wait: '5 mins', location: 'Waiting Room' },
  { id: 'EQ-003', patient: 'Michael Scott', condition: 'Burn Injury', triage: 'Level 2 (Emergent)', wait: '12 mins', location: 'Waiting Room' },
  { id: 'EQ-004', patient: 'Pam Beesly', condition: 'Laceration', triage: 'Level 4 (Less Urgent)', wait: '45 mins', location: 'Waiting Room' },
];

export default function EmergencyQueue() {
  const columns = [
    { header: 'Queue ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Condition', accessorKey: 'condition' },
    { header: 'Triage Level', accessorKey: 'triage', cell: (row) => (
      <StatusBadge status={row.triage.includes('Level 1') ? 'critical' : row.triage.includes('Level 2') ? 'pending' : 'stable'}>
        {row.triage}
      </StatusBadge>
    )},
    { header: 'Wait Time', accessorKey: 'wait' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Action', cell: () => <Button variant="outline" size="sm">Update Status</Button> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Emergency Room Queue" description="Live triage and patient flow tracking." />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable columns={columns} data={queue} placeholder="Search queue..." />
      </motion.div>
    </div>
  );
}

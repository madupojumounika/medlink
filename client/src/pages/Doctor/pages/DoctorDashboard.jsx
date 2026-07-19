import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Users, Activity, FileText, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const todayPatients = [
  { id: 'PT-1092', name: 'James Wilson', condition: 'Chest Pain', severity: 'High', time: '10:30 AM' },
  { id: 'PT-1093', name: 'Maria Garcia', condition: 'Laceration', severity: 'Low', time: '11:15 AM' },
  { id: 'PT-1094', name: 'Robert Chen', condition: 'Shortness of Breath', severity: 'Critical', time: '11:45 AM' },
];

const activeReferrals = [
  { id: 'REF-892', patient: 'Robert Chen', to: 'Central General ICU', status: 'En Route', eta: '5 mins' },
  { id: 'REF-893', patient: 'Sarah Jenkins', to: 'Northside Trauma', status: 'Pending', eta: '-' },
];

export default function DoctorDashboard() {
  const patientColumns = [
    { header: 'Patient', accessorKey: 'name' },
    { header: 'Condition', accessorKey: 'condition' },
    { header: 'Severity', cell: (row) => <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge> },
    { header: 'Time', accessorKey: 'time' },
  ];

  const referralColumns = [
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Destination', accessorKey: 'to' },
    { header: 'Status', cell: (row) => <StatusBadge status={row.status === 'En Route' ? 'en_route' : 'pending'}>{row.status}</StatusBadge> },
    { header: 'ETA', accessorKey: 'eta' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Doctor Dashboard" description="Overview of your patients and active referrals." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Today's Patients" value="14" description="4 critical cases" icon={Users} trend={{ isPositive: true, value: 12 }} />
        <MetricCard title="Active Referrals" value="2" description="1 pending approval" icon={HeartPulse} />
        <MetricCard title="AI Assessments" value="8" description="Completed today" icon={Activity} />
        <MetricCard title="Unread Reports" value="5" description="Requires review" icon={FileText} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Today's Patients</h3>
          <DataTable columns={patientColumns} data={todayPatients} searchable={false} />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Active Outbound Referrals</h3>
          <DataTable columns={referralColumns} data={activeReferrals} searchable={false} />
        </motion.div>
      </div>
    </div>
  );
}

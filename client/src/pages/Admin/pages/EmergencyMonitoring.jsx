import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Activity, AlertTriangle, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const liveQueue = [
  { id: 'EQ-092', location: 'Highway 101', type: 'MVA', priority: 'Critical', units: 'ALS-44, FIRE-2', status: 'En Route' },
  { id: 'EQ-093', location: 'Downtown', type: 'Cardiac', priority: 'Critical', units: 'ALS-12', status: 'On Scene' },
  { id: 'EQ-094', location: 'East District', type: 'Trauma', priority: 'High', units: 'BLS-08', status: 'Transporting' },
];

export default function EmergencyMonitoring() {
  const columns = [
    { header: 'Incident ID', accessorKey: 'id' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Priority', accessorKey: 'priority', cell: (row) => (
      <StatusBadge status={row.priority === 'Critical' ? 'critical' : 'pending'}>{row.priority}</StatusBadge>
    )},
    { header: 'Dispatched Units', accessorKey: 'units' },
    { header: 'Live Status', accessorKey: 'status', cell: (row) => <span className="text-cyan-400 font-semibold flex items-center gap-2"><Radio className="w-3 h-3 animate-pulse"/>{row.status}</span> },
    { header: 'Action', cell: () => <Button size="sm" variant="outline">Intervene</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="Live Emergency Monitoring" description="Real-time oversight of network-wide emergency incidents." />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-full text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          Live Feed Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Active Incidents" value="14" description="Network wide" icon={AlertTriangle} trend={{ isPositive: false, value: 4 }} />
        <MetricCard title="Critical (Level 1)" value="3" description="Require immediate attention" icon={Activity} />
        <MetricCard title="Available ICU Beds" value="18" description="Across 4 hospitals" icon={Radio} trend={{ isPositive: true, value: 2 }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Incident Queue</h3>
          <DataTable columns={columns} data={liveQueue} searchable={false} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-rose-900/20 to-slate-950 border border-rose-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-rose-400 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Hospital Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-white/5 rounded-lg">
                <div className="text-white text-sm font-medium">Northside Trauma Center</div>
                <div className="text-rose-400 text-xs mt-1">ICU Capacity Reached (100%)</div>
              </div>
              <div className="p-3 bg-slate-950 border border-white/5 rounded-lg">
                <div className="text-white text-sm font-medium">St. Jude Cardiac</div>
                <div className="text-amber-400 text-xs mt-1">Defibrillator Shortage Reported</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

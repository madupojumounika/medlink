import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ChartCard } from '@/components/common/ChartCard';
import { Activity, Bed, Users, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const activeEmergencies = [
  { id: 'EM-1029', type: 'Trauma', severity: 'Critical', eta: '5 mins', unit: 'Alpha-1' },
  { id: 'EM-1030', type: 'Cardiac', severity: 'High', eta: '12 mins', unit: 'Bravo-4' },
  { id: 'EM-1031', type: 'Neurological', severity: 'Medium', eta: '18 mins', unit: 'Charlie-2' },
];

const chartData = [
  { time: '00:00', patients: 12 }, { time: '04:00', patients: 8 },
  { time: '08:00', patients: 25 }, { time: '12:00', patients: 45 },
  { time: '16:00', patients: 38 }, { time: '20:00', patients: 30 },
  { time: '24:00', patients: 18 },
];

export default function HospitalDashboard() {
  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge> },
    { header: 'ETA', accessorKey: 'eta' },
    { header: 'Unit', accessorKey: 'unit' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Hospital Command Center" description="Real-time overview of hospital capacity and incoming emergencies." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Available ICU Beds" value="12" description="Out of 45 total" icon={Bed} trend={{ isPositive: false, value: 5 }} />
        <MetricCard title="Incoming Referrals" value="8" description="Expected in next hour" icon={AlertTriangle} trend={{ isPositive: true, value: 12 }} />
        <MetricCard title="Active Doctors" value="34" description="Currently on shift" icon={Users} trend={{ isPositive: true, value: 2 }} />
        <MetricCard title="Avg Triage Time" value="4.2m" description="Past 24 hours" icon={Activity} trend={{ isPositive: true, value: 8 }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <ChartCard title="Patient Influx Trend" description="Emergency admissions over the last 24 hours">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="patients" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ChartCard>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Incoming Emergencies</h3>
            <DataTable columns={columns} data={activeEmergencies} searchable={false} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

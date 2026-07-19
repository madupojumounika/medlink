import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { ChartCard } from '@/components/common/ChartCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HeartPulse, CheckCircle, Activity, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const chartData = [
  { time: '08:00', trips: 2 }, { time: '10:00', trips: 5 },
  { time: '12:00', trips: 8 }, { time: '14:00', trips: 3 },
  { time: '16:00', trips: 7 }, { time: '18:00', trips: 4 },
];

const activeTrips = [
  { id: 'TRP-101', patient: 'Robert Chen', to: 'Central General', status: 'En Route', eta: '5 mins' },
  { id: 'TRP-102', patient: 'Sarah Jenkins', to: 'Northside Trauma', status: 'Pickup', eta: '2 mins' },
];

export default function AmbulanceDashboard() {
  const columns = [
    { header: 'Trip ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Destination', accessorKey: 'to' },
    { header: 'Status', cell: (row) => <StatusBadge status={row.status === 'En Route' ? 'en_route' : 'pending'}>{row.status}</StatusBadge> },
    { header: 'ETA', accessorKey: 'eta' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Ambulance Command" description="Real-time vehicle status and active emergency trips." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Active Trips" value="2" description="Currently in progress" icon={Activity} />
        <MetricCard title="Completed Today" value="14" description="Average time: 18 mins" icon={CheckCircle} trend={{ isPositive: true, value: 5 }} />
        <MetricCard title="Pending Requests" value="3" description="Awaiting assignment" icon={HeartPulse} trend={{ isPositive: false, value: 2 }} />
        <MetricCard title="Fuel Level" value="78%" description="Range: 210 miles" icon={Droplet} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <ChartCard title="Trip Volume (Today)" description="Hourly distribution of emergency dispatch calls">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="trips" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorTrips)" />
            </AreaChart>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Trips</h3>
          <DataTable columns={columns} data={activeTrips} searchable={false} />
        </motion.div>
      </div>
    </div>
  );
}

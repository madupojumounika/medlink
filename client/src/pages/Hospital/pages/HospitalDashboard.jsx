import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ChartCard } from '@/components/common/ChartCard';
import { Activity, Bed, Users, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';

const chartData = [
  { time: '00:00', patients: 12 }, { time: '04:00', patients: 8 },
  { time: '08:00', patients: 25 }, { time: '12:00', patients: 45 },
  { time: '16:00', patients: 38 }, { time: '20:00', patients: 30 },
  { time: '24:00', patients: 18 },
];

export default function HospitalDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/v1/hospitals/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { header: 'ID', accessorKey: '_id', cell: (row) => row._id?.slice(-6).toUpperCase() },
    { header: 'Patient', cell: (row) => row.patientId?.name || 'Unknown' },
    { header: 'Severity', accessorKey: 'priority', cell: (row) => <StatusBadge status={row.priority === 'Critical' ? 'critical' : row.priority === 'High' ? 'pending' : 'stable'}>{row.priority}</StatusBadge> },
    { header: 'From', cell: (row) => row.fromHospitalId?.name || 'Unknown' },
  ];

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  return (
    <div className="space-y-6">
      <PageHeader title="Hospital Command Center" description="Real-time overview of hospital capacity and incoming emergencies." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Available ICU Beds" value={stats?.availableICUBeds || 0} description={`Out of ${stats?.totalICUBeds || 0} total`} icon={Bed} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Incoming Referrals" value={stats?.incomingReferralsCount || 0} description="Awaiting review" icon={AlertTriangle} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Active Doctors" value={stats?.activeDoctorsCount || 0} description="Currently on shift" icon={Users} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Avg Triage Time" value={stats?.avgTriageTime || "N/A"} description="Past 24 hours" icon={Activity} trend={{ isPositive: true, value: 0 }} />
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
            {stats?.activeEmergencies?.length > 0 ? (
              <DataTable columns={columns} data={stats.activeEmergencies} searchable={false} />
            ) : (
              <div className="text-center text-slate-400 py-8">No incoming emergencies.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

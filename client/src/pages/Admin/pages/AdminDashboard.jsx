import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { ChartCard } from '@/components/common/ChartCard';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, Users, HeartPulse, Activity, AlertTriangle, CheckCircle, Server, ActivitySquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/v1/admin/dashboard');
        setData(response.data.data);
      } catch (err) {
        setError('Failed to load dashboard analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-slate-400">Loading intelligence dashboard...</div>;
  }

  if (error || !data) {
    return <div className="flex h-[50vh] items-center justify-center text-rose-400">{error}</div>;
  }

  const { systemStats, aiAnalytics, ambulanceAnalytics, hospitalAnalytics, systemHealth, recentActivity } = data;

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Intelligence" description="Real-time ecosystem statistics and AI predictions." />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Hospitals" value={systemStats.totalHospitals || 0} description="Registered network" icon={Building} />
        <MetricCard title="Registered Doctors" value={systemStats.totalDoctors || 0} description="Active on platform" icon={Users} />
        <MetricCard title="Total Patients" value={systemStats.totalPatients || 0} description="Lifetime tracked" icon={HeartPulse} />
        <MetricCard title="AI Predictions" value={aiAnalytics.predictionSuccessCount || 0} description="Referrals processed" icon={ActivitySquare} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <MetricCard title="Total Referrals" value={systemStats.totalReferrals || 0} description="System volume" icon={Activity} />
        <MetricCard title="Emergency Cases" value={systemStats.emergencyReferrals || 0} description="Critical priority" icon={AlertTriangle} />
        <MetricCard title="Completed Triages" value={systemStats.completedReferrals || 0} description="Successfully routed" icon={CheckCircle} />
        <MetricCard title="Active Ambulances" value={ambulanceAnalytics.assignedAmbulances + ambulanceAnalytics.enRouteAmbulances + ambulanceAnalytics.transportingAmbulances} description="Currently on duty" icon={Activity} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Charts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
          <ChartCard title="AI Severity Distribution" description="Prediction count by severity level">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiAnalytics.severityDistribution || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <div className="grid md:grid-cols-2 gap-6">
            <ChartCard title="Ambulance Status" description="Real-time fleet activity">
               <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={ambulanceAnalytics.ambulanceStatusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {ambulanceAnalytics.ambulanceStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Referral Priority" AI="Distribution of Priority Levels">
               <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={aiAnalytics.priorityDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {aiAnalytics.priorityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-6">
          
          {/* System Health Block */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" /> System Health
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-white/5">
                <span className="text-slate-400 text-sm">Node API</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${systemHealth.nodeBackend === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {systemHealth.nodeBackend}
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-white/5">
                <span className="text-slate-400 text-sm">FastAPI (AI Engine)</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${systemHealth.fastAPI === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {systemHealth.fastAPI}
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-white/5">
                <span className="text-slate-400 text-sm">MongoDB Database</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${systemHealth.mongoDB === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {systemHealth.mongoDB}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Latest Operations</h3>
            <div className="space-y-3">
              {recentActivity && recentActivity.length > 0 ? recentActivity.slice(0, 5).map((activity, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-white/5 bg-slate-950/50 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-200">Ref: {activity._id.substring(0, 8)}</span>
                    <span className="text-xs text-indigo-400">{activity.status}</span>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(activity.createdAt).toLocaleString()}</span>
                </div>
              )) : (
                <div className="text-sm text-slate-500 text-center py-4">No recent activity found.</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Users, Activity, FileText, Send, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/common/Button';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [patientsRes, profileRes] = await Promise.all([
        api.get('/v1/patients').catch(() => ({ data: { data: [] } })),
        api.get('/v1/doctors/profile').catch(() => ({ data: { data: null } }))
      ]);
      setPatients(patientsRes.data.data || []);
      if (profileRes.data.data) {
        setIsOnDuty(profileRes.data.data.onDuty ?? profileRes.data.data.availability ?? true);
      }
    } catch (error) {
      alert('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDuty = async () => {
    try {
      setIsStatusUpdating(true);
      const nextStatus = !isOnDuty;
      await api.patch('/v1/doctors/duty-status', { onDuty: nextStatus });
      setIsOnDuty(nextStatus);
    } catch (error) {
      alert('Failed to update duty status. Please try again.');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return <StatusBadge status="critical">Critical</StatusBadge>;
      case 'High': return <StatusBadge status="pending">High</StatusBadge>;
      case 'Medium': return <StatusBadge status="available">Medium</StatusBadge>;
      default: return <StatusBadge status="available">Low</StatusBadge>;
    }
  };

  const patientColumns = [
    { header: 'Patient Name', accessorKey: 'name' },
    { header: 'Diagnosis', cell: (row) => row.diagnosis || 'Pending' },
    { header: 'Severity', cell: (row) => getSeverityBadge(row.severity) },
    { header: 'Status', cell: (row) => (
      <StatusBadge status={row.status === 'NEW' ? 'pending' : row.status === 'REFERRED_TO_COORDINATOR' ? 'available' : 'critical'}>
        {row.status.replace(/_/g, ' ')}
      </StatusBadge>
    )},
    { header: 'Action', cell: (row) => (
      <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/doctor/patients/${row._id}`)}>
        View
      </Button>
    )}
  ];

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  // Calculate Metrics
  const totalPatients = patients.length;
  const criticalPatients = patients.filter(p => p.severity === 'Critical').length;
  const forwardedPatients = patients.filter(p => p.status === 'REFERRED_TO_COORDINATOR').length;
  const activePatients = patients.filter(p => p.status !== 'REFERRED_TO_COORDINATOR');
  const recentPatients = activePatients.slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Doctor Dashboard" description="Overview of your active patients and clinical tasks.">
        <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={`h-2.5 w-2.5 rounded-full ${isOnDuty ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-foreground font-semibold min-w-[65px]">
              {isStatusUpdating ? 'Saving...' : isOnDuty ? 'On Duty' : 'Off Duty'}
            </span>
          </div>
          <div className="h-5 w-px bg-border mx-0.5" />
          <button
            type="button"
            role="switch"
            aria-checked={isOnDuty}
            onClick={handleToggleDuty}
            disabled={isStatusUpdating}
            title={isOnDuty ? "Click to switch Off Duty" : "Click to switch On Duty"}
            className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
              isOnDuty ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span className={`absolute text-[10px] font-bold tracking-wider uppercase transition-opacity duration-200 ${
              isOnDuty ? 'left-2.5 text-white opacity-100' : 'left-2.5 text-white opacity-0'
            }`}>
              ON
            </span>
            <span className={`absolute text-[10px] font-bold tracking-wider uppercase transition-opacity duration-200 ${
              !isOnDuty ? 'right-2 text-slate-600 dark:text-slate-300 opacity-100' : 'right-2 text-slate-600 opacity-0'
            }`}>
              OFF
            </span>
            <span
              className={`pointer-events-none z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out ${
                isOnDuty ? 'translate-x-8 text-emerald-600' : 'translate-x-0 text-slate-400'
              }`}
            >
              <Activity className="w-4 h-4" />
            </span>
          </button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Active Patients" value={activePatients.length} description="Currently under care" icon={Users} trend={{ isPositive: true, value: 5 }} />
        <MetricCard title="Critical Patients" value={criticalPatients} description="Requires immediate attention" icon={AlertTriangle} />
        <MetricCard title="Forwarded Patients" value={forwardedPatients} description="Sent to Coordinator" icon={Send} />
        <MetricCard title="Recent Reports" value="3" description="Pending review" icon={FileText} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Patients</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/doctor/patients')}>View All</Button>
          </div>
          {recentPatients.length > 0 ? (
            <DataTable columns={patientColumns} data={recentPatients} searchable={false} />
          ) : (
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
              No active patients found.
            </div>
          )}
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button onClick={() => navigate('/dashboard/doctor/add-patient')} className="w-full justify-start gap-3 bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600/20 border-cyan-600/20">
              <Users className="w-4 h-4" /> Add New Patient
            </Button>
            <Button onClick={() => navigate('/dashboard/doctor/history')} className="w-full justify-start gap-3 bg-muted/50 text-foreground hover:bg-muted border-border">
              <FileText className="w-4 h-4" /> View Patient History
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

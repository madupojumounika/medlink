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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/v1/patients');
      setPatients(res.data.data);
    } catch (error) {
      alert('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
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
      <PageHeader title="Doctor Dashboard" description="Overview of your active patients and clinical tasks." />
      
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

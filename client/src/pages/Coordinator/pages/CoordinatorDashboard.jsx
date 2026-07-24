import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Users, Activity, FileText, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';
import { Button } from '@/components/common/Button';

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const [internalQueue, setInternalQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [queueRes, historyRes] = await Promise.all([
        api.get('/v1/referrals/internal'),
        api.get('/v1/referrals/history')
      ]);
      setInternalQueue(queueRes.data.data);
      setHistory(historyRes.data.data);
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

  const referralColumns = [
    { header: 'Patient', cell: (row) => row.patientId?.name || 'Unknown' },
    { header: 'Diagnosis', cell: (row) => row.diagnosis || 'Pending' },
    { header: 'Severity', cell: (row) => getSeverityBadge(row.severity) },
    { header: 'Status', cell: (row) => (
      <StatusBadge status={row.status === 'Pending' ? 'pending' : 'available'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'Action', cell: (row) => (
      <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/coordinator/referrals/${row._id}`)}>
        Review
      </Button>
    )}
  ];

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  const totalPending = internalQueue.length;
  const totalSent = history.filter(r => r.status === 'Sent To Hospital').length;
  const recentReferrals = internalQueue.slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Coordinator Dashboard" description="Manage outbound referrals and hospital allocations." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Pending Queue" value={totalPending} description="Awaiting hospital allocation" icon={Clock} trend={{ isPositive: false, value: 2 }} />
        <MetricCard title="Sent Today" value={totalSent} description="Forwarded to external hospitals" icon={Send} />
        <MetricCard title="Accepted" value="0" description="Awaiting Phase 5" icon={Activity} />
        <MetricCard title="Completed" value="0" description="Successfully transferred" icon={Users} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Internal Queue</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/coordinator/queue')}>View All</Button>
          </div>
          {recentReferrals.length > 0 ? (
            <DataTable columns={referralColumns} data={recentReferrals} searchable={false} />
          ) : (
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
              Queue is empty.
            </div>
          )}
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button onClick={() => navigate('/dashboard/coordinator/queue')} className="w-full justify-start gap-3 bg-cyan-600/10 text-cyan-600 hover:bg-cyan-600/20 border-cyan-600/20">
              <Clock className="w-4 h-4" /> Review Pending Queue
            </Button>
            <Button onClick={() => navigate('/dashboard/coordinator/history')} className="w-full justify-start gap-3 bg-muted/50 text-foreground hover:bg-muted border-border">
              <FileText className="w-4 h-4" /> View Referral History
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

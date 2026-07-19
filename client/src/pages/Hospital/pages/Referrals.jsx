import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';

const referralsData = [
  { id: 'REF-801', patient: 'John Doe', from: 'City Clinic', severity: 'High', status: 'Pending', time: '10 mins ago' },
  { id: 'REF-802', patient: 'Jane Smith', from: 'Northside Hospital', severity: 'Critical', status: 'Accepted', time: '1 hr ago' },
  { id: 'REF-803', patient: 'Alice Johnson', from: 'East Medical', severity: 'Medium', status: 'Declined', time: '3 hrs ago' },
  { id: 'REF-804', patient: 'Bob Brown', from: 'Ambulance Unit-4', severity: 'Critical', status: 'Pending', time: 'Just now' },
];

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredData = referralsData.filter(ref => {
    if (activeTab === 'pending') return ref.status === 'Pending';
    if (activeTab === 'accepted') return ref.status === 'Accepted';
    if (activeTab === 'history') return ['Accepted', 'Declined'].includes(ref.status);
    return true;
  });

  const columns = [
    { header: 'Ref ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Origin', accessorKey: 'from' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => (
      <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge>
    )},
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Accepted' ? 'available' : row.status === 'Pending' ? 'pending' : 'occupied'}>{row.status}</StatusBadge>
    )},
    { header: 'Time', accessorKey: 'time' },
    { header: 'Action', cell: (row) => (
      row.status === 'Pending' ? (
        <div className="flex gap-2">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Accept</Button>
          <Button size="sm" variant="outline" className="text-rose-500 border-rose-500/50 hover:bg-rose-500/10 hover:border-rose-500">Decline</Button>
        </div>
      ) : (
        <Button variant="outline" size="sm">View Details</Button>
      )
    )}
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Referrals Management" description="Review and accept incoming patient transfers." />
      
      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-8">
        <button 
          onClick={() => setActiveTab('pending')}
          className={`pb-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'pending' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Incoming Requests
        </button>
        <button 
          onClick={() => setActiveTab('accepted')}
          className={`pb-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'accepted' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Accepted Referrals
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'history' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Referral History
        </button>
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={filteredData} placeholder="Search referrals..." />
      </motion.div>
    </div>
  );
}

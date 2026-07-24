import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';

export default function ICUAvailability() {
  const [resources, setResources] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/v1/hospitals/resources');
      setResources(res.data.data);
    } catch (error) {
      console.error("Failed to load resources", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBedData = () => {
    if (!resources) return [];
    const total = resources.totalICUBeds || 0;
    const available = resources.availableICUBeds || 0;
    const occupied = Math.max(0, total - available);
    
    const beds = [];
    
    // Add available beds
    for (let i = 0; i < available; i++) {
      beds.push({
        id: `ICU-${100 + i + 1}`,
        type: 'Intensive Care Unit',
        status: 'Available',
        patient: '-',
        admitted: '-'
      });
    }
    
    // Add occupied beds
    for (let i = 0; i < occupied; i++) {
      beds.push({
        id: `ICU-${100 + available + i + 1}`,
        type: 'Intensive Care Unit',
        status: 'Occupied',
        patient: 'Active Patient',
        admitted: 'Unknown'
      });
    }
    
    return beds;
  };

  const columns = [
    { header: 'Bed ID', accessorKey: 'id' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Available' ? 'available' : row.status === 'Occupied' ? 'critical' : 'pending'}>
        {row.status}
      </StatusBadge>
    )},
    { header: 'Current Patient', accessorKey: 'patient' },
    { header: 'Admitted', accessorKey: 'admitted' },
  ];

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  const total = resources?.totalICUBeds || 0;
  const available = resources?.availableICUBeds || 0;
  const occupied = Math.max(0, total - available);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="ICU & Bed Availability" description="Real-time management of critical care beds synced with Resource Management." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">Available ICU Beds</p>
          <h3 className="text-3xl font-bold text-emerald-400">{available}</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">Total ICU Beds</p>
          <h3 className="text-3xl font-bold text-cyan-400">{total}</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/10 rounded-full blur-[20px]"></div>
          <p className="text-sm text-slate-400 mb-2">Occupied Beds</p>
          <h3 className="text-3xl font-bold text-rose-400">{occupied}</h3>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DataTable columns={columns} data={generateBedData()} placeholder="Search beds..." />
      </motion.div>
    </div>
  );
}

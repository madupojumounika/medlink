import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Plus } from 'lucide-react';
import { AddStaffModal } from '@/components/common/AddStaffModal';

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/v1/admin/doctors');
      if (res.data?.data) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log('Failed to fetch doctor list');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    {
      header: 'Doctor Name',
      accessorKey: 'name',
      cell: (row) => (
        <div>
          <div className="font-semibold text-white">{row.name}</div>
          <div className="text-xs text-cyan-400 font-mono">ID: {row.username || 'N/A'}</div>
        </div>
      )
    },
    { header: 'Specialization', accessorKey: 'specialization' },
    { header: 'Affiliated Hospital', accessorKey: 'hospital' },
    { header: 'License No.', accessorKey: 'license', cell: (row) => <span className="font-mono text-slate-400 text-sm">{row.license}</span> },
    {
      header: 'Duty Status',
      accessorKey: 'onDuty',
      cell: (row) => {
        const isDrOnDuty = row.onDuty ?? row.availability ?? true;
        return (
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${isDrOnDuty
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isDrOnDuty ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            {isDrOnDuty ? 'On Duty' : 'Off Duty'}
          </span>
        );
      }
    },
    {
      header: 'Verification', accessorKey: 'status', cell: (row) => (
        <StatusBadge status={row.status === 'Verified' ? 'available' : 'pending'}>{row.status}</StatusBadge>
      )
    },
    { header: 'Action', cell: () => <Button size="sm" variant="outline">View Docs</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Doctor Management" description="Review licenses and verify medical professionals network-wide." />
        <Button onClick={() => setIsModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20 font-semibold">
          <Plus className="w-4 h-4" /> Add Doctor Profile
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader size="lg" /></div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <DataTable columns={columns} data={doctors} placeholder="Search doctors by name or license..." />
        </motion.div>
      )}

      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDoctors}
      />
    </div>
  );
}

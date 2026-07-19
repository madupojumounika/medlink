import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/common/Button';
import { ShieldCheck, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const users = [
  { id: 'USR-01', name: 'Admin One', role: 'Super Admin', email: 'admin@medlink.ai', status: 'Active' },
  { id: 'USR-02', name: 'John Doe', role: 'Hospital Manager', email: 'john@central.org', status: 'Active' },
  { id: 'USR-03', name: 'Sarah Jenkins', role: 'Doctor', email: 's.jenkins@central.org', status: 'Active' },
  { id: 'USR-04', name: 'Alex Mercer', role: 'Ambulance Driver', email: 'alex@metroems.org', status: 'Active' },
];

export default function UserRoles() {
  const getRoleBadge = (role) => {
    switch(role) {
      case 'Super Admin': return <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold">Super Admin</span>;
      case 'Hospital Manager': return <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md text-xs font-semibold">Hospital Mgr</span>;
      case 'Doctor': return <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">Doctor</span>;
      case 'Ambulance Driver': return <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md text-xs font-semibold">Driver</span>;
      default: return <span className="px-2 py-1 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-md text-xs font-semibold">{role}</span>;
    }
  };

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email', cell: (row) => <span className="text-slate-400">{row.email}</span> },
    { header: 'Role', accessorKey: 'role', cell: (row) => getRoleBadge(row.role) },
    { header: 'Status', accessorKey: 'status', cell: (row) => <span className="text-emerald-400 text-sm font-medium">{row.status}</span> },
    { header: 'Action', cell: () => <Button size="sm" variant="outline">Edit Permissions</Button> }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader title="User Roles & Permissions" description="Manage access control across the entire platform." />
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2"><Plus className="w-4 h-4"/> Invite User</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><ShieldCheck className="w-5 h-5"/></div>
          <div><p className="text-2xl font-bold text-white">4</p><p className="text-xs text-slate-400">Super Admins</p></div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400"><ShieldCheck className="w-5 h-5"/></div>
          <div><p className="text-2xl font-bold text-white">124</p><p className="text-xs text-slate-400">Hospital Managers</p></div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><ShieldCheck className="w-5 h-5"/></div>
          <div><p className="text-2xl font-bold text-white">2,845</p><p className="text-xs text-slate-400">Doctors</p></div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400"><ShieldCheck className="w-5 h-5"/></div>
          <div><p className="text-2xl font-bold text-white">482</p><p className="text-xs text-slate-400">Drivers</p></div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <DataTable columns={columns} data={users} placeholder="Search users by name or email..." />
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { AddStaffModal } from '@/components/common/AddStaffModal';

export default function DoctorManagement() {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('doctor'); // 'doctor' or 'referral_coordinator'

  useEffect(() => {
    fetchStaff();
  }, [roleFilter]);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/v1/hospitals/employees?role=${roleFilter}`);
      setStaff(res.data.data);
    } catch (error) {
      alert('Failed to load staff');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/v1/hospitals/employees', formData);
      alert('Staff created successfully');
      setIsModalOpen(false);
      setFormData({ fullName: '', email: '', password: '', role: roleFilter });
      fetchStaff();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (employeeId, currentStatus) => {
    try {
      await api.patch(`/v1/hospitals/employees/${employeeId}/status`, { isActive: !currentStatus });
      fetchStaff();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Staff Management" description="Manage hospital doctors and referral coordinators." />
        <Button onClick={() => setIsModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </div>

      <div className="flex gap-4 border-b border-border pb-2">
        <button
          onClick={() => setRoleFilter('doctor')}
          className={`font-semibold pb-2 border-b-2 transition-colors ${roleFilter === 'doctor' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Doctors
        </button>
        <button
          onClick={() => setRoleFilter('referral_coordinator')}
          className={`font-semibold pb-2 border-b-2 transition-colors ${roleFilter === 'referral_coordinator' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Referral Coordinators
        </button>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader size="lg" /></div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Duty Status</th>
                  <th className="px-6 py-4 font-medium">Account Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {staff.map((employee) => {
                  const isDrOnDuty = employee.onDuty ?? employee.availability ?? true;
                  return (
                    <tr key={employee._id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{employee.fullName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{employee.email}</td>
                      <td className="px-6 py-4 capitalize">{employee.role.replace('_', ' ')}</td>
                      <td className="px-6 py-4">
                        {employee.role === 'doctor' ? (
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${isDrOnDuty
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${isDrOnDuty ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                            {isDrOnDuty ? 'On Duty' : 'Off Duty'}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs font-mono">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={employee.isActive ? 'available' : 'critical'}>
                          {employee.isActive ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(employee._id, employee.isActive)}
                        >
                          {employee.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {staff.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                      No staff found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStaff}
      />
    </div>
  );
}

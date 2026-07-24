import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Plus, Search, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';

export default function DoctorManagement() {
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleFilter, setRoleFilter] = useState('doctor'); // 'doctor' or 'referral_coordinator'
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'doctor' });

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
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {staff.map((employee) => (
                  <tr key={employee._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{employee.fullName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{employee.email}</td>
                    <td className="px-6 py-4 capitalize">{employee.role.replace('_', ' ')}</td>
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
                ))}
                {staff.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                      No staff found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card w-full max-w-md rounded-xl p-6 shadow-lg border border-border">
              <h2 className="text-xl font-bold mb-4 text-foreground">Add New Staff</h2>
              <form onSubmit={handleAddStaff} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Full Name</label>
                  <input type="text" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full p-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Password</label>
                  <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-muted-foreground">Role</label>
                  <select required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full p-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-cyan-500 outline-none">
                    <option value="doctor">Doctor</option>
                    <option value="referral_coordinator">Referral Coordinator</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                    {isSubmitting ? 'Saving...' : 'Create Staff'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

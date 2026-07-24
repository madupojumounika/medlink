import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { Building, MapPin, Phone, Mail, Clock, FileText } from 'lucide-react';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';


export default function HospitalProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/v1/hospitals/profile');
      setProfile(res.data.data);
      setFormData(res.data.data);
    } catch (error) {
      console.error("Failed to load profile", error);
      alert("Failed to load hospital profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/v1/hospitals/profile', formData);
      alert("Profile updated successfully");
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader title="Hospital Profile" description="Manage your hospital's public profile and contact information." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full flex items-center justify-center border border-white/10 mb-4 overflow-hidden relative group cursor-pointer">
              {profile.logo ? (
                 <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Building className="w-12 h-12 text-slate-500" />
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-white">Change Photo</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{profile.hospitalName}</h3>
            <p className="text-slate-400 text-sm mb-4">{profile.hospitalCode}</p>
            <StatusBadge status={profile.isActive ? 'available' : 'inactive'}>
              {profile.isActive ? 'Network Active' : 'Inactive'}
            </StatusBadge>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">General Information</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Hospital Name</Label>
                  <Input name="hospitalName" value={formData.hospitalName || ''} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Input name="registrationNumber" value={formData.registrationNumber || formData.hospitalCode || ''} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" name="phone" value={formData.phone || ''} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Emergency Contact</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Working Hours</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" name="workingHours" value={formData.workingHours || ''} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>License Details</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" name="licenseDetails" value={formData.licenseDetails || ''} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" name="address" value={formData.address || ''} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <Button type="submit" disabled={isSaving} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusBadge({ status, children }) {
  const bgClass = status === 'available' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bgClass}`}>{children}</span>;
}

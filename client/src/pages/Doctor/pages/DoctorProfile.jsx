import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { User, Award, Shield } from 'lucide-react';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { useAuth } from '@/hooks/useAuth';

export default function DoctorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/v1/doctors/profile');
      setProfile(res.data.data);
      setFormData(res.data.data);
    } catch (error) {
      console.error("Failed to load profile", error);
      alert("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/v1/doctors/profile', formData);
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Doctor Profile" description="Manage your personal details and professional credentials." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1">
          <div className="bg-card border rounded-2xl p-6 text-center shadow-sm">
            <div className="w-32 h-32 mx-auto bg-background border border-border rounded-full flex items-center justify-center mb-4 overflow-hidden relative group cursor-pointer">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-1">{profile.userId?.fullName || "Doctor"}</h3>
            <p className="text-muted-foreground text-sm mb-4">{profile.specialization || "General Medicine"}</p>
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
              <Shield className="w-4 h-4" /> Verified Provider
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-6">
          
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground mb-6">Personal Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={profile.userId?.fullName || ''} disabled className="bg-muted text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile.userId?.email || ''} disabled className="bg-muted text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Medical License Number</Label>
                  <Input name="licenseNumber" value={formData.licenseNumber || ''} onChange={handleChange} placeholder="MD-1234567" />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input name="specialization" value={formData.specialization || ''} onChange={handleChange} placeholder="e.g. Cardiology" />
                </div>
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input name="experience" type="number" min="0" value={formData.experience || ''} onChange={handleChange} placeholder="5" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="+1 234 567 890" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSaving} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-card-foreground">Affiliated Hospital</h3>
            </div>
            <div className="p-4 bg-background rounded-xl border border-border">
              <div className="text-card-foreground font-medium text-lg">{profile.hospitalId?.hospitalName || "Unknown Hospital"}</div>
              <div className="text-muted-foreground text-sm mb-4">{profile.hospitalId?.address || "Address not available"}</div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

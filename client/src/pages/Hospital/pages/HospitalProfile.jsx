import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import {
  Building, MapPin, Phone, Mail, Clock,
  FileText, ShieldCheck, CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';

// Clean, neutral Vercel-style Spotlight Card Component
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(120, 120, 120, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

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

  if (isLoading) return <div className="flex justify-center p-16"><Loader size="lg" /></div>;
  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-5xl font-sans text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Hospital Profile"
          description="Manage public facility credentials, emergency contact lines, and network licensing."
        />
        <div className="flex items-center gap-2 self-start sm:self-center bg-card border border-border px-3.5 py-2 rounded-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Verified Facility</span>
          <div className="h-3.5 w-px bg-border mx-1" />
          <button
            onClick={fetchProfile}
            disabled={isLoading}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
            title="Refresh Profile"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Profile Summary Card (4 cols) */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="md:col-span-4">
          <SpotlightCard className="p-6 text-center">
            <div className="w-24 h-24 mx-auto bg-muted rounded-2xl flex items-center justify-center border border-border/80 mb-4 overflow-hidden relative group cursor-pointer shadow-inner">
              {profile.logo ? (
                <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Building className="w-10 h-10 text-muted-foreground" />
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[11px] font-semibold text-white">Change Logo</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-1">
              {profile.hospitalName}
            </h3>

            <div className="mb-4">
              <span className="text-xs font-mono text-muted-foreground bg-muted/70 px-2.5 py-1 rounded-md border border-border/60 inline-block">
                {profile.hospitalCode || 'REG-PENDING'}
              </span>
            </div>

            <div className="pt-4 border-t border-border/60 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Network Status</span>
                {profile.isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Inactive
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Verification</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Dispatch Readiness</span>
                <span className="text-[11px] font-mono text-muted-foreground">24/7 Active</span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Form Card (8 cols) */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.2 }} className="md:col-span-8">
          <SpotlightCard className="p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-muted/60 border border-border text-foreground flex items-center justify-center">
                  <Building className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    General Credentials & Lineage
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Update facility contact numbers, address, and medical license certifications.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                ID: #{profile._id?.slice(-6).toUpperCase() || 'SYS'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Hospital Name</Label>
                  <Input
                    name="hospitalName"
                    value={formData.hospitalName || ''}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground rounded-xl text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Registration Number</Label>
                  <Input
                    name="registrationNumber"
                    value={formData.registrationNumber || formData.hospitalCode || ''}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm"
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Emergency Dispatch Contact</Label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400"
                      name="emergencyContact"
                      value={formData.emergencyContact || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">Working Hours</Label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm"
                      name="workingHours"
                      value={formData.workingHours || ''}
                      onChange={handleChange}
                      placeholder="e.g. 24/7 Emergency Service"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-semibold text-foreground">License Details</Label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm"
                      name="licenseDetails"
                      value={formData.licenseDetails || ''}
                      onChange={handleChange}
                      placeholder="Medical Accreditation / State License No."
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-semibold text-foreground">Facility Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background border-border text-foreground rounded-xl text-sm"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground/80" />
                  Changes apply immediately across MedLink dispatch routing.
                </span>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader size="sm" /> Saving Credentials...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  );
}

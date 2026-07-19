import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { Building, MapPin, Phone, Mail } from 'lucide-react';

export default function HospitalProfile() {
  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader title="Hospital Profile" description="Manage your hospital's public profile and contact information." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full flex items-center justify-center border border-white/10 mb-4 overflow-hidden relative group cursor-pointer">
              <Building className="w-12 h-12 text-slate-500" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-white">Change Photo</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Central General Hospital</h3>
            <p className="text-slate-400 text-sm mb-4">Tier 1 Trauma Center</p>
            <StatusBadge status="available">Network Active</StatusBadge>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">General Information</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Hospital Name</Label>
                  <Input defaultValue="Central General Hospital" />
                </div>
                <div className="space-y-2">
                  <Label>Facility Type</Label>
                  <select className="w-full h-10 px-3 py-2 bg-slate-950 border border-white/10 rounded-md text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option>General Hospital</option>
                    <option>Specialty Clinic</option>
                    <option>Trauma Center</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" defaultValue="+1 (555) 019-2830" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Emergency Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" defaultValue="er-dispatch@centralgeneral.org" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input className="pl-9" defaultValue="1200 Healthcare Blvd, Metro City, NY 10001" />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">Save Changes</Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusBadge({ status, children }) {
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{children}</span>;
}

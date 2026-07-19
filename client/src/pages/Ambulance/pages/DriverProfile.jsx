import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { User, Activity, Award, ShieldCheck } from 'lucide-react';

export default function DriverProfile() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Driver Profile" description="Manage your credentials and performance metrics." />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full flex items-center justify-center border border-white/10 mb-4">
              <User className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Alex Mercer</h3>
            <p className="text-slate-400 text-sm mb-4">Paramedic (ALS Certified)</p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-max mx-auto">
              <ShieldCheck className="w-4 h-4" /> Active Duty
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> Performance Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Trips</span>
                <span className="text-white font-medium">842</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Avg Response Time</span>
                <span className="text-emerald-400 font-medium">4m 12s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Rating</span>
                <span className="text-white font-medium">4.9 / 5.0</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-6">
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Personal Details</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Mercer" />
                </div>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input defaultValue="CDL-X892341" disabled className="bg-slate-950 text-slate-500" />
                </div>
                <div className="space-y-2">
                  <Label>Assigned Unit</Label>
                  <Input defaultValue="ALS-44 (Advanced Life Support)" disabled className="bg-slate-950 text-slate-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">Save Changes</Button>
              </div>
            </form>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Certifications</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">Advanced Life Support (ALS)</div>
                  <div className="text-slate-500 text-xs mt-1">Valid until: Dec 2028</div>
                </div>
                <StatusBadge status="available">Active</StatusBadge>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">Defensive Driving Course</div>
                  <div className="text-slate-500 text-xs mt-1">Valid until: Mar 2027</div>
                </div>
                <StatusBadge status="available">Active</StatusBadge>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

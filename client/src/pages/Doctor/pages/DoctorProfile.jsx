import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { User, Award, Shield } from 'lucide-react';

export default function DoctorProfile() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Doctor Profile" description="Manage your personal details and professional credentials." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full flex items-center justify-center border border-white/10 mb-4 overflow-hidden relative group cursor-pointer">
              <User className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Dr. Sarah Jenkins</h3>
            <p className="text-slate-400 text-sm mb-4">Chief of Emergency Medicine</p>
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Shield className="w-4 h-4" /> Verified Provider
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-6">
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Personal Details</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Jenkins" />
                </div>
                <div className="space-y-2">
                  <Label>Medical License Number</Label>
                  <Input defaultValue="MD-9982441" disabled className="bg-slate-950 text-slate-500" />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input defaultValue="Emergency Medicine & Trauma" />
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
              <h3 className="text-lg font-semibold text-white">Affiliated Hospital</h3>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
              <div className="text-white font-medium text-lg">Central General Hospital</div>
              <div className="text-slate-400 text-sm mb-4">1200 Healthcare Blvd, Metro City</div>
              <Button variant="outline" size="sm">Request Transfer</Button>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

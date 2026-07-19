import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { User, Mail, Building, Phone, MapPin, Shield, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserProfile() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader title="My Profile" description="Manage your personal information and credentials." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-slate-800 rounded-full border border-white/10 flex items-center justify-center overflow-hidden mb-4 relative group">
              <User className="w-12 h-12 text-slate-500 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs text-white font-medium">Change Photo</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Dr. Sarah Jenkins</h3>
            <p className="text-cyan-400 text-sm font-medium mb-3">Senior Trauma Surgeon</p>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Building className="w-4 h-4" /> Central General Hospital
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> Verification Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Email Confirmed</span>
                <span className="text-emerald-400">Yes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Medical License</span>
                <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-500/10 rounded-full">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">2FA Enabled</span>
                <span className="text-rose-400">No</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Email Address</p>
                  <p className="text-white text-sm">s.jenkins@central.org</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Phone Number</p>
                  <p className="text-white text-sm">+1 (555) 019-2834</p>
                </div>
              </div>
              <div className="flex gap-4 md:col-span-2">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Office Location</p>
                  <p className="text-white text-sm">Building C, Floor 4, Suite 402, Central General Hospital</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6 pb-4 border-b border-white/10">Recent Activity Timeline</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-0 md:before:translate-x-[11px] before:h-full before:w-0.5 before:bg-slate-800">
              <div className="relative flex items-center justify-between md:justify-normal">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-900 bg-cyan-500 shrink-0 md:order-1 z-10 shadow"></div>
                <div className="w-[calc(100%-3rem)] md:w-full ml-4 p-4 rounded-xl border border-white/5 bg-slate-950/50">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-slate-200 text-sm">Accepted Referral PT-1094</h4>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> 2 hrs ago</span>
                  </div>
                  <p className="text-xs text-slate-400">Patient admitted to ICU Bed 4.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-900 bg-emerald-500 shrink-0 md:order-1 z-10 shadow"></div>
                <div className="w-[calc(100%-3rem)] md:w-full ml-4 p-4 rounded-xl border border-white/5 bg-slate-950/50">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-slate-200 text-sm">Updated Medical License</h4>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> Oct 20</span>
                  </div>
                  <p className="text-xs text-slate-400">Document approved by Admin.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

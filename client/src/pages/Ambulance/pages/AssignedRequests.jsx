import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { MapPin, Navigation, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssignedRequests() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <PageHeader title="Active Assignment: REQ-101" description="Transporting patient to specialized care." />
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
          <Navigation className="w-4 h-4" /> Start Navigation
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Incident Details</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Patient</p>
                <p className="text-white font-medium">Robert Chen (PT-1094)</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Priority</p>
                <StatusBadge status="critical">Critical (Level 1)</StatusBadge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-950 rounded-xl border border-white/5">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Pickup Location</p>
                  <p className="text-sm text-slate-400">1200 Healthcare Blvd, Metro City</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-slate-950 rounded-xl border border-emerald-500/20">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Destination Hospital</p>
                  <p className="text-sm text-slate-400">Northside Trauma Center</p>
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">ICU Bed Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px]"></div>
            <h3 className="text-lg font-semibold text-white mb-2">Estimated Arrival</h3>
            <div className="text-5xl font-black text-cyan-400 mb-2">04:30</div>
            <p className="text-sm text-slate-400">Minutes</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Trip Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1"><Clock className="w-4 h-4 text-emerald-500"/></div>
                <div>
                  <div className="text-white text-sm font-medium">Request Accepted</div>
                  <div className="text-slate-500 text-xs">11:55 AM</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Activity className="w-4 h-4 text-cyan-500"/></div>
                <div>
                  <div className="text-white text-sm font-medium">En Route to Pickup</div>
                  <div className="text-slate-500 text-xs">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

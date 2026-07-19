import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import { Bell, Truck, Settings } from 'lucide-react';

export default function AmbulanceSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="App Settings" description="Configure dispatch preferences and vehicle details." />

      <div className="grid gap-6">
        {/* Availability Toggle */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Duty Status</h3>
              <p className="text-sm text-slate-400">Toggle whether you can receive new emergency dispatches.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Loud Alarms for Critical Dispatches</p>
                <p className="text-sm text-slate-500">Bypass silent mode for Level 1 & 2 emergencies.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Route Deviation Warnings</p>
                <p className="text-sm text-slate-500">Alert when significantly off the optimized route.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Prefs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Vehicle Diagnostics</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-white">Run System Diagnostic Test</Button>
            <Button variant="outline" className="w-full justify-start text-white">Update Vehicle Inventory List</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

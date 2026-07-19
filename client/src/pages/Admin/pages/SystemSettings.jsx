import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import { Shield, HardDrive, Bell, Settings2 } from 'lucide-react';

export default function SystemSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="System Settings" description="Global platform configurations and security policies." />

      <div className="grid gap-6">
        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Global Security Policies</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enforce Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-slate-500">Require 2FA for all Hospital Managers and Admins.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">HIPAA Strict Compliance Mode</p>
                <p className="text-sm text-slate-500">Mask patient names in global dashboards.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Database & Backup */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Database & Backup Management</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
            <div>
              <p className="text-white font-medium">Last Automated Backup</p>
              <p className="text-sm text-emerald-400">Oct 24, 2026 - 03:00 AM (Success)</p>
            </div>
            <Button variant="outline" className="text-slate-300">Run Manual Backup</Button>
          </div>
        </motion.div>

        {/* Global Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">System Broadcasts</h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">Send a push notification to all active users across the network.</p>
          <textarea className="w-full min-h-[100px] p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4" placeholder="Enter broadcast message..."></textarea>
          <Button className="bg-amber-600 hover:bg-amber-500 text-white">Send Broadcast</Button>
        </motion.div>
      </div>
    </div>
  );
}

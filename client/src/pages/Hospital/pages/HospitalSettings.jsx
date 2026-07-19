import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { Bell, Lock, Shield, Database } from 'lucide-react';

export default function HospitalSettings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Hospital Settings" description="Configure integration, notifications, and security." />

      <div className="grid gap-6">
        {/* API Integration */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">EHR System Integration</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Webhook URL for Auto-Updates</Label>
              <Input defaultValue="https://api.centralgeneral.org/v1/medlink/webhook" />
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" defaultValue="************************" />
            </div>
            <Button variant="outline" className="mt-2 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/10">Rotate API Key</Button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Alert Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Critical Referral Alerts</p>
                <p className="text-sm text-slate-500">Play an audible alarm for Level 1 incoming traumas.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5">
              <div>
                <p className="text-white font-medium">Auto-Accept Routine Referrals</p>
                <p className="text-sm text-slate-500">Automatically accept Level 4 & 5 referrals if beds are available.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Security & Access</h3>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-white">Manage 2FA Settings</Button>
            <Button variant="outline" className="w-full justify-start text-white">View Access Logs (HIPAA)</Button>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">Save All Settings</Button>
      </div>
    </div>
  );
}

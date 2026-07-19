import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Shield, Bell, Key, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader title="Account Settings" description="Manage your preferences, security, and application settings." />

      <div className="grid gap-6">
        {/* Security Settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-card-foreground">Security & Passwords</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">Update Password</Button>
            
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-card-foreground font-medium flex items-center gap-2"><Smartphone className="w-4 h-4 text-cyan-500"/> Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Button variant="outline" className="border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10">Enable 2FA</Button>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Globe className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-card-foreground">Application Preferences</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Language</Label>
                <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>UTC -05:00 (Eastern Time)</option>
                  <option>UTC -08:00 (Pacific Time)</option>
                  <option>UTC +00:00 (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-card-foreground">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
              <div>
                <p className="text-card-foreground font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive daily summaries and critical alerts via email.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-background border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-border after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
              <div>
                <p className="text-card-foreground font-medium">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">Receive text messages for high priority referrals.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-border after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

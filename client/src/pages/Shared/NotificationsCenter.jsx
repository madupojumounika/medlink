import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Bell, AlertTriangle, HeartPulse, ShieldCheck, Activity, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
  { id: 1, type: 'critical', title: 'Critical Incident', message: 'Mass Casualty Incident reported at Highway 101. Expect high inbound traffic.', time: '2 mins ago', read: false },
  { id: 2, type: 'referral', title: 'Referral Update', message: 'PT-1094 transfer to Northside Trauma has been accepted.', time: '14 mins ago', read: false },
  { id: 3, type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance will occur on Oct 28 at 02:00 AM UTC.', time: '2 hours ago', read: true },
  { id: 4, type: 'ambulance', title: 'Unit Dispatched', message: 'ALS-44 has been dispatched to Incident EQ-092.', time: '3 hours ago', read: true },
  { id: 5, type: 'referral', title: 'Referral Request', message: 'New Level 1 Trauma referral requested by City Clinic.', time: '1 day ago', read: true },
];

export default function NotificationsCenter() {
  const getIcon = (type) => {
    switch(type) {
      case 'critical': return <div className="p-3 bg-rose-500/10 text-rose-500 rounded-full"><AlertTriangle className="w-5 h-5"/></div>;
      case 'referral': return <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-full"><Activity className="w-5 h-5"/></div>;
      case 'ambulance': return <div className="p-3 bg-amber-500/10 text-amber-500 rounded-full"><HeartPulse className="w-5 h-5"/></div>;
      case 'system': return <div className="p-3 bg-purple-500/10 text-purple-500 rounded-full"><ShieldCheck className="w-5 h-5"/></div>;
      default: return <div className="p-3 bg-slate-500/10 text-slate-500 rounded-full"><Bell className="w-5 h-5"/></div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Notifications" description="Stay updated on emergencies, referrals, and system alerts." />
        <Button variant="outline" className="text-muted-foreground">Mark all as read</Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search notifications..." className="pl-10" />
        </div>
        <select className="h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option>All Types</option>
          <option>Critical Alerts</option>
          <option>Referrals</option>
          <option>System Updates</option>
        </select>
      </div>

      <div className="space-y-4">
        {notifications.map((notif, index) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-4 p-5 rounded-2xl border ${notif.read ? 'bg-card border-border' : 'bg-background border-border shadow-sm'} hover:border-input transition-colors cursor-pointer relative`}
          >
            {!notif.read && <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>}
            
            {getIcon(notif.type)}
            
            <div className="flex-1 pr-6">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm font-semibold ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>{notif.title}</h4>
              </div>
              <p className={`text-sm ${notif.read ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>{notif.message}</p>
              <p className="text-xs text-muted-foreground/50 mt-2">{notif.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

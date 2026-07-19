import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { motion } from 'framer-motion';
import { Bell, HeartPulse, FileCheck, AlertTriangle } from 'lucide-react';

const notifications = [
  { id: 1, type: 'alert', title: 'Critical Patient Arriving', desc: 'Ambulance ALS-44 is 5 mins away with a severe trauma patient.', time: 'Just now', read: false },
  { id: 2, type: 'referral', title: 'Referral Accepted', desc: 'Central General accepted your referral for PT-1094.', time: '10 mins ago', read: false },
  { id: 3, type: 'system', title: 'Lab Results Ready', desc: 'ECG results for Maria Garcia have been uploaded.', time: '1 hr ago', read: true },
  { id: 4, type: 'referral', title: 'Referral Declined', desc: 'Northside Trauma declined PT-1093 due to lack of beds.', time: '2 hrs ago', read: true },
];

export default function Notifications() {
  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'referral': return <HeartPulse className="w-5 h-5 text-cyan-500" />;
      case 'system': return <FileCheck className="w-5 h-5 text-emerald-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Notifications" description="Important alerts and system updates." />

      <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
        {notifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 border-b border-border flex gap-4 transition-colors hover:bg-background ${!notif.read ? 'bg-background shadow-sm' : 'bg-background'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${!notif.read ? 'bg-background border border-border shadow-sm' : 'bg-background border border-border'}`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-base font-semibold ${!notif.read ? 'text-card-foreground' : 'text-muted-foreground'}`}>{notif.title}</h4>
                <span className="text-xs text-muted-foreground">{notif.time}</span>
              </div>
              <p className="text-muted-foreground text-sm">{notif.desc}</p>
            </div>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ChartCard } from '@/components/common/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

const referralTrends = [
  { month: 'Jan', referrals: 400 },
  { month: 'Feb', referrals: 300 },
  { month: 'Mar', referrals: 550 },
  { month: 'Apr', referrals: 450 },
  { month: 'May', referrals: 600 },
  { month: 'Jun', referrals: 720 },
];

const hospitalPerformance = [
  { name: 'Central Gen', time: 14 },
  { name: 'Northside', time: 22 },
  { name: 'East Med', time: 18 },
  { name: 'St. Jude', time: 12 },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Executive Analytics" description="Platform-wide performance, utilization, and referral trends." />

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <ChartCard title="Network Referral Volume" description="Total successful referrals per month">
            <LineChart data={referralTrends} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="referrals" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <ChartCard title="Average Admission Time" description="Minutes from arrival to bed allocation by hospital">
            <BarChart data={hospitalPerformance} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="time" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
        </motion.div>
      </div>
    </div>
  );
}

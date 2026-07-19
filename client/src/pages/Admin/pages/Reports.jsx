import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Reports() {
  const reports = [
    { title: 'Monthly Network Performance', type: 'PDF', date: 'Oct 01, 2026', size: '2.4 MB' },
    { title: 'Q3 Ambulance Fleet Utilization', type: 'Excel', date: 'Oct 05, 2026', size: '1.1 MB' },
    { title: 'Critical Patient Referral Log', type: 'CSV', date: 'Oct 10, 2026', size: '4.8 MB' },
    { title: 'System Security Audit - September', type: 'PDF', date: 'Oct 15, 2026', size: '3.2 MB' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="System Reports" description="Generate and export comprehensive platform data." />
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="w-4 h-4"/> Last 30 Days</Button>
          <Button variant="outline" className="gap-2"><Filter className="w-4 h-4"/> Filter</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Custom Report Generation</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Report Module</label>
              <select className="w-full h-10 px-3 py-2 bg-slate-950 border border-white/10 rounded-md text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Hospital Performance</option>
                <option>Ambulance Dispatch Logs</option>
                <option>Doctor Activity</option>
                <option>Patient Transfer History</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Start Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-white/10">
              <Button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white gap-2"><Download className="w-4 h-4"/> Export PDF</Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white gap-2"><Download className="w-4 h-4"/> Export Excel</Button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Automated Reports</h3>
          <div className="space-y-3">
            {reports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{report.title}</h4>
                    <div className="text-xs text-slate-500 flex gap-2 mt-1">
                      <span>{report.date}</span>•<span>{report.type}</span>•<span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

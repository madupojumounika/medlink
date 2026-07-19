import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Download, FileDown, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExportCenter() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Export Data & Reports" description="Generate and download custom analytics payloads." />

      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Query Builder</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Data Source</label>
                <select className="w-full h-10 px-3 py-2 bg-slate-950 border border-white/10 rounded-md text-sm text-slate-200">
                  <option>All Analytics Metrics</option>
                  <option>Emergency Volume Only</option>
                  <option>Hospital Efficiency Data</option>
                  <option>Ambulance Logs</option>
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Format Options</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" className="text-cyan-500 bg-slate-950 border-white/10 focus:ring-cyan-500" defaultChecked />
                    <span className="text-sm text-slate-300">PDF Report</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" className="text-cyan-500 bg-slate-950 border-white/10 focus:ring-cyan-500" />
                    <span className="text-sm text-slate-300">Raw Excel/CSV</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-4">
              <PieChart className="w-8 h-8" />
            </div>
            <h4 className="text-white font-semibold mb-2">Ready to Compile</h4>
            <p className="text-sm text-slate-400 mb-6">Your query will process approximately 14,200 records across the network.</p>
            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white gap-2 h-12">
              <FileDown className="w-5 h-5" /> Generate & Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

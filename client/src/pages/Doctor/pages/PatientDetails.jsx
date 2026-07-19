import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Activity, Clock, FileText, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientDetails() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <PageHeader title="Patient Details: Robert Chen" description="ID: PT-1094 | Age: 58 | Gender: Male" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300">Run AI Severity Check</Button>
          <Button className="bg-rose-600 hover:bg-rose-500 text-white">Create Referral</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Vitals & Assessment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 text-xs uppercase mb-1">Heart Rate</div>
                <div className="text-2xl font-bold text-rose-400">142 <span className="text-sm font-normal text-slate-500">bpm</span></div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 text-xs uppercase mb-1">Blood Pressure</div>
                <div className="text-2xl font-bold text-amber-400">160/95</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 text-xs uppercase mb-1">SpO2</div>
                <div className="text-2xl font-bold text-rose-400">88 <span className="text-sm font-normal text-slate-500">%</span></div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 text-xs uppercase mb-1">Temp</div>
                <div className="text-2xl font-bold text-white">99.1 <span className="text-sm font-normal text-slate-500">°F</span></div>
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-sm mb-1">Symptoms</div>
              <p className="text-slate-200 bg-slate-950 p-4 rounded-lg border border-white/5">Severe chest pain radiating to left arm. Acute shortness of breath. Diaphoretic upon presentation.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Diagnostic Reports</h3>
              <Button variant="outline" size="sm" className="flex gap-2"><Upload className="w-4 h-4"/> Upload Lab Results</Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <FileText className="text-cyan-500 w-5 h-5"/>
                  <div>
                    <div className="text-white text-sm font-medium">ECG_Scan_0815.pdf</div>
                    <div className="text-slate-500 text-xs">Uploaded 10 mins ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px]"></div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Severity Prediction</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-rose-500">94%</div>
              <StatusBadge status="critical">Critical Risk</StatusBadge>
            </div>
            <p className="text-sm text-slate-400">High probability of acute myocardial infarction. Immediate transfer to Cardiac ICU recommended.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1"><Activity className="w-4 h-4 text-rose-500"/></div>
                <div>
                  <div className="text-white text-sm font-medium">AI Triage Completed</div>
                  <div className="text-slate-500 text-xs">11:55 AM</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Clock className="w-4 h-4 text-cyan-500"/></div>
                <div>
                  <div className="text-white text-sm font-medium">Patient Admitted (ER)</div>
                  <div className="text-slate-500 text-xs">11:45 AM</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

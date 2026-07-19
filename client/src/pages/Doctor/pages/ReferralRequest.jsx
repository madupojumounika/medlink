import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { Hospital, Ambulance, AlertTriangle, FileText } from 'lucide-react';

export default function ReferralRequest() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Initiate Referral" description="Auto-route patient based on AI recommendations or manual override." />

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
        {/* Top Summary Card */}
        <div className="bg-rose-50 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-rose-600 dark:text-rose-500 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-rose-900 dark:text-white font-bold">PT-1094 (Robert Chen)</h3>
              <p className="text-rose-600 dark:text-rose-400 text-sm">Critical Severity (94%) - Acute Myocardial Infarction</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-rose-600/70 dark:text-slate-400 text-sm">AI Recommendation</span>
            <div className="text-rose-900 dark:text-white font-semibold">Specialized Cardiac Center</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Destination Selection */}
          <div className="bg-card border border-border shadow-sm rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <Hospital className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg font-semibold text-card-foreground">Select Destination</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-cyan-200 bg-cyan-50 dark:border-cyan-500/30 dark:bg-cyan-500/10 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="hospital" className="text-cyan-600 dark:text-cyan-500 focus:ring-cyan-500" defaultChecked />
                  <div>
                    <div className="text-card-foreground font-medium">Northside Cardiac Institute</div>
                    <div className="text-muted-foreground text-sm">ETA: 12 mins</div>
                  </div>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">3 ICU Beds Open</div>
              </label>

              <label className="flex items-center justify-between p-4 border border-border bg-background rounded-xl cursor-pointer hover:border-input transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="hospital" className="text-cyan-600 dark:text-cyan-500 focus:ring-cyan-500" />
                  <div>
                    <div className="text-card-foreground font-medium">Central General</div>
                    <div className="text-muted-foreground text-sm">ETA: 5 mins</div>
                  </div>
                </div>
                <div className="text-rose-600 dark:text-rose-400 text-sm font-semibold">0 ICU Beds Open</div>
              </label>
            </div>
          </div>

          {/* Transport Selection */}
          <div className="bg-card border border-border shadow-sm rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <Ambulance className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-card-foreground">Transport Allocation</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="transport" className="text-emerald-600 dark:text-emerald-500 focus:ring-emerald-500" defaultChecked />
                  <div>
                    <div className="text-card-foreground font-medium">Unit ALS-44 (Advanced Life Support)</div>
                    <div className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">Available Now - 2 mins away</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center justify-between p-4 border border-border bg-background rounded-xl cursor-pointer hover:border-input transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="transport" className="text-emerald-600 dark:text-emerald-500 focus:ring-emerald-500" />
                  <div>
                    <div className="text-card-foreground font-medium">Unit BLS-12 (Basic Life Support)</div>
                    <div className="text-muted-foreground text-sm font-semibold">Available Now - 5 mins away</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Notes & Submission */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-card-foreground">Clinical Handover Notes</h3>
          </div>
          <textarea className="w-full min-h-[120px] p-4 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Required life support, specific medications administered..."></textarea>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Save as Draft</Button>
            <Button className="bg-rose-600 hover:bg-rose-500 text-white px-8">Dispatch & Refer</Button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

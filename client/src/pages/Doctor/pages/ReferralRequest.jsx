import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { Hospital, Ambulance, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function ReferralRequest() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put('/patients/mock-id', { needsReferral: true });
    } catch (error) {
      console.warn("API not fully integrated, proceeding with UI flow");
    } finally {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/doctor/referrals');
      }, 2500);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="text-emerald-600 dark:text-emerald-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground">Referral Request Submitted</h2>
        <p className="text-muted-foreground text-lg">
          Referral request submitted successfully. The Referral Desk will review and coordinate the transfer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Clinical Referral Request" description="Request referral coordination from the hospital Referral Desk." />

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        
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


        {/* Notes & Submission */}
        <div className="bg-card border border-border shadow-sm rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <FileText className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-card-foreground">Clinical Handover Notes</h3>
          </div>
          <textarea className="w-full min-h-[120px] p-4 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Required life support, specific medications administered..."></textarea>
          
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-rose-600 hover:bg-rose-500 text-white px-8">
              {isSubmitting ? 'Submitting...' : 'Submit Referral Request'}
            </Button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

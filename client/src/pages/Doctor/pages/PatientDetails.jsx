import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Activity, Clock, FileText, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

export default function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [needsReferral, setNeedsReferral] = React.useState(false);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Attempt to fetch real patient data if API supports it
        const res = await api.get(`/patients/${id || 'mock-id'}`);
        if (res.data?.data?.needsReferral) {
          setNeedsReferral(true);
        }
      } catch (err) {
        // Fallback for prototype if endpoint doesn't exist or fails
        console.warn('Could not fetch patient details', err);
      }
    };
    fetchPatient();
  }, [id]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <PageHeader title="Patient Details: Robert Chen" description="ID: PT-1094 | Age: 58 | Gender: Male" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300">Run AI Severity Check</Button>
          {needsReferral ? (
            <Button disabled className="bg-slate-700 text-slate-300 opacity-80 cursor-not-allowed">✓ Referral Requested</Button>
          ) : (
            <Button onClick={() => navigate('/dashboard/doctor/referrals/new')} className="bg-rose-600 hover:bg-rose-500 text-white">Request Referral</Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Vitals & Assessment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <div className="text-muted-foreground text-xs uppercase mb-1">Heart Rate</div>
                <div className="text-2xl font-bold text-rose-500">142 <span className="text-sm font-normal text-muted-foreground">bpm</span></div>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <div className="text-muted-foreground text-xs uppercase mb-1">Blood Pressure</div>
                <div className="text-2xl font-bold text-amber-500">160/95</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <div className="text-muted-foreground text-xs uppercase mb-1">SpO2</div>
                <div className="text-2xl font-bold text-rose-500">88 <span className="text-sm font-normal text-muted-foreground">%</span></div>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <div className="text-muted-foreground text-xs uppercase mb-1">Temp</div>
                <div className="text-2xl font-bold text-card-foreground">99.1 <span className="text-sm font-normal text-muted-foreground">°F</span></div>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm mb-1">Symptoms</div>
              <p className="text-card-foreground bg-muted/50 p-4 rounded-lg border border-border">Severe chest pain radiating to left arm. Acute shortness of breath. Diaphoretic upon presentation.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Diagnostic Reports</h3>
              <Button variant="outline" size="sm" className="flex gap-2"><Upload className="w-4 h-4"/> Upload Lab Results</Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <FileText className="text-cyan-600 dark:text-cyan-500 w-5 h-5"/>
                  <div>
                    <div className="text-card-foreground text-sm font-medium">ECG_Scan_0815.pdf</div>
                    <div className="text-muted-foreground text-xs">Uploaded 10 mins ago</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-rose-200 dark:border-rose-500/30 shadow-sm rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px]"></div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">AI Severity Prediction</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-black text-rose-600 dark:text-rose-500">94%</div>
              <StatusBadge status="critical">Critical Risk</StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">High probability of acute myocardial infarction. Immediate transfer to Cardiac ICU recommended.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1"><Activity className="w-4 h-4 text-rose-500"/></div>
                <div>
                  <div className="text-card-foreground text-sm font-medium">AI Triage Completed</div>
                  <div className="text-muted-foreground text-xs">11:55 AM</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-500"/></div>
                <div>
                  <div className="text-card-foreground text-sm font-medium">Patient Admitted (ER)</div>
                  <div className="text-muted-foreground text-xs">11:45 AM</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

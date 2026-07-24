import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, ShieldAlert } from 'lucide-react';
import { api } from '@/lib/api';

export default function AISeverityAssessment({ patient, onAssessmentComplete }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(patient?.aiAssessment || null);
  
  const [vitals, setVitals] = useState({
    heartRate: patient?.vitals?.heartRate || 80,
    systolicBP: patient?.vitals?.systolicBP || 120,
    diastolicBP: patient?.vitals?.diastolicBP || 80,
    spo2: patient?.vitals?.spo2 || 98,
    respiratoryRate: patient?.vitals?.respiratoryRate || 16,
    temperature: patient?.vitals?.temperature || 37.0
  });

  const handleVitalChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: Number(e.target.value) });
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await api.post(`/v1/doctors/patients/${patient._id}/predict-severity`, { vitals });
      setResult(res.data.data.aiAssessment);
      if (onAssessmentComplete) onAssessmentComplete(res.data.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to run AI prediction";
      alert(`Error: ${errorMessage}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 mt-8 border-t pt-8">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">AI Severity Assessment</h3>
            <p className="text-sm text-muted-foreground mb-6">Enter patient vitals to run inference.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Heart Rate (bpm)</label>
                <input type="number" name="heartRate" value={vitals.heartRate} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">SpO2 (%)</label>
                <input type="number" name="spo2" value={vitals.spo2} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Systolic BP</label>
                <input type="number" name="systolicBP" value={vitals.systolicBP} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Diastolic BP</label>
                <input type="number" name="diastolicBP" value={vitals.diastolicBP} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Respiratory Rate</label>
                <input type="number" name="respiratoryRate" value={vitals.respiratoryRate} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Temperature (C)</label>
                <input type="number" step="0.1" name="temperature" value={vitals.temperature} onChange={handleVitalChange} className="w-full mt-1 p-2 bg-muted/50 rounded-lg border border-border text-sm" />
              </div>
            </div>

            <Button onClick={runAnalysis} disabled={analyzing} className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white flex gap-2">
              <Brain className="w-5 h-5" />
              {analyzing ? 'Processing Neural Net...' : 'Run Prediction Model'}
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!analyzing && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-muted-foreground flex flex-col items-center">
                <ShieldAlert className="w-16 h-16 mb-4 opacity-20" />
                <p>Awaiting analysis trigger</p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                  <Brain className="absolute inset-0 m-auto w-10 h-10 text-cyan-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">Analyzing Multimodal Data...</h3>
              </motion.div>
            )}

            {result && !analyzing && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-card border border-rose-200 dark:border-rose-500/30 rounded-3xl p-8 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px]"></div>
                <Activity className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-6xl font-black text-rose-500 mb-2">{Math.round(result.confidence * 100)}%</h3>
                <div className="text-rose-500 font-bold tracking-widest uppercase mb-4">{result.severity} RISK</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 bg-muted/50 p-4 rounded-lg border border-border">{result.recommendation}</p>
                <div className="text-xs text-muted-foreground mt-4">Risk Score: {result.riskScore?.toFixed(2)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

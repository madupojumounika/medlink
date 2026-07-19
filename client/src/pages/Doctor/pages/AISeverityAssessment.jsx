import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AISeverityAssessment() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const runAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({ score: 92, status: 'Critical', recommendation: 'Immediate transfer to specialized ICU required.' });
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="AI Severity Assessment" description="Utilize neural networks to predict patient deterioration risk based on live vitals." />

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Patient Data Input</h3>
            <p className="text-sm text-slate-400 mb-6">Select a patient or verify auto-synced vitals before running inference.</p>
            
            <div className="space-y-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-white/10 flex justify-between">
                <span className="text-slate-400 text-sm">Target Patient</span>
                <span className="text-white font-medium text-sm">PT-1094 (Robert Chen)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-white/10 flex justify-between">
                <span className="text-slate-400 text-sm">Latest SpO2</span>
                <span className="text-rose-400 font-medium text-sm">88%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-white/10 flex justify-between">
                <span className="text-slate-400 text-sm">Latest HR</span>
                <span className="text-rose-400 font-medium text-sm">142 bpm</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-white/10 flex justify-between">
                <span className="text-slate-400 text-sm">ECG Uploaded</span>
                <span className="text-emerald-400 font-medium text-sm flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Yes</span>
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
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-slate-500 flex flex-col items-center">
                <ShieldAlert className="w-16 h-16 mb-4 opacity-20" />
                <p>Awaiting analysis trigger</p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                  <Brain className="absolute inset-0 m-auto w-10 h-10 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white">Analyzing Multimodal Data...</h3>
              </motion.div>
            )}

            {result && !analyzing && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(244,63,94,0.1)] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px]"></div>
                <Activity className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-6xl font-black text-rose-500 mb-2">{result.score}%</h3>
                <div className="text-rose-400 font-bold tracking-widest uppercase mb-4">{result.status} RISK</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950 p-4 rounded-lg border border-white/5">{result.recommendation}</p>
                <Button className="w-full bg-rose-600 hover:bg-rose-500 text-white">Generate Auto-Referral</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

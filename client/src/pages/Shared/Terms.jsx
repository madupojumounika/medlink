import React from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-slate-400">Effective Date: October 24, 2026</p>
          </div>

          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
              <p>By accessing the MedLink AI platform, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Acceptable Use</h2>
              <p>You agree to use the platform strictly for professional healthcare coordination. You may not:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Submit false or misleading patient vitals.</li>
                <li>Attempt to bypass or exploit the AI severity engine.</li>
                <li>Access or extract data belonging to hospitals outside your authorized network.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. Medical Disclaimer</h2>
              <p>MedLink AI is a coordination and triage assistance tool. It is <strong>NOT</strong> a replacement for professional medical judgment. Doctors and paramedics must always rely on their clinical expertise when evaluating patients and making final routing decisions.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Liability</h2>
              <p>MedLink AI shall not be held liable for any adverse medical outcomes resulting from network latency, data entry errors by users, or unforeseen hardware failures at the destination facilities.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

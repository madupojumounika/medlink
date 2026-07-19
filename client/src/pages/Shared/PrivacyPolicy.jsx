import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-400">Last Updated: October 24, 2026</p>
          </div>

          <div className="space-y-8 text-slate-300 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
              <p>Welcome to MedLink AI. We are committed to protecting your personal information and your right to privacy. This policy outlines our practices regarding data collection, storage, and usage within our emergency healthcare network.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Data Collection</h2>
              <p>We collect information that you voluntarily provide to us when you register on the platform. This includes:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Professional credentials (Licenses, Hospital Affiliations).</li>
                <li>Patient health data during referrals (Vitals, Medical History).</li>
                <li>Live location data (for Ambulance dispatch routing).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. How We Use Your Data</h2>
              <p>The data collected is strictly utilized to facilitate the core functions of the MedLink AI platform:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Training our AI severity models (anonymized data only).</li>
                <li>Routing emergency vehicles efficiently.</li>
                <li>Generating network analytics for hospital administrators.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. HIPAA Compliance & Security</h2>
              <p>MedLink AI employs enterprise-grade security measures to protect sensitive health information. We utilize end-to-end encryption and comply strictly with the Health Insurance Portability and Accountability Act (HIPAA) and other relevant global healthcare regulations.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Contact Us</h2>
              <p>If you have questions or comments about this policy, you may email our Data Protection Officer at privacy@medlink.ai.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: "General",
    questions: [
      { q: "What is MedLink AI?", a: "MedLink AI is a real-time, AI-driven emergency referral and hospital resource network designed to connect doctors, hospitals, and ambulances seamlessly during critical incidents." },
      { q: "Do I need a special device to use the platform?", a: "No, MedLink AI is a web-based SaaS platform that works on any modern browser across desktops, tablets, and smartphones." }
    ]
  },
  {
    category: "For Hospitals & Doctors",
    questions: [
      { q: "How is patient severity calculated?", a: "Our AI engine analyzes inputted vitals, symptoms, and medical history against a trained neural network to generate a standardized severity score (Levels 1-3)." },
      { q: "Does the system automatically update ICU bed counts?", a: "If integrated with your hospital's EHR system, beds update automatically. Otherwise, Hospital Managers can update them manually in real-time." }
    ]
  },
  {
    category: "Security & Privacy",
    questions: [
      { q: "Is patient data secure?", a: "Yes. MedLink AI utilizes end-to-end encryption and complies with strict healthcare data regulations (like HIPAA) to ensure patient confidentiality." },
      { q: "Who can see patient information?", a: "Only the referring doctor, the destination hospital staff, and the assigned ambulance driver (limited info) have access to specific patient records." }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState("0-0");

  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-lg">Find answers about MedLink AI's platform, security, and integration.</p>
        </div>

        <div className="space-y-10">
          {faqs.map((group, gIndex) => (
            <div key={gIndex} className="space-y-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">{group.category}</h2>
              <div className="space-y-4">
                {group.questions.map((faq, qIndex) => {
                  const id = `${gIndex}-${qIndex}`;
                  const isOpen = openIndex === id;
                  return (
                    <motion.div 
                      key={id}
                      initial={false}
                      className={`border ${isOpen ? 'border-cyan-500/30 bg-cyan-950/20' : 'border-white/10 bg-slate-900/50'} rounded-2xl overflow-hidden transition-colors`}
                    >
                      <button 
                        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                        onClick={() => setOpenIndex(isOpen ? "" : id)}
                      >
                        <span className="font-semibold text-white pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Input } from '@/components/common/Input';
import { Search, Book, HelpCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpCenter() {
  const categories = [
    { title: 'Getting Started', icon: Book, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Managing Referrals', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Account & Security', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Troubleshooting', icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  const articles = [
    'How to accept an incoming critical referral',
    'Resetting your password securely',
    'Updating hospital ICU bed availability',
    'Connecting EHR data to MedLink AI',
    'Understanding the AI Severity score',
  ];

  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">How can we help you?</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Search our knowledge base or browse categories to find the answers you need.</p>
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, and more..." 
              className="w-full h-14 pl-12 pr-4 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const ActualIcon = cat.title.includes('Referrals') ? HeartPulse : cat.title.includes('Security') ? ShieldCheck : Icon;
            return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-white/5 hover:border-white/20 p-6 rounded-2xl cursor-pointer transition-all group hover:-translate-y-1 text-center"
            >
              <div className={`w-12 h-12 mx-auto rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <ActualIcon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold">{cat.title}</h3>
            </motion.div>
          )})}
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-500" /> Popular Articles
            </h2>
            <div className="space-y-3">
              {articles.map((article, i) => (
                <div key={i} className="group flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800/50 rounded-xl border border-white/5 cursor-pointer transition-all">
                  <span className="text-slate-300 group-hover:text-white transition-colors">{article}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-2xl p-8 text-center flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
            <p className="text-slate-400 mb-6">Our support team is available 24/7 to assist with critical medical network issues.</p>
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { HeartPulse, ShieldCheck, Shield, Activity } from 'lucide-react';

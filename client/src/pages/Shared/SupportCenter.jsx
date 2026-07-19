import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { LifeBuoy, FileText, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SupportCenter() {
  const tickets = [
    { id: 'TKT-992', title: 'Cannot integrate EHR API', status: 'In Progress', updated: '2 hours ago' },
    { id: 'TKT-984', title: 'Requesting new ambulance type', status: 'Resolved', updated: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <PageHeader title="Support Center" description="Manage your tickets and get expert help from our team." />

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Knowledge Base</h3>
            <p className="text-slate-400 text-sm mb-4">Browse articles, guides, and FAQ.</p>
            <Link to="/help"><Button variant="outline" className="w-full">Browse Articles</Button></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Live Chat</h3>
            <p className="text-slate-400 text-sm mb-4">Talk to a support agent right now.</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">Start Chat</Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-2">Priority Phone</h3>
            <p className="text-slate-400 text-sm mb-4">For critical network outages only.</p>
            <Button variant="outline" className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10">Call 1-800-MEDLINK</Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><LifeBuoy className="w-6 h-6 text-cyan-500" /> Recent Tickets</h3>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">New Ticket</Button>
          </div>
          
          <div className="space-y-3">
            {tickets.map((ticket, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                <div>
                  <h4 className="text-white font-medium">{ticket.title}</h4>
                  <div className="text-xs text-slate-500 flex gap-2 mt-1">
                    <span>{ticket.id}</span>•<span>Updated {ticket.updated}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Contact Our Team</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Have questions about integrating MedLink AI into your hospital? Our enterprise team is ready to help.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <MapPin className="w-6 h-6 text-cyan-500 mb-4" />
                <h3 className="text-white font-semibold mb-2">Global Headquarters</h3>
                <p className="text-slate-400 text-sm">1200 Tech Boulevard<br/>Suite 400<br/>San Francisco, CA 94107</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <Phone className="w-6 h-6 text-emerald-500 mb-4" />
                <h3 className="text-white font-semibold mb-2">Direct Phone</h3>
                <p className="text-slate-400 text-sm mb-1">Support: +1 (800) 555-0199</p>
                <p className="text-slate-400 text-sm">Sales: +1 (800) 555-0198</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <Mail className="w-6 h-6 text-purple-500 mb-4" />
                <h3 className="text-white font-semibold mb-2">Email Addresses</h3>
                <p className="text-slate-400 text-sm mb-1">Support: help@medlink.ai</p>
                <p className="text-slate-400 text-sm">Sales: enterprise@medlink.ai</p>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                <Clock className="w-6 h-6 text-amber-500 mb-4" />
                <h3 className="text-white font-semibold mb-2">Operating Hours</h3>
                <p className="text-slate-400 text-sm mb-1">System Monitoring: 24/7</p>
                <p className="text-slate-400 text-sm">Business Team: 9AM - 6PM EST</p>
              </div>
            </div>

            {/* Fake Map Placeholder */}
            <div className="w-full h-48 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <p className="text-slate-500 font-medium z-10 flex items-center gap-2"><MapPin className="w-4 h-4"/> Interactive Map UI</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Work Email</Label>
                <Input type="email" placeholder="john@hospital.org" />
              </div>
              <div className="space-y-2">
                <Label>Hospital / Organization</Label>
                <Input placeholder="Central General Hospital" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <textarea 
                  className="w-full min-h-[120px] p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white h-12 text-lg">Send Message</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

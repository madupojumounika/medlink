import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Star, MessageSquarePlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Feedback() {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#020817] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4 mb-8">
          <div className="w-16 h-16 mx-auto bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-6">
            <MessageSquarePlus className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Help us improve MedLink AI</h1>
          <p className="text-slate-400 text-lg">Your feedback directly shapes the future of emergency healthcare.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-8">
            
            <div className="space-y-4 text-center">
              <Label className="text-lg">How would you rate your platform experience?</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`w-10 h-10 transition-colors ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-amber-400/50'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-8">
              <Label>Feedback Type</Label>
              <select className="w-full h-12 px-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>General Suggestion</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Performance Issue</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Detailed Comments</Label>
              <textarea 
                className="w-full min-h-[150px] p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                placeholder="Please share your thoughts or describe the issue in detail..."
              ></textarea>
            </div>

            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white h-12 text-lg">Submit Feedback</Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

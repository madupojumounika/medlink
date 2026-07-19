import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="relative"
        >
          <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full"></div>
          <div className="w-32 h-32 mx-auto bg-slate-900/50 border border-white/10 rounded-full flex items-center justify-center relative z-10 shadow-2xl">
            <FileQuestion className="w-16 h-16 text-cyan-400" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h1 className="text-6xl font-black text-white tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
          <p className="text-slate-400">The route you are looking for has been moved, deleted, or does not exist within the MedLink AI network.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/">
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-white gap-2 px-8 h-12 text-lg rounded-xl">
              <ArrowLeft className="w-5 h-5" /> Return to Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

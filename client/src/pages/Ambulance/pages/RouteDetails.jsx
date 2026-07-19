import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';

export default function RouteDetails() {
  const instructions = [
    { text: 'Head north on Healthcare Blvd', dist: '0.2 mi' },
    { text: 'Turn right onto Main St', dist: '1.5 mi' },
    { text: 'Use the left 2 lanes to turn left onto Highway 101', dist: '2.0 mi' },
    { text: 'Take exit 4B for Trauma Center', dist: '0.5 mi' },
    { text: 'Destination will be on the right', dist: '0.1 mi' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Route Details" description="Turn-by-turn navigation instructions for active trip." />

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1 space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Trip Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-xs uppercase mb-1">Total Distance</p>
                <p className="text-xl font-bold text-white">4.3 miles</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase mb-1">Estimated Time</p>
                <p className="text-xl font-bold text-cyan-400">12 mins</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase mb-1">Traffic Conditions</p>
                <p className="text-sm font-medium text-emerald-400 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Light</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-semibold text-lg">Turn-by-Turn Navigation</h3>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              {instructions.map((step, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 text-slate-400 group-[.is-active]:bg-cyan-500/20 group-[.is-active]:text-cyan-400 group-[.is-active]:border-cyan-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-slate-950/20 z-10">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-slate-900/50 shadow shadow-slate-950/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-200">{step.text}</h4>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{step.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

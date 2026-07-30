import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/medical-team.png",
    "/images/doctors_masks.png",
    "/images/bright_smiling_doctors.png",
    "/images/patient-care.png",
    "/images/ambulance.png",
    "/images/command-center.png",
    "/images/doctor-tablet.png",
    "/images/doctor-cover-auth.png",
    "/images/new-real-ambulance.jpg",
    "/images/new-real-hospital.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Left side: Premium Image Showcase Card */}
      <div className="relative hidden h-full lg:flex items-center justify-center p-6 lg:p-12">
        <div className="w-full h-full max-h-[850px] relative rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 bg-emerald-50">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={images[currentIndex]} 
                alt="MedLink AI Healthcare Showcase" 
                className="w-full h-full object-cover object-center select-none pointer-events-none" 
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 to-transparent pointer-events-none mix-blend-multiply"></div>
          
          {/* Floating Brand Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-12 z-10 pointer-events-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-xl shadow-emerald-900/20 ring-4 ring-white/10">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <span className="text-4xl font-black tracking-tight text-white drop-shadow-md">MedLink <span className="text-emerald-400">AI</span></span>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                The Intelligent Ecosystem<br />for Healthcare Logistics.
              </h2>
              <p className="text-lg font-medium text-slate-300 max-w-md leading-relaxed">
                Connect hospitals, dispatch ambulances, and manage patient care seamlessly with our real-time AI network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Auth Forms */}
      <div className="p-6 sm:p-10 relative flex items-center justify-center min-h-screen bg-transparent text-slate-900 overflow-y-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px] max-w-md my-auto py-8">
          <div className="flex items-center justify-center lg:hidden mb-6 gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Activity className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">MedLink <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">AI</span></span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}






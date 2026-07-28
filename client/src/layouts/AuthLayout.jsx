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
    }, 2800);
    return () => clearInterval(timer);
  }, [images.length, currentIndex]);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-slate-950 font-sans selection:bg-emerald-500 selection:text-white">
      <div className="relative hidden h-full lg:block overflow-hidden bg-slate-950 border-r border-emerald-500/20 min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={currentIndex}
              initial={{ x: '100%', y: '-100%', opacity: 0, scale: 1.05 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={{ x: '-100%', y: '100%', opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={(e, { offset, velocity }) => {
                const threshold = 50;
                if (offset.x < -threshold || offset.y > threshold || velocity.x < -400) {
                  setCurrentIndex((prev) => (prev + 1) % images.length);
                } else if (offset.x > threshold || offset.y < -threshold || velocity.x > 400) {
                  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
                }
              }}
              className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <img 
                src={images[currentIndex]} 
                alt="MedLink AI Healthcare Showcase" 
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700 select-none pointer-events-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-6 sm:p-10 relative flex items-center justify-center min-h-screen bg-slate-950 text-white overflow-y-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px] max-w-md my-auto py-8">
          <div className="flex items-center justify-center lg:hidden mb-6 gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Activity className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">MedLink <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI</span></span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}






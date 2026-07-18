import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex overflow-hidden border-r">

        <div className="absolute inset-0 z-0 bg-[url('/images/auth-bg.png')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-slate-950/70 backdrop-blur-[2px]" />

        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-20 flex items-center text-lg font-bold tracking-tight">
          <Activity className="mr-2 h-6 w-6 text-primary" />
          MedLink AI
        </div>

        <div className="relative z-20 mt-auto mb-10 max-w-lg">
          <div className="mb-6 flex items-center space-x-2 text-primary opacity-90">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Enterprise Security</span>
          </div>
          <motion.blockquote 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            <p className="text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
              Transforming emergency resource allocation with uncompromising precision.
            </p>
            <footer className="text-sm font-medium text-slate-400">
              Trusted by 500+ top-tier healthcare institutions.
            </footer>
          </motion.blockquote>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          <div className="flex items-center justify-center lg:hidden mb-8">
            <Activity className="mr-2 h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">MedLink AI</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Stethoscope, Building, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

const roles = [
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Manage patient queues, referrals, and AI assessments.',
    icon: Stethoscope,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/50'
  },
  {
    id: 'hospital',
    title: 'Hospital',
    description: 'Manage resources, ICU availability, and incoming emergencies.',
    icon: Building,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/50'
  },
  {
    id: 'ambulance',
    title: 'Ambulance',
    description: 'Track fleet, accept dispatch requests, and route mapping.',
    icon: Truck,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    hoverBorder: 'hover:border-rose-500/50'
  },
  {
    id: 'admin',
    title: 'System Admin',
    description: 'Platform oversight, analytics, and user management.',
    icon: ShieldCheck,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/50'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col space-y-8 w-full max-w-4xl mx-auto py-8"
    >
      <div className="flex flex-col space-y-3 text-center">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-white">
          Join the MedLink AI Network
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-2xl mx-auto">
          Choose your account type to access specialized tools tailored for your role in the healthcare ecosystem.
        </motion.p>
      </div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            variants={itemVariants}
            onClick={() => navigate(`/auth/register/${role.id}`)}
            className={`
              relative overflow-hidden cursor-pointer group rounded-2xl border p-6
              transition-all duration-300 ease-in-out
              bg-slate-900/50 backdrop-blur-sm
              ${role.border} ${role.hoverBorder} hover:shadow-lg hover:shadow-${role.color.split('-')[1]}-500/10
            `}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${role.bg}`}>
                <role.icon className={`w-8 h-8 ${role.color}`} />
              </div>
              <div className={`
                p-2 rounded-full border border-white/5 bg-white/5 opacity-0 -translate-x-4
                group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300
              `}>
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-50 transition-colors">
                {role.title}
              </h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                {role.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="text-center pt-8">
        <p className="text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

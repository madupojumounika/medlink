import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

const roles = [
  {
    id: 'hospital',
    title: 'Hospital',
    description: 'Manage resources, ICU availability, and incoming emergencies.',
    icon: Building,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-200'
  },
  {
    id: 'ambulance',
    title: 'Ambulance',
    description: 'Track fleet, accept dispatch requests, and route mapping.',
    icon: Truck,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    hoverBg: 'hover:bg-rose-50',
    hoverBorder: 'hover:border-rose-200'
  }
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-8 w-full max-w-4xl mx-auto py-8 p-8 sm:p-10 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-3 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Join the MedLink AI Network
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Choose your account type to access specialized tools tailored for your role in the healthcare ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => navigate(`/auth/register/${role.id}`)}
            className={`group cursor-pointer border p-6 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 bg-white border-slate-100 shadow-sm ${role.hoverBg} ${role.hoverBorder} relative overflow-hidden`}
          >
            <div className="flex items-start justify-between w-full">
              <div className={`p-4 rounded-full ${role.bg} group-hover:scale-110 transition-transform duration-300`}>
                <role.icon className={`w-8 h-8 ${role.color}`} />
              </div>
              <div className="p-2 rounded-full border border-slate-200 bg-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm">
                <ArrowRight className="w-5 h-5 text-slate-700" />
              </div>
            </div>
            
            <div className="mt-2 space-y-1">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {role.title}
              </h3>
              <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                {role.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

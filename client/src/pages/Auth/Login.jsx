import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2, Building, Stethoscope, Activity, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Checkbox } from '@/components/common/Checkbox';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email or User ID is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const roles = [
  { id: 'hospital_admin', title: 'Hospital Admin', icon: Building, color: 'text-blue-600', hoverBg: 'hover:bg-blue-50', hoverBorder: 'hover:border-blue-200' },
  { id: 'doctor', title: 'Doctor', icon: Stethoscope, color: 'text-cyan-600', hoverBg: 'hover:bg-cyan-50', hoverBorder: 'hover:border-cyan-200' },
  { id: 'referral_coordinator', title: 'Referral Coordinator', icon: Activity, color: 'text-emerald-600', hoverBg: 'hover:bg-emerald-50', hoverBorder: 'hover:border-emerald-200' },
  { id: 'ambulance', title: 'Ambulance Driver', icon: Truck, color: 'text-rose-600', hoverBg: 'hover:bg-rose-50', hoverBorder: 'hover:border-rose-200' },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    }
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const user = await login(data.email, data.password);

      // Auto-redirect based on role
      let dashboardPath = `/dashboard/${user.role}`;
      if (user.role === 'hospital_admin') dashboardPath = '/dashboard/hospital';
      if (user.role === 'referral_coordinator') dashboardPath = '/dashboard/coordinator';
      if (user.role === 'system_admin') dashboardPath = '/dashboard/admin';

      const redirectPath = location.state?.from?.pathname || dashboardPath;
      navigate(redirectPath, { replace: true });

    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="flex flex-col space-y-8 w-full max-w-xl mx-auto p-8 sm:p-10 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col space-y-3 text-center mb-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Select Your Role</h1>
          <p className="text-sm text-slate-600">Choose your portal to login to the MedLink network.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.id} onClick={() => setSelectedRole(r)} className={`group cursor-pointer border p-6 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 bg-white border-slate-100 shadow-sm ${r.hoverBg} ${r.hoverBorder}`}>
              <div className="p-4 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-300">
                <r.icon className={`w-8 h-8 ${r.color}`} />
              </div>
              <span className="font-semibold text-slate-900">{r.title}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-600 mt-6">
          Hospital doesn't have an account?{' '}
          <Link to="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">Sign up</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full max-w-md mx-auto p-8 sm:p-10 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col space-y-3 text-center relative mb-4">
        <button onClick={() => setSelectedRole(null)} className="absolute left-0 top-1 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{selectedRole.title} Login</h1>
        <p className="text-sm text-slate-600">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {errorMsg && (
          <div className="p-3 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-200 text-center">
            {errorMsg}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-medium">{selectedRole?.id === 'doctor' ? 'User ID or Email' : 'Email'}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type={selectedRole?.id === 'doctor' ? 'text' : 'email'}
              placeholder={selectedRole?.id === 'doctor' ? 'e.g. sarah492 or name@example.com' : 'name@example.com'}
              className="pl-10 bg-white border-slate-200 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl shadow-sm"
              disabled={isLoading}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm font-medium text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-10 pr-10 bg-white border-slate-200 focus:border-emerald-500 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl shadow-sm"
              disabled={isLoading}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm font-medium text-rose-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3 pb-4">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setValue('rememberMe', e.target.checked)}
            disabled={isLoading}
            className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
          />
          <Label htmlFor="rememberMe" className="font-medium cursor-pointer text-slate-600 text-sm">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
          ) : (
            <><LogIn className="mr-2 h-4 w-4" /> Sign In</>
          )}
        </Button>
      </form>
    </div>
  );
}

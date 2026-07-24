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
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const roles = [
  { id: 'hospital_admin', title: 'Hospital Admin', icon: Building, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hover: 'hover:border-blue-500/50' },
  { id: 'doctor', title: 'Doctor', icon: Stethoscope, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/50' },
  { id: 'referral_coordinator', title: 'Referral Coordinator', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50' },
  { id: 'ambulance', title: 'Ambulance Driver', icon: Truck, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', hover: 'hover:border-rose-500/50' },
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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col space-y-6 w-full max-w-xl mx-auto">
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">Select Your Role</h1>
          <p className="text-sm text-muted-foreground">Choose your portal to login to the MedLink network.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.id} onClick={() => setSelectedRole(r)} className={`cursor-pointer border p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all bg-slate-900/50 ${r.border} ${r.hover} hover:bg-slate-800/50`}>
              <div className={`p-4 rounded-xl ${r.bg}`}>
                <r.icon className={`w-8 h-8 ${r.color}`} />
              </div>
              <span className="font-semibold text-white">{r.title}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Hospital doesn't have an account?{' '}
          <Link to="/auth/register" className="font-semibold text-cyan-400 hover:text-cyan-300">Sign up</Link>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col space-y-6 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col space-y-2 text-center relative">
        <button onClick={() => setSelectedRole(null)} className="absolute left-0 top-1 text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-white">{selectedRole.title} Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20 text-center">
            {errorMsg}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-9"
              disabled={isLoading}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-9 pr-10"
              disabled={isLoading}
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 pb-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue('rememberMe', checked)}
            disabled={isLoading}
          />
          <Label htmlFor="rememberMe" className="font-normal cursor-pointer text-muted-foreground">
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
          ) : (
            <><LogIn className="mr-2 h-4 w-4" /> Sign In</>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Phone, Briefcase, Hash, Building, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { useAuth } from '@/hooks/useAuth';

const getRoleConfig = (role) => {
  switch (role) {
    case 'hospital':
      return {
        title: 'Hospital Registration',
        schema: {
          hospitalName: z.string().min(2, 'Hospital name is required'),
          registrationNumber: z.string().min(4, 'Registration number is required'),
          adminName: z.string().min(2, 'Administrator name is required'),
          email: z.string().email('Valid email is required'),
          password: z.string().min(8, 'Minimum 8 characters'),
          confirmPassword: z.string(),
          phone: z.string().min(10, 'Valid phone number is required'),
          address: z.string().min(5, 'Full address is required'),
          icuBeds: z.string().min(1, 'Number of ICU beds is required'),
          emergencyContact: z.string().min(10, 'Emergency contact is required')
        },
        fields: [
          { name: 'hospitalName', label: 'Hospital Name', icon: Building, type: 'text', placeholder: 'City General Hospital' },
          { name: 'registrationNumber', label: 'Registration Number', icon: Hash, type: 'text', placeholder: 'HOSP-987654' },
          { name: 'adminName', label: 'Administrator Name', icon: User, type: 'text', placeholder: 'John Smith' },
          { name: 'email', label: 'Admin Email', icon: Mail, type: 'email', placeholder: 'admin@hospital.org' },
          { name: 'phone', label: 'Primary Phone', icon: Phone, type: 'tel', placeholder: '+1 234 567 8900' },
          { name: 'emergencyContact', label: 'Emergency Contact Number', icon: Phone, type: 'tel', placeholder: '+1 234 567 9111' },
          { name: 'address', label: 'Full Address', icon: MapPin, type: 'text', placeholder: '123 Medical Way, City, State' },
          { name: 'icuBeds', label: 'Number of ICU Beds', icon: Hash, type: 'number', placeholder: '20' }
        ]
      };
    case 'ambulance':
      return {
        title: 'Ambulance Registration',
        schema: {
          driverName: z.string().min(2, 'Driver name is required'),
          email: z.string().email('Valid email is required'),
          password: z.string().min(8, 'Minimum 8 characters'),
          confirmPassword: z.string(),
          phone: z.string().min(10, 'Valid phone number is required'),
          licenseNumber: z.string().min(4, 'Driver license is required'),
          registrationNumber: z.string().min(4, 'Ambulance registration is required'),
          organization: z.string().min(2, 'Organization is required'),
          experience: z.string().min(1, 'Years of experience is required')
        },
        fields: [
          { name: 'driverName', label: 'Driver Name', icon: User, type: 'text', placeholder: 'Mike Johnson' },
          { name: 'email', label: 'Email', icon: Mail, type: 'email', placeholder: 'mike@ems.org' },
          { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 234 567 8900' },
          { name: 'licenseNumber', label: 'Driver License Number', icon: Hash, type: 'text', placeholder: 'DL-9876543' },
          { name: 'registrationNumber', label: 'Ambulance Registration', icon: Truck, type: 'text', placeholder: 'AMB-456' },
          { name: 'organization', label: 'Organization / Hospital', icon: Building, type: 'text', placeholder: 'City EMS Services' },
          { name: 'experience', label: 'Years of Experience', icon: Hash, type: 'number', placeholder: '3' }
        ]
      };
    default:
      return null;
  }
};

export default function Register() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const config = getRoleConfig(role);

  // Fallback if accessed with invalid role
  if (!config) {
    return <Navigate to="/auth/register" replace />;
  }

  // Create schema dynamically with confirmPassword validation
  const registerSchema = z.object(config.schema).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await registerAuth(data, role);
      navigate('/auth/login');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">{config.title}</h1>
        <p className="text-sm text-muted-foreground">
          Fill in your details below to create your {role} account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {errorMsg && (
          <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20 text-center">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <div className="relative">
                <field.icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="pl-9"
                  disabled={isLoading}
                  {...formRegister(field.name)}
                />
              </div>
              {errors[field.name] && <p className="text-xs font-medium text-destructive">{errors[field.name].message}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-9 pr-10"
                disabled={isLoading}
                {...formRegister('password')}
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
            {errors.password && <p className="text-xs font-medium text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-9 pr-10"
                disabled={isLoading}
                {...formRegister('confirmPassword')}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs font-medium text-destructive">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button variant="outline" type="button" onClick={() => navigate('/auth/register')} className="w-full">
            Back to Roles
          </Button>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

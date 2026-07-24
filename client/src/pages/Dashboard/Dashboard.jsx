import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/common/Loader';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'hospital_admin') {
        navigate('/dashboard/hospital', { replace: true });
      } else if (user.role === 'doctor') {
        navigate('/dashboard/doctor', { replace: true });
      } else if (user.role === 'referral_coordinator') {
        navigate('/dashboard/coordinator', { replace: true });
      } else if (user.role === 'ambulance') {
        navigate('/dashboard/ambulance', { replace: true });
      } else if (user.role === 'system_admin') {
        navigate('/dashboard/admin', { replace: true });
      } else {
        // Fallback for unknown role
        navigate('/', { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  return <div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>;
}

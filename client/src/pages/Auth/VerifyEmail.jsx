import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading'); 

  useEffect(() => {

    if (!token) {
      setStatus('error');
      return;
    }

    const verify = async () => {

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (token === 'invalid') {
        setStatus('error');
      } else {
        setStatus('success');
      }
    };

    verify();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto text-center"
    >
      {status === 'loading' && (
        <>
          <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Verifying Email</h1>
          <p className="text-muted-foreground text-lg">
            Please wait while we verify your email address. This will only take a moment.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Email Verified!</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Your email address has been successfully verified. Your account is now active and ready to use.
          </p>
          <Link to="/auth/login" className="w-full">
            <Button size="lg" className="w-full h-12 text-md">
              Continue to Login <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 border border-red-200 dark:border-red-800">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Verification Failed</h1>
          <p className="text-muted-foreground text-lg mb-6">
            The verification link is invalid or has expired. Please request a new verification email.
          </p>
          <div className="flex flex-col w-full space-y-3">
            <Button size="lg" className="w-full">
              Resend Verification Email
            </Button>
            <Link to="/auth/login" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Back to Login
              </Button>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
}

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const Landing = lazy(() => import('@/pages/Landing/Landing'));
const Features = lazy(() => import('@/pages/Features/Features'));
const About = lazy(() => import('@/pages/About/About'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword'));
const VerifyEmail = lazy(() => import('@/pages/Auth/VerifyEmail'));
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const Hospital = lazy(() => import('@/pages/Hospital/Hospital'));
const Doctor = lazy(() => import('@/pages/Doctor/Doctor'));
const Patient = lazy(() => import('@/pages/Patient/Patient'));
const Ambulance = lazy(() => import('@/pages/Ambulance/Ambulance'));
const Admin = lazy(() => import('@/pages/Admin/Admin'));
const Analytics = lazy(() => import('@/pages/Analytics/Analytics'));
const Settings = lazy(() => import('@/pages/Settings/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader size="lg" /></div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route element={<MainLayout />}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Route>

          <Route path="/auth" element={<PageTransition><AuthLayout /></PageTransition>}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>

          <Route path="/dashboard" element={<PageTransition><DashboardLayout /></PageTransition>}>
            <Route index element={<Dashboard />} />
            <Route path="hospital" element={<Hospital />} />
            <Route path="doctor" element={<Doctor />} />
            <Route path="patient" element={<Patient />} />
            <Route path="ambulance" element={<Ambulance />} />
            <Route path="admin" element={<Admin />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

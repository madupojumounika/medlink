import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { RoleRoute } from '@/components/common/RoleRoute';

const Landing = lazy(() => import('@/pages/Landing/Landing.jsx'));
const Features = lazy(() => import('@/pages/Features/Features.jsx'));
const About = lazy(() => import('@/pages/Shared/About.jsx'));
const Contact = lazy(() => import('@/pages/Shared/ContactUs.jsx'));
const FAQ = lazy(() => import('@/pages/Shared/FAQ.jsx'));
const PrivacyPolicy = lazy(() => import('@/pages/Shared/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('@/pages/Shared/Terms.jsx'));
const HelpCenter = lazy(() => import('@/pages/Shared/HelpCenter.jsx'));
const SupportCenter = lazy(() => import('@/pages/Shared/SupportCenter.jsx'));
const Feedback = lazy(() => import('@/pages/Shared/Feedback.jsx'));

const Login = lazy(() => import('@/pages/Auth/Login.jsx'));
const Register = lazy(() => import('@/pages/Auth/Register.jsx'));
const RoleSelection = lazy(() => import('@/pages/Auth/RoleSelection.jsx'));
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword.jsx'));
const VerifyEmail = lazy(() => import('@/pages/Auth/VerifyEmail.jsx'));

const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard.jsx'));
const HospitalRoutes = lazy(() => import('@/pages/Hospital/HospitalRoutes.jsx'));
const DoctorRoutes = lazy(() => import('@/pages/Doctor/DoctorRoutes.jsx'));
const Patient = lazy(() => import('@/pages/Patient/Patient.jsx'));
const AmbulanceRoutes = lazy(() => import('@/pages/Ambulance/AmbulanceRoutes.jsx'));
const AdminRoutes = lazy(() => import('@/pages/Admin/AdminRoutes.jsx'));
const AnalyticsRoutes = lazy(() => import('@/pages/Analytics/AnalyticsRoutes.jsx'));

const AccountSettings = lazy(() => import('@/pages/Shared/AccountSettings.jsx'));
const UserProfile = lazy(() => import('@/pages/Shared/UserProfile.jsx'));
const NotificationsCenter = lazy(() => import('@/pages/Shared/NotificationsCenter.jsx'));

const NotFound = lazy(() => import('@/pages/Shared/NotFound.jsx'));
const ServerError = lazy(() => import('@/pages/Shared/ServerError.jsx'));
const Maintenance = lazy(() => import('@/pages/Shared/Maintenance.jsx'));

export function AppRoutes() {
  const location = useLocation();

  return (
    <AuthProvider>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader size="lg" /></div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route element={<MainLayout />}>
              <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
              <Route path="/features" element={<PageTransition><Features /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              <Route path="/help" element={<PageTransition><HelpCenter /></PageTransition>} />
              <Route path="/support" element={<PageTransition><SupportCenter /></PageTransition>} />
              <Route path="/feedback" element={<PageTransition><Feedback /></PageTransition>} />
            </Route>

            <Route path="/auth" element={<PageTransition><AuthLayout /></PageTransition>}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RoleSelection />} />
              <Route path="register/:role" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="verify-email" element={<VerifyEmail />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedRoute><PageTransition><DashboardLayout /></PageTransition></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              
              <Route path="hospital/*" element={<RoleRoute allowedRoles={['hospital']}><HospitalRoutes /></RoleRoute>} />
              <Route path="doctor/*" element={<RoleRoute allowedRoles={['doctor']}><DoctorRoutes /></RoleRoute>} />
              <Route path="ambulance/*" element={<RoleRoute allowedRoles={['ambulance']}><AmbulanceRoutes /></RoleRoute>} />
              <Route path="admin/*" element={<RoleRoute allowedRoles={['admin']}><AdminRoutes /></RoleRoute>} />
              
              {/* Other modules available to specific roles or multiple roles if needed */}
              <Route path="patient" element={<Patient />} />
              <Route path="analytics/*" element={<RoleRoute allowedRoles={['admin', 'hospital']}><AnalyticsRoutes /></RoleRoute>} />
              
              <Route path="settings" element={<AccountSettings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="notifications" element={<NotificationsCenter />} />
            </Route>

            <Route path="/500" element={<PageTransition><ServerError /></PageTransition>} />
            <Route path="/maintenance" element={<PageTransition><Maintenance /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </AuthProvider>
  );
}

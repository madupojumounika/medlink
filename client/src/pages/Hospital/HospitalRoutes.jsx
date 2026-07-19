import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const HospitalDashboard = lazy(() => import('./pages/HospitalDashboard.jsx'));
const HospitalProfile = lazy(() => import('./pages/HospitalProfile.jsx'));
const ICUAvailability = lazy(() => import('./pages/ICUAvailability.jsx'));
const ResourceManagement = lazy(() => import('./pages/ResourceManagement.jsx'));
const DoctorManagement = lazy(() => import('./pages/DoctorManagement.jsx'));
const Referrals = lazy(() => import('./pages/Referrals.jsx'));
const EmergencyQueue = lazy(() => import('./pages/EmergencyQueue.jsx'));
const HospitalSettings = lazy(() => import('./pages/HospitalSettings.jsx'));

export default function HospitalRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><HospitalDashboard /></PageTransition>} />
        <Route path="profile" element={<PageTransition><HospitalProfile /></PageTransition>} />
        <Route path="icu" element={<PageTransition><ICUAvailability /></PageTransition>} />
        <Route path="resources" element={<PageTransition><ResourceManagement /></PageTransition>} />
        <Route path="doctors" element={<PageTransition><DoctorManagement /></PageTransition>} />
        <Route path="referrals" element={<PageTransition><Referrals /></PageTransition>} />
        <Route path="patients" element={<PageTransition><EmergencyQueue /></PageTransition>} />
        <Route path="settings" element={<PageTransition><HospitalSettings /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

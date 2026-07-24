import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const DoctorDashboard = lazy(() => import('./pages/DoctorDashboard.jsx'));
const PatientRegistration = lazy(() => import('./pages/PatientRegistration.jsx'));
const PatientDetails = lazy(() => import('./pages/PatientDetails.jsx'));
const PatientList = lazy(() => import('./pages/PatientList.jsx'));
const Notifications = lazy(() => import('./pages/Notifications.jsx'));
const DoctorProfile = lazy(() => import('./pages/DoctorProfile.jsx'));

export default function DoctorRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><DoctorDashboard /></PageTransition>} />
        <Route path="patients" element={<PageTransition><PatientList /></PageTransition>} />
        <Route path="add-patient" element={<PageTransition><PatientRegistration /></PageTransition>} />
        <Route path="patients/:id" element={<PageTransition><PatientDetails /></PageTransition>} />
        <Route path="history" element={<PageTransition><PatientList historyMode={true} /></PageTransition>} />
        <Route path="notifications" element={<PageTransition><Notifications /></PageTransition>} />
        <Route path="profile" element={<PageTransition><DoctorProfile /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

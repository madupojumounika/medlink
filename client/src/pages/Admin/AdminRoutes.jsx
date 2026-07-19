import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const ManageHospitals = lazy(() => import('./pages/ManageHospitals.jsx'));
const ManageDoctors = lazy(() => import('./pages/ManageDoctors.jsx'));
const ManageAmbulances = lazy(() => import('./pages/ManageAmbulances.jsx'));
const ManagePatients = lazy(() => import('./pages/ManagePatients.jsx'));
const EmergencyMonitoring = lazy(() => import('./pages/EmergencyMonitoring.jsx'));
const AnalyticsOverview = lazy(() => import('./pages/AnalyticsOverview.jsx'));
const Reports = lazy(() => import('./pages/Reports.jsx'));
const UserRoles = lazy(() => import('./pages/UserRoles.jsx'));
const SystemSettings = lazy(() => import('./pages/SystemSettings.jsx'));

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="hospitals" element={<PageTransition><ManageHospitals /></PageTransition>} />
        <Route path="doctors" element={<PageTransition><ManageDoctors /></PageTransition>} />
        <Route path="ambulances" element={<PageTransition><ManageAmbulances /></PageTransition>} />
        <Route path="patients" element={<PageTransition><ManagePatients /></PageTransition>} />
        <Route path="monitoring" element={<PageTransition><EmergencyMonitoring /></PageTransition>} />
        <Route path="analytics" element={<PageTransition><AnalyticsOverview /></PageTransition>} />
        <Route path="reports" element={<PageTransition><Reports /></PageTransition>} />
        <Route path="roles" element={<PageTransition><UserRoles /></PageTransition>} />
        <Route path="settings" element={<PageTransition><SystemSettings /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

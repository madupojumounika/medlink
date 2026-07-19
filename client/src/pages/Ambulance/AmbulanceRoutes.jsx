import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const AmbulanceDashboard = lazy(() => import('./pages/AmbulanceDashboard.jsx'));
const AvailableRequests = lazy(() => import('./pages/AvailableRequests.jsx'));
const AssignedRequests = lazy(() => import('./pages/AssignedRequests.jsx'));
const LiveMap = lazy(() => import('./pages/LiveMap.jsx'));
const RouteDetails = lazy(() => import('./pages/RouteDetails.jsx'));
const TripHistory = lazy(() => import('./pages/TripHistory.jsx'));
const DriverProfile = lazy(() => import('./pages/DriverProfile.jsx'));
const AmbulanceSettings = lazy(() => import('./pages/AmbulanceSettings.jsx'));

export default function AmbulanceRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><AmbulanceDashboard /></PageTransition>} />
        <Route path="requests/available" element={<PageTransition><AvailableRequests /></PageTransition>} />
        <Route path="requests/assigned" element={<PageTransition><AssignedRequests /></PageTransition>} />
        <Route path="map" element={<PageTransition><LiveMap /></PageTransition>} />
        <Route path="route" element={<PageTransition><RouteDetails /></PageTransition>} />
        <Route path="history" element={<PageTransition><TripHistory /></PageTransition>} />
        <Route path="profile" element={<PageTransition><DriverProfile /></PageTransition>} />
        <Route path="settings" element={<PageTransition><AmbulanceSettings /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

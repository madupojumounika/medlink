import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const AnalyticsDashboard = lazy(() => import('./pages/AnalyticsDashboard.jsx'));
const EmergencyAnalytics = lazy(() => import('./pages/EmergencyAnalytics.jsx'));
const HospitalPerformance = lazy(() => import('./pages/HospitalPerformance.jsx'));
const AmbulancePerformance = lazy(() => import('./pages/AmbulancePerformance.jsx'));
const ReferralAnalytics = lazy(() => import('./pages/ReferralAnalytics.jsx'));
const ResourceUtilization = lazy(() => import('./pages/ResourceUtilization.jsx'));
const AISeverityInsights = lazy(() => import('./pages/AISeverityInsights.jsx'));
const ExportCenter = lazy(() => import('./pages/ExportCenter.jsx'));

export default function AnalyticsRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><AnalyticsDashboard /></PageTransition>} />
        <Route path="emergencies" element={<PageTransition><EmergencyAnalytics /></PageTransition>} />
        <Route path="hospitals" element={<PageTransition><HospitalPerformance /></PageTransition>} />
        <Route path="ambulances" element={<PageTransition><AmbulancePerformance /></PageTransition>} />
        <Route path="referrals" element={<PageTransition><ReferralAnalytics /></PageTransition>} />
        <Route path="resources" element={<PageTransition><ResourceUtilization /></PageTransition>} />
        <Route path="ai-insights" element={<PageTransition><AISeverityInsights /></PageTransition>} />
        <Route path="export" element={<PageTransition><ExportCenter /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

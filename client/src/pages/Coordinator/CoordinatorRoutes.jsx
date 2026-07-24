import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { PageTransition } from '@/components/common/PageTransition';

const CoordinatorDashboard = lazy(() => import('./pages/CoordinatorDashboard.jsx'));
const InternalQueue = lazy(() => import('./pages/InternalQueue.jsx'));
const ReferralDetails = lazy(() => import('./pages/ReferralDetails.jsx'));

export default function CoordinatorRoutes() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center p-12"><Loader size="lg" /></div>}>
      <Routes>
        <Route index element={<PageTransition><CoordinatorDashboard /></PageTransition>} />
        <Route path="queue" element={<PageTransition><InternalQueue /></PageTransition>} />
        <Route path="history" element={<PageTransition><InternalQueue historyMode={true} /></PageTransition>} />
        <Route path="referrals/:id" element={<PageTransition><ReferralDetails /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}

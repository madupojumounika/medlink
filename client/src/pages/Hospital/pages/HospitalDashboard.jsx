import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Activity, Bed, Users, AlertTriangle, ShieldCheck, Clock, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { useNavigate } from 'react-router-dom';

// Clean, neutral Vercel-style Spotlight Card Component
const SpotlightCard = ({ children, className = "", onClick }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={onClick}
      whileHover={{ scale: onClick ? 0.998 : 1 }}
      className={`relative overflow-hidden rounded-xl border border-border bg-card/60 hover:border-border/80 hover:bg-card transition-all duration-200 ${onClick ? 'cursor-pointer shadow-sm hover:shadow' : ''
        } ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-xl"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(120, 120, 120, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Helper for formatted time
const formatTime = (dateString) => {
  if (!dateString) return 'Just now';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return 'Recently';
  }
};

export default function HospitalDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = async (referralId, action) => {
    setIsProcessing(true);
    try {
      await api.post(`/v1/referrals/${referralId}/${action}`);
      setIsModalOpen(false);
      setSelectedReferral(null);
      await fetchStats();
    } catch (err) {
      console.error(`Failed to ${action} referral`, err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/v1/hospitals/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  const activeEmergencies = stats?.activeEmergencies || [];

  return (
    <div className="space-y-6">
      <PageHeader title="Hospital Command Center" description="Real-time overview of hospital capacity and incoming emergencies." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Available ICU Beds" value={stats?.availableICUBeds || 0} description={`Out of ${stats?.totalICUBeds || 0} total`} icon={Bed} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Incoming Referrals" value={stats?.incomingReferralsCount || 0} description="Awaiting review" icon={AlertTriangle} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Active Doctors" value={stats?.activeDoctorsCount || 0} description="Currently on shift" icon={Users} trend={{ isPositive: true, value: 0 }} />
        <MetricCard title="Avg Triage Time" value={stats?.avgTriageTime || "N/A"} description="Past 24 hours" icon={Activity} trend={{ isPositive: true, value: 0 }} />
      </div>

      {/* Clean, Professional Hackathon-Ready Incoming Emergencies Section */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.25 }}>
        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6">
          {/* Section Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-muted/60 border border-border text-foreground flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-2">
                  Incoming Emergencies
                </h3>
                <p className="text-xs text-muted-foreground">
                  Live telemetry of high-acuity patient arrivals and trauma transfers
                </p>
              </div>
            </div>

            {/* Status Pill Badge */}
            <div className="self-start sm:self-center">
              {activeEmergencies.length > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  {activeEmergencies.length} {activeEmergencies.length === 1 ? 'case active' : 'cases active'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/80 text-muted-foreground border border-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  All clear (0 active)
                </span>
              )}
            </div>
          </div>

          {/* Content Area */}
          {activeEmergencies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEmergencies.map((row) => {
                const patientName = row.patientId?.name || 'Unknown Patient';
                const originHospital = row.fromHospitalId?.name || 'External Facility';
                const priority = row.priority || 'Medium';
                const diagnosis = row.patientId?.diagnosis || row.diagnosis || 'Emergency triage in progress';

                return (
                  <SpotlightCard
                    key={row._id}
                    onClick={() => {
                      setSelectedReferral(row);
                      setIsModalOpen(true);
                    }}
                    className="p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-muted border border-border/80 flex items-center justify-center font-semibold text-xs text-foreground shrink-0">
                            {patientName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm text-foreground truncate">
                              {patientName}
                            </h4>
                            <p className="text-[11px] font-mono text-muted-foreground">
                              ID: #{row._id?.slice(-6).toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <StatusBadge status={priority === 'Critical' ? 'critical' : priority === 'High' ? 'pending' : 'stable'}>
                          {priority}
                        </StatusBadge>
                      </div>

                      <div className="py-2.5 px-3 rounded-lg bg-muted/30 border border-border/40 space-y-1 mb-3">
                        <p className="text-xs text-muted-foreground truncate">
                          <span className="font-medium text-foreground">Diagnosis: </span>
                          {diagnosis}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          <span className="font-medium text-foreground">Origin: </span>
                          {row.fromHospitalId?.hospitalName || 'External Facility'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-muted-foreground/70" />
                        {formatTime(row.sentAt || row.createdAt || row.updatedAt)}
                      </span>
                      <span className="font-medium text-primary hover:underline inline-flex items-center gap-0.5">
                        Review case <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          ) : (
            <div className="py-12 px-4 text-center rounded-xl border border-dashed border-border bg-muted/20 my-2">
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground mx-auto mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                No active incoming emergencies
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
                When emergency departments or ambulances dispatch high-acuity transfers to this hospital, they will appear here in real time.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Review Incoming Referral"
        footer={
          <div className="flex w-full gap-3 mt-4">
            <Button
              disabled={isProcessing}
              variant="outline"
              onClick={() => handleAction(selectedReferral?._id, 'reject')}
              className="flex-1 border-border text-rose-600 hover:bg-rose-500/10 hover:border-rose-500/30"
            >
              <XCircle className="w-4 h-4 mr-2" /> Decline Transfer
            </Button>
            <Button
              disabled={isProcessing}
              onClick={() => handleAction(selectedReferral?._id, 'accept')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" /> Accept & Allocate Bed
            </Button>
          </div>
        }
      >
        {selectedReferral && (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{selectedReferral.patientId?.name || 'Unknown Patient'}</h4>
                <p className="text-sm text-muted-foreground">ID: #{selectedReferral._id?.slice(-6).toUpperCase()}</p>
              </div>
              <StatusBadge status={selectedReferral.priority === 'Critical' ? 'critical' : selectedReferral.priority === 'High' ? 'pending' : 'stable'}>
                {selectedReferral.priority || 'Medium'}
              </StatusBadge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Origin Hospital</p>
                <p className="text-sm font-medium">{selectedReferral.fromHospitalId?.hospitalName || 'External Facility'}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Referring Doctor</p>
                <p className="text-sm font-medium">Dr. {selectedReferral.doctorId?.fullName || 'Attending'}</p>
              </div>
            </div>

            <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Diagnosis</p>
              <p className="text-sm font-medium">{selectedReferral.patientId?.diagnosis || selectedReferral.diagnosis || 'Emergency triage in progress'}</p>
            </div>
            
            {selectedReferral.patientId?.requiredResources && Object.values(selectedReferral.patientId.requiredResources).some(v => v === true) && (
              <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Required Resources</p>
                <div className="flex flex-wrap gap-2">
                  {selectedReferral.patientId.requiredResources.needsICU && (
                    <span className="px-2 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-md text-xs font-semibold">ICU Bed</span>
                  )}
                  {selectedReferral.patientId.requiredResources.needsVentilator && (
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-md text-xs font-semibold">Ventilator</span>
                  )}
                  {selectedReferral.patientId.requiredResources.needsBlood && (
                    <span className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-md text-xs font-semibold">Blood Required</span>
                  )}
                  {selectedReferral.patientId.requiredResources.needsOperationTheatre && (
                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-md text-xs font-semibold">Operation Theatre</span>
                  )}
                  {selectedReferral.patientId.requiredResources.needsGeneralBed && (
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-md text-xs font-semibold">General Bed</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

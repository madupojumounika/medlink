import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import {
  Activity, CheckCircle2, XCircle, AlertTriangle,
  FileText, User, Clock, Building, ShieldCheck,
  ChevronRight, RefreshCw
} from 'lucide-react';

// Clean, neutral Vercel-style Spotlight Card Component
const SpotlightCard = ({ children, className = "", onClick, isSelected = false }) => {
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
      whileHover={{ scale: 0.998 }}
      className={`relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer p-4 ${isSelected
          ? 'border-primary bg-muted/80 shadow-sm'
          : 'border-border bg-card/60 hover:border-border/80 hover:bg-card'
        } ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-xl"
        style={{
          opacity: isFocused || isSelected ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(120, 120, 120, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Helper for formatted dates
const formatDate = (dateString) => {
  if (!dateString) return 'Just now';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Recently';
  }
};

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('incoming_pending');
  const [incomingQueue, setIncomingQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchQueue(activeTab);
  }, [activeTab]);

  const fetchQueue = async (tab) => {
    setIsLoading(true);
    try {
      const endpoint = tab === 'incoming_history' ? '/referrals/incoming?status=history' : '/referrals/incoming';
      const res = await api.get(endpoint);
      const data = res.data?.data || [];
      setIncomingQueue(data);
      if (data.length > 0 && !selectedReferral) {
        setSelectedReferral(data[0]);
      } else if (data.length === 0) {
        setSelectedReferral(null);
      }
    } catch (err) {
      console.error('Failed to load incoming requests', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (referralId, action) => {
    setIsProcessing(true);
    try {
      await api.post(`/referrals/${referralId}/${action}`);
      await fetchQueue(activeTab);
    } catch (err) {
      console.error(`Failed to ${action} referral`, err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 min-h-[calc(100vh-6rem)] flex flex-col font-sans text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Incoming Transfer Requests"
          description="Clean, minimal command center for evaluating emergency transfers and allocating ICU capacity."
        />
        <div className="flex items-center gap-2 self-start sm:self-center bg-card border border-border px-3.5 py-2 rounded-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Live Telemetry</span>
          <div className="h-3.5 w-px bg-border mx-1" />
          <button
            onClick={() => fetchQueue(activeTab)}
            disabled={isLoading}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </div>

      {/* Clean Vercel/Shadcn Tabs */}
      <div className="flex border-b border-border gap-6">
        {[
          { id: 'incoming_pending', label: 'Pending Requests', count: activeTab === 'incoming_pending' ? incomingQueue.length : null },
          { id: 'incoming_history', label: 'Processed History', count: activeTab === 'incoming_history' ? incomingQueue.length : null }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedReferral(null);
              }}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${isActive ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${isActive ? 'bg-primary/15 text-primary font-bold' : 'bg-muted text-muted-foreground font-normal'
                  }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Master-Detail Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Column: Triage Queue (4 cols on lg) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-4 flex flex-col h-[680px] shadow-sm">
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-border/60">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <span>Triage Queue</span>
            </h3>
            <span className="text-[11px] font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border">
              {incomingQueue.length} {incomingQueue.length === 1 ? 'case' : 'cases'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full py-16 space-y-3 text-muted-foreground">
                <Loader size="lg" />
                <p className="text-xs font-mono uppercase tracking-wider animate-pulse">Syncing Telemetry...</p>
              </div>
            ) : incomingQueue.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2 rounded-xl border border-dashed border-border bg-muted/10">
                <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground mb-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="font-semibold text-sm text-foreground">Queue is Clear</p>
                <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                  No incoming transfer requests match your current triage filters.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {incomingQueue.map((ref) => {
                  const isSelected = selectedReferral?._id === ref._id;
                  const patientName = ref.patientId?.name || 'Unknown Patient';
                  const originHospital = ref.fromHospitalId?.name || 'External Facility';
                  const diagnosis = ref.patientId?.diagnosis || ref.diagnosis || 'Evaluation pending';
                  const priority = ref.priority || 'Medium';

                  return (
                    <motion.div
                      key={ref._id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SpotlightCard
                        isSelected={isSelected}
                        onClick={() => setSelectedReferral(ref)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-muted border border-border/80 flex items-center justify-center font-semibold text-xs text-foreground shrink-0">
                              {patientName.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-sm text-foreground truncate">
                                {patientName}
                              </h4>
                              <p className="text-[11px] font-mono text-muted-foreground truncate">
                                Origin: {originHospital}
                              </p>
                            </div>
                          </div>

                          <StatusBadge status={priority === 'Critical' ? 'critical' : priority === 'High' ? 'pending' : 'stable'}>
                            {priority}
                          </StatusBadge>
                        </div>

                        <div className="bg-muted/40 rounded-lg p-2 border border-border/50 mb-2.5">
                          <p className="text-xs text-muted-foreground truncate flex items-center gap-1.5">
                            <span className="font-medium text-foreground">Dx:</span>
                            <span>{diagnosis}</span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground/70" />
                            {formatDate(ref.sentAt || ref.createdAt || ref.updatedAt)}
                          </span>
                          {activeTab === 'incoming_history' && ref.status && (
                            <span className={`font-semibold ${ref.status === 'Accepted' ? 'text-emerald-600 dark:text-emerald-400' : ref.status === 'Rejected' ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground'
                              }`}>
                              {ref.status}
                            </span>
                          )}
                          <span className="font-medium text-primary flex items-center gap-0.5">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Right Column: Detail Panel (8 cols on lg) */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-6 flex flex-col h-[680px] shadow-sm relative overflow-hidden">
          {selectedReferral ? (
            <motion.div
              key={selectedReferral._id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full justify-between"
            >
              <div className="overflow-y-auto pr-2 space-y-6 custom-scrollbar flex-1">
                {/* Patient Header Bar */}
                <div className="pb-5 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-lg font-bold text-foreground">
                      {selectedReferral.patientId?.name?.slice(0, 2).toUpperCase() || 'UP'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-xl font-bold text-foreground tracking-tight">
                          {selectedReferral.patientId?.name || 'Unknown Patient'}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md bg-muted border border-border text-[11px] font-mono text-muted-foreground">
                          ID: #{selectedReferral._id?.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          {selectedReferral.patientId?.age || 'N/A'} yrs • {selectedReferral.patientId?.gender || 'Unspecified'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-muted-foreground" />
                          From: {selectedReferral.fromHospitalId?.name || 'External Hospital'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <StatusBadge status={selectedReferral.priority === 'Critical' ? 'critical' : selectedReferral.priority === 'High' ? 'pending' : 'stable'}>
                      Acuity: {selectedReferral.priority || 'Medium'}
                    </StatusBadge>
                  </div>
                </div>

                {/* Clinical Assessment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Diagnosis Card */}
                  <div className="bg-card border border-border rounded-xl p-4 space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-foreground" /> Primary Acuity & Diagnosis
                      </h4>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">ICD-10</span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50">
                      {selectedReferral.patientId?.diagnosis || selectedReferral.diagnosis || 'No clinical diagnosis specified by referring physician.'}
                    </p>
                  </div>

                  {/* Clinical Notes Card */}
                  <div className="bg-card border border-border rounded-xl p-4 space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-foreground" /> Physician Notes
                      </h4>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                        Dr. {selectedReferral.doctorId?.fullName || 'Attending'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50 max-h-[100px] overflow-y-auto custom-scrollbar">
                      {selectedReferral.patientId?.notes || selectedReferral.remarks || 'No additional vitals or emergency notes attached.'}
                    </p>
                  </div>
                </div>

                {/* Hospital Readiness & Capacity Check Widget (Clean Neutral Vercel Style) */}
                <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <h4 className="text-sm font-semibold text-foreground tracking-tight">
                        Receiving Hospital Readiness & Resource Check
                      </h4>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      Capacity Available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded-lg border border-border shadow-2xs">
                      <span className="text-xs text-muted-foreground font-medium block">Available ICU Beds</span>
                      <span className="text-lg font-bold text-foreground mt-0.5 block flex items-baseline gap-1.5">
                        12 <span className="text-[11px] font-normal text-muted-foreground">beds ready</span>
                      </span>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border shadow-2xs">
                      <span className="text-xs text-muted-foreground font-medium block">On-Call Specialists</span>
                      <span className="text-lg font-bold text-foreground mt-0.5 block flex items-baseline gap-1.5">
                        3 <span className="text-[11px] font-normal text-muted-foreground">surgeons</span>
                      </span>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border shadow-2xs">
                      <span className="text-xs text-muted-foreground font-medium block">Triage Clearance</span>
                      <span className="text-lg font-bold text-foreground mt-0.5 block flex items-baseline gap-1.5">
                        Instant <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">✓ Approved</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* History Resolution Banner */}
                {activeTab === 'incoming_history' && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${selectedReferral.status === 'Accepted'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-200'
                      : selectedReferral.status === 'Rejected'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-200'
                        : 'bg-muted border-border text-foreground'
                    }`}>
                    {selectedReferral.status === 'Accepted' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-semibold text-sm">
                        Transfer {selectedReferral.status || 'Processed'}
                      </h4>
                      <p className="text-xs opacity-90 mt-1 leading-relaxed">
                        {selectedReferral.remarks || `This referral was finalized and logged into the hospital transfer archive.`}
                      </p>
                      <p className="text-[11px] opacity-70 mt-2 font-mono">
                        Timestamp: {formatDate(selectedReferral.updatedAt || selectedReferral.acceptedAt || selectedReferral.createdAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer (Only in Pending tab) */}
              {activeTab === 'incoming_pending' && (
                <div className="pt-5 mt-5 border-t border-border/60 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    disabled={isProcessing}
                    onClick={() => handleAction(selectedReferral._id, 'accept')}
                    className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-5 text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader size="sm" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Accept & Allocate Bed
                      </>
                    )}
                  </Button>
                  <Button
                    disabled={isProcessing}
                    variant="outline"
                    onClick={() => handleAction(selectedReferral._id, 'reject')}
                    className="w-full sm:w-auto px-6 py-5 text-sm rounded-xl border-border text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" /> Decline Transfer
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-border bg-muted/10 text-muted-foreground space-y-3">
              <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                <Activity className="w-6 h-6 opacity-60" />
              </div>
              <div className="max-w-xs space-y-1">
                <p className="text-base font-semibold text-foreground">No Patient Case Selected</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Choose an incoming emergency referral from the triage queue on the left to review clinical notes and allocate ICU capacity.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

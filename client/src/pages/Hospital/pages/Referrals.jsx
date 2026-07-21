import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { Activity, Clock, FileText, Upload, Hospital, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('desk');
  
  // Referral Desk State
  const [deskQueue, setDeskQueue] = useState([]);
  const [isLoadingDesk, setIsLoadingDesk] = useState(false);
  const [deskError, setDeskError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Hospitals State
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Outgoing State
  const [outgoingReferrals, setOutgoingReferrals] = useState([]);

  // Fetch Desk Queue and Hospitals
  useEffect(() => {
    if (activeTab === 'desk') {
      fetchDeskQueue();
      fetchHospitals();
    }
  }, [activeTab]);

  const fetchDeskQueue = async () => {
    setIsLoadingDesk(true);
    setDeskError(null);
    try {
      const res = await api.get('/patients?needsReferral=true');
      setDeskQueue(res.data?.data || []);
    } catch (err) {
      setDeskError('Failed to load patients awaiting referral. Please try again later.');
    } finally {
      setIsLoadingDesk(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const res = await api.get('/hospitals');
      setHospitals(res.data?.data || []);
    } catch (err) {
      console.warn('Failed to load hospitals', err);
    }
  };

  const handleSendReferral = async () => {
    if (!selectedHospital || !selectedPatient) return;
    setIsSubmitting(true);
    try {
      await api.post('/hospitals/referrals', {
        patientId: selectedPatient._id || selectedPatient.id,
        toHospitalId: selectedHospital,
        priority: selectedPatient.severity || 'Medium',
        notes: 'Requested via Referral Desk'
      });
      
      // Local state update - Remove from queue
      setDeskQueue(prev => prev.filter(p => (p._id || p.id) !== (selectedPatient._id || selectedPatient.id)));
      
      // Local state update - Add to outgoing
      const newReferral = {
        id: `REF-${Math.floor(Math.random() * 10000)}`,
        patient: selectedPatient.name || 'Unknown Patient',
        to: hospitals.find(h => h._id === selectedHospital)?.name || 'Selected Hospital',
        severity: selectedPatient.severity || 'Medium',
        status: 'Pending',
        time: 'Just now'
      };
      
      setOutgoingReferrals(prev => [newReferral, ...prev]);
      setSelectedPatient(null);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (err) {
      console.error(err);
      alert('Failed to send referral.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Existing Mock Data for Incoming
  const [incomingData] = useState([
    { id: 'REF-801', patient: 'John Doe', from: 'City Clinic', severity: 'High', status: 'Pending', time: '10 mins ago' },
    { id: 'REF-802', patient: 'Jane Smith', from: 'Northside Hospital', severity: 'Critical', status: 'Accepted', time: '1 hr ago' },
  ]);

  const filteredIncoming = incomingData.filter(ref => {
    if (activeTab === 'incoming_pending') return ref.status === 'Pending';
    if (activeTab === 'incoming_history') return ['Accepted', 'Declined'].includes(ref.status);
    return true;
  });

  const incomingColumns = [
    { header: 'Ref ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Origin', accessorKey: 'from' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => (
      <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge>
    )},
    { header: 'Status', accessorKey: 'status', cell: (row) => (
      <StatusBadge status={row.status === 'Accepted' ? 'available' : row.status === 'Pending' ? 'pending' : 'occupied'}>{row.status}</StatusBadge>
    )},
    { header: 'Time', accessorKey: 'time' },
    { header: 'Action', cell: (row) => (
      row.status === 'Pending' ? (
        <div className="flex gap-2">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Accept</Button>
          <Button size="sm" variant="outline" className="text-rose-500 border-rose-500/50 hover:bg-rose-500/10 hover:border-rose-500">Decline</Button>
        </div>
      ) : (
        <Button variant="outline" size="sm">View Details</Button>
      )
    )}
  ];

  const outgoingColumns = [
    { header: 'Ref ID', accessorKey: 'id' },
    { header: 'Patient', accessorKey: 'patient' },
    { header: 'Destination', accessorKey: 'to' },
    { header: 'Severity', accessorKey: 'severity', cell: (row) => (
      <StatusBadge status={row.severity === 'Critical' ? 'critical' : row.severity === 'High' ? 'pending' : 'stable'}>{row.severity}</StatusBadge>
    )},
    { header: 'Status', accessorKey: 'status', cell: (row) => {
      let badgeStatus = 'pending';
      if (['Accepted', 'Completed'].includes(row.status)) badgeStatus = 'available';
      if (['Rejected'].includes(row.status)) badgeStatus = 'critical';
      if (['In Transit'].includes(row.status)) badgeStatus = 'occupied';
      return <StatusBadge status={badgeStatus}>{row.status}</StatusBadge>;
    }},
    { header: 'Time', accessorKey: 'time' },
    { header: 'Action', cell: () => <Button variant="outline" size="sm">View</Button> }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader title="Referrals Management" description="Manage outgoing referral requests and review incoming patient transfers." />
      
      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('desk')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'desk' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Referral Desk Queue
        </button>
        <button 
          onClick={() => setActiveTab('outgoing')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'outgoing' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Outgoing Referrals
        </button>
        <button 
          onClick={() => setActiveTab('incoming_pending')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'incoming_pending' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Incoming Requests
        </button>
        <button 
          onClick={() => setActiveTab('incoming_history')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'incoming_history' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Incoming History
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {activeTab === 'desk' && (
            <motion.div key="desk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-6 h-[70vh]">
              {/* Master List: Patients Awaiting Referral */}
              <div className="w-1/3 bg-card border border-border shadow-sm rounded-2xl p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Patients Awaiting Referral</h3>
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {isLoadingDesk && (
                    <div className="p-12 flex flex-col items-center justify-center space-y-4">
                      <Loader />
                      <span className="text-muted-foreground text-sm">Loading queue...</span>
                    </div>
                  )}
                  {deskError && (
                    <div className="text-rose-500 text-center p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                      {deskError}
                    </div>
                  )}
                  {!isLoadingDesk && !deskError && deskQueue.length === 0 && (
                    <div className="text-center text-muted-foreground p-8 bg-muted/20 rounded-xl border border-dashed border-border h-full flex items-center justify-center">
                      No patients awaiting referral.
                    </div>
                  )}
                  {!isLoadingDesk && deskQueue.map(patient => (
                    <div 
                      key={patient._id || patient.id} 
                      onClick={() => setSelectedPatient(patient)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedPatient?._id === patient._id ? 'border-cyan-500 bg-cyan-500/10' : 'border-border bg-background hover:border-cyan-500/50 hover:bg-muted/50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-card-foreground">{patient.name || 'Unknown Patient'}</div>
                        <StatusBadge status={patient.severity === 'Critical' ? 'critical' : 'pending'}>{patient.severity || 'Medium'}</StatusBadge>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>{patient.age || 'N/A'}y • {patient.gender || 'N/A'}</span>
                        <span>{patient.time || 'Just now'}</span>
                      </div>
                      {patient.doctorName && <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">Dr. {patient.doctorName}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Panel: Patient Summary */}
              <div className="w-2/3 bg-card border border-border shadow-sm rounded-2xl p-6 overflow-y-auto h-full custom-scrollbar">
                {submitSuccess ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground">Referral Sent Successfully</h3>
                    <p className="text-muted-foreground">The patient has been moved to Outgoing Referrals.</p>
                  </motion.div>
                ) : selectedPatient ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    {/* Patient Info */}
                    <div className="pb-4 border-b border-border">
                      <h2 className="text-2xl font-bold text-card-foreground mb-2">{selectedPatient.name || 'Unknown Patient'}</h2>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">ID: {selectedPatient._id || 'N/A'}</span>
                        <span className="flex items-center gap-1">Age: {selectedPatient.age || 'N/A'}</span>
                        <span className="flex items-center gap-1">Gender: {selectedPatient.gender || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Clinical Details */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-muted/30 p-5 rounded-xl border border-border space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-card-foreground mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-amber-500"/> Diagnosis</h4>
                          <p className="text-sm text-muted-foreground">{selectedPatient.diagnosis || 'Diagnosis not recorded.'}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-card-foreground mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-cyan-500"/> Clinical Notes</h4>
                          <p className="text-sm text-muted-foreground">{selectedPatient.notes || 'No additional clinical notes provided.'}</p>
                        </div>
                      </div>
                      
                      {/* AI Summary Placeholder */}
                      <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-xl flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> AI Recommendation</h4>
                          <p className="text-sm text-muted-foreground">
                            High probability of acute condition requiring specialized care. Immediate transfer to specialized facility recommended.
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-rose-500/10 text-xs text-rose-500/70">
                          AI Triage Assessment (Placeholder)
                        </div>
                      </div>
                    </div>

                    {/* Destination Selection & Submit */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <h4 className="text-lg font-semibold text-card-foreground flex items-center gap-2"><Hospital className="w-5 h-5 text-cyan-500"/> Select Destination Hospital</h4>
                      <select 
                        className="w-full p-4 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                      >
                        <option value="">-- Choose a hospital --</option>
                        {hospitals.map(h => (
                          <option key={h._id || h.id} value={h._id || h.id}>{h.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end pt-4 pb-8">
                      <Button 
                        disabled={!selectedHospital || isSubmitting} 
                        onClick={handleSendReferral}
                        className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-6 text-lg w-full md:w-auto"
                      >
                        {isSubmitting ? 'Sending Referral...' : 'Send Referral'}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Activity className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Select a patient from the queue</p>
                    <p className="text-sm">Review their details and allocate a destination hospital.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'outgoing' && (
            <motion.div key="outgoing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DataTable columns={outgoingColumns} data={outgoingReferrals} placeholder="Search outgoing referrals..." />
            </motion.div>
          )}

          {(activeTab === 'incoming_pending' || activeTab === 'incoming_history') && (
            <motion.div key="incoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DataTable columns={incomingColumns} data={filteredIncoming} placeholder="Search incoming referrals..." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

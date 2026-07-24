import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { Activity, CheckCircle2, AlertTriangle, FileText, User } from 'lucide-react';

export default function Referrals() {
  const [activeTab, setActiveTab] = useState('incoming_pending');
  const [incomingQueue, setIncomingQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (activeTab === 'incoming_pending') {
      fetchIncomingQueue();
    }
  }, [activeTab]);

  const fetchIncomingQueue = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/referrals/incoming');
      setIncomingQueue(res.data?.data || []);
      setSelectedReferral(null);
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
      await fetchIncomingQueue();
    } catch (err) {
      console.error(`Failed to ${action} referral`, err);
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingColumns = [
    { header: 'ID', accessorKey: '_id', cell: (row) => row._id?.slice(-6).toUpperCase() },
    { header: 'Patient', cell: (row) => row.patientId?.name || 'Unknown' },
    { header: 'Origin Hospital', cell: (row) => row.fromHospitalId?.name || 'Unknown' },
    { header: 'Priority', accessorKey: 'priority', cell: (row) => (
      <StatusBadge status={row.priority === 'Critical' ? 'critical' : row.priority === 'High' ? 'pending' : 'stable'}>{row.priority}</StatusBadge>
    )},
    { header: 'Action', cell: (row) => (
      <Button variant="outline" size="sm" onClick={() => setSelectedReferral(row)}>Review Request</Button>
    )}
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader title="Incoming Transfer Requests" description="Manage incoming patients from other hospitals and allocate resources." />
      
      <div className="flex border-b border-white/10 gap-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('incoming_pending')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'incoming_pending' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Pending Requests
        </button>
        <button 
          onClick={() => setActiveTab('incoming_history')}
          className={`pb-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === 'incoming_history' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          History
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {activeTab === 'incoming_pending' && (
            <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-6 h-[70vh]">
              {/* Queue List */}
              <div className="w-1/3 bg-card border border-border shadow-sm rounded-2xl p-4 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Awaiting Review</h3>
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {isLoading && (
                    <div className="flex justify-center p-8"><Loader /></div>
                  )}
                  {!isLoading && incomingQueue.length === 0 && (
                    <div className="text-center text-muted-foreground p-8">No incoming requests.</div>
                  )}
                  {!isLoading && incomingQueue.map(ref => (
                    <div 
                      key={ref._id} 
                      onClick={() => setSelectedReferral(ref)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedReferral?._id === ref._id ? 'border-cyan-500 bg-cyan-500/10' : 'border-border bg-background hover:border-cyan-500/50'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-card-foreground">{ref.patientId?.name || 'Unknown Patient'}</div>
                        <StatusBadge status={ref.priority === 'Critical' ? 'critical' : 'pending'}>{ref.priority || 'Medium'}</StatusBadge>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>From: {ref.fromHospitalId?.name || 'Unknown'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail Panel */}
              <div className="w-2/3 bg-card border border-border shadow-sm rounded-2xl p-6 overflow-y-auto h-full custom-scrollbar">
                {selectedReferral ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="pb-4 border-b border-border">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-card-foreground">{selectedReferral.patientId?.name || 'Unknown Patient'}</h2>
                        <StatusBadge status={selectedReferral.priority === 'Critical' ? 'critical' : 'pending'}>{selectedReferral.priority}</StatusBadge>
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-4 h-4"/> {selectedReferral.patientId?.age || 'N/A'}y • {selectedReferral.patientId?.gender || 'N/A'}</span>
                        <span>Origin: {selectedReferral.fromHospitalId?.name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-muted/30 p-5 rounded-xl border border-border space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-card-foreground mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-amber-500"/> Current Diagnosis</h4>
                          <p className="text-sm text-muted-foreground">{selectedReferral.patientId?.diagnosis || 'No diagnosis provided.'}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-card-foreground mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-cyan-500"/> Clinical Notes</h4>
                          <p className="text-sm text-muted-foreground">{selectedReferral.patientId?.notes || 'No additional notes.'}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-500/5 border border-blue-500/20 p-5 rounded-xl space-y-4">
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">Hospital Capacity Check</h4>
                        <div className="space-y-2 text-sm text-slate-300">
                          <div className="flex justify-between"><span>Available ICU Beds:</span> <span className="font-bold text-emerald-400">12</span></div>
                          <div className="flex justify-between"><span>Specialists on call:</span> <span className="font-bold text-emerald-400">3</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border">
                      <Button 
                        disabled={isProcessing} 
                        onClick={() => handleAction(selectedReferral._id, 'accept')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-6 text-lg"
                      >
                        {isProcessing ? 'Processing...' : 'Accept Transfer'}
                      </Button>
                      <Button 
                        disabled={isProcessing} 
                        variant="outline"
                        onClick={() => handleAction(selectedReferral._id, 'reject')}
                        className="flex-1 text-rose-500 border-rose-500/50 hover:bg-rose-500/10 hover:border-rose-500 py-6 text-lg"
                      >
                        Reject (No Capacity)
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Activity className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Select an incoming request</p>
                    <p className="text-sm">Review clinical details before accepting.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'incoming_history' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center text-muted-foreground p-12 bg-card rounded-2xl border border-border">
                History view implementation coming soon...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

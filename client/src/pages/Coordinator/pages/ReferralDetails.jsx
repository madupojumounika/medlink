import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Clock, Send, XCircle, Building, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';


export default function ReferralDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchReferralData();
  }, [id]);

  const fetchReferralData = async () => {
    try {
      const [refRes, recRes] = await Promise.all([
        api.get(`/v1/referrals/${id}`),
        api.get(`/v1/referrals/${id}/recommendations`)
      ]);
      setReferral(refRes.data.data);
      setRecommendations(recRes.data.data);
    } catch (err) {
      alert('Failed to load referral details');
      navigate('/dashboard/coordinator/queue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReferral = async () => {
    if (!selectedHospital) {
      alert("Please select a destination hospital");
      return;
    }
    if (!window.confirm("Send this referral to the selected hospital?")) return;
    setIsSending(true);
    try {
      await api.post(`/v1/referrals/${id}/send`, { toHospitalId: selectedHospital });
      alert("Referral sent successfully");
      navigate('/dashboard/coordinator/history');
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send referral");
    } finally {
      setIsSending(false);
    }
  };

  const handleCancelReferral = async () => {
    const remarks = window.prompt("Reason for cancellation?");
    if (remarks === null) return;
    setIsCancelling(true);
    try {
      await api.post(`/v1/referrals/${id}/cancel`, { remarks });
      alert("Referral cancelled");
      navigate('/dashboard/coordinator/history');
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel referral");
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (!referral) return null;

  const isPending = referral.status === 'Pending' || referral.status === 'Recommendation Ready';
  const patient = referral.patientId || {};

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <PageHeader 
            title={`Referral: ${patient.name || 'Unknown'}`} 
            description={`Referred by Dr. ${referral.doctorId?.fullName || 'Unknown'}`} 
          />
        </div>
        <div className="flex gap-3">
          <StatusBadge status={isPending ? 'pending' : referral.status === 'Cancelled' ? 'critical' : 'available'}>
            {referral.status}
          </StatusBadge>
          
          {isPending && (
            <Button 
              onClick={handleCancelReferral} 
              disabled={isCancelling || isSending} 
              variant="outline"
              className="border-rose-500/50 text-rose-500 hover:bg-rose-500/10 flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Medical Summary */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Medical Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Diagnosis</div>
                <p className="text-card-foreground text-lg bg-muted/30 p-3 rounded-lg border border-border">
                  {referral.diagnosis || 'Pending Diagnosis'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Severity</div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    {referral.severity}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Priority</div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    {referral.priority}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Doctor Notes</h3>
            <p className="text-card-foreground bg-muted/30 p-4 rounded-lg border border-border min-h-[100px]">
              {referral.notes || 'No additional notes provided.'}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Recommendations & Action */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Hospital Recommendations</h3>
            
            {!isPending ? (
              <div className="bg-muted/50 p-4 rounded-xl border border-border text-center">
                <p className="text-muted-foreground mb-2">Referral has been {referral.status.toLowerCase()}.</p>
                {referral.toHospitalId && (
                  <div className="text-card-foreground font-semibold mt-2">
                    Sent to: {referral.toHospitalId.name}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {recommendations.map(hosp => (
                    <div 
                      key={hosp.id} 
                      onClick={() => setSelectedHospital(hosp.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedHospital === hosp.id ? 'bg-cyan-500/10 border-cyan-500' : 'bg-muted/30 border-border hover:border-cyan-500/50'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-semibold text-card-foreground">{hosp.name}</div>
                        <div className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {hosp.score}% Match
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>{hosp.distance}</span>
                        <span>{hosp.availableBeds}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <Button 
                    onClick={handleSendReferral} 
                    disabled={isSending || !selectedHospital} 
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSending ? 'Sending...' : 'Send Referral'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Required Resources</h3>
            <div className="flex flex-wrap gap-2">
              {patient.requiredResources && Object.entries(patient.requiredResources).filter(([k,v]) => v).map(([key, value]) => (
                <span key={key} className="text-xs font-semibold text-cyan-600 bg-cyan-600/10 px-2 py-1 rounded border border-cyan-600/20 capitalize">
                  {key.replace('needs', '')}
                </span>
              ))}
              {(!patient.requiredResources || !Object.values(patient.requiredResources).some(Boolean)) && (
                <span className="text-sm text-muted-foreground">None specified</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

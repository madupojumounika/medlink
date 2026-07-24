import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Activity, Clock, FileText, Upload, User, MapPin, Phone, AlertTriangle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';


export default function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isForwarding, setIsForwarding] = useState(false);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const res = await api.get(`/v1/patients/${id}`);
      setPatient(res.data.data);
    } catch (err) {
      alert('Failed to load patient details');
      navigate('/dashboard/doctor/patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForwardReferral = async () => {
    if (!window.confirm("Forward this patient to the Referral Coordinator?")) return;
    setIsForwarding(true);
    try {
      await api.post(`/v1/patients/${id}/forward`, { priority: "Normal" });
      alert("Patient successfully forwarded to Referral Coordinator");
      fetchPatient(); // reload to get new status
    } catch (error) {
      alert(error.response?.data?.message || "Failed to forward referral");
    } finally {
      setIsForwarding(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (!patient) return null;

  const isReferred = patient.status === 'REFERRED_TO_COORDINATOR';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <PageHeader 
            title={`Patient: ${patient.name}`} 
            description={`Age: ${patient.age} | Gender: ${patient.gender} | Blood: ${patient.bloodGroup || 'N/A'}`} 
          />
        </div>
        <div className="flex gap-3">
          <StatusBadge status={isReferred ? 'available' : 'pending'}>
            {patient.status.replace(/_/g, ' ')}
          </StatusBadge>
          
          {isReferred ? (
            <Button disabled className="bg-slate-700 text-slate-300 opacity-80 cursor-not-allowed">
              ✓ Forwarded to Coordinator
            </Button>
          ) : (
            <Button 
              onClick={handleForwardReferral} 
              disabled={isForwarding} 
              className="bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isForwarding ? 'Forwarding...' : 'Forward Referral'}
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Medical Assessment</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Diagnosis</div>
                <p className="text-card-foreground text-lg bg-muted/30 p-3 rounded-lg border border-border">
                  {patient.diagnosis || 'Pending Diagnosis'}
                </p>
              </div>

              <div>
                <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Symptoms</div>
                <p className="text-card-foreground bg-muted/30 p-4 rounded-lg border border-border">
                  {patient.symptoms || 'No symptoms recorded.'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Allergies</div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    {patient.allergies?.length > 0 ? patient.allergies.join(', ') : 'None reported'}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1 uppercase tracking-wider font-semibold">Existing Conditions</div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    {patient.existingConditions?.length > 0 ? patient.existingConditions.join(', ') : 'None reported'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Doctor Notes</h3>
            <p className="text-card-foreground bg-muted/30 p-4 rounded-lg border border-border min-h-[100px]">
              {patient.doctorNotes || 'No additional notes provided.'}
            </p>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">{patient.phone || 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Primary Phone</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">{patient.emergencyContact || 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Emergency Contact</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground">{patient.address || 'N/A'}</div>
                  <div className="text-xs text-muted-foreground">Address</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border shadow-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Required Resources</h3>
            <div className="space-y-2">
              {patient.requiredResources && Object.entries(patient.requiredResources).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-muted/30 p-2 px-3 rounded-lg border border-border">
                  <span className="text-sm text-foreground capitalize">{key.replace('needs', '')}</span>
                  {value ? (
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Required</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not Required</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

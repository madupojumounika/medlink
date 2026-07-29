import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import {
  User,
  HeartPulse,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Bed,
  Syringe,
  Droplet,
  Phone,
  Droplets,
  FileText,
  Clock
} from 'lucide-react';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', bloodGroup: '', phone: '',
    symptoms: '', diagnosis: '', severity: 'Low', doctorNotes: '',
    requiredResources: { needsICU: false, needsVentilator: false, needsBlood: false, needsOperationTheatre: false, needsGeneralBed: false }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      requiredResources: { ...formData.requiredResources, [name]: checked }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        allergies: [],
        existingConditions: []
      };

      await api.post('/v1/patients', payload);
      alert('Patient registered successfully');
      navigate('/dashboard/doctor/patients');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to register patient');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Register New Patient"
        description="Enter patient details for emergency routing, resource allocation, and AI triage."
      />

      {/* AI Triage Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-sm backdrop-blur-sm"
      >
        <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-500">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            AI-Powered Emergency Triage & Resource Allocation
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Active</span>
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Clinical data is analyzed in real-time to predict triage severity and match hospital facilities.
          </p>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Personal Info Card */}
        <div className="bg-card border border-border/80 hover:border-cyan-500/40 transition-all duration-300 shadow-md hover:shadow-lg p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500 to-blue-500" />
          
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-500 rounded-2xl group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-card-foreground">Patient Demographics</h3>
                <p className="text-xs text-muted-foreground">Basic identification and contact information</p>
              </div>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">Section 1 of 3</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm">
                <span>Full Name <span className="text-red-500 font-bold">*</span></span>
              </Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Jane Doe"
                className="h-11 bg-background/50 border-input focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all rounded-xl font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm">
                <span>Age <span className="text-red-500 font-bold">*</span></span>
              </Label>
              <Input
                name="age"
                type="number"
                min="0"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="e.g. 42"
                className="h-11 bg-background/50 border-input focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all rounded-xl font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm">
                <span>Gender <span className="text-red-500 font-bold">*</span></span>
              </Label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 bg-background/50 border border-input rounded-xl text-sm font-medium text-foreground focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-sm">
                <Droplets className="w-4 h-4 text-rose-500" />
                <span>Blood Group</span>
              </Label>
              <Input
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="e.g. O+, AB-, A+"
                className="h-11 bg-background/50 border-input focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all rounded-xl uppercase font-medium"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-1.5 text-sm">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Contact Phone Number</span>
              </Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="h-11 bg-background/50 border-input focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Medical History Card */}
        <div className="bg-card border border-border/80 hover:border-rose-500/40 transition-all duration-300 shadow-md hover:shadow-lg p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-500 to-orange-500" />
          
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-2xl group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-card-foreground">Clinical Assessment & Triage</h3>
                <p className="text-xs text-muted-foreground">Primary symptoms and diagnosis required for AI evaluation</p>
              </div>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">Section 2 of 3</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
                  Primary Symptoms <span className="text-red-500 font-bold">*</span>
                </span>
                <span className="text-xs text-muted-foreground font-normal">Required for AI NLP analysis</span>
              </Label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
                className="w-full min-h-[100px] p-4 bg-background/50 border border-input rounded-xl text-sm font-medium text-foreground focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all leading-relaxed"
                placeholder="Detail acute symptoms, vital abnormalities, pain levels, and patient complaints..."
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center justify-between text-sm">
                <span>Preliminary Diagnosis <span className="text-red-500 font-bold">*</span></span>
                <span className="text-xs text-muted-foreground font-normal">Initial clinical impression</span>
              </Label>
              <Input
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                placeholder="e.g. Acute Coronary Syndrome / Severe Respiratory Distress"
                className="h-11 bg-background/50 border-input focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all rounded-xl font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  Triage Severity Level <span className="text-red-500 font-bold">*</span>
                </span>
              </Label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 bg-background/50 border border-input rounded-xl text-sm font-semibold text-foreground focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all cursor-pointer"
              >
                <option value="Low" className="text-emerald-500 font-medium">🟢 Low - Standard Outpatient Care</option>
                <option value="Medium" className="text-amber-500 font-medium">🟡 Medium - Urgent / Observation Needed</option>
                <option value="High" className="text-orange-500 font-medium">🟠 High - Emergent / Rapid Intervention</option>
                <option value="Critical" className="text-rose-500 font-bold">🔴 Critical - Immediate Resuscitation / ICU</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Initial Clinical Notes <span className="text-red-500 font-bold">*</span>
                </span>
              </Label>
              <Input
                name="doctorNotes"
                value={formData.doctorNotes}
                onChange={handleChange}
                required
                placeholder="e.g. Vitals stable on 2L O2, awaiting ECG results..."
                className="h-11 bg-background/50 border-input focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Required Resources Card */}
        <div className="bg-card border border-border/80 hover:border-amber-500/40 transition-all duration-300 shadow-md hover:shadow-lg p-6 md:p-8 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-500 to-yellow-500" />
          
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-card-foreground">Emergency Resource Allocation</h3>
                <p className="text-xs text-muted-foreground">Select hospital facilities required for immediate admission</p>
              </div>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">Section 3 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'needsICU', label: 'ICU Bed', desc: 'Intensive Care Unit', icon: Activity, color: 'text-rose-500 border-rose-500/50 bg-rose-500/10' },
              { id: 'needsVentilator', label: 'Ventilator', desc: 'Mechanical breathing support', icon: HeartPulse, color: 'text-purple-500 border-purple-500/50 bg-purple-500/10' },
              { id: 'needsBlood', label: 'Blood Transfusion', desc: 'Emergency blood bank access', icon: Droplet, color: 'text-red-500 border-red-500/50 bg-red-500/10' },
              { id: 'needsOperationTheatre', label: 'Operation Theatre', desc: 'Emergency surgical suite', icon: Syringe, color: 'text-amber-500 border-amber-500/50 bg-amber-500/10' },
              { id: 'needsGeneralBed', label: 'General Ward Bed', desc: 'Inpatient admission bed', icon: Bed, color: 'text-cyan-500 border-cyan-500/50 bg-cyan-500/10' },
            ].map(({ id, label, desc, icon: Icon, color }) => {
              const isSelected = formData.requiredResources[id];
              return (
                <motion.label
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none ${
                    isSelected
                      ? `${color} shadow-md`
                      : 'border-border/60 bg-background/40 hover:border-border hover:bg-background/80 text-muted-foreground'
                  }`}
                >
                  <input
                    type="checkbox"
                    name={id}
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-background/80 shadow-sm' : 'bg-secondary'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'scale-110 transition-transform' : 'opacity-70'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-foreground' : 'text-card-foreground'}`}>
                        {label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0 ml-1" />}
                    </div>
                    <p className="text-xs opacity-80 mt-0.5 leading-tight">{desc}</p>
                  </div>
                </motion.label>
              );
            })}
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-background/95 border-t border-border px-4 py-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 w-[calc(100%+2rem)] -ml-4 sm:w-[calc(100%+3rem)] sm:-ml-6 mt-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground w-full sm:w-auto">
            <Clock className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Submitting will instantly notify triage coordinators & update emergency tracking.</span>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              onClick={() => navigate('/dashboard/doctor/patients')}
              variant="outline"
              className="h-11 px-6 rounded-xl border-border hover:bg-secondary font-medium w-1/2 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-8 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 w-1/2 sm:w-auto flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Register Patient & Triage</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}

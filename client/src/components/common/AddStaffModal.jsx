import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Stethoscope, Activity, ArrowLeft, CheckCircle2, Copy, Check, Loader2, User, Phone, Mail, Award, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { api } from '@/lib/api';

export function AddStaffModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Role Select, 2: Form Input, 3: Success Display
  const [selectedRole, setSelectedRole] = useState(null); // 'doctor' | 'referral_coordinator'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [createdData, setCreatedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialist: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
    setErrorMsg('');
    setShowPassword(false);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedRole(null);
    setErrorMsg('');
  };

  const handleClose = () => {
    setStep(1);
    setSelectedRole(null);
    setErrorMsg('');
    setCreatedData(null);
    setShowPassword(false);
    setFormData({ fullName: '', email: '', phone: '', specialist: '', password: '' });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        role: selectedRole,
        fullName: formData.fullName,
        password: formData.password,
        phone: formData.phone,
      };

      if (selectedRole === 'doctor') {
        if (!formData.fullName || !formData.phone || !formData.specialist || !formData.password) {
          throw new Error('Please fill all required clinical fields.');
        }
        if (formData.email?.trim()) payload.email = formData.email.trim();
        payload.specialist = formData.specialist;
      } else {
        if (!formData.fullName || !formData.email || !formData.password) {
          throw new Error('Please fill all required fields for coordinator.');
        }
        payload.email = formData.email.trim();
        if (formData.phone?.trim()) payload.phone = formData.phone.trim();
      }

      const res = await api.post('/v1/hospitals/employees', payload);
      const newStaff = res.data.data;

      if (selectedRole === 'doctor') {
        setCreatedData({
          username: newStaff.username || 'Generated',
          password: formData.password,
          fullName: formData.fullName,
          specialist: formData.specialist,
        });
        setStep(3);
      } else {
        onSuccess?.();
        handleClose();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to create staff member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCredentials = () => {
    if (!createdData) return;
    const text = `Doctor Login Credentials\nUser ID: ${createdData.username}\nPassword: ${createdData.password}\nName: ${createdData.fullName}\nSpecialist: ${createdData.specialist}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    onSuccess?.();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden text-foreground"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border bg-card/50">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                title="Back to Role Selection"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {step === 1 && 'Add Network Staff'}
                {step === 2 && (selectedRole === 'doctor' ? 'Create Doctor Profile' : 'Create Coordinator Profile')}
                {step === 3 && 'Doctor Account Created'}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step === 1 && 'Select the type of account you want to register.'}
                {step === 2 && (selectedRole === 'doctor' ? 'Enter clinical details. A unique User ID will be auto-generated.' : 'Enter contact and credentials for referral management.')}
                {step === 3 && 'Securely provide these login credentials to the physician.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: ROLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                <div
                  onClick={() => handleRoleSelect('doctor')}
                  className="group cursor-pointer p-4 rounded-lg border border-border bg-background/50 hover:bg-accent/40 hover:border-primary/40 transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground text-sm">Doctor / Physician</h3>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Auto ID</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-normal">
                        Clinical account logged in via generated User ID. No email required.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </div>

                <div
                  onClick={() => handleRoleSelect('referral_coordinator')}
                  className="group cursor-pointer p-4 rounded-lg border border-border bg-background/50 hover:bg-accent/40 hover:border-primary/40 transition-all duration-200 flex items-center justify-between shadow-sm hover:shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">Referral Coordinator</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-normal">
                        Administrative staff handling transfers with email credentials.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            )}

            {/* STEP 2: FORM INPUT */}
            {step === 2 && (
              <motion.form
                key="step-2"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {errorMsg && (
                  <div className="p-3 text-xs font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-medium text-foreground flex items-center gap-1">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      required
                      placeholder={selectedRole === 'doctor' ? 'Dr. Sarah Jenkins' : 'Alex Morgan'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                {selectedRole === 'doctor' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="specialist" className="text-xs font-medium text-foreground flex items-center gap-1">
                      Specialist / Specialization <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Award className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="specialist"
                        required
                        placeholder="e.g. Cardiology, Trauma Care, Neurology"
                        value={formData.specialist}
                        onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium text-foreground flex items-center gap-1">
                      Phone Number {selectedRole === 'doctor' ? <span className="text-destructive">*</span> : <span className="text-muted-foreground text-[10px] font-normal">(Optional)</span>}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        required={selectedRole === 'doctor'}
                        placeholder="+1 (555) 234-5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-foreground flex items-center gap-1">
                      Email Address {selectedRole === 'referral_coordinator' ? <span className="text-destructive">*</span> : <span className="text-muted-foreground text-[10px] font-normal">(Optional)</span>}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required={selectedRole === 'referral_coordinator'}
                        placeholder={selectedRole === 'doctor' ? 'doctor@hospital.org' : 'name@hospital.org'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <Label htmlFor="password" className="text-xs font-medium text-foreground flex items-center gap-1">
                    Assign Initial Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-9 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors p-0.5 focus:outline-none"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedRole === 'doctor'
                      ? 'The doctor will use their auto-generated User ID and this password to sign in.'
                      : 'The coordinator will use their email and this password to sign in.'}
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
                  <Button type="button" variant="outline" onClick={handleClose} size="sm" className="h-9 px-4 text-xs font-normal">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="sm"
                    className="h-9 px-5 text-xs font-medium shadow-sm"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Creating...</>
                    ) : (
                      `Create ${selectedRole === 'doctor' ? 'Doctor' : 'Coordinator'}`
                    )}
                  </Button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: SUCCESS CARD (FOR DOCTOR) */}
            {step === 3 && createdData && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="p-5 rounded-lg bg-background/60 border border-border space-y-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{createdData.fullName}</h3>
                      <p className="text-xs text-muted-foreground">{createdData.specialist}</p>
                    </div>
                  </div>

                  <div className="bg-muted/40 rounded-md p-3.5 border border-border space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Doctor User ID:</span>
                      <span className="font-mono font-medium text-foreground bg-background px-2 py-0.5 rounded border border-border">
                        {createdData.username}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Assigned Password:</span>
                      <span className="font-mono text-foreground bg-background px-2 py-0.5 rounded border border-border">
                        {createdData.password}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={copyCredentials}
                    className="w-full flex items-center justify-center gap-2 h-9 text-xs font-medium"
                  >
                    {copied ? (
                      <><Check className="w-3.5 h-3.5 text-primary" /> Copied to Clipboard!</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /> Copy Login Credentials</>
                    )}
                  </Button>
                </div>

                <div className="p-3 rounded-md bg-muted/30 border border-border text-muted-foreground text-xs leading-relaxed">
                  <span className="font-medium text-foreground">Note:</span> Doctors log in using their <strong className="text-foreground">User ID</strong> (<code className="font-mono text-foreground">{createdData.username}</code>) instead of an email address.
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={handleFinish}
                    size="sm"
                    className="h-9 px-6 text-xs font-medium shadow-sm"
                  >
                    Done
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

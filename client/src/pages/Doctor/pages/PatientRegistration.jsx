import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

import { useNavigate } from 'react-router-dom';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', bloodGroup: '', phone: '', address: '', emergencyContact: '',
    symptoms: '', diagnosis: '', severity: 'Low', allergies: '', existingConditions: '', doctorNotes: '',
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
      // Convert comma separated strings to arrays
      const payload = { ...formData };
      payload.allergies = payload.allergies ? payload.allergies.split(',').map(s => s.trim()).filter(Boolean) : [];
      payload.existingConditions = payload.existingConditions ? payload.existingConditions.split(',').map(s => s.trim()).filter(Boolean) : [];
      payload.age = Number(payload.age);

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
      <PageHeader title="Register New Patient" description="Enter patient details for emergency tracking and triage." />

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 bg-card border border-border shadow-sm p-8 rounded-3xl">
        
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-2">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input name="age" type="number" min="0" value={formData.age} onChange={handleChange} required placeholder="35" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="O+" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
            </div>
            <div className="space-y-2">
              <Label>Emergency Contact</Label>
              <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Relation & Phone" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Input name="address" value={formData.address} onChange={handleChange} placeholder="123 Street Name" />
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-2">Medical Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Symptoms</Label>
              <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full min-h-[80px] p-3 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="Describe the primary symptoms..."></textarea>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Diagnosis</Label>
              <Input name="diagnosis" value={formData.diagnosis} onChange={handleChange} placeholder="Preliminary Diagnosis" />
            </div>
            <div className="space-y-2">
              <Label>Allergies (comma separated)</Label>
              <Input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Peanuts, Penicillin" />
            </div>
            <div className="space-y-2">
              <Label>Existing Conditions (comma separated)</Label>
              <Input name="existingConditions" value={formData.existingConditions} onChange={handleChange} placeholder="Diabetes, Hypertension" />
            </div>
            <div className="space-y-2">
              <Label>Severity</Label>
              <select name="severity" value={formData.severity} onChange={handleChange} className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Doctor Notes</Label>
              <Input name="doctorNotes" value={formData.doctorNotes} onChange={handleChange} placeholder="Initial observations" />
            </div>
          </div>
        </div>

        {/* Required Resources */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-2">Required Resources</h3>
          <div className="flex flex-wrap gap-6">
            {Object.keys(formData.requiredResources).map(key => (
              <label key={key} className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="checkbox" 
                  name={key} 
                  checked={formData.requiredResources[key]} 
                  onChange={handleCheckboxChange} 
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4" 
                />
                {key.replace('needs', 'Needs ')}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Button type="button" onClick={() => navigate('/dashboard/doctor/patients')} variant="outline">Cancel</Button>
          <Button type="submit" disabled={isSubmitting} className="bg-cyan-600 hover:bg-cyan-500 text-white">
            {isSubmitting ? 'Registering...' : 'Register Patient'}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}

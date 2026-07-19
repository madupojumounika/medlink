import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';

export default function PatientRegistration() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Register New Patient" description="Enter patient details for emergency tracking and triage." />

      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 bg-card border border-border shadow-sm p-8 rounded-3xl">
        
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-2">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Doe" />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground border-b border-border pb-2">Current Status</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Chief Complaint / Symptoms</Label>
              <textarea className="w-full min-h-[100px] p-3 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" placeholder="Describe the primary symptoms..."></textarea>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Heart Rate (BPM)</Label>
                <Input type="number" placeholder="e.g. 80" />
              </div>
              <div className="space-y-2">
                <Label>Blood Pressure</Label>
                <Input placeholder="120/80" />
              </div>
              <div className="space-y-2">
                <Label>SpO2 (%)</Label>
                <Input type="number" placeholder="98" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">Register Patient</Button>
        </div>
      </motion.form>
    </div>
  );
}

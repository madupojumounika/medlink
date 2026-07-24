import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';


export default function ResourceManagement() {
  const [resources, setResources] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/v1/hospitals/resources');
      setResources(res.data.data);
    } catch (error) {
      console.error("Failed to load resources", error);
      alert("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/v1/hospitals/resources', resources);
      alert("Resources updated successfully");
      fetchResources();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update resources");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setResources({ ...resources, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;
  if (!resources) return null;

  const resourceGroups = [
    { title: "Beds", fields: [
      { name: "totalICUBeds", label: "Total ICU Beds" }, { name: "availableICUBeds", label: "Available ICU Beds" },
      { name: "totalGeneralBeds", label: "Total General Beds" }, { name: "availableGeneralBeds", label: "Available General Beds" },
      { name: "totalEmergencyBeds", label: "Total Emergency Beds" }, { name: "availableEmergencyBeds", label: "Available Emergency Beds" }
    ]},
    { title: "Equipment", fields: [
      { name: "totalVentilators", label: "Total Ventilators" }, { name: "availableVentilators", label: "Available Ventilators" },
      { name: "operationTheatres", label: "Operation Theatres" }, { name: "availableAmbulances", label: "Available Ambulances" }
    ]},
    { title: "Staff & Others", fields: [
      { name: "availableDoctors", label: "Available Doctors" }, { name: "nursesCount", label: "Nurses Count" },
      { name: "bloodUnits", label: "Blood Units" }
    ]}
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader title="Resource Management" description="Track and update hospital resources and equipment." />

      <form onSubmit={handleSubmit} className="space-y-6">
        {resourceGroups.map((group, index) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{group.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {group.fields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-xs text-slate-400">{field.label}</Label>
                    <Input 
                      type="number" 
                      min="0"
                      name={field.name} 
                      value={resources[field.name] || 0} 
                      onChange={handleChange} 
                      className="bg-slate-950/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSaving} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8">
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

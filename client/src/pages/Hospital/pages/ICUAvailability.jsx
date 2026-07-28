import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { Bed, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

// Clean Vercel-style Spotlight Card Component
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(120, 120, 120, 0.08), transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function ICUAvailability() {
  const [resources, setResources] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/v1/hospitals/resources');
      setResources(res.data.data);
    } catch (error) {
      console.error("Failed to load resources", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBedData = () => {
    if (!resources) return [];
    
    const beds = [];
    
    // ICU Beds
    const totalICU = resources.totalICUBeds || 0;
    const availICU = resources.availableICUBeds || 0;
    const occICU = Math.max(0, totalICU - availICU);
    
    for (let i = 0; i < availICU; i++) {
      beds.push({
        id: `ICU-${101 + i}`,
        type: 'Intensive Care Unit (Level 3)',
        status: 'Available',
        patient: 'Ready for Admission',
        admitted: '-'
      });
    }
    for (let i = 0; i < occICU; i++) {
      beds.push({
        id: `ICU-${101 + availICU + i}`,
        type: 'Intensive Care Unit (Level 3)',
        status: 'Occupied',
        patient: 'Active Critical Patient',
        admitted: 'Active Care'
      });
    }

    // Emergency Ward Beds
    const totalEmg = resources.totalEmergencyBeds || 0;
    const availEmg = resources.availableEmergencyBeds || 0;
    const occEmg = Math.max(0, totalEmg - availEmg);
    
    for (let i = 0; i < availEmg; i++) {
      beds.push({
        id: `EMG-${201 + i}`,
        type: 'Emergency & Trauma Bay',
        status: 'Available',
        patient: 'Ready for Triage',
        admitted: '-'
      });
    }
    for (let i = 0; i < occEmg; i++) {
      beds.push({
        id: `EMG-${201 + availEmg + i}`,
        type: 'Emergency & Trauma Bay',
        status: 'Occupied',
        patient: 'Emergency Admission',
        admitted: 'Observation'
      });
    }

    // General Ward Beds
    const totalGen = resources.totalGeneralBeds || 0;
    const availGen = resources.availableGeneralBeds || 0;
    const occGen = Math.max(0, totalGen - availGen);
    
    for (let i = 0; i < availGen; i++) {
      beds.push({
        id: `GEN-${301 + i}`,
        type: 'General Inpatient Ward',
        status: 'Available',
        patient: 'Ready for Transfer',
        admitted: '-'
      });
    }
    for (let i = 0; i < occGen; i++) {
      beds.push({
        id: `GEN-${301 + availGen + i}`,
        type: 'General Inpatient Ward',
        status: 'Occupied',
        patient: 'General Ward Patient',
        admitted: 'Stable Care'
      });
    }
    
    return beds;
  };

  const columns = [
    { 
      header: 'Bed ID', 
      accessorKey: 'id',
      cell: (row) => (
        <span className="font-mono font-bold text-xs bg-muted px-2 py-1 rounded border border-border">
          {row.id}
        </span>
      )
    },
    { 
      header: 'Care Level & Type', 
      accessorKey: 'type',
      cell: (row) => (
        <span className="text-sm font-medium text-foreground flex items-center gap-2">
          <Bed className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {row.type}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessorKey: 'status', 
      cell: (row) => (
        <StatusBadge status={row.status === 'Available' ? 'available' : row.status === 'Occupied' ? 'critical' : 'pending'}>
          {row.status}
        </StatusBadge>
      )
    },
    { 
      header: 'Current Occupant', 
      accessorKey: 'patient',
      cell: (row) => (
        <span className={`text-xs ${row.status === 'Available' ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-foreground'}`}>
          {row.patient}
        </span>
      )
    },
    { 
      header: 'Status Log', 
      accessorKey: 'admitted',
      cell: (row) => (
        <span className="text-xs font-mono text-muted-foreground">
          {row.admitted}
        </span>
      )
    },
  ];

  if (isLoading) return <div className="flex justify-center p-16"><Loader size="lg" /></div>;

  const totalICU = resources?.totalICUBeds || 0;
  const availICU = resources?.availableICUBeds || 0;
  const occICU = Math.max(0, totalICU - availICU);

  const totalGeneral = resources?.totalGeneralBeds || 0;
  const availGeneral = resources?.availableGeneralBeds || 0;
  const occGeneral = Math.max(0, totalGeneral - availGeneral);

  const totalEmergency = resources?.totalEmergencyBeds || 0;
  const availEmergency = resources?.availableEmergencyBeds || 0;
  const occEmergency = Math.max(0, totalEmergency - availEmergency);

  const totalAllBeds = totalICU + totalGeneral + totalEmergency;
  const availAllBeds = availICU + availGeneral + availEmergency;
  const occAllBeds = occICU + occGeneral + occEmergency;
  const occupancyRate = totalAllBeds > 0 ? Math.round((occAllBeds / totalAllBeds) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="ICU & Ward Bed Roster" 
          description="Real-time occupancy roster of critical care beds synced with Resource & Capacity Telemetry." 
        />
        <div className="flex items-center gap-2 self-start sm:self-center bg-card border border-border px-3.5 py-2 rounded-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Live Telemetry Roster</span>
          <div className="h-3.5 w-px bg-border mx-1" />
          <button 
            onClick={fetchResources} 
            disabled={isLoading}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
            title="Refresh Bed Roster"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </div>

      {/* Clean Vercel / Linear Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <SpotlightCard className="p-5 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Available Care Beds</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Bed className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{availAllBeds}</h3>
            <span className="text-xs text-muted-foreground font-mono">/ {totalAllBeds} total ready</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-1">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${totalAllBeds > 0 ? (availAllBeds / totalAllBeds) * 100 : 0}%` }} />
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Occupied Ward Units</span>
            <span className="p-2 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{occAllBeds}</h3>
            <span className="text-xs text-muted-foreground font-mono">active patients</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mt-1">
            <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${occupancyRate}%` }} />
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Bed Capacity</span>
            <span className="p-2 rounded-lg bg-muted border border-border text-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{totalAllBeds}</h3>
            <span className="text-xs text-muted-foreground font-mono">accredited beds</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono pt-1">
            Current Ward Occupancy: <span className="font-bold text-foreground">{occupancyRate}%</span>
          </p>
        </SpotlightCard>
      </div>

      {/* Roster Table */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.2 }}>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">Active Bed Directory</h3>
              <p className="text-xs text-muted-foreground">Granular status of each intensive care unit and admitted patient status.</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded border border-border">
              {generateBedData().length} Units Monitored
            </span>
          </div>
          <DataTable columns={columns} data={generateBedData()} placeholder="Search bed ID or patient status..." />
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';
import { 
  Bed, Activity, Heart, Wind, Truck, 
  Stethoscope, Users, UserCheck, Droplets, 
  CheckCircle2, AlertTriangle, RefreshCw, 
  Plus, Minus, RotateCcw, ShieldCheck 
} from 'lucide-react';

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

// Sub-component for Bed Capacity Cards
const CapacityItem = ({ title, icon: Icon, totalKey, availKey, resources, onUpdate, step = 1 }) => {
  const rawTotal = resources[totalKey];
  const rawAvail = resources[availKey];
  const total = rawTotal === '' ? '' : (Number(rawTotal) || 0);
  const avail = rawAvail === '' ? '' : (Number(rawAvail) || 0);
  
  const numTotal = Number(total) || 0;
  const numAvail = Number(avail) || 0;
  const occupied = Math.max(0, numTotal - numAvail);
  const percent = numTotal > 0 ? Math.min(100, Math.round((occupied / numTotal) * 100)) : 0;
  const isOverCapacity = numAvail > numTotal;

  const handleStepAvail = (delta) => {
    const nextVal = Math.min(numTotal, Math.max(0, numAvail + delta));
    onUpdate(availKey, nextVal);
  };

  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3 transition-all hover:bg-muted/30">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 font-semibold text-sm text-foreground">
          <div className="p-2 rounded-lg bg-card border border-border text-foreground shadow-2xs">
            <Icon className="w-4 h-4" />
          </div>
          <span>{title}</span>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          isOverCapacity
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
            : percent > 85
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        }`}>
          {isOverCapacity ? 'Error: Avail > Total' : `${percent}% Occupied`}
        </span>
      </div>

      {/* Visual Capacity Progress Bar */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isOverCapacity ? 'bg-rose-500' : percent > 85 ? 'bg-amber-500' : 'bg-primary'
            }`} 
            style={{ width: `${Math.min(100, percent)}%` }} 
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
          <span>{occupied} in use</span>
          <span>{numAvail} available</span>
          <span>{numTotal} total capacity</span>
        </div>
      </div>

      {/* Dual Inputs with Quick Steppers */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-1">
          <Label className="text-[11px] text-muted-foreground font-medium">Total Units</Label>
          <Input 
            type="number" 
            min="0"
            value={total} 
            onChange={(e) => onUpdate(totalKey, e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} 
            className="h-9 text-xs font-mono bg-background border-border text-center"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-[11px] text-muted-foreground font-medium">Available Now</Label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleStepAvail(-step)}
              disabled={numAvail <= 0}
              className="h-9 px-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="Decrement available (-1)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <Input 
              type="number" 
              min="0"
              max={numTotal}
              value={avail} 
              onChange={(e) => onUpdate(availKey, e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} 
              className={`h-9 text-xs font-mono text-center font-bold bg-background border-border ${
                isOverCapacity ? 'text-rose-600 dark:text-rose-400 border-rose-500/50' : 'text-foreground'
              }`}
            />
            <button
              type="button"
              onClick={() => handleStepAvail(step)}
              disabled={numAvail >= numTotal}
              className="h-9 px-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="Increment available (+1)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Single Telemetry Items (Personnel, Equipment & Blood)
const SingleTelemetryItem = ({ title, icon: Icon, fieldKey, resources, onUpdate, step = 1, unit = "units" }) => {
  const rawVal = resources[fieldKey];
  const val = rawVal === '' ? '' : (Number(rawVal) || 0);
  const numVal = Number(val) || 0;

  const handleStep = (delta) => {
    const nextVal = Math.max(0, numVal + delta);
    onUpdate(fieldKey, nextVal);
  };

  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col justify-between space-y-3 transition-all hover:bg-muted/30">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 font-semibold text-sm text-foreground">
          <div className="p-2 rounded-lg bg-card border border-border text-foreground shadow-2xs">
            <Icon className="w-4 h-4" />
          </div>
          <span>{title}</span>
        </div>

        <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
          {unit}
        </span>
      </div>

      <div className="pt-2">
        <Label className="text-[11px] text-muted-foreground font-medium block mb-1">Current Readiness Level</Label>
        <div className="flex items-center gap-1.5 w-full">
          <button
            type="button"
            onClick={() => handleStep(-step)}
            disabled={numVal <= 0}
            className="h-10 px-3 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title={`Decrement (-${step})`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <Input 
            type="number" 
            min="0"
            value={val} 
            onChange={(e) => onUpdate(fieldKey, e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} 
            className="h-10 text-sm font-mono text-center font-bold bg-background border-border flex-1"
          />
          <button
            type="button"
            onClick={() => handleStep(step)}
            className="h-10 px-3 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            title={`Increment (+${step})`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ResourceManagement() {
  const [resources, setResources] = useState(null);
  const [initialState, setInitialState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/v1/hospitals/resources');
      const data = res.data?.data || {};
      setResources(data);
      setInitialState(data);
    } catch (error) {
      console.error("Failed to load resources", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateField = (keyOrObj, value) => {
    if (typeof keyOrObj === 'object') {
      setResources(prev => ({ ...prev, ...keyOrObj }));
    } else {
      setResources(prev => ({ ...prev, [keyOrObj]: value }));
    }
    setShowSuccess(false);
  };

  const handleReset = () => {
    if (initialState) {
      setResources({ ...initialState });
      setShowSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);
    try {
      await api.put('/v1/hospitals/resources', resources);
      setInitialState({ ...resources });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4500);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update resources");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-16"><Loader size="lg" /></div>;
  if (!resources) return null;

  const isDirty = JSON.stringify(resources) !== JSON.stringify(initialState);

  return (
    <div className="space-y-6 max-w-6xl font-sans text-foreground pb-20">
      {/* Command Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader 
          title="Resource & Capacity Telemetry" 
          description="Real-time triage telemetry for ICU beds, life support units, and medical personnel dispatch." 
        />
        <div className="flex items-center gap-2 self-start sm:self-center bg-card border border-border px-3.5 py-2 rounded-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Dispatch Synced</span>
          <div className="h-3.5 w-px bg-border mx-1" />
          <button 
            onClick={fetchResources} 
            disabled={isLoading || isSaving}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
            title="Sync Latest Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>
      </div>

      {/* Inline Success Toast / Banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Telemetry Successfully Broadcasted</h4>
                <p className="text-xs opacity-90">All emergency departments and dispatch ambulances now reflect your updated capacity.</p>
              </div>
            </div>
            <span className="text-xs font-mono opacity-70">200 OK</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Bed Capacity & Critical Wards */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <SpotlightCard className="p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted/60 border border-border text-foreground flex items-center justify-center">
                  <Bed className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    Ward Capacity & Critical Beds
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Adjust available beds in real time. Use quick steppers (-1/+1) when trauma admissions arrive.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                Telemetry Group: Wards
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <CapacityItem 
                title="ICU Care Beds" 
                icon={Activity} 
                totalKey="totalICUBeds" 
                availKey="availableICUBeds" 
                resources={resources} 
                onUpdate={handleUpdateField} 
              />
              <CapacityItem 
                title="Emergency Ward" 
                icon={Heart} 
                totalKey="totalEmergencyBeds" 
                availKey="availableEmergencyBeds" 
                resources={resources} 
                onUpdate={handleUpdateField} 
              />
              <CapacityItem 
                title="General Wards" 
                icon={Bed} 
                totalKey="totalGeneralBeds" 
                availKey="availableGeneralBeds" 
                resources={resources} 
                onUpdate={handleUpdateField} 
              />
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Section 2: Life Support & Specialized Equipment */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.2 }}>
          <SpotlightCard className="p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted/60 border border-border text-foreground flex items-center justify-center">
                  <Wind className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    Life Support & Emergency Fleet
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Monitor respiratory ventilators, surgical suites, and active emergency transport fleet.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                Telemetry Group: Fleet & Support
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <CapacityItem 
                title="Mechanical Ventilators" 
                icon={Wind} 
                totalKey="totalVentilators" 
                availKey="availableVentilators" 
                resources={resources} 
                onUpdate={handleUpdateField} 
              />
              <SingleTelemetryItem 
                title="Operation Theatres" 
                icon={Stethoscope} 
                fieldKey="operationTheatres" 
                resources={resources} 
                onUpdate={handleUpdateField} 
                unit="theatres ready"
              />
              <SingleTelemetryItem 
                title="Available Ambulances" 
                icon={Truck} 
                fieldKey="availableAmbulances" 
                resources={resources} 
                onUpdate={handleUpdateField} 
                unit="units on standby"
              />
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Section 3: Personnel & Blood Bank Reserves */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.2 }}>
          <SpotlightCard className="p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted/60 border border-border text-foreground flex items-center justify-center">
                  <Users className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">
                    Medical Personnel & Blood Reserves
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Active shift staff counts and emergency blood bank units available for trauma transfusions.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
                Telemetry Group: Personnel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SingleTelemetryItem 
                title="On-Duty Doctors" 
                icon={UserCheck} 
                fieldKey="availableDoctors" 
                resources={resources} 
                onUpdate={handleUpdateField} 
                unit="doctors on call"
              />
              <SingleTelemetryItem 
                title="Active Nurses Staff" 
                icon={Users} 
                fieldKey="nursesCount" 
                resources={resources} 
                onUpdate={handleUpdateField} 
                unit="nurses on shift"
              />
              <SingleTelemetryItem 
                title="Blood Bank Reserves" 
                icon={Droplets} 
                fieldKey="bloodUnits" 
                resources={resources} 
                onUpdate={handleUpdateField} 
                step={5}
                unit="units (all types)"
              />
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Floating / Sticky Command Action Footer */}
        <div className="sticky bottom-6 z-30 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                Real-Time Dispatch Routing Ready
                {isDirty && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Unsaved Telemetry Changes
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Updating these figures immediately adjusts emergency ambulance routing to your facility.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSaving}
                className="flex-1 sm:flex-none px-4 py-5 rounded-xl text-xs font-semibold border-border hover:bg-muted text-muted-foreground flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Discard Changes
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSaving || !isDirty}
              className="flex-1 sm:flex-none px-6 py-5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader size="sm" /> Broadcasting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Save Telemetry & Update Dispatch
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

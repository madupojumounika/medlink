import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { Stethoscope, Activity, Building2, MapPin, Users, HeartPulse, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIHospitalRecommendation() {
  const [patientId, setPatientId] = useState('');
  const [specialty, setSpecialty] = useState('Cardiology');
  const [severity, setSeverity] = useState('High');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRecommend = async () => {
    if (!patientId.trim()) {
      setError("Please enter a valid Patient ID");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await api.post(`/v1/hospitals/patients/${patientId}/recommend-hospital`, {
        specialty,
        severity
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Stethoscope className="w-24 h-24 text-cyan-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Hospital Recommendation</h3>
            <p className="text-sm text-cyan-200/60">Find the best destination hospital for an outgoing patient.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Patient ID..."
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <select 
            value={specialty} 
            onChange={(e) => setSpecialty(e.target.value)}
            className="bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Trauma">Trauma</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
          <select 
            value={severity} 
            onChange={(e) => setSeverity(e.target.value)}
            className="bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <Button 
            onClick={handleRecommend} 
            disabled={isLoading || !patientId}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
          >
            {isLoading ? "Analyzing..." : "Get Recommendation"}
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader size="md" />
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-center gap-3 text-rose-400">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="p-5 bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-cyan-400" />
                    {result.recommendedHospital}
                  </h4>
                  <div className="flex gap-4 mt-2 text-sm text-slate-300">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400" /> {result.distanceKm} km away</span>
                    <span className="flex items-center gap-1"><HeartPulse className="w-4 h-4 text-rose-400" /> {result.specialty} Match</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-cyan-400">{Math.round(result.recommendationScore * 100)}%</div>
                  <div className="text-xs font-semibold text-cyan-200/50 uppercase tracking-wider">Match Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-950/50 rounded-lg p-3 border border-white/5 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{result.icuBedsAvailable}</div>
                    <div className="text-xs text-slate-400">Available ICU Beds</div>
                  </div>
                </div>
                <div className="bg-slate-950/50 rounded-lg p-3 border border-white/5 flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-lg font-bold text-white">{result.availableDoctors}</div>
                    <div className="text-xs text-slate-400">Available Doctors</div>
                  </div>
                </div>
              </div>

              {result.recommendationReasons && result.recommendationReasons.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h5 className="text-sm font-semibold text-white mb-2">Why this hospital?</h5>
                  <ul className="space-y-1">
                    {result.recommendationReasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-500 mt-0.5">•</span> {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

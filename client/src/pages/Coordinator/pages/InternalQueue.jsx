import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Loader } from '@/components/common/Loader';

import { useNavigate } from 'react-router-dom';

export default function InternalQueue({ historyMode = false }) {
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReferrals();
  }, [historyMode]);

  const fetchReferrals = async () => {
    try {
      const endpoint = historyMode ? '/v1/referrals/history' : '/v1/referrals/internal';
      const res = await api.get(endpoint);
      setReferrals(res.data.data);
    } catch (error) {
      alert('Failed to load referrals');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReferrals = referrals.filter(r => 
    r.patientId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return <span className="px-2 py-1 text-xs rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/20">Critical</span>;
      case 'High': return <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-500 border border-orange-500/20">High</span>;
      case 'Medium': return <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/20">Medium</span>;
      default: return <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">Low</span>;
    }
  };

  const getStatusType = (status) => {
    if (status === 'Sent To Hospital' || status === 'Accepted' || status === 'Completed') return 'available';
    if (status === 'Cancelled' || status === 'Rejected') return 'critical';
    return 'pending';
  };

  if (isLoading) return <div className="flex justify-center p-12"><Loader size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title={historyMode ? "Referral History" : "Internal Queue"} 
          description={historyMode ? "View processed and sent referrals." : "Manage referrals forwarded by doctors."} 
        />
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by patient or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Patient Info</th>
                <th className="px-6 py-4 font-medium">Diagnosis</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                {historyMode && <th className="px-6 py-4 font-medium">Destination</th>}
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReferrals.map((referral) => (
                <tr key={referral._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium">{referral.patientId?.name || 'Unknown'}</div>
                    <div className="text-xs text-muted-foreground">Referred by Dr. {referral.doctorId?.fullName || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground truncate max-w-[200px]">
                    {referral.diagnosis || 'Pending Diagnosis'}
                  </td>
                  <td className="px-6 py-4">
                    {getSeverityBadge(referral.severity)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={getStatusType(referral.status)}>
                      {referral.status}
                    </StatusBadge>
                  </td>
                  {historyMode && (
                    <td className="px-6 py-4 text-muted-foreground">
                      {referral.toHospitalId ? referral.toHospitalId.name : '-'}
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <Button onClick={() => navigate(`/dashboard/coordinator/referrals/${referral._id}`)} variant="outline" size="sm" className="flex items-center gap-2 ml-auto">
                      <FileText className="w-4 h-4" /> View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredReferrals.length === 0 && (
                <tr>
                  <td colSpan={historyMode ? "6" : "5"} className="px-6 py-8 text-center text-muted-foreground">
                    No referrals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

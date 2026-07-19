import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ambulancePos = [40.7128, -74.0060];
const hospitalPos = [40.7306, -73.9352];

export default function LiveMap() {
  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader title="Live Map & Navigation" description="Real-time GPS tracking and route optimization." />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative z-0">
        <MapContainer center={ambulancePos} zoom={13} style={{ height: '100%', width: '100%', background: '#0f172a' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap & CartoDB'
          />
          <Marker position={ambulancePos}>
            <Popup>Ambulance ALS-44</Popup>
          </Marker>
          <Marker position={hospitalPos}>
            <Popup>Northside Trauma Center</Popup>
          </Marker>
          <Polyline positions={[ambulancePos, hospitalPos]} color="#06b6d4" weight={4} dashArray="10, 10" />
        </MapContainer>
        
        {/* Overlay Overlay Info */}
        <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl">
          <h3 className="text-white font-bold mb-1">Route to Hospital</h3>
          <p className="text-emerald-400 font-semibold text-sm">4.5 miles • ETA 12 mins</p>
          <p className="text-slate-400 text-xs mt-1">Traffic is light</p>
        </div>
      </motion.div>
    </div>
  );
}

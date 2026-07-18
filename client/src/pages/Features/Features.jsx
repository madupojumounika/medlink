import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Ambulance, Network, BarChart, Lock, Users, ShieldCheck, Zap, Globe2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Features() {
  const features = [
    {
      icon: Building2,
      title: 'Hospital Resource Management',
      desc: 'Live tracking of bed availability across wards, specialized medical equipment, and real-time on-call staff rosters.'
    },
    {
      icon: Ambulance,
      title: 'Advanced EMS Dispatch',
      desc: 'Real-time GPS tracking for ambulances, dynamic route optimization avoiding traffic, and precise hospital ETAs.'
    },
    {
      icon: Network,
      title: 'Intelligent Patient Referrals',
      desc: 'AI-driven automated matching of critical patients to the correct specialists based on medical acuity and distance.'
    },
    {
      icon: BarChart,
      title: 'Global Analytics Dashboard',
      desc: 'Comprehensive real-time metrics on transfer times, hospital load distributions, and system-wide efficiency.'
    },
    {
      icon: Lock,
      title: 'Secure Health Records',
      desc: 'End-to-end encrypted, HIPAA-compliant patient data transfer between emergency responders and receiving hospitals.'
    },
    {
      icon: Users,
      title: 'Multi-Platform Access',
      desc: 'Dedicated, role-based interfaces specifically tailored for Doctors, Hospital Administrators, and EMTs.'
    },
    {
      icon: ShieldCheck,
      title: 'Compliance & Audit',
      desc: 'Automated logging of all transfers, communications, and access records for seamless regulatory compliance.'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      desc: 'Cloud-native architecture allows entire regional hospital networks to onboard and go live within 48 hours.'
    },
    {
      icon: Globe2,
      title: 'Multi-Language Support',
      desc: 'Real-time translation and localization for cross-border emergency transports and multi-national teams.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger} 
          className="text-center space-y-4 mb-20"
        >
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Platform <span className="text-primary">Features</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Discover the comprehensive suite of tools powering the next generation of global emergency medical routing.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">Command Center</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Real-time Global Routing</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Visualize ambulance fleets, hospital capacities, and live traffic across any region in the world. Our 3D glassmorphism dashboard aggregates millions of data points to ensure you have complete operational awareness during mass casualty events.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/40 group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay" />
            <img src="/images/features-hero.png" alt="3D Dashboard" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
          </div>
        </motion.div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Core Capabilities</h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="flex flex-col p-8 bg-card border border-border/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

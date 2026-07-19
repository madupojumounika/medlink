import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, HeartPulse } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      <section className="relative pt-32 pb-32 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 z-0 bg-[url('/images/about-hero.png')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-slate-950/80 backdrop-blur-sm"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-7xl text-center text-white">
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Our <span className="text-primary">Mission</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              We are building the infrastructure to make borderless, instant emergency healthcare a reality for everyone, everywhere.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold tracking-tight">The Global Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every year, millions of critical minutes are lost due to fragmented communication between first responders and hospitals. In emergencies, time is tissue. We realized that solving this wasn't just a matter of better ambulances, but better data routing.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MedLink AI was founded by a team of trauma surgeons and distributed systems engineers who saw firsthand how archaic dispatch systems cost lives.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Shield, title: "Reliability", desc: "99.999% uptime for critical systems." },
                { icon: Target, title: "Precision", desc: "AI-routed to the exact specialist needed." },
                { icon: HeartPulse, title: "Compassion", desc: "Patient outcomes above all else." },
                { icon: Users, title: "Collaboration", desc: "Unifying fragmented medical teams." }
              ].map((val, i) => (
                <div key={i} className="p-6 bg-card border border-border/40 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <val.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                  <p className="text-sm text-muted-foreground">{val.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-slate-200 dark:bg-slate-800 mb-6 border-4 border-background shadow-xl overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 11}`} alt="Team Member" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold">Dr. Jane Doe</h3>
                <p className="text-primary font-medium mb-3">Co-Founder & CEO</p>
                <p className="text-muted-foreground text-sm max-w-xs">Former Chief of Trauma at General Hospital, bringing 15 years of front-line medical experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

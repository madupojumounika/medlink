import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  MapPin, Phone, Mail, Clock, Send, Loader2, Sparkles, 
  CheckCircle2, ShieldCheck, ArrowRight, Building2, 
  HelpCircle, MessageSquare, Globe2, Shield
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  organization: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'Hospital Network Deployment'
    }
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#ecfdf5] via-[#f0fdf4] to-white text-slate-900 selection:bg-emerald-600 selection:text-white font-sans antialiased pt-28 pb-24">
      
      <div className="container relative mx-auto px-6 lg:px-12 max-w-[1350px]">
        
        {/* Ambient Light Green Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-[30rem] h-[30rem] bg-teal-300/20 rounded-full blur-[140px] pointer-events-none"></div>

        {/* 1. Hero Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger} 
          className="text-center space-y-5 max-w-4xl mx-auto mb-16 relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '4s' }} />
            24/7 Global Clinical & Technical Support
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900">
            Connect with our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 drop-shadow-sm">
              Clinical & Enterprise Teams
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you are onboarding a 1,000-bed regional hospital network, integrating ambulance telemetry, or scheduling an AI routing simulation, our engineers are ready.
          </motion.p>
        </motion.div>

        {/* 2. Main 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 relative z-10">
          
          {/* Left Column: Department Channels & Global Offices */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-6">Direct Department Channels</h3>
              <div className="space-y-4">
                {[
                  { icon: Building2, title: "Enterprise Hospital Sales", email: "sales@medlink.ai", desc: "For health networks & multi-facility deployments (500+ beds)." },
                  { icon: ShieldCheck, title: "24/7 Emergency Dispatch Tech Support", email: "ops-support@medlink.ai", desc: "Priority hotline for active command centers (< 2 min response SLA)." },
                  { icon: Globe2, title: "Clinical Research & Partnerships", email: "research@medlink.ai", desc: "Academic medical centers & government disaster relief programs." },
                ].map((dept, i) => (
                  <div key={i} className="bg-white/80 hover:bg-white border border-emerald-200/70 hover:border-emerald-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <dept.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">{dept.title}</h4>
                        <p className="text-xs font-mono text-emerald-700 font-bold mt-0.5">{dept.email}</p>
                        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{dept.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-900 via-[#022c22] to-slate-950 text-white rounded-3xl p-7 shadow-xl border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-4 h-4 text-emerald-400" /> Global Headquarters
              </div>
              <h4 className="text-xl font-extrabold text-white mb-2">MedLink AI Corp.</h4>
              <p className="text-emerald-100/80 text-xs leading-relaxed mb-4">
                100 Innovation Drive, Suite 400<br />
                San Francisco, CA 94103, United States
              </p>
              <div className="pt-4 border-t border-emerald-800/60 flex items-center justify-between text-xs font-mono text-emerald-300">
                <span>Tel: +1 (800) 555-0199</span>
                <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">UTC-8 PST</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-xs text-emerald-900">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
              <span><strong>HIPAA & GDPR Compliant:</strong> All submitted contact information and clinical inquiries are encrypted with 256-bit AES protection.</span>
            </div>
          </motion.div>

          {/* Right Column: Premium Glassmorphism Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-emerald-200/80 rounded-3xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(16,185,129,0.12)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500"></div>

              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Send an Enterprise Inquiry</h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Our clinical solutions architecture team will review your requirements within 2 hours.</p>
              </div>

              {isSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900">Inquiry Received & Logged!</h4>
                  <p className="text-slate-600 text-sm max-w-md">
                    Thank you for contacting MedLink AI. A dedicated clinical deployment architect has been assigned to your case and will email you shortly.
                  </p>
                  <div className="pt-4">
                    <Button onClick={() => setIsSuccess(false)} variant="outline" size="sm" className="border-emerald-300 text-emerald-800 rounded-xl">
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold text-slate-700">Full Name & Title <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name" 
                        placeholder="Dr. John Smith, Chief of Surgery" 
                        disabled={isSubmitting} 
                        className="h-11 bg-slate-50/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-xs w-full"
                        {...register('name')} 
                      />
                      {errors.name && <p className="text-xs font-medium text-red-600">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold text-slate-700">Work Email Address <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="jsmith@hospital-network.org" 
                        disabled={isSubmitting} 
                        className="h-11 bg-slate-50/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-xs w-full"
                        {...register('email')} 
                      />
                      {errors.email && <p className="text-xs font-medium text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-xs font-bold text-slate-700">Hospital Network or Organization</Label>
                      <Input 
                        id="organization" 
                        placeholder="General Medical Center (500 Beds)" 
                        disabled={isSubmitting} 
                        className="h-11 bg-slate-50/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-xs w-full"
                        {...register('organization')} 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType" className="text-xs font-bold text-slate-700">Inquiry Classification <span className="text-red-500">*</span></Label>
                      <select
                        id="inquiryType"
                        disabled={isSubmitting}
                        className="h-11 flex w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
                        {...register('inquiryType')}
                      >
                        <option value="Hospital Network Deployment">Hospital Network Deployment (Command Center)</option>
                        <option value="EMS Fleet Integration">EMS Fleet & Ambulance Telemetry Integration</option>
                        <option value="Clinical Triage AI Simulation">Clinical Triage AI Simulation & Demo</option>
                        <option value="EHR / Interoperability API">EHR (Epic/Cerner) Interoperability API</option>
                        <option value="General Technical Inquiry">General Technical or Academic Inquiry</option>
                      </select>
                      {errors.inquiryType && <p className="text-xs font-medium text-red-600">{errors.inquiryType.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-bold text-slate-700">System Requirements & Operational Scope <span className="text-red-500">*</span></Label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="flex w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 resize-none leading-relaxed"
                      placeholder="Please outline your regional coverage area, estimated annual emergency admissions, current EHR software, or specific routing bottlenecks..."
                      disabled={isSubmitting}
                      {...register('message')}
                    />
                    {errors.message && <p className="text-xs font-medium text-red-600">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all rounded-xl border-0" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authorizing Clinical Transmission...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Transmit Inquiry to Deployment Team</>
                    )}
                  </Button>
                </form>
              )}

            </div>
          </motion.div>

        </div>

        {/* 3. FAQ Quick Reference Strip */}
        <div className="bg-white/80 border border-emerald-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative z-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Common Onboarding Questions</h3>
            <p className="text-slate-500 text-xs">Everything you need to know about initiating a MedLink AI deployment.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "How long does enterprise deployment take?", a: "Our cloud-native architecture enables zero-downtime integration. Most 500+ bed hospital networks achieve live operational status within 48 hours without disrupting legacy systems." },
              { q: "Do you integrate with Epic, Cerner, and Meditech?", a: "Yes. MedLink AI utilizes pre-built FHIR (Fast Healthcare Interoperability Resources) and HL7 connectors for bidirectional real-time EHR telemetry." },
              { q: "Is specialized hardware required for EMS fleets?", a: "No. Ambulance telemetry runs on any standard iOS, Android, or ruggedized vehicle tablet via our lightweight EMT field application with offline GPS caching." }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50/80 border border-emerald-100 hover:border-emerald-400 transition-colors">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" /> {faq.q}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}


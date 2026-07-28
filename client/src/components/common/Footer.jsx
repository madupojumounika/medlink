import * as React from "react"
import { Link } from "react-router-dom"
import { Activity, Globe, MessageCircle, BookOpen, Mail, ArrowRight } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">

      <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-[url('/images/globe-3d.png')] bg-contain bg-no-repeat bg-center opacity-20 pointer-events-none mix-blend-screen" />

      <div className="container relative mx-auto px-6 lg:px-12 py-16 lg:py-20 max-w-[1350px] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shadow-sm">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-extrabold tracking-tight text-xl">MedLink AI</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-xs font-normal">
              The global standard for borderless, AI-driven emergency medical routing. Connecting hospitals, specialists, coordinators, and first responders seamlessly.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800 text-slate-400">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800 text-slate-400">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800 text-slate-400">
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Platform Modules</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li><Link to="/features" className="hover:text-white transition-colors">Hospital Command Center</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Doctor Clinical Triage</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Referral Coordinator</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Ambulance Live Map & EMS</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">System Analytics & Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Ecosystem</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About MedLink AI</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Triage Protocol FAQ</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center & Support</Link></li>
              <li><Link to="/feedback" className="hover:text-white transition-colors">Clinical Feedback</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Enterprise Sales</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-4 font-normal">Subscribe to our clinical telemetry and triage network updates.</p>
            <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-9 text-xs w-full rounded-lg focus:border-slate-700"
                />
              </div>
              <Button className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-md rounded-lg">
                Subscribe <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/60 gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} MedLink AI. All rights reserved. Built for borderless emergency healthcare.
          </p>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy (HIPAA)</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/support" className="hover:text-slate-300 transition-colors">Security Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


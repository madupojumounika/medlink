import * as React from "react"
import { Link } from "react-router-dom"
import { Activity, Globe, MessageCircle, BookOpen, Mail, ArrowRight } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">

      <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-[url('/images/globe-3d.png')] bg-contain bg-no-repeat bg-center opacity-20 pointer-events-none mix-blend-screen" />

      <div className="container relative mx-auto px-4 md:px-6 py-16 lg:py-20 max-w-7xl z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white">
              <Activity className="h-7 w-7 text-primary" />
              <span className="font-bold tracking-tight text-2xl">MedLink AI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              The global standard for borderless, AI-driven emergency medical routing. Connecting hospitals and first responders seamlessly.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors border border-slate-800">
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Command Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">EMS Dispatch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-9 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-10 w-full"
                />
              </div>
              <Button className="w-full h-10 bg-primary hover:bg-primary/90 text-white shadow-lg">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800/60 gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} MedLink AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

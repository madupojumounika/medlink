import * as React from "react"
import { Link } from "react-router-dom"
import { Activity } from "lucide-react"
import { Button } from "./Button"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white/85 border-b border-emerald-200/60 backdrop-blur-md shadow-[0_2px_15px_rgba(16,185,129,0.06)]">
      <div className="container flex h-16 items-center justify-between px-6 lg:px-12 mx-auto max-w-[1350px]">

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Activity className="h-4 w-4 text-emerald-600 animate-pulse" />
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:inline-block text-emerald-950 drop-shadow-sm">
              MedLink AI
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link key={item.name} to={item.path} className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors relative group">
              {item.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/auth/login" className="hidden sm:inline-flex text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors">
            Log in
          </Link>
          <Link to="/auth/register">
            <Button className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 shadow-[0_4px_15px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] rounded-lg px-5 py-1.5 h-9 text-xs font-bold transition-all overflow-hidden group">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              Request Demo
            </Button>
          </Link>
        </div>

      </div>
    </header>
  )
}

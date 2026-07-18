import * as React from "react"
import { Link } from "react-router-dom"
import { Activity } from "lucide-react"
import { Button } from "./Button"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-transparent border-b border-white/5 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-6 lg:px-12 mx-auto max-w-[1400px]">

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight hidden sm:inline-block text-white drop-shadow-md">
              MedLink
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link key={item.name} to={item.path} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors relative group">
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/auth/login" className="hidden sm:inline-flex text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/auth/register">
            <Button className="relative bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] rounded-lg px-6 py-2 h-10 text-sm font-bold transition-all overflow-hidden group">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              Request Demo
            </Button>
          </Link>
        </div>

      </div>
    </header>
  )
}

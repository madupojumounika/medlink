import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Activity, LayoutDashboard, Users, Calendar, Settings, LogOut, FileText, UserSquare, Bed, Database, HeartPulse, Stethoscope, AlertTriangle, Map, MapPin, Building, Truck, ShieldCheck } from "lucide-react"
import { cn } from "@/utils/cn"
import { useAuth } from "@/hooks/useAuth"

const hospitalNavigation = [
  { name: 'Dashboard', href: '/dashboard/hospital', icon: LayoutDashboard },
  { name: 'Hospital Profile', href: '/dashboard/hospital/profile', icon: UserSquare },
  { name: 'ICU & Beds', href: '/dashboard/hospital/icu', icon: Bed },
  { name: 'Resources', href: '/dashboard/hospital/resources', icon: Database },
  { name: 'Doctors', href: '/dashboard/hospital/doctors', icon: Stethoscope },
  { name: 'Referrals', href: '/dashboard/hospital/referrals', icon: FileText },
  { name: 'Emergency Queue', href: '/dashboard/hospital/patients', icon: AlertTriangle },
  { name: 'Analytics', href: '/dashboard/analytics', icon: Activity },
  { name: 'Settings', href: '/dashboard/hospital/settings', icon: Settings },
]

const doctorNavigation = [
  { name: 'Dashboard', href: '/dashboard/doctor', icon: LayoutDashboard },
  { name: 'Register Patient', href: '/dashboard/doctor/patients/new', icon: Users },
  { name: 'AI Severity', href: '/dashboard/doctor/severity', icon: Activity },
  { name: 'New Referral', href: '/dashboard/doctor/referrals/new', icon: HeartPulse },
  { name: 'Referral History', href: '/dashboard/doctor/referrals', icon: FileText },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bed },
  { name: 'Profile', href: '/dashboard/profile', icon: UserSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const ambulanceNavigation = [
  { name: 'Dashboard', href: '/dashboard/ambulance', icon: LayoutDashboard },
  { name: 'Available Requests', href: '/dashboard/ambulance/requests/available', icon: Activity },
  { name: 'Assigned Requests', href: '/dashboard/ambulance/requests/assigned', icon: HeartPulse },
  { name: 'Live Map', href: '/dashboard/ambulance/map', icon: Map },
  { name: 'Route Details', href: '/dashboard/ambulance/route', icon: MapPin },
  { name: 'Trip History', href: '/dashboard/ambulance/history', icon: FileText },
  { name: 'Driver Profile', href: '/dashboard/profile', icon: UserSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Hospitals', href: '/dashboard/admin/hospitals', icon: Building },
  { name: 'Doctors', href: '/dashboard/admin/doctors', icon: Stethoscope },
  { name: 'Ambulances', href: '/dashboard/admin/ambulances', icon: Truck },
  { name: 'Patients', href: '/dashboard/admin/patients', icon: Users },
  { name: 'Live Monitoring', href: '/dashboard/admin/monitoring', icon: HeartPulse },
  { name: 'Analytics', href: '/dashboard/analytics', icon: Activity },
  { name: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
  { name: 'User Roles', href: '/dashboard/admin/roles', icon: ShieldCheck },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()

  // Determine which navigation to show based on user role
  const getNavigation = () => {
    switch (user?.role) {
      case 'hospital':
        return hospitalNavigation;
      case 'doctor':
        return doctorNavigation;
      case 'ambulance':
        return ambulanceNavigation;
      case 'admin':
        return adminNavigation;
      default:
        return [];
    }
  }

  const navigation = getNavigation();

  return (
    <div className="hidden border-r border-border bg-card md:block w-64 flex-shrink-0 min-h-screen transition-all duration-300">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-border px-4 lg:h-[60px] lg:px-6 bg-card">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Activity className="h-6 w-6 text-cyan-500" />
            <span className="text-foreground text-lg tracking-tight">MedLink AI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== `/dashboard/${user?.role}`);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2 text-sm font-medium text-muted-foreground">
            <UserSquare className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{user?.email || 'User'}</span>
          </div>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-500/80 transition-all hover:bg-rose-500/10 hover:text-rose-500">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

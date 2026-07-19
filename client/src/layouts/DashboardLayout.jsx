import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/common/Sidebar';
import { Bell, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useAuth } from '@/hooks/useAuth';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-4 flex-1 w-full max-w-full overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background border-border pl-8 md:w-[200px] lg:w-[320px] focus-visible:ring-cyan-500"
            />
          </div>
          
          <Button variant="outline" size="icon" className="relative border-border hover:bg-muted" onClick={() => navigate('/dashboard/notifications')}>
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
            <span className="sr-only">Toggle notifications</span>
          </Button>

          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border ml-2">
            <div className="flex flex-col text-right">
              <span className="text-sm font-medium text-foreground leading-none">{user?.fullName || user?.hospitalName || user?.driverName || user?.adminName || 'User'}</span>
              <span className="text-xs text-cyan-400 capitalize mt-1">{user?.role || 'Guest'}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              {user?.fullName?.charAt(0) || user?.hospitalName?.charAt(0) || user?.driverName?.charAt(0) || user?.adminName?.charAt(0) || 'U'}
            </div>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 md:hidden" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </header>
        <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

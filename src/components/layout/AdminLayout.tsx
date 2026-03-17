import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Scale, LayoutDashboard, FileText, Users, GraduationCap,
  Image, Calendar, CreditCard, Settings, LogOut, Menu, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navSections = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/announcements', label: 'Announcements', icon: FileText },
      { to: '/admin/executives', label: 'Executives', icon: Users },
      { to: '/admin/lecturers', label: 'Lecturers', icon: GraduationCap },
      { to: '/admin/gallery', label: 'Gallery', icon: Image },
    ],
  },
  {
    label: 'Academic',
    items: [
      { to: '/admin/timetable', label: 'Timetable', icon: Calendar },
    ],
  },
  {
    label: 'Settings',
    items: [
      { to: '/admin/pay-dues', label: 'Pay Dues', icon: CreditCard },
      { to: '/admin/settings', label: 'Site Settings', icon: Settings },
    ],
  },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-border">
        <Link to="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="LSS ABUAD Logo" className="h-8 w-auto" />
          <span className="font-display font-bold text-sm text-secondary">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-ui font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded text-sm font-ui transition-colors duration-200 ${
                    isActive(item.to)
                      ? 'bg-muted text-primary border-l-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-ui mb-2 truncate">
          {user?.email}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start text-muted-foreground hover:text-foreground font-ui"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-background fixed h-full">
        {sidebarContent}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-background border-r border-border flex flex-col z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="h-14 border-b border-border flex items-center px-4 md:px-6 bg-background sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-foreground mr-2"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="font-heading text-sm font-bold text-secondary">
            {navSections.flatMap(s => s.items).find(i => isActive(i.to))?.label || 'Admin'}
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

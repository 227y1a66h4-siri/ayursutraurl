import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  UserCog,
  Receipt,
  Settings,
  LogOut,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'therapist', 'receptionist'] },
  { name: 'My Records', href: '/my-records', icon: Users, roles: ['patient'] },
  { name: 'Patients', href: '/patients', icon: Users, roles: ['admin', 'doctor', 'receptionist'] },
  { name: 'Appointments', href: '/appointments', icon: Calendar, roles: ['admin', 'doctor', 'therapist', 'receptionist'] },
  { name: 'Therapies', href: '/therapies', icon: Stethoscope, roles: ['admin', 'doctor'] },
  { name: 'Therapists', href: '/therapists', icon: UserCog, roles: ['admin'] },
  { name: 'Billing', href: '/billing', icon: Receipt, roles: ['admin', 'receptionist'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 gradient-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary/20">
            <Leaf className="h-6 w-6 text-sidebar-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-sidebar-foreground">
              AyurSutra
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Panchakarma Center</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary/20 text-sidebar-primary font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}

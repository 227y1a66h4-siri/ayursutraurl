import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect patients to their records page if they try to access restricted areas
    if (user?.role === 'patient') {
      const restrictedPaths = ['/dashboard', '/patients', '/appointments', '/therapies', '/therapists', '/billing', '/settings'];
      if (restrictedPaths.includes(location.pathname)) {
        navigate('/my-records', { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-64">
        <div className="min-h-screen p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

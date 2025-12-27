import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AppointmentCard } from '@/components/dashboard/AppointmentCard';
import { useAuth } from '@/context/AuthContext';
import { mockAppointments, mockPatients, mockTherapists, mockInvoices } from '@/data/mockData';
import { Users, Calendar, IndianRupee, UserCheck, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = new Date();
  
  const todayAppointments = mockAppointments.filter(
    (apt) => format(apt.date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  );

  const pendingRevenue = mockInvoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((acc, inv) => acc + (inv.totalAmount - inv.paidAmount), 0);

  const stats = [
    {
      title: 'Total Patients',
      value: mockPatients.length,
      subtitle: 'Active patients',
      icon: <Users className="h-6 w-6" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      subtitle: format(today, 'EEEE, MMM d'),
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: 'Available Therapists',
      value: mockTherapists.filter((t) => t.available).length,
      subtitle: `of ${mockTherapists.length} total`,
      icon: <UserCheck className="h-6 w-6" />,
    },
    {
      title: 'Pending Revenue',
      value: `₹${pendingRevenue.toLocaleString()}`,
      subtitle: 'To be collected',
      icon: <IndianRupee className="h-6 w-6" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening at your center today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Today's Schedule
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {todayAppointments.length} appointments scheduled
                  </p>
                </div>
              </div>
            </div>

            {todayAppointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {todayAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>

          {/* Quick Actions / Recent Activity */}
          <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/patients?action=new')}
                className="w-full text-left px-4 py-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
              >
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Register New Patient
                </p>
                <p className="text-sm text-muted-foreground">Add patient details and history</p>
              </button>
              <button 
                onClick={() => navigate('/appointments?action=new')}
                className="w-full text-left px-4 py-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors group"
              >
                <p className="font-medium text-foreground group-hover:text-secondary transition-colors">
                  Schedule Appointment
                </p>
                <p className="text-sm text-muted-foreground">Book a therapy session</p>
              </button>
              <button 
                onClick={() => navigate('/billing?action=new')}
                className="w-full text-left px-4 py-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors group"
              >
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  Create Invoice
                </p>
                <p className="text-sm text-muted-foreground">Generate billing for services</p>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Patients</h3>
              <div className="space-y-2">
                {mockPatients.slice(0, 3).map((patient) => (
                  <div key={patient.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

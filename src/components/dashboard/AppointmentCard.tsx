import { Appointment } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, User, Stethoscope } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  className?: string;
}

const statusColors = {
  scheduled: 'bg-info/10 text-info border-info/20',
  'in-progress': 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function AppointmentCard({ appointment, className }: AppointmentCardProps) {
  return (
    <div className={cn(
      "glass-card rounded-xl p-4 transition-all duration-200 hover:shadow-md",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {appointment.startTime} - {appointment.endTime}
          </span>
        </div>
        <span className={cn(
          "px-2 py-1 text-xs font-medium rounded-full border capitalize",
          statusColors[appointment.status]
        )}>
          {appointment.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{appointment.patientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">{appointment.therapyName}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Therapist: {appointment.therapistName}
        </p>
      </div>
    </div>
  );
}

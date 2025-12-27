import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAppointments, mockPatients, mockTherapists, mockTherapies } from '@/data/mockData';
import { Appointment } from '@/types';
import { Plus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const statusColors = {
  scheduled: 'bg-info/10 text-info border-info/20',
  'in-progress': 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    therapistId: '',
    therapyId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
  });

  const filteredAppointments = appointments.filter(
    (apt) => format(apt.date, 'yyyy-MM-dd') === selectedDate
  );

  const checkTherapistAvailability = (
    therapistId: string,
    date: string,
    startTime: string,
    duration: number
  ) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;

    return !appointments.some((apt) => {
      if (apt.therapistId !== therapistId || format(apt.date, 'yyyy-MM-dd') !== date) {
        return false;
      }
      if (apt.status === 'cancelled') return false;

      const [aptStartH, aptStartM] = apt.startTime.split(':').map(Number);
      const [aptEndH, aptEndM] = apt.endTime.split(':').map(Number);
      const aptStartMinutes = aptStartH * 60 + aptStartM;
      const aptEndMinutes = aptEndH * 60 + aptEndM;

      return (
        (startMinutes >= aptStartMinutes && startMinutes < aptEndMinutes) ||
        (endMinutes > aptStartMinutes && endMinutes <= aptEndMinutes) ||
        (startMinutes <= aptStartMinutes && endMinutes >= aptEndMinutes)
      );
    });
  };

  const handleAddAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.therapistId || !newAppointment.therapyId) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const therapy = mockTherapies.find((t) => t.id === newAppointment.therapyId);
    const patient = mockPatients.find((p) => p.id === newAppointment.patientId);
    const therapist = mockTherapists.find((t) => t.id === newAppointment.therapistId);

    if (!therapy || !patient || !therapist) return;

    // Check for double booking
    if (
      !checkTherapistAvailability(
        newAppointment.therapistId,
        newAppointment.date,
        newAppointment.startTime,
        therapy.duration
      )
    ) {
      toast({
        title: 'Scheduling Conflict',
        description: 'This therapist is already booked for the selected time slot.',
        variant: 'destructive',
      });
      return;
    }

    const [hours, minutes] = newAppointment.startTime.split(':').map(Number);
    const endMinutes = hours * 60 + minutes + therapy.duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

    const appointment: Appointment = {
      id: (appointments.length + 1).toString(),
      patientId: newAppointment.patientId,
      patientName: patient.name,
      therapistId: newAppointment.therapistId,
      therapistName: therapist.name,
      therapyId: newAppointment.therapyId,
      therapyName: therapy.name,
      date: new Date(newAppointment.date),
      startTime: newAppointment.startTime,
      endTime,
      status: 'scheduled',
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      patientId: '',
      therapistId: '',
      therapyId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
    });
    setIsDialogOpen(false);
    toast({
      title: 'Appointment Scheduled',
      description: `${therapy.name} for ${patient.name} has been scheduled.`,
    });
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(
      appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    toast({
      title: 'Status Updated',
      description: `Appointment marked as ${status}.`,
    });
  };

  const availableTherapists = mockTherapists.filter((t) => t.available);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Appointments</h1>
            <p className="text-muted-foreground mt-1">Schedule and manage therapy sessions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Schedule Appointment</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Patient *</Label>
                  <Select
                    value={newAppointment.patientId}
                    onValueChange={(value) =>
                      setNewAppointment({ ...newAppointment, patientId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPatients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Therapy *</Label>
                  <Select
                    value={newAppointment.therapyId}
                    onValueChange={(value) =>
                      setNewAppointment({ ...newAppointment, therapyId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select therapy" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTherapies.map((therapy) => (
                        <SelectItem key={therapy.id} value={therapy.id}>
                          {therapy.name} ({therapy.duration} min - ₹{therapy.cost})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Therapist *</Label>
                  <Select
                    value={newAppointment.therapistId}
                    onValueChange={(value) =>
                      setNewAppointment({ ...newAppointment, therapistId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTherapists.map((therapist) => (
                        <SelectItem key={therapist.id} value={therapist.id}>
                          {therapist.name} - {therapist.specialization.join(', ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, date: e.target.value })
                      }
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Time *</Label>
                    <Input
                      type="time"
                      value={newAppointment.startTime}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, startTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    The system will automatically check for therapist availability to prevent double bookings.
                  </p>
                </div>

                <Button variant="hero" onClick={handleAddAppointment} className="mt-2">
                  Schedule Appointment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-4 animate-slide-up">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredAppointments.length} appointment(s) on this day
          </p>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="glass-card rounded-xl p-5 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg px-4 py-2 min-w-[80px]">
                        <Clock className="h-4 w-4 text-primary mb-1" />
                        <span className="text-sm font-semibold text-primary">
                          {appointment.startTime}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          to {appointment.endTime}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.therapyName}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Therapist: {appointment.therapistName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'px-3 py-1 text-xs font-medium rounded-full border capitalize',
                          statusColors[appointment.status]
                        )}
                      >
                        {appointment.status}
                      </span>
                      {appointment.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, 'in-progress')}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      {appointment.status === 'in-progress' && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-12 glass-card rounded-xl">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No appointments scheduled for this date</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

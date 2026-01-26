import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { mockAppointments, mockPatients, mockTherapies } from '@/data/mockData';
import { Calendar, Clock, User, Stethoscope, FileText, Heart } from 'lucide-react';
import { format } from 'date-fns';

export default function MyRecords() {
  const { user } = useAuth();
  
  // Find the patient record matching the logged-in user
  const patientRecord = mockPatients.find(p => p.name === user?.name) || mockPatients[0];
  
  // Get appointments for this patient
  const myAppointments = mockAppointments.filter(apt => apt.patientId === patientRecord.id);
  const upcomingAppointments = myAppointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = myAppointments.filter(apt => apt.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-accent/10 text-accent border-accent/20">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground">
            My Health Records
          </h1>
          <p className="text-muted-foreground mt-1">
            View your treatment history and upcoming appointments
          </p>
        </div>

        {/* Patient Info Card */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                {patientRecord.name.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-xl">{patientRecord.name}</CardTitle>
                <CardDescription className="flex items-center gap-4 mt-1">
                  <span>{patientRecord.age} years</span>
                  <span>•</span>
                  <span className="capitalize">{patientRecord.gender}</span>
                  <span>•</span>
                  <span>{patientRecord.phone}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">Medical History</span>
                </div>
                <p className="text-sm text-foreground">{patientRecord.medicalHistory || 'None recorded'}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Allergies</span>
                </div>
                <p className="text-sm text-foreground">{patientRecord.allergies || 'None recorded'}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Stethoscope className="h-4 w-4" />
                  <span className="text-sm font-medium">Current Medications</span>
                </div>
                <p className="text-sm text-foreground">{patientRecord.currentMedications || 'None recorded'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Treatments ({pastAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="therapies">
              Available Therapies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingAppointments.map((apt) => (
                  <Card key={apt.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{apt.therapyName}</h3>
                        {getStatusBadge(apt.status)}
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(apt.date, 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{apt.startTime} - {apt.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Therapist: {apt.therapistName}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact our reception to schedule your next therapy session
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastAppointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {pastAppointments.map((apt) => (
                  <Card key={apt.id} className="border-l-4 border-l-success">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{apt.therapyName}</h3>
                        {getStatusBadge(apt.status)}
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(apt.date, 'MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Therapist: {apt.therapistName}</span>
                        </div>
                      </div>
                      {apt.notes && (
                        <div className="mt-3 p-2 rounded bg-muted/50 text-sm">
                          <span className="font-medium">Notes: </span>
                          {apt.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No past treatments recorded</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="therapies" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockTherapies.map((therapy) => (
                <Card key={therapy.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{therapy.name}</h3>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {therapy.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {therapy.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{therapy.duration} min</span>
                      <span className="font-semibold text-primary">₹{therapy.cost.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              💬 Use the chat assistant to learn more about any therapy or ask questions!
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

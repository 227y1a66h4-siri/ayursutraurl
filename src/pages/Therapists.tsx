import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTherapists, mockTherapies } from '@/data/mockData';
import { Therapist } from '@/types';
import { Plus, Search, Phone, Mail, UserCog } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function Therapists() {
  const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newTherapist, setNewTherapist] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: [] as string[],
  });

  const filteredTherapists = therapists.filter(
    (therapist) =>
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialization.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const therapyNames = mockTherapies.map((t) => t.name);

  const toggleSpecialization = (therapy: string) => {
    setNewTherapist((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(therapy)
        ? prev.specialization.filter((s) => s !== therapy)
        : [...prev.specialization, therapy],
    }));
  };

  const handleAddTherapist = () => {
    if (!newTherapist.name || !newTherapist.phone || newTherapist.specialization.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const therapist: Therapist = {
      id: (therapists.length + 1).toString(),
      name: newTherapist.name,
      phone: newTherapist.phone,
      email: newTherapist.email,
      specialization: newTherapist.specialization,
      available: true,
    };

    setTherapists([...therapists, therapist]);
    setNewTherapist({
      name: '',
      phone: '',
      email: '',
      specialization: [],
    });
    setIsDialogOpen(false);
    toast({
      title: 'Therapist Added',
      description: `${therapist.name} has been added to the team.`,
    });
  };

  const toggleAvailability = (id: string) => {
    setTherapists(
      therapists.map((t) => (t.id === id ? { ...t, available: !t.available } : t))
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Therapists</h1>
            <p className="text-muted-foreground mt-1">
              Manage your therapy team and their specializations
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Therapist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Add New Therapist</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newTherapist.name}
                    onChange={(e) => setNewTherapist({ ...newTherapist, name: e.target.value })}
                    placeholder="Enter therapist name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={newTherapist.phone}
                      onChange={(e) => setNewTherapist({ ...newTherapist, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTherapist.email}
                      onChange={(e) => setNewTherapist({ ...newTherapist, email: e.target.value })}
                      placeholder="therapist@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specializations *</Label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-input bg-background">
                    {therapyNames.map((therapy) => (
                      <button
                        key={therapy}
                        type="button"
                        onClick={() => toggleSpecialization(therapy)}
                        className={cn(
                          'px-3 py-1 text-sm rounded-full border transition-colors',
                          newTherapist.specialization.includes(therapy)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                        )}
                      >
                        {therapy}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select all therapies this therapist can perform
                  </p>
                </div>

                <Button variant="hero" onClick={handleAddTherapist} className="mt-2">
                  Add Therapist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md animate-slide-up">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search therapists by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Therapists Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTherapists.map((therapist, index) => (
            <div
              key={therapist.id}
              className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-display font-semibold text-lg">
                    {therapist.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{therapist.name}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          therapist.available ? 'bg-success' : 'bg-muted-foreground'
                        )}
                      />
                      <span className="text-xs text-muted-foreground">
                        {therapist.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={therapist.available}
                  onCheckedChange={() => toggleAvailability(therapist.id)}
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{therapist.phone}</span>
                </div>
                {therapist.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{therapist.email}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {therapist.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <UserCog className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No therapists found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

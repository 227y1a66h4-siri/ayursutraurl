import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTherapies } from '@/data/mockData';
import { Therapy } from '@/types';
import { Plus, Search, Clock, IndianRupee, Stethoscope } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Therapies() {
  const [therapies, setTherapies] = useState<Therapy[]>(mockTherapies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newTherapy, setNewTherapy] = useState({
    name: '',
    description: '',
    duration: '',
    cost: '',
    category: '',
  });

  const filteredTherapies = therapies.filter(
    (therapy) =>
      therapy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapy.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(therapies.map((t) => t.category))];

  const handleAddTherapy = () => {
    if (!newTherapy.name || !newTherapy.duration || !newTherapy.cost) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const therapy: Therapy = {
      id: (therapies.length + 1).toString(),
      name: newTherapy.name,
      description: newTherapy.description,
      duration: parseInt(newTherapy.duration),
      cost: parseFloat(newTherapy.cost),
      category: newTherapy.category || 'General',
    };

    setTherapies([...therapies, therapy]);
    setNewTherapy({
      name: '',
      description: '',
      duration: '',
      cost: '',
      category: '',
    });
    setIsDialogOpen(false);
    toast({
      title: 'Therapy Added',
      description: `${therapy.name} has been added to the catalog.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Therapies</h1>
            <p className="text-muted-foreground mt-1">
              Manage Panchakarma therapies and treatments
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Therapy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Add New Therapy</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Therapy Name *</Label>
                  <Input
                    id="name"
                    value={newTherapy.name}
                    onChange={(e) => setNewTherapy({ ...newTherapy, name: e.target.value })}
                    placeholder="e.g., Abhyanga"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTherapy.description}
                    onChange={(e) => setNewTherapy({ ...newTherapy, description: e.target.value })}
                    placeholder="Brief description of the therapy..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newTherapy.duration}
                      onChange={(e) => setNewTherapy({ ...newTherapy, duration: e.target.value })}
                      placeholder="60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost (₹) *</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={newTherapy.cost}
                      onChange={(e) => setNewTherapy({ ...newTherapy, cost: e.target.value })}
                      placeholder="2500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTherapy.category}
                    onChange={(e) => setNewTherapy({ ...newTherapy, category: e.target.value })}
                    placeholder="e.g., Massage, Detox, Steam"
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <Button variant="hero" onClick={handleAddTherapy} className="mt-2">
                  Add Therapy
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md animate-slide-up">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search therapies by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Therapies Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTherapies.map((therapy, index) => (
            <div
              key={therapy.id}
              className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 animate-scale-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {therapy.category}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {therapy.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {therapy.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{therapy.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-primary font-semibold">
                  <IndianRupee className="h-4 w-4" />
                  <span>{therapy.cost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTherapies.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No therapies found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

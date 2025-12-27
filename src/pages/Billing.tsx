import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { mockInvoices, mockPatients, mockAppointments, mockTherapies } from '@/data/mockData';
import { Invoice } from '@/types';
import { Plus, Search, IndianRupee, Receipt, Download } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  pending: 'bg-warning/10 text-warning border-warning/20',
  partial: 'bg-info/10 text-info border-info/20',
  paid: 'bg-success/10 text-success border-success/20',
};

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const [newInvoice, setNewInvoice] = useState({
    patientId: '',
    appointmentIds: [] as string[],
  });

  const [paymentAmount, setPaymentAmount] = useState<{ [key: string]: string }>({});

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatientAppointments = (patientId: string) => {
    return mockAppointments.filter(
      (apt) =>
        apt.patientId === patientId &&
        apt.status === 'completed' &&
        !invoices.some((inv) => inv.appointments.includes(apt.id))
    );
  };

  const calculateTotal = (appointmentIds: string[]) => {
    return appointmentIds.reduce((total, aptId) => {
      const apt = mockAppointments.find((a) => a.id === aptId);
      if (apt) {
        const therapy = mockTherapies.find((t) => t.id === apt.therapyId);
        return total + (therapy?.cost || 0);
      }
      return total;
    }, 0);
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.patientId || newInvoice.appointmentIds.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a patient and at least one appointment.',
        variant: 'destructive',
      });
      return;
    }

    const patient = mockPatients.find((p) => p.id === newInvoice.patientId);
    if (!patient) return;

    const invoice: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      patientId: newInvoice.patientId,
      patientName: patient.name,
      appointments: newInvoice.appointmentIds,
      totalAmount: calculateTotal(newInvoice.appointmentIds),
      paidAmount: 0,
      status: 'pending',
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    setInvoices([...invoices, invoice]);
    setNewInvoice({ patientId: '', appointmentIds: [] });
    setIsDialogOpen(false);
    toast({
      title: 'Invoice Created',
      description: `Invoice ${invoice.id} has been created for ₹${invoice.totalAmount.toLocaleString()}.`,
    });
  };

  const handlePayment = (invoiceId: string) => {
    const amount = parseFloat(paymentAmount[invoiceId] || '0');
    if (amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid payment amount.',
        variant: 'destructive',
      });
      return;
    }

    setInvoices(
      invoices.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaidAmount = Math.min(inv.paidAmount + amount, inv.totalAmount);
          return {
            ...inv,
            paidAmount: newPaidAmount,
            status:
              newPaidAmount >= inv.totalAmount
                ? 'paid'
                : newPaidAmount > 0
                ? 'partial'
                : 'pending',
          };
        }
        return inv;
      })
    );

    setPaymentAmount({ ...paymentAmount, [invoiceId]: '' });
    toast({
      title: 'Payment Recorded',
      description: `Payment of ₹${amount.toLocaleString()} has been recorded.`,
    });
  };

  const patientAppointments = newInvoice.patientId
    ? getPatientAppointments(newInvoice.patientId)
    : [];

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const collectedRevenue = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const pendingRevenue = totalRevenue - collectedRevenue;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground mt-1">
              Manage invoices and track payments
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Create Invoice</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Patient *</Label>
                  <Select
                    value={newInvoice.patientId}
                    onValueChange={(value) =>
                      setNewInvoice({ patientId: value, appointmentIds: [] })
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

                {patientAppointments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Select Appointments *</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                      {patientAppointments.map((apt) => {
                        const therapy = mockTherapies.find((t) => t.id === apt.therapyId);
                        return (
                          <label
                            key={apt.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={newInvoice.appointmentIds.includes(apt.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewInvoice({
                                    ...newInvoice,
                                    appointmentIds: [...newInvoice.appointmentIds, apt.id],
                                  });
                                } else {
                                  setNewInvoice({
                                    ...newInvoice,
                                    appointmentIds: newInvoice.appointmentIds.filter(
                                      (id) => id !== apt.id
                                    ),
                                  });
                                }
                              }}
                              className="rounded border-border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{apt.therapyName}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(apt.date, 'MMM d, yyyy')} - ₹{therapy?.cost.toLocaleString()}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {newInvoice.appointmentIds.length > 0 && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Total Amount</span>
                      <span className="text-xl font-display font-bold text-primary">
                        ₹{calculateTotal(newInvoice.appointmentIds).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  variant="hero"
                  onClick={handleCreateInvoice}
                  disabled={newInvoice.appointmentIds.length === 0}
                  className="mt-2"
                >
                  Create Invoice
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 animate-slide-up">
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <IndianRupee className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-2xl font-display font-bold text-success">
                  ₹{collectedRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <IndianRupee className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-display font-bold text-warning">
                  ₹{pendingRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice ID or patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice, index) => (
            <div
              key={invoice.id}
              className="glass-card rounded-xl p-5 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Receipt className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded-full border capitalize',
                          statusColors[invoice.status]
                        )}
                      >
                        {invoice.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{invoice.patientName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {format(invoice.createdAt, 'MMM d, yyyy')} | Due:{' '}
                      {format(invoice.dueDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="text-right lg:text-left">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-xl font-display font-bold text-foreground">
                      ₹{invoice.totalAmount.toLocaleString()}
                    </p>
                    {invoice.paidAmount > 0 && invoice.status !== 'paid' && (
                      <p className="text-xs text-success">
                        Paid: ₹{invoice.paidAmount.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {invoice.status !== 'paid' && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={paymentAmount[invoice.id] || ''}
                        onChange={(e) =>
                          setPaymentAmount({ ...paymentAmount, [invoice.id]: e.target.value })
                        }
                        className="w-32"
                      />
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handlePayment(invoice.id)}
                      >
                        Pay
                      </Button>
                    </div>
                  )}

                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 glass-card rounded-xl">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No invoices found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

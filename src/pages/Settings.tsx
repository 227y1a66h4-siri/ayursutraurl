import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { Settings as SettingsIcon, Bell, Shield, Building } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your center's preferences and configuration
          </p>
        </div>

        {/* Center Information */}
        <div className="glass-card rounded-xl p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Center Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Basic details about your Ayurvedic center
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="centerName">Center Name</Label>
                <Input id="centerName" defaultValue="AyurSutra Panchakarma Center" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number</Label>
                <Input id="phone" defaultValue="+91 11 2345 6789" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Wellness Road, Green Park, New Delhi - 110016" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="info@ayursutra.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input id="gst" defaultValue="07AAACA1234A1Z5" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Bell className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Notifications
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure how you receive updates
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Appointment Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Send SMS reminders to patients before appointments
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payment Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for pending payments
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Daily Summary</p>
                <p className="text-sm text-muted-foreground">
                  Get a daily email summary of appointments
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Security
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your account security settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Session Timeout</p>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="outline">Change Password</Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="hero" size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

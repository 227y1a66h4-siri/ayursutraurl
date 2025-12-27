import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Admin', email: 'admin@ayursutra.com', password: 'admin123' },
    { role: 'Doctor', email: 'doctor@ayursutra.com', password: 'doctor123' },
    { role: 'Therapist', email: 'therapist@ayursutra.com', password: 'therapist123' },
    { role: 'Receptionist', email: 'receptionist@ayursutra.com', password: 'receptionist123' },
  ];

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center animate-fade-in">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/20 shadow-glow">
            <Leaf className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            AyurSutra
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-6">
            Panchakarma Center Management
          </p>
          <p className="text-primary-foreground/60 leading-relaxed">
            Experience the ancient wisdom of Ayurveda with modern management. 
            Streamline your center's operations, from patient care to therapy scheduling.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-primary-foreground/40">
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary-foreground">500+</p>
              <p className="text-sm">Patients Served</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20"></div>
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary-foreground">25+</p>
              <p className="text-sm">Therapies</p>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20"></div>
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-primary-foreground">15+</p>
              <p className="text-sm">Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">AyurSutra</h1>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Welcome Back
              </h2>
              <p className="text-muted-foreground mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Demo Credentials
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword(cred.password);
                    }}
                    className="text-left px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="text-xs font-medium text-foreground">{cred.role}</p>
                    <p className="text-xs text-muted-foreground truncate">{cred.email}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

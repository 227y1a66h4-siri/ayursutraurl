import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<string, User & { password: string }> = {
  'admin@ayursutra.com': {
    id: '1',
    email: 'admin@ayursutra.com',
    name: 'Dr. Arun Sharma',
    role: 'admin',
    password: 'admin123',
  },
  'doctor@ayursutra.com': {
    id: '2',
    email: 'doctor@ayursutra.com',
    name: 'Dr. Priya Menon',
    role: 'doctor',
    password: 'doctor123',
  },
  'therapist@ayursutra.com': {
    id: '3',
    email: 'therapist@ayursutra.com',
    name: 'Ravi Kumar',
    role: 'therapist',
    password: 'therapist123',
  },
  'receptionist@ayursutra.com': {
    id: '4',
    email: 'receptionist@ayursutra.com',
    name: 'Meera Nair',
    role: 'receptionist',
    password: 'receptionist123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const demoUser = demoUsers[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

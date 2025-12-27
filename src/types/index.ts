export type UserRole = 'admin' | 'doctor' | 'therapist' | 'receptionist';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
  address: string;
  medicalHistory: string;
  allergies?: string;
  currentMedications?: string;
  createdAt: Date;
}

export interface Therapy {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  cost: number;
  category: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string[];
  phone: string;
  email: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  therapyId: string;
  therapyName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  appointments: string[];
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'partial' | 'paid';
  createdAt: Date;
  dueDate: Date;
}

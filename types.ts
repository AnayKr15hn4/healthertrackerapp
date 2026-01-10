
export enum AppTab {
  HOME = 'home',
  REPORTS = 'reports',
  DOCTORS = 'doctors',
  LOG = 'log',
  ADMIN = 'admin'
}

export interface UserProfile {
  username: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  bloodType: string;
  bloodPressure: string;
  isAdmin?: boolean;
}

export interface HealthLogEntry {
  id: string;
  patientName: string;
  gender: string;
  timestamp: string;
  age: number;
  weight: number;
  height: number;
  bloodPressure: string;
  bmi: number;
}

export interface HealthCondition {
  id: string;
  name: string;
  image: string;
  description: string;
  vitals: {
    breathRate: string;
    heartRate: string;
    conditions: string[];
  };
  affectedAgeGroup: string;
}

export interface MapDoctor {
  title: string;
  uri: string;
  rating?: number;
  address?: string;
  phone?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  location: string;
  image: string;
  email: string;
  phone: string;
}

export interface HealthDataPoint {
  time: string;
  pulse: number;
  systolic: number;
  diastolic: number;
}


import { HealthCondition, Doctor, HealthDataPoint } from './types';

export const MOCK_HEALTH_DATA: HealthDataPoint[] = [
  { time: '08:00', pulse: 72, systolic: 120, diastolic: 80 },
  { time: '10:00', pulse: 75, systolic: 122, diastolic: 82 },
  { time: '12:00', pulse: 82, systolic: 125, diastolic: 85 },
  { time: '14:00', pulse: 78, systolic: 121, diastolic: 81 },
  { time: '16:00', pulse: 74, systolic: 119, diastolic: 79 },
  { time: '18:00', pulse: 71, systolic: 118, diastolic: 78 },
  { time: '20:00', pulse: 68, systolic: 120, diastolic: 80 },
];

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: '1',
    name: 'Atrial Fibrillation',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=400',
    description: 'An irregular and often very rapid heart rhythm (arrhythmia) that can lead to blood clots in the heart.',
    vitals: {
      breathRate: '16-20 bpm',
      heartRate: '100-175 bpm',
      conditions: ['Tachycardia', 'Arrhythmia']
    },
    affectedAgeGroup: '65+'
  },
  {
    id: '2',
    name: 'Sleep Apnea',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400',
    description: 'A potentially serious sleep disorder in which breathing repeatedly stops and starts.',
    vitals: {
      breathRate: 'Varies widely',
      heartRate: 'Fluctuating',
      conditions: ['Bradycardia', 'Hypoxia']
    },
    affectedAgeGroup: '30-60'
  },
  {
    id: '3',
    name: 'Hypertension',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    description: 'A condition in which the force of the blood against the artery walls is too high.',
    vitals: {
      breathRate: '12-18 bpm',
      heartRate: '60-100 bpm',
      conditions: ['High BP', 'Stroke Risk']
    },
    affectedAgeGroup: '40+'
  },
  {
    id: '4',
    name: 'COPD',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400',
    description: 'Chronic obstructive pulmonary disease is a chronic inflammatory lung disease that causes obstructed airflow.',
    vitals: {
      breathRate: '20+ bpm',
      heartRate: '80-110 bpm',
      conditions: ['Shortness of breath', 'Wheezing']
    },
    affectedAgeGroup: '50+'
  },
  {
    id: '5',
    name: 'Diabetes Mellitus',
    image: 'https://images.unsplash.com/photo-1617251137884-f135eccf6942?auto=format&fit=crop&q=80&w=400',
    description: 'A group of diseases that result in too much sugar in the blood (high blood glucose).',
    vitals: {
      breathRate: '14-20 bpm',
      heartRate: '70-90 bpm',
      conditions: ['Hyperglycemia', 'Neuropathy']
    },
    affectedAgeGroup: 'All Ages'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    location: 'Central Medical Hub, Suite 402',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200',
    email: 's.mitchell@vitaltrack.med',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Pulmonologist',
    experience: 12,
    rating: 4.7,
    location: 'Northside Wellness Center',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    email: 'j.wilson@healthcity.org',
    phone: '+1 (555) 987-6543'
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialty: 'General Practitioner',
    experience: 8,
    rating: 4.8,
    location: 'Bay Area Health Clinic',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
    email: 'elena.r@bayclinic.com',
    phone: '+1 (555) 246-8135'
  }
];

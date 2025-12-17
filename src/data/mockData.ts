import { DamageReport } from '@/types/damage';

export const mockDamageReports: DamageReport[] = [
  {
    id: 'DL-1',
    type: 'pothole',
    severity: 'critical',
    latitude: 28.6675,
    longitude: 77.2283,
    address: 'Ring Road, Kashmere Gate, Delhi',
    timestamp: new Date('2024-12-15T10:30:00'),
    confidence: 0.96,
    status: 'pending',
  },
  {
    id: 'DL-2',
    type: 'crack',
    severity: 'high',
    latitude: 28.6315,
    longitude: 77.2167,
    address: 'Connaught Place, New Delhi',
    timestamp: new Date('2024-12-15T11:45:00'),
    confidence: 0.89,
    status: 'verified',
  },
  {
    id: 'DL-3',
    type: 'pothole',
    severity: 'medium',
    latitude: 28.5245,
    longitude: 77.2066,
    address: 'MG Road, Saket, New Delhi',
    timestamp: new Date('2024-12-15T14:20:00'),
    confidence: 0.91,
    status: 'pending',
  },
  {
    id: 'DL-4',
    type: 'depression',
    severity: 'low',
    latitude: 28.6129,
    longitude: 77.2295,
    address: 'India Gate Circle, New Delhi',
    timestamp: new Date('2024-12-14T09:15:00'),
    confidence: 0.77,
    status: 'resolved',
  },
  {
    id: 'DL-5',
    type: 'crack',
    severity: 'critical',
    latitude: 28.7383,
    longitude: 77.0822,
    address: 'Outer Ring Road, Rohini Sector 9, Delhi',
    timestamp: new Date('2024-12-14T16:30:00'),
    confidence: 0.98,
    status: 'verified',
  },
  {
    id: 'DL-6',
    type: 'patch',
    severity: 'medium',
    latitude: 28.6096,
    longitude: 77.2921,
    address: 'Mayur Vihar Phase 1, Delhi',
    timestamp: new Date('2024-12-13T12:00:00'),
    confidence: 0.86,
    status: 'pending',
  },
];

export const statsData = {
  totalDetections: mockDamageReports.length,
  criticalIssues: mockDamageReports.filter(
    (r) => r.severity === 'critical'
  ).length,
  resolvedToday: mockDamageReports.filter(
    (r) => r.status === 'resolved'
  ).length,
  avgResponseTime: '3.1 hrs',
};

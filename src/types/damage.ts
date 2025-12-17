export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type DamageType = 'pothole' | 'crack' | 'depression' | 'patch';

export interface DamageReport {
  id: string;
  type: DamageType;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  address: string;
  timestamp: Date;
  imageUrl?: string;
  confidence: number;
  status: 'pending' | 'verified' | 'resolved';
}

export interface DetectionResult {
  type: DamageType;
  severity: SeverityLevel;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

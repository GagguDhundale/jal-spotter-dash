export interface SymptomReport {
  id: string;
  village: string;
  coordinates: [number, number];
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  reportedAt: Date;
  waterSource?: string;
  reporterAge?: number;
  reporterGender?: 'male' | 'female' | 'other';
}

export interface WaterSource {
  id: string;
  name: string;
  type: 'well' | 'borehole' | 'river' | 'pond' | 'tank';
  coordinates: [number, number];
  status: 'safe' | 'caution' | 'contaminated';
  lastTested?: Date;
  reports: string[];
}

export interface Alert {
  id: string;
  village: string;
  level: 'high' | 'medium' | 'low';
  trigger: string;
  description: string;
  timestamp: Date;
  status: 'active' | 'investigating' | 'resolved';
  reportCount: number;
}

export interface DashboardStats {
  totalReportsToday: number;
  activeAlerts: number;
  highRiskVillages: number;
  newReports24h: number;
}

export interface ChartData {
  symptoms: Array<{ name: string; count: number }>;
  timeline: Array<{ date: string; reports: number; rainfall?: number }>;
}
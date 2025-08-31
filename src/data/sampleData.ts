import { SymptomReport, WaterSource, Alert, DashboardStats, ChartData } from '../types/dashboard';

// Sample coordinates around Dibrugarh, Assam
const VILLAGES = [
  { name: 'Youliwadi', coords: [27.4728, 94.9120] as [number, number] },
  { name: 'Khowang', coords: [27.4512, 94.8987] as [number, number] },
  { name: 'Rajgarh', coords: [27.4889, 94.9254] as [number, number] },
  { name: 'Tengakhat', coords: [27.4456, 94.9087] as [number, number] },
  { name: 'Barbarua', coords: [27.4623, 94.9156] as [number, number] },
];

const SYMPTOMS = ['Diarrhea', 'Fever', 'Vomiting', 'Nausea', 'Abdominal pain', 'Dehydration'];

// Generate sample symptom reports
export const sampleReports: SymptomReport[] = Array.from({ length: 147 }, (_, i) => {
  const village = VILLAGES[Math.floor(Math.random() * VILLAGES.length)];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 7));
  
  // Create clusters - more reports in Youliwadi and Khowang (outbreak areas)
  const isOutbreakVillage = village.name === 'Youliwadi' || village.name === 'Khowang';
  const clusterChance = isOutbreakVillage ? 0.7 : 0.3;
  
  if (Math.random() > clusterChance) {
    // Random other village
    const randomVillage = VILLAGES[Math.floor(Math.random() * VILLAGES.length)];
    village.name = randomVillage.name;
    village.coords = randomVillage.coords;
  }

  // Add small random offset for clustering effect
  const coordOffset = 0.005;
  const coords: [number, number] = [
    village.coords[0] + (Math.random() - 0.5) * coordOffset,
    village.coords[1] + (Math.random() - 0.5) * coordOffset
  ];

  const symptomCount = Math.floor(Math.random() * 3) + 1;
  const selectedSymptoms = SYMPTOMS.sort(() => 0.5 - Math.random()).slice(0, symptomCount);

  return {
    id: `report-${i}`,
    village: village.name,
    coordinates: coords,
    symptoms: selectedSymptoms,
    severity: Math.random() > 0.7 ? 'severe' : Math.random() > 0.4 ? 'moderate' : 'mild',
    reportedAt: baseDate,
    waterSource: Math.random() > 0.3 ? `${village.name} Well ${Math.floor(Math.random() * 3) + 1}` : undefined,
    reporterAge: 20 + Math.floor(Math.random() * 50),
    reporterGender: Math.random() > 0.5 ? 'female' : 'male'
  };
});

export const sampleWaterSources: WaterSource[] = [
  {
    id: 'ws-1',
    name: 'Youliwadi Central Well',
    type: 'well',
    coordinates: [27.4728, 94.9120],
    status: 'contaminated',
    lastTested: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    reports: ['report-1', 'report-5', 'report-12']
  },
  {
    id: 'ws-2',
    name: 'Khowang Borehole',
    type: 'borehole',
    coordinates: [27.4512, 94.8987],
    status: 'caution',
    lastTested: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    reports: ['report-7', 'report-15']
  },
  {
    id: 'ws-3',
    name: 'Rajgarh Community Tank',
    type: 'tank',
    coordinates: [27.4889, 94.9254],
    status: 'safe',
    lastTested: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
    reports: []
  },
  {
    id: 'ws-4',
    name: 'Tengakhat River Point',
    type: 'river',
    coordinates: [27.4456, 94.9087],
    status: 'caution',
    lastTested: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    reports: ['report-23']
  }
];

export const sampleAlerts: Alert[] = [
  {
    id: 'alert-1',
    village: 'Youliwadi',
    level: 'high',
    trigger: 'Symptom Cluster + Recent Heavy Rainfall',
    description: '27 cases of diarrhea reported in last 48 hours. Contaminated water source identified.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'active',
    reportCount: 27
  },
  {
    id: 'alert-2',
    village: 'Khowang',
    level: 'medium',
    trigger: 'Increased Symptom Reports',
    description: '15 cases of fever and vomiting. Water testing team dispatched.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'investigating',
    reportCount: 15
  },
  {
    id: 'alert-3',
    village: 'Tengakhat',
    level: 'low',
    trigger: 'Routine Monitoring Alert',
    description: '5 cases reported near river water source. Monitoring situation.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'active',
    reportCount: 5
  }
];

export const dashboardStats: DashboardStats = {
  totalReportsToday: 147,
  activeAlerts: 3,
  highRiskVillages: 5,
  newReports24h: 23
};

export const chartData: ChartData = {
  symptoms: [
    { name: 'Diarrhea', count: 89 },
    { name: 'Fever', count: 67 },
    { name: 'Vomiting', count: 43 },
    { name: 'Nausea', count: 31 },
    { name: 'Abdominal pain', count: 28 },
    { name: 'Dehydration', count: 19 }
  ],
  timeline: [
    { date: '2024-01-25', reports: 12, rainfall: 0 },
    { date: '2024-01-26', reports: 15, rainfall: 5 },
    { date: '2024-01-27', reports: 8, rainfall: 0 },
    { date: '2024-01-28', reports: 18, rainfall: 25 }, // Heavy rainfall
    { date: '2024-01-29', reports: 34, rainfall: 15 }, // Spike after rainfall
    { date: '2024-01-30', reports: 47, rainfall: 2 },
    { date: '2024-01-31', reports: 13, rainfall: 0 }
  ]
};
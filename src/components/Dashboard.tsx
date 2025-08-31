import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { StatsCards } from './StatsCards';
import { InteractiveMap } from './InteractiveMap';
import { AlertPanel } from './AlertPanel';
import { DataVisualization } from './DataVisualization';
import { sampleReports, sampleWaterSources, sampleAlerts, dashboardStats, chartData } from '../data/sampleData';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [dateRange, setDateRange] = useState('7days');

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onLogout={onLogout} 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Summary Statistics */}
        <StatsCards stats={dashboardStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map and Visualization - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            <InteractiveMap 
              reports={sampleReports} 
              waterSources={sampleWaterSources} 
            />
            <DataVisualization data={chartData} />
          </div>

          {/* Alert Panel - Takes 1 column */}
          <div className="xl:col-span-1">
            <AlertPanel alerts={sampleAlerts} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4 border-t">
          <p>Jalrakshak - Water-Borne Disease Early Warning System</p>
          <p>© 2024 District Health Department, Government of Assam</p>
        </footer>
      </main>
    </div>
  );
}
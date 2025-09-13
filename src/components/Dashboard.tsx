import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { StatsCards } from './StatsCards';
import { InteractiveMap } from './InteractiveMap';
import { AlertPanel } from './AlertPanel';
import { DataVisualization } from './DataVisualization';
import { ResourceMonitor } from './AdvancedComponents/ResourceMonitor';
import { ActionHistory } from './AdvancedComponents/ActionHistory';
import { AIPathogenAssistant } from './AdvancedComponents/AIPathogenAssistant';
import { ExportTools } from './AdvancedComponents/ExportTools';
import { sampleReports, sampleWaterSources, sampleAlerts, dashboardStats, chartData } from '../data/sampleData';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedAlertId, setSelectedAlertId] = useState<string>();
  const { user, language } = useAuth();

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
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Map and Visualization - Takes 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            <InteractiveMap 
              reports={sampleReports} 
              waterSources={sampleWaterSources} 
            />
            <DataVisualization data={chartData} />
          </div>

          {/* Alert and AI Panel - Takes 1 column */}
          <div className="xl:col-span-1 space-y-6">
            <AlertPanel alerts={sampleAlerts} onAlertSelect={setSelectedAlertId} />
            <AIPathogenAssistant selectedAlertId={selectedAlertId} />
          </div>

          {/* Resources and Tools - Takes 1 column */}
          <div className="xl:col-span-1 space-y-6">
            <ResourceMonitor />
            <ExportTools />
          </div>
        </div>

        {/* Action History */}
        <ActionHistory />

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-4 border-t">
          <p>Jalrakshak - Water-Borne Disease Early Warning System</p>
          <p>© 2024 District Health Department, Government of Assam</p>
        </footer>
      </main>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Droplets, 
  AlertTriangle, 
  Shield, 
  MapPin, 
  Users, 
  FileText, 
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  User,
  Calendar,
  Thermometer,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { translations } from '../data/translations';
import { useToast } from '@/hooks/use-toast';

interface PublicDashboardProps {
  onLogout: () => void;
}

export function PublicDashboard({ onLogout }: PublicDashboardProps) {
  const { user, language, setLanguage } = useAuth();
  const { toast } = useToast();
  const t = translations[language];
  
  const [reportForm, setReportForm] = useState({
    symptoms: [] as string[],
    severity: '',
    duration: '',
    location: '',
    additionalInfo: ''
  });

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setReportForm(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Report Submitted",
      description: "Your symptom report has been recorded. Health officials will review it shortly.",
    });
    
    // Reset form
    setReportForm({
      symptoms: [],
      severity: '',
      duration: '',
      location: '',
      additionalInfo: ''
    });
  };

  // Mock data for community status
  const communityStatus = {
    currentAlerts: 2,
    waterQuality: 'caution',
    recentCases: 34,
    lastUpdate: '2 hours ago'
  };

  const symptoms = [
    'Diarrhea', 'Vomiting', 'Fever', 'Abdominal Pain', 
    'Nausea', 'Dehydration', 'Fatigue', 'Loss of Appetite'
  ];

  const waterSources = [
    { name: 'Central Well', status: 'safe', lastTested: '1 day ago' },
    { name: 'River Intake Point', status: 'caution', lastTested: '3 days ago' },
    { name: 'Community Tube Well', status: 'safe', lastTested: '2 days ago' },
    { name: 'Village Pond', status: 'unsafe', lastTested: '1 week ago' }
  ];

  const healthAlerts = [
    {
      id: 1,
      title: 'Boil Water Advisory',
      message: 'Boil water for 1 minute before drinking due to potential contamination.',
      level: 'high',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Increased Diarrhea Cases',
      message: 'Seek immediate medical attention if symptoms persist for more than 24 hours.',
      level: 'medium',
      timestamp: '6 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Droplets className="w-8 h-8 text-health-primary" />
                <User className="w-5 h-5 text-health-secondary absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Jalrakshak</h1>
                <p className="text-sm text-muted-foreground">Community Health Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20">
                  <Globe className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="as">অস</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="text-right">
                <p className="text-sm font-medium">{user?.fullName || 'Community User'}</p>
                <p className="text-xs text-muted-foreground">Mobile: {user?.phone}</p>
              </div>
              
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Community Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-alert-high">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-alert-high">{communityStatus.currentAlerts}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-alert-medium">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Water Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                variant="secondary" 
                className={`${
                  communityStatus.waterQuality === 'safe' ? 'bg-success' :
                  communityStatus.waterQuality === 'caution' ? 'bg-alert-medium' :
                  'bg-alert-high'
                } text-white`}
              >
                {communityStatus.waterQuality.toUpperCase()}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Overall status</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-health-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Recent Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-health-primary">{communityStatus.recentCases}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Last Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-success">{communityStatus.lastUpdate}</div>
              <p className="text-xs text-muted-foreground">Data synced</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Symptom Reporting */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-health-primary" />
                Report Symptoms
              </CardTitle>
              <CardDescription>
                Help us monitor community health by reporting any water-borne disease symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Symptoms (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {symptoms.map(symptom => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={reportForm.symptoms.includes(symptom)}
                          onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                        />
                        <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={reportForm.severity} onValueChange={(value) => setReportForm(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={reportForm.duration} onValueChange={(value) => setReportForm(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="few-hours">Few hours</SelectItem>
                        <SelectItem value="1-day">1 day</SelectItem>
                        <SelectItem value="2-3-days">2-3 days</SelectItem>
                        <SelectItem value="week">More than a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Your Location/Village</Label>
                  <Input
                    id="location"
                    value={reportForm.location}
                    onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your village/area name"
                  />
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={reportForm.additionalInfo}
                    onChange={(e) => setReportForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="Any additional details about your symptoms or possible causes"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-health-primary hover:bg-health-primary/90"
                  disabled={reportForm.symptoms.length === 0}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Health Alerts & Water Status */}
          <div className="space-y-6">
            {/* Health Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-alert-high" />
                  Health Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {healthAlerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.level === 'high' ? 'border-l-alert-high bg-alert-high/10' :
                      alert.level === 'medium' ? 'border-l-alert-medium bg-alert-medium/10' :
                      'border-l-success bg-success/10'
                    }`}
                  >
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Water Source Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-health-primary" />
                  Water Source Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {waterSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border">
                    <div>
                      <p className="font-medium text-sm">{source.name}</p>
                      <p className="text-xs text-muted-foreground">Tested: {source.lastTested}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {source.status === 'safe' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : source.status === 'caution' ? (
                        <AlertTriangle className="w-4 h-4 text-alert-medium" />
                      ) : (
                        <XCircle className="w-4 h-4 text-alert-high" />
                      )}
                      <Badge 
                        variant={source.status === 'safe' ? 'default' : 'destructive'}
                        className={`${
                          source.status === 'safe' ? 'bg-success' :
                          source.status === 'caution' ? 'bg-alert-medium' :
                          'bg-alert-high'
                        } text-white text-xs`}
                      >
                        {source.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-health-primary/5 border-health-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-health-primary">
              <Phone className="w-5 h-5" />
              Emergency Health Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <h4 className="font-medium">District Hospital</h4>
                <p className="text-health-primary font-bold text-lg">108</p>
                <p className="text-xs text-muted-foreground">24/7 Emergency</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <h4 className="font-medium">Health Helpline</h4>
                <p className="text-health-primary font-bold text-lg">104</p>
                <p className="text-xs text-muted-foreground">Medical Advice</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <h4 className="font-medium">Local Health Center</h4>
                <p className="text-health-primary font-bold text-lg">+91-xxx-xxx-xxxx</p>
                <p className="text-xs text-muted-foreground">Non-emergency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
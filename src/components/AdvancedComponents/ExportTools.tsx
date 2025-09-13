import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileDown, Send, FileText, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { translations } from '../../data/translations';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function ExportTools() {
  const { language, user } = useAuth();
  const t = translations[language];
  const { toast } = useToast();
  const [smsText, setSmsText] = useState("BOIL WATER ADVISORY for Youliwadi. Medical camp setup at District Hospital. Avoid drinking untreated water. Contact ASHA worker for ORS supplies.");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSendingSMS, setIsSendingSMS] = useState(false);

  const handleGenerateNHMReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: "NHM outbreak report downloaded successfully",
      });
      setIsGeneratingReport(false);
    }, 2000);
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Dashboard data is being exported to PDF",
    });
  };

  const handleSendSMS = async () => {
    setIsSendingSMS(true);
    
    // Simulate SMS sending
    setTimeout(() => {
      toast({
        title: "SMS Alert Sent",
        description: "Emergency alert sent to 2,500 residents",
      });
      setIsSendingSMS(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="w-5 h-5 text-health-primary" />
            Export & Communication Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={handleGenerateNHMReport} 
            className="w-full justify-start bg-health-primary hover:bg-health-primary/90"
            disabled={isGeneratingReport}
          >
            <FileText className="w-4 h-4 mr-2" />
            {isGeneratingReport ? 'Generating...' : t.generateReport}
          </Button>
          
          <Button 
            onClick={handleExportPDF} 
            variant="outline" 
            className="w-full justify-start"
          >
            <FileDown className="w-4 h-4 mr-2" />
            {t.exportPDF}
          </Button>
          
          <Button 
            onClick={handleExportPDF} 
            variant="outline" 
            className="w-full justify-start"
          >
            <FileDown className="w-4 h-4 mr-2" />
            {t.exportNHM}
          </Button>
        </CardContent>
      </Card>

      {/* SMS Blast Tool */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-orange-600" />
            Public SMS Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Send Alert to Residents
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Send Public SMS Alert</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Recipients: 2,500 residents in Youliwadi area</label>
                </div>
                <Textarea
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  placeholder="Enter alert message..."
                  className="min-h-[100px]"
                />
                <div className="text-xs text-muted-foreground">
                  Character count: {smsText.length}/160
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSendSMS} 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    disabled={isSendingSMS || !smsText.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSendingSMS ? 'Sending...' : 'Send Alert'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
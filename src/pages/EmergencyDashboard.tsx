import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle,
  Zap,
  MapPin,
  Clock,
  Phone,
  Send,
  Users,
  Activity,
  Navigation
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const EmergencyDashboard = () => {
  const [bloodType, setBloodType] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [patientDetails, setPatientDetails] = useState("");
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (< 30 min)", color: "destructive" },
    { value: "high", label: "High (< 2 hours)", color: "warning" },
    { value: "medium", label: "Medium (< 6 hours)", color: "accent" },
    { value: "low", label: "Low (< 24 hours)", color: "secondary" }
  ];

  const matchedDonors = [
    { 
      name: "Sarah Johnson", 
      bloodType: "O-", 
      distance: "1.2 km", 
      eta: "8 min",
      phone: "+1 (555) 0123",
      status: "responding",
      lastSeen: "2 min ago"
    },
    { 
      name: "Michael Chen", 
      bloodType: "O-", 
      distance: "2.8 km", 
      eta: "12 min",
      phone: "+1 (555) 0456", 
      status: "contacted",
      lastSeen: "1 min ago"
    },
    { 
      name: "Emily Davis", 
      bloodType: "O-", 
      distance: "3.1 km", 
      eta: "15 min",
      phone: "+1 (555) 0789",
      status: "available", 
      lastSeen: "5 min ago"
    }
  ];

  const emergencyStats = {
    totalAlerts: 127,
    responseTime: "7.5 min",
    successRate: "94%",
    activeDonors: 1247
  };

  const handleEmergencyAlert = () => {
    if (!bloodType || !urgencyLevel) {
      alert("Please fill in all required fields");
      return;
    }
    setIsEmergencyActive(true);
    // In a real app, this would trigger the emergency system
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responding": return "success";
      case "contacted": return "warning";
      case "available": return "accent";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive text-white sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8" />
                <span className="text-xl font-bold">Emergency Response Center</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Status: {isEmergencyActive ? "Active Alert" : "Ready"}
              </Badge>
              <Link to="/hospital">
                <Button variant="secondary" className="bg-white text-destructive hover:bg-white/90">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts Today</CardTitle>
              <Zap className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{emergencyStats.totalAlerts}</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{emergencyStats.responseTime}</div>
              <p className="text-xs text-muted-foreground">-2.1 min from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{emergencyStats.successRate}</div>
              <p className="text-xs text-muted-foreground">Successful matches</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{emergencyStats.activeDonors}</div>
              <p className="text-xs text-muted-foreground">Within 20km radius</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Alert Form */}
          <div className="lg:col-span-1">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Create Emergency Alert
                </CardTitle>
                <CardDescription>
                  Trigger AI-powered donor matching for critical situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Required Blood Type *</Label>
                  <Select value={bloodType} onValueChange={setBloodType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="patient-details">Patient Details</Label>
                  <Textarea
                    id="patient-details"
                    placeholder="Additional information (age, medical condition, location, etc.)"
                    value={patientDetails}
                    onChange={(e) => setPatientDetails(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Emergency Contact</Label>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Button 
                  onClick={handleEmergencyAlert}
                  className="w-full bg-destructive hover:bg-destructive/90 text-white"
                  size="lg"
                  disabled={isEmergencyActive}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isEmergencyActive ? "Alert Active" : "Send Emergency Alert"}
                </Button>

                {isEmergencyActive && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-success font-medium">
                      <Zap className="w-4 h-4" />
                      Emergency alert sent successfully!
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI is now matching donors. Expected response time: 5-15 minutes.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI-Matched Donors */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5 text-primary" />
                      AI-Matched Donors
                    </CardTitle>
                    <CardDescription>
                      Real-time donor matching based on location, availability, and blood type
                    </CardDescription>
                  </div>
                  {isEmergencyActive && (
                    <Badge className="bg-primary/10 text-primary animate-pulse">
                      Live Matching
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!isEmergencyActive ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No Active Emergency
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Create an emergency alert to see AI-matched donors
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">
                        Found {matchedDonors.length} compatible donors
                      </span>
                      <Badge variant="success">
                        Matching for {bloodType}
                      </Badge>
                    </div>

                    {matchedDonors.map((donor, index) => (
                      <Card key={index} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                                {donor.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <h3 className="font-semibold">{donor.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>Blood Type: {donor.bloodType}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {donor.distance}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge variant={getStatusColor(donor.status) as any}>
                              {donor.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">ETA:</span>
                              <div className="font-medium text-accent">{donor.eta}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Phone:</span>
                              <div className="font-medium">{donor.phone}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Seen:</span>
                              <div className="font-medium">{donor.lastSeen}</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              <MapPin className="w-3 h-3 mr-1" />
                              Track Location
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
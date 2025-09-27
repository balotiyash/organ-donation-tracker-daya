import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Plus,
  AlertTriangle, 
  Clock, 
  MapPin,
  Phone,
  User,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Bell,
  Hospital,
  Search,
  Filter,
  Eye,
  HandHeart,
  Car,
  Shield,
  Siren,
  Route
} from "lucide-react";

interface OrganRequirement {
  id: string;
  hospitalName: string;
  contactPerson: string;
  phone: string;
  email: string;
  urgency: "Critical" | "High" | "Medium" | "Low";
  organs: string[];
  patientInfo: {
    age: number;
    bloodType: string;
    medicalCondition: string;
    timeWindow: string;
  };
  requirements: string;
  createdAt: string;
  status: "Active" | "Fulfilled" | "Expired";
  distance?: number;
}

interface OrganAvailability {
  id: string;
  donorHospital: string;
  contactPerson: string;
  phone: string;
  email: string;
  availableOrgans: string[];
  donorInfo: {
    age: number;
    bloodType: string;
    causeOfDeath: string;
    timeOfDeath: string;
  };
  location: string;
  urgency: "Critical" | "High";
  expiresAt: string;
  createdAt: string;
  status: "Available" | "Reserved" | "Expired";
  matchingRequirements?: string[];
}

const OrganRequirementSystem = () => {
  const [activeTab, setActiveTab] = useState("requirements");
  const [requirements, setRequirements] = useState<OrganRequirement[]>([]);
  const [availableOrgans, setAvailableOrgans] = useState<OrganAvailability[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<OrganAvailability | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [countdownTimers, setCountdownTimers] = useState<{[key: string]: string}>({});
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [acceptedAlert, setAcceptedAlert] = useState<OrganAvailability | null>(null);

  const [newRequirement, setNewRequirement] = useState({
    hospitalName: "",
    contactPerson: "",
    phone: "",
    email: "",
    urgency: "",
    organs: [] as string[],
    patientAge: "",
    patientBloodType: "",
    medicalCondition: "",
    timeWindow: "",
    requirements: ""
  });

  const organOptions = [
    "Heart", "Liver", "Kidneys", "Lungs", "Pancreas", "Corneas", 
    "Skin", "Bone", "Heart Valves", "Small Intestine"
  ];

  const urgencyLevels = ["Critical", "High", "Medium", "Low"];
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  // Mock data for demonstration
  useEffect(() => {
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
    const oneHourThirtyMinutesFromFifteenMinutesAgo = new Date(fifteenMinutesAgo.getTime() + 2 * 60 * 60 * 1000);
    const oneHourThirtyMinutesFromThirtyMinutesAgo = new Date(thirtyMinutesAgo.getTime() + 2 * 60 * 60 * 1000);
    setRequirements([
      {
        id: "req-001",
        hospitalName: "City General Hospital",
        contactPerson: "Dr. Sarah Wilson",
        phone: "+1-555-0101",
        email: "sarah.wilson@citygeneral.com",
        urgency: "Critical",
        organs: ["Heart", "Liver"],
        patientInfo: {
          age: 45,
          bloodType: "O+",
          medicalCondition: "End-stage heart failure with liver complications",
          timeWindow: "48 hours"
        },
        requirements: "Patient needs both organs from same donor due to medical compatibility requirements",
        createdAt: "2024-01-15T10:30:00Z",
        status: "Active"
      },
      {
        id: "req-002",
        hospitalName: "Metro Medical Center",
        contactPerson: "Dr. Michael Chen",
        phone: "+1-555-0201",
        email: "m.chen@metromed.com",
        urgency: "High",
        organs: ["Kidneys"],
        patientInfo: {
          age: 32,
          bloodType: "A-",
          medicalCondition: "Chronic kidney disease",
          timeWindow: "7 days"
        },
        requirements: "Both kidneys required, patient is on dialysis",
        createdAt: "2024-01-14T14:20:00Z",
        status: "Active"
      }
    ]);

    setAvailableOrgans([
      {
        id: "avail-001",
        donorHospital: "Regional Medical Center",
        contactPerson: "Dr. Emily Johnson",
        phone: "+1-555-0301",
        email: "e.johnson@regional.com",
        availableOrgans: ["Heart", "Liver", "Kidneys", "Corneas"],
        donorInfo: {
          age: 28,
          bloodType: "O+",
          causeOfDeath: "Brain trauma from accident",
          timeOfDeath: fifteenMinutesAgo.toISOString()
        },
        location: "Downtown Regional Campus",
        urgency: "Critical",
        expiresAt: oneHourThirtyMinutesFromFifteenMinutesAgo.toISOString(), // Exactly 2 hours from creation
        createdAt: fifteenMinutesAgo.toISOString(), // 15 minutes ago
        status: "Available",
        matchingRequirements: ["req-001"]
      },
      {
        id: "avail-002",
        donorHospital: "University Hospital",
        contactPerson: "Dr. James Rodriguez",
        phone: "+1-555-0401",
        email: "j.rodriguez@university.com",
        availableOrgans: ["Kidneys", "Pancreas", "Corneas"],
        donorInfo: {
          age: 35,
          bloodType: "A-",
          causeOfDeath: "Stroke",
          timeOfDeath: thirtyMinutesAgo.toISOString()
        },
        location: "University Medical Campus",
        urgency: "High",
        expiresAt: oneHourThirtyMinutesFromThirtyMinutesAgo.toISOString(), // Exactly 2 hours from creation
        createdAt: thirtyMinutesAgo.toISOString(), // 30 minutes ago
        status: "Available",
        matchingRequirements: ["req-002"]
      }
    ]);
  }, []);

  // Countdown timer and auto-expiration effect
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();
      const newCountdowns: {[key: string]: string} = {};
      
      setAvailableOrgans(prev => 
        prev.map(alert => {
          const createdAt = new Date(alert.createdAt).getTime();
          const expiresAt = new Date(alert.expiresAt).getTime();
          const timeLeft = expiresAt - now;
          
          // Verify that expiration is exactly 2 hours from creation
          const expectedExpiresAt = createdAt + (2 * 60 * 60 * 1000);
          if (Math.abs(expiresAt - expectedExpiresAt) > 1000) {
            console.warn(`Alert ${alert.id} expiration time doesn't match 2-hour rule`);
          }
          
          if (timeLeft <= 0) {
            newCountdowns[alert.id] = "EXPIRED";
            return { ...alert, status: "Expired" as const };
          } else {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            if (hours > 0) {
              newCountdowns[alert.id] = `${hours}h ${minutes}m ${seconds}s`;
            } else {
              newCountdowns[alert.id] = `${minutes}m ${seconds}s`;
            }
            
            return alert;
          }
        })
      );
      
      setCountdownTimers(newCountdowns);
    };

    // Update immediately
    updateCountdowns();
    
    // Update every second
    const interval = setInterval(updateCountdowns, 1000);
    
    return () => clearInterval(interval);
  }, []); // Remove availableOrgans dependency to prevent recreation

  const handleOrganToggle = (organ: string) => {
    setNewRequirement(prev => ({
      ...prev,
      organs: prev.organs.includes(organ) 
        ? prev.organs.filter(o => o !== organ)
        : [...prev.organs, organ]
    }));
  };

  const handleSubmitRequirement = async () => {
    if (!newRequirement.hospitalName || !newRequirement.contactPerson || !newRequirement.urgency || newRequirement.organs.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const requirement: OrganRequirement = {
      id: `req-${Date.now()}`,
      hospitalName: newRequirement.hospitalName,
      contactPerson: newRequirement.contactPerson,
      phone: newRequirement.phone,
      email: newRequirement.email,
      urgency: newRequirement.urgency as "Critical" | "High" | "Medium" | "Low",
      organs: newRequirement.organs,
      patientInfo: {
        age: parseInt(newRequirement.patientAge) || 0,
        bloodType: newRequirement.patientBloodType,
        medicalCondition: newRequirement.medicalCondition,
        timeWindow: newRequirement.timeWindow
      },
      requirements: newRequirement.requirements,
      createdAt: new Date().toISOString(),
      status: "Active"
    };

    setRequirements(prev => [requirement, ...prev]);
    
    // Reset form
    setNewRequirement({
      hospitalName: "",
      contactPerson: "",
      phone: "",
      email: "",
      urgency: "",
      organs: [],
      patientAge: "",
      patientBloodType: "",
      medicalCondition: "",
      timeWindow: "",
      requirements: ""
    });
    
    setIsSubmitting(false);
  };

  const handleAcceptAlert = (alertId: string) => {
    const alert = availableOrgans.find(a => a.id === alertId);
    
    setAvailableOrgans(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "Reserved" as const }
          : alert
      )
    );
    
    // Show emergency services notification
    if (alert) {
      setAcceptedAlert(alert);
      setShowEmergencyAlert(true);
    }
    
    setIsDialogOpen(false);
    setSelectedAlert(null);
  };

  const getUrgencyVariant = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "outline";
      case "Low": return "default";
      default: return "secondary";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": 
      case "Available": return "default";
      case "Fulfilled":
      case "Reserved": return "secondary";
      case "Expired": return "destructive";
      default: return "outline";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      const remainingMinutes = diffInMinutes % 60;
      return hours === 1 ? `1 hour ago` : `${hours} hours ago`;
    }
    const days = Math.floor(diffInMinutes / 1440);
    return days === 1 ? `1 day ago` : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-background overflow-auto">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Organ Network</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">Organ Alert System</span>
              </div>
              <Link to="/hospital">
                <Button variant="outline" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <HandHeart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Organ Requirement & Alert System</h1>
          </div>
          <p className="text-muted-foreground">Coordinate organ donations between hospitals to save lives</p>
        </div>

        <div className="overflow-visible">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requirements" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Requirement</span>
            </TabsTrigger>
            <TabsTrigger value="my-requirements" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>My Requirements</span>
            </TabsTrigger>
            <TabsTrigger value="available-organs" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Available Organs</span>
            </TabsTrigger>
          </TabsList>

          {/* Create New Requirement Tab */}
          <TabsContent value="requirements" className="space-y-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-visible">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>New Organ Requirement</span>
                  </CardTitle>
                  <CardDescription>
                    Submit a request for organ donations needed at your hospital
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hospital Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Hospital Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Hospital Name *</Label>
                        <Input
                          placeholder="Enter hospital name"
                          value={newRequirement.hospitalName}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, hospitalName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Contact Person *</Label>
                        <Input
                          placeholder="Dr. Name"
                          value={newRequirement.contactPerson}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, contactPerson: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number *</Label>
                        <Input
                          placeholder="+1-555-0000"
                          value={newRequirement.phone}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="doctor@hospital.com"
                          value={newRequirement.email}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Organ Requirements */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Organ Requirements</h3>
                    <div className="space-y-2">
                      <Label>Urgency Level *</Label>
                      <Select onValueChange={(value) => setNewRequirement(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  level === "Critical" ? "bg-destructive" :
                                  level === "High" ? "bg-orange-500" :
                                  level === "Medium" ? "bg-yellow-500" : "bg-green-500"
                                }`} />
                                <span>{level}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Required Organs *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {organOptions.map((organ) => (
                          <div key={organ} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={organ}
                              checked={newRequirement.organs.includes(organ)}
                              onChange={() => handleOrganToggle(organ)}
                              className="rounded"
                            />
                            <Label htmlFor={organ} className="text-sm">{organ}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Patient Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Patient Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Patient Age</Label>
                        <Input
                          type="number"
                          placeholder="Age"
                          value={newRequirement.patientAge}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, patientAge: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Blood Type</Label>
                        <Select onValueChange={(value) => setNewRequirement(prev => ({ ...prev, patientBloodType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Medical Condition</Label>
                        <Input
                          placeholder="Brief description"
                          value={newRequirement.medicalCondition}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, medicalCondition: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time Window</Label>
                        <Input
                          placeholder="e.g., 48 hours, 7 days"
                          value={newRequirement.timeWindow}
                          onChange={(e) => setNewRequirement(prev => ({ ...prev, timeWindow: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Additional Requirements</Label>
                      <Textarea
                        placeholder="Any specific requirements or compatibility notes..."
                        value={newRequirement.requirements}
                        onChange={(e) => setNewRequirement(prev => ({ ...prev, requirements: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmitRequirement}
                    disabled={isSubmitting || !newRequirement.hospitalName || !newRequirement.contactPerson || !newRequirement.urgency || newRequirement.organs.length === 0}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 animate-spin" />
                        <span>Submitting Requirement...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Submit Organ Requirement</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <span>Important Guidelines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Time Critical:</strong> Organ transplants are time-sensitive. All organ availability alerts expire after 2 hours to ensure optimal organ viability.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Hospital className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Medical Compatibility:</strong> Include specific compatibility requirements and patient medical history for better matching.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Phone className="h-4 w-4" />
                    <AlertDescription>
                      <strong>24/7 Contact:</strong> Provide emergency contact numbers that are monitored around the clock.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Urgency Levels:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <span><strong>Critical:</strong> &lt; 24 hours</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span><strong>High:</strong> 1-7 days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span><strong>Medium:</strong> 1-4 weeks</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span><strong>Low:</strong> &gt; 1 month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Requirements Tab */}
          <TabsContent value="my-requirements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>My Hospital's Requirements</span>
                </CardTitle>
                <CardDescription>
                  Track the status of your organ requirement requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 #F1F5F9'
                }}>
                  {requirements.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="bg-muted p-4 rounded-full">
                          <Activity className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">No Requirements</h3>
                          <p className="text-muted-foreground">You haven't submitted any organ requirements yet</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    requirements.map((req) => (
                    <Card key={req.id} className="border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{req.hospitalName}</CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-1">
                              <span>{req.contactPerson}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(req.createdAt)}</span>
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={getUrgencyVariant(req.urgency)}>
                              {req.urgency}
                            </Badge>
                            <Badge variant={getStatusVariant(req.status)}>
                              {req.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Required Organs</h4>
                            <div className="flex flex-wrap gap-1">
                              {req.organs.map((organ) => (
                                <Badge key={organ} variant="outline" className="text-xs">
                                  {organ}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Patient Info</h4>
                            <div className="text-sm space-y-1">
                              <div>Age: {req.patientInfo.age}</div>
                              <div>Blood Type: {req.patientInfo.bloodType}</div>
                              <div>Time Window: {req.patientInfo.timeWindow}</div>
                            </div>
                          </div>
                        </div>
                        {req.requirements && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Requirements</h4>
                            <p className="text-sm text-muted-foreground">{req.requirements}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Available Organs Tab */}
          <TabsContent value="available-organs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Available Organ Alerts</span>
                </CardTitle>
                <CardDescription>
                  Review organ availability alerts from other hospitals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4" style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 #F1F5F9'
                }}>
                  {availableOrgans.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="bg-muted p-4 rounded-full">
                          <Bell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">No Available Organs</h3>
                          <p className="text-muted-foreground">No organ availability alerts at this time</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    availableOrgans.map((alert) => (
                    <Card key={alert.id} className="border">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{alert.donorHospital}</CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-1">
                              <span>{alert.contactPerson}</span>
                              <span>•</span>
                              <span>{formatTimeAgo(alert.createdAt)}</span>
                              <span>•</span>
                              <span className={`font-medium ${
                                countdownTimers[alert.id] === "EXPIRED" 
                                  ? "text-destructive" 
                                  : countdownTimers[alert.id]?.includes('h') 
                                    ? "text-foreground" 
                                    : "text-orange-600"
                              }`}>
                                {countdownTimers[alert.id] === "EXPIRED" 
                                  ? "EXPIRED" 
                                  : `Expires in: ${countdownTimers[alert.id] || 'Loading...'}`
                                }
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Badge variant={getUrgencyVariant(alert.urgency)}>
                              {alert.urgency}
                            </Badge>
                            <Badge variant={getStatusVariant(alert.status)}>
                              {alert.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Available Organs</h4>
                            <div className="flex flex-wrap gap-1">
                              {alert.availableOrgans.map((organ) => (
                                <Badge key={organ} variant="default" className="text-xs">
                                  {organ}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Donor Information</h4>
                            <div className="text-sm space-y-1">
                              <div>Age: {alert.donorInfo.age}</div>
                              <div>Blood Type: {alert.donorInfo.bloodType}</div>
                              <div>Cause: {alert.donorInfo.causeOfDeath}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{alert.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            {alert.status === "Available" && countdownTimers[alert.id] !== "EXPIRED" && (
                              <>
                                <Dialog open={isDialogOpen && selectedAlert?.id === alert.id} onOpenChange={(open) => {
                                  setIsDialogOpen(open);
                                  if (!open) setSelectedAlert(null);
                                }}>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedAlert(alert)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Organ Availability Details</DialogTitle>
                                      <DialogDescription>
                                        Review donor information and confirm organ acceptance
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    {selectedAlert && (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                            <h4 className="font-semibold mb-2">Donor Hospital</h4>
                                            <div className="text-sm space-y-1">
                                              <div>{selectedAlert.donorHospital}</div>
                                              <div>{selectedAlert.contactPerson}</div>
                                              <div>{selectedAlert.phone}</div>
                                              <div>{selectedAlert.email}</div>
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="font-semibold mb-2">Available Organs</h4>
                                            <div className="flex flex-wrap gap-1">
                                              {selectedAlert.availableOrgans.map((organ) => (
                                                <Badge key={organ} variant="default" className="text-xs">
                                                  {organ}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <Separator />
                                        
                                        <div>
                                          <h4 className="font-semibold mb-2">Donor Information</h4>
                                          <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>Age: {selectedAlert.donorInfo.age}</div>
                                            <div>Blood Type: {selectedAlert.donorInfo.bloodType}</div>
                                            <div>Time of Death: {new Date(selectedAlert.donorInfo.timeOfDeath).toLocaleString()}</div>
                                            <div>Cause: {selectedAlert.donorInfo.causeOfDeath}</div>
                                          </div>
                                        </div>

                                        {selectedAlert.matchingRequirements && selectedAlert.matchingRequirements.length > 0 && (
                                          <Alert>
                                            <CheckCircle className="h-4 w-4" />
                                            <AlertDescription>
                                              This donor matches {selectedAlert.matchingRequirements.length} of your active requirements.
                                            </AlertDescription>
                                          </Alert>
                                        )}
                                      </div>
                                    )}
                                    
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button 
                                        onClick={() => handleAcceptAlert(selectedAlert!.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Accept Organs
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                <Button 
                                  size="sm"
                                  onClick={() => handleAcceptAlert(alert.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                              </>
                            )}
                            {alert.status === "Reserved" && (
                              <Badge variant="secondary">
                                Reserved
                              </Badge>
                            )}
                            {(alert.status === "Expired" || countdownTimers[alert.id] === "EXPIRED") && (
                              <Badge variant="destructive">
                                Expired
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Emergency Services Notification Dialog */}
      <Dialog open={showEmergencyAlert} onOpenChange={setShowEmergencyAlert} modal={false}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-xl">
              <Siren className="h-6 w-6 text-red-600 animate-pulse" />
              <span className="text-red-600">EMERGENCY SERVICES ALERT</span>
              <Siren className="h-6 w-6 text-red-600 animate-pulse" />
            </DialogTitle>
            <DialogDescription className="text-base font-medium">
              Organ transport emergency - Immediate coordination required
            </DialogDescription>
          </DialogHeader>
          
          {acceptedAlert && (
            <div className="space-y-6">
              {/* Alert Header */}
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  <strong>ORGAN TRANSPORT INITIATED:</strong> Emergency vehicle coordination required for life-saving organ transportation.
                </AlertDescription>
              </Alert>

              {/* Transport Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Hospital className="h-5 w-5 text-red-600" />
                      <span>Donor Hospital</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>Hospital:</strong> {acceptedAlert.donorHospital}</div>
                    <div><strong>Location:</strong> {acceptedAlert.location}</div>
                    <div><strong>Contact:</strong> {acceptedAlert.contactPerson}</div>
                    <div><strong>Emergency Line:</strong> {acceptedAlert.phone}</div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-blue-600" />
                      <span>Receiving Hospital</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div><strong>Hospital:</strong> City General Hospital</div>
                    <div><strong>Location:</strong> Downtown Medical District</div>
                    <div><strong>Contact:</strong> Emergency Coordinator</div>
                    <div><strong>Emergency Line:</strong> +1-555-EMERGENCY</div>
                  </CardContent>
                </Card>
              </div>

              {/* Organ Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HandHeart className="h-5 w-5 text-primary" />
                    <span>Organ Transport Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Organs:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {acceptedAlert.availableOrgans.map((organ) => (
                          <Badge key={organ} variant="default" className="text-xs">
                            {organ}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Donor Info:</strong>
                      <div className="mt-1">
                        <div>Age: {acceptedAlert.donorInfo.age}</div>
                        <div>Blood Type: {acceptedAlert.donorInfo.bloodType}</div>
                      </div>
                    </div>
                    <div>
                      <strong>Time Critical:</strong>
                      <div className="mt-1 text-red-600 font-medium">
                        <div>Transport must begin immediately</div>
                        <div>Maximum delay: 30 minutes</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Services Alerts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Emergency Services Notifications Sent</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert className="border-blue-200 bg-blue-50">
                    <Car className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong>Traffic Control Center</strong>
                          <div className="text-sm">Route clearance requested</div>
                          <div className="text-xs text-blue-600">Status: DISPATCHED</div>
                        </div>
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">NOTIFIED</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50">
                    <Shield className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong>Police Dispatch</strong>
                          <div className="text-sm">Escort units assigned</div>
                          <div className="text-xs text-green-600">Status: EN ROUTE</div>
                        </div>
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-xs font-medium">NOTIFIED</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Transport Route */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Route className="h-5 w-5 text-purple-600" />
                    <span>Emergency Transport Route</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert className="border-purple-200 bg-purple-50">
                      <Route className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-800">
                        <strong>Priority Route Activated:</strong> All traffic signals coordinated, emergency lanes cleared for immediate organ transport.
                      </AlertDescription>
                    </Alert>
                    <div className="text-sm space-y-1">
                      <div><strong>Primary Route:</strong> Hospital A → Highway 101 → Downtown Bypass → Hospital B</div>
                      <div><strong>Estimated Time:</strong> 25 minutes (normal: 45 minutes)</div>
                      <div><strong>Backup Route:</strong> Hospital A → State Route 5 → City Center → Hospital B</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span>Emergency Coordination Contacts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <strong className="text-red-600">Traffic Control:</strong>
                      <div>+1-555-TRAFFIC</div>
                      <div>Ref: ORGAN-{acceptedAlert.id.toUpperCase()}</div>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-blue-600">Police Dispatch:</strong>
                      <div>+1-555-POLICE</div>
                      <div>Unit: ESCORT-{acceptedAlert.id.slice(-3)}</div>
                    </div>
                    <div className="space-y-1">
                      <strong className="text-green-600">Medical Transport:</strong>
                      <div>+1-555-MEDTRANS</div>
                      <div>Priority: CRITICAL-1</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <DialogFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              All emergency services have been automatically notified
            </div>
            <Button onClick={() => setShowEmergencyAlert(false)} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Acknowledged
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganRequirementSystem;
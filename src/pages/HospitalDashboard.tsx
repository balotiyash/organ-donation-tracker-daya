import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock,
  Droplets,
  Activity,
  Search,
  Filter,
  Plus,
  Brain,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HospitalDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const bloodInventory = [
    { type: "O+", available: 45, required: 60, status: "low", percentage: 75 },
    { type: "O-", available: 12, required: 30, status: "critical", percentage: 40 },
    { type: "A+", available: 38, required: 40, status: "good", percentage: 95 },
    { type: "A-", available: 15, required: 20, status: "medium", percentage: 75 },
    { type: "B+", available: 28, required: 25, status: "good", percentage: 112 },
    { type: "B-", available: 8, required: 15, status: "low", percentage: 53 },
    { type: "AB+", available: 18, required: 15, status: "good", percentage: 120 },
    { type: "AB-", available: 5, required: 10, status: "critical", percentage: 50 }
  ];

  const emergencyAlerts = [
    {
      id: 1,
      patient: "Emergency Room - Bed 12",
      bloodType: "O-",
      urgency: "Critical",
      timeRemaining: "15 min",
      status: "active"
    },
    {
      id: 2,
      patient: "Surgery Ward - OR 3",
      bloodType: "A+", 
      urgency: "High",
      timeRemaining: "45 min",
      status: "searching"
    },
    {
      id: 3,
      patient: "ICU - Bed 7",
      bloodType: "B-",
      urgency: "Medium",
      timeRemaining: "2 hours",
      status: "matched"
    }
  ];

  const recentDonors = [
    { name: "Sarah Johnson", bloodType: "O-", distance: "2.3 km", lastDonation: "3 months ago", available: true },
    { name: "Michael Chen", bloodType: "A+", distance: "1.8 km", lastDonation: "4 months ago", available: true },
    { name: "Emily Davis", bloodType: "B+", distance: "4.1 km", lastDonation: "2 months ago", available: false },
    { name: "James Wilson", bloodType: "AB+", distance: "3.2 km", lastDonation: "5 months ago", available: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "low": return "warning"; 
      case "medium": return "warning";
      case "good": return "success";
      default: return "secondary";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "accent";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation (matches home page) */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">UBlood</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/faq">
                <Button variant="ghost">FAQ</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
              <Link to="/add-inventory">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Inventory
                </Button>
              </Link>
              <Link to="/blood-inventory-status">
                <Button variant="outline">
                  <Droplets className="w-4 h-4 mr-2" />
                  Blood Inventory
                </Button>
              </Link>
              <Link to="/organ-requirements">
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Organ Network
                </Button>
              </Link>
              <Link to="/ai-agent">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Agent
                </Button>
              </Link>
              <Link to="/emergency">
                <Button variant="destructive">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency SOS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600 animate-pulse" />
                <div>
                  <h3 className="font-semibold text-blue-900">AI Agent Active</h3>
                  <p className="text-sm text-blue-700">Autonomous monitoring and optimization in progress</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-green-700">3 AI Matches Found</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-700">23% Efficiency Gain</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-700">Real-time Optimization</span>
                </div>
              </div>
            </div>
            <Link to="/ai-agent">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Brain className="h-4 w-4 mr-1" />
                View AI Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
              <Droplets className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">2 critical, 1 high priority</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Donors</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1,247</div>
              <p className="text-xs text-muted-foreground">Within 10km radius</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12 min</div>
              <p className="text-xs text-muted-foreground">Average emergency response</p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
                {/* AI-Powered Emergency Alerts */}
        <div className="mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">AI Emergency Alerts</span>
                </div>
                <Badge variant="destructive" className="animate-pulse">
                  2 Critical
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-semibold text-red-800">Critical O- Shortage Detected</div>
                      <div className="text-sm text-red-600">AI identified 5 nearby donors, emergency outreach initiated</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Target className="h-4 w-4 mr-1" />
                    View AI Response
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-semibold text-orange-800">Route Optimization Available</div>
                      <div className="text-sm text-orange-600">AI found 15% faster route for current organ transport</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Apply Optimization
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Panel */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Quick Access - Blood Management</span>
            </CardTitle>
            <CardDescription>
              Rapid access to critical blood inventory and donor management tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/blood-inventory-status">
                <Card className="border-2 border-transparent hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Droplets className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Blood Inventory Status</h3>
                        <p className="text-sm text-muted-foreground">Monitor and filter blood inventory</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/emergency-donor-finder">
                <Card className="border-2 border-transparent hover:border-red-500 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Emergency Donor Finder</h3>
                        <p className="text-sm text-muted-foreground">Find donors for critical situations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/nearby-donor-contact">
                <Card className="border-2 border-transparent hover:border-green-500 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Contact Nearby Donors</h3>
                        <p className="text-sm text-muted-foreground">Connect with local donor network</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blood Inventory */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Blood Inventory Status
                    </CardTitle>
                    <CardDescription>Real-time blood bank levels and requirements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {bloodInventory.map((blood) => (
                    <div key={blood.type} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{blood.type}</span>
                          <Badge variant={getStatusColor(blood.status) as any}>
                            {blood.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {blood.available}/{blood.required} units
                        </span>
                      </div>
                      <Progress value={blood.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {blood.percentage}% of requirement met
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Alerts
                </CardTitle>
                <CardDescription>Active emergency blood requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border rounded-lg bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.patient}</p>
                        <p className="text-xs text-muted-foreground">Blood Type: {alert.bloodType}</p>
                      </div>
                      <Badge variant={getUrgencyColor(alert.urgency) as any} className="text-xs">
                        {alert.urgency}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {alert.timeRemaining}
                      </span>
                      <Button size="sm" variant="outline">
                        Find Donors
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Donors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Nearby Donors
                </CardTitle>
                <CardDescription>Available donors in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="donor-search">Search Donors</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="donor-search"
                      placeholder="Search by blood type or name..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {recentDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{donor.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{donor.bloodType}</span>
                          <span>•</span>
                          <span>{donor.distance}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={donor.available ? "success" : "secondary"} className="text-xs">
                          {donor.available ? "Available" : "Unavailable"}
                        </Badge>
                        {donor.available && (
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertTriangle,
  Heart,
  MapPin,
  Clock,
  Filter,
  Search,
  Bell,
  Calendar,
  Users,
  Activity
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DonorAlerts = () => {
  const [filterUrgency, setFilterUrgency] = useState("all");
  const [filterBloodType, setFilterBloodType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const alerts = [
    {
      id: 1,
      hospital: "City General Hospital",
      bloodType: "O-",
      urgency: "Critical",
      distance: "2.1 km",
      timePosted: "5 min ago",
      description: "Emergency surgery required. Patient in critical condition.",
      reward: "Life Saver Badge + 100 points",
      unitsNeeded: 3,
      deadline: "2 hours",
      responded: false
    },
    {
      id: 2,
      hospital: "Metro Medical Center",
      bloodType: "O+",
      urgency: "High",
      distance: "3.8 km",
      timePosted: "12 min ago",
      description: "Multiple accident victims need immediate blood transfusion.",
      reward: "Hero Points +75",
      unitsNeeded: 5,
      deadline: "4 hours",
      responded: true
    },
    {
      id: 3,
      hospital: "Regional Blood Bank",
      bloodType: "A-",
      urgency: "Medium",
      distance: "5.2 km",
      timePosted: "1 hour ago",
      description: "Low blood stock. Preparing for scheduled surgeries.",
      reward: "Community Badge + 50 points",
      unitsNeeded: 2,
      deadline: "24 hours",
      responded: false
    },
    {
      id: 4,
      hospital: "Children's Hospital",
      bloodType: "B+",
      urgency: "High",
      distance: "4.5 km",
      timePosted: "25 min ago",
      description: "Pediatric patient needs blood for urgent surgery.",
      reward: "Guardian Angel Badge + 80 points",
      unitsNeeded: 1,
      deadline: "6 hours",
      responded: false
    },
    {
      id: 5,
      hospital: "University Medical Center",
      bloodType: "AB-",
      urgency: "Medium",
      distance: "7.1 km",
      timePosted: "2 hours ago",
      description: "Cancer patient undergoing treatment needs blood support.",
      reward: "Hope Hero Badge + 60 points",
      unitsNeeded: 2,
      deadline: "12 hours",
      responded: false
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "accent";
      default: return "secondary";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "Critical": return <AlertTriangle className="w-4 h-4" />;
      case "High": return <Activity className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesUrgency = filterUrgency === "all" || alert.urgency.toLowerCase() === filterUrgency;
    const matchesBloodType = filterBloodType === "all" || alert.bloodType === filterBloodType;
    const matchesSearch = searchTerm === "" || 
      alert.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesUrgency && matchesBloodType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/donor-dashboard" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Donor</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Alerts</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/donor-dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bell className="h-8 w-8 text-primary" />
                Blood Request Alerts
              </h1>
              <p className="text-muted-foreground mt-2">
                Emergency and urgent blood requests in your area
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-destructive/10 text-destructive text-lg px-4 py-2">
                {filteredAlerts.filter(a => a.urgency === 'Critical').length} Critical
              </Badge>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search hospitals or conditions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency Level</label>
                <Select value={filterUrgency} onValueChange={setFilterUrgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="All urgencies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgencies</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Blood Type</label>
                <Select value={filterBloodType} onValueChange={setFilterBloodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All blood types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Types</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No alerts match your filters</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`${alert.urgency === 'Critical' ? 'border-destructive/50 shadow-lg' : alert.urgency === 'High' ? 'border-warning/50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{alert.hospital}</h3>
                        <Badge variant={getUrgencyColor(alert.urgency) as any} className="flex items-center gap-1">
                          {getUrgencyIcon(alert.urgency)}
                          {alert.urgency}
                        </Badge>
                        {alert.responded && (
                          <Badge variant="success">Responded</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{alert.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-primary" />
                          <span className="text-sm">
                            <span className="font-medium">Blood Type:</span> {alert.bloodType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span className="text-sm">
                            <span className="font-medium">Units:</span> {alert.unitsNeeded}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{alert.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{alert.timePosted}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-warning" />
                          <span className="text-sm">
                            <span className="font-medium">Deadline:</span> {alert.deadline}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Reward: </span>
                          <span className="text-primary font-medium">{alert.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Link to={`/donor/view-details/${alert.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {!alert.responded && (
                      <Link to={`/donor/respond/${alert.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Heart className="w-4 h-4 mr-2" />
                          Respond Now
                        </Button>
                      </Link>
                    )}
                    {alert.responded && (
                      <Button size="sm" variant="secondary" disabled>
                        Already Responded
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorAlerts;
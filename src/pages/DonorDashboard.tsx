import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  MapPin, 
  Calendar,
  Award,
  Bell,
  Users,
  Activity,
  Clock,
  Smartphone,
  Shield
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DonorDashboard = () => {
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  
  const donorStats = {
    bloodType: "O-",
    totalDonations: 12,
    livesImpacted: 36,
    nextEligibleDate: "2024-11-15",
    donorScore: 89,
    rank: "Gold Donor"
  };

  const nearbyRequests = [
    {
      hospital: "City General Hospital",
      bloodType: "O-",
      urgency: "Critical",
      distance: "2.1 km",
      timeAgo: "5 min ago",
      reward: "Life Saver Badge"
    },
    {
      hospital: "Metro Medical Center", 
      bloodType: "O+",
      urgency: "High",
      distance: "3.8 km", 
      timeAgo: "12 min ago",
      reward: "Hero Points +50"
    },
    {
      hospital: "Regional Blood Bank",
      bloodType: "O-",
      urgency: "Medium",
      distance: "5.2 km",
      timeAgo: "1 hour ago", 
      reward: "Community Badge"
    }
  ];

  const donationHistory = [
    { date: "2024-08-15", location: "City General Hospital", type: "Whole Blood", status: "Used" },
    { date: "2024-06-10", location: "Metro Blood Bank", type: "Platelets", status: "Used" },
    { date: "2024-04-22", location: "Regional Center", type: "Whole Blood", status: "In Storage" },
    { date: "2024-02-18", location: "City General Hospital", type: "Plasma", status: "Used" }
  ];

  const achievements = [
    { name: "Life Saver", description: "Saved 10+ lives", icon: "🏆", unlocked: true },
    { name: "Regular Hero", description: "10+ donations", icon: "🦸", unlocked: true },
    { name: "Emergency Responder", description: "5+ emergency donations", icon: "🚨", unlocked: true },
    { name: "Community Champion", description: "Referred 5+ donors", icon: "👥", unlocked: false }
  ];

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
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Donor</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/donor/alerts">
                <Button variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts (3)
                </Button>
              </Link>
              <Button className="bg-primary hover:bg-primary/90">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Ready to save more lives today?</p>
            </div>
            <div className="text-right">
              <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">
                {donorStats.rank}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
              <Smartphone className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{donorStats.bloodType}</div>
              <p className="text-xs text-muted-foreground">Universal Donor</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{donorStats.totalDonations}</div>
              <p className="text-xs text-muted-foreground">+2 this year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{donorStats.livesImpacted}</div>
              <p className="text-xs text-muted-foreground">Each donation saves 3 lives</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donor Score</CardTitle>
              <Award className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{donorStats.donorScore}</div>
              <Progress value={donorStats.donorScore} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-destructive" />
                      Nearby Blood Requests
                    </CardTitle>
                    <CardDescription>Help patients in your area who need your blood type</CardDescription>
                  </div>
                  <Badge variant="secondary">3 Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {nearbyRequests.map((request, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{request.hospital}</h3>
                          <Badge variant={getUrgencyColor(request.urgency) as any}>
                            {request.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Blood Type: {request.bloodType}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Reward: </span>
                        <span className="text-accent font-medium">{request.reward}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/donor/view-details/${index + 1}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                        <Link to={`/donor/respond/${index + 1}`}>
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Respond
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settings & Achievements */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Control how you receive emergency alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergency-alerts" className="text-sm font-medium">
                      Emergency Alerts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified for critical blood needs
                    </p>
                  </div>
                  <Switch
                    id="emergency-alerts"
                    checked={emergencyAlerts}
                    onCheckedChange={setEmergencyAlerts}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="location-sharing" className="text-sm font-medium">
                      Location Sharing
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Share location for better matching
                    </p>
                  </div>
                  <Switch
                    id="location-sharing"
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Next Eligible Donation</span>
                  </div>
                  <p className="text-sm text-primary font-semibold">
                    {new Date(donorStats.nextEligibleDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can donate again in 28 days
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-warning" />
                  Achievements
                </CardTitle>
                <CardDescription>Your impact and recognition badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 border border-border rounded-lg text-center ${
                        achievement.unlocked ? 'bg-primary/5' : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <p className="text-xs font-medium">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge variant="success" className="mt-1 text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Donation History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Donation History
            </CardTitle>
            <CardDescription>Track your donations and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {donationHistory.map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-sm">{donation.location}</p>
                        <p className="text-xs text-muted-foreground">{donation.date}</p>
                      </div>
                      <Badge variant="outline">{donation.type}</Badge>
                    </div>
                  </div>
                  <Badge variant={donation.status === "Used" ? "success" : "secondary"}>
                    {donation.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
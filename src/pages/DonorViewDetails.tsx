import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Calendar,
  Users,
  Activity,
  AlertTriangle,
  Hospital,
  Award,
  Share2
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const DonorViewDetails = () => {
  const { id } = useParams();
  
  // Mock data - in real app, this would be fetched based on ID
  const alertDetails = {
    id: 1,
    hospital: "City General Hospital",
    bloodType: "O-",
    urgency: "Critical",
    distance: "2.1 km",
    timePosted: "5 min ago",
    description: "Emergency surgery required. Patient in critical condition.",
    fullDescription: "A 45-year-old patient has been admitted following a severe car accident. The patient has sustained multiple injuries and requires immediate blood transfusion for emergency surgery. The patient's condition is critical, and time is of the essence. We need O- blood type donors to come forward immediately.",
    reward: "Life Saver Badge + 100 points",
    unitsNeeded: 3,
    unitsCollected: 1,
    deadline: "2 hours",
    estimatedTime: "30-45 minutes",
    donationProcess: "Whole Blood Donation",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "emergency@citygeneral.com",
      emergencyLine: "+1 (555) 911-BLOOD"
    },
    address: {
      street: "123 Medical Center Drive",
      city: "Springfield",
      state: "IL",
      zipCode: "62701"
    },
    hospitalDetails: {
      established: "1952",
      beds: "500+",
      specialties: ["Emergency Care", "Trauma Center", "Surgery", "ICU"],
      rating: "4.8/5",
      accreditation: "Joint Commission Accredited"
    },
    patientInfo: {
      ageGroup: "Adult (45 years)",
      condition: "Trauma - Multiple Injuries",
      surgeryType: "Emergency Surgery",
      bloodCompatibility: "O-, O+ can donate"
    },
    requirements: {
      minAge: "18 years",
      minWeight: "110 lbs (50 kg)",
      lastDonation: "Must be 8+ weeks ago",
      healthStatus: "Good general health required"
    },
    timeline: [
      { time: "Just posted", event: "Alert created", status: "current" },
      { time: "15 min ago", event: "Patient admitted", status: "completed" },
      { time: "10 min ago", event: "Surgery scheduled", status: "completed" },
      { time: "5 min ago", event: "Blood request urgent", status: "completed" }
    ]
  };

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
      case "Critical": return <AlertTriangle className="w-5 h-5" />;
      case "High": return <Activity className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

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
              <Link to="/donor/alerts" className="text-muted-foreground hover:text-foreground">
                Alerts
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Details</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Alert
              </Button>
              <Link to="/donor/alerts">
                <Button variant="outline">
                  Back to Alerts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Alert Info */}
        <Card className={`mb-8 ${alertDetails.urgency === 'Critical' ? 'border-destructive/50 shadow-lg' : ''}`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold">{alertDetails.hospital}</h1>
                  <Badge variant={getUrgencyColor(alertDetails.urgency) as any} className="flex items-center gap-1">
                    {getUrgencyIcon(alertDetails.urgency)}
                    {alertDetails.urgency}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{alertDetails.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-1">{alertDetails.bloodType}</div>
                <p className="text-sm text-muted-foreground">Blood Type Needed</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-lg font-semibold">{alertDetails.unitsCollected}/{alertDetails.unitsNeeded}</div>
                <p className="text-sm text-muted-foreground">Units Collected</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
                <div className="text-lg font-semibold">{alertDetails.deadline}</div>
                <p className="text-sm text-muted-foreground">Time Left</p>
              </div>
              <div className="text-center">
                <MapPin className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-lg font-semibold">{alertDetails.distance}</div>
                <p className="text-sm text-muted-foreground">Distance</p>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-sm font-semibold text-primary">{alertDetails.reward}</div>
                <p className="text-sm text-muted-foreground">Reward</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Link to={`/donor/respond/${alertDetails.id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Heart className="w-5 h-5 mr-2" />
                  Respond to Alert
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Navigation className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Full Description */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {alertDetails.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Age Group</h4>
                    <p className="text-muted-foreground">{alertDetails.patientInfo.ageGroup}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Medical Condition</h4>
                    <p className="text-muted-foreground">{alertDetails.patientInfo.condition}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Surgery Type</h4>
                    <p className="text-muted-foreground">{alertDetails.patientInfo.surgeryType}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Blood Compatibility</h4>
                    <p className="text-muted-foreground">{alertDetails.patientInfo.bloodCompatibility}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Emergency Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertDetails.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        event.status === 'current' ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.event}</h4>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Hospital Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-primary" />
                  Hospital Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Main Line</p>
                    <p className="text-sm text-muted-foreground">{alertDetails.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">Emergency Blood Line</p>
                    <p className="text-sm text-muted-foreground">{alertDetails.contact.emergencyLine}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{alertDetails.contact.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {alertDetails.address.street}<br />
                      {alertDetails.address.city}, {alertDetails.address.state} {alertDetails.address.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Donation Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Minimum Age</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.requirements.minAge}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Minimum Weight</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.requirements.minWeight}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Last Donation</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.requirements.lastDonation}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Health Status</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.requirements.healthStatus}</p>
                </div>
                
                <Separator className="my-3" />
                
                <div>
                  <h4 className="font-medium mb-1">Estimated Time</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.estimatedTime}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Donation Type</h4>
                  <p className="text-sm text-muted-foreground">{alertDetails.donationProcess}</p>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Info */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Established</span>
                  <span className="text-sm font-medium">{alertDetails.hospitalDetails.established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bed Capacity</span>
                  <span className="text-sm font-medium">{alertDetails.hospitalDetails.beds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Rating</span>
                  <span className="text-sm font-medium">{alertDetails.hospitalDetails.rating}</span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {alertDetails.hospitalDetails.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground pt-2">
                  {alertDetails.hospitalDetails.accreditation}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorViewDetails;
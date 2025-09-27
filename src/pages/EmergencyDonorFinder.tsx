import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  Calendar,
  Zap,
  Target,
  RefreshCw,
  Bell,
  Route,
  CheckCircle,
  Activity,
  TrendingUp,
  Shield
} from "lucide-react";

interface EmergencyDonor {
  id: string;
  name: string;
  bloodType: string;
  rhFactor: '+' | '-';
  location: {
    address: string;
    city: string;
    distance: number;
    coordinates: { lat: number; lng: number };
  };
  contactInfo: {
    phone: string;
    email: string;
    preferredMethod: 'phone' | 'email' | 'sms';
  };
  availability: {
    isAvailable: boolean;
    lastDonation: string;
    nextEligibleDate: string;
    responseTime: string;
  };
  reliability: {
    score: number;
    totalDonations: number;
    successRate: number;
  };
  medicalInfo: {
    age: number;
    weight: number;
    healthStatus: 'Excellent' | 'Good' | 'Fair';
  };
}

const EmergencyDonorFinder = () => {
  const [searchParams] = useSearchParams();
  const [emergencyDonors, setEmergencyDonors] = useState<EmergencyDonor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<EmergencyDonor[]>([]);
  const [searchRadius, setSearchRadius] = useState('10');
  const [urgencyLevel, setUrgencyLevel] = useState('critical');
  const [isSearching, setIsSearching] = useState(false);
  const [alertSent, setAlertSent] = useState<string[]>([]);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Get blood type and location from URL params
  const bloodTypeFromUrl = searchParams.get('bloodType');
  const locationFromUrl = searchParams.get('location');

  useEffect(() => {
    if (bloodTypeFromUrl) setSelectedBloodType(bloodTypeFromUrl);
    if (locationFromUrl) setSelectedLocation(locationFromUrl);
  }, [bloodTypeFromUrl, locationFromUrl]);

  // Mock emergency donor data
  useEffect(() => {
    const mockDonors: EmergencyDonor[] = [
      {
        id: 'donor-001',
        name: 'Rajesh Kumar',
        bloodType: 'O',
        rhFactor: '-',
        location: {
          address: '123 Marine Drive, Mumbai',
          city: 'Mumbai',
          distance: 2.5,
          coordinates: { lat: 19.0760, lng: 72.8777 }
        },
        contactInfo: {
          phone: '+91-9876543210',
          email: 'rajesh.kumar@email.com',
          preferredMethod: 'phone'
        },
        availability: {
          isAvailable: true,
          lastDonation: '2024-08-15',
          nextEligibleDate: '2024-11-15',
          responseTime: '15 minutes'
        },
        reliability: {
          score: 95,
          totalDonations: 12,
          successRate: 100
        },
        medicalInfo: {
          age: 28,
          weight: 72,
          healthStatus: 'Excellent'
        }
      },
      {
        id: 'donor-002',
        name: 'Priya Sharma',
        bloodType: 'A',
        rhFactor: '+',
        location: {
          address: '456 Linking Road, Mumbai',
          city: 'Mumbai',
          distance: 4.2,
          coordinates: { lat: 19.0544, lng: 72.8219 }
        },
        contactInfo: {
          phone: '+91-9876543211',
          email: 'priya.sharma@email.com',
          preferredMethod: 'sms'
        },
        availability: {
          isAvailable: true,
          lastDonation: '2024-09-20',
          nextEligibleDate: '2024-12-20',
          responseTime: '20 minutes'
        },
        reliability: {
          score: 88,
          totalDonations: 8,
          successRate: 87.5
        },
        medicalInfo: {
          age: 32,
          weight: 58,
          healthStatus: 'Good'
        }
      },
      {
        id: 'donor-003',
        name: 'Amit Patel',
        bloodType: 'B',
        rhFactor: '-',
        location: {
          address: '789 SV Road, Mumbai',
          city: 'Mumbai',
          distance: 6.8,
          coordinates: { lat: 19.0728, lng: 72.8826 }
        },
        contactInfo: {
          phone: '+91-9876543212',
          email: 'amit.patel@email.com',
          preferredMethod: 'phone'
        },
        availability: {
          isAvailable: true,
          lastDonation: '2024-07-10',
          nextEligibleDate: '2024-10-10',
          responseTime: '25 minutes'
        },
        reliability: {
          score: 92,
          totalDonations: 15,
          successRate: 93.3
        },
        medicalInfo: {
          age: 35,
          weight: 78,
          healthStatus: 'Excellent'
        }
      }
    ];

    setEmergencyDonors(mockDonors);
    setFilteredDonors(mockDonors);
  }, []);

  const handleEmergencySearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = emergencyDonors;
      
      if (selectedBloodType) {
        const [bloodType, rhFactor] = selectedBloodType.includes('+') || selectedBloodType.includes('-') 
          ? [selectedBloodType.slice(0, -1), selectedBloodType.slice(-1)] 
          : [selectedBloodType, '+'];
        
        filtered = filtered.filter(donor => 
          donor.bloodType === bloodType && 
          (rhFactor === '+' || donor.rhFactor === rhFactor)
        );
      }
      
      if (selectedLocation) {
        filtered = filtered.filter(donor => 
          donor.location.city.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }
      
      const radiusKm = parseInt(searchRadius);
      filtered = filtered.filter(donor => donor.location.distance <= radiusKm);
      
      filtered.sort((a, b) => {
        if (urgencyLevel === 'critical') {
          return a.location.distance - b.location.distance;
        }
        return b.reliability.score - a.reliability.score;
      });
      
      setFilteredDonors(filtered);
      setIsSearching(false);
    }, 2000);
  };

  const sendEmergencyAlert = (donorId: string) => {
    setAlertSent([...alertSent, donorId]);
    // Simulate sending alert
    setTimeout(() => {
      // Alert sent confirmation can be handled here
    }, 1000);
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/blood-inventory-status" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Inventory</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Emergency</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="h-8 w-8 text-red-600 animate-pulse" />
                <h1 className="text-3xl font-bold text-foreground">Emergency Donor Finder</h1>
              </div>
              <p className="text-muted-foreground">
                Rapidly locate and contact nearby donors for critical blood requirements
              </p>
            </div>
            <Alert className="w-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Emergency Mode: Prioritizing closest available donors
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Emergency Search Panel */}
        <Card className="mb-8 border-red-200 bg-red-50/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <Zap className="h-5 w-5" />
              <span>Emergency Search Parameters</span>
            </CardTitle>
            <CardDescription>
              Configure search parameters for urgent donor location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Blood Type Required</label>
                <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O-">O- (Universal Donor)</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="AB+">AB+ (Universal Recipient)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Search Radius</label>
                <Select value={searchRadius} onValueChange={setSearchRadius}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km (Immediate vicinity)</SelectItem>
                    <SelectItem value="10">10 km (City area)</SelectItem>
                    <SelectItem value="25">25 km (Extended area)</SelectItem>
                    <SelectItem value="50">50 km (Regional area)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Emergency Location</label>
                <Input
                  placeholder="Enter hospital/location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical (Distance Priority)</SelectItem>
                    <SelectItem value="high">High (Reliability Priority)</SelectItem>
                    <SelectItem value="moderate">Moderate (Balanced)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleEmergencySearch}
              disabled={isSearching || !selectedBloodType}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Searching Emergency Donors...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Emergency Donors
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{filteredDonors.length}</div>
                  <div className="text-sm text-muted-foreground">Donors Found</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {filteredDonors.filter(d => d.availability.isAvailable).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {filteredDonors.length > 0 ? 
                      Math.min(...filteredDonors.map(d => parseInt(d.availability.responseTime))) + 'm' 
                      : '0m'
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Fastest Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{alertSent.length}</div>
                  <div className="text-sm text-muted-foreground">Alerts Sent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Donors List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Emergency Donor Contacts</span>
              </div>
              <Badge variant="destructive">Priority Order</Badge>
            </CardTitle>
            <CardDescription>
              Donors sorted by proximity and reliability for emergency response
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDonors.map((donor, index) => (
                <Card key={donor.id} className="border-l-4 border-l-red-500 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Donor Info */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-red-600">
                              {donor.bloodType}{donor.rhFactor}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{donor.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">Priority #{index + 1}</Badge>
                              {donor.availability.isAvailable && (
                                <Badge className="bg-green-100 text-green-600">Available</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location & Distance */}
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">{donor.location.address}</div>
                            <div className="text-sm text-muted-foreground">{donor.location.city}</div>
                            <div className="text-sm font-bold text-red-600">
                              {donor.location.distance} km away
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact & Reliability */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm font-medium">{donor.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{donor.contactInfo.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={`h-3 w-3 ${getReliabilityColor(donor.reliability.score)}`} />
                            <span className={`text-sm font-medium ${getReliabilityColor(donor.reliability.score)}`}>
                              {donor.reliability.score}% Reliability
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div>Response: <span className="font-medium">{donor.availability.responseTime}</span></div>
                          <div>Donations: <span className="font-medium">{donor.reliability.totalDonations}</span></div>
                          <div>
                            Health: 
                            <Badge className={`ml-2 ${getHealthStatusColor(donor.medicalInfo.healthStatus)}`}>
                              {donor.medicalInfo.healthStatus}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {!alertSent.includes(donor.id) ? (
                            <Button
                              onClick={() => sendEmergencyAlert(donor.id)}
                              className="bg-red-600 hover:bg-red-700 text-xs"
                              size="sm"
                            >
                              <Bell className="h-3 w-3 mr-1" />
                              Send Emergency Alert
                            </Button>
                          ) : (
                            <Button disabled size="sm" variant="outline" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                              Alert Sent
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            Call Now
                          </Button>
                          <Link to={`/nearby-donor-contact?donorId=${donor.id}`}>
                            <Button size="sm" variant="outline" className="text-xs">
                              <Route className="h-3 w-3 mr-1" />
                              View Route
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredDonors.length === 0 && !isSearching && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Emergency Donors Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try expanding the search radius or adjusting blood type requirements
                  </p>
                  <Button onClick={() => setSearchRadius('50')} variant="outline">
                    Expand Search to 50km
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyDonorFinder;
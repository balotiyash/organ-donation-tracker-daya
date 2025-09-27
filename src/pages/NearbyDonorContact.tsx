import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  Send,
  MessageCircle,
  Navigation,
  Star,
  CheckCircle,
  AlertCircle,
  Route,
  Calendar,
  Activity,
  Shield,
  Users,
  Target,
  Zap
} from "lucide-react";

interface NearbyDonor {
  id: string;
  name: string;
  bloodType: string;
  rhFactor: '+' | '-';
  location: {
    address: string;
    city: string;
    state: string;
    distance: number;
    travelTime: string;
    coordinates: { lat: number; lng: number };
  };
  contactInfo: {
    phone: string;
    email: string;
    preferredMethod: 'phone' | 'email' | 'sms';
    availability: string[];
  };
  donationHistory: {
    totalDonations: number;
    lastDonation: string;
    nextEligibleDate: string;
    reliability: number;
  };
  personalInfo: {
    age: number;
    gender: string;
    occupation: string;
    languages: string[];
  };
  preferences: {
    donationCenters: string[];
    timeSlots: string[];
    notifications: boolean;
  };
}

interface ContactMessage {
  id: string;
  donorId: string;
  message: string;
  type: 'sms' | 'email' | 'call';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'responded';
}

const NearbyDonorContact = () => {
  const [searchParams] = useSearchParams();
  const [nearbyDonors, setNearbyDonors] = useState<NearbyDonor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<NearbyDonor[]>([]);
  const [searchRadius, setSearchRadius] = useState('15');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedDonor, setSelectedDonor] = useState<NearbyDonor | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [contactMethod, setContactMethod] = useState<'sms' | 'email' | 'call'>('sms');
  const [isLoading, setIsLoading] = useState(true);

  // Get parameters from URL
  const bloodTypeFromUrl = searchParams.get('bloodType');
  const locationFromUrl = searchParams.get('location');
  const donorIdFromUrl = searchParams.get('donorId');

  // Mock nearby donors data
  useEffect(() => {
    const mockDonors: NearbyDonor[] = [
      {
        id: 'donor-001',
        name: 'Arjun Mehta',
        bloodType: 'O',
        rhFactor: '-',
        location: {
          address: '234 Bandra West, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          distance: 3.2,
          travelTime: '12 minutes',
          coordinates: { lat: 19.0596, lng: 72.8295 }
        },
        contactInfo: {
          phone: '+91-9876543213',
          email: 'arjun.mehta@email.com',
          preferredMethod: 'phone',
          availability: ['Morning', 'Evening']
        },
        donationHistory: {
          totalDonations: 18,
          lastDonation: '2024-08-20',
          nextEligibleDate: '2024-11-20',
          reliability: 96
        },
        personalInfo: {
          age: 29,
          gender: 'Male',
          occupation: 'Software Engineer',
          languages: ['English', 'Hindi', 'Marathi']
        },
        preferences: {
          donationCenters: ['Mumbai Blood Bank', 'City Hospital'],
          timeSlots: ['9:00 AM - 12:00 PM', '6:00 PM - 8:00 PM'],
          notifications: true
        }
      },
      {
        id: 'donor-002',
        name: 'Sneha Reddy',
        bloodType: 'A',
        rhFactor: '+',
        location: {
          address: '567 Powai, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          distance: 5.7,
          travelTime: '18 minutes',
          coordinates: { lat: 19.1176, lng: 72.9060 }
        },
        contactInfo: {
          phone: '+91-9876543214',
          email: 'sneha.reddy@email.com',
          preferredMethod: 'email',
          availability: ['Afternoon', 'Evening']
        },
        donationHistory: {
          totalDonations: 12,
          lastDonation: '2024-09-15',
          nextEligibleDate: '2024-12-15',
          reliability: 89
        },
        personalInfo: {
          age: 26,
          gender: 'Female',
          occupation: 'Marketing Manager',
          languages: ['English', 'Telugu', 'Hindi']
        },
        preferences: {
          donationCenters: ['Powai Blood Center', 'Hiranandani Hospital'],
          timeSlots: ['2:00 PM - 5:00 PM', '7:00 PM - 9:00 PM'],
          notifications: true
        }
      },
      {
        id: 'donor-003',
        name: 'Vikram Singh',
        bloodType: 'B',
        rhFactor: '+',
        location: {
          address: '890 Andheri East, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          distance: 8.4,
          travelTime: '25 minutes',
          coordinates: { lat: 19.1136, lng: 72.8697 }
        },
        contactInfo: {
          phone: '+91-9876543215',
          email: 'vikram.singh@email.com',
          preferredMethod: 'sms',
          availability: ['Morning', 'Afternoon']
        },
        donationHistory: {
          totalDonations: 22,
          lastDonation: '2024-07-30',
          nextEligibleDate: '2024-10-30',
          reliability: 91
        },
        personalInfo: {
          age: 34,
          gender: 'Male',
          occupation: 'Business Owner',
          languages: ['English', 'Hindi', 'Punjabi']
        },
        preferences: {
          donationCenters: ['Andheri Blood Bank', 'Kokilaben Hospital'],
          timeSlots: ['8:00 AM - 11:00 AM', '1:00 PM - 4:00 PM'],
          notifications: true
        }
      }
    ];

    setTimeout(() => {
      setNearbyDonors(mockDonors);
      setFilteredDonors(mockDonors);
      setIsLoading(false);
      
      // Select specific donor if ID provided
      if (donorIdFromUrl) {
        const donor = mockDonors.find(d => d.id === donorIdFromUrl);
        if (donor) setSelectedDonor(donor);
      }
    }, 1500);
  }, [donorIdFromUrl]);

  // Filter and sort donors
  useEffect(() => {
    let filtered = nearbyDonors;
    const radiusKm = parseInt(searchRadius);
    filtered = filtered.filter(donor => donor.location.distance <= radiusKm);
    
    // Sort donors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.location.distance - b.location.distance;
        case 'reliability':
          return b.donationHistory.reliability - a.donationHistory.reliability;
        case 'donations':
          return b.donationHistory.totalDonations - a.donationHistory.totalDonations;
        default:
          return a.location.distance - b.location.distance;
      }
    });
    
    setFilteredDonors(filtered);
  }, [nearbyDonors, searchRadius, sortBy]);

  const sendMessage = () => {
    if (!selectedDonor || !messageText.trim()) return;
    
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      donorId: selectedDonor.id,
      message: messageText,
      type: contactMethod,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setContactMessages([...contactMessages, newMessage]);
    setMessageText('');
    
    // Simulate message delivery
    setTimeout(() => {
      setContactMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 2000);
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Send className="h-3 w-3 text-blue-600" />;
      case 'delivered': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'read': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'responded': return <MessageCircle className="h-3 w-3 text-purple-600" />;
      default: return <Send className="h-3 w-3" />;
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
                <span className="text-xl font-bold">UBlood Connect</span>
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
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Nearby Donor Contact</h1>
              </div>
              <p className="text-muted-foreground">
                Connect with nearby blood donors and coordinate donation logistics
              </p>
            </div>
            {bloodTypeFromUrl && (
              <Alert className="w-auto">
                <Target className="h-4 w-4" />
                <AlertDescription>
                  Searching for: <strong>{bloodTypeFromUrl}</strong> in {locationFromUrl}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donors List */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5" />
                    <span>Search & Filter</span>
                  </div>
                  <Badge variant="secondary">{filteredDonors.length} Donors</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search Radius</label>
                    <Select value={searchRadius} onValueChange={setSearchRadius}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="15">Within 15 km</SelectItem>
                        <SelectItem value="25">Within 25 km</SelectItem>
                        <SelectItem value="50">Within 50 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Nearest First</SelectItem>
                        <SelectItem value="reliability">Most Reliable</SelectItem>
                        <SelectItem value="donations">Most Donations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
                  <div className="text-lg font-semibold">Finding nearby donors...</div>
                </div>
              ) : (
                filteredDonors.map((donor, index) => (
                  <Card 
                    key={donor.id} 
                    className={`transition-all hover:shadow-lg cursor-pointer ${
                      selectedDonor?.id === donor.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedDonor(donor)}
                  >
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Donor Info */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-lg font-bold text-primary">
                                {donor.bloodType}{donor.rhFactor}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{donor.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                {donor.personalInfo.age} years, {donor.personalInfo.occupation}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Badge className={getReliabilityColor(donor.donationHistory.reliability)}>
                              <Star className="h-3 w-3 mr-1" />
                              {donor.donationHistory.reliability}%
                            </Badge>
                            <Badge variant="outline">
                              {donor.donationHistory.totalDonations} donations
                            </Badge>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <div className="font-medium">{donor.location.city}</div>
                              <div className="text-sm text-muted-foreground">
                                {donor.location.address}
                              </div>
                              <div className="text-sm font-bold text-primary">
                                {donor.location.distance} km • {donor.location.travelTime}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact & Actions */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{donor.contactInfo.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{donor.contactInfo.email}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {donor.contactInfo.availability.map(time => (
                              <Badge key={time} variant="outline" className="text-xs">
                                {time}
                              </Badge>
                            ))}
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDonor(donor);
                            }}
                            className="w-full"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Contact Donor
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {filteredDonors.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Donors Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try expanding the search radius to find more donors
                  </p>
                  <Button onClick={() => setSearchRadius('50')} variant="outline">
                    Expand to 50km Radius
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Panel */}
          <div className="lg:col-span-1">
            {selectedDonor ? (
              <div className="space-y-6">
                {/* Donor Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Donor Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-primary">
                          {selectedDonor.bloodType}{selectedDonor.rhFactor}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg">{selectedDonor.name}</h3>
                      <p className="text-muted-foreground">
                        {selectedDonor.personalInfo.occupation}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Age: <span className="font-medium">{selectedDonor.personalInfo.age}</span></div>
                        <div>Gender: <span className="font-medium">{selectedDonor.personalInfo.gender}</span></div>
                        <div>Donations: <span className="font-medium">{selectedDonor.donationHistory.totalDonations}</span></div>
                        <div>Reliability: <span className="font-medium">{selectedDonor.donationHistory.reliability}%</span></div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Languages</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedDonor.personalInfo.languages.map(lang => (
                            <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Availability</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedDonor.contactInfo.availability.map(time => (
                            <Badge key={time} variant="secondary" className="text-xs">{time}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t space-y-2">
                      <Button className="w-full" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call {selectedDonor.contactInfo.phone}
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Message Interface */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Send Message</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Method</label>
                      <Select value={contactMethod} onValueChange={(value: 'sms' | 'email' | 'call') => setContactMethod(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="call">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea
                        placeholder="Type your message to the donor..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button onClick={sendMessage} className="w-full" disabled={!messageText.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send {contactMethod.toUpperCase()}
                    </Button>
                  </CardContent>
                </Card>

                {/* Message History */}
                {contactMessages.filter(msg => msg.donorId === selectedDonor.id).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5" />
                        <span>Message History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {contactMessages
                          .filter(msg => msg.donorId === selectedDonor.id)
                          .map(message => (
                            <div key={message.id} className="p-3 bg-muted rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {message.type.toUpperCase()}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  {getMessageStatusIcon(message.status)}
                                  <span className="text-xs capitalize">{message.status}</span>
                                </div>
                              </div>
                              <p className="text-sm">{message.message}</p>
                              <div className="text-xs text-muted-foreground mt-1">
                                {new Date(message.timestamp).toLocaleString()}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a Donor</h3>
                  <p className="text-muted-foreground">
                    Choose a donor from the list to view details and send messages
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyDonorContact;
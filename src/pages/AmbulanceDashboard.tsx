import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Ambulance, 
  MapPin, 
  Phone, 
  Clock, 
  AlertTriangle, 
  Navigation, 
  Heart,
  Droplet,
  Hospital,
  Search,
  Timer,
  Route
} from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  estimatedTime: string;
  bloodStock: {
    [key: string]: number;
  };
  emergencyContact: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const AmbulanceDashboard = () => {
  const [searchData, setSearchData] = useState({
    bloodType: "",
    patientName: "",
    emergencyLevel: "",
    currentLocation: "",
    additionalNotes: ""
  });
  
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock hospital data
  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      phone: "+1-555-0101",
      distance: 2.3,
      estimatedTime: "8-12 mins",
      bloodStock: { "O+": 15, "O-": 8, "A+": 12, "A-": 5, "B+": 10, "B-": 3, "AB+": 7, "AB-": 2 },
      emergencyContact: "+1-555-0102",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: "2",
      name: "St. Mary's Medical Center",
      address: "456 Oak Avenue, Midtown",
      phone: "+1-555-0201",
      distance: 4.1,
      estimatedTime: "15-20 mins",
      bloodStock: { "O+": 20, "O-": 12, "A+": 8, "A-": 4, "B+": 15, "B-": 6, "AB+": 9, "AB-": 3 },
      emergencyContact: "+1-555-0202",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: "3",
      name: "Emergency Care Hospital",
      address: "789 Pine Street, Uptown",
      phone: "+1-555-0301",
      distance: 6.7,
      estimatedTime: "20-25 mins",
      bloodStock: { "O+": 5, "O-": 15, "A+": 18, "A-": 9, "B+": 12, "B-": 8, "AB+": 4, "AB-": 6 },
      emergencyContact: "+1-555-0302",
      coordinates: { lat: 40.7831, lng: -73.9712 }
    }
  ];

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const emergencyLevels = ["Critical", "High", "Medium", "Low"];

  const handleSearch = async () => {
    if (!searchData.bloodType || !searchData.patientName || !searchData.emergencyLevel) {
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter and sort hospitals by blood availability and distance
    const availableHospitals = mockHospitals
      .filter(hospital => hospital.bloodStock[searchData.bloodType] > 0)
      .sort((a, b) => {
        // Prioritize by blood stock availability and distance
        const stockDiff = b.bloodStock[searchData.bloodType] - a.bloodStock[searchData.bloodType];
        if (stockDiff !== 0) return stockDiff;
        return a.distance - b.distance;
      });

    setSearchResults(availableHospitals);
    setIsSearching(false);
    setHasSearched(true);
  };

  const getEmergencyColor = (level: string) => {
    switch (level) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "outline";
      case "Low": return "default";
      default: return "secondary";
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock >= 15) return { variant: "default" as const, status: "High Stock" };
    if (stock >= 8) return { variant: "secondary" as const, status: "Medium Stock" };
    if (stock >= 1) return { variant: "destructive" as const, status: "Low Stock" };
    return { variant: "outline" as const, status: "Out of Stock" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - matches other dashboards */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Emergency</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold text-sm">EMERGENCY MODE</span>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Ambulance className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Emergency Blood Locator</h1>
          </div>
          <p className="text-muted-foreground">Find nearest hospitals with required blood types for emergency situations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Emergency Blood Request</span>
                </CardTitle>
                <CardDescription>
                  Fill in patient details to find nearest hospitals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={searchData.patientName}
                    onChange={(e) => setSearchData({ ...searchData, patientName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodType">Required Blood Type *</Label>
                  <Select onValueChange={(value) => setSearchData({ ...searchData, bloodType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center space-x-2">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span>{type}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyLevel">Emergency Level *</Label>
                  <Select onValueChange={(value) => setSearchData({ ...searchData, emergencyLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emergency level" />
                    </SelectTrigger>
                    <SelectContent>
                      {emergencyLevels.map((level) => (
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
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    placeholder="Enter current address"
                    value={searchData.currentLocation}
                    onChange={(e) => setSearchData({ ...searchData, currentLocation: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Input
                    id="additionalNotes"
                    placeholder="Any additional information"
                    value={searchData.additionalNotes}
                    onChange={(e) => setSearchData({ ...searchData, additionalNotes: e.target.value })}
                  />
                </div>

                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !searchData.bloodType || !searchData.patientName || !searchData.emergencyLevel}
                  className="w-full"
                  variant="default"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 animate-spin" />
                      <span>Searching Hospitals...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4" />
                      <span>Find Hospitals</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-2">
            {hasSearched && (
              <div className="space-y-6">
                {/* Search Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Hospital className="h-5 w-5 text-primary" />
                        <span>Search Results</span>
                      </div>
                      {searchData.emergencyLevel && (
                        <Badge variant={getEmergencyColor(searchData.emergencyLevel)}>
                          {searchData.emergencyLevel} Priority
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Found {searchResults.length} hospitals with {searchData.bloodType} blood available
                    </CardDescription>
                  </CardHeader>
                </Card>

                {searchResults.length === 0 ? (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      No hospitals found with {searchData.bloodType} blood type in stock. 
                      Please try contacting hospitals directly or consider alternative blood types.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((hospital, index) => {
                      const stockInfo = getStockStatus(hospital.bloodStock[searchData.bloodType]);
                      return (
                        <Card key={hospital.id} className={index === 0 ? 'border-primary' : ''}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="flex items-center space-x-2">
                                  <Hospital className="h-5 w-5 text-primary" />
                                  <span>{hospital.name}</span>
                                  {index === 0 && (
                                    <Badge className="ml-2" variant="default">
                                      RECOMMENDED
                                    </Badge>
                                  )}
                                </CardTitle>
                                <CardDescription className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{hospital.distance} km away</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>ETA: {hospital.estimatedTime}</span>
                                  </div>
                                </CardDescription>
                              </div>
                              <Badge variant={stockInfo.variant}>
                                {hospital.bloodStock[searchData.bloodType]} units - {stockInfo.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Contact Information</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{hospital.address}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{hospital.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                    <span className="text-destructive">Emergency: {hospital.emergencyContact}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Blood Bank Status</h4>
                                <div className="grid grid-cols-4 gap-1 text-xs">
                                  {Object.entries(hospital.bloodStock).map(([type, count]) => (
                                    <div 
                                      key={type} 
                                      className={`p-1 rounded text-center border ${
                                        type === searchData.bloodType ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground'
                                      }`}
                                    >
                                      <div>{type}</div>
                                      <div>{count}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="default">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call Hospital
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Navigation className="h-4 w-4 mr-1" />
                                  Get Directions
                                </Button>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Route className="h-4 w-4" />
                                <span>Distance: {hospital.distance} km</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {!hasSearched && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-muted p-4 rounded-full">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ready to Search</h3>
                      <p className="text-muted-foreground">Fill in the emergency details to find nearby hospitals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-2 border-t">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
          <Heart className="h-5 w-5 animate-pulse" />
          <span className="font-semibold">Emergency Blood Locator System - Available 24/7</span>
          <Heart className="h-5 w-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Heart, 
  ArrowLeft, 
  Search, 
  Filter, 
  RefreshCw,
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingDown,
  TrendingUp,
  MapPin,
  Calendar,
  Droplets,
  Activity,
  Eye,
  Download,
  Bell,
  Truck
} from "lucide-react";

interface InventoryItem {
  id: string;
  bloodType: string;
  rhFactor: '+' | '-';
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  criticalLevel: number;
  location: string;
  hospital: string;
  expiryDate: string;
  collectionDate: string;
  status: 'Critical' | 'Low' | 'Normal' | 'High';
  temperature: number;
  storageUnit: string;
}

const BloodInventoryStatus = () => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodType, setFilterBloodType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock inventory data
  useEffect(() => {
    const mockData: InventoryItem[] = [
      {
        id: 'INV-001',
        bloodType: 'O',
        rhFactor: '-',
        quantity: 15,
        reservedQuantity: 3,
        availableQuantity: 12,
        criticalLevel: 20,
        location: 'Mumbai Central',
        hospital: 'City General Hospital',
        expiryDate: '2024-12-15',
        collectionDate: '2024-11-20',
        status: 'Critical',
        temperature: 2.5,
        storageUnit: 'Unit-A-01'
      },
      {
        id: 'INV-002',
        bloodType: 'A',
        rhFactor: '+',
        quantity: 45,
        reservedQuantity: 8,
        availableQuantity: 37,
        criticalLevel: 25,
        location: 'Delhi North',
        hospital: 'Metro Hospital',
        expiryDate: '2024-12-20',
        collectionDate: '2024-11-25',
        status: 'Normal',
        temperature: 3.0,
        storageUnit: 'Unit-B-03'
      },
      {
        id: 'INV-003',
        bloodType: 'B',
        rhFactor: '-',
        quantity: 8,
        reservedQuantity: 2,
        availableQuantity: 6,
        criticalLevel: 15,
        location: 'Bangalore South',
        hospital: 'Tech City Medical Center',
        expiryDate: '2024-12-10',
        collectionDate: '2024-11-15',
        status: 'Low',
        temperature: 2.8,
        storageUnit: 'Unit-C-02'
      },
      {
        id: 'INV-004',
        bloodType: 'AB',
        rhFactor: '+',
        quantity: 25,
        reservedQuantity: 5,
        availableQuantity: 20,
        criticalLevel: 10,
        location: 'Chennai East',
        hospital: 'Apollo Medical Center',
        expiryDate: '2024-12-25',
        collectionDate: '2024-11-30',
        status: 'High',
        temperature: 2.2,
        storageUnit: 'Unit-D-01'
      },
      {
        id: 'INV-005',
        bloodType: 'O',
        rhFactor: '+',
        quantity: 18,
        reservedQuantity: 4,
        availableQuantity: 14,
        criticalLevel: 30,
        location: 'Mumbai Central',
        hospital: 'Fortis Hospital',
        expiryDate: '2024-12-18',
        collectionDate: '2024-11-23',
        status: 'Low',
        temperature: 2.7,
        storageUnit: 'Unit-E-05'
      }
    ];

    setTimeout(() => {
      setInventoryData(mockData);
      setFilteredData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = inventoryData;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBloodType !== 'all') {
      filtered = filtered.filter(item => item.bloodType === filterBloodType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (filterLocation !== 'all') {
      filtered = filtered.filter(item => item.location === filterLocation);
    }

    setFilteredData(filtered);
  }, [searchTerm, filterBloodType, filterStatus, filterLocation, inventoryData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'Low': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'High': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Critical': return <AlertTriangle className="h-4 w-4" />;
      case 'Low': return <TrendingDown className="h-4 w-4" />;
      case 'Normal': return <Activity className="h-4 w-4" />;
      case 'High': return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUniqueLocations = () => {
    return [...new Set(inventoryData.map(item => item.location))];
  };

  const getTotalStats = () => {
    const total = filteredData.reduce((acc, item) => {
      acc.totalUnits += item.quantity;
      acc.availableUnits += item.availableQuantity;
      acc.reservedUnits += item.reservedQuantity;
      return acc;
    }, { totalUnits: 0, availableUnits: 0, reservedUnits: 0 });

    const criticalItems = filteredData.filter(item => item.status === 'Critical').length;
    const lowItems = filteredData.filter(item => item.status === 'Low').length;

    return { ...total, criticalItems, lowItems };
  };

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/hospital" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Hospital Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Inventory</span>
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
                <Droplets className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Blood Inventory Status</h1>
              </div>
              <p className="text-muted-foreground">
                Real-time blood inventory management and monitoring system
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => window.location.reload()} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Link to="/emergency-donor-finder">
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Emergency Finder
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalUnits}</div>
                  <div className="text-sm text-muted-foreground">Total Units</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.availableUnits}</div>
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
                  <div className="text-2xl font-bold">{stats.reservedUnits}</div>
                  <div className="text-sm text-muted-foreground">Reserved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.criticalItems}</div>
                  <div className="text-sm text-muted-foreground">Critical</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">{stats.lowItems}</div>
                  <div className="text-sm text-muted-foreground">Low Stock</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Search</span>
            </CardTitle>
            <CardDescription>
              Filter blood inventory by various parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hospital, location, blood type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterBloodType} onValueChange={setFilterBloodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Types</SelectItem>
                  <SelectItem value="O">Type O</SelectItem>
                  <SelectItem value="A">Type A</SelectItem>
                  <SelectItem value="B">Type B</SelectItem>
                  <SelectItem value="AB">Type AB</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {getUniqueLocations().map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Inventory Details</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Badge variant="secondary">{filteredData.length} Items</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading inventory data...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredData.map((item, index) => (
                  <Card key={index} className={`border-l-4 ${getStatusColor(item.status)} transition-all hover:shadow-lg`}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Blood Type & Status */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="text-3xl font-bold text-primary">
                              {item.bloodType}{item.rhFactor}
                            </div>
                            <Badge className={getStatusColor(item.status)}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.status}</span>
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {item.id}
                          </div>
                        </div>

                        {/* Location & Hospital */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{item.hospital}</div>
                              <div className="text-sm text-muted-foreground">{item.location}</div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Storage: {item.storageUnit}
                          </div>
                        </div>

                        {/* Quantity Details */}
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Available</span>
                              <span className="font-bold text-green-600">{item.availableQuantity} units</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Reserved</span>
                              <span className="font-medium text-orange-600">{item.reservedQuantity} units</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Total</span>
                              <span className="font-bold">{item.quantity} units</span>
                            </div>
                          </div>
                          <Progress 
                            value={(item.availableQuantity / item.criticalLevel) * 100} 
                            className="h-2" 
                          />
                          <div className="text-xs text-muted-foreground">
                            Critical level: {item.criticalLevel} units
                          </div>
                        </div>

                        {/* Dates & Actions */}
                        <div className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{getDaysUntilExpiry(item.expiryDate)} days left</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Temp: {item.temperature}°C
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link to={`/nearby-donor-contact?bloodType=${item.bloodType}${item.rhFactor}&location=${item.location}`}>
                              <Button size="sm" variant="outline" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Find Donors
                              </Button>
                            </Link>
                            {item.status === 'Critical' && (
                              <Link to={`/emergency-donor-finder?bloodType=${item.bloodType}${item.rhFactor}&location=${item.location}`}>
                                <Button size="sm" className="text-xs bg-red-600 hover:bg-red-700">
                                  <Bell className="h-3 w-3 mr-1" />
                                  Emergency
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredData.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <Droplets className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Inventory Found</h3>
                    <p className="text-muted-foreground">
                      No blood inventory matches your current filters
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BloodInventoryStatus;
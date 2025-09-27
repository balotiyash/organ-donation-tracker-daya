import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Plus,
  Save,
  Calendar as CalendarIcon,
  Droplets,
  AlertTriangle,
  User,
  Building2,
  Clock,
  ArrowLeft,
  Check,
  X
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddInventory = () => {
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    age: "",
    gender: "",
    bloodType: "",
    phone: "",
    email: "",
    address: "",
    medicalHistory: "",
    emergencyContact: ""
  });

  const [donationDetails, setDonationDetails] = useState({
    donationDate: undefined as Date | undefined,
    expiryDate: undefined as Date | undefined,
    units: "",
    collectionCenter: "",
    testResults: "",
    storageLocation: "",
    notes: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];
  const testResultOptions = ["Pending", "Negative", "Positive - HIV", "Positive - Hepatitis B", "Positive - Hepatitis C", "Positive - Syphilis"];

  const handleDonorInfoChange = (field: string, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleDonationDetailsChange = (field: string, value: string | Date) => {
    setDonationDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Handle success/redirect logic here
    console.log("Inventory added:", { donorInfo, donationDetails });
  };

  const isStep1Valid = donorInfo.name && donorInfo.bloodType && donorInfo.phone;
  const isStep2Valid = donationDetails.donationDate && donationDetails.units && donationDetails.collectionCenter;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
              <Link to="/hospital">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add Blood Inventory</h1>
              <p className="text-muted-foreground">Register new blood donation and add to inventory</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <User className="w-4 h-4" />
              <span className="font-medium">Donor Info</span>
              {currentStep > 1 && <Check className="w-4 h-4" />}
            </div>
            <div className="h-px flex-1 bg-border" />
            <div className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Droplets className="w-4 h-4" />
              <span className="font-medium">Donation Details</span>
              {currentStep > 2 && <Check className="w-4 h-4" />}
            </div>
            <div className="h-px flex-1 bg-border" />
            <div className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Save className="w-4 h-4" />
              <span className="font-medium">Review</span>
            </div>
          </div>
        </div>

        {/* Step 1: Donor Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Donor Information</span>
              </CardTitle>
              <CardDescription>
                Enter the donor's personal and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter donor's full name"
                    value={donorInfo.name}
                    onChange={(e) => handleDonorInfoChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={donorInfo.age}
                    onChange={(e) => handleDonorInfoChange("age", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={donorInfo.gender} onValueChange={(value) => handleDonorInfoChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Blood Type *</Label>
                  <Select value={donorInfo.bloodType} onValueChange={(value) => handleDonorInfoChange("bloodType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center space-x-2">
                            <Droplets className="w-4 h-4 text-red-500" />
                            <span>{type}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={donorInfo.phone}
                    onChange={(e) => handleDonorInfoChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={donorInfo.email}
                    onChange={(e) => handleDonorInfoChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address"
                  value={donorInfo.address}
                  onChange={(e) => handleDonorInfoChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Any relevant medical history, allergies, or conditions"
                  value={donorInfo.medicalHistory}
                  onChange={(e) => handleDonorInfoChange("medicalHistory", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Emergency contact name and phone"
                  value={donorInfo.emergencyContact}
                  onChange={(e) => handleDonorInfoChange("emergencyContact", e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setCurrentStep(2)}
                  disabled={!isStep1Valid}
                  className="px-6"
                >
                  Next Step
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Donation Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-primary" />
                <span>Donation Details</span>
              </CardTitle>
              <CardDescription>
                Enter blood donation and storage information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Donation Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !donationDetails.donationDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {donationDetails.donationDate ? format(donationDetails.donationDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={donationDetails.donationDate}
                        onSelect={(date) => handleDonationDetailsChange("donationDate", date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !donationDetails.expiryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {donationDetails.expiryDate ? format(donationDetails.expiryDate, "PPP") : <span>Pick expiry date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={donationDetails.expiryDate}
                        onSelect={(date) => handleDonationDetailsChange("expiryDate", date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="units">Blood Units (ml) *</Label>
                  <Input
                    id="units"
                    type="number"
                    placeholder="e.g., 450"
                    value={donationDetails.units}
                    onChange={(e) => handleDonationDetailsChange("units", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collectionCenter">Collection Center *</Label>
                  <Input
                    id="collectionCenter"
                    placeholder="e.g., Central Blood Bank"
                    value={donationDetails.collectionCenter}
                    onChange={(e) => handleDonationDetailsChange("collectionCenter", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Test Results</Label>
                  <Select value={donationDetails.testResults} onValueChange={(value) => handleDonationDetailsChange("testResults", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test results" />
                    </SelectTrigger>
                    <SelectContent>
                      {testResultOptions.map((result) => (
                        <SelectItem key={result} value={result}>
                          <div className="flex items-center space-x-2">
                            {result === "Negative" && <Check className="w-4 h-4 text-green-500" />}
                            {result.startsWith("Positive") && <X className="w-4 h-4 text-red-500" />}
                            {result === "Pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                            <span>{result}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storageLocation">Storage Location</Label>
                  <Input
                    id="storageLocation"
                    placeholder="e.g., Freezer A, Shelf 3"
                    value={donationDetails.storageLocation}
                    onChange={(e) => handleDonationDetailsChange("storageLocation", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special notes or observations"
                  value={donationDetails.notes}
                  onChange={(e) => handleDonationDetailsChange("notes", e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)}
                  disabled={!isStep2Valid}
                  className="px-6"
                >
                  Review
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Save className="w-5 h-5 text-primary" />
                  <span>Review Information</span>
                </CardTitle>
                <CardDescription>
                  Please review all information before adding to inventory
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donor Information Review */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Donor Information
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                        <p className="font-medium">{donorInfo.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Blood Type</Label>
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-4 h-4 text-red-500" />
                          <Badge variant="outline" className="font-bold">{donorInfo.bloodType}</Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                        <p className="font-medium">{donorInfo.age || "N/A"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                        <p className="font-medium">{donorInfo.gender || "N/A"}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                        <p className="font-medium">{donorInfo.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                        <p className="font-medium">{donorInfo.email || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donation Details Review */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    Donation Details
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Donation Date</Label>
                        <p className="font-medium">
                          {donationDetails.donationDate ? format(donationDetails.donationDate, "PPP") : "N/A"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Units (ml)</Label>
                        <p className="font-medium">{donationDetails.units}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Collection Center</Label>
                        <p className="font-medium">{donationDetails.collectionCenter}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Test Results</Label>
                        <div className="flex items-center space-x-2">
                          {donationDetails.testResults === "Negative" && <Check className="w-4 h-4 text-green-500" />}
                          {donationDetails.testResults?.startsWith("Positive") && <X className="w-4 h-4 text-red-500" />}
                          {donationDetails.testResults === "Pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                          <Badge 
                            variant={
                              donationDetails.testResults === "Negative" ? "success" :
                              donationDetails.testResults?.startsWith("Positive") ? "destructive" : "secondary"
                            }
                          >
                            {donationDetails.testResults || "N/A"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="px-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Adding to Inventory...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Inventory
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInventory;
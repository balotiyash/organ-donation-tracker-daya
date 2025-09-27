import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Heart, 
  MapPin, 
  Calendar,
  Clock,
  Activity,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  User,
  ArrowLeft,
  Droplets,
  Star,
  Award
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DonateNow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState("");
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    bloodType: "",
    
    // Medical Information
    weight: "",
    lastDonation: "",
    medications: "",
    medicalConditions: "",
    allergies: "",
    
    // Donation Preferences
    preferredDate: "",
    preferredTime: "",
    preferredLocation: "",
    specialRequests: "",
    
    // Agreements
    termsAccepted: false,
    medicalDisclosure: false,
    contactPermission: false,
    emergencyContact: ""
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const donationCenters = [
    { name: "City General Hospital", address: "123 Main St", distance: "2.1 km" },
    { name: "Metro Blood Bank", address: "456 Health Ave", distance: "3.5 km" },
    { name: "Community Medical Center", address: "789 Care Blvd", distance: "4.2 km" },
    { name: "Regional Blood Services", address: "321 Donor St", distance: "5.8 km" }
  ];

  const eligibilityChecks = [
    { id: 1, text: "I am between 18-65 years old", checked: false },
    { id: 2, text: "I weigh at least 50kg (110 lbs)", checked: false },
    { id: 3, text: "I have not donated blood in the last 8 weeks", checked: false },
    { id: 4, text: "I am in good health today", checked: false },
    { id: 5, text: "I have not had any cold/flu symptoms in the past week", checked: false }
  ];

  const [eligibility, setEligibility] = useState(eligibilityChecks);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEligibilityCheck = (id: number, checked: boolean) => {
    setEligibility(prev => 
      prev.map(item => item.id === id ? { ...item, checked } : item)
    );
  };

  const isEligible = eligibility.every(item => item.checked);

  const handleSubmit = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Process donation appointment
      console.log("Donation appointment scheduled:", formData);
      navigate("/donor/donation-complete/new");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-medical-primary">Choose Your Donation Type</h2>
              <p className="text-muted-foreground">Select the type of donation you'd like to make</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  donationType === 'blood' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setDonationType('blood')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Blood Donation</CardTitle>
                  <CardDescription>
                    Donate whole blood to help save lives in emergencies and surgeries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      Duration: 30-45 minutes
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-muted-foreground" />
                      Frequency: Every 8 weeks
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      Impact: Up to 3 lives saved
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  donationType === 'plasma' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setDonationType('plasma')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl">Plasma Donation</CardTitle>
                  <CardDescription>
                    Donate plasma to help treat immune disorders and burn victims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      Duration: 60-90 minutes
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-muted-foreground" />
                      Frequency: Every 4 weeks
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      Impact: Multiple treatments
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  donationType === 'platelets' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setDonationType('platelets')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Platelet Donation</CardTitle>
                  <CardDescription>
                    Donate platelets to help cancer patients and surgery recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      Duration: 90-120 minutes
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-muted-foreground" />
                      Frequency: Every 2 weeks
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      Impact: Critical care support
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  donationType === 'double-red' ? 'ring-2 ring-primary border-primary' : ''
                }`}
                onClick={() => setDonationType('double-red')}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Double Red Cells</CardTitle>
                  <CardDescription>
                    Donate concentrated red cells for trauma and surgical patients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      Duration: 45-60 minutes
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-muted-foreground" />
                      Frequency: Every 16 weeks
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                      Impact: Up to 6 lives saved
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleSubmit}
                disabled={!donationType}
                size="lg"
                className="px-8"
              >
                Continue with {donationType || "Selection"}
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-medical-primary">Eligibility Check</h2>
              <p className="text-muted-foreground">Please confirm you meet the basic eligibility requirements</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-medical-primary" />
                  Pre-Donation Eligibility
                </CardTitle>
                <CardDescription>
                  These quick checks ensure you're ready to donate safely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eligibility.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={`eligibility-${item.id}`}
                        checked={item.checked}
                        onCheckedChange={(checked) => handleEligibilityCheck(item.id, !!checked)}
                      />
                      <Label 
                        htmlFor={`eligibility-${item.id}`}
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        {item.text}
                      </Label>
                    </div>
                  ))}
                </div>

                {!isEligible && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-800">
                        Please complete all eligibility checks to continue
                      </span>
                    </div>
                  </div>
                )}

                {isEligible && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">
                        Great! You meet the basic eligibility requirements
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isEligible}
                size="lg"
                className="px-8"
              >
                Continue to Personal Info
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-medical-primary">Personal Information</h2>
              <p className="text-muted-foreground">We need some basic information to schedule your appointment</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-medical-primary" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-medical-primary" />
                    Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bloodType">Blood Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('bloodType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="Enter your weight"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastDonation">Last Donation Date</Label>
                    <Input
                      id="lastDonation"
                      type="date"
                      value={formData.lastDonation}
                      onChange={(e) => handleInputChange('lastDonation', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={formData.medications}
                      onChange={(e) => handleInputChange('medications', e.target.value)}
                      placeholder="List any medications you're currently taking"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.fullName || !formData.email || !formData.phone || !formData.bloodType}
                size="lg"
                className="px-8"
              >
                Continue to Scheduling
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-medical-primary">Schedule Your Appointment</h2>
              <p className="text-muted-foreground">Choose your preferred date, time, and location</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-medical-primary" />
                    Appointment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Any special accommodations needed?"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-medical-primary" />
                    Donation Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.preferredLocation} 
                    onValueChange={(value) => handleInputChange('preferredLocation', value)}
                  >
                    {donationCenters.map((center, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                        <RadioGroupItem value={center.name} id={`location-${index}`} />
                        <Label htmlFor={`location-${index}`} className="flex-1 cursor-pointer">
                          <div className="font-medium">{center.name}</div>
                          <div className="text-sm text-muted-foreground">{center.address}</div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {center.distance}
                          </Badge>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Consent and Agreements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', !!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the terms and conditions and understand the donation process
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="medical"
                    checked={formData.medicalDisclosure}
                    onCheckedChange={(checked) => handleInputChange('medicalDisclosure', !!checked)}
                  />
                  <Label htmlFor="medical" className="text-sm leading-relaxed cursor-pointer">
                    I consent to medical screening and authorize use of my information for donation purposes
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="contact"
                    checked={formData.contactPermission}
                    onCheckedChange={(checked) => handleInputChange('contactPermission', !!checked)}
                  />
                  <Label htmlFor="contact" className="text-sm leading-relaxed cursor-pointer">
                    I agree to be contacted for appointment confirmations and follow-ups
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.preferredDate || !formData.preferredTime || !formData.preferredLocation || 
                         !formData.termsAccepted || !formData.medicalDisclosure || !formData.contactPermission}
                size="lg"
                className="px-8 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                Schedule Donation
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-medical-light">
      {/* Header */}
      <div className="bg-white border-b border-medical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/donor" className="flex items-center text-medical-primary hover:text-primary">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum <= step 
                        ? 'bg-medical-primary text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNum < step ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    {stepNum < 4 && (
                      <div className={`w-12 h-1 mx-2 ${
                        stepNum < step ? 'bg-medical-primary' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default DonateNow;
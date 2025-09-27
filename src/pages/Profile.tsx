import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  Info,
  Award,
  CheckCircle,
  AlertTriangle,
  Eye,
  Brain,
  Zap,
  Activity,
  Users,
  FileText,
  Download,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import PledgeCertificate from "@/components/PledgeCertificate";
import DigitalCard from "@/components/DigitalCard";

const Profile = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      bloodType: "",
      aadharNumber: "",
      email: "",
      phone: "",
      alternatePhone: "",
    },
    // Address Information
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    },
    // Emergency Contact
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: ""
    },
    // Organ Donation Preferences
    organDonation: {
      organs: {
        heart: false,
        liver: false,
        kidneys: false,
        lungs: false,
        pancreas: false,
        smallIntestine: false,
        corneas: false,
        skinTissue: false,
        boneTissue: false,
        heartValves: false,
        bloodVessels: false
      },
      donateAll: false,
      restrictions: "",
      medicalHistory: "",
      currentMedications: "",
      allergies: ""
    },
    // Legal Information
    legal: {
      witnessName: "",
      witnessPhone: "",
      witnessAddress: "",
      consentFamily: false,
      consentMedical: false,
      consentLegal: false,
      agreeTerms: false
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pledgeComplete, setPledgeComplete] = useState(false);
  const [pledgeId, setPledgeId] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [showDigitalCard, setShowDigitalCard] = useState(false);

  const totalSteps = 5;

  const organOptions = [
    { id: 'heart', label: 'Heart', icon: Heart, description: 'Can save 1 life', color: 'text-red-600' },
    { id: 'liver', label: 'Liver', icon: Zap, description: 'Can save 2-3 lives', color: 'text-orange-600' },
    { id: 'kidneys', label: 'Kidneys', icon: Activity, description: 'Can save 2 lives', color: 'text-blue-600' },
    { id: 'lungs', label: 'Lungs', icon: Activity, description: 'Can save 2 lives', color: 'text-green-600' },
    { id: 'pancreas', label: 'Pancreas', icon: Zap, description: 'Can help 1 person', color: 'text-purple-600' },
    { id: 'smallIntestine', label: 'Small Intestine', icon: Activity, description: 'Can help 1 person', color: 'text-indigo-600' },
    { id: 'corneas', label: 'Corneas', icon: Eye, description: 'Can restore sight to 2 people', color: 'text-cyan-600' },
    { id: 'skinTissue', label: 'Skin Tissue', icon: Shield, description: 'Can help burn victims', color: 'text-pink-600' },
    { id: 'boneTissue', label: 'Bone Tissue', icon: Shield, description: 'Can help in surgeries', color: 'text-amber-600' },
    { id: 'heartValves', label: 'Heart Valves', icon: Heart, description: 'Can help heart patients', color: 'text-red-500' },
    { id: 'bloodVessels', label: 'Blood Vessels', icon: Activity, description: 'Can help in surgeries', color: 'text-emerald-600' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleOrganToggle = (organId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      organDonation: {
        ...prev.organDonation,
        organs: {
          ...prev.organDonation.organs,
          [organId]: checked
        }
      }
    }));
  };

  const handleDonateAllToggle = (checked: boolean) => {
    const allOrgans: { [key: string]: boolean } = organOptions.reduce((acc, organ) => ({
      ...acc,
      [organ.id]: checked
    }), {} as { [key: string]: boolean });
    
    setFormData(prev => ({
      ...prev,
      organDonation: {
        ...prev.organDonation,
        donateAll: checked,
        organs: {
          heart: allOrgans.heart || false,
          liver: allOrgans.liver || false,
          kidneys: allOrgans.kidneys || false,
          lungs: allOrgans.lungs || false,
          pancreas: allOrgans.pancreas || false,
          smallIntestine: allOrgans.smallIntestine || false,
          corneas: allOrgans.corneas || false,
          skinTissue: allOrgans.skinTissue || false,
          boneTissue: allOrgans.boneTissue || false,
          heartValves: allOrgans.heartValves || false,
          bloodVessels: allOrgans.bloodVessels || false
        }
      }
    }));
  };

  const getSelectedOrgansCount = () => {
    return Object.values(formData.organDonation.organs).filter(Boolean).length;
  };

  const getPotentialLivesSaved = () => {
    const organImpact: { [key: string]: number } = {
      heart: 1, liver: 2, kidneys: 2, lungs: 2, pancreas: 1,
      smallIntestine: 1, corneas: 2, skinTissue: 3, boneTissue: 2,
      heartValves: 1, bloodVessels: 1
    };
    
    return Object.entries(formData.organDonation.organs)
      .filter(([, selected]) => selected)
      .reduce((total, [organ]) => total + (organImpact[organ] || 0), 0);
  };

  const getSelectedOrgansArray = () => {
    return Object.entries(formData.organDonation.organs)
      .filter(([, selected]) => selected)
      .map(([organ]) => {
        const organOption = organOptions.find(opt => opt.id === organ);
        return organOption?.label || organ;
      });
  };

  const handleDownloadCertificate = () => {
    console.log("Certificate download initiated");
  };

  const handleShareAchievement = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I pledged to be an organ donor!',
          text: `I've pledged to donate ${getSelectedOrgansCount()} organs/tissues to save lives! Every pledge matters. 🫀❤️`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(
        `I've pledged to donate ${getSelectedOrgansCount()} organs/tissues to save lives! Every pledge matters. 🫀❤️`
      );
      alert('Pledge shared to clipboard!');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      const newPledgeId = `ODP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      setPledgeId(newPledgeId);
      setPledgeComplete(true);
      setIsSubmitting(false);
    }, 3000);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.personalInfo.fullName && formData.personalInfo.dateOfBirth && 
               formData.personalInfo.email && formData.personalInfo.phone;
      case 2:
        return formData.address.street && formData.address.city && formData.address.state;
      case 3:
        return formData.emergencyContact.name && formData.emergencyContact.phone;
      case 4:
        return getSelectedOrgansCount() > 0;
      case 5:
        return formData.legal.consentFamily && formData.legal.consentMedical && 
               formData.legal.consentLegal && formData.legal.agreeTerms;
      default:
        return false;
    }
  };

  // Mock donation completion data
  const donationData = {
    donorName: formData.personalInfo.fullName || "John Smith",
    pledgeId: pledgeId,
    donationDate: new Date(),
  };

  // Show Certificate View
  if (pledgeComplete && showCertificate) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <Heart className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">UBlood</span>
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">Pledge Certificate</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowCertificate(false)}
              >
                Back to Summary
              </Button>
            </div>
          </div>
        </header>
        <div className="py-8">
          <PledgeCertificate
            donorName={donationData.donorName}
            pledgeId={donationData.pledgeId}
            pledgeDate={donationData.donationDate}
            organCount={getSelectedOrgansCount()}
            selectedOrgans={getSelectedOrgansArray()}
            potentialLivesSaved={getPotentialLivesSaved()}
            onDownload={handleDownloadCertificate}
          />
        </div>
      </div>
    );
  }

  // Show Digital Card View
  if (pledgeComplete && showDigitalCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <DigitalCard
          donorName={donationData.donorName}
          pledgeId={donationData.pledgeId}
          pledgeDate={donationData.donationDate}
          organCount={getSelectedOrgansCount()}
          selectedOrgans={getSelectedOrgansArray()}
          contactInfo={{
            phone: formData.personalInfo.phone,
            email: formData.personalInfo.email,
            address: `${formData.address.city}, ${formData.address.state}`
          }}
          emergencyContact={{
            name: `${formData.emergencyContact.name} (${formData.emergencyContact.relationship})`,
            phone: formData.emergencyContact.phone
          }}
          onClose={() => setShowDigitalCard(false)}
        />
      </div>
    );
  }

  if (pledgeComplete) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <Heart className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">UBlood</span>
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">Organ Donation Pledge</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-lg">
            <CardContent className="text-center py-16">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-green-100 rounded-full">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-green-800 mb-4">
                Pledge Completed Successfully! 🎉
              </h1>
              
              <p className="text-xl text-green-700 mb-8">
                Thank you for your generous decision to become an organ donor. Your pledge could save up to{' '}
                <span className="font-bold text-2xl">{getPotentialLivesSaved()} lives</span>!
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 border-primary/20">
                  <div className="text-center">
                    <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">Pledge ID</h3>
                    <p className="font-mono text-muted-foreground font-bold">{pledgeId}</p>
                  </div>
                </Card>
                
                <Card className="p-6 border-primary/20">
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-red-600 mx-auto mb-3 fill-current" />
                    <h3 className="font-bold text-lg mb-2">Organs Pledged</h3>
                    <p className="text-muted-foreground font-bold">{getSelectedOrgansCount()} organs/tissues</p>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => setShowCertificate(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Pledge Certificate
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setShowDigitalCard(true)}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    View Digital Card
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleShareAchievement}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Your Pledge
                  </Button>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Please inform your family members about your decision. 
                    We recommend downloading your pledge certificate and keeping it with your important documents.
                    You can update or modify your pledge anytime by logging into your account.
                  </AlertDescription>
                </Alert>

                <div className="pt-6">
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Organ Donation Pledge</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="flex gap-1">
                {[...Array(totalSteps)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full ${
                      i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Card className="mb-6">
          <CardContent className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Heart className="h-10 w-10 text-red-600 fill-current" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Organ Donation Pledge
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Make the gift of life - pledge to donate your organs and save precious lives
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-1" />
                1 donor can save 8 lives
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Eye className="h-4 w-4 mr-1" />
                Restore sight to others
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <><User className="h-5 w-5" /> Personal Information</>}
              {currentStep === 2 && <><MapPin className="h-5 w-5" /> Address Details</>}
              {currentStep === 3 && <><Phone className="h-5 w-5" /> Emergency Contact</>}
              {currentStep === 4 && <><Heart className="h-5 w-5" /> Organ Selection</>}
              {currentStep === 5 && <><FileText className="h-5 w-5" /> Legal Consent</>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.personalInfo.gender}
                      onValueChange={(value) => handleInputChange('personalInfo', 'gender', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={formData.personalInfo.bloodType}
                      onValueChange={(value) => handleInputChange('personalInfo', 'bloodType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      value={formData.personalInfo.aadharNumber}
                      onChange={(e) => handleInputChange('personalInfo', 'aadharNumber', e.target.value)}
                      placeholder="Enter Aadhar number"
                      maxLength={12}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altPhone">Alternate Phone</Label>
                    <Input
                      id="altPhone"
                      type="tel"
                      value={formData.personalInfo.alternatePhone}
                      onChange={(e) => handleInputChange('personalInfo', 'alternatePhone', e.target.value)}
                      placeholder="Alternate phone number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Textarea
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.address.pincode}
                        onChange={(e) => handleInputChange('address', 'pincode', e.target.value)}
                        placeholder="Enter pincode"
                        maxLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.address.country}
                        onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                        placeholder="Enter country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Please provide details of a close family member or friend who can be contacted in case of medical emergency.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                      placeholder="Contact person's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select
                      value={formData.emergencyContact.relationship}
                      onValueChange={(value) => handleInputChange('emergencyContact', 'relationship', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                      placeholder="Contact phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.emergencyContact.email}
                      onChange={(e) => handleInputChange('emergencyContact', 'email', e.target.value)}
                      placeholder="Contact email address"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="contactAddress">Address</Label>
                    <Textarea
                      id="contactAddress"
                      value={formData.emergencyContact.address}
                      onChange={(e) => handleInputChange('emergencyContact', 'address', e.target.value)}
                      placeholder="Contact person's address"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Organ Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    Select the organs and tissues you would like to donate. Each donation can make a significant difference in multiple lives.
                  </AlertDescription>
                </Alert>

                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="donateAll"
                      checked={formData.organDonation.donateAll}
                      onCheckedChange={handleDonateAllToggle}
                    />
                    <Label htmlFor="donateAll" className="text-lg font-semibold">
                      Donate all organs and tissues
                    </Label>
                  </div>
                </Card>

                <Separator />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {organOptions.map((organ) => {
                    const Icon = organ.icon;
                    return (
                      <Card 
                        key={organ.id} 
                        className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          formData.organDonation.organs[organ.id as keyof typeof formData.organDonation.organs] 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleOrganToggle(
                          organ.id, 
                          !formData.organDonation.organs[organ.id as keyof typeof formData.organDonation.organs]
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={formData.organDonation.organs[organ.id as keyof typeof formData.organDonation.organs]}
                            onCheckedChange={(checked) => handleOrganToggle(organ.id, !!checked)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className={`h-5 w-5 ${organ.color}`} />
                              <h4 className="font-semibold">{organ.label}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{organ.description}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {getSelectedOrgansCount() > 0 && (
                  <Card className="p-6 border-primary/20 bg-primary/5">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        Your Potential Impact
                      </h3>
                      <p className="text-lg text-muted-foreground mb-4">
                        With your generous donation, you could potentially save or help
                      </p>
                      <div className="text-6xl font-black text-primary mb-2">
                        {getPotentialLivesSaved()}
                      </div>
                      <p className="text-xl font-semibold text-primary">
                        precious lives
                      </p>
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restrictions">Medical Restrictions or Conditions</Label>
                    <Textarea
                      id="restrictions"
                      value={formData.organDonation.restrictions}
                      onChange={(e) => handleInputChange('organDonation', 'restrictions', e.target.value)}
                      placeholder="Any medical conditions or restrictions we should know about"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Significant Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={formData.organDonation.medicalHistory}
                      onChange={(e) => handleInputChange('organDonation', 'medicalHistory', e.target.value)}
                      placeholder="Major surgeries, chronic conditions, etc."
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        value={formData.organDonation.currentMedications}
                        onChange={(e) => handleInputChange('organDonation', 'currentMedications', e.target.value)}
                        placeholder="List current medications"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Known Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={formData.organDonation.allergies}
                        onChange={(e) => handleInputChange('organDonation', 'allergies', e.target.value)}
                        placeholder="List any known allergies"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Legal Consent */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Please read and agree to the following legal requirements to complete your organ donation pledge.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="witnessName">Witness Name</Label>
                    <Input
                      id="witnessName"
                      value={formData.legal.witnessName}
                      onChange={(e) => handleInputChange('legal', 'witnessName', e.target.value)}
                      placeholder="Name of witness (optional)"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="witnessPhone">Witness Phone</Label>
                      <Input
                        id="witnessPhone"
                        type="tel"
                        value={formData.legal.witnessPhone}
                        onChange={(e) => handleInputChange('legal', 'witnessPhone', e.target.value)}
                        placeholder="Witness phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="witnessAddress">Witness Address</Label>
                      <Input
                        id="witnessAddress"
                        value={formData.legal.witnessAddress}
                        onChange={(e) => handleInputChange('legal', 'witnessAddress', e.target.value)}
                        placeholder="Witness address"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Legal Consent & Agreement</h3>
                    
                    <div className="space-y-4">
                      <Card className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentFamily"
                            checked={formData.legal.consentFamily}
                            onCheckedChange={(checked) => handleInputChange('legal', 'consentFamily', !!checked)}
                          />
                          <Label htmlFor="consentFamily" className="text-sm leading-relaxed">
                            I have discussed my decision with my family members and they are aware of my organ donation pledge. I understand that family consent may be required at the time of donation.
                          </Label>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentMedical"
                            checked={formData.legal.consentMedical}
                            onCheckedChange={(checked) => handleInputChange('legal', 'consentMedical', !!checked)}
                          />
                          <Label htmlFor="consentMedical" className="text-sm leading-relaxed">
                            I consent to medical examinations and procedures necessary to determine the suitability of my organs for transplantation. I understand that medical professionals will make the final determination.
                          </Label>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentLegal"
                            checked={formData.legal.consentLegal}
                            onCheckedChange={(checked) => handleInputChange('legal', 'consentLegal', !!checked)}
                          />
                          <Label htmlFor="consentLegal" className="text-sm leading-relaxed">
                            I understand that this pledge is a legal document and my organs will be allocated according to medical need and compatibility. I can revoke this pledge at any time while I am alive.
                          </Label>
                        </div>
                      </Card>

                      <Card className="p-4 border-primary/20 bg-primary/5">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.legal.agreeTerms}
                            onCheckedChange={(checked) => handleInputChange('legal', 'agreeTerms', !!checked)}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm leading-relaxed font-semibold">
                            I voluntarily agree to donate my organs as specified above. I understand the terms and conditions, and I confirm that this decision is made freely without any coercion.
                          </Label>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> This pledge serves as your consent for organ donation. Please ensure all information is accurate. You can modify or revoke this pledge at any time through your account.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Pledge...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2 fill-current" />
                      Complete Pledge
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                  disabled={!canProceedToNext()}
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

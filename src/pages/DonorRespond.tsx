import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  Activity,
  Car,
  User,
  Mail,
  Shield
} from "lucide-react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const DonorRespond = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    responseType: "immediate",
    availableTime: "",
    transportMethod: "own",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: ""
    },
    healthDeclaration: {
      recentIllness: false,
      medication: false,
      lastDonation: "",
      weight: "",
      bloodPressure: "normal"
    },
    additionalNotes: "",
    consentTerms: false,
    consentData: false,
    consentEmergency: false
  });
  
  // Mock alert data
  const alert = {
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
    address: "123 Medical Center Drive, Springfield, IL 62701",
    contact: {
      phone: "+1 (555) 123-4567",
      emergencyLine: "+1 (555) 911-BLOOD"
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [donationStatus, setDonationStatus] = useState<'pending' | 'confirmed' | 'completed'>('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setDonationStatus('confirmed');
      
      // Simulate donation process completion after some time
      setTimeout(() => {
        setDonationStatus('completed');
      }, 5000);
    }, 2000);
  };

  const handleMarkComplete = () => {
    navigate(`/donor/donation-complete/${alert.id}`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "accent";
      default: return "secondary";
    }
  };

  if (submitted) {
    if (donationStatus === 'completed') {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Donation Completed! 🎉</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your life-saving donation! Your contribution can help save up to 3 lives.
              </p>
              <div className="space-y-4">
                <Button onClick={handleMarkComplete} className="w-full">
                  <Heart className="h-4 w-4 mr-2 fill-current" />
                  View Certificate & Summary
                </Button>
                <Link to="/donor-dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Response Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for responding to this emergency alert. The hospital has been notified and will contact you shortly.
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm font-medium">What happens next:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Hospital will confirm your availability</p>
                <p>• You'll receive donation appointment details</p>
                <p>• SMS/Call with final instructions</p>
              </div>
            </div>
            
            {donationStatus === 'confirmed' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-2">
                  🏥 Hospital Confirmed!
                </p>
                <p className="text-sm text-blue-700">
                  Please proceed to {alert.hospital} for your donation. 
                  Simulating donation completion...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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
              <Link to="/donor-dashboard" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Donor</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/donor/alerts" className="text-muted-foreground hover:text-foreground">
                Alerts
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Respond</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to={`/donor/view-details/${alert.id}`}>
                <Button variant="outline">
                  View Details
                </Button>
              </Link>
              <Link to="/donor/alerts">
                <Button variant="outline">
                  Back to Alerts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Summary */}
        <Card className={`mb-8 ${alert.urgency === 'Critical' ? 'border-destructive/50 shadow-lg' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Respond to Emergency Alert</h1>
                <Badge variant={getUrgencyColor(alert.urgency) as any} className="flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {alert.urgency}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{alert.bloodType}</div>
                <p className="text-sm text-muted-foreground">Required</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{alert.hospital} ({alert.distance})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-sm">Deadline: {alert.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm">{alert.unitsNeeded} units needed</span>
              </div>
            </div>
            <p className="text-muted-foreground">{alert.description}</p>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Response Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Response Type
              </CardTitle>
              <CardDescription>
                How quickly can you respond to this emergency?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={formData.responseType} 
                onValueChange={(value) => setFormData({...formData, responseType: value})}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                  <RadioGroupItem value="immediate" id="immediate" />
                  <Label htmlFor="immediate" className="flex-1">
                    <div className="font-medium">Immediate Response</div>
                    <div className="text-sm text-muted-foreground">
                      I can come to the hospital right now (within 30 minutes)
                    </div>
                  </Label>
                  <Badge variant="destructive">Urgent</Badge>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="flex-1">
                    <div className="font-medium">Scheduled Response</div>
                    <div className="text-sm text-muted-foreground">
                      I can come at a specific time within the deadline
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                  <RadioGroupItem value="standby" id="standby" />
                  <Label htmlFor="standby" className="flex-1">
                    <div className="font-medium">Standby</div>
                    <div className="text-sm text-muted-foreground">
                      Keep me as backup if other donors are not available
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              {formData.responseType === "scheduled" && (
                <div className="mt-4">
                  <Label htmlFor="availableTime">When can you arrive?</Label>
                  <Input
                    id="availableTime"
                    type="datetime-local"
                    value={formData.availableTime}
                    onChange={(e) => setFormData({...formData, availableTime: e.target.value})}
                    className="mt-2"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transportation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-accent" />
                Transportation
              </CardTitle>
              <CardDescription>
                How will you get to the hospital?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.transportMethod} onValueChange={(value) => setFormData({...formData, transportMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transportation method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="own">Own Vehicle</SelectItem>
                  <SelectItem value="rideshare">Rideshare/Taxi</SelectItem>
                  <SelectItem value="public">Public Transportation</SelectItem>
                  <SelectItem value="friend">Friend/Family</SelectItem>
                  <SelectItem value="need-help">Need Transportation Assistance</SelectItem>
                </SelectContent>
              </Select>
              
              {formData.transportMethod === "need-help" && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    The hospital will arrange transportation assistance. You'll be contacted shortly with details.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-warning" />
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Someone to contact during your donation (optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.emergencyContact.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyContact: {...formData.emergencyContact, name: e.target.value}
                    })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergencyContact: {...formData.emergencyContact, phone: e.target.value}
                    })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contactRelationship">Relationship</Label>
                <Select value={formData.emergencyContact.relationship} onValueChange={(value) => setFormData({
                  ...formData,
                  emergencyContact: {...formData.emergencyContact, relationship: value}
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse/Partner</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Health Declaration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Health Declaration
              </CardTitle>
              <CardDescription>
                Quick health check to ensure safe donation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Current Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.healthDeclaration.weight}
                    onChange={(e) => setFormData({
                      ...formData,
                      healthDeclaration: {...formData.healthDeclaration, weight: e.target.value}
                    })}
                    placeholder="e.g., 150"
                    min="110"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum 110 lbs required</p>
                </div>
                <div>
                  <Label htmlFor="lastDonation">Last Blood Donation</Label>
                  <Input
                    id="lastDonation"
                    type="date"
                    value={formData.healthDeclaration.lastDonation}
                    onChange={(e) => setFormData({
                      ...formData,
                      healthDeclaration: {...formData.healthDeclaration, lastDonation: e.target.value}
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Must be 8+ weeks ago</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure Status</Label>
                <Select value={formData.healthDeclaration.bloodPressure} onValueChange={(value) => setFormData({
                  ...formData,
                  healthDeclaration: {...formData.healthDeclaration, bloodPressure: value}
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood pressure status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high-controlled">High (Controlled with medication)</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="unknown">Unknown/Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="recentIllness"
                    checked={formData.healthDeclaration.recentIllness}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      healthDeclaration: {...formData.healthDeclaration, recentIllness: !!checked}
                    })}
                  />
                  <Label htmlFor="recentIllness" className="text-sm">
                    I have been sick or had fever in the last 2 weeks
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="medication"
                    checked={formData.healthDeclaration.medication}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      healthDeclaration: {...formData.healthDeclaration, medication: !!checked}
                    })}
                  />
                  <Label htmlFor="medication" className="text-sm">
                    I am currently taking blood thinners or antibiotics
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Any special requirements or notes for the hospital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                placeholder="E.g., dietary restrictions, accessibility needs, preferred arm for donation, etc."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardHeader>
              <CardTitle>Consent & Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consentTerms"
                  checked={formData.consentTerms}
                  onCheckedChange={(checked) => setFormData({...formData, consentTerms: !!checked})}
                />
                <Label htmlFor="consentTerms" className="text-sm leading-relaxed">
                  I confirm that the information provided is accurate and I meet the basic donor requirements. I understand that final eligibility will be determined at the donation center.
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consentData"
                  checked={formData.consentData}
                  onCheckedChange={(checked) => setFormData({...formData, consentData: !!checked})}
                />
                <Label htmlFor="consentData" className="text-sm leading-relaxed">
                  I consent to sharing my contact information with the hospital for this emergency donation coordination.
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consentEmergency"
                  checked={formData.consentEmergency}
                  onCheckedChange={(checked) => setFormData({...formData, consentEmergency: !!checked})}
                />
                <Label htmlFor="consentEmergency" className="text-sm leading-relaxed">
                  I understand this is an emergency situation and agree to be contacted immediately by the hospital via phone or SMS.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Emergency Response - Hospital will contact you within 15 minutes</span>
                </div>
                <div className="flex gap-3">
                  <Link to="/donor/alerts">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!formData.consentTerms || !formData.consentData || !formData.consentEmergency || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        Submitting Response...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Submit Emergency Response
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default DonorRespond;
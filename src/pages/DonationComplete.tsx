import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Certificate from "@/components/Certificate";
import {
  Heart,
  CheckCircle,
  Award,
  Download,
  Share2,
  ArrowLeft,
  Star,
  Trophy,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

const DonationComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCertificate, setShowCertificate] = useState(false);
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);

  // Mock donation completion data
  const donationData = {
    id: 1,
    donorName: "John Smith",
    bloodType: "O-",
    hospital: "City General Hospital",
    donationDate: new Date(),
    completedAt: "2024-03-20 14:30:00",
    certificateId: "CERT-2024-BD-001234",
    unitsCollected: 1,
    nextEligibleDate: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000), // 56 days later
    pointsEarned: 100,
    badgeEarned: "Life Saver",
    alert: {
      urgency: "Critical",
      description: "Emergency surgery required. Patient in critical condition.",
    }
  };

  const handleDownloadCertificate = async () => {
    setIsGeneratingCertificate(true);
    try {
      // Generate PDF-friendly HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Blood Donation Certificate - ${donationData.donorName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              padding: 20px;
            }
            .certificate-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              box-shadow: 0 25px 60px rgba(0,0,0,0.2);
              overflow: hidden;
            }
            .certificate-header {
              background: linear-gradient(135deg, #1e40af 0%, #dc2626 100%);
              padding: 40px;
              text-align: center;
              color: white;
              position: relative;
            }
            .certificate-header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            }
            .icon-group {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin-bottom: 20px;
            }
            .icon-circle {
              width: 60px;
              height: 60px;
              background: rgba(255,255,255,0.2);
              border: 2px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
            }
            .certificate-title {
              font-size: 2.5rem;
              font-weight: 800;
              margin-bottom: 10px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .certificate-subtitle {
              font-size: 1.2rem;
              opacity: 0.9;
              font-weight: 300;
            }
            .certificate-body {
              padding: 60px 40px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            }
            .donor-name {
              font-size: 3rem;
              font-weight: 900;
              color: #1e40af;
              text-align: center;
              margin: 20px 0;
              padding: 20px;
              border: 4px solid #1e40af;
              border-radius: 12px;
              background: white;
              box-shadow: 0 8px 20px rgba(30,64,175,0.2);
            }
            .main-text {
              text-align: center;
              font-size: 1.3rem;
              color: #374151;
              line-height: 1.8;
              margin: 30px 0;
            }
            .details-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
              margin: 40px 0;
            }
            .detail-card {
              background: white;
              padding: 25px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              border-left: 5px solid;
              text-align: center;
            }
            .blood-type { border-left-color: #dc2626; }
            .date { border-left-color: #2563eb; }
            .hospital { border-left-color: #059669; }
            .detail-label {
              color: #6b7280;
              font-size: 0.9rem;
              margin-bottom: 10px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .detail-value {
              color: #1f2937;
              font-size: 1.5rem;
              font-weight: 800;
            }
            .impact-section {
              background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
              padding: 30px;
              border-radius: 12px;
              text-align: center;
              margin: 30px 0;
              border: 2px solid #f59e0b;
            }
            .stars {
              display: flex;
              justify-content: center;
              gap: 5px;
              margin-bottom: 15px;
            }
            .star {
              color: #f59e0b;
              font-size: 1.5rem;
            }
            .impact-title {
              font-size: 1.8rem;
              font-weight: 800;
              color: #92400e;
              margin-bottom: 10px;
            }
            .impact-text {
              color: #78350f;
              font-size: 1.1rem;
              font-weight: 600;
            }
            .certificate-footer {
              background: white;
              padding: 40px;
              border-top: 3px solid #e5e7eb;
            }
            .signatures {
              display: flex;
              justify-content: space-between;
              align-items: end;
              margin-bottom: 40px;
            }
            .signature {
              text-align: center;
              flex: 1;
            }
            .signature-line {
              width: 200px;
              height: 2px;
              background: #374151;
              margin: 0 auto 15px;
            }
            .signature-title {
              font-size: 1rem;
              color: #374151;
              font-weight: 700;
              margin-bottom: 5px;
            }
            .signature-org {
              font-size: 0.9rem;
              color: #6b7280;
              font-weight: 500;
            }
            .org-logo {
              text-align: center;
              padding: 20px;
            }
            .org-icon {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #1e40af, #dc2626);
              border-radius: 50%;
              margin: 0 auto 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 2rem;
            }
            .org-name {
              font-size: 1.5rem;
              font-weight: 900;
              color: #1e40af;
              margin-bottom: 5px;
            }
            .org-tagline {
              font-size: 1rem;
              color: #6b7280;
              font-style: italic;
              font-weight: 500;
            }
            .certificate-id {
              text-align: center;
              padding-top: 20px;
              border-top: 2px solid #f3f4f6;
              margin-top: 20px;
            }
            .cert-id-text {
              font-size: 0.9rem;
              color: #9ca3af;
              line-height: 1.8;
              font-weight: 500;
            }
            @media print {
              body { background: white !important; padding: 0 !important; }
              .certificate-container { box-shadow: none !important; border-radius: 0 !important; }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="certificate-header">
              <div class="icon-group">
                <div class="icon-circle">❤️</div>
                <div class="icon-circle">🏆</div>
                <div class="icon-circle">🛡️</div>
              </div>
              <h1 class="certificate-title">CERTIFICATE OF BLOOD DONATION</h1>
              <p class="certificate-subtitle">In Recognition of Life-Saving Contribution</p>
            </div>

            <div class="certificate-body">
              <p style="text-align: center; font-size: 1.2rem; color: #6b7280; margin-bottom: 20px; font-weight: 500;">
                This is to certify that
              </p>
              
              <div class="donor-name">${donationData.donorName}</div>
              
              <p class="main-text">
                has generously donated blood as a voluntary blood donor, demonstrating exceptional 
                commitment to saving lives and supporting our community's health and well-being.
              </p>

              <div class="details-grid">
                <div class="detail-card blood-type">
                  <div class="detail-label">Blood Type</div>
                  <div class="detail-value">${donationData.bloodType}</div>
                </div>
                <div class="detail-card date">
                  <div class="detail-label">Donation Date</div>
                  <div class="detail-value">${new Date(donationData.donationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="detail-card hospital">
                  <div class="detail-label">Healthcare Facility</div>
                  <div class="detail-value">${donationData.hospital}</div>
                </div>
              </div>

              <div class="impact-section">
                <div class="stars">
                  <span class="star">⭐</span>
                  <span class="star">⭐</span>
                  <span class="star">⭐</span>
                  <span class="star">⭐</span>
                  <span class="star">⭐</span>
                </div>
                <div class="impact-title">Your donation can save up to 3 lives!</div>
                <p class="impact-text">
                  Thank you for being a hero in our community and making a difference in someone's life.
                </p>
              </div>
            </div>

            <div class="certificate-footer">
              <div class="signatures">
                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Medical Officer</div>
                  <div class="signature-org">${donationData.hospital}</div>
                </div>
                
                <div class="org-logo">
                  <div class="org-icon">❤️</div>
                  <div class="org-name">UBlood</div>
                  <div class="org-tagline">Blood Donation Network</div>
                </div>

                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Administrator</div>
                  <div class="signature-org">Blood Bank Services</div>
                </div>
              </div>
              
              <div class="certificate-id">
                <div class="cert-id-text">
                  Certificate ID: ${donationData.certificateId}<br>
                  Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br>
                  This certificate is electronically generated and valid without signature
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create a new window with the certificate content
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        alert('Please allow popups to download the certificate');
        return;
      }

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load then trigger print/save as PDF
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // User can choose "Save as PDF" in the print dialog
        }, 1000);
      };

      console.log("Certificate download initiated successfully");
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Error downloading certificate. Please try again.');
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const handleShareAchievement = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I just saved lives by donating blood!',
          text: `I completed a ${donationData.alert.urgency.toLowerCase()} blood donation at ${donationData.hospital}. Every donation can save up to 3 lives! 🩸❤️`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just saved lives by donating blood at ${donationData.hospital}! Every donation can save up to 3 lives! 🩸❤️`
      );
      alert('Achievement copied to clipboard!');
    }
  };

  if (showCertificate) {
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
                <span className="text-foreground font-medium">Certificate</span>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setShowCertificate(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Summary
              </Button>
            </div>
          </div>
        </header>

        <div className="py-8">
          <Certificate
            donorName={donationData.donorName}
            bloodType={donationData.bloodType}
            hospital={donationData.hospital}
            donationDate={donationData.donationDate}
            certificateId={donationData.certificateId}
            onDownload={handleDownloadCertificate}
          />
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
              <Link to="/donor-dashboard" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood Donor</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Donation Complete</span>
            </div>
            
            <Link to="/donor-dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Donation Complete! 🎉
            </h1>
            <p className="text-lg text-green-700 mb-4">
              Thank you for your life-saving donation, {donationData.donorName}!
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary" className="px-4 py-1">
                <Heart className="h-4 w-4 mr-1 fill-current" />
                Hero
              </Badge>
              <Badge className="px-4 py-1 bg-green-600">
                <Award className="h-4 w-4 mr-1" />
                {donationData.badgeEarned}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Donation Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600 fill-current" />
                Donation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-bold text-lg text-primary">{donationData.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Units Collected</p>
                  <p className="font-bold text-lg">{donationData.unitsCollected} unit</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Donation Date & Time</p>
                  <p className="font-bold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(donationData.completedAt).toLocaleDateString()} at{' '}
                    {new Date(donationData.completedAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Hospital</p>
                  <p className="font-bold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {donationData.hospital}
                  </p>
                </div>
              </div>

              <Alert>
                <Star className="h-4 w-4" />
                <AlertDescription>
                  <strong>Impact:</strong> Your donation can potentially save up to 3 lives and help multiple patients in need!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Achievement & Rewards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Achievement & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Badge Earned</span>
                  </div>
                  <Badge className="bg-yellow-600">{donationData.badgeEarned}</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Points Earned</span>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    +{donationData.pointsEarned} pts
                  </Badge>
                </div>
              </div>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Next eligible donation:</strong>{' '}
                  {donationData.nextEligibleDate.toLocaleDateString()}
                  <br />
                  <span className="text-sm text-muted-foreground">
                    (56 days from today - standard recovery period)
                  </span>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Donation Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Congratulations! You've earned an official blood donation certificate. 
              This certificate recognizes your contribution to saving lives and can be 
              used for volunteer hours, community service records, or personal achievement.
            </p>
            
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={() => setShowCertificate(true)}
                size="lg"
                className="flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
                View Certificate
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleDownloadCertificate}
                disabled={isGeneratingCertificate}
                size="lg"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isGeneratingCertificate ? "Preparing Download..." : "Direct Download PDF"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShareAchievement}
                size="lg"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Achievement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-2">Recovery Care</h4>
                <p className="text-sm text-muted-foreground">
                  Rest, hydrate, and follow post-donation care guidelines
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-2">Schedule Next</h4>
                <p className="text-sm text-muted-foreground">
                  Mark your calendar for your next eligible donation date
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Share2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-2">Inspire Others</h4>
                <p className="text-sm text-muted-foreground">
                  Share your experience and encourage friends to donate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationComplete;
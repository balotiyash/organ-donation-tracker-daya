import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Download,
  Award,
  Calendar,
  MapPin,
  User,
  Shield,
  Star,
  Printer
} from "lucide-react";
import { format } from "date-fns";

interface CertificateProps {
  donorName: string;
  bloodType: string;
  hospital: string;
  donationDate: Date;
  certificateId: string;
  onDownload: () => void;
}

const Certificate = ({ donorName, bloodType, hospital, donationDate, certificateId, onDownload }: CertificateProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a new window with the certificate content
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      // Get the certificate HTML content
      const certificateContent = document.getElementById('certificate-content');
      if (!certificateContent) return;

      // Generate PDF-friendly HTML
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Blood Donation Certificate - ${donorName}</title>
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
              animation: shimmer 3s ease-in-out infinite;
            }
            @keyframes shimmer {
              0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.5; }
              50% { transform: rotate(180deg) scale(1.1); opacity: 0.8; }
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
              transition: transform 0.2s ease;
            }
            .detail-card:hover {
              transform: translateY(-2px);
            }
            .blood-type { border-left-color: #dc2626; }
            .date { border-left-color: #2563eb; }
            .hospital { border-left-color: #059669; }
            .detail-label {
              color: #6b7280;
              font-size: 0.9rem;
              margin-bottom: 5px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .detail-value {
              color: #1f2937;
              font-size: 1.3rem;
              font-weight: 700;
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
              font-size: 1.5rem;
              font-weight: 800;
              color: #92400e;
              margin-bottom: 10px;
            }
            .impact-text {
              color: #78350f;
              font-size: 1rem;
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
              margin: 0 auto 10px;
            }
            .signature-title {
              font-size: 0.9rem;
              color: #6b7280;
              font-weight: 600;
            }
            .signature-org {
              font-size: 0.8rem;
              color: #9ca3af;
            }
            .org-logo {
              text-align: center;
              padding: 20px;
            }
            .org-name {
              font-size: 1.2rem;
              font-weight: 800;
              color: #1e40af;
              margin-top: 10px;
            }
            .org-tagline {
              font-size: 0.9rem;
              color: #6b7280;
              font-style: italic;
            }
            .certificate-id {
              text-align: center;
              padding-top: 20px;
              border-top: 2px solid #f3f4f6;
              margin-top: 20px;
            }
            .cert-id-text {
              font-size: 0.8rem;
              color: #9ca3af;
              line-height: 1.6;
            }
            @media print {
              body { background: white !important; padding: 0 !important; }
              .certificate-container { box-shadow: none !important; border-radius: 0 !important; }
              .detail-card:hover { transform: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container" id="certificate-content">
            <div class="certificate-header">
              <div class="icon-group">
                <div class="icon-circle">❤️</div>
                <div class="icon-circle">🏆</div>
                <div class="icon-circle">🛡️</div>
              </div>
              <h1 class="certificate-title">Certificate of Blood Donation</h1>
              <p class="certificate-subtitle">In Recognition of Life-Saving Contribution</p>
            </div>

            <div class="certificate-body">
              <p style="text-align: center; font-size: 1.2rem; color: #6b7280; margin-bottom: 20px;">
                This is to certify that
              </p>
              
              <div class="donor-name">${donorName}</div>
              
              <p class="main-text">
                has generously donated blood as a voluntary blood donor, demonstrating exceptional 
                commitment to saving lives and supporting our community's health and well-being.
              </p>

              <div class="details-grid">
                <div class="detail-card blood-type">
                  <div class="detail-label">Blood Type</div>
                  <div class="detail-value">${bloodType}</div>
                </div>
                <div class="detail-card date">
                  <div class="detail-label">Donation Date</div>
                  <div class="detail-value">${format(donationDate, 'MMMM dd, yyyy')}</div>
                </div>
                <div class="detail-card hospital">
                  <div class="detail-label">Healthcare Facility</div>
                  <div class="detail-value">${hospital}</div>
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
                  <div class="signature-org">${hospital}</div>
                </div>
                
                <div class="org-logo">
                  <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #1e40af, #dc2626); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">❤️</div>
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
                  Certificate ID: ${certificateId}<br>
                  Generated on ${format(new Date(), 'MMMM dd, yyyy')}<br>
                  This certificate is electronically generated and valid without signature
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load then trigger print/save as PDF
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // The user can choose "Save as PDF" in the print dialog
        }, 500);
      };

      // Call the original onDownload callback
      onDownload();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Certificate Preview */}
      <div 
        id="certificate-content" 
        className="bg-white border-2 border-blue-200 rounded-2xl shadow-2xl overflow-hidden mb-8"
      >
        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Heart className="h-10 w-10 text-white fill-current" />
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              CERTIFICATE OF BLOOD DONATION
            </h1>
            <div className="flex justify-center gap-3 mb-4">
              <Badge variant="secondary" className="px-6 py-2 text-sm font-bold bg-white/20 text-white border-white/30">
                LIFE SAVER
              </Badge>
              <Badge variant="secondary" className="px-6 py-2 text-sm font-bold bg-white/20 text-white border-white/30">
                HERO
              </Badge>
            </div>
            <p className="text-xl text-white/90 font-medium">
              In Recognition of Life-Saving Contribution
            </p>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-16 bg-gradient-to-br from-white via-slate-50 to-blue-50">
          {/* Main Content */}
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <p className="text-xl text-slate-600 font-medium">This is to certify that</p>
              <div className="relative">
                <h2 className="text-6xl font-black text-blue-700 py-6 px-8 bg-white rounded-2xl shadow-lg border-4 border-blue-200 inline-block">
                  {donorName}
                </h2>
              </div>
            </div>
            
            <p className="text-2xl text-slate-700 leading-relaxed max-w-4xl mx-auto font-medium">
              has generously donated blood as a voluntary blood donor, demonstrating exceptional commitment 
              to saving lives and supporting our community's health and well-being.
            </p>

            {/* Donation Details */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="p-8 border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-red-200 rounded-full inline-block">
                    <Heart className="h-8 w-8 text-red-700 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">Blood Type</p>
                    <p className="font-black text-3xl text-red-800">{bloodType}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-blue-200 rounded-full inline-block">
                    <Calendar className="h-8 w-8 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">Donation Date</p>
                    <p className="font-black text-2xl text-blue-800">{format(donationDate, 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 md:col-span-3">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-200 rounded-full inline-block">
                    <MapPin className="h-8 w-8 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-bold uppercase tracking-wider">Healthcare Facility</p>
                    <p className="font-black text-2xl text-green-800">{hospital}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Impact Statement */}
            <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-orange-100 p-10 rounded-2xl border-2 border-yellow-300 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-yellow-800 font-black text-3xl mb-4">
                Your donation can save up to 3 lives!
              </p>
              <p className="text-yellow-700 text-lg font-semibold">
                Thank you for being a hero in our community and making a difference in someone's life.
              </p>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t-4 border-slate-200 pt-12 mt-16">
            <div className="flex justify-between items-end mb-8">
              <div className="text-center flex-1">
                <div className="w-64 h-1 bg-slate-400 mx-auto mb-4"></div>
                <p className="text-slate-600 font-bold text-lg">Medical Officer</p>
                <p className="text-slate-500 text-sm">{hospital}</p>
              </div>
              
              <div className="text-center flex-1">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-red-600 rounded-full inline-block mb-4">
                  <Heart className="h-12 w-12 text-white fill-current" />
                </div>
                <p className="text-2xl font-black text-blue-700">UBlood</p>
                <p className="text-slate-600 text-sm font-medium italic">Blood Donation Network</p>
              </div>

              <div className="text-center flex-1">
                <div className="w-64 h-1 bg-slate-400 mx-auto mb-4"></div>
                <p className="text-slate-600 font-bold text-lg">Administrator</p>
                <p className="text-slate-500 text-sm">Blood Bank Services</p>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t-2 border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                Certificate ID: <span className="font-mono font-bold">{certificateId}</span> | 
                Generated on {format(new Date(), 'MMMM dd, yyyy')} <br />
                This certificate is electronically generated and valid without signature
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 print:hidden">
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          size="lg"
          className="flex items-center gap-3 px-8 py-4 text-lg border-2"
        >
          <Printer className="h-5 w-5" />
          Print Certificate
        </Button>
        <Button 
          onClick={handleDownloadPDF} 
          size="lg"
          className="flex items-center gap-3 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
        >
          <Download className="h-5 w-5" />
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
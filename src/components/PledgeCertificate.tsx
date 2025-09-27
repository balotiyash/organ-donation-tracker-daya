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
  Printer,
  Eye,
  Brain,
  Activity,
  FileText
} from "lucide-react";
import { format } from "date-fns";

interface PledgeCertificateProps {
  donorName: string;
  pledgeId: string;
  pledgeDate: Date;
  organCount: number;
  selectedOrgans: string[];
  potentialLivesSaved: number;
  onDownload: () => void;
}

const PledgeCertificate = ({ 
  donorName, 
  pledgeId, 
  pledgeDate, 
  organCount, 
  selectedOrgans, 
  potentialLivesSaved, 
  onDownload 
}: PledgeCertificateProps) => {
  
  const handleDownloadPDF = async () => {
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Organ Donation Pledge Certificate - ${donorName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              min-height: 100vh;
              padding: 20px;
            }
            .certificate-container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              box-shadow: 0 25px 60px rgba(0,0,0,0.1);
              overflow: hidden;
              border: 3px solid #0ea5e9;
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
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
              opacity: 0.3;
            }
            .icon-group {
              display: flex;
              justify-content: center;
              gap: 25px;
              margin-bottom: 30px;
              position: relative;
              z-index: 1;
            }
            .icon-circle {
              width: 80px;
              height: 80px;
              background: rgba(255,255,255,0.15);
              border: 3px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(10px);
              font-size: 2rem;
            }
            .certificate-title {
              font-size: 3rem;
              font-weight: 900;
              margin-bottom: 15px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
              position: relative;
              z-index: 1;
            }
            .certificate-subtitle {
              font-size: 1.4rem;
              opacity: 0.95;
              font-weight: 400;
              position: relative;
              z-index: 1;
            }
            .certificate-body {
              padding: 60px 40px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            }
            .pledge-statement {
              text-align: center;
              font-size: 1.5rem;
              color: #1e293b;
              margin-bottom: 40px;
              line-height: 1.8;
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
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .pledge-details {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 30px;
              margin: 50px 0;
            }
            .detail-card {
              background: white;
              padding: 30px;
              border-radius: 16px;
              box-shadow: 0 8px 20px rgba(0,0,0,0.08);
              border-left: 6px solid;
              text-align: center;
              transition: transform 0.2s ease;
            }
            .detail-card:hover {
              transform: translateY(-3px);
            }
            .pledge-id { border-left-color: #dc2626; }
            .pledge-date { border-left-color: #2563eb; }
            .organ-count { border-left-color: #059669; }
            .lives-impact { border-left-color: #f59e0b; }
            .detail-icon {
              width: 60px;
              height: 60px;
              margin: 0 auto 20px;
              background: linear-gradient(135deg, var(--icon-bg-1), var(--icon-bg-2));
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 1.8rem;
            }
            .pledge-id .detail-icon { --icon-bg-1: #dc2626; --icon-bg-2: #b91c1c; }
            .pledge-date .detail-icon { --icon-bg-1: #2563eb; --icon-bg-2: #1d4ed8; }
            .organ-count .detail-icon { --icon-bg-1: #059669; --icon-bg-2: #047857; }
            .lives-impact .detail-icon { --icon-bg-1: #f59e0b; --icon-bg-2: #d97706; }
            .detail-label {
              color: #64748b;
              font-size: 1rem;
              margin-bottom: 10px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .detail-value {
              color: #1e293b;
              font-size: 1.8rem;
              font-weight: 800;
              margin-bottom: 8px;
            }
            .detail-description {
              color: #64748b;
              font-size: 0.9rem;
              font-weight: 500;
            }
            .organs-list {
              background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
              padding: 40px;
              border-radius: 16px;
              margin: 40px 0;
              border: 2px solid #f59e0b;
            }
            .organs-title {
              text-align: center;
              font-size: 1.8rem;
              font-weight: 800;
              color: #92400e;
              margin-bottom: 25px;
            }
            .organs-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 15px;
            }
            .organ-item {
              background: white;
              padding: 15px 20px;
              border-radius: 10px;
              text-align: center;
              font-weight: 600;
              color: #92400e;
              box-shadow: 0 4px 10px rgba(245,158,11,0.2);
            }
            .commitment-section {
              background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
              padding: 30px;
              border-radius: 12px;
              text-align: center;
              margin: 30px 0;
              border: 2px solid #f59e0b;
            }
            .commitment-title {
              font-size: 1.5rem;
              font-weight: 800;
              color: #92400e;
              margin-bottom: 10px;
            }
            .commitment-text {
              color: #78350f;
              font-size: 1rem;
              font-weight: 600;
              line-height: 1.7;
            }
            .certificate-footer {
              background: white;
              padding: 50px;
              border-top: 4px solid #e2e8f0;
            }
            .signatures {
              display: flex;
              justify-content: space-between;
              align-items: end;
              margin-bottom: 50px;
            }
            .signature {
              text-align: center;
              flex: 1;
            }
            .signature-line {
              width: 250px;
              height: 3px;
              background: #64748b;
              margin: 0 auto 15px;
              border-radius: 2px;
            }
            .signature-title {
              font-size: 1.1rem;
              color: #1e293b;
              font-weight: 700;
              margin-bottom: 5px;
            }
            .signature-org {
              font-size: 1rem;
              color: #64748b;
              font-weight: 600;
            }
            .org-logo {
              text-align: center;
              padding: 25px;
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
              box-shadow: 0 8px 20px rgba(30,64,175,0.2);
            }
            .org-name {
              font-size: 1.5rem;
              font-weight: 800;
              color: #1e40af;
              margin-bottom: 5px;
            }
            .org-tagline {
              font-size: 1.1rem;
              color: #64748b;
              font-style: italic;
              font-weight: 600;
            }
            .certificate-id {
              text-align: center;
              padding-top: 30px;
              border-top: 3px solid #f1f5f9;
              margin-top: 30px;
            }
            .cert-id-text {
              font-size: 1rem;
              color: #94a3b8;
              line-height: 1.8;
              font-weight: 600;
            }
            .legal-text {
              margin-top: 20px;
              padding: 20px;
              background: #f8fafc;
              border-radius: 10px;
              font-size: 0.85rem;
              color: #64748b;
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
          <div class="certificate-container">
            <div class="certificate-header">
              <div class="icon-group">
                <div class="icon-circle">❤️</div>
                <div class="icon-circle">🫀</div>
                <div class="icon-circle">🤝</div>
              </div>
              <h1 class="certificate-title">ORGAN DONATION PLEDGE</h1>
              <p class="certificate-subtitle">Certificate of Commitment to Save Lives</p>
            </div>

            <div class="certificate-body">
              <div class="pledge-statement">
                This is to certify that
              </div>
              
              <div class="donor-name">${donorName}</div>
              
              <div class="pledge-statement">
                has voluntarily pledged to donate organs and tissues after death, 
                demonstrating extraordinary compassion and commitment to saving precious lives.
              </div>

              <div class="pledge-details">
                <div class="detail-card pledge-id">
                  <div class="detail-icon">📋</div>
                  <div class="detail-label">Pledge ID</div>
                  <div class="detail-value">${pledgeId}</div>
                  <div class="detail-description">Unique Certificate Number</div>
                </div>
                
                <div class="detail-card pledge-date">
                  <div class="detail-icon">📅</div>
                  <div class="detail-label">Pledge Date</div>
                  <div class="detail-value">${format(pledgeDate, 'MMM dd, yyyy')}</div>
                  <div class="detail-description">Date of Commitment</div>
                </div>
                
                <div class="detail-card organ-count">
                  <div class="detail-icon">🫀</div>
                  <div class="detail-label">Organs Pledged</div>
                  <div class="detail-value">${organCount}</div>
                  <div class="detail-description">Organs & Tissues</div>
                </div>
                
                <div class="detail-card lives-impact">
                  <div class="detail-icon">⭐</div>
                  <div class="detail-label">Potential Impact</div>
                  <div class="detail-value">${potentialLivesSaved}</div>
                  <div class="detail-description">Lives Could Be Saved</div>
                </div>
              </div>

              <div class="organs-list">
                <div class="organs-title">Pledged Organs & Tissues</div>
                <div class="organs-grid">
                  ${selectedOrgans.map(organ => `<div class="organ-item">${organ}</div>`).join('')}
                </div>
              </div>

              <div class="commitment-section">
                <div class="commitment-title">The Gift of Life</div>
                <div class="commitment-text">
                  Through this pledge, you have chosen to give the ultimate gift - the gift of life itself. 
                  Your decision represents hope for families waiting for transplants and demonstrates 
                  the highest form of human generosity and compassion.
                </div>
              </div>
            </div>

            <div class="certificate-footer">
              <div class="signatures">
                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Medical Director</div>
                  <div class="signature-org">Organ Donation Authority</div>
                </div>
                
                <div class="org-logo">
                  <div class="org-icon">❤️</div>
                  <div class="org-name">UBlood</div>
                  <div class="org-tagline">Organ Donation Network</div>
                </div>

                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-title">Registry Coordinator</div>
                  <div class="signature-org">National Organ Registry</div>
                </div>
              </div>
              
              <div class="certificate-id">
                <div class="cert-id-text">
                  Certificate ID: ${pledgeId} | Generated on ${format(new Date(), 'MMMM dd, yyyy')}<br>
                  This pledge certificate is electronically generated and legally valid
                </div>
                <div class="legal-text">
                  <strong>Legal Notice:</strong> This pledge serves as your formal consent for organ donation. 
                  This document should be kept with your important papers and shared with family members. 
                  You may modify or revoke this pledge at any time while alive by contacting the organ donation registry.
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open('', '_blank', 'width=900,height=700');
      if (!printWindow) {
        alert('Please allow popups to download the certificate');
        return;
      }

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 1000);
      };

      onDownload();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Certificate Preview */}
      <div id="pledge-certificate-content" className="bg-white border-2 border-primary rounded-lg shadow-xl overflow-hidden mb-6">
        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Heart className="h-8 w-8 text-white fill-current" />
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              ORGAN DONATION PLEDGE
            </h1>
            <p className="text-lg text-white/90 font-medium">
              Certificate of Commitment to Save Lives
            </p>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-12 bg-gradient-to-br from-white to-slate-50">
          <div className="text-center space-y-6">
            <p className="text-xl text-slate-600 font-medium">This is to certify that</p>
            
            <div className="relative">
              <h2 className="text-4xl font-black text-blue-700 py-4 px-6 bg-white rounded-xl shadow-lg border-4 border-blue-200 inline-block">
                {donorName}
              </h2>
            </div>
            
            <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
              has voluntarily pledged to donate organs and tissues after death, demonstrating extraordinary 
              compassion and commitment to saving precious lives.
            </p>

            {/* Pledge Details */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="p-6 border-red-200 bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-center space-y-3">
                  <FileText className="h-8 w-8 text-red-600 mx-auto" />
                  <div>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">Pledge ID</p>
                    <p className="font-mono text-2xl font-black text-red-800">{pledgeId}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center space-y-3">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto" />
                  <div>
                    <p className="text-sm text-green-600 font-bold uppercase tracking-wider">Pledge Date</p>
                    <p className="text-2xl font-black text-green-800">{format(pledgeDate, 'MMM dd, yyyy')}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-red-200 bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-center space-y-3">
                  <Heart className="h-8 w-8 text-red-600 mx-auto fill-current" />
                  <div>
                    <p className="text-sm text-red-600 font-bold uppercase tracking-wider">Organs Pledged</p>
                    <p className="text-2xl font-black text-red-800">{organCount} organs/tissues</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <div className="text-center space-y-3">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto fill-current" />
                  <div>
                    <p className="text-sm text-yellow-600 font-bold uppercase tracking-wider">Potential Impact</p>
                    <p className="text-2xl font-black text-yellow-800">{potentialLivesSaved} lives</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Impact Statement */}
            <Card className="p-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-200 mt-8">
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-amber-500 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-3">The Gift of Life</h3>
                <p className="text-amber-700 text-lg font-semibold leading-relaxed">
                  Through this pledge, you have chosen to give the ultimate gift - the gift of life itself. 
                  Your decision represents hope for families and demonstrates the highest form of human compassion.
                </p>
              </div>
            </Card>
          </div>

          {/* Certificate Footer */}
          <div className="border-t-4 border-slate-200 pt-12 mt-16">
            <div className="flex justify-between items-end mb-8">
              <div className="text-center flex-1">
                <div className="w-48 h-1 bg-slate-400 mx-auto mb-4"></div>
                <p className="text-slate-600 font-bold">Medical Director</p>
                <p className="text-slate-500 text-sm">Organ Donation Authority</p>
              </div>
              
              <div className="text-center flex-1">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-red-600 rounded-full inline-block mb-4">
                  <Heart className="h-10 w-10 text-white fill-current" />
                </div>
                <p className="text-2xl font-black text-blue-700">UBlood</p>
                <p className="text-slate-600 text-sm font-medium italic">Organ Donation Network</p>
              </div>

              <div className="text-center flex-1">
                <div className="w-48 h-1 bg-slate-400 mx-auto mb-4"></div>
                <p className="text-slate-600 font-bold">Registry Coordinator</p>
                <p className="text-slate-500 text-sm">National Organ Registry</p>
              </div>
            </div>
            
            <div className="text-center pt-6 border-t-2 border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                Certificate ID: <span className="font-mono font-bold">{pledgeId}</span> | 
                Generated on {format(new Date(), 'MMMM dd, yyyy')}
              </p>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                <strong>Legal Notice:</strong> This pledge serves as your formal consent for organ donation. 
                Keep this document with important papers and share with family members. 
                You may modify or revoke this pledge at any time while alive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 print:hidden">
        <Button 
          onClick={() => window.print()} 
          variant="outline" 
          size="lg"
          className="flex items-center gap-2"
        >
          <Printer className="h-4 w-4" />
          Print Certificate
        </Button>
        <Button 
          onClick={handleDownloadPDF} 
          size="lg"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PledgeCertificate;
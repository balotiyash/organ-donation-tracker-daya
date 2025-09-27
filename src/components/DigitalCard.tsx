import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  Download,
  Share2,
  QrCode,
  Copy,
  Check,
  Eye,
  Activity,
  Award,
  AlertTriangle
} from "lucide-react";
import { format } from "date-fns";

interface DigitalCardProps {
  donorName: string;
  pledgeId: string;
  pledgeDate: Date;
  organCount: number;
  selectedOrgans: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  onClose: () => void;
}

const DigitalCard = ({ 
  donorName, 
  pledgeId, 
  pledgeDate, 
  organCount, 
  selectedOrgans,
  contactInfo,
  emergencyContact,
  onClose 
}: DigitalCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPledgeId = async () => {
    try {
      await navigator.clipboard.writeText(pledgeId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${donorName} - Organ Donation Pledge`,
          text: `I've pledged to donate ${organCount} organs/tissues to save lives. Pledge ID: ${pledgeId}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyPledgeId();
    }
  };

  const handleDownloadCard = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Digital Organ Donor Card - ${donorName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: #f8fafc;
            padding: 20px;
          }
          .card-container {
            max-width: 400px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 3px solid #1e40af;
          }
          .card-header {
            background: linear-gradient(135deg, #0ea5e9 0%, #ef4444 100%);
            padding: 25px;
            text-align: center;
            color: white;
            position: relative;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 5px;
          }
          .card-subtitle {
            font-size: 1rem;
            opacity: 0.9;
          }
          .donor-photo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
          }
          .card-body {
            padding: 30px 25px;
          }
          .donor-name {
            font-size: 1.8rem;
            font-weight: 900;
            color: #1e40af;
            text-align: center;
            margin-bottom: 20px;
            text-transform: uppercase;
          }
          .info-section {
            margin-bottom: 20px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
          }
          .info-label {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 600;
          }
          .info-value {
            color: #1e293b;
            font-size: 0.95rem;
            font-weight: 700;
            text-align: right;
            flex: 1;
            margin-left: 20px;
          }
          .organs-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
          }
          .organs-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #92400e;
            margin-bottom: 15px;
            text-align: center;
          }
          .organs-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          .organ-item {
            background: white;
            padding: 8px 12px;
            border-radius: 8px;
            text-align: center;
            font-size: 0.85rem;
            font-weight: 600;
            color: #92400e;
          }
          .emergency-section {
            background: #fef2f2;
            border: 2px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
          }
          .emergency-title {
            color: #dc2626;
            font-size: 1rem;
            font-weight: 800;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .card-footer {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            border-top: 2px solid #e2e8f0;
          }
          .qr-placeholder {
            width: 100px;
            height: 100px;
            background: #e2e8f0;
            border-radius: 8px;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: #64748b;
          }
          .pledge-id {
            font-family: monospace;
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 700;
          }
          .validity-text {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-top: 10px;
          }
          @media print {
            body { background: white !important; }
            .card-container { box-shadow: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <div class="card-header">
            <div class="card-title">ORGAN DONOR CARD</div>
            <div class="card-subtitle">Digital Pledge Certificate</div>
            <div class="donor-photo">👤</div>
          </div>
          
          <div class="card-body">
            <div class="donor-name">${donorName}</div>
            
            <div class="info-section">
              <div class="info-row">
                <span class="info-label">Pledge ID:</span>
                <span class="info-value">${pledgeId}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Pledge Date:</span>
                <span class="info-value">${format(pledgeDate, 'MMM dd, yyyy')}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Contact:</span>
                <span class="info-value">${contactInfo.phone}</span>
              </div>
            </div>

            <div class="organs-section">
              <div class="organs-title">Pledged Organs (${organCount})</div>
              <div class="organs-grid">
                ${selectedOrgans.slice(0, 6).map(organ => `<div class="organ-item">${organ}</div>`).join('')}
                ${organCount > 6 ? `<div class="organ-item">+${organCount - 6} more</div>` : ''}
              </div>
            </div>

            <div class="emergency-section">
              <div class="emergency-title">
                🚨 Emergency Contact
              </div>
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${emergencyContact.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${emergencyContact.phone}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="qr-placeholder">📱</div>
            <div class="pledge-id">ID: ${pledgeId}</div>
            <div class="validity-text">
              Valid digital organ donor card<br>
              Generated by UBlood Network
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=450,height=650');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 500);
      };
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Digital Card */}
      <Card className="shadow-2xl border-blue-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 p-6 text-center text-white relative">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          
          <CardTitle className="text-xl font-bold mb-1">ORGAN DONOR CARD</CardTitle>
          <p className="text-sm opacity-90">Digital Pledge Certificate</p>
          
          {/* Donor Photo Placeholder */}
          <div className="w-20 h-20 bg-white/20 rounded-full border-3 border-white/30 flex items-center justify-center mx-auto mt-4 mb-2">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>

        <CardContent className="p-6">
          {/* Donor Name */}
          <h2 className="text-2xl font-black text-blue-700 text-center mb-6 uppercase tracking-wide">
            {donorName}
          </h2>

          {/* Basic Info */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground text-sm font-semibold">Pledge ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold">{pledgeId}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPledgeId}
                  className="h-6 w-6 p-0"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground text-sm font-semibold">Pledge Date:</span>
              <span className="text-sm font-bold">{format(pledgeDate, 'MMM dd, yyyy')}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground text-sm font-semibold">Contact:</span>
              <span className="text-sm font-bold">{contactInfo.phone}</span>
            </div>
          </div>

          {/* Organs Section */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-6">
            <CardContent className="p-4">
              <h3 className="text-center font-bold text-amber-800 mb-3">
                Pledged Organs ({organCount})
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedOrgans.slice(0, 6).map((organ, index) => (
                  <Badge key={index} variant="secondary" className="text-xs justify-center">
                    {organ}
                  </Badge>
                ))}
                {organCount > 6 && (
                  <Badge variant="outline" className="text-xs justify-center">
                    +{organCount - 6} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Emergency Contact
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{emergencyContact.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-semibold">{emergencyContact.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Placeholder & Footer Info */}
          <div className="text-center">
            <Card className="p-4 bg-muted/50">
              <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                <QrCode className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                ID: <span className="font-mono font-bold">{pledgeId}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Valid digital organ donor card<br />
                Generated by UBlood Network
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCard}
              className="flex-1 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1 flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Important Notice */}
          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-blue-700">Important:</strong> Keep this card accessible and inform family members about your donation decision. In medical emergencies, this card helps medical professionals identify your donor status.
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalCard;
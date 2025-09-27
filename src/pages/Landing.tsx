import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Zap, Shield, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Landing = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms instantly match donors with patients based on blood type, location, and urgency."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-Time Inventory",
      description: "Live blood bank monitoring with automatic low-stock alerts and predictive shortfall analysis."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Emergency SOS",
      description: "One-click emergency alerts notify nearby eligible donors with optimized routing."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified & Secure",
      description: "Blockchain-verified donations ensure transparency and prevent misuse."
    }
  ];

  const stats = [
    { number: "10K+", label: "Lives Saved", color: "success" },
    { number: "5K+", label: "Active Donors", color: "primary" },
    { number: "150+", label: "Partner Hospitals", color: "accent" },
    { number: "24/7", label: "Emergency Support", color: "warning" }
  ];

  return (
  <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-medical bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-medical-primary" />
              <span className="text-xl font-bold text-medical-primary">UBlood</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/about">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">About</Button>
              </Link>
              <Link to="/faq">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">FAQ</Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">Contact</Button>
              </Link>
              <Link to="/pledge">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">Pledge</Button>
              </Link>
              <Link to="/hospital">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">Hospital Login</Button>
              </Link>
              <Link to="/ambulance">
                <Button variant="ghost" className="text-gray-700 hover:text-medical-primary hover:bg-medical-soft">Ambulance</Button>
              </Link>
              <Link to="/ai-agent">
                <Button variant="ghost" className="text-medical-primary hover:bg-medical-soft hover:text-medical-primary">
                  🤖 AI Agent
                </Button>
              </Link>
              <Link to="/donor">
                <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-soft">
                  Donor Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
  <section className="relative overflow-hidden bg-gradient-to-br from-white via-medical-light to-medical-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-medical-primary/10 text-medical-primary border-medical-primary/20">
                  Emergency Response System
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Save Lives with
                  <span className="text-medical-primary font-bold"> AI-Powered </span>
                  Blood Matching
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl">
                  Connect blood donors with patients instantly using intelligent matching, real-time inventory tracking, and emergency response systems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/hospital">
                  <Button size="lg" className="bg-gradient-to-r from-medical-primary to-medical-primary/90 hover:from-medical-primary/90 hover:to-medical-primary text-white shadow-lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Emergency Access
                  </Button>
                </Link>
                <Link to="/donor">
                  <Button size="lg" className="bg-accent text-white hover:bg-accent/90 shadow-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Become a Donor
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-medical-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-700">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Medical blood donation and matching system"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
  <section className="py-16 lg:py-24 bg-medical-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Revolutionary Healthcare Technology
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Advanced AI algorithms and real-time systems designed to save lives through efficient blood donation management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-medical shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-medical-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-medical-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-700">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="py-16 lg:py-24 bg-medical-soft relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Every Second Counts in Emergency Situations
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of verified donors ready to respond to emergency calls and help save lives in your community.
          </p>
          <Link to="/emergency">
            <Button size="lg" className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Emergency Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-medical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="h-6 w-6 text-medical-primary" />
              <span className="text-lg font-semibold tracking-widest text-medical-primary">UBlood</span>
            </div>
            <p className="text-gray-700">
              Connecting donors and patients through intelligent healthcare technology.
            </p>
            <div className="text-sm text-gray-600">
              © 2025 UBlood. Saving lives through technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
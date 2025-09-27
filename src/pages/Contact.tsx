import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-medical-light to-medical-soft">
    {/* Navbar */}
    <nav className="border-b border-medical bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-medical-primary" />
            <span className="text-xl font-bold text-medical-primary">UBlood</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-medical-primary transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-medical-primary transition-colors">About</Link>
            <Link to="/faq" className="text-gray-700 hover:text-medical-primary transition-colors">FAQ</Link>
            <Link to="/contact" className="text-medical-primary font-medium">Contact</Link>
          </div>
        </div>
      </div>
    </nav>

    <div className="flex flex-col items-center justify-center px-4 py-12 min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="shadow-card border-medical">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-medical-primary flex items-center">
              <Mail className="w-8 h-8 mr-3" />
              Contact UBlood
            </CardTitle>
            <p className="text-gray-600">
              Have questions, feedback, or need support? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your full name" className="border-medical focus:border-medical-primary" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" className="border-medical focus:border-medical-primary" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">Message</Label>
                <Textarea id="message" placeholder="Tell us how we can help you..." className="border-medical focus:border-medical-primary" rows={4} required />
              </div>
              <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-primary/90" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="shadow-card border-medical">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-medical-primary" />
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For urgent medical emergencies requiring immediate blood assistance:
              </p>
              <div className="text-2xl font-bold text-medical-primary mb-2">+1 (555) 911-BLOOD</div>
              <p className="text-sm text-gray-500">Available 24/7 for life-threatening situations</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-medical">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-medical-primary" />
                General Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email Support</p>
                  <p className="text-medical-primary font-medium">support@ublood.org</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Partnership Inquiries</p>
                  <p className="text-medical-primary font-medium">partnerships@ublood.org</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-medical">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-medical-primary" />
                Headquarters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">
                <p>UBlood Healthcare Solutions</p>
                <p>123 Medical Center Drive</p>
                <p>Healthcare District, HD 12345</p>
                <p className="mt-2 text-sm text-gray-500">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
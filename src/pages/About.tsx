
import { Heart, Users, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const aboutFeatures = [
  {
    icon: <Zap className="h-8 w-8 text-medical-primary" />, title: "AI-Powered Matching", desc: "Smart algorithms instantly match donors with patients based on blood type, location, and urgency."
  },
  {
    icon: <Shield className="h-8 w-8 text-medical-primary" />, title: "Verified & Secure", desc: "Blockchain-verified donations ensure transparency and prevent misuse."
  },
  {
    icon: <Users className="h-8 w-8 text-medical-primary" />, title: "Community Driven", desc: "Thousands of donors and hospitals working together to save lives."
  },
  {
    icon: <Heart className="h-8 w-8 text-medical-primary" />, title: "24/7 Emergency Support", desc: "Always ready to respond to urgent needs, any time, any day."
  },
];

const About = () => (
  <div className="min-h-screen bg-white">
    {/* Navbar */}
    <nav className="border-b border-medical bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-medical-primary" />
            <span className="text-xl font-bold tracking-widest text-medical-primary">UBlood</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-medical-primary transition-colors">Home</Link>
            <Link to="/about" className="text-medical-primary font-medium">About</Link>
            <Link to="/faq" className="text-gray-700 hover:text-medical-primary transition-colors">FAQ</Link>
            <Link to="/contact" className="text-gray-700 hover:text-medical-primary transition-colors">Contact</Link>
            {/* Profile link removed as requested */}
          </div>
        </div>
      </div>
    </nav>
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-medical-light to-medical-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block bg-medical-primary/10 text-medical-primary border border-medical-primary/20 rounded-full px-4 py-1 text-sm font-semibold">About UBlood</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Our Mission:
              <span className="bg-gradient-to-r from-medical-primary to-accent bg-clip-text text-transparent"> Save Lives, Build Trust</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              UBlood is a next-generation platform dedicated to saving lives by connecting blood donors with patients in need, using AI-powered matching and real-time inventory tracking.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="inline-flex items-center gap-2 bg-medical-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg text-lg">Trusted by 150+ Hospitals</span>
            <span className="inline-flex items-center gap-2 bg-white border border-medical-primary text-medical-primary px-6 py-3 rounded-lg font-semibold shadow">10,000+ Lives Saved</span>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <img src={heroImage} alt="About UBlood" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-medical-primary/10 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="py-16 lg:py-24 bg-medical-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose UBlood?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine technology, transparency, and compassion to create the most reliable emergency blood donation network.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutFeatures.map((f, i) => (
            <div key={i} className="bg-white border border-medical rounded-2xl shadow-card p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;


import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => (
  <div className="min-h-screen bg-white">
    {/* Navbar */}
    <nav className="border-b border-medical bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-medical-primary" />
            <span className="text-xl font-bold text-medical-primary">UBlood</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/" className="text-gray-700 hover:text-medical-primary transition-colors">
              <span>Home</span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-medical-primary transition-colors">
              <span>About</span>
            </Link>
            <Link to="/faq" className="text-medical-primary font-medium">
              <span>FAQ</span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-medical-primary transition-colors">
              <span>Contact</span>
            </Link>
            <Link to="/hospital" className="text-gray-700 hover:text-medical-primary transition-colors">
              <span>Hospital Login</span>
            </Link>
            <Link to="/donor" className="text-gray-700 hover:text-medical-primary transition-colors">
              <span>Donor Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>

    {/* FAQ Section */}
    <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-medical-light to-medical-soft min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h1>
        <div className="bg-white rounded-xl shadow-card border border-medical p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1" className="border-b border-medical/50">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">Who can donate blood?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Most healthy adults between 18-65 years old who weigh at least 50kg (110 lbs) can donate blood. Eligibility depends on age, weight, health, and recent travel or medical history. Our pre-donation screening ensures safety for both donors and recipients.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-b border-medical/50">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">How does UBlood match donors and patients?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                UBlood uses AI algorithms to match donors and patients based on blood type compatibility, geographic proximity, and urgency level. Our system considers factors like travel time, donor availability, and hospital requirements to ensure the fastest and most effective response.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-b border-medical/50">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">Is my data secure?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, all personal and medical data is encrypted using industry-standard security protocols. We use blockchain verification for donation records to ensure transparency while maintaining privacy. Your information is never shared without explicit consent.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="border-b border-medical/50">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">How often can I donate blood?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Whole blood can be donated every 8 weeks (56 days). Plasma can be donated more frequently - every 4 weeks, while platelets can be donated every 2 weeks. Our system automatically tracks your eligibility and will notify you when you're ready to donate again.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5" className="border-b border-medical/50">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">What happens during an emergency alert?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                When a hospital issues an emergency blood request, our AI system immediately identifies compatible donors within the optimal radius. Eligible donors receive instant notifications with hospital details, urgency level, and estimated travel time. You can respond with one tap to save lives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q6">
              <AccordionTrigger className="text-lg text-gray-900 hover:text-medical-primary">Are there any side effects from donating?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Most donors experience no side effects. Some may feel mild dizziness or fatigue, which is normal and temporary. We provide post-donation care instructions and refreshments. Our medical staff monitors all donors before, during, and after donation to ensure safety.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  </div>
);

export default FAQ;

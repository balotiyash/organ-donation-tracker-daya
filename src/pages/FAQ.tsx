
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => (
  <div className="min-h-screen bg-black text-white">
    {/* Navbar */}
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">UBlood</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/about">
              <span className="hover:text-[#e11d48] transition-colors">About</span>
            </Link>
            <Link to="/faq">
              <span className="hover:text-[#e11d48] transition-colors">FAQ</span>
            </Link>
            <Link to="/contact">
              <span className="hover:text-[#e11d48] transition-colors">Contact</span>
            </Link>
            <Link to="/hospital">
              <span className="hover:text-[#e11d48] transition-colors">Hospital Login</span>
            </Link>
            <Link to="/donor">
              <span className="hover:text-[#e11d48] transition-colors">Donor Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>

    {/* FAQ Section */}
    <section className="py-16 lg:py-24 bg-black min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg text-white">Who can donate blood?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Most healthy adults can donate blood. Eligibility depends on age, weight, health, and recent travel or medical history.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-lg text-white">How does UBlood match donors and patients?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              UBlood uses AI algorithms to match donors and patients based on blood type, location, and urgency, ensuring the fastest and safest response.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-lg text-white">Is my data secure?</AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, all data is encrypted and donations are verified for transparency and security.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  </div>
);

export default FAQ;

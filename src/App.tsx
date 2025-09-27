import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import HospitalDashboard from "./pages/HospitalDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import EmergencyDashboard from "./pages/EmergencyDashboard";
import AddInventory from "./pages/AddInventory";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import DonorAlerts from "./pages/DonorAlerts";
import DonorViewDetails from "./pages/DonorViewDetails";
import DonorRespond from "./pages/DonorRespond";
import DonationComplete from "./pages/DonationComplete";
import AmbulanceDashboard from "./pages/AmbulanceDashboard";
import OrganRequirementSystem from "./pages/OrganRequirementSystem";
import AIAgentDashboard from "./pages/AIAgentDashboard";
import ViewAIResponse from "./pages/ViewAIResponse";
import ApplyOptimization from "./pages/ApplyOptimization";
import BloodInventoryStatus from "./pages/BloodInventoryStatus";
import EmergencyDonorFinder from "./pages/EmergencyDonorFinder";
import NearbyDonorContact from "./pages/NearbyDonorContact";
import DonateNow from "./pages/DonateNow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/donor/alerts" element={<DonorAlerts />} />
          <Route path="/donor/view-details/:id" element={<DonorViewDetails />} />
          <Route path="/donor/respond/:id" element={<DonorRespond />} />
          <Route path="/donor/donation-complete/:id" element={<DonationComplete />} />
          <Route path="/donor/donate-now" element={<DonateNow />} />
          <Route path="/emergency" element={<EmergencyDashboard />} />
          <Route path="/ambulance" element={<AmbulanceDashboard />} />
          <Route path="/organ-requirements" element={<OrganRequirementSystem />} />
          <Route path="/ai-agent" element={<AIAgentDashboard />} />
          <Route path="/view-ai-response" element={<ViewAIResponse />} />
          <Route path="/apply-optimization" element={<ApplyOptimization />} />
          <Route path="/blood-inventory-status" element={<BloodInventoryStatus />} />
          <Route path="/emergency-donor-finder" element={<EmergencyDonorFinder />} />
          <Route path="/nearby-donor-contact" element={<NearbyDonorContact />} />
          <Route path="/add-inventory" element={<AddInventory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pledge" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

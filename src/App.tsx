
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UserManagement from "./pages/UserManagement";
import ApplicationProcessing from "./pages/ApplicationProcessing";
import EligibilityAssessment from "./pages/EligibilityAssessment";
import DocumentReview from "./pages/DocumentReview";
import Consultations from "./pages/Consultations";
import SecurityPage from "./pages/SecurityPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users/*" element={<UserManagement />} />
          <Route path="/applications/*" element={<ApplicationProcessing />} />
          <Route path="/eligibility/*" element={<EligibilityAssessment />} />
          <Route path="/documents/*" element={<DocumentReview />} />
          <Route path="/consultations/*" element={<Consultations />} />
          <Route path="/notifications" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

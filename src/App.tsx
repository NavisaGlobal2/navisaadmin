
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/*"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications/*"
              element={
                <ProtectedRoute>
                  <ApplicationProcessing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eligibility/*"
              element={
                <ProtectedRoute>
                  <EligibilityAssessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents/*"
              element={
                <ProtectedRoute>
                  <DocumentReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultations/*"
              element={
                <ProtectedRoute>
                  <Consultations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/security"
              element={
                <ProtectedRoute>
                  <SecurityPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

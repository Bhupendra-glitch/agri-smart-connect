
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Auth Pages
import Login from "./pages/auth/Login";
import ProfileSetup from "./pages/auth/ProfileSetup";
import LanguageSelection from "./pages/auth/LanguageSelection";

// Main App Pages
import Home from "./pages/app/Home";
import CropDiseaseDetection from "./pages/app/CropDiseaseDetection";
import Community from "./pages/app/Community";
import Profile from "./pages/app/Profile";
import ChatSupport from "./pages/app/ChatSupport";
import CropCare from "./pages/app/CropCare";
import FertilizerCalculator from "./pages/app/FertilizerCalculator";
import Weather from "./pages/app/Weather";

// Other pages
import NotFound from "./pages/NotFound";

// Auth Provider
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse-slow text-agri-green">Loading...</div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/crop-disease" element={<ProtectedRoute><CropDiseaseDetection /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/chat-support" element={<ProtectedRoute><ChatSupport /></ProtectedRoute>} />
      <Route path="/crop-care" element={<ProtectedRoute><CropCare /></ProtectedRoute>} />
      <Route path="/fertilizer-calculator" element={<ProtectedRoute><FertilizerCalculator /></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const UnAuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/language-selection" element={<LanguageSelection />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-agri-green-light/20 to-agri-sky-light/20">
        <div className="animate-pulse text-3xl font-semibold text-agri-green">
          Anajika
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/language-selection" element={<LanguageSelection />} />
                <Route path="/*" element={<AuthenticatedApp />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

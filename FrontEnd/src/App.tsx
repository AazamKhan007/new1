// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Accommodation from "./pages/Accommodation";
import TiffinServices from "./pages/TiffinServices";
import Marketplace from "./pages/Marketplace";
import MentalHealth from "./pages/Mentalwellness";
import LostFound from "./pages/LostandFound";
import RoommateFinder from "./pages/RoomateFinder";
import RaktConnect from "./pages/Blooddonation";
import StudentDiscount from "./pages/Discount";
import Events from "./pages/Event";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import AuthCallback from "./pages/AuthCallback";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/ContactUs";
import Aboutus from "./pages/Aboutus";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Help from "./pages/Help";
import Termandcondition from "./pages/Termandcondition";
import Privacypolicy from "./pages/Privacypolicy";
import PropertyDetail from "./pages/PropertyDetail";

// 👇 NEW: Auth wrapper
import RequireAuth from "./components/RequireAuth";
import Logout from "./pages/Logout";
import { Contact } from "lucide-react";
import PrivacyPolicy from "./pages/Privacypolicy";
import TermsAndConditions from "./pages/Termandcondition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Home */}
          <Route path="/" element={<Index />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/marketplace" element={<Marketplace></Marketplace>} />
          <Route path="/Event" element={<Events />} />
          <Route path="/MentalHealth" element={<MentalHealth />} />
          <Route path="/RoommateFinder" element={<RoommateFinder />} />
          <Route path="/LostFound" element={<LostFound />} />
          <Route path="/RaktConnect" element={<RaktConnect />} />
          <Route path="/StudentDiscount" element={<StudentDiscount />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Protected Services */}
          <Route
            path="/accommodation"
            element={
              <RequireAuth>
                <Accommodation />
              </RequireAuth>
            }
          />
          <Route path="/accommodation/:id" element={<PropertyDetail />} />
          <Route
            path="/tiffin-services"
            element={
              <RequireAuth>
                <TiffinServices />
              </RequireAuth>
            }
          />
          <Route
            path="/marketplace"
            element={
              <RequireAuth>
                <Marketplace />
              </RequireAuth>
            }
          />
          <Route
            path="/mental-health"
            element={
              <RequireAuth>
                <MentalHealth />
              </RequireAuth>
            }
          />
          <Route
            path="/lost-found"
            element={
              <RequireAuth>
                <LostFound />
              </RequireAuth>
            }
          />
          <Route
            path="/roommate-finder"
            element={
              <RequireAuth>
                <RoommateFinder />
              </RequireAuth>
            }
          />
          <Route
            path="/rakt-connect"
            element={
              <RequireAuth>
                <RaktConnect />
              </RequireAuth>
            }
          />
          <Route
            path="/student-discount"
            element={
              <RequireAuth>
                <StudentDiscount />
              </RequireAuth>
            }
          />
          <Route
            path="/events"
            element={
              <RequireAuth>
                <Events />
              </RequireAuth>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

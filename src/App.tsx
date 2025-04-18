
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import CareerCompass from "./pages/CareerCompass";
import Roadmaps from "./pages/Roadmaps";
import Mentorship from "./pages/Mentorship";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import VoiceFeedback from "./pages/VoiceFeedback";
import StudyResources from "./pages/StudyResources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VoiceAIAssistant from "@/components/VoiceAIAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/career-compass" element={<CareerCompass />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/voice-feedback" element={<VoiceFeedback />} />
            <Route path="/study-resources" element={<StudyResources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <VoiceAIAssistant />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

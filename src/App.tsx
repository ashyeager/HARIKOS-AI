import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import BackgroundEffects from "./components/BackgroundEffects";
import ChatAssistant from "./components/ChatAssistant";
import ScrollProgress from "./components/ScrollProgress";
import { useSectionTracking } from "./hooks/useSectionTracking";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthModal from "./components/AuthModal";
import Dashboard from "./pages/Dashboard";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function AppContent() {
  useSectionTracking();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const portalRoutes = ['/dashboard', '/profile', '/settings'];
  const isPortalPage = portalRoutes.includes(location.pathname);

  useEffect(() => {
    const handleOpenAuthModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: 'signin' | 'signup' | 'forgot' }>;
      setAuthMode(customEvent.detail?.mode || 'signin');
      setAuthModalOpen(true);
    };

    window.addEventListener('open-auth-modal', handleOpenAuthModal as EventListener);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuthModal as EventListener);
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-black text-brand-gray-100 overflow-x-hidden selection:bg-brand-white selection:text-brand-black">
      {/* Scroll Progress Bar */}
      {!isPortalPage && <ScrollProgress />}
      
      {/* Premium Background Shader, Grid & Noise */}
      <BackgroundEffects />

      {/* Main Page Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Header Navigation */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode={authMode}
          onModeChange={setAuthMode}
          onAuthenticated={() => {
            setAuthModalOpen(false);
            window.location.assign('/dashboard');
          }}
        />

        {/* Footer */}
        {!isPortalPage && <Footer />}
        
        {/* Persistent Floating AI Chat Assistant */}
        {!isPortalPage && <ChatAssistant />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <UserAuthProvider>
      <Router>
        <AppContent />
      </Router>
    </UserAuthProvider>
  );
}


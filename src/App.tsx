import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import BackgroundEffects from "./components/BackgroundEffects";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-hidden bg-brand-black text-brand-gray-100 selection:bg-[#E5A93C] selection:text-black">
        <ScrollProgress />
        <BackgroundEffects />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}

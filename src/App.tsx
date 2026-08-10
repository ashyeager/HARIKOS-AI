import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ExperienceLayer from "./components/ExperienceLayer";
import PageSkeleton from "./components/PageSkeleton";
import ScrollManager from "./components/ScrollManager";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const Home = lazy(() => import("./pages/Home"));
const Company = lazy(() => import("./pages/Company"));
const Products = lazy(() => import("./pages/Products"));
const HarikosAI = lazy(() => import("./pages/HarikosAI"));
const XAgency = lazy(() => import("./pages/XAgency"));
const Lab = lazy(() => import("./pages/Lab"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RoutedSite() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <div className="site-shell">
      <ScrollManager />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ExperienceLayer />
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.25, 1, 0.5, 1] }}
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/harikos-ai" element={<HarikosAI />} />
              <Route path="/x-agency" element={<XAgency />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutedSite />
    </BrowserRouter>
  );
}

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const primaryLinks = [
  { label: "Company", to: "/company", index: "01" },
  { label: "Products", to: "/products", index: "02" },
  { label: "Lab", to: "/lab", index: "03" },
];

const secondaryLinks = [
  { label: "The X Agency", to: "/x-agency", index: "04" },
  { label: "Contact", to: "/contact", index: "05" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = window.scrollY > 24;
      setScrolled((current) => current === next ? current : next);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link className="wordmark" to="/" aria-label="HARIKOS home">
            HARIKOS
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <div className="nav-group">
              {primaryLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <span className="nav-rule" aria-hidden="true" />
            <div className="nav-group">
              {secondaryLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <Link className="product-beacon" to="/products/harikos-ai">
            <span className="status-dot" aria-hidden="true" />
            HARIKOS AI
            <span>In development</span>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mobile-menu-inner" aria-label="Mobile navigation">
              <p className="eyebrow">Navigate / HARIKOS</p>
              <div className="mobile-links">
                {[...primaryLinks, ...secondaryLinks].map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={reducedMotion ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.055 }}
                  >
                    <Link to={link.to}>
                      <span>{link.index}</span>
                      {link.label}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link className="mobile-product-link" to="/products/harikos-ai">
                <span><i className="status-dot" /> Product / 01</span>
                <strong>HARIKOS AI</strong>
                <small>Focused agents · In development</small>
              </Link>
              <div className="mobile-menu-foot">
                <span>Independent technology company</span>
                <span>Muscat / 2026</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

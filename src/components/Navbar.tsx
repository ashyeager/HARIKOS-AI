import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, Terminal, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Products", href: "/#products" },
  { name: "H Studio", href: "/#h-studio" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (window.location.pathname !== "/") return;

    event.preventDefault();
    const target = document.getElementById(href.split("#")[1]);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${
          scrolled
            ? "border-white/[0.06] bg-[#08080A]/90 py-3 backdrop-blur-xl"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Terminal className="h-4 w-4 text-black" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-[0.16em] text-white">HARIKOS</span>
              <span className="hidden text-[9px] uppercase tracking-[0.12em] text-brand-gray-500 sm:block">
                Technology company
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href)}
                className="text-sm font-medium text-brand-gray-400 transition hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="#products"
            onClick={(event) => handleLinkClick(event, "/#products")}
            className="hidden min-h-11 items-center justify-center gap-2 rounded-full border border-[#E5A93C]/30 bg-[#E5A93C]/10 px-5 py-2.5 text-xs font-bold text-[#F2C66D] transition hover:border-[#E5A93C]/50 hover:bg-[#E5A93C]/15 md:inline-flex"
          >
            HARIKOS AI <span className="font-medium opacity-70">In development</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="p-2 text-brand-gray-300 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-x-0 top-[65px] z-40 border-b border-white/8 bg-[#08080A]/98 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="font-display text-xl font-medium text-white"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#products"
                onClick={(event) => handleLinkClick(event, "/#products")}
                className="mt-2 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#E5A93C] px-6 py-3 text-sm font-bold text-[#130d04]"
              >
                View HARIKOS AI
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

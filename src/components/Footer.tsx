import { Instagram, Mail, Terminal } from "lucide-react";

const links = [
  { label: "Products", href: "#products" },
  { label: "H Studio", href: "#h-studio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#070708] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Terminal className="h-4 w-4 text-black" />
            </div>
            <span className="font-display text-lg font-bold tracking-[0.16em] text-white">HARIKOS</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-brand-gray-500">
            A technology company building focused software, AI products, and digital systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-brand-gray-400">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/harikos.ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HARIKOS on Instagram"
            className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-brand-gray-400 transition hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="mailto:ashyeagerhq@gmail.com"
            aria-label="Email HARIKOS"
            className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-brand-gray-400 transition hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/[0.05] pt-6 text-xs text-brand-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} HARIKOS</p>
        <div className="flex flex-wrap gap-4">
          <span>HARIKOS AI · In development</span>
          <span>H Studio · Services</span>
          <a href="https://instagram.com/harikos.ai" className="transition hover:text-brand-gray-300">
            Instagram: @harikos.ai
          </a>
          <a href="mailto:ashyeagerhq@gmail.com" className="transition hover:text-brand-gray-300">
            ashyeagerhq@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

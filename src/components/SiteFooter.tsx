import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  ["Company", "/company"],
  ["Products", "/products"],
  ["HARIKOS AI", "/products/harikos-ai"],
  ["The X Agency", "/x-agency"],
  ["Lab", "/lab"],
  ["Contact", "/contact"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-grid">
        <div>
          <Link className="footer-wordmark" to="/">HARIKOS</Link>
          <p>Independent technology company building software, intelligent systems, and digital products.</p>
        </div>
        <div className="footer-index">
          <p className="eyebrow">Index</p>
          {footerLinks.map(([label, to], index) => (
            <Link key={to} to={to}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <p className="eyebrow">Elsewhere</p>
          <a href="https://instagram.com/harikos.ai" target="_blank" rel="noreferrer">
            Instagram <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="mailto:ashyeagerhq@gmail.com">
            Email <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} HARIKOS</span>
        <span>Built with intent.</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

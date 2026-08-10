import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";

export default function NotFound() {
  return (
    <section className="not-found">
      <PageMeta title="Page not found — HARIKOS" description="The requested HARIKOS page could not be found." />
      <p className="eyebrow">Error / 404</p>
      <h1>Nothing here<br /><em>yet.</em></h1>
      <p>The page may have moved, or it may not exist.</p>
      <Link className="button button--primary" to="/"><ArrowLeft /> Return to HARIKOS</Link>
    </section>
  );
}

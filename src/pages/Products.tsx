import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CoreStage from "../components/CoreStage";
import PageMeta from "../components/PageMeta";
import ProductConcept from "../components/ProductConcept";
import Reveal from "../components/Reveal";

export default function Products() {
  return (
    <>
      <PageMeta
        title="Products — HARIKOS"
        description="Explore HARIKOS AI, the focused agent builder currently in development at HARIKOS."
      />
      <section className="products-hero page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">02 / Products</p>
          <h1>Software with<br /><em>a clear job.</em></h1>
          <p>One product in active development. Empty space is intentional.</p>
        </div>
        <div className="product-count" aria-label="One current product"><strong>01</strong><span>Current product</span></div>
      </section>

      <section className="product-index section-shell">
        <div className="product-index-header">
          <span>PRODUCT / 01</span>
          <span className="status-label"><i /> In development</span>
        </div>
        <div className="product-index-grid">
          <Reveal className="product-index-copy">
            <h2>HARIKOS AI</h2>
            <p className="large-copy">Agent systems for focused work.</p>
            <p>A simpler way to shape AI agents around particular roles, businesses, verticals, and workflows.</p>
            <Link className="button button--primary" to="/products/harikos-ai">Explore HARIKOS AI <ArrowRight /></Link>
          </Reveal>
          <Reveal className="product-index-core" delay={0.08}>
            <CoreStage variant="opened" label="The HARIKOS Core opened to reveal its internal system" />
          </Reveal>
        </div>
        <Reveal className="product-index-interface"><ProductConcept compact /></Reveal>
      </section>

      <section className="more-in-development section-shell">
        <p className="eyebrow">Beyond / 01</p>
        <Reveal>
          <h2>More in development.</h2>
          <p>No names. No artificial roadmap. New products will appear here when there is something real to show.</p>
        </Reveal>
      </section>

      <section className="page-next">
        <p className="eyebrow">Product / 01</p>
        <Link to="/products/harikos-ai">Enter HARIKOS AI <ArrowUpRight /></Link>
      </section>
    </>
  );
}

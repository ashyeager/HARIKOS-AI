import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CoreStage from "../components/CoreStage";
import PageMeta from "../components/PageMeta";
import ProductConcept from "../components/ProductConcept";
import Reveal from "../components/Reveal";

const labEntries = [
  { index: "01", name: "HARIKOS AI", type: "Product exploration", status: "Active" },
  { index: "02", name: "Direct Order Prototype", type: "Commerce experiment", status: "Archived" },
  { index: "03", name: "The HARIKOS Core", type: "Computational identity", status: "Current" },
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="HARIKOS — Technology Company"
        description="HARIKOS is an independent technology company building software, intelligent systems, and focused digital products."
      />

      <section className="home-hero">
        <div className="hero-coordinates" aria-hidden="true">
          <span>23.5880° N</span>
          <span>58.3829° E</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> Independent technology company</p>
          <h1>HARIKOS</h1>
          <p className="hero-statement">Technology, built with intent.</p>
          <p className="hero-support">We build focused software, intelligent systems, and new digital products.</p>
          <div className="hero-actions">
            <Link className="button button--primary" to="/products">
              Explore <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-link" to="/products/harikos-ai">
              HARIKOS AI <span>In development</span> <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <CoreStage variant="complete" className="hero-core" />
        <div className="scroll-cue" aria-hidden="true"><span /> Scroll to unfold</div>
      </section>

      <section className="thesis-scene section-shell">
        <div className="section-index">
          <span>01</span>
          <span>Thesis</span>
        </div>
        <Reveal className="thesis-copy">
          <p>Useful technology begins with a narrow question:</p>
          <h2>What should this do better?</h2>
        </Reveal>
        <div className="thesis-method" aria-label="HARIKOS working method">
          <Reveal delay={0.06}><span>01</span><strong>Build.</strong><small>Give the idea form.</small></Reveal>
          <Reveal delay={0.12}><span>02</span><strong>Test.</strong><small>Find what is real.</small></Reveal>
          <Reveal delay={0.18}><span>03</span><strong>Ship.</strong><small>Make it useful.</small></Reveal>
        </div>
      </section>

      <section className="product-scene section-shell">
        <div className="section-index">
          <span>02</span>
          <span>Product / 01</span>
        </div>
        <div className="product-scene-grid">
          <Reveal className="product-copy">
            <div className="status-label"><i /> In development</div>
            <h2>HARIKOS<br />AI</h2>
            <p className="large-copy">A focused platform for building specialized AI agents.</p>
            <p>Designed around particular roles, businesses, and workflows—not a giant generic automation surface.</p>
            <Link className="arrow-link" to="/products/harikos-ai">Explore product <ArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <Reveal delay={0.1} className="product-visual-wrap">
            <ProductConcept compact />
          </Reveal>
        </div>
      </section>

      <section className="agency-doorway section-shell">
        <div className="section-index section-index--light">
          <span>03</span>
          <span>Applied</span>
        </div>
        <div className="agency-doorway-grid">
          <Reveal>
            <p className="eyebrow">The X Agency</p>
            <h2>Technology,<br /><em>applied.</em></h2>
          </Reveal>
          <Reveal className="agency-intro" delay={0.08}>
            <p>A small studio working directly with businesses on automation, digital systems, and web experiences.</p>
            <Link className="arrow-link" to="/x-agency">Explore X <ArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <div className="agency-system-map" aria-hidden="true">
            <span className="map-node map-node--one">INPUT</span>
            <span className="map-line map-line--one" />
            <span className="map-node map-node--two">SYSTEM</span>
            <span className="map-line map-line--two" />
            <span className="map-node map-node--three">OUTPUT</span>
          </div>
        </div>
      </section>

      <section className="lab-preview section-shell">
        <div className="section-index">
          <span>04</span>
          <span>Lab</span>
        </div>
        <Reveal className="lab-preview-head">
          <h2>Work in public.<br />Learn in motion.</h2>
          <p>Experiments, prototypes, and development directions—presented as they are.</p>
        </Reveal>
        <div className="lab-rows">
          {labEntries.map((entry, index) => (
            <Reveal key={entry.index} delay={index * 0.05}>
              <Link to="/lab">
                <span>{entry.index}</span>
                <strong>{entry.name}</strong>
                <small>{entry.type}</small>
                <em>{entry.status}</em>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="closing-scene">
        <div className="closing-orbit" aria-hidden="true"><i /><i /><i /></div>
        <Reveal>
          <p className="eyebrow">HARIKOS / 2026</p>
          <h2>Build.<br />Test.<br /><span>Ship.</span></h2>
          <div className="closing-links">
            <Link className="button button--primary" to="/contact">Start a conversation <ArrowRight aria-hidden="true" /></Link>
            <Link className="text-link" to="/company">Read about HARIKOS <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

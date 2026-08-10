import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import ProductConcept from "../components/ProductConcept";
import Reveal from "../components/Reveal";

const experiments = [
  {
    index: "01",
    title: "HARIKOS AI",
    kind: "Product exploration",
    year: "2026",
    status: "Active",
    copy: "An ongoing exploration of a narrower agent builder shaped around roles, verticals, and specific workflows.",
    visual: "ai",
    to: "/products/harikos-ai",
  },
  {
    index: "02",
    title: "Direct Order Prototype",
    kind: "Commerce experiment",
    year: "2026",
    status: "Archived",
    copy: "A direct-order web concept for restaurants, explored before the HARIKOS company site was separated from service work.",
    visual: "order",
  },
  {
    index: "03",
    title: "The HARIKOS Core",
    kind: "Computational identity",
    year: "2026",
    status: "Current",
    copy: "An engineered WebGL object built as a shared visual language across the company, product, and applied-technology pages.",
    visual: "core",
  },
];

function ExperimentVisual({ type }: { type: string }) {
  if (type === "ai") return <ProductConcept compact />;
  if (type === "order") {
    return (
      <div className="order-experiment" aria-label="Abstract representation of the archived direct order prototype">
        <div className="order-top"><span>DIRECT / ORDER</span><i /><i /><i /></div>
        <div className="order-body"><strong>01</strong><span>Menu interface</span><em>ARCHIVED PROTOTYPE</em></div>
        <div className="order-lines"><i /><i /><i /><i /></div>
      </div>
    );
  }
  return (
    <div className="core-experiment" aria-label="Technical study of the HARIKOS Core">
      <span className="core-study-ring" /><span className="core-study-ring core-study-ring--two" />
      <i className="core-study-block core-study-block--one" /><i className="core-study-block core-study-block--two" />
      <strong>H / CORE</strong><small>WEBGL SYSTEM STUDY</small>
    </div>
  );
}

export default function Lab() {
  return (
    <>
      <PageMeta
        title="Lab — HARIKOS"
        description="HARIKOS Lab is an honest archive of active experiments, product prototypes, and technical questions."
      />
      <section className="lab-hero page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">03 / Lab</p>
          <h1>Things we’re<br /><em>figuring out.</em></h1>
          <p>Experiments, prototypes, and working questions. No inflated case studies.</p>
        </div>
        <div className="lab-signal" aria-hidden="true"><i /><i /><i /><i /><span>LIVE<br />ARCHIVE</span></div>
      </section>

      <section className="experiment-index section-shell">
        <div className="experiment-index-head"><span>INDEX / 2026</span><span>03 genuine entries</span></div>
        {experiments.map((experiment, index) => (
          <Reveal as="article" className="experiment" key={experiment.index} delay={index * 0.04}>
            <div className="experiment-meta">
              <span>{experiment.index}</span>
              <span>{experiment.kind}</span>
              <span>{experiment.year}</span>
              <em>{experiment.status}</em>
            </div>
            <div className="experiment-copy">
              <h2>{experiment.title}</h2>
              <p>{experiment.copy}</p>
              {experiment.to && <Link className="arrow-link" to={experiment.to}>Open product <ArrowUpRight /></Link>}
            </div>
            <div className="experiment-visual"><ExperimentVisual type={experiment.visual} /></div>
          </Reveal>
        ))}
      </section>

      <section className="lab-note section-shell">
        <p className="eyebrow">Lab principle</p>
        <Reveal><h2>An experiment can be useful<br />even when it does not become a product.</h2></Reveal>
      </section>
    </>
  );
}

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CoreStage from "../components/CoreStage";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";

const capabilities = [
  ["01", "Automation", "Workflows designed around the way the business actually operates."],
  ["02", "AI systems", "Purposeful AI implementation with a clear role, boundary, and handoff."],
  ["03", "Web experiences", "Fast, considered web products that make the business easier to understand and use."],
  ["04", "Custom builds", "Focused software for operational problems that off-the-shelf tools do not fit."],
];

export default function XAgency() {
  return (
    <>
      <PageMeta
        title="The X Agency — HARIKOS"
        description="The X Agency is the applied technology operation from HARIKOS, building automation, AI systems, web experiences, and focused custom tools."
      />
      <section className="x-hero">
        <div className="x-grid-overlay" aria-hidden="true" />
        <div className="x-hero-copy">
          <p className="eyebrow">Applied / HARIKOS</p>
          <h1>THE X<br />AGENCY</h1>
          <p className="x-statement">Technology, applied.</p>
          <p>We design and build digital systems for businesses.</p>
          <div className="hero-actions">
            <Link className="button button--light" to="/contact?topic=x-agency">Work with The X Agency <ArrowRight /></Link>
            <span className="standalone-note">Agency site — coming later</span>
          </div>
        </div>
        <CoreStage variant="structured" className="x-core" label="The HARIKOS Core in a precise structured state for The X Agency" />
      </section>

      <section className="x-intro section-shell">
        <div className="section-index"><span>01</span><span>What we do</span></div>
        <Reveal>
          <h2>Build the system<br />the problem requires.</h2>
        </Reveal>
        <Reveal className="x-intro-copy" delay={0.08}>
          <p>The X Agency is the practical side of HARIKOS: a small operation working directly with businesses to turn operational friction into clearer digital systems.</p>
          <p>No transformation theatre. Just a well-defined problem, a useful build, and a direct working relationship.</p>
        </Reveal>
      </section>

      <section className="capabilities section-shell">
        <p className="eyebrow">Capabilities / 04</p>
        {capabilities.map(([index, title, copy], itemIndex) => (
          <Reveal as="article" key={title} delay={itemIndex * 0.04}>
            <span>{index}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <i aria-hidden="true">↗</i>
          </Reveal>
        ))}
      </section>

      <section className="engagement-model section-shell">
        <div className="section-index"><span>02</span><span>Working model</span></div>
        <Reveal className="engagement-copy">
          <p className="eyebrow">Small team / Direct work</p>
          <h2>From friction<br />to working system.</h2>
        </Reveal>
        <div className="engagement-flow">
          <Reveal><span>01</span><strong>Frame</strong><small>Define the real operational problem.</small></Reveal>
          <i aria-hidden="true" />
          <Reveal delay={0.05}><span>02</span><strong>Build</strong><small>Design and implement the focused solution.</small></Reveal>
          <i aria-hidden="true" />
          <Reveal delay={0.1}><span>03</span><strong>Put to work</strong><small>Deploy, observe, and improve.</small></Reveal>
        </div>
      </section>

      <section className="x-cta">
        <Reveal>
          <p className="eyebrow">Have a real problem to solve?</p>
          <h2>Let’s make it<br />work better.</h2>
          <Link className="button button--light" to="/contact?topic=x-agency">Start a conversation <ArrowRight /></Link>
        </Reveal>
        <Link className="text-link" to="/company">Back to HARIKOS <ArrowUpRight /></Link>
      </section>
    </>
  );
}

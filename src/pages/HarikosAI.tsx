import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CoreStage from "../components/CoreStage";
import PageMeta from "../components/PageMeta";
import ProductConcept from "../components/ProductConcept";
import Reveal from "../components/Reveal";

const workflow = [
  {
    index: "01",
    label: "Define",
    title: "Give the agent a job.",
    copy: "Start with the role, the outcome, and the boundaries. A useful agent should know what it is—and what it is not.",
    visual: "define",
  },
  {
    index: "02",
    label: "Context",
    title: "Show it what matters.",
    copy: "Shape the working context around the business, vertical, and process instead of expecting one generic prompt to carry everything.",
    visual: "context",
  },
  {
    index: "03",
    label: "Connect",
    title: "Attach the right tools.",
    copy: "Connect only what the role needs. Fewer, clearer capabilities make the system easier to understand and control.",
    visual: "connect",
  },
  {
    index: "04",
    label: "Deploy",
    title: "Put it into a workflow.",
    copy: "Move from a configured agent to a specific trigger, action, and handoff—without pretending every workflow should be automated end to end.",
    visual: "deploy",
  },
];

function WorkflowVisual({ type }: { type: string }) {
  return (
    <div className={`workflow-visual workflow-visual--${type}`} aria-hidden="true">
      <div className="workflow-chrome"><span /><span /><span /><em>CONCEPT / {type.toUpperCase()}</em></div>
      {type === "define" && <div className="define-ui"><i>H</i><span>ROLE</span><strong>Operations coordinator</strong><small>BOUNDARY / Human approval required</small></div>}
      {type === "context" && <div className="context-ui"><strong>WORKING CONTEXT</strong><span>Business rules</span><span>Process knowledge</span><span>Escalation policy</span><i>03 SOURCES</i></div>}
      {type === "connect" && <div className="connect-ui"><span>AGENT</span><i /><strong>CRM</strong><i /><strong>INBOX</strong><i /><em>HUMAN</em></div>}
      {type === "deploy" && <div className="deploy-ui"><span>TRIGGER</span><i /><strong>AGENT RUN</strong><i /><em>REVIEW</em><button type="button" tabIndex={-1}>Ready for preview</button></div>}
    </div>
  );
}

export default function HarikosAI() {
  return (
    <>
      <PageMeta
        title="HARIKOS AI — Focused AI Agents"
        description="HARIKOS AI is a focused agent builder in development, exploring agents designed around particular roles, businesses, and workflows."
      />
      <section className="ai-hero">
        <div className="ai-hero-copy">
          <p className="eyebrow">Product / 01</p>
          <div className="status-label"><i /> In development</div>
          <h1>Build agents<br />around <em>the work.</em></h1>
          <p>A focused AI agent builder for particular roles, businesses, verticals, and workflows.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#product-exploration">View product exploration <ArrowRight /></a>
            <Link className="text-link" to="/contact?topic=harikos-ai">Follow development <ArrowUpRight /></Link>
          </div>
        </div>
        <CoreStage variant="opened" className="ai-core" label="The HARIKOS Core opened to show an illuminated computational interior" />
        <div className="ai-hero-note"><span>Development preview</span><p>Conceptual visuals describe the product direction, not shipped functionality.</p></div>
      </section>

      <section className="ai-thesis section-shell">
        <div className="section-index"><span>01</span><span>Product thesis</span></div>
        <Reveal>
          <p>Most agent builders begin with everything.</p>
          <h2>We are exploring<br />a narrower way in.</h2>
        </Reveal>
        <Reveal className="ai-thesis-side" delay={0.08}>
          <p>Instead of another giant generic automation platform, HARIKOS AI explores a simpler way to build agents around a defined piece of work.</p>
          <div className="thesis-equation" aria-label="Role plus context plus tools plus trigger creates a focused agent">
            <span>ROLE</span><i>+</i><span>CONTEXT</span><i>+</i><span>TOOLS</span><i>+</i><span>TRIGGER</span><i>=</i><strong>FOCUSED AGENT</strong>
          </div>
        </Reveal>
      </section>

      <section id="product-exploration" className="concept-section section-shell">
        <div className="section-index"><span>02</span><span>Product exploration</span></div>
        <Reveal className="concept-section-head">
          <h2>One structure.<br />Different work.</h2>
          <p>Select an exploratory vertical. The configuration changes to show how a focused agent could be shaped around its context.</p>
        </Reveal>
        <Reveal delay={0.08}><ProductConcept /></Reveal>
      </section>

      <section className="workflow-story section-shell">
        <div className="section-index"><span>03</span><span>System</span></div>
        {workflow.map((step, index) => (
          <article className="workflow-step" key={step.index}>
            <Reveal className="workflow-step-copy" delay={index * 0.02}>
              <span>{step.index} / {step.label}</span>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </Reveal>
            <Reveal className="workflow-step-visual" delay={0.08}><WorkflowVisual type={step.visual} /></Reveal>
          </article>
        ))}
      </section>

      <section className="focused-work section-shell">
        <p className="eyebrow">Exploratory directions / Not released</p>
        <Reveal className="focused-work-head">
          <h2>Built for<br />focused work.</h2>
          <p>These are areas of exploration, not claims of availability.</p>
        </Reveal>
        <div className="direction-ticker" aria-label="Exploratory directions">
          <span>Hospitality</span><i />
          <span>Customer operations</span><i />
          <span>Lead handling</span><i />
          <span>Internal workflows</span>
        </div>
      </section>

      <section className="development-status">
        <div className="development-status-grid">
          <div><span className="status-orbit"><i /></span><small>STATUS — DEVELOPMENT</small></div>
          <Reveal>
            <h2>Still being shaped.</h2>
            <p>HARIKOS AI is an active product direction, not a finished platform. The scope, interface, and underlying system will change as we build and test.</p>
            <Link className="button button--primary" to="/contact?topic=harikos-ai">Follow development <ArrowRight /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

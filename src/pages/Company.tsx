import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import CoreStage from "../components/CoreStage";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";

const principles = [
  {
    index: "01",
    word: "Usefulness",
    title: "Start with the job.",
    copy: "A product should earn its complexity. We begin with what needs to work, then remove whatever does not help it get there.",
  },
  {
    index: "02",
    word: "Craft",
    title: "Details are part of the system.",
    copy: "Interface, language, motion, and engineering shape the same experience. None of them are decoration after the fact.",
  },
  {
    index: "03",
    word: "Experimentation",
    title: "Make the question tangible.",
    copy: "Early ideas become prototypes quickly. Building reveals what speculation cannot—and gives us something honest to improve.",
  },
];

export default function Company() {
  return (
    <>
      <PageMeta
        title="Company — HARIKOS"
        description="HARIKOS is an independent technology company building focused software, intelligent systems, and digital products."
      />
      <section className="page-hero company-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">01 / Company</p>
          <h1>An independent<br /><em>technology company.</em></h1>
          <p>HARIKOS builds software and intelligent systems with a bias toward focus, usefulness, and deliberate craft.</p>
        </div>
        <CoreStage variant="deconstructed" className="company-core" label="The HARIKOS Core in a deconstructed state" />
      </section>

      <section className="editorial-intro section-shell">
        <div className="section-index"><span>01</span><span>What we care about</span></div>
        <Reveal>
          <p>We are early. That makes the standard simpler, not lower.</p>
          <h2>Build fewer things.<br />Understand them deeply.<br />Make them matter.</h2>
        </Reveal>
      </section>

      <section className="principles-list section-shell">
        {principles.map((principle, index) => (
          <Reveal as="article" key={principle.word} delay={index * 0.06}>
            <div className="principle-number">{principle.index}</div>
            <div className="principle-word">{principle.word}</div>
            <h3>{principle.title}</h3>
            <p>{principle.copy}</p>
          </Reveal>
        ))}
      </section>

      <section className="company-structure section-shell">
        <div className="section-index"><span>02</span><span>Current structure</span></div>
        <Reveal className="structure-head">
          <h2>One company.<br />Three modes of work.</h2>
          <p>The structure stays small by design. Each initiative has a clear role without needing a long corporate explanation.</p>
        </Reveal>
        <div className="structure-rows">
          <Reveal delay={0.04}><span>PRODUCT</span><strong>HARIKOS AI</strong><small>Focused agent systems</small><Link to="/products/harikos-ai">View <ArrowUpRight /></Link></Reveal>
          <Reveal delay={0.08}><span>APPLIED</span><strong>The X Agency</strong><small>Digital systems for businesses</small><Link to="/x-agency">View <ArrowUpRight /></Link></Reveal>
          <Reveal delay={0.12}><span>EXPERIMENTS</span><strong>HARIKOS Lab</strong><small>Prototypes and working questions</small><Link to="/lab">View <ArrowUpRight /></Link></Reveal>
        </div>
      </section>

      <section className="page-next">
        <p className="eyebrow">Next / Products</p>
        <Link to="/products">See what we are building <ArrowUpRight /></Link>
      </section>
    </>
  );
}

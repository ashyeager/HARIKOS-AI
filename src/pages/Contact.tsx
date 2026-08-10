import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";

const contactRoutes = [
  { label: "Product", title: "HARIKOS AI", note: "Development updates and product questions", topic: "harikos-ai" },
  { label: "Business", title: "The X Agency", note: "Automation, AI systems, web, and custom builds", topic: "x-agency" },
  { label: "General", title: "HARIKOS", note: "Company and everything else", topic: "general" },
];

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const selectTopic = (nextTopic: string) => {
    setSearchParams({ topic: nextTopic });
    window.requestAnimationFrame(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <PageMeta
        title="Contact — HARIKOS"
        description="Start a conversation with HARIKOS about HARIKOS AI, The X Agency, or the company."
      />
      <section className="contact-hero page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow">04 / Contact</p>
          <h1>Start a<br /><em>conversation.</em></h1>
          <p>Choose the right doorway. It all reaches the same small team.</p>
        </div>
        <div className="contact-direct">
          <a href="mailto:ashyeagerhq@gmail.com"><Mail /> ashyeagerhq@gmail.com <ArrowUpRight /></a>
          <a href="https://instagram.com/harikos.ai" target="_blank" rel="noreferrer"><Instagram /> @harikos.ai <ArrowUpRight /></a>
        </div>
      </section>

      <section className="contact-routes section-shell" aria-label="Inquiry categories">
        {contactRoutes.map((route, index) => (
          <Reveal as="button" type="button" key={route.topic} onClick={() => selectTopic(route.topic)} delay={index * 0.05}>
            <span>{route.label}</span>
            <strong>{route.title}</strong>
            <small>{route.note}</small>
            <ArrowUpRight aria-hidden="true" />
          </Reveal>
        ))}
      </section>

      <section id="contact-form" className="contact-form-section section-shell">
        <div className="section-index"><span>01</span><span>Message</span></div>
        <Reveal className="contact-form-intro">
          <h2>Tell us what<br />you have in mind.</h2>
          <p>Specific context helps. If you are not sure where the idea fits, choose General.</p>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.08}>
          <ContactForm key={topic ?? "general"} initialTopic={topic} />
        </Reveal>
      </section>
    </>
  );
}

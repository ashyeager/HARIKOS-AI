import { motion } from "motion/react";
import { Blocks, FlaskConical, Workflow } from "lucide-react";

const areas = [
  {
    label: "Products",
    title: "Focused software and AI products.",
    description: "Small, purposeful products designed around specific jobs rather than broad promises.",
    icon: Blocks,
    tone: "border-[#E5A93C]/20 bg-[#E5A93C]/10 text-[#F2C66D]",
  },
  {
    label: "Systems",
    title: "Technology shaped around real workflows.",
    description: "Practical digital and AI systems that make useful work simpler, faster, or clearer.",
    icon: Workflow,
    tone: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  },
  {
    label: "Experiments",
    title: "Tools, prototypes, and technical exploration.",
    description: "Early ideas tested with curiosity and restraint before they become products or services.",
    icon: FlaskConical,
    tone: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  },
];

const principles = ["Useful over flashy", "Focused over bloated", "Build, test, improve"];

export default function WhatWeBuild() {
  return (
    <section id="what-we-build" className="relative z-10 border-t border-white/[0.06] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]">What we build</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Technology with a clear job to do.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-brand-gray-400 lg:justify-self-end">
            HARIKOS is an early-stage technology company building useful software, AI products, and digital systems. We start with a real problem, then choose the right form for the solution.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -5 }}
                className="group min-h-[310px] rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-7 shadow-[0_22px_80px_rgba(0,0,0,0.28)]"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${area.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray-500">{area.label}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">{area.title}</h3>
                <p className="mt-4 text-sm leading-6 text-brand-gray-400">{area.description}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div id="about" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]">Our direction</span>
              <p className="mt-4 font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
                We're interested in software that does something useful - focused products, thoughtful interfaces, and AI applied to real workflows.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:min-w-56">
              {principles.map((principle) => (
                <div key={principle} className="flex items-center gap-3 text-sm text-brand-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
                  {principle}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

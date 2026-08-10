import { motion } from "motion/react";
import { ArrowRight, Bot, Code2, Layers3 } from "lucide-react";

const services = [
  {
    title: "AI Automation",
    description: "Customer assistants, workflow automation, and practical AI implementations.",
    icon: Bot,
  },
  {
    title: "Web Experiences",
    description: "Websites and landing pages designed with clarity, craft, and strong interaction.",
    icon: Code2,
  },
  {
    title: "Business Systems",
    description: "Custom digital systems built around the way a business actually operates.",
    icon: Layers3,
  },
];

const activeWork = [
  { name: "HARIKOS AI", status: "In development", tone: "bg-amber-300" },
  { name: "H Studio", status: "Service operations", tone: "bg-sky-300" },
  { name: "New products", status: "Exploration", tone: "bg-violet-300" },
];

export default function HStudio() {
  return (
    <section id="h-studio" className="relative z-10 border-t border-white/[0.06] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-7 shadow-[0_25px_90px_rgba(0,0,0,0.32)] sm:p-10">
          <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-300">Services / A HARIKOS initiative</span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">H Studio</h2>
              <p className="mt-3 font-display text-xl text-brand-gray-200">The service arm of HARIKOS.</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-brand-gray-400">
                H Studio works directly with businesses to design and build practical digital experiences, AI automation, and custom systems.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-brand-gray-200">
                  Contact H Studio
                  <ArrowRight className="h-4 w-4" />
                </a>
                <span className="rounded-full border border-white/10 px-4 py-2.5 text-xs text-brand-gray-500">Standalone site coming soon</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {services.map(({ title, description, icon: Icon }, index) => (
                <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[1.4rem] border border-white/[0.08] bg-black/25 p-5 backdrop-blur-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/15 bg-sky-400/[0.08]">
                    <Icon className="h-4 w-4 text-sky-300" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-gray-500">{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]">Building now</span>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Early, active, and deliberate.</h3>
            <p className="mt-4 text-sm leading-6 text-brand-gray-400">A straightforward view of where HARIKOS is focused today.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {activeWork.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-brand-gray-500">
                  <span className={`h-2 w-2 rounded-full ${item.tone}`} />
                  {item.status}
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-white">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { ArrowRight, Bot, Braces, CircleDot, PlugZap } from "lucide-react";

const directions = [
  { label: "Configurable agents", icon: Bot },
  { label: "Focused workflows", icon: Braces },
  { label: "Reusable integrations", icon: PlugZap },
];

export default function HarikosAI() {
  return (
    <section id="products" className="relative z-10 border-t border-white/[0.06] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E5A93C]">Product initiative</span>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E5A93C]/20 bg-[#E5A93C]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F2C66D]">
              <CircleDot className="h-3.5 w-3.5" />
              In development
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              HARIKOS AI
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-brand-gray-300">
              A lightweight platform for building focused AI agents for specific niches and workflows.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-gray-400">
              Instead of another general-purpose AI wrapper, HARIKOS AI is being designed around smaller, specialized agents that solve specific jobs. The product is still being shaped and built.
            </p>

            <div className="mt-7 space-y-3">
              {directions.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-brand-gray-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-[#F2C66D]" />
                  </span>
                  {label}
                </div>
              ))}
            </div>

            <a href="#contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E5A93C] px-6 py-3 text-sm font-bold text-[#130d04] transition hover:-translate-y-0.5 hover:bg-[#F2C66D]">
              Follow Development
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-brand-gray-500">Choose “HARIKOS AI updates” in the contact form.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: 0.08 }} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.38)] sm:p-6">
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-brand-gray-500">
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                Concept interface
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-brand-gray-400">Not released</span>
            </div>

            <div className="rounded-[1.45rem] border border-white/10 bg-[#08090c]/90 p-5 sm:p-7">
              <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Focused agent workspace</p>
                  <p className="mt-0.5 text-xs text-brand-gray-500">Product direction preview</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[0.72fr_1.28fr]">
                <div className="space-y-3">
                  {['Agent purpose', 'Workflow context', 'Connected tools'].map((item, index) => (
                    <div key={item} className={`rounded-xl border px-3 py-3 text-xs ${index === 0 ? 'border-[#E5A93C]/25 bg-[#E5A93C]/10 text-[#F2C66D]' : 'border-white/[0.07] bg-white/[0.025] text-brand-gray-500'}`}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="h-2.5 w-24 rounded-full bg-white/15" />
                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                      <div className="h-2 w-4/5 rounded-full bg-white/10" />
                      <div className="mt-2 h-2 w-2/3 rounded-full bg-white/[0.06]" />
                    </div>
                    <div className="ml-8 rounded-xl border border-sky-400/10 bg-sky-400/[0.05] p-3">
                      <div className="h-2 w-3/4 rounded-full bg-sky-200/15" />
                      <div className="mt-2 h-2 w-1/2 rounded-full bg-sky-200/10" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/30 px-3 py-3">
                    <div className="h-2 flex-1 rounded-full bg-white/[0.08]" />
                    <div className="h-7 w-7 rounded-lg bg-[#E5A93C]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

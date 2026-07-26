import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const previews = [
  {
    label: "Case study",
    title: "Red Chickz",
    description: "A cinematic hospitality experience built to turn attention into bookings.",
    href: "/work/red-chickz",
    external: false,
    accent: "from-amber-300/20 via-orange-500/10 to-transparent",
  },
  {
    label: "Live demo",
    title: "Premium Restaurant",
    description: "A refined restaurant concept with a polished, editorial feel.",
    href: "https://premium-restraunt-idkvogghi-ashyeager-2658s-projects.vercel.app/",
    external: true,
    accent: "from-rose-300/20 via-fuchsia-500/10 to-transparent",
  },
];

export default function LandingPages() {
  return (
    <section id="work" className="relative z-10 border-t border-brand-white/[0.04] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex max-w-2xl flex-col gap-4 md:mb-12">
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
            Selected work
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="font-display text-3xl font-bold tracking-tight text-brand-white md:text-5xl">
            Landing pages that make an impression.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="text-base leading-relaxed text-brand-gray-400 md:text-lg">
            Explore two recent hospitality experiences, designed for clarity, character, and conversion.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {previews.map((preview, index) => (
            <motion.a
              key={preview.title}
              href={preview.href}
              target={preview.external ? "_blank" : undefined}
              rel={preview.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative min-h-64 overflow-hidden rounded-2xl border border-brand-white/[0.08] bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-white/[0.18] hover:bg-[#101010] md:p-8"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${preview.accent}`} />
              <div className="absolute inset-x-6 top-6 h-24 rounded-xl border border-brand-white/[0.08] bg-brand-black/30 md:inset-x-8 md:top-8">
                <div className="flex h-7 items-center gap-1.5 border-b border-brand-white/[0.07] px-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-white/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-white/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-white/10" />
                </div>
                <div className="mx-4 mt-4 h-3 w-2/5 rounded-full bg-brand-white/20" />
                <div className="mx-4 mt-2 h-2 w-3/5 rounded-full bg-brand-white/10" />
              </div>
              <div className="relative flex h-full min-h-48 flex-col justify-end pt-28">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gray-400">{preview.label}</span>
                  {preview.external ? <ExternalLink className="h-4 w-4 text-brand-gray-400" /> : <ArrowUpRight className="h-4 w-4 text-brand-gray-400" />}
                </div>
                <h3 className="text-2xl font-medium text-brand-white">{preview.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-gray-400">{preview.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-brand-gray-200 transition-transform duration-300 group-hover:translate-x-1">
                  Preview project <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
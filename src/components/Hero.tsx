import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { ArrowRight, Boxes } from "lucide-react";

const PremiumScene = lazy(() => import("./PremiumScene"));

function SceneFallback() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(229,169,60,0.28),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.18),transparent_38%),#07070a] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-[430px]" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F2C66D]/40 bg-[#E5A93C]/20 shadow-[0_0_80px_rgba(229,169,60,0.25)]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/25" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:px-12 md:pb-24 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[#07070a]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_15%_20%,rgba(229,169,60,0.16),transparent_60%),radial-gradient(ellipse_45%_35%_at_90%_70%,rgba(56,189,248,0.1),transparent_65%)]" aria-hidden />
      <div className="ambient-glow absolute left-[-10%] top-[-12%] h-72 w-72 rounded-full bg-[#E5A93C]/30 blur-[140px]" aria-hidden />
      <div className="ambient-glow absolute bottom-[-4%] right-[-6%] h-80 w-80 rounded-full bg-sky-400/20 blur-[150px]" aria-hidden />
      <div className="absolute left-[6%] top-[16%] h-24 w-24 rounded-full border border-[#E5A93C]/20 bg-[#E5A93C]/10 blur-[70px]" aria-hidden />
      <div className="absolute right-[10%] top-[24%] h-32 w-32 rounded-full border border-sky-400/20 bg-sky-400/10 blur-[85px]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,transparent_38%,transparent_62%,rgba(255,255,255,0.025)_100%)]" aria-hidden />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 rounded-full border border-[#E5A93C]/25 bg-[#E5A93C]/10 px-4 py-2">
            <Boxes className="h-3.5 w-3.5 text-[#F2C66D]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F2C66D]">Independent technology company</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[0.94] tracking-[-0.05em] text-brand-white sm:text-6xl md:text-7xl lg:text-[5.35rem]">
            Building software for what's next.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.16 }} className="mx-auto mt-6 max-w-xl text-base font-light leading-7 text-brand-gray-300 sm:text-lg lg:mx-0">
            We build focused AI products, digital systems, and tools designed around real problems.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.24 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#products" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#E5A93C] px-7 py-3.5 text-sm font-bold text-[#130d04] transition hover:-translate-y-0.5 hover:bg-[#F2C66D]">
              Explore What We're Building
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#h-studio" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-brand-white transition hover:border-white/25 hover:bg-white/[0.08]">
              H Studio
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.34 }} className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-brand-gray-400 lg:justify-start">
            {['Products', 'Digital systems', 'Technical experiments'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} className="w-full">
          <div className="relative mx-auto max-w-[560px]">
            <div className="absolute -inset-6 rounded-full bg-[#E5A93C]/10 blur-3xl" />
            <Suspense fallback={<SceneFallback />}>
              <PremiumScene />
            </Suspense>
            <div className="absolute bottom-4 left-4 right-4 rounded-[1.2rem] border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:px-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#F2C66D]">HARIKOS / Building now</p>
              <p className="mt-1 text-sm text-brand-gray-200">Focused products, thoughtful interfaces, and useful systems.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

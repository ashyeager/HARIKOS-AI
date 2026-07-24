import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  onBookCallClick: () => void;
}

const RED_CHICKZ_LIVE_URL = "https://premium-restraunt.vercel.app/";
const WOK_DEMO_URL =
  "https://premium-restraunt-idkvogghi-ashyeager-2658s-projects.vercel.app/";
const WHATSAPP_STRATEGY_URL =
  "https://wa.me/96895703688?text=Hi%20HARIKOS%20AI%2C%20I%27d%20like%20to%20book%20a%2015-min%20strategy%20call.";

const previewCards = [
  {
    badge: "LIVE CASE STUDY",
    title: "The Red Chickz",
    subtitle: "Nashville Hot Chicken • Direct Order & Menu Engine",
    cta: "Launch Live Experience →",
    href: RED_CHICKZ_LIVE_URL,
    previewGradient:
      "from-[#1a0a0a] via-[#120808] to-[#08080A] ring-[rgba(229,169,60,0.12)] hover:ring-[rgba(229,169,60,0.35)]",
    accent: "text-[#E5A93C]",
    badgeTone: "border-[#E5A93C]/25 bg-[#E5A93C]/10 text-[#E5A93C]",
    previewHint: "red-chickz",
  },
  {
    badge: "INTERACTIVE DEMO",
    title: "Wok House / Premium Dining Demo",
    subtitle: "Pan-Asian Street Food • Interactive Wok Builder & Live OMR Math",
    cta: "Launch Live Demo →",
    href: WOK_DEMO_URL,
    previewGradient:
      "from-[#0a1210] via-[#0c1014] to-[#08080A] ring-white/[0.06] hover:ring-[rgba(229,169,60,0.28)]",
    accent: "text-[#E5A93C]",
    badgeTone: "border-white/10 bg-white/[0.06] text-brand-gray-300",
    previewHint: "wok-house",
  },
] as const;

function PreviewPlaceholder({ variant }: { variant: "red-chickz" | "wok-house" }) {
  const isRed = variant === "red-chickz";

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-[#0c0c0f]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isRed
            ? "from-[#3d1515]/40 via-[#08080A] to-[#08080A]"
            : "from-[#14332a]/35 via-[#08080A] to-[#08080A]"
        }`}
      />
      <div className="absolute inset-0 opacity-[0.35] noise-bg mix-blend-overlay pointer-events-none" />
      {/* SaaS-style mock chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/[0.06] bg-[rgba(8,8,10,0.85)] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 h-4 flex-1 max-w-[140px] rounded-md bg-white/[0.06]" />
      </div>
      <div className="absolute inset-0 top-9 p-4 sm:p-5">
        <div className="grid h-full grid-cols-12 gap-2 opacity-80">
          <div className="col-span-4 space-y-2">
            <div className={`h-2 w-3/4 rounded ${isRed ? "bg-[#E5A93C]/30" : "bg-emerald-500/25"}`} />
            <div className="h-16 rounded-lg border border-white/[0.06] bg-white/[0.03]" />
            <div className="h-10 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
            <div className="h-10 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
          </div>
          <div className="col-span-8 space-y-2">
            <div className="h-24 rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 rounded-lg bg-white/[0.04]" />
              <div className="h-14 rounded-lg bg-white/[0.04]" />
              <div className="h-14 rounded-lg bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/70 to-transparent pointer-events-none" />
    </div>
  );
}

function DemoPreviewCard({
  card,
  index,
}: {
  card: (typeof previewCards)[number];
  index: number;
}) {
  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(18,18,22,0.6)] backdrop-blur-[16px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(0,0,0,0.55)] ${card.previewGradient}`}
    >
      <PreviewPlaceholder variant={card.previewHint} />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${card.badgeTone}`}
        >
          {card.badge}
        </span>

        <h3 className="mt-4 font-display text-xl sm:text-2xl font-semibold tracking-tight text-brand-white">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-gray-400">{card.subtitle}</p>

        <span
          className={`mt-6 inline-flex min-h-12 items-center gap-2 text-sm font-medium transition-colors group-hover:gap-3 ${card.accent}`}
        >
          {card.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

export default function Hero({ onBookCallClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col items-center px-5 sm:px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Hero-local noir backdrop */}
      <div
        className="absolute inset-0 -z-10 bg-[#08080A]"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(229,169,60,0.07),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(255,255,255,0.03),transparent_50%)]"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 noise-bg opacity-[0.45] mix-blend-overlay pointer-events-none" aria-hidden />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[rgba(18,18,22,0.6)] px-4 py-2 backdrop-blur-[16px]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.65)]" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] text-brand-gray-300">
            HARIKOS AI • DIGITAL EXPERIENCE STUDIO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="mt-8 max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-white leading-[1.06]"
        >
          ELEVATE YOUR DINING EXPERIENCE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-6 max-w-3xl text-base sm:text-lg text-brand-gray-400 font-light leading-relaxed"
        >
          We transform local restaurant menus into high-converting, 1-tap WhatsApp ordering engines.
          Zero friction for your guests, direct pre-orders for your counter staff, and zero monthly
          agency retainers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="mt-12 md:mt-14 w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 text-left"
        >
          {previewCards.map((card, index) => (
            <DemoPreviewCard key={card.title} card={card} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full max-w-md sm:max-w-none justify-center"
        >
          <a
            href={WHATSAPP_STRATEGY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E5A93C]/35 bg-[#E5A93C]/10 px-8 py-3 text-sm font-medium text-[#E5A93C] transition-all duration-300 hover:border-[#E5A93C]/55 hover:bg-[#E5A93C]/15 hover:shadow-[0_0_24px_rgba(229,169,60,0.12)]"
          >
            Book a 15-Min Strategy Call
          </a>
          <MagneticButton
            onClick={onBookCallClick}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.08] bg-[rgba(18,18,22,0.6)] px-8 py-3 text-sm font-medium text-brand-gray-200 backdrop-blur-[16px] transition-all duration-300 hover:border-white/15 hover:text-brand-white cursor-pointer"
          >
            Send a Project Brief
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

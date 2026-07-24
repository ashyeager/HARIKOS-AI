import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Compass, LayoutGrid, MoveRight, Sparkles, Smartphone, Type, Palette } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const overviewPoints = [
  { label: "Client", value: "Red Chickz" },
  { label: "Industry", value: "Restaurant / Hospitality" },
  { label: "Project", value: "Premium Digital Experience Concept" },
];

const goals = [
  "Improve online presence",
  "Showcase menu with clarity",
  "Increase customer engagement",
  "Create stronger brand perception",
];

const experienceHighlights = [
  {
    title: "Premium visual storytelling",
    description:
      "The experience is designed to feel editorial, warm, and unmistakably elevated—balancing refined typography with cinematic visuals that reinforce appetite and trust.",
    icon: Sparkles,
  },
  {
    title: "Menu presentation",
    description:
      "Menu structure is treated like a curated experience, with clean hierarchy, strong imagery, and clear paths to ordering or visiting.",
    icon: LayoutGrid,
  },
  {
    title: "Mobile-first journey",
    description:
      "Every interaction is optimized for fast, effortless browsing so mobile users can discover the brand, navigate the menu, and act without friction.",
    icon: Smartphone,
  },
];

const showcaseBlocks = [
  {
    title: "Hero experience",
    description: "A cinematic first impression built around atmosphere, mood, and immediate conversion.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Menu preview",
    description: "Elegant menu storytelling with strong rhythm, layered cards, and clear visual focus.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Gallery and CTA",
    description: "A polished extension that turns browsing into action with refined visual urgency.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
  },
];

const designSystem = [
  { title: "Typography", copy: "Editorial serif-inspired headlines paired with precise, modern sans-serif body text." },
  { title: "Colors", copy: "Deep charcoal, warm reds, and soft neutrals create a premium and inviting restaurant palette." },
  { title: "UI style", copy: "Minimal, tactile, and calm—designed to feel luxurious without becoming overly decorative." },
  { title: "Spacing", copy: "Generous whitespace and confident rhythm shape an experience that feels deliberate and high-end." },
];

export default function WorkRedChickz() {
  const navigate = useNavigate();

  const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = contactSection.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <main className="flex-grow pt-24 md:pt-32">
      <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_60%)]" />
        <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-brand-black/75 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-white/10 bg-brand-white/8 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-300">
              <Sparkles className="h-3.5 w-3.5" />
              Flagship hospitality experience
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-white leading-[0.95]">
              Redefining restaurant experiences through digital design.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-gray-300">
              A premium restaurant website concept crafted to elevate brand perception, showcase the menu, and create a smoother customer journey from first impression to final visit.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://premium-restraunt.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-white px-6 py-3 text-sm font-medium text-brand-black transition-all duration-300 hover:bg-brand-gray-200"
              >
                View Live Experience
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-white/15 bg-brand-white/5 px-6 py-3 text-sm font-medium text-brand-white transition-all duration-300 hover:bg-brand-white/10"
              >
                Contact HARIKOS AI
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-brand-white/10 bg-brand-black/55 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-brand-white/10 pb-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Red Chickz</p>
                <h2 className="mt-2 text-2xl font-semibold text-brand-white">Premium digital presence concept</h2>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Concept Direction
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {overviewPoints.map((item) => (
                <div key={item.label} className="rounded-2xl border border-brand-white/10 bg-brand-white/5 p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-brand-gray-500">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-brand-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-brand-white/10 bg-gradient-to-br from-brand-white/[0.05] to-transparent p-5">
              <p className="text-sm leading-7 text-brand-gray-300">
                The brief centered on making the brand feel more luxurious, more discoverable, and easier to trust at a glance—without losing warmth or character.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-brand-white/10 bg-brand-white/[0.03] p-8 md:p-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Project overview</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
              A conversion-led digital experience for a modern hospitality brand.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-gray-400">
              Red Chickz needed a presence that could feel premium, feel immediate, and help visitors move from curiosity to action. The solution was a refined experience rooted in clarity, appetite, and streamlining the path to contact, visit, or order.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-[2rem] border border-brand-white/10 bg-gradient-to-br from-brand-white/[0.04] to-transparent p-8 md:p-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Goals</p>
            <ul className="mt-6 space-y-4">
              {goals.map((goal) => (
                <li key={goal} className="flex items-start gap-3 text-brand-gray-300">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-300" />
                  <span className="text-base leading-7">{goal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-brand-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">The experience</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
              Designed to feel premium from the first scroll.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-gray-400">
              The interface balances mood and clarity—giving the brand an aspirational tone while making each step of the customer journey feel effortless.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {experienceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-[2rem] border border-brand-white/10 bg-brand-black/45 p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-white/10 bg-brand-white/5 text-brand-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-brand-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-gray-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-brand-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Website showcase</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
                Immersive previews that feel like a flagship studio presentation.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-brand-gray-400">
              Each section is designed to feel like a premium landing experience—large, intentional, and easy to experience on every device.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {showcaseBlocks.map((block, index) => (
              <motion.article
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="overflow-hidden rounded-[2rem] border border-brand-white/10 bg-brand-black/45"
              >
                <img src={block.image} alt={block.title} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-white">{block.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-gray-400">{block.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-brand-white/[0.06]">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-brand-white/10 bg-gradient-to-br from-brand-white/[0.04] to-transparent p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Design system</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
                A refined system built for premium hospitality.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {designSystem.map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand-white/10 bg-brand-black/40 p-5">
                  <div className="flex items-center gap-2">
                    {item.title === "Typography" ? <Type className="h-4 w-4 text-brand-white" /> : null}
                    {item.title === "Colors" ? <Palette className="h-4 w-4 text-brand-white" /> : null}
                    {item.title === "UI style" ? <Compass className="h-4 w-4 text-brand-white" /> : null}
                    {item.title === "Spacing" ? <LayoutGrid className="h-4 w-4 text-brand-white" /> : null}
                    <h3 className="text-base font-semibold text-brand-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-brand-gray-400">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-brand-white/[0.06]">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-brand-white/10 bg-brand-white/[0.03] p-8 md:p-10"
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Results & value</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
              A sharper digital presence that builds confidence before the first visit.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-gray-400">
              This concept is intended to strengthen brand perception, make menu discovery simpler, guide guests more clearly through the customer journey, and create stronger direct inquiries for the business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-[2rem] border border-brand-white/10 bg-gradient-to-br from-brand-white/[0.04] to-transparent p-8 md:p-10"
          >
            <div className="space-y-4">
              {[
                "Stronger brand perception",
                "Easier menu discovery",
                "Better customer journey",
                "More direct inquiries",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-brand-white/10 bg-brand-black/30 px-4 py-3">
                  <MoveRight className="h-4 w-4 text-brand-white" />
                  <span className="text-sm text-brand-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-brand-white/[0.06]">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-brand-white/10 bg-brand-white/[0.03] px-8 py-12 text-center md:px-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-brand-gray-500">Ready to build something exceptional?</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-brand-white">
            Ready to transform your digital experience?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-brand-gray-400">
            HARIKOS AI creates premium digital experiences for ambitious brands that want to look unmistakably better online.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-white px-6 py-3 text-sm font-medium text-brand-black transition-all duration-300 hover:bg-brand-gray-200">
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-white/15 bg-brand-white/5 px-6 py-3 text-sm font-medium text-brand-white transition-all duration-300 hover:bg-brand-white/10"
            >
              Contact HARIKOS AI
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
